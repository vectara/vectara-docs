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
import { generateSearchSuggestions } from '../utils/searchSuggestions';

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
    retryCount: 0,
    isTyping: false,
    searchSuggestions: [],
    conversationHistory: []
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
          const references = response.search_results?.map((r: any, index: number) => {
            // Try to extract meaningful title from metadata or content
            let title = r.document?.metadata?.title || 
                       r.document?.metadata?.filename ||
                       r.document?.metadata?.name ||
                       r.document?.metadata?.document_title;
            
            // STEP 1: Try to get direct URL from metadata
            let url = r.document?.metadata?.url || 
                     r.document?.metadata?.doc_url ||
                     r.document?.metadata?.link;
            
            // If no title found, try to extract from text content
            if (!title) {
              const textContent = r.part?.text || r.text || '';
              const textLines = textContent.split('\n');
              
              // Look for page title patterns
              const potentialTitle = textLines.find(line => 
                line.includes('|') && (line.includes('Vectara') || line.includes('Docs'))
              );
              
              if (potentialTitle) {
                title = potentialTitle.split('|')[0].trim();
              } else {
                // Use first meaningful line as title
                const firstLine = textLines.find(line => 
                  line.trim().length > 3 && !line.includes('%START_SNIPPET%')
                )?.trim();
                
                if (firstLine) {
                  title = firstLine.length > 50 ? firstLine.substring(0, 47) + '...' : firstLine;
                } else {
                  title = `Search Result ${index + 1}`;
                }
              }
            }
            
            // STEP 2: Try to get file path from metadata and construct URL
            if (!url) {
              const pathMeta = r.document?.metadata?.source ||
                              r.document?.metadata?.file_path ||
                              r.document?.metadata?.path ||
                              r.document?.metadata?.filename;
              
              if (pathMeta && typeof pathMeta === 'string' && !pathMeta.includes('<')) {
                // Clean and construct proper URL from path
                let cleanPath = pathMeta;
                
                // If it's already a full URL, use it
                if (cleanPath.startsWith('http')) {
                  url = cleanPath;
                } else {
                  // Clean up common path formats
                  cleanPath = cleanPath
                    .replace(/^\/+/, '') // Remove leading slashes
                    .replace(/\.mdx?$/, '') // Remove .md/.mdx extensions
                    .replace(/\/index$/, '') // Remove /index endings
                    .replace(/^docs\//, '') // Remove docs/ prefix if present
                    .replace(/^www\//, ''); // Remove www/ prefix if present
                  
                  // Only proceed if cleanPath looks like a valid path (no HTML tags)
                  if (cleanPath && !cleanPath.includes('<') && !cleanPath.includes('%')) {
                    url = `https://docs.vectara.com/docs/${cleanPath}`;
                  }
                }
              }
            }
            
            // STEP 3: Only if we have a clean title (no HTML), try title-based URL
            if (!url && title && title !== `Search Result ${index + 1}` && title !== `Reference ${index + 1}` && !title.includes('<') && !title.includes('%')) {
              // Check if title looks like a page title (contains " | ")
              if (title.includes(' | ')) {
                const pageName = title.split(' | ')[0].trim();
                if (pageName && !pageName.includes('<')) {
                  const urlPath = pageName.toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '');
                  
                  if (urlPath && urlPath.length > 2) {
                    url = `https://docs.vectara.com/docs/${urlPath}`;
                  }
                }
              }
            }
            
            // STEP 4: Look for clean page titles in text (avoid HTML-encoded content)
            if (!url) {
              const textContent = r.part?.text || r.text || '';
              const textLines = textContent.split('\n');
              
              // Look for page titles in format "Title | Vectara Docs" that don't contain HTML
              const titleLine = textLines.find(line => 
                line.includes('|') && 
                (line.includes('Vectara') || line.includes('Docs')) &&
                !line.includes('<') &&
                !line.includes('%') &&
                !line.includes('&') &&
                line.trim().length < 100 // Reasonable title length
              );
              
              if (titleLine) {
                const pageName = titleLine.split('|')[0].trim();
                if (pageName && pageName.length > 3 && pageName.length < 80) {
                  const urlPath = pageName.toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^a-z0-9-]/g, '')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '');
                  
                  if (urlPath && urlPath.length > 2) {
                    url = `https://docs.vectara.com/docs/${urlPath}`;
                    // Update title to be more meaningful
                    title = pageName;
                  }
                }
              }
            }
            
            // STEP 5: Final fallback - just use docs homepage (no search URLs with HTML content)
            if (!url) {
              url = `https://docs.vectara.com/docs/`;
              if (title === `Search Result ${index + 1}` || title === `Reference ${index + 1}`) {
                title = `Vectara Documentation`;
              }
            }
            
            // Clean up URL format
            if (url && !url.startsWith('http')) {
              url = url.startsWith('/') ? `https://docs.vectara.com${url}` : `https://docs.vectara.com/${url}`;
            }
            
            return {
              id: `ref_${index}`,
              title,
              snippet: r.part?.text || r.text,
              score: r.score,
              url
            };
          }) || [];

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
      retryCount: 0,
      isTyping: false,
      searchSuggestions: [],
      conversationHistory: []
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

  // Get search suggestions
  const getSearchSuggestions = useCallback((input: string): string[] => {
    const suggestions = generateSearchSuggestions(input, 5);
    setState(prev => ({ ...prev, searchSuggestions: suggestions }));
    return suggestions;
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
    showCodeExamples,
    getSearchSuggestions
  };
};