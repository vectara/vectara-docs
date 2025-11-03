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
  title = "Vectara Docs Assistant",
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

  
  // Clear localStorage cache only once on load to pick up new configuration
  useEffect(() => {
    if (isDevelopment) {
      console.log('🗑️ Clearing localStorage cache to pick up latest configuration');
      localStorage.removeItem('vectara-feature-flags');
    }
  }, [isDevelopment]);

  // Development toggle for easy API switching
  const useChatAPI = isDevelopment && window.location.search.includes('useChatAPI=true');
  const effectiveUseAgent = useAgentPlatform && !useChatAPI;

  if (isDevelopment && useChatAPI) {
    console.log('🔄 Using Chat API (forced via URL param)');
  } else if (isDevelopment) {
    console.log('🤖 Using Agent Platform (add ?useChatAPI=true to switch)');
  }

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

  if (effectiveUseAgent) {
    // Use Agent Platform
    chatHook = useVectaraAgent;
    hookOptions = {
      ...hookOptions,
      enableAgentStreaming: featureFlags.enableAgentStreaming,
      autoCreateAgent: false, // Agent already exists
      agentKey: "agt_documentation_assistant_ed3f", // Use existing agent key
      agentName: "Vectara Documentation Assistant"
    };
  } else {
    // Use traditional Chat API
    chatHook = USE_V2_API ? useProductionChatV2 : useProductionChat;
    console.log('📝 Using Chat API v2:', USE_V2_API);
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
    getSearchSuggestions,
    provideFeedback,
    // Agent-specific properties (only available when using agent platform)
    isAgentThinking,
    usedSources,
    agentThoughts,
    suggestedFollowups
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

  const handleFeedback = useCallback(async (messageId: string, feedbackType: 'positive' | 'negative') => {
    try {
      await provideFeedback?.(messageId, feedbackType);

      if (analytics?.enabled && analytics.onEvent) {
        analytics.onEvent({
          type: 'feedback',
          data: { messageId, feedbackType },
          timestamp: Date.now(),
          sessionId: `session_${Date.now()}`
        });
      }
    } catch (err) {
      console.error('Failed to submit feedback:', err);
    }
  }, [provideFeedback, analytics]);

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
        isTyping={isTyping || isAgentThinking}
        error={error}
        retryCount={retryCount}
        onRetry={retry}
        onCodeCopy={handleCodeCopy}
        onParameterUpdate={updateCodeParameter}
        onSendFollowUp={handleFollowUp}
        onSuggestionClick={handleSuggestionClick}
        onFeedback={handleFeedback}
        isAgentThinking={isAgentThinking}
        agentThoughts={agentThoughts}
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
  --vectara-primary: #1A79FF;
  --vectara-primary-hover: #0066FF;
  --vectara-primary-active: #0052CC;
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

  /* Shadow system for depth */
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04);
  --shadow-2xl: 0 25px 50px rgba(0, 0, 0, 0.15);
  --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);
}

.vectara-message {
  margin-bottom: 20px; /* Increased spacing */
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

/* Avatar styling */
.vectara-message-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.vectara-message-assistant .vectara-message-avatar {
  background: white;
  border: 1px solid #e1e5e9;
  order: -1; /* Avatar on the left */
}

.vectara-message-user .vectara-message-avatar {
  background: var(--vectara-primary);
  color: white;
  order: 1; /* Avatar on the right */
}

.vectara-message-user .vectara-message-content {
  background: var(--vectara-primary);
  color: white;
  margin-left: 10%; /* Reduced margin since avatar takes space */
  border-radius: 16px 16px 4px 16px;
  padding: 14px 18px; /* Increased padding */
  font-size: var(--message-font-size);
  line-height: 1.5;
  box-shadow: var(--shadow-md);
  transition: box-shadow 0.2s ease, transform 0.2s ease, background-color 0.2s ease;
  animation: messageSlideInRight 0.4s ease-out both;
  flex: 1;
}

.vectara-message-user .vectara-message-content:hover {
  background: var(--vectara-primary-hover);
  box-shadow: var(--shadow-lg);
  transform: translateY(-1px);
}

.vectara-message-assistant .vectara-message-content {
  background-color: var(--vectara-light);
  color: var(--vectara-dark);
  margin-right: 10%; /* Reduced margin since avatar takes space */
  border-radius: 16px 16px 16px 4px;
  padding: 14px 18px; /* Increased padding */
  font-size: var(--message-font-size);
  line-height: 1.6;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  animation: messageSlideInUp 0.4s ease-out both;
  flex: 1;
}

.vectara-message-assistant .vectara-message-content:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

/* Stagger animation for consecutive messages */
.vectara-message:nth-child(1) .vectara-message-content {
  animation-delay: 0s;
}

.vectara-message:nth-child(2) .vectara-message-content {
  animation-delay: 0.05s;
}

.vectara-message:nth-child(3) .vectara-message-content {
  animation-delay: 0.1s;
}

.vectara-message:nth-child(4) .vectara-message-content {
  animation-delay: 0.15s;
}

.vectara-message:nth-child(5) .vectara-message-content {
  animation-delay: 0.2s;
}

.vectara-code-block {
  margin: 12px 0;
  border: 1px solid var(--vectara-border);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: box-shadow 0.2s ease;
}

.vectara-code-block:hover {
  box-shadow: var(--shadow-md);
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
  transition: all 0.2s ease;
}

.vectara-code-copy-btn:hover {
  background-color: var(--vectara-border);
  box-shadow: var(--shadow-xs);
  transform: translateY(-1px);
}

.vectara-code-copy-btn:active {
  transform: translateY(0);
  box-shadow: none;
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
  box-shadow: var(--shadow-sm);
  transition: all 0.2s ease;
}

.vectara-show-code-btn:hover {
  background-color: var(--vectara-primary-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

.vectara-show-code-btn:active {
  transform: translateY(0);
  box-shadow: var(--shadow-xs);
}

.vectara-references {
  margin-top: 12px;
  padding: 10px 12px; /* Reduced padding */
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid var(--vectara-border);
  max-height: 300px; /* Limit height */
  overflow-y: auto;
  box-shadow: var(--shadow-inner);
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
  color: var(--vectara-primary);
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
  background-color: var(--vectara-primary);
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

/* Message slide-in animations */
@keyframes messageSlideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes messageSlideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Override global pre background for chatbot code blocks only */
.vectara-message-content pre:has(.chatbot-code-highlighted) {
  background: #000000 !important;
}

/* Prism syntax highlighting - matches CodePanel colors */
.chatbot-code-highlighted .token.keyword {
  color: #0070f3 !important; /* Bright blue for keywords */
}

.chatbot-code-highlighted .token.constant {
  color: #ff495b !important;
}

.chatbot-code-highlighted .token.string-property.property {
  color: #78B6FC !important;
}

.chatbot-code-highlighted .token.string,
.chatbot-code-highlighted .token.string-interpolation {
  color: #00d924 !important; /* Bright green for strings */
}

.chatbot-code-highlighted .token.number,
.chatbot-code-highlighted .token.boolean {
  color: #ff6b35 !important; /* Orange for numbers/booleans */
}

.chatbot-code-highlighted .token.comment {
  color: #d3e0fb !important; /* Gray for comments */
  font-style: italic !important;
}

.chatbot-code-highlighted .token.function,
.chatbot-code-highlighted .token.builtin {
  color: #0070f3 !important; /* Bright blue for functions */
}

.chatbot-code-highlighted .token.punctuation {
  color: #abb2bf !important; /* Light gray for punctuation */
}

.chatbot-code-highlighted .token.operator {
  color: #abb2bf !important; /* Light gray for operators */
  background: transparent !important;
}

.chatbot-code-highlighted .token.property,
.chatbot-code-highlighted .token.tag {
  color: #78B6FC !important;
}

.chatbot-code-highlighted .token.class-name {
  color: #0070f3 !important; /* Blue for class names */
}

.chatbot-code-highlighted .token.null,
.chatbot-code-highlighted .token.undefined {
  color: #a855f7 !important; /* Purple for null/undefined */
}

/* Input field and button shadows */
.vectara-chat-input-field:focus {
  border-color: var(--vectara-primary);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06), 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.vectara-chat-submit-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.06);
}

.vectara-chat-submit-btn:not(:disabled):active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
`;