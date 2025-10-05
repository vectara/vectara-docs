// Enhanced Vectara Chatbot Component
// Main chatbot component with intelligent code generation and search integration
// Refactored for better performance and maintainability

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { EnhancedChatbotProps, ChatMessage, CodeSnippet, SupportedLanguage } from '../types';
import { useProductionChat } from '../hooks/useProductionChat';
import { useProductionChatV2 } from '../hooks/useProductionChatV2';
import { useVectaraAgent } from '../hooks/useVectaraAgent';
import { USE_V2_API } from '../config/vectaraConfig';
import { useFeatureFlags } from '../config/featureFlags';
import {
  ChatHeader,
  EnhancedChatHeader,
  MessageList,
  ChatInput,
  TypingIndicator
} from './index';

export const VectaraEnhancedChatbot: React.FC<EnhancedChatbotProps> = React.memo(({
  customerId,
  corpusKeys,
  apiKey,
  title = "AI Assistant",
  description = "Ask me anything",
  placeholder = "Type your question...",
  codeGeneration,
  analytics,
  enableStreaming = false,
  retryAttempts = 3,
  onQuerySubmit,
  onCodeGenerated,
  onError,
  showFullscreenToggle = false,
  isFullscreen = false,
  onToggleFullscreen,
  onClose,
  className = "",
  style = {}
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Get feature flags
  const featureFlags = useFeatureFlags();
  const useAgentPlatform = featureFlags.useAgentPlatform;
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Use the appropriate hook based on feature flag
  let chatHook;
  let hookOptions: any = {
    customerId,
    corpusKeys,
    apiKey,
    enableStreaming: enableStreaming || featureFlags.enableAgentStreaming,
    codeGeneration,
    analytics,
    maxRetries: retryAttempts
  };

  if (useAgentPlatform) {
    // Use Agent Platform
    chatHook = useVectaraAgent;
    hookOptions = {
      ...hookOptions,
      enableAgentStreaming: featureFlags.enableAgentStreaming,
      autoCreateAgent: true,
      agentName: "Vectara Documentation Assistant"
    };
  } else {
    // Use traditional Chat API
    chatHook = USE_V2_API ? useProductionChatV2 : useProductionChat;
  }

  const {
    messages,
    isLoading,
    error,
    isStreaming,
    isTyping,
    searchSuggestions,
    retryCount,
    sendMessage,
    sendFollowUp,
    retry,
    clearChat,
    updateCodeParameter,
    showCodeExamples,
    getSearchSuggestions
  } = chatHook(hookOptions);

  // Memoized event handlers to prevent unnecessary re-renders
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const query = inputValue.trim();
    setInputValue('');
    setShowSuggestions(false);

    onQuerySubmit?.(query);

    try {
      await sendMessage(query);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      onError?.(error);
    }
  }, [inputValue, isLoading, sendMessage, onQuerySubmit, onError]);

  const handleCodeCopy = useCallback((code: string, language: string) => {
    onCodeGenerated?.(code, language);

    if (analytics?.enabled && analytics.onEvent) {
      analytics.onEvent({
        type: 'button_click',
        data: { action: 'copy_code', language },
        timestamp: Date.now(),
        sessionId: `session_${Date.now()}`
      });
    }
  }, [onCodeGenerated, analytics]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Generate search suggestions as user types
    if (value.length > 1) {
      getSearchSuggestions?.(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [getSearchSuggestions]);

  const handleSuggestionClick = useCallback(async (suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);

    onQuerySubmit?.(suggestion);

    try {
      await sendMessage(suggestion);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      onError?.(error);
    }
  }, [sendMessage, onQuerySubmit, onError]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setShowSuggestions(false);
      handleSubmit(e as any);
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  }, [handleSubmit]);

  const handleFollowUp = useCallback(async (content: string, parentMessageId: string) => {
    try {
      await sendFollowUp?.(content, parentMessageId);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      onError?.(error);
    }
  }, [sendFollowUp, onError]);

  // Memoized style object to prevent unnecessary re-renders
  const chatbotStyle = useMemo(() => ({
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontSize: '14px', // Base font size
    backgroundColor: '#ffffff',
    border: '1px solid #e1e5e9',
    borderRadius: '8px',
    overflow: 'hidden',
    '--message-font-size': '14px',
    '--header-font-size': '16px',
    '--code-font-size': '13px',
    ...style
  }), [style]);

  // Memoized class name
  const chatbotClassName = useMemo(() =>
    `vectara-enhanced-chatbot ${className}`,
    [className]
  );

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className={chatbotClassName}
      style={chatbotStyle}
    >
      {/* Header */}
      {isDevelopment ? (
        <EnhancedChatHeader
          title={title}
          description={description}
          onClearChat={clearChat}
          onClose={onClose}
          showFullscreenToggle={showFullscreenToggle}
          isFullscreen={isFullscreen}
          onToggleFullscreen={onToggleFullscreen}
          featureFlagManager={featureFlags.manager}
          isDevelopment={isDevelopment}
        />
      ) : (
        <ChatHeader
          title={title}
          description={description}
          onClearChat={clearChat}
          onClose={onClose}
          showFullscreenToggle={showFullscreenToggle}
          isFullscreen={isFullscreen}
          onToggleFullscreen={onToggleFullscreen}
        />
      )}

      {/* Messages */}
      <MessageList
        messages={messages}
        isLoading={isLoading}
        isTyping={isTyping}
        error={error}
        retryCount={retryCount}
        onRetry={retry}
        onCodeCopy={handleCodeCopy}
        onParameterUpdate={updateCodeParameter}
        onShowCodeExamples={showCodeExamples}
        onSendFollowUp={handleFollowUp}
      />

      {/* Input */}
      <ChatInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        isStreaming={isStreaming}
        placeholder={placeholder}
        suggestions={searchSuggestions}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        onSuggestionClick={handleSuggestionClick}
        onInputChange={handleInputChange}
        onKeyPress={handleKeyPress}
        inputRef={inputRef}
      />
    </div>
  );
});

VectaraEnhancedChatbot.displayName = 'VectaraEnhancedChatbot';

// CSS styles to be included (moved to separate file for better maintainability)
export const VectaraChatbotStyles = `
.vectara-enhanced-chatbot {
  --vectara-primary: #007bff;
  --vectara-primary-hover: #0056b3;
  --vectara-secondary: #6c757d;
  --vectara-success: #28a745;
  --vectara-danger: #dc3545;
  --vectara-warning: #ffc107;
  --vectara-light: #f8f9fa;
  --vectara-dark: #343a40;
  --vectara-border: #e1e5e9;
  --message-font-size: 14px;
  --header-font-size: 16px;
  --code-font-size: 13px;
}

.vectara-message {
  margin-bottom: 20px; /* Increased spacing */
}

.vectara-message-user .vectara-message-content {
  background-color: var(--vectara-primary);
  color: white;
  margin-left: 15%; /* Reduced to give more space */
  border-radius: 16px 16px 4px 16px;
  padding: 14px 18px; /* Increased padding */
  font-size: var(--message-font-size);
  line-height: 1.5;
}

.vectara-message-assistant .vectara-message-content {
  background-color: var(--vectara-light);
  color: var(--vectara-dark);
  margin-right: 15%; /* Reduced to give more space */
  border-radius: 16px 16px 16px 4px;
  padding: 14px 18px; /* Increased padding */
  font-size: var(--message-font-size);
  line-height: 1.6;
}

.vectara-code-block {
  margin: 12px 0;
  border: 1px solid var(--vectara-border);
  border-radius: 6px;
  overflow: hidden;
}

.vectara-code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: var(--vectara-light);
  border-bottom: 1px solid var(--vectara-border);
}

.vectara-code-title {
  font-weight: 600;
  font-size: 14px;
}

.vectara-code-language {
  font-size: 12px;
  color: var(--vectara-secondary);
  margin-left: 8px;
}

.vectara-code-copy-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.vectara-code-copy-btn:hover {
  background-color: var(--vectara-border);
}

.vectara-code-content {
  margin: 0;
  padding: 12px 14px; /* Reduced padding */
  background-color: #f6f8fa;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Courier New', monospace !important;
  font-size: var(--code-font-size); /* Smaller code font */
  line-height: 1.4; /* Tighter line height */
  max-height: 400px; /* Limit code block height */
  overflow-y: auto;
}

.vectara-code-content code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Courier New', monospace !important;
  font-size: 13px !important;
  color: #24292e;
  white-space: pre-wrap;
}

.vectara-code-parameters {
  padding: 12px;
  background-color: #fff;
  border-bottom: 1px solid var(--vectara-border);
}

.vectara-parameter-input {
  margin-bottom: 8px;
}

.vectara-parameter-input label {
  display: block;
  font-size: 12px;
  color: var(--vectara-secondary);
  margin-bottom: 4px;
}

.vectara-parameter-input input {
  width: 100%;
  padding: 4px 8px;
  border: 1px solid var(--vectara-border);
  border-radius: 4px;
  font-size: 12px;
}

.vectara-show-code-btn {
  margin-top: 8px;
  padding: 6px 12px;
  background-color: var(--vectara-primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.vectara-show-code-btn:hover {
  background-color: var(--vectara-primary-hover);
}

.vectara-references {
  margin-top: 12px;
  padding: 10px 12px; /* Reduced padding */
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid var(--vectara-border);
  max-height: 300px; /* Limit height */
  overflow-y: auto;
}

.vectara-references h4 {
  margin: 0 0 8px 0;
  font-size: 13px; /* Smaller title */
  font-weight: 600;
  color: var(--vectara-secondary);
}

.vectara-references ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.vectara-reference {
  margin-bottom: 6px; /* Reduced spacing */
  padding-bottom: 6px; /* Reduced padding */
  border-bottom: 1px solid var(--vectara-border);
}

.vectara-reference:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.vectara-reference strong {
  font-size: 12px; /* Smaller */
  font-weight: 600;
  color: var(--vectara-dark);
  display: block;
  margin-bottom: 2px;
}

.vectara-reference p {
  margin: 0;
  font-size: 11px; /* Smaller */
  color: var(--vectara-secondary);
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit to 2 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.vectara-reference-score {
  font-size: 10px; /* Smaller */
  color: var(--vectara-secondary);
  margin-top: 2px;
  display: block;
}

.vectara-typing-indicator {
  animation: vectara-blink 1s infinite;
}

@keyframes vectara-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

/* Fullscreen specific styling */
.vectara-enhanced-chatbot.fullscreen {
  border-radius: 0 !important;
  border: none !important;
}

/* Overlay positioning classes */
.vectara-search-chat-integration {
  transition: all 0.2s ease-in-out;
}

.vectara-search-chat-integration.fullscreen-mode {
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  right: 0 !important;
  bottom: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 2000 !important;
  background-color: #ffffff !important;
  border-radius: 0 !important;
}

.vectara-search-chat-integration.overlay-mode {
  position: fixed;
  z-index: 1000;
  width: 480px;
  height: 700px;
  max-width: 95vw;
  max-height: 90vh;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border-radius: 12px;
  overflow: hidden;
}

.vectara-enhanced-chatbot.fullscreen .vectara-chatbot-messages {
  padding: 20px 24px; /* More padding in fullscreen */
}

.vectara-enhanced-chatbot.fullscreen .vectara-message-user .vectara-message-content,
.vectara-enhanced-chatbot.fullscreen .vectara-message-assistant .vectara-message-content {
  max-width: 800px; /* Limit message width in fullscreen */
  margin-left: auto;
  margin-right: auto;
}

.vectara-enhanced-chatbot.fullscreen .vectara-message-user .vectara-message-content {
  margin-left: 25%;
}

.vectara-enhanced-chatbot.fullscreen .vectara-message-assistant .vectara-message-content {
  margin-right: 25%;
}

/* Better scrollbars */
.vectara-chatbot-messages::-webkit-scrollbar,
.vectara-code-content::-webkit-scrollbar,
.vectara-references::-webkit-scrollbar {
  width: 6px;
}

.vectara-chatbot-messages::-webkit-scrollbar-track,
.vectara-code-content::-webkit-scrollbar-track,
.vectara-references::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.vectara-chatbot-messages::-webkit-scrollbar-thumb,
.vectara-code-content::-webkit-scrollbar-thumb,
.vectara-references::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.vectara-chatbot-messages::-webkit-scrollbar-thumb:hover,
.vectara-code-content::-webkit-scrollbar-thumb:hover,
.vectara-references::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* New features styles */

/* Message timestamps and follow-up styles */
.vectara-message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
  font-size: 11px;
  color: #999;
}

.vectara-message-timestamp {
  font-size: 10px;
  color: #999;
}

.vectara-followup-indicator {
  font-size: 10px;
  color: #007bff;
  font-weight: 500;
}

.vectara-message-followup {
  margin-left: 20px;
  border-left: 2px solid #e9ecef;
  padding-left: 12px;
}

/* Typing indicator animation */
.vectara-typing-indicator-message {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  margin: 8px 0;
}

.vectara-typing-dots {
  display: flex;
  gap: 4px;
}

.vectara-typing-dots span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #007bff;
  animation: typing-dot 1.4s infinite ease-in-out;
}

.vectara-typing-dots span:nth-child(1) {
  animation-delay: -0.32s;
}

.vectara-typing-dots span:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes typing-dot {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

/* Search suggestions dropdown */
.vectara-suggestions-dropdown {
  animation: slideUp 0.2s ease-out;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Floating code panel animations */
.vectara-floating-code-overlay {
  animation: fadeIn 0.2s ease;
}

.vectara-floating-code-panel {
  animation: slideInRight 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInRight {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}
`;