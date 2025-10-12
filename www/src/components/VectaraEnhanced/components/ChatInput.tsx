// Chat Input Component
// Handles message input, suggestions, and submission

import React, { useState, useCallback, useRef, useEffect } from 'react';

interface ChatInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  isStreaming: boolean;
  placeholder: string;
  suggestions: string[];
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  onSuggestionClick: (suggestion: string) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const ChatInput: React.FC<ChatInputProps> = React.memo(({
  inputValue,
  setInputValue,
  onSubmit,
  isLoading,
  isStreaming,
  placeholder,
  suggestions,
  showSuggestions,
  setShowSuggestions,
  onSuggestionClick,
  onInputChange,
  onKeyPress,
  inputRef: externalInputRef
}) => {
  const internalInputRef = useRef<HTMLInputElement>(null);
  const inputRef = externalInputRef || internalInputRef;

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setInputValue(suggestion);
    setShowSuggestions(false);
    onSuggestionClick?.(suggestion);
  }, [setInputValue, setShowSuggestions, onSuggestionClick]);

  const handleInputFocus = useCallback(() => {
    if (inputValue.length > 1) {
      setShowSuggestions(true);
    }
  }, [inputValue.length, setShowSuggestions]);

  const handleInputBlur = useCallback(() => {
    // Delay hiding suggestions to allow click events to register
    setTimeout(() => setShowSuggestions(false), 200);
  }, [setShowSuggestions]);

  return (
    <div
      className="vectara-chatbot-input"
      style={{
        padding: '16px',
        borderTop: '1px solid #e1e5e9',
        backgroundColor: '#f8f9fa',
        position: 'relative'
      }}
    >
      {/* Search suggestions dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          className="vectara-suggestions-dropdown"
          style={{
            position: 'absolute',
            bottom: '70px',
            left: '16px',
            right: '16px',
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            maxHeight: '200px',
            overflowY: 'auto',
            animation: 'slideUp 0.2s ease-out'
          }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                borderBottom: index < suggestions.length - 1 ? '1px solid #eee' : 'none',
                fontSize: '14px',
                color: '#333'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}
            >
              💡 {suggestion}
            </div>
          ))}
        </div>
      )}

      <form onSubmit={onSubmit} style={{ display: 'flex', gap: '8px' }}>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={onInputChange}
          onKeyPress={onKeyPress}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          disabled={isLoading || isStreaming}
          className="vectara-chat-input-field"
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #ced4da',
            borderRadius: '4px',
            fontSize: '14px',
            outline: 'none',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)',
            transition: 'box-shadow 0.2s ease, border-color 0.2s ease'
          }}
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading || isStreaming}
          className="vectara-chat-submit-btn"
          style={{
            padding: '8px 16px',
            backgroundColor: isLoading || isStreaming ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isLoading || isStreaming ? 'not-allowed' : 'pointer',
            fontSize: '14px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
            transition: 'all 0.2s ease'
          }}
        >
          {isLoading || isStreaming ? '⏳' : '📤'}
        </button>
      </form>
    </div>
  );
});

ChatInput.displayName = 'ChatInput';