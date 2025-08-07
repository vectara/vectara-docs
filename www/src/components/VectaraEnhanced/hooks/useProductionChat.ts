// Enhanced Production Chat Hook for Vectara API v1
// Includes intelligent code generation and comprehensive error handling

import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  ChatMessage, 
  ChatState, 
  UseProductionChatOptions, 
  CodeSnippet, 
  AnalyticsEvent,
  SupportedLanguage,
  UseChatReturn,
  ConversationHistory
} from '../types';
import { detectCodeType, generateCodeSync, CODE_TEMPLATES } from '../utils/codeTemplates';
import { generateEnhancedContext } from '../utils/openApiContext';
import { saveConversation, generateConversationTitle } from '../utils/conversationPersistence';
import { generateSearchSuggestions, saveRecentQuery } from '../utils/searchSuggestions';
import { findRelevantExamples, getExample, formatExampleForChat } from '../../../utils/exampleLookup';

// Detect if user is asking for code examples
const detectExampleRequest = (query: string): boolean => {
  const lowerQuery = query.toLowerCase();
  const exampleKeywords = [
    'example', 'examples', 'sample', 'demo', 'show me how',
    'give me an example', 'provide an example', 'code example',
    'sample code', 'how do i', 'how to', 'tutorial',
    'walkthrough', 'step by step', 'guide me'
  ];
  
  return exampleKeywords.some(keyword => lowerQuery.includes(keyword));
};

// Extract context-specific parameters from user queries
const extractContextParameters = (query: string): Record<string, any> => {
  const params: Record<string, any> = {};
  const lowerQuery = query.toLowerCase();
  
  // Extract corpus references
  const corpusMatch = query.match(/corpus[:\s]+([\w-]+)/i);
  if (corpusMatch) params.corpusKey = corpusMatch[1];
  
  // Extract customer ID references  
  const customerMatch = query.match(/customer[:\s]+(\d+)/i);
  if (customerMatch) params.customerId = customerMatch[1];
  
  // Extract specific endpoints or operations
  if (lowerQuery.includes('search') || lowerQuery.includes('query')) {
    params.operation = 'search';
    params.endpoint = '/v2/chats';
  } else if (lowerQuery.includes('upload') || lowerQuery.includes('document')) {
    params.operation = 'upload';
    params.endpoint = '/v2/corpora/{corpus-key}/documents';
  } else if (lowerQuery.includes('corpus')) {
    params.operation = 'corpus';
    params.endpoint = '/v2/corpora';
  }
  
  // Extract programming language preferences
  if (lowerQuery.includes('javascript') || lowerQuery.includes('js')) params.preferredLang = 'javascript';
  if (lowerQuery.includes('python') || lowerQuery.includes('py')) params.preferredLang = 'python';
  if (lowerQuery.includes('curl') || lowerQuery.includes('bash')) params.preferredLang = 'curl';
  
  // Extract specific topics
  if (lowerQuery.includes('auth') || lowerQuery.includes('key')) params.topic = 'authentication';
  if (lowerQuery.includes('metadata') || lowerQuery.includes('filter')) params.topic = 'filtering';
  if (lowerQuery.includes('stream')) params.topic = 'streaming';
  
  return params;
};

// Add numbered reference citations to response text
const addNumberedReferences = (responseText: string, references: any[]): string => {
  // Temporarily disable numbered references to fix build issues
  return responseText;
};

// Check if we can confidently generate code for this query
const isConfidentCodeGeneration = (userQuery: string, responseContent: string): boolean => {
  const query = (userQuery + ' ' + responseContent).toLowerCase();
  
  // Generate templates for API-related queries
  const confidentPatterns = [
    // API operations
    /\bapi\b.*\b(call|request|endpoint|delete|create|get|post|put)\b/,
    /\b(post|get|put|delete|create|remove)\b.*\b(request|api|endpoint)\b/,
    
    // Vectara-specific operations
    /\bvectara\b.*\b(api|search|query|upload|delete|create|index)\b/,
    /\bcorpus\b.*\b(create|search|query|delete|remove|manage)\b/,
    /\bdocument\b.*\b(upload|index|delete|remove|add)\b/,
    
    // Common API patterns
    /\bsearch\b.*\b(api|query|request|endpoint)\b/,
    /\bindex\b.*\b(document|data|file)\b/,
    /\bupload\b.*\b(document|data|file)\b/,
    /\bdelete\b.*\b(document|corpus|data)\b/,
    /\bcreate\b.*\b(corpus|document|api)\b/,
    
    // Response mentions specific endpoints or methods
    /\bdelete\s+request\b/,
    /\bpost\s+request\b/,
    /\bget\s+request\b/,
    /\bput\s+request\b/,
    /\bapi\s+endpoint\b/,
    /\b\/v\d+\/\b/, // API version paths like /v1/ or /v2/
  ];
  
  return confidentPatterns.some(pattern => pattern.test(query));
};

// Generate cURL code from request example
const generateCurlFromRequest = (requestExample: any, metadata: any): string => {
  const endpoint = metadata.endpoint || '/v2/chats';
  const method = metadata.method || 'POST';
  
  let curlCode = `curl -X ${method} 'https://api.vectara.io${endpoint}' \\\n`;
  curlCode += `  -H 'Content-Type: application/json' \\\n`;
  curlCode += `  -H 'Authorization: Bearer YOUR_API_KEY' \\\n`;
  curlCode += `  -H 'customer-id: YOUR_CUSTOMER_ID' \\\n`;
  curlCode += `  -d '${JSON.stringify(requestExample, null, 2)}'`;
  
  return curlCode;
};

// Generate JavaScript/Python code from request example
const generateCodeFromExample = (requestExample: any, language: string, metadata: any): string => {
  const endpoint = metadata.endpoint || '/v2/chats';
  const method = metadata.method || 'POST';
  
  if (language === 'javascript') {
    return `// ${metadata.description}
const response = await fetch('https://api.vectara.io${endpoint}', {
  method: '${method}',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY',
    'customer-id': 'YOUR_CUSTOMER_ID'
  },
  body: JSON.stringify(${JSON.stringify(requestExample, null, 2)})
});

const data = await response.json();
console.log(data);`;
  } else if (language === 'python') {
    return `# ${metadata.description}
import requests
import json

url = 'https://api.vectara.io${endpoint}'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY',
    'customer-id': 'YOUR_CUSTOMER_ID'
}

payload = ${JSON.stringify(requestExample, null, 2).replace(/"/g, "'")}

response = requests.${method.toLowerCase()}(url, headers=headers, json=payload)
data = response.json()
print(data)`;
  }
  
  return '';
};

// Extract code blocks from response content
const extractCodeFromResponse = (content: string, language?: string): any[] => {
  const codeBlocks: any[] = [];
  
  // Find all code blocks in the content
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let match;
  let index = 0;
  
  while ((match = codeBlockRegex.exec(content)) !== null) {
    const blockLanguage = match[1] || 'text';
    const code = match[2].trim();
    
    // Only include if language matches (if specified) or if it's a relevant language
    const relevantLanguages = ['javascript', 'python', 'bash', 'curl', 'json'];
    if (language && blockLanguage !== language) continue;
    if (!language && !relevantLanguages.includes(blockLanguage)) continue;
    
    codeBlocks.push({
      id: `corpus_${blockLanguage}_${Date.now()}_${index++}`,
      language: blockLanguage,
      code: code,
      title: `Code from response - ${blockLanguage}`,
      description: `Code example found in corpus response`,
      parameters: {},
      canTest: blockLanguage === 'curl' || blockLanguage === 'javascript' || blockLanguage === 'python'
    });
  }
  
  return codeBlocks;
};

// Determine if we should show code buttons - only if we can provide relevant code
const shouldShowCodeButtons = async (userQuery: string, responseContent: string): Promise<boolean> => {
  try {
    // 1. Check if examples directory has relevant examples
    const exampleIds = await findRelevantExamples(userQuery);
    if (exampleIds.length > 0) {
      console.log('Should show code buttons: found relevant examples');
      return true;
    }
    
    // 2. Check if response contains code blocks from corpus
    const responseHasCode = /```[\s\S]*?```/.test(responseContent);
    if (responseHasCode) {
      console.log('Should show code buttons: response has code blocks');
      return true;
    }
    
    // 3. Check if we can confidently generate template code
    if (isConfidentCodeGeneration(userQuery, responseContent)) {
      console.log('Should show code buttons: confident code generation possible');
      return true;
    }
    
    console.log('Should NOT show code buttons: no relevant code available');
    return false;
  } catch (error) {
    console.error('Error determining if should show code buttons:', error);
    return false;
  }
};

// Fetch and format relevant examples for chat response
const fetchRelevantExamples = async (query: string): Promise<string> => {
  try {
    const exampleIds = await findRelevantExamples(query);
    if (exampleIds.length === 0) {
      return '';
    }

    let examplesContent = '\n\n## 📋 Relevant Code Examples\n\n';
    
    // Fetch up to 3 examples to avoid overwhelming the response
    const maxExamples = Math.min(3, exampleIds.length);
    for (let i = 0; i < maxExamples; i++) {
      const exampleId = exampleIds[i];
      const example = await getExample(exampleId);
      
      if (example) {
        examplesContent += formatExampleForChat(example);
        if (i < maxExamples - 1) {
          examplesContent += '---\n\n';
        }
      }
    }
    
    if (exampleIds.length > maxExamples) {
      examplesContent += `\n*... and ${exampleIds.length - maxExamples} more examples available.*\n`;
    }
    
    return examplesContent;
  } catch (error) {
    console.error('Error fetching examples:', error);
    return '';
  }
};

// Smart filtering function to show optimal number of sources
const filterSourcesByRelevance = (references: any[], maxSources: number = 5, highScoreThreshold: number = 0.8) => {
  if (!references || references.length === 0) return [];
  
  // Sort by score (highest first)
  const sortedRefs = references.sort((a, b) => (b.score || 0) - (a.score || 0));
  
  // Count high-scoring references
  const highScoreCount = sortedRefs.filter(ref => (ref.score || 0) >= highScoreThreshold).length;
  
  // Determine how many to show
  let showCount = maxSources;
  if (highScoreCount >= 6) {
    showCount = Math.min(8, sortedRefs.length); // Show up to 8 for high-quality results
  } else if (highScoreCount >= 3) {
    showCount = Math.min(6, sortedRefs.length); // Show up to 6 for good results
  }
  
  console.log('Source filtering:', {
    totalSources: references.length,
    highScoreCount,
    highScoreThreshold,
    showCount,
    topScores: sortedRefs.slice(0, 5).map(r => r.score)
  });
  
  return sortedRefs.slice(0, showCount);
};

export const useProductionChat = (options: UseProductionChatOptions): UseChatReturn => {
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

  const generateCodeSnippets = useCallback((content: string, forceCodeType?: string, userQuery?: string): CodeSnippet[] => {
    console.log('generateCodeSnippets called:', {
      content: content.substring(0, 50) + '...',
      forceCodeType,
      userQuery: userQuery?.substring(0, 50),
      codeGenerationEnabled: codeGeneration?.enabled,
      supportedLanguages: codeGeneration?.supportedLanguages
    });

    if (!codeGeneration?.enabled) {
      console.log('Code generation not enabled');
      return [];
    }

    const codeType = forceCodeType || detectCodeType(userQuery || content);
    console.log('Detected code type:', codeType);
    
    if (!codeType) {
      console.log('No code type detected');
      return [];
    }

    const snippets: CodeSnippet[] = [];
    // Extract context-specific parameters from the user query
    const contextParams = extractContextParameters(userQuery || content);
    const defaultParams = { ...codeGeneration.defaultParameters, ...contextParams };
    console.log('Context-aware parameters:', defaultParams);

    // Process languages synchronously to avoid async/await issues
    for (const lang of codeGeneration.supportedLanguages) {
      const template = CODE_TEMPLATES[codeType]?.[lang];
      console.log(`Template lookup for ${codeType}/${lang}:`, {
        found: !!template,
        availableCodeTypes: Object.keys(CODE_TEMPLATES),
        availableForCodeType: Object.keys(CODE_TEMPLATES[codeType] || {})
      });
      
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

        // Use synchronous code generation only
        const code = generateCodeSync(codeType, lang as SupportedLanguage, defaultParams);

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
    }

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

    // Use minimal context to avoid async OpenAPI fetch
    const enhancedContext = `Based on Vectara API v2 specification. Query: ${query}`;

    // Enhanced v1 API request with optimized parameters
    const requestBody = {
      query: [
        {
          query,
          queryContext: enhancedContext,
          start: 0,
          numResults: 20,  // Fetch more results behind the scenes
          contextConfig: {
            charsBefore: 0,
            charsAfter: 0,
            sentencesBefore: 2,
            sentencesAfter: 2,
            startTag: '%START_SNIPPET%',
            endTag: '%END_SNIPPET%'
          },
          corpusKey: corpusKeys.map(key => ({
            customerId: parseInt(customerId),
            corpusId: parseInt(key),
            semantics: 'DEFAULT',
            metadataFilter: '',
            lexicalInterpolationConfig: {
              lambda: 0.005  // Enhanced lexical interpolation
            }
          })),
          // Multilingual reranker configuration
          rerankingConfig: {
            rerankerId: 272725719,  // Vectara Multilingual Reranker
            maxUsedSearchResults: 10
          },
          // Enhanced summarization config
          summary: [
            {
              maxSummarizedResults: 20,  // Use more results for better summaries
              responseLang: 'eng',
              summarizerPromptName: 'vectara-summary-ext-24-05-med-omni'  // Latest summarizer
            }
          ]
        }
      ]
    };

    const response = await fetch('https://api.vectara.io/v1/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'customer-id': customerId,
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
  }, [customerId, corpusKeys, apiKey, enableStreaming]);

  const processStreamingResponse = useCallback(async (
    response: Response, 
    messageId: string,
    originalContent: string
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
              // Handle async code generation for streaming completion
              const shouldGenerateCode = codeGeneration?.enabled && detectCodeType(accumulatedContent) !== null;
              const shouldAddExamples = detectExampleRequest(originalContent);
              
              // Handle both code generation and examples
              if (shouldGenerateCode || shouldAddExamples) {
                try {
                  let finalContent = accumulatedContent;
                  let codeSnippets: any[] = [];
                  
                  // Generate code snippets if needed
                  if (shouldGenerateCode) {
                    codeSnippets = generateCodeSnippets(accumulatedContent, undefined, originalContent);
                  }
                  
                  // Add examples if requested
                  if (shouldAddExamples) {
                    const examplesContent = await fetchRelevantExamples(originalContent);
                    if (examplesContent) {
                      finalContent += examplesContent;
                    }
                  }
                  
                  setState(prev => ({
                    ...prev,
                    isStreaming: false,
                    messages: prev.messages.map(msg =>
                      msg.id === messageId
                        ? {
                            ...msg,
                            content: finalContent,
                            isStreaming: false,
                            hasCodeSnippets: shouldGenerateCode,
                            codeSnippets: codeSnippets
                          }
                        : msg
                    )
                  }));
                } catch (error) {
                  console.error('Error processing streaming completion:', error);
                  setState(prev => ({
                    ...prev,
                    isStreaming: false,
                    messages: prev.messages.map(msg =>
                      msg.id === messageId
                        ? {
                            ...msg,
                            isStreaming: false,
                            hasCodeSnippets: false,
                            codeSnippets: []
                          }
                        : msg
                    )
                  }));
                }
              } else {
                setState(prev => ({
                  ...prev,
                  isStreaming: false,
                  messages: prev.messages.map(msg =>
                    msg.id === messageId
                      ? {
                          ...msg,
                          isStreaming: false,
                          hasCodeSnippets: false,
                          codeSnippets: []
                        }
                      : msg
                  )
                }));
              }
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

  const sendMessage = useCallback(async (content: string, parentMessageId?: string) => {
    if (!content.trim() || state.isLoading) return;

    const userMessageId = `user_${Date.now()}`;
    const assistantMessageId = `assistant_${Date.now()}`;
    const threadId = parentMessageId ? `thread_${Date.now()}` : undefined;

    // Save recent query for suggestions
    saveRecentQuery(content);

    trackEvent({
      type: 'query',
      data: { query: content, messageLength: content.length, isFollowUp: !!parentMessageId }
    });

    const userMessage: ChatMessage = {
      id: userMessageId,
      type: 'user',
      content,
      timestamp: Date.now(),
      threadId,
      parentMessageId,
      isFollowUp: !!parentMessageId
    };

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
      isTyping: true,
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
          await processStreamingResponse(response, assistantMessageId, content);
        } else {
          const response = await makeVectaraRequest(content, retryCount > 0);
          
          // v1 API response format
          const responseText = response.responseSet?.[0]?.summary?.[0]?.text || 'No response received';
          const references = response.responseSet?.[0]?.response?.map((r: any, index: number) => {
            // Get source/filename to detect if this is from OpenAPI specs
            const source = r.metadata?.find((m: any) => m.name === 'source')?.value || 
                          r.metadata?.find((m: any) => m.name === 'filename')?.value || 
                          r.metadata?.find((m: any) => m.name === 'path')?.value || '';
            
            const isOpenAPISpec = source.includes('vectara-oas-v2') || 
                                 source.includes('.yaml') || 
                                 source.includes('.yml') ||
                                 r.text?.includes('openapi:') ||
                                 r.text?.includes('swagger:') ||
                                 r.text?.includes('/paths/') ||
                                 r.text?.includes('parameters:') ||
                                 r.text?.includes('responses:');
            
            let title: string;
            let url: string | undefined;
            
            if (isOpenAPISpec) {
              // For OpenAPI specs, use a consistent title and link to the spec file
              title = "Vectara OpenAPI v2 Specification";
              url = "https://docs.vectara.com/vectara-oas-v2.yaml";
              
              // Try to extract specific endpoint or section from the snippet
              const endpointMatch = r.text?.match(/\/v2\/[^:\s]+/);
              const operationMatch = r.text?.match(/(get|post|put|delete|patch):/i);
              
              if (endpointMatch) {
                title = `OpenAPI Spec: ${endpointMatch[0]}`;
              } else if (operationMatch) {
                title = `OpenAPI Spec: ${operationMatch[1].toUpperCase()} operation`;
              }
            } else {
              // For regular docs, try to extract title and construct proper URL
              title = r.metadata?.find((m: any) => m.name === 'title')?.value || 
                     r.metadata?.find((m: any) => m.name === 'doc.title')?.value ||
                     r.metadata?.find((m: any) => m.name === 'filename')?.value ||
                     r.metadata?.find((m: any) => m.name === 'name')?.value ||
                     r.metadata?.find((m: any) => m.name === 'document_title')?.value;
              
              // Extract title from text if no metadata title found
              if (!title) {
                // Look for patterns like "Create a Corpus | Vectara Docs" in the text
                const textLines = r.text?.split('\n') || [];
                const potentialTitle = textLines.find(line => 
                  line.includes('|') && (line.includes('Vectara') || line.includes('Docs'))
                );
                if (potentialTitle) {
                  title = potentialTitle.split('|')[0].trim();
                } else {
                  // Use first meaningful line as title
                  title = textLines.find(line => line.trim().length > 3 && !line.includes('%START_SNIPPET%'))?.trim() || 
                         `Document ${index + 1}`;
                }
              }
              
              // Extract URL from metadata exactly like @vectara/react-search does
              url = r.metadata?.find((m: any) => m.name === 'url')?.value;
              
              // STEP 2: Try to get file path from metadata and construct URL
              if (!url) {
                const pathMeta = r.metadata?.find((m: any) => m.name === 'source')?.value ||
                                r.metadata?.find((m: any) => m.name === 'file_path')?.value ||
                                r.metadata?.find((m: any) => m.name === 'path')?.value ||
                                r.metadata?.find((m: any) => m.name === 'filename')?.value;
                
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
              if (!url && title && title !== `Document ${index + 1}` && !title.includes('<') && !title.includes('%')) {
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
                const textLines = r.text?.split('\n') || [];
                
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
                if (title === `Document ${index + 1}`) {
                  title = `Vectara Documentation`;
                }
              }
              
              // Clean up URL format
              if (url && !url.startsWith('http')) {
                url = url.startsWith('/') ? `https://docs.vectara.com${url}` : `https://docs.vectara.com/${url}`;
              }
            }
            
            console.log(`📄 RESULT ${index + 1}:`, {
              title,
              finalUrl: url,
              documentIndex: r.documentIndex,
              allMetadata: r.metadata?.map(m => `${m.name}: ${m.value?.substring(0, 100)}`) || 'NO METADATA',
              textPreview: r.text?.substring(0, 200)
            });
            
            // Log each metadata field separately for visibility
            if (r.metadata) {
              console.log(`🔑 Metadata for Result ${index + 1}:`);
              r.metadata.forEach(m => {
                console.log(`  - ${m.name}: "${m.value}"`);
              });
            } else {
              console.log(`❌ No metadata available for Result ${index + 1}`);
            }
            
            return {
              id: `ref_${index}`,
              title,
              snippet: r.text,
              score: r.score,
              url
            };
          }) || [];

          // Apply smart filtering to show optimal number of sources
          const filteredReferences = filterSourcesByRelevance(references, 5, 0.8);

          // Add numbered references to the response text
          let responseWithReferences = addNumberedReferences(responseText, filteredReferences);

          // Check if user is asking for examples and fetch relevant ones
          const isExampleRequest = detectExampleRequest(content);
          if (isExampleRequest) {
            try {
              const examplesContent = await fetchRelevantExamples(content);
              if (examplesContent) {
                responseWithReferences += examplesContent;
              }
            } catch (error) {
              console.error('Error adding examples to response:', error);
            }
          }

          // Enhanced logic for showing code buttons - only when we can provide relevant code
          const couldHaveCode = codeGeneration?.enabled && await shouldShowCodeButtons(content, responseWithReferences);
          
          const hasAutoCode = detectCodeType(responseWithReferences) !== null;
          
          console.log('Code detection debug:', {
            codeGenerationEnabled: codeGeneration?.enabled,
            couldHaveCode,
            hasAutoCode,
            responseText: responseText.substring(0, 100) + '...',
            canShowCode: couldHaveCode && !hasAutoCode
          });

          const assistantMessage: ChatMessage = {
            id: assistantMessageId,
            type: 'assistant',
            content: responseWithReferences,
            timestamp: Date.now(),
            hasCodeSnippets: hasAutoCode,
            codeSnippets: hasAutoCode ? generateCodeSnippets(responseWithReferences, undefined, content) : [],
            references: filteredReferences,
            canShowCode: couldHaveCode && !hasAutoCode,
            threadId,
            parentMessageId: userMessageId
          };

          setState(prev => {
            const updatedMessages = [...prev.messages, assistantMessage];
            
            // Save conversation after each exchange
            const conversation: ConversationHistory = {
              id: prev.sessionId,
              title: generateConversationTitle(updatedMessages),
              messages: updatedMessages,
              lastActivity: Date.now(),
              sessionId: prev.sessionId
            };
            saveConversation(conversation);
            
            return {
              ...prev,
              messages: updatedMessages,
              isLoading: false,
              isTyping: false
            };
          });

          trackEvent({
            type: 'query',
            data: { 
              success: true, 
              responseLength: responseText.length,
              referencesCount: filteredReferences.length,
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
            isTyping: false,
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

  const showCodeExamples = useCallback(async (messageId: string, language?: string) => {
    console.log('🚀 showCodeExamples called:', { messageId, language });
    
    // Find the original user message to get context
    const targetMessage = state.messages.find(msg => msg.id === messageId);
    if (!targetMessage) {
      console.error('❌ Target message not found:', messageId);
      return;
    }
    
    console.log('✅ Target message found:', { 
      messageId, 
      messageType: targetMessage.type, 
      contentPreview: targetMessage.content.substring(0, 100) 
    });
    
    // Find the corresponding user message for context
    const messageIndex = state.messages.findIndex(msg => msg.id === messageId);
    const userMessage = messageIndex > 0 ? state.messages[messageIndex - 1] : null;
    const userQuery = userMessage?.type === 'user' ? userMessage.content : '';
    
    try {
      // Simple approach: just generate code snippets directly
      console.log('Generating code snippets for message content...');
      const allSnippets = generateCodeSnippets(targetMessage.content, undefined, userQuery);
      console.log('Generated', allSnippets.length, 'total snippets');
      
      // Filter by requested language if specified
      const codeSnippets = language 
        ? allSnippets.filter(s => s.language === language)
        : allSnippets;
      
      console.log('Filtered to', codeSnippets.length, 'snippets for', language || 'all languages');
      
      if (codeSnippets.length > 0) {
        console.log('📝 Updating state with', codeSnippets.length, 'code snippets');
        setState(prev => ({
          ...prev,
          messages: prev.messages.map(msg => {
            if (msg.id === messageId) {
              console.log('✅ Updating message:', msg.id, 'with', codeSnippets.length, 'code snippets for', language || 'all languages');
              
              // If we're adding a specific language, merge with existing snippets
              const existingSnippets = Array.isArray(msg.codeSnippets) ? msg.codeSnippets : [];
              const newSnippets = language 
                ? [...existingSnippets.filter(s => s.language !== language), ...codeSnippets]
                : codeSnippets;
              
              return {
                ...msg,
                hasCodeSnippets: true,
                codeSnippets: newSnippets,
                canShowCode: false // Hide the buttons since we now have code
              };
            }
            return msg;
          })
        }));
        
        trackEvent({
          type: 'code_generation',
          data: {
            messageId,
            language: language || 'all',
            trigger: 'show_code_button',
            source: codeSnippets[0]?.description?.includes('examples directory') ? 'examples' : 
                   codeSnippets[0]?.description?.includes('corpus') ? 'corpus' : 'template'
          }
        });
        console.log('🎉 Successfully updated message with code snippets');
      } else {
        console.log('⚠️ No code snippets to show');
      }
    } catch (error) {
      console.error('❌ Error generating code snippets:', error);
      setState(prev => ({
        ...prev,
        messages: prev.messages.map(msg => {
          if (msg.id === messageId) {
            return {
              ...msg,
              hasCodeSnippets: false,
              codeSnippets: [],
              canShowCode: false
            };
          }
          return msg;
        })
      }));
    }
  }, [state.messages, generateCodeSnippets, trackEvent]);

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

                  const updatedCode = generateCodeSync(codeType, snippet.language as SupportedLanguage, paramValues);
                  
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

  // Generate search suggestions
  const getSearchSuggestions = useCallback((input: string) => {
    const suggestions = generateSearchSuggestions(input, 5);
    setState(prev => ({ ...prev, searchSuggestions: suggestions }));
    return suggestions;
  }, []);

  // Create follow-up message
  const sendFollowUp = useCallback(async (content: string, parentMessageId: string) => {
    await sendMessage(content, parentMessageId);
  }, [sendMessage]);

  return {
    ...state,
    sendMessage,
    sendFollowUp,
    retry,
    clearChat,
    updateCodeParameter,
    showCodeExamples,
    getSearchSuggestions
  };
};