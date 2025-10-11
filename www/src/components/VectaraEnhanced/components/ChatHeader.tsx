// Chat Header Component
// Handles header display with controls and title

import React from 'react';

interface ChatHeaderProps {
  title: string;
  description: string;
  onClearChat: () => void;
  onClose?: () => void;
  showFullscreenToggle?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = React.memo(({
  title,
  description,
  onClearChat,
  onClose,
  showFullscreenToggle = false,
  isFullscreen = false,
  onToggleFullscreen
}) => {
  return (
    <div
      className="vectara-chatbot-header"
      style={{
        padding: '16px 60px 16px 16px', // Extra right padding for controls
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e1e5e9',
        minHeight: '60px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
            {title}
          </h3>
          <p style={{ margin: '4px 0 0 0', fontSize: '14px', color: '#6c757d' }}>
            {description}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Fullscreen toggle */}
          {showFullscreenToggle && onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              style={{
                padding: '4px 8px',
                border: '1px solid #007bff',
                borderRadius: '4px',
                backgroundColor: isFullscreen ? '#007bff' : 'white',
                color: isFullscreen ? 'white' : '#007bff',
                cursor: 'pointer',
                fontSize: '12px'
              }}
              title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? '⊟' : '⊞'}
            </button>
          )}

          {/* Clear chat button */}
          <button
            onClick={onClearChat}
            style={{
              padding: '4px 8px',
              border: '1px solid #dee2e6',
              borderRadius: '4px',
              backgroundColor: 'white',
              cursor: 'pointer',
              fontSize: '12px'
            }}
            title="Clear chat"
          >
            🗑️
          </button>

          {/* Close button */}
          {onClose && (
            <button
              onClick={onClose}
              style={{
                padding: '4px 8px',
                border: '1px solid #dc3545',
                borderRadius: '4px',
                backgroundColor: 'white',
                color: '#dc3545',
                cursor: 'pointer',
                fontSize: '12px'
              }}
              title="Close chat"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </div>
  );
});

ChatHeader.displayName = 'ChatHeader';