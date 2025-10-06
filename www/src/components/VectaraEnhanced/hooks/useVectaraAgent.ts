// Vectara Agent Hook
// Hook for managing Vectara agent sessions and interactions

import { useState, useCallback, useRef, useEffect } from 'react';
import {
  ChatMessage,
  ChatState,
  UseProductionChatOptions,
  CodeSnippet,
  AnalyticsEvent,
  UseChatReturn
} from '../types';
import {
  VECTARA_AGENT_CONFIG,
  PRODUCTION_AGENT_CONFIG,
  DEFAULT_AGENT_CREDENTIALS,
  AgentSession,
  AgentResponse,
  SourceReference,
  shouldProvideCodeExamples
} from '../config/agentConfig';
import { VectaraAgentManager, AgentSessionManager } from '../utils/agentManager';
import { debugAPI, debugCodeGeneration } from '../utils/debug';
import { generateSearchSuggestions } from '../utils/searchSuggestions';
import { detectCodeType, generateCodeSync, CODE_TEMPLATES } from '../utils/codeTemplates';

interface UseVectaraAgentOptions extends Omit<UseProductionChatOptions, 'enableStreaming'> {
  agentKey?: string;
  enableAgentStreaming?: boolean;
  autoCreateAgent?: boolean;
  agentName?: string;
  // Override credentials for agent sessions if different from chat API
  agentCustomerId?: string;
  agentApiKey?: string;
}

interface AgentChatState extends ChatState {
  agentSession?: AgentSession;
  agentKey?: string;
  isAgentThinking: boolean;
  usedSources: SourceReference[];
  agentThoughts: string[];
  suggestedFollowups: string[];
  sessionManager: AgentSessionManager;
}

export const useVectaraAgent = (options: UseVectaraAgentOptions): UseChatReturn => {
  const {
    customerId,
    corpusKeys,
    apiKey,
    enableStreaming: originalStreaming = false,
    enableAgentStreaming = false,
    analytics,
    maxRetries = 3,
    agentKey: providedAgentKey,
    autoCreateAgent = false,
    agentName = VECTARA_AGENT_CONFIG.agentName,
    agentCustomerId,
    agentApiKey
  } = options;

  // Use existing agent key if none provided
  const effectiveAgentKey = providedAgentKey || "agt_documentation_assistant_ed3f";

  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Secondary corpus search function
  const searchSecondaryCorpus = useCallback(async (query: string): Promise<SourceReference[]> => {
    try {
      const response = await fetch('https://api.vectara.io/v1/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'zqt_WvU_2ewh7ZGRwq8LdL2SV8B9RJmVGyUm1VAuOw',
          'customer-id': '1526022105'
        },
        body: JSON.stringify({
          query: [{
            text: query,
            context: ''
          }],
          num_results: 5,
          corpus_key: [{
            customer_id: '1526022105',
            corpus_id: 232,
            metadata: {}
          }]
        })
      });

      if (!response.ok) {
        console.warn('Secondary corpus search failed:', response.status);
        return [];
      }

      const data = await response.json();

      if (data.responseSet?.[0]?.response) {
        return data.responseSet[0].response.map((result: any, index: number) => ({
          sourceType: 'documentation' as const,
          corpusKey: 'ofer-bm-moma-docs_232',
          title: result.document_metadata?.title || `Secondary Source ${index + 1}`,
          snippet: result.text,
          url: result.document_metadata?.url,
          relevanceScore: result.score || 0
        }));
      }

      return [];
    } catch (error) {
      console.warn('Error searching secondary corpus:', error);
      return [];
    }
  }, []);

  const [state, setState] = useState<AgentChatState>({
    messages: [],
    isLoading: false,
    error: null,
    sessionId: `agent_session_${Date.now()}`,
    isStreaming: false,
    retryCount: 0,
    isTyping: false,
    searchSuggestions: [],
    conversationHistory: [],
    isAgentThinking: false,
    usedSources: [],
    agentThoughts: [],
    suggestedFollowups: [],
    sessionManager: null as any // Will be initialized in useEffect
  });

  const agentManagerRef = useRef<VectaraAgentManager>();
  const abortControllerRef = useRef<AbortController>();
  const streamingBufferRef = useRef<string>('');

  // Initialize agent manager
  useEffect(() => {
    // Use personal API key for agent operations with technical_writing_assistant corpus
    const effectiveApiKey = agentApiKey || "zut_ohiV8_mBEcJy_NsmzR4_THP70DX9B8lJ06hn2A";
    const effectiveCustomerId = agentCustomerId || customerId || "1526022105";

    agentManagerRef.current = new VectaraAgentManager(effectiveApiKey, effectiveCustomerId);

    // Clean up expired sessions on mount
    const sessionManager = new AgentSessionManager();
    sessionManager.cleanupExpiredSessions();

    // Try to restore previous session
    const previousSession = sessionManager.getMostRecentSession();
    if (previousSession) {
      setState(prev => ({
        ...prev,
        agentSession: previousSession,
        agentKey: previousSession.agentKey,
        sessionManager
      }));
    } else {
      setState(prev => ({ ...prev, sessionManager }));
    }
  }, [apiKey, customerId, agentApiKey, agentCustomerId]);

  // Track analytics events
  const trackEvent = useCallback((event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId'>) => {
    if (analytics?.enabled && analytics.onEvent) {
      analytics.onEvent({
        ...event,
        timestamp: Date.now(),
        sessionId: state.sessionId
      });
    }
  }, [analytics, state.sessionId]);

  // Use existing agent
  const ensureAgent = useCallback(async (): Promise<string> => {
    if (agentManagerRef.current) {
      // Use the existing agent key you created
      const existingAgentKey = "agt_documentation_assistant_ed3f";
      agentManagerRef.current.setAgentKey(existingAgentKey);
      return existingAgentKey;
    }

    throw new Error('Agent manager not initialized');
  }, []);

  // Ensure we have an active session
  const ensureSession = useCallback(async (): Promise<AgentSession> => {
    // Check if current session is valid
    if (state.agentSession) {
      const isValid = await agentManagerRef.current?.isSessionValid(state.agentSession);
      if (isValid) {
        if (isDevelopment) {
          console.log('♻️ Reusing existing agent session:', state.agentSession.sessionKey);
        }
        return state.agentSession;
      }
    }

    if (isDevelopment) {
      console.log('🔄 Creating new agent session (previous session invalid or not found)');
    }

    // Create new session
    const agentKey = await ensureAgent();
    const session = await agentManagerRef.current!.createSession(agentKey);

    // Save session
    state.sessionManager.saveSession(session);

    setState(prev => ({ ...prev, agentSession: session, agentKey }));

    if (isDevelopment) {
      console.log('✅ Created new agent session:', session.sessionKey);
    }

    return session;
  }, [state.agentSession, ensureAgent, isDevelopment]);

  // Process agent response and convert to chat message
  const processAgentResponse = useCallback(async (
    agentResponse: AgentResponse,
    userMessage: string
  ): Promise<ChatMessage> => {
    // Process citations in the content to replace [vectara_1] with [1]
    const processCitations = (content: string): string => {
      return content.replace(/\[vectara_(\d+)\]/g, '[$1]');
    };

    // Extract sources from tool results (where the actual search results are)
    const extractedSources = agentResponse.toolResults
      .filter(toolResult => toolResult.search_results)
      .flatMap(toolResult => toolResult.search_results)
      .map((result, index) => {
        return {
          id: `source_${index}`,
          title: result.document_metadata?.title || result.document_id || `Document ${index + 1}`,
          snippet: result.text,
          score: result.score || 0,
          url: result.document_metadata?.url || `https://docs.vectara.com`,
          metadata: {
            sourceType: 'documentation',
            corpusKey: 'technical_writing_assistant',
            documentId: result.document_id,
            partMetadata: result.part_metadata
          }
        };
      });

    // Search secondary corpus for additional results
    const secondarySources = await searchSecondaryCorpus(userMessage);

    // Combine all sources, prioritizing agent results
    const allSources = [...extractedSources, ...secondarySources];

    // If no sources from tool results, try usedSources as fallback and include secondary
    const references = allSources.length > 0
      ? allSources.slice(0, 10) // Limit to 10 total sources
      : [
          ...agentResponse.usedSources.map((source, index) => ({
            id: `source_${index}`,
            title: source.title || `Source ${index + 1}`,
            snippet: source.snippet,
            score: source.relevanceScore || 0,
            url: source.url || `https://docs.vectara.com`,
            metadata: {
              sourceType: source.sourceType || 'documentation',
              corpusKey: source.corpusKey || 'technical_writing_assistant'
            }
          })),
          ...secondarySources
        ].slice(0, 10);

    const message: ChatMessage = {
      id: `agent_msg_${Date.now()}`,
      type: 'assistant',
      content: processCitations(agentResponse.content),
      timestamp: Date.now(),
      isStreaming: false,
      hasCodeSnippets: false,
      canShowCode: shouldProvideCodeExamples(userMessage),
      references
    };

    return message;
  }, []);

  // Send message to agent
  const sendMessage = useCallback(async (content: string, parentMessageId?: string): Promise<void> => {
    debugAPI('Sending message to agent:', { content: content.substring(0, 100), parentMessageId });

    setState(prev => ({
      ...prev,
      isLoading: true,
      error: null,
      isAgentThinking: true,
      usedSources: [],
      agentThoughts: [],
      suggestedFollowups: []
    }));

    trackEvent({
      type: 'query',
      data: { content: content.substring(0, 100), isFollowUp: !!parentMessageId }
    });

    try {
      const session = await ensureSession();

      // Add user message
      const userMessage: ChatMessage = {
        id: `user_msg_${Date.now()}`,
        type: 'user',
        content,
        timestamp: Date.now(),
        isStreaming: false,
        hasCodeSnippets: false,
        canShowCode: false,
        isFollowUp: !!parentMessageId
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, userMessage]
      }));

      // Handle streaming vs non-streaming
      const enableStreaming = enableAgentStreaming || originalStreaming;

      if (enableStreaming) {
        await handleStreamingMessage(session, content, parentMessageId);
      } else {
        await handleNonStreamingMessage(session, content, parentMessageId);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      debugAPI('Error sending message to agent:', error);

      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
        isAgentThinking: false
      }));

      trackEvent({
        type: 'error',
        data: { error: errorMessage, phase: 'agent_message' }
      });
    }
  }, [ensureSession, enableAgentStreaming, originalStreaming, trackEvent]);

  // Handle streaming message
  const handleStreamingMessage = useCallback(async (
    session: AgentSession,
    content: string,
    parentMessageId?: string
  ): Promise<void> => {
    const assistantMessage: ChatMessage = {
      id: `agent_msg_${Date.now()}`,
      type: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
      hasCodeSnippets: false,
      canShowCode: shouldProvideCodeExamples(content),
      isFollowUp: !!parentMessageId
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, assistantMessage],
      isStreaming: true
    }));

    await agentManagerRef.current!.sendMessageStreaming(
      session,
      content,
      (chunk: string) => {
        setState(prev => {
          const updatedMessages = [...prev.messages];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          if (lastMessage && lastMessage.type === 'assistant') {
            lastMessage.content += chunk;
          }
          return {
            ...prev,
            messages: updatedMessages,
            isTyping: true
          };
        });
      },
      async (agentResponse: AgentResponse) => {
        const finalMessage = await processAgentResponse(agentResponse, content);
        // Mark as follow-up if there's a parent message ID
        if (parentMessageId) {
          finalMessage.isFollowUp = true;
        }
        setState(prev => {
          const updatedMessages = [...prev.messages];
          updatedMessages[updatedMessages.length - 1] = {
            ...finalMessage,
            isStreaming: false
          };
          return {
            ...prev,
            messages: updatedMessages,
            isLoading: false,
            isStreaming: false,
            isTyping: false,
            isAgentThinking: false,
            usedSources: agentResponse.usedSources,
            agentThoughts: agentResponse.agentThoughts,
            suggestedFollowups: agentResponse.suggestedFollowups
          };
        });

        trackEvent({
          type: 'agent_response',
          data: {
            contentLength: finalMessage.content.length,
            toolCount: agentResponse.toolResults.length,
            sourceCount: agentResponse.usedSources.length
          }
        });
      },
      (error: Error) => {
        setState(prev => ({
          ...prev,
          error: error.message,
          isLoading: false,
          isStreaming: false,
          isTyping: false,
          isAgentThinking: false
        }));
      }
    );
  }, [processAgentResponse, trackEvent]);

  // Handle non-streaming message
  const handleNonStreamingMessage = useCallback(async (
    session: AgentSession,
    content: string,
    parentMessageId?: string
  ): Promise<void> => {
    const agentResponse = await agentManagerRef.current!.sendMessage(session, content, false);
    const assistantMessage = await processAgentResponse(agentResponse, content);

    // Mark as follow-up if there's a parent message ID
    if (parentMessageId) {
      assistantMessage.isFollowUp = true;
    }

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, assistantMessage],
      isLoading: false,
      isAgentThinking: false,
      usedSources: agentResponse.usedSources,
      agentThoughts: agentResponse.agentThoughts,
      suggestedFollowups: agentResponse.suggestedFollowups
    }));

    trackEvent({
      type: 'agent_response',
      data: {
        contentLength: assistantMessage.content.length,
        toolCount: agentResponse.toolResults.length,
        sourceCount: agentResponse.usedSources.length
      }
    });
  }, [processAgentResponse, trackEvent]);

  // Send follow-up message
  const sendFollowUp = useCallback(async (content: string, parentMessageId: string): Promise<void> => {
    await sendMessage(content, parentMessageId);
  }, [sendMessage]);

  // Retry last message
  const retry = useCallback(async (): Promise<void> => {
    if (state.retryCount >= maxRetries) {
      setState(prev => ({
        ...prev,
        error: 'Maximum retry attempts reached'
      }));
      return;
    }

    setState(prev => ({
      ...prev,
      retryCount: prev.retryCount + 1
    }));

    // Remove last user message and resend
    const lastUserMessage = [...state.messages]
      .reverse()
      .find(msg => msg.type === 'user');

    if (lastUserMessage) {
      setState(prev => ({
        ...prev,
        messages: prev.messages.slice(0, -1)
      }));
      await sendMessage(lastUserMessage.content);
    }
  }, [state.messages, state.retryCount, maxRetries, sendMessage]);

  // Clear chat
  const clearChat = useCallback(async (): Promise<void> => {
    // Delete current session
    if (state.agentSession) {
      try {
        await agentManagerRef.current?.deleteSession(state.agentSession);
        state.sessionManager.removeSession(state.agentSession.sessionKey);
      } catch (error) {
        debugAPI('Error deleting session:', error);
      }
    }

    // Reset state
    setState(prev => ({
      ...prev,
      messages: [],
      isLoading: false,
      error: null,
      sessionId: `agent_session_${Date.now()}`,
      retryCount: 0,
      isTyping: false,
      searchSuggestions: [],
      agentSession: undefined,
      agentKey: undefined,
      isAgentThinking: false,
      usedSources: [],
      agentThoughts: [],
      suggestedFollowups: []
    }));
  }, [state.agentSession]);

  // Update code parameter (not applicable for agents)
  const updateCodeParameter = useCallback((
    messageId: string,
    snippetId: string,
    parameterName: string,
    value: any
  ): void => {
    debugCodeGeneration('Code parameter update requested but not supported in agent mode');
  }, []);

  // Extract context-specific parameters from user query (for agent code generation)
  const extractContextParameters = (query: string): Record<string, any> => {
    const params: Record<string, any> = {};

    // Extract corpus ID/Key
    const corpusMatch = query.match(/corpus[_\s]*(?:id|key)?[:\s]+([a-zA-Z0-9_-]+)/i);
    if (corpusMatch) {
      params.corpusKey = corpusMatch[1];
    }

    // Extract customer ID
    const customerMatch = query.match(/customer[_\s]*id[:\s]+(\d+)/i);
    if (customerMatch) {
      params.customerId = customerMatch[1];
    }

    // Extract API key
    const apiKeyMatch = query.match(/api[_\s]*key[:\s]+([a-zA-Z0-9_-]+)/i);
    if (apiKeyMatch) {
      params.apiKey = apiKeyMatch[1];
    }

    // Extract index name/ID
    const indexMatch = query.match(/index[_\s]*(?:id|name)?[:\s]+([a-zA-Z0-9_-]+)/i);
    if (indexMatch) {
      params.indexId = indexMatch[1];
    }

    // Extract query text
    const queryMatch = query.match(/query[:\s]+["']([^"']+)["']/i);
    if (queryMatch) {
      params.query = queryMatch[1];
    }

    return params;
  };

  // Generate code snippets for agent responses
  const generateCodeSnippets = useCallback((content: string, forceCodeType?: string, userQuery?: string): CodeSnippet[] => {
    if (process.env.NODE_ENV === 'development') {
      debugCodeGeneration('Agent generateCodeSnippets called:', {
        content: content.substring(0, 50) + '...',
        forceCodeType,
        userQuery: userQuery?.substring(0, 50)
      });
    }

    // For agent responses, use a simpler approach - check if content mentions code examples
    if (!shouldProvideCodeExamples(content) && !shouldProvideCodeExamples(userQuery || '')) {
      if (process.env.NODE_ENV === 'development') {
        debugCodeGeneration('Agent code generation not needed for this content');
      }
      return [];
    }

    const codeType = forceCodeType || detectCodeType(userQuery || content);
    if (process.env.NODE_ENV === 'development') {
      debugCodeGeneration('Agent detected code type:', codeType);
    }

    if (!codeType) {
      if (process.env.NODE_ENV === 'development') {
        debugCodeGeneration('Agent: No code type detected');
      }
      return [];
    }

    const snippets: CodeSnippet[] = [];
    const contextParams = extractContextParameters(userQuery || content);
    const defaultParams = {
      customerId: "YOUR_CUSTOMER_ID",
      corpusKey: "YOUR_CORPUS_KEY",
      apiKey: "YOUR_API_KEY",
      indexId: "YOUR_INDEX_ID",
      query: "example query text",
      ...contextParams
    };

    if (process.env.NODE_ENV === 'development') {
      debugCodeGeneration('Agent context-aware parameters:', defaultParams);
    }

    // Generate snippets for supported languages
    const supportedLanguages = ['javascript', 'python', 'typescript', 'curl'];

    for (const lang of supportedLanguages) {
      const template = CODE_TEMPLATES[codeType]?.[lang];
      console.log('🔧 Agent template lookup:', { codeType, lang, template: !!template, templateTitle: template?.title });

      if (process.env.NODE_ENV === 'development') {
        debugCodeGeneration(`Agent template lookup for ${codeType}/${lang}:`, {
          found: !!template,
          availableCodeTypes: Object.keys(CODE_TEMPLATES),
          availableForCodeType: Object.keys(CODE_TEMPLATES[codeType] || {})
        });
      }

      if (template) {
        console.log('🔧 Template found, generating code with parameters:', defaultParams);
        const parameters: Record<string, any> = {};
        template.parameters.forEach(param => {
          parameters[param] = {
            type: 'string',
            value: defaultParams[param] || `YOUR_${param.toUpperCase()}`,
            required: true,
            description: `Your ${param.replace(/([A-Z])/g, ' $1').toLowerCase()}`
          };
        });

        console.log('🔧 Calling generateCodeSync with:', { codeType, lang, parameters });
        const generatedCode = generateCodeSync(codeType, lang, parameters);
        console.log('🔧 Generated code length:', generatedCode.length, 'First 100 chars:', generatedCode.substring(0, 100));

        const title = `${template.title} (${lang.toUpperCase()})`;
        const description = template.description || `Complete ${lang} implementation`;

        snippets.push({
          id: `${Date.now()}_${lang}`,
          language: lang,
          title,
          description,
          code: generatedCode,
          parameters,
          canModify: true
        });

        if (process.env.NODE_ENV === 'development') {
          debugCodeGeneration(`Agent generated ${lang} snippet:`, {
            title,
            codeLength: generatedCode.length,
            parameterCount: Object.keys(parameters).length
          });
        }
      }
    }

    if (process.env.NODE_ENV === 'development') {
      debugCodeGeneration(`Agent code generation complete:`, {
        totalSnippets: snippets.length,
        languages: snippets.map(s => s.language)
      });
    }

    return snippets;
  }, [debugCodeGeneration]);

  // Show code examples for agent responses
  const showCodeExamples = useCallback(async (messageId: string, language?: string): Promise<void> => {
    if (process.env.NODE_ENV === 'development') {
      debugCodeGeneration('🚀 Agent showCodeExamples called:', { messageId, language });
    }

    // Always show debug in development
    console.log('🔧 Agent showCodeExamples:', { messageId, language, messagesCount: state.messages.length });

    // Find the target message
    const targetMessage = state.messages.find(msg => msg.id === messageId);
    console.log('🔍 Looking for message:', messageId, 'found:', !!targetMessage);

    if (!targetMessage) {
      console.error('❌ Target message not found:', messageId);
      console.log('📋 Available messages:', state.messages.map(m => ({ id: m.id, type: m.type, content: m.content.substring(0, 50) + '...' })));
      return;
    }

    if (process.env.NODE_ENV === 'development') {
      debugCodeGeneration('✅ Agent target message found:', {
        messageId,
        messageType: targetMessage.type,
        contentPreview: targetMessage.content.substring(0, 100)
      });
    }

    // Find the corresponding user message for context
    const messageIndex = state.messages.findIndex(msg => msg.id === messageId);
    const userMessage = messageIndex > 0 ? state.messages[messageIndex - 1] : null;
    const userQuery = userMessage?.type === 'user' ? userMessage.content : '';

    try {
      if (process.env.NODE_ENV === 'development') {
        debugCodeGeneration('Generating code snippets for agent message content...');
      }

      console.log('🔧 Generating code for content:', targetMessage.content.substring(0, 100) + '...');
      console.log('🔧 User query context:', userQuery?.substring(0, 100) + '...');

      // Generate code snippets directly without recursive call
      const allSnippets: CodeSnippet[] = [];
      const codeType = detectCodeType(userQuery || targetMessage.content);

      if (process.env.NODE_ENV === 'development') {
        console.log('🔧 Code generation debug:', {
          userQuery: userQuery?.substring(0, 50) + '...',
          codeType,
          shouldProvideCode: shouldProvideCodeExamples(userQuery || ''),
          detectCodeTypeResult: detectCodeType(userQuery || targetMessage.content)
        });
      }

      if (codeType && shouldProvideCodeExamples(userQuery)) {
        const contextParams = extractContextParameters(userQuery || targetMessage.content);
        const defaultParams = {
          customerId: "YOUR_CUSTOMER_ID",
          corpusKey: "YOUR_CORPUS_KEY",
          apiKey: "YOUR_API_KEY",
          indexId: "YOUR_INDEX_ID",
          query: "example query text",
          ...contextParams
        };

        const supportedLanguages = ['javascript', 'python', 'typescript', 'curl'];

        for (const lang of supportedLanguages) {
          if (CODE_TEMPLATES[lang]) {
            try {
              const generatedCode = generateCodeSync(codeType, lang, defaultParams);
              if (generatedCode && generatedCode.trim() !== '') {
                allSnippets.push({
                  language: lang,
                  code: generatedCode,
                  description: `${lang.charAt(0).toUpperCase() + lang.slice(1)} ${codeType} example`,
                  parameters: defaultParams
                });
              }
            } catch (error) {
              console.error(`❌ Error generating ${lang} code:`, error);
            }
          }
        }
      }
      console.log('🔧 Generated snippets:', allSnippets.length, 'for languages:', allSnippets.map(s => s.language));

      if (process.env.NODE_ENV === 'development') {
        debugCodeGeneration('Generated', allSnippets.length, 'total snippets for agent response');
      }

      // Filter by requested language if specified
      const codeSnippets = language
        ? allSnippets.filter(s => s.language === language)
        : allSnippets;

      if (process.env.NODE_ENV === 'development') {
        debugCodeGeneration('Filtered to', codeSnippets.length, 'snippets for', language || 'all languages');
      }

      if (codeSnippets.length > 0) {
        if (process.env.NODE_ENV === 'development') {
          debugCodeGeneration('📝 Updating agent message with', codeSnippets.length, 'code snippets');
        }
        console.log('🔧 Updating state with', codeSnippets.length, 'code snippets for language:', language || 'all');
        setState(prev => {
          console.log('🔧 Previous state message count:', prev.messages.length);
          return {
            ...prev,
            messages: prev.messages.map(msg => {
              if (msg.id === messageId) {
                console.log('🔧 Found message to update:', msg.id);
                if (process.env.NODE_ENV === 'development') {
                  debugCodeGeneration('✅ Updating agent message:', msg.id, 'with', codeSnippets.length, 'code snippets for', language || 'all languages');
                }

                // If we're adding a specific language, merge with existing snippets
                const existingSnippets = Array.isArray(msg.codeSnippets) ? msg.codeSnippets : [];
                const newSnippets = language
                  ? [...existingSnippets.filter(s => s.language !== language), ...codeSnippets]
                  : codeSnippets;

                console.log('🔧 Final snippets count:', newSnippets.length);

                return {
                  ...msg,
                  hasCodeSnippets: true,
                  codeSnippets: newSnippets,
                  canShowCode: false // Hide the buttons since we now have code
                };
              }
              return msg;
            })
          };
        });

        trackEvent({
          type: 'code_generation',
          data: {
            messageId,
            language: language || 'all',
            trigger: 'agent_code_button',
            source: 'agent_response'
          }
        });

        if (process.env.NODE_ENV === 'development') {
          debugCodeGeneration('🎉 Successfully updated agent message with code snippets');
        }
      } else {
        if (process.env.NODE_ENV === 'development') {
          debugCodeGeneration('⚠️ No code snippets to show for agent response');
        }
      }
    } catch (error) {
      console.error('❌ Error generating code snippets for agent response:', error);
      console.error('❌ Full error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      setState(prev => ({
        ...prev,
        error: 'Failed to generate code examples'
      }));
    }
  }, [state.messages, trackEvent, generateCodeSnippets]);

  // Get search suggestions
  const getSearchSuggestions = useCallback((input: string): string[] => {
    return generateSearchSuggestions(input, state.messages);
  }, [state.messages]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    error: state.error,
    isStreaming: state.isStreaming,
    isTyping: state.isTyping,
    searchSuggestions: state.searchSuggestions,
    conversationHistory: state.conversationHistory,
    retryCount: state.retryCount,
    sendMessage,
    sendFollowUp,
    retry,
    clearChat,
    updateCodeParameter,
    showCodeExamples,
    getSearchSuggestions,

    // Agent-specific state (for enhanced UI)
    agentSession: state.agentSession,
    agentKey: state.agentKey,
    isAgentThinking: state.isAgentThinking,
    usedSources: state.usedSources,
    agentThoughts: state.agentThoughts,
    suggestedFollowups: state.suggestedFollowups
  };
};