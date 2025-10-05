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
    sessionManager: new AgentSessionManager()
  });

  const agentManagerRef = useRef<VectaraAgentManager>();
  const abortControllerRef = useRef<AbortController>();
  const streamingBufferRef = useRef<string>('');

  // Initialize agent manager
  useEffect(() => {
    // Use testing credentials for agent if provided, otherwise fallback to production
    const effectiveApiKey = agentApiKey || apiKey || DEFAULT_AGENT_CREDENTIALS.apiKey;
    const effectiveCustomerId = agentCustomerId || customerId || DEFAULT_AGENT_CREDENTIALS.customerId;

    agentManagerRef.current = new VectaraAgentManager(effectiveApiKey, effectiveCustomerId);

    // Clean up expired sessions on mount
    state.sessionManager.cleanupExpiredSessions();

    // Try to restore previous session
    const previousSession = state.sessionManager.getMostRecentSession();
    if (previousSession) {
      setState(prev => ({ ...prev, agentSession: previousSession, agentKey: previousSession.agentKey }));
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
        return state.agentSession;
      }
    }

    // Create new session
    const agentKey = await ensureAgent();
    const session = await agentManagerRef.current!.createSession(agentKey);

    // Save session
    state.sessionManager.saveSession(session);

    setState(prev => ({ ...prev, agentSession: session, agentKey }));

    return session;
  }, [state.agentSession, ensureAgent]);

  // Process agent response and convert to chat message
  const processAgentResponse = useCallback((
    agentResponse: AgentResponse,
    userMessage: string
  ): ChatMessage => {
    const message: ChatMessage = {
      id: `agent_msg_${Date.now()}`,
      type: 'assistant',
      content: agentResponse.content,
      timestamp: Date.now(),
      isStreaming: false,
      hasCodeSnippets: false,
      canShowCode: shouldProvideCodeExamples(userMessage),
      references: agentResponse.usedSources.map((source, index) => ({
        id: `source_${index}`,
        title: source.title,
        snippet: source.snippet,
        score: source.relevanceScore,
        url: source.url,
        metadata: {
          sourceType: source.sourceType,
          corpusKey: source.corpusKey
        }
      }))
    };

    return message;
  }, []);

  // Send message to agent
  const sendMessage = useCallback(async (content: string): Promise<void> => {
    debugAPI('Sending message to agent:', { content: content.substring(0, 100) });

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
      data: { content: content.substring(0, 100) }
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
        canShowCode: false
      };

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, userMessage]
      }));

      // Handle streaming vs non-streaming
      const enableStreaming = enableAgentStreaming || originalStreaming;

      if (enableStreaming) {
        await handleStreamingMessage(session, content);
      } else {
        await handleNonStreamingMessage(session, content);
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
    content: string
  ): Promise<void> => {
    const assistantMessage: ChatMessage = {
      id: `agent_msg_${Date.now()}`,
      type: 'assistant',
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
      hasCodeSnippets: false,
      canShowCode: shouldProvideCodeExamples(content)
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
      (agentResponse: AgentResponse) => {
        const finalMessage = processAgentResponse(agentResponse, content);
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
    content: string
  ): Promise<void> => {
    const agentResponse = await agentManagerRef.current!.sendMessage(session, content, false);
    const assistantMessage = processAgentResponse(agentResponse, content);

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
    await sendMessage(content);
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

  // Show code examples (not applicable for agents - they handle this intelligently)
  const showCodeExamples = useCallback((
    messageId: string,
    language?: string
  ): void => {
    debugCodeGeneration('Show code examples requested but agent handles this automatically');
  }, []);

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