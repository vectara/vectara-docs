// Typing Indicator Component
// Animated typing indicator for AI responses

import React from 'react';

export const TypingIndicator: React.FC = React.memo(() => {
  return (
    <div className="vectara-typing-indicator-message" style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      margin: '8px 0'
    }}>
      <div className="vectara-typing-dots" style={{
        display: 'flex',
        gap: '4px'
      }}>
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          animation: 'typing-dot 1.4s infinite ease-in-out',
          animationDelay: '-0.32s'
        }}></span>
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          animation: 'typing-dot 1.4s infinite ease-in-out',
          animationDelay: '-0.16s'
        }}></span>
        <span style={{
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          animation: 'typing-dot 1.4s infinite ease-in-out'
        }}></span>
      </div>
      <span style={{ fontSize: '12px', color: '#666', marginLeft: '8px' }}>AI is thinking...</span>
    </div>
  );
});

TypingIndicator.displayName = 'TypingIndicator';