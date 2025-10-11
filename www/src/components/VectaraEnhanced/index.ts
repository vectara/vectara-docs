// Enhanced Vectara React Chatbot Search - Main Export
// Extends @vectara/react-chatbot with intelligent code generation and search integration

// Main Components
export { VectaraEnhancedChatbot, VectaraChatbotStyles } from './components/VectaraEnhancedChatbot';
export { 
  SearchChatIntegration, 
  SearchToChatHandoff, 
  useSearchChatIntegration 
} from './components/SearchChatIntegration';

// Hooks
export { useProductionChat } from './hooks/useProductionChat';
export { useProductionChatV2 } from './hooks/useProductionChatV2';

// Configuration
export { 
  getVectaraConfig, 
  getApiEndpoint, 
  USE_V2_API, 
  V1_CONFIG, 
  V2_CONFIG, 
  ENHANCED_PARAMS, 
  API_ENDPOINTS 
} from './config/vectaraConfig';

// Utilities
export { detectCodeType, generateCode, CODE_TEMPLATES } from './utils/codeTemplates';

// Types
export type {
  // Core Types
  SupportedLanguage,
  VectaraConfig,
  ChatMessage,
  ChatState,
  DocumentReference,
  CodeSnippet,
  CodeParameter,
  AnalyticsEvent,
  
  // Configuration Types
  CodeGenerationConfig,
  AnalyticsConfig,
  UseProductionChatOptions,
  SearchResult,
  
  // Component Props
  EnhancedChatbotProps,
  SearchChatIntegrationProps,
  
  // Hook Return Types
  UseChatReturn,
  
  // API Types
  VectaraV1QueryRequest,
  VectaraV2QueryRequest,
  
  // Template Types
  CodeTemplate,
  CodeTemplates,
  
  // Config Types
  APIEndpoints,
  EnhancedParams
} from './types';

// Re-export common components from base react-chatbot for convenience
// Note: These would need to be imported from @vectara/react-chatbot in actual implementation
// export { ReactChatbot, useChat } from '@vectara/react-chatbot';

// Version
export const VERSION = '1.0.0';