// Enhanced React Chatbot Search Types
// Extends the base Vectara react-chatbot with search integration and code generation

export type SupportedLanguage = 'javascript' | 'typescript' | 'python' | 'curl';

export interface VectaraConfig {
  customerId: string;
  corpusKeys: string[];
  apiKey: string;
}

export interface CodeSnippet {
  id: string;
  language: string;
  code: string;
  title: string;
  description: string;
  parameters: Record<string, CodeParameter>;
  canTest?: boolean;
}

export interface CodeParameter {
  type: string;
  value: any;
  required: boolean;
  description: string;
}

export interface MessageFeedback {
  type: 'positive' | 'negative';
  timestamp: number;
  comment?: string;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
  hasCodeSnippets?: boolean;
  codeSnippets?: CodeSnippet[];
  references?: DocumentReference[];
  canShowCode?: boolean; // For on-demand code generation
  threadId?: string; // For message threading
  parentMessageId?: string; // For follow-up questions
  isFollowUp?: boolean; // Indicates this is a follow-up message
  feedback?: MessageFeedback; // User feedback on the message
}

export interface DocumentReference {
  id: string;
  title: string;
  snippet: string;
  score?: number;
  url?: string;
  metadata?: Record<string, any>;
}

export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  sessionId: string;
  isStreaming: boolean;
  retryCount: number;
  isTyping: boolean; // For typing indicators
  searchSuggestions: string[]; // For search suggestions
  conversationHistory: ConversationHistory[]; // For persistence
}

export interface ConversationHistory {
  id: string;
  title: string; // First message or generated title
  messages: ChatMessage[];
  lastActivity: number;
  sessionId: string;
}

export interface AnalyticsEvent {
  type: 'query' | 'code_generation' | 'button_click' | 'error' | 'session_start' | 'session_end' | 'feedback';
  data: Record<string, any>;
  timestamp: number;
  sessionId: string;
}

export interface CodeGenerationConfig {
  enabled: boolean;
  supportedLanguages: SupportedLanguage[];
  autoDetect?: boolean;
  defaultParameters?: Record<string, any>;
}

export interface AnalyticsConfig {
  enabled: boolean;
  onEvent?: (event: AnalyticsEvent) => void;
}

export interface FeedbackConfig {
  enabled: boolean;
  apiEndpoint?: string;
  allowComments?: boolean;
  onFeedbackSubmit?: (messageId: string, feedback: MessageFeedback) => void;
}

export interface UseProductionChatOptions {
  customerId: string;
  corpusKeys: string[];
  apiKey: string;
  enableStreaming?: boolean;
  codeGeneration?: CodeGenerationConfig;
  analytics?: AnalyticsConfig;
  maxRetries?: number;
  timeout?: number;
}

export interface SearchResult {
  id: string;
  title: string;
  snippet: string;
  url?: string;
  score?: number;
  metadata?: Record<string, any>;
}

// Enhanced Chatbot Props extending base react-chatbot
export interface EnhancedChatbotProps {
  // Core Vectara config
  customerId: string;
  corpusKeys: string[];
  apiKey: string;
  
  // Enhanced features
  title?: string;
  description?: string;
  placeholder?: string;
  
  // Code generation
  codeGeneration?: CodeGenerationConfig;
  
  // Analytics
  analytics?: AnalyticsConfig;

  // Feedback
  feedbackConfig?: FeedbackConfig;

  // UI Configuration
  enableStreaming?: boolean;
  retryAttempts?: number;
  
  // Callbacks
  onQuerySubmit?: (query: string) => void;
  onCodeGenerated?: (code: string, language: string) => void;
  onError?: (error: Error) => void;
  
  // Search Integration
  searchResults?: SearchResult[];
  searchQuery?: string;
  onSearchToChat?: (query: string, results?: SearchResult[]) => void;
  
  // Fullscreen controls
  showFullscreenToggle?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  onClose?: () => void;
  
  // Styling
  className?: string;
  style?: React.CSSProperties;
}

// Search Chat Integration Props
export interface SearchChatIntegrationProps extends Omit<EnhancedChatbotProps, 'title' | 'description'> {
  // Search integration props
  searchResults?: SearchResult[];
  searchQuery?: string;
  onSearchToChat?: (query: string, results?: SearchResult[]) => void;
  
  // UI configuration
  chatTitle?: string;
  chatDescription?: string;
  showSearchContext?: boolean;
  searchChatHandoffText?: string;
  
  // Integration modes
  mode?: 'overlay' | 'sidebar' | 'inline' | 'modal' | 'fullscreen';
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left' | 'center';
  
  // Styling
  className?: string;
  style?: React.CSSProperties;
  
  // Callbacks
  onChatOpen?: () => void;
  onChatClose?: () => void;
  onIntegrationEvent?: (event: string, data: any) => void;
}

// Vectara API Types
export interface VectaraV1QueryRequest {
  query: Array<{
    query: string;
    queryContext: string;
    start: number;
    numResults: number;
    contextConfig: {
      charsBefore: number;
      charsAfter: number;
      sentencesBefore: number;
      sentencesAfter: number;
      startTag: string;
      endTag: string;
    };
    corpusKey: Array<{
      customerId: number;
      corpusId: number;
      semantics: string;
      metadataFilter: string;
      lexicalInterpolationConfig: {
        lambda: number;
      };
    }>;
    summary: Array<{
      maxSummarizedResults: number;
      responseLang: string;
      summarizerPromptName: string;
    }>;
  }>;
}

export interface VectaraV2QueryRequest {
  query: string;
  search: {
    corpora: Array<{
      corpus_key: string;
      semantics?: string;
      metadata_filter?: string;
      lexical_interpolation?: number;
    }>;
    offset?: number;
    limit?: number;
    context_configuration?: {
      sentences_before?: number;
      sentences_after?: number;
      start_tag?: string;
      end_tag?: string;
    };
  };
  generation?: {
    prompt_name?: string;
    max_used_search_results?: number;
    response_language?: string;
  };
}

// Hook Return Types
export interface UseChatReturn {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
  isStreaming: boolean;
  isTyping: boolean;
  searchSuggestions: string[];
  conversationHistory: ConversationHistory[];
  retryCount: number;
  sendMessage: (content: string, parentMessageId?: string) => Promise<void>;
  sendFollowUp: (content: string, parentMessageId: string) => Promise<void>;
  retry: () => void;
  clearChat: () => void;
  updateCodeParameter: (messageId: string, snippetId: string, parameterName: string, value: any) => void;
  showCodeExamples: (messageId: string, codeType?: string) => void;
  getSearchSuggestions: (input: string) => string[];
  provideFeedback?: (messageId: string, feedbackType: 'positive' | 'negative', comment?: string) => Promise<void>;
}

// Code Templates
export interface CodeTemplate {
  [language: string]: {
    template: string;
    parameters: string[];
    description: string;
  };
}

export interface CodeTemplates {
  [codeType: string]: CodeTemplate;
}

// Configuration Types
export interface APIEndpoints {
  v1: {
    base: string;
    query: string;
  };
  v2: {
    base: string;
    query: (corpusId: string) => string;
  };
}

export interface EnhancedParams {
  lexicalInterpolation: number;
  summarizer: string;
  maxResults: number;
  contextConfig: {
    sentencesBefore: number;
    sentencesAfter: number;
    startTag: string;
    endTag: string;
  };
}