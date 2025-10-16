// Message List Component
// Handles message display with auto-scroll functionality

import React, { useEffect, useRef, useCallback } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { ChatMessage } from './ChatMessage';

interface MessageListProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
  retryCount: number;
  onRetry: () => void;
  onCodeCopy?: (code: string, language: string) => void;
  onParameterUpdate?: (messageId: string, snippetId: string, parameterName: string, value: any) => void;
  onSendFollowUp?: (content: string, parentMessageId: string) => void;
  onSuggestionClick?: (suggestion: string) => void;
  // Agent-specific props
  isAgentThinking?: boolean;
  agentThoughts?: string[];
}

export const MessageList: React.FC<MessageListProps> = React.memo(({
  messages,
  isLoading,
  isTyping,
  error,
  retryCount,
  onRetry,
  onCodeCopy,
  onParameterUpdate,
  onSendFollowUp,
  onSuggestionClick,
  isAgentThinking = false,
  agentThoughts = []
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div
      className="vectara-chatbot-messages"
      style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      {messages.length === 0 && (
        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            width: '100%',
            maxWidth: '400px'
          }}
        >
          {[
            'What is Vectara?',
            'How do I get started with agents?',
            'Show me an example of a query'
          ].map((question, index) => (
            <button
              key={index}
              onClick={() => onSuggestionClick?.(question)}
              style={{
                padding: '10px 14px',
                backgroundColor: 'white',
                border: '1px solid #e1e5e9',
                borderRadius: '10px',
                fontSize: '12px',
                color: '#333',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s ease',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontWeight: '500'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1A79FF';
                e.currentTarget.style.borderColor = '#1A79FF';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(26, 121, 255, 0.25)';
                e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
                e.currentTarget.style.borderColor = '#e1e5e9';
                e.currentTarget.style.color = '#333';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
              }}
            >
              <span style={{ fontSize: '10px' }}>💬</span>
              <span>{question}</span>
            </button>
          ))}
        </div>
      )}

      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          onCodeCopy={onCodeCopy}
          onParameterUpdate={onParameterUpdate}
          onSendFollowUp={onSendFollowUp}
        />
      ))}

      {/* Typing indicator */}
      {isTyping && (
        <div className="vectara-typing-indicator-message">
          <div className="vectara-typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>
            {isAgentThinking ? 'Vectara Assistant is thinking...' : 'AI is thinking...'}
          </span>
        </div>
      )}

      {error && (
        <div
          className="vectara-error-message"
          style={{
            padding: '12px',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            borderRadius: '4px',
            color: '#721c24'
          }}
        >
          <p style={{ margin: '0 0 8px 0' }}>Error: {error}</p>
          {retryCount > 0 && (
            <p style={{ margin: 0, fontSize: '12px' }}>
              Retry attempt: {retryCount}
            </p>
          )}
          <button
            onClick={onRetry}
            style={{
              marginTop: '8px',
              padding: '4px 8px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Retry
          </button>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
});

MessageList.displayName = 'MessageList';