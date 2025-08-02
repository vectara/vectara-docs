// Enhanced Production Chat Hook for Vectara API v2
// Future-ready implementation with v2 API endpoints and request format

import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  ChatMessage, 
  ChatState, 
  UseProductionChatOptions, 
  CodeSnippet, 
  AnalyticsEvent,
  SupportedLanguage,
  UseChatReturn,
  VectaraV2QueryRequest
} from '../types';
import { detectCodeType, generateCode, CODE_TEMPLATES } from '../utils/codeTemplates';
import { getApiEndpoint } from '../config/vectaraConfig';

export const useProductionChatV2 = (options: UseProductionChatOptions): UseChatReturn => {
  const {
    customerId,
    corpusKeys,
    apiKey,
    enableStreaming = false,
    codeGeneration,
    analytics,
    maxRetries = 3,
    timeout = 30000
  } = options;

  const [state, setState] = useState<ChatState>({
    messages: [],
    isLoading: false,
    error: null,
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    isStreaming: false,
    retryCount: 0
  });

  const abortController = useRef<AbortController | null>(null);
  const streamingTimeout = useRef<NodeJS.Timeout | null>(null);

  const trackEvent = useCallback((event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId'>) => {
    if (analytics?.enabled && analytics.onEvent) {
      analytics.onEvent({
        ...event,
        timestamp: Date.now(),
        sessionId: state.sessionId
      });
    }
  }, [analytics, state.sessionId]);

  const generateCodeSnippets = useCallback((content: string, forceCodeType?: string): CodeSnippet[] => {
    if (!codeGeneration?.enabled) return [];

    const codeType = forceCodeType || detectCodeType(content);
    if (!codeType) return [];

    const snippets: CodeSnippet[] = [];
    const defaultParams = codeGeneration.defaultParameters || {};

    codeGeneration.supportedLanguages.forEach((lang) => {
      const template = CODE_TEMPLATES[codeType]?.[lang];
      if (template) {
        const parameters: Record<string, any> = {};
        
        template.parameters.forEach(param => {
          parameters[param] = {
            type: 'string',
            value: defaultParams[param] || `YOUR_${param.toUpperCase()}`,
            required: true,
            description: `Your ${param.replace(/([A-Z])/g, ' $1').toLowerCase()}`
          };
        });

        const code = generateCode(codeType, lang as SupportedLanguage, defaultParams);

        snippets.push({
          id: `${codeType}_${lang}_${Date.now()}`,
          language: lang,
          code,
          title: `${codeType.charAt(0).toUpperCase() + codeType.slice(1)} - ${lang}`,
          description: `Example ${codeType} implementation in ${lang}`,
          parameters,
          canTest: codeType === 'search'
        });
      }
    });

    if (snippets.length > 0) {
      trackEvent({
        type: 'code_generation',
        data: { codeType, languageCount: snippets.length, query: content.substring(0, 100) }
      });
    }

    return snippets;
  }, [codeGeneration, trackEvent]);

  const makeVectaraRequest = useCallback(async (query: string, isRetry = false): Promise<any> => {
    const controller = new AbortController();
    abortController.current = controller;

    // Use first corpus for v2 API (v2 handles single corpus per request)
    const corpusId = corpusKeys[0];
    const endpoint = getApiEndpoint('query', corpusId);

    // Enhanced v2 API request with optimized parameters
    const requestBody: VectaraV2QueryRequest = {
      query,
      search: {
        corpora: [{
          corpus_key: corpusId,
          semantics: 'default',
          metadata_filter: '',
          lexical_interpolation: 0.005  // Enhanced lexical interpolation
        }],
        offset: 0,
        limit: 10,
        context_configuration: {
          sentences_before: 2,
          sentences_after: 2,
          start_tag: '%START_SNIPPET%',
          end_tag: '%END_SNIPPET%'
        }
      },
      generation: {
        prompt_name: 'vectara-summary-ext-24-05-med-omni',  // Latest summarizer
        max_used_search_results: 10,
        response_language: 'eng'
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        ...(enableStreaming && { 'Accept': 'text/event-stream' })
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API request failed: ${response.status} ${response.statusText} - ${errorText}`);
    }

    if (enableStreaming && response.headers.get('content-type')?.includes('text/event-stream')) {
      return response;
    }

    return response.json();
  }, [corpusKeys, apiKey, enableStreaming]);

  const processStreamingResponse = useCallback(async (
    response: Response, 
    messageId: string
  ): Promise<void> => {
    if (!response.body) {
      throw new Error('No response body for streaming');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let accumulatedContent = '';

    setState(prev => ({
      ...prev,
      isStreaming: true
    }));

    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6).trim();
            
            if (data === '[DONE]') {
              setState(prev => ({
                ...prev,
                isStreaming: false,
                messages: prev.messages.map(msg =>
                  msg.id === messageId
                    ? {
                        ...msg,
                        isStreaming: false,
                        hasCodeSnippets: codeGeneration?.enabled && detectCodeType(accumulatedContent) !== null,
                        codeSnippets: generateCodeSnippets(accumulatedContent)
                      }
                    : msg
                )
              }));
              return;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedContent += parsed.content;
                
                setState(prev => ({
                  ...prev,
                  messages: prev.messages.map(msg =>
                    msg.id === messageId
                      ? { ...msg, content: accumulatedContent }
                      : msg
                  )
                }));
              }
            } catch (e) {
              // Skip malformed JSON
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
      setState(prev => ({ ...prev, isStreaming: false }));
    }
  }, [codeGeneration, generateCodeSnippets]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || state.isLoading) return;

    const userMessageId = `user_${Date.now()}`;
    const assistantMessageId = `assistant_${Date.now()}`;

    trackEvent({
      type: 'query',
      data: { query: content, messageLength: content.length }
    });

    setState(prev => ({
      ...prev,
      messages: [
        ...prev.messages,
        {
          id: userMessageId,
          type: 'user',
          content,
          timestamp: Date.now()
        }
      ],
      isLoading: true,
      error: null,
      retryCount: 0
    }));

    let retryCount = 0;
    
    while (retryCount <= maxRetries) {
      try {
        if (enableStreaming) {
          const assistantMessage: ChatMessage = {
            id: assistantMessageId,
            type: 'assistant',
            content: '',
            timestamp: Date.now(),
            isStreaming: true
          };

          setState(prev => ({
            ...prev,
            messages: [...prev.messages, assistantMessage],
            isLoading: false
          }));

          const response = await makeVectaraRequest(content, retryCount > 0);
          await processStreamingResponse(response, assistantMessageId);
        } else {
          const response = await makeVectaraRequest(content, retryCount > 0);
          
          // v2 API response format (adjust based on actual v2 response structure)
          const responseText = response.answer || response.summary || 'No response received';
          const references = response.search_results?.map((r: any, index: number) => ({
            id: `ref_${index}`,
            title: r.document?.metadata?.title || `Reference ${index + 1}`,
            snippet: r.part?.text || r.text,
            score: r.score
          })) || [];

          // Check if this could have code examples (but didn't auto-generate)
          const couldHaveCode = codeGeneration?.enabled && (
            responseText.toLowerCase().includes('search') ||
            responseText.toLowerCase().includes('query') ||
            responseText.toLowerCase().includes('upload') ||
            responseText.toLowerCase().includes('document') ||
            responseText.toLowerCase().includes('api') ||
            responseText.toLowerCase().includes('implement')
          );
          
          const hasAutoCode = detectCodeType(responseText) !== null;

          const assistantMessage: ChatMessage = {
            id: assistantMessageId,
            type: 'assistant',
            content: responseText,
            timestamp: Date.now(),
            hasCodeSnippets: hasAutoCode,
            codeSnippets: hasAutoCode ? generateCodeSnippets(responseText) : [],
            references,
            // Add flag to show "Show code examples" button
            canShowCode: couldHaveCode && !hasAutoCode
          };

          setState(prev => ({
            ...prev,
            messages: [...prev.messages, assistantMessage],
            isLoading: false
          }));

          trackEvent({
            type: 'query',
            data: { 
              success: true, 
              responseLength: responseText.length,
              referencesCount: references.length,
              hasCodeGenerated: assistantMessage.hasCodeSnippets
            }
          });
        }

        break;
      } catch (error) {
        retryCount++;
        
        if (retryCount > maxRetries) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
          
          setState(prev => ({
            ...prev,
            isLoading: false,
            error: errorMessage,
            retryCount
          }));

          trackEvent({
            type: 'error',
            data: { error: errorMessage, retryCount, query: content }
          });
          
          break;
        }

        // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
        
        setState(prev => ({
          ...prev,
          retryCount
        }));
      }
    }
  }, [
    state.isLoading, 
    enableStreaming, 
    makeVectaraRequest, 
    processStreamingResponse, 
    generateCodeSnippets, 
    codeGeneration,
    maxRetries,
    trackEvent
  ]);

  const retry = useCallback(() => {
    if (state.messages.length > 0) {
      const lastUserMessage = [...state.messages].reverse().find(msg => msg.type === 'user');
      if (lastUserMessage) {
        // Remove the last assistant message if it exists and had an error
        setState(prev => ({
          ...prev,
          messages: prev.messages.filter((_, index) => 
            index < prev.messages.length - (prev.error ? 1 : 0)
          ),
          error: null
        }));
        
        sendMessage(lastUserMessage.content);
      }
    }
  }, [state.messages, state.error, sendMessage]);

  const clearChat = useCallback(() => {
    if (abortController.current) {
      abortController.current.abort();
    }
    
    setState({
      messages: [],
      isLoading: false,
      error: null,
      sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      isStreaming: false,
      retryCount: 0
    });

    trackEvent({
      type: 'session_end',
      data: { messageCount: state.messages.length }
    });
  }, [state.messages.length, trackEvent]);

  const showCodeExamples = useCallback((messageId: string, codeType?: string) => {
    setState(prev => ({
      ...prev,
      messages: prev.messages.map(msg =>
        msg.id === messageId
          ? {
              ...msg,
              hasCodeSnippets: true,
              codeSnippets: generateCodeSnippets(msg.content, codeType),
              canShowCode: false // Hide the button once code is shown
            }
          : msg
      )
    }));

    trackEvent({
      type: 'code_generation',
      data: {
        messageId,
        codeType: codeType || 'on_demand',
        trigger: 'show_code_button'
      }
    });
  }, [generateCodeSnippets, trackEvent]);

  const updateCodeParameter = useCallback((
    messageId: string, 
    snippetId: string, 
    parameterName: string, 
    value: any
  ) => {
    setState(prev => ({
      ...prev,
      messages: prev.messages.map(msg => {
        if (msg.id === messageId && msg.codeSnippets) {
          return {
            ...msg,
            codeSnippets: msg.codeSnippets.map(snippet => {
              if (snippet.id === snippetId) {
                const updatedParameters = {
                  ...snippet.parameters,
                  [parameterName]: {
                    ...snippet.parameters[parameterName],
                    value
                  }
                };

                // Regenerate code with updated parameters
                const codeType = detectCodeType(msg.content);
                if (codeType) {
                  const paramValues: Record<string, any> = {};
                  Object.entries(updatedParameters).forEach(([key, param]) => {
                    paramValues[key] = param.value;
                  });

                  const updatedCode = generateCode(codeType, snippet.language as SupportedLanguage, paramValues);
                  
                  return {
                    ...snippet,
                    parameters: updatedParameters,
                    code: updatedCode
                  };
                }
              }
              return snippet;
            })
          };
        }
        return msg;
      })
    }));

    trackEvent({
      type: 'button_click',
      data: { action: 'update_parameter', parameter: parameterName, value }
    });
  }, [trackEvent]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
      if (streamingTimeout.current) {
        clearTimeout(streamingTimeout.current);
      }
    };
  }, []);

  // Track session start
  useEffect(() => {
    trackEvent({
      type: 'session_start',
      data: { customerId, corpusKeys: corpusKeys.join(',') }
    });
  }, [customerId, corpusKeys, trackEvent]);

  return {
    ...state,
    sendMessage,
    retry,
    clearChat,
    updateCodeParameter,
    showCodeExamples
  };
};