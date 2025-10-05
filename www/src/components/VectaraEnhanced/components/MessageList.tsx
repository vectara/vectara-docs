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
  onShowCodeExamples?: (messageId: string, language?: string) => void;
  onSendFollowUp?: (content: string, parentMessageId: string) => void;
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
  onShowCodeExamples,
  onSendFollowUp
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
            textAlign: 'center',
            color: '#6c757d',
            fontSize: '14px',
            marginTop: '32px'
          }}
        >
          Start a conversation by asking a question!
        </div>
      )}

      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message}
          onCodeCopy={onCodeCopy}
          onParameterUpdate={onParameterUpdate}
          onShowCodeExamples={onShowCodeExamples}
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
          <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>AI is thinking...</span>
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