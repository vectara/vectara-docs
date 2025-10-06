// Chat Message Component
// Handles individual message rendering with follow-up functionality

import React, { useState, useCallback } from 'react';
import { ChatMessage as ChatMessageType, CodeSnippet } from '../types';
import { CodeBlock } from './CodeBlock';

interface MessageProps {
  message: ChatMessageType;
  onCodeCopy?: (code: string, language: string) => void;
  onParameterUpdate?: (messageId: string, snippetId: string, parameterName: string, value: any) => void;
  onSendFollowUp?: (content: string, parentMessageId: string) => void;
}

// Simple markdown renderer for basic formatting
const renderMarkdown = (text: string): JSX.Element => {
  // Split by code blocks first
  const parts = text.split(/(```[\s\S]*?```|`[^`]+`)/);

  return (
    <>
      {parts.map((part, index) => {
        // Handle code blocks
        if (part.startsWith('```') && part.endsWith('```')) {
          const code = part.slice(3, -3).trim();
          return (
            <pre key={index} style={{
              backgroundColor: '#f6f8fa',
              padding: '8px 12px',
              borderRadius: '4px',
              margin: '8px 0',
              overflow: 'auto',
              fontSize: '13px',
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
            }}>
              <code>{code}</code>
            </pre>
          );
        }

        // Handle inline code
        if (part.startsWith('`') && part.endsWith('`')) {
          const code = part.slice(1, -1);
          return (
            <code key={index} style={{
              backgroundColor: '#f1f3f4',
              padding: '2px 4px',
              borderRadius: '3px',
              fontSize: '12px',
              fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
            }}>
              {code}
            </code>
          );
        }

        // Handle regular text with basic markdown
        let processed = part
          // Bold text
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          // Italic text
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          // Links
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
          // Line breaks
          .replace(/\n/g, '<br />');

        return (
          <span key={index} dangerouslySetInnerHTML={{ __html: processed }} />
        );
      })}
    </>
  );
};

export const ChatMessage: React.FC<MessageProps> = React.memo(({
  message,
  onCodeCopy,
  onParameterUpdate,
  onSendFollowUp
}) => {
  const isUser = message.type === 'user';
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(false);
  const [showFollowUpInput, setShowFollowUpInput] = useState(false);
  const [followUpText, setFollowUpText] = useState('');

  const formatTimestamp = useCallback((timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();

    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  }, []);

  const handleFollowUpSubmit = useCallback(() => {
    if (followUpText.trim() && onSendFollowUp) {
      onSendFollowUp(followUpText.trim(), message.id);
      setFollowUpText('');
      setShowFollowUpInput(false);
    }
  }, [followUpText, onSendFollowUp, message.id]);

  return (
    <div className={`vectara-message ${isUser ? 'vectara-message-user' : 'vectara-message-assistant'} ${message.isFollowUp ? 'vectara-message-followup' : ''}`}>
      <div className="vectara-message-content">
        <div className="vectara-message-header">
          <span className="vectara-message-timestamp">{formatTimestamp(message.timestamp)}</span>
          {message.isFollowUp && <span className="vectara-followup-indicator">↳ Follow-up</span>}
        </div>
        <div className="vectara-message-text">
          {renderMarkdown(message.content)}
          {message.isStreaming && <span className="vectara-typing-indicator">▋</span>}
        </div>

  
        {/* Code snippets */}
        {message.hasCodeSnippets && message.codeSnippets && Array.isArray(message.codeSnippets) && message.codeSnippets.length > 0 && (
          <div className="vectara-code-snippets">
            {message.codeSnippets.map((snippet) => (
              <CodeBlock
                key={snippet.id}
                snippet={snippet}
                messageId={message.id}
                onCopy={onCodeCopy}
                onParameterUpdate={onParameterUpdate}
              />
            ))}
          </div>
        )}

        {/* References - Collapsible */}
        {message.references && message.references.length > 0 && (
          <div className="vectara-references">
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '8px 0',
                borderBottom: '1px solid #e1e5e9'
              }}
              onClick={() => setIsSourcesExpanded(!isSourcesExpanded)}
            >
              <span style={{ marginRight: '8px', fontSize: '14px' }}>
                {isSourcesExpanded ? '▼' : '▶'}
              </span>
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: '600' }}>
                Sources ({message.references.length})
              </h4>
            </div>
            {isSourcesExpanded && (
              <ul>
                {message.references.map((ref, index) => (
                  <li key={ref.id} className="vectara-reference">
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 'bold',
                        color: '#666',
                        minWidth: '20px',
                        marginRight: '8px'
                      }}>
                        [{index + 1}]
                      </span>
                      {ref.url ? (
                        <a
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#007bff',
                            textDecoration: 'underline',
                            fontWeight: '600',
                            fontSize: '12px',
                            flex: 1
                          }}
                        >
                          {ref.title}
                        </a>
                      ) : (
                        <strong style={{ fontSize: '12px', flex: 1 }}>
                          {ref.title}
                        </strong>
                      )}
                    </div>
                    <div style={{ fontSize: '11px', color: '#666', lineHeight: 1.3 }}>
                      {renderMarkdown(ref.snippet)}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Follow-up actions for assistant messages */}
        {!isUser && !message.isStreaming && (
          <div className="vectara-message-actions">
            <button
              className="vectara-followup-btn"
              onClick={() => setShowFollowUpInput(!showFollowUpInput)}
              style={{
                padding: '4px 8px',
                fontSize: '11px',
                backgroundColor: 'transparent',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                color: '#666',
                marginTop: '8px'
              }}
            >
              💬 Ask follow-up
            </button>
          </div>
        )}

        {/* Follow-up input */}
        {showFollowUpInput && (
          <div className="vectara-followup-input" style={{ marginTop: '8px' }}>
            <input
              type="text"
              value={followUpText}
              onChange={(e) => setFollowUpText(e.target.value)}
              placeholder="Ask a follow-up question..."
              onKeyPress={(e) => e.key === 'Enter' && handleFollowUpSubmit()}
              style={{
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                marginBottom: '4px'
              }}
            />
            <div style={{ display: 'flex', gap: '4px' }}>
              <button
                onClick={handleFollowUpSubmit}
                disabled={!followUpText.trim()}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: followUpText.trim() ? 'pointer' : 'not-allowed',
                  opacity: followUpText.trim() ? 1 : 0.6
                }}
              >
                Send
              </button>
              <button
                onClick={() => {
                  setShowFollowUpInput(false);
                  setFollowUpText('');
                }}
                style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  backgroundColor: 'transparent',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  color: '#666'
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';