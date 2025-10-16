// Enhanced Chat Header Component
// Includes API mode indicator and development controls

import React from 'react';
import { FeatureFlagManager } from '../config/featureFlags';

interface EnhancedChatHeaderProps {
  title: string;
  description: string;
  onClearChat: () => void;
  onClose?: () => void;
  showFullscreenToggle?: boolean;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  featureFlagManager: FeatureFlagManager;
  isDevelopment?: boolean;
}

export const EnhancedChatHeader: React.FC<EnhancedChatHeaderProps> = React.memo(({
  title,
  description,
  onClearChat,
  onClose,
  showFullscreenToggle = false,
  isFullscreen = false,
  onToggleFullscreen,
  featureFlagManager,
  isDevelopment = false
}) => {
  const useAgentPlatform = featureFlagManager.getFlag('useAgentPlatform');
  const apiMode = useAgentPlatform ? 'Agent' : 'Chat API';

  const handleToggleApiMode = () => {
    featureFlagManager.toggleAgentPlatform();
    // Force page reload to apply new mode
    window.location.reload();
  };

  return (
    <div
      className="vectara-chatbot-header"
      style={{
        padding: '16px 60px 16px 16px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e1e5e9',
        minHeight: '60px',
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
              {title}
            </h3>

            {/* API Mode Indicator */}
            <div
              style={{
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: '600',
                backgroundColor: useAgentPlatform ? '#e3f2fd' : '#f3e5f5',
                color: useAgentPlatform ? '#1976d2' : '#7b1fa2',
                border: `1px solid ${useAgentPlatform ? '#90caf9' : '#ce93d8'}`
              }}
              title={`Currently using ${apiMode}`}
            >
              {apiMode}
            </div>
          </div>

          <p style={{ margin: 0, fontSize: '14px', color: '#6c757d' }}>
            {description}
            {useAgentPlatform && (
              <span style={{
                marginLeft: '8px',
                fontSize: '12px',
                color: '#28a745',
                fontStyle: 'italic'
              }}>
                • Enhanced with Vectara Agents
              </span>
            )}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Fullscreen toggle */}
          {showFullscreenToggle && onToggleFullscreen && (
            <button
              onClick={onToggleFullscreen}
              style={{
                padding: '4px 8px',
                border: '1px solid #1A79FF',
                borderRadius: '4px',
                backgroundColor: isFullscreen ? '#1A79FF' : 'white',
                color: isFullscreen ? 'white' : '#1A79FF',
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

EnhancedChatHeader.displayName = 'EnhancedChatHeader';