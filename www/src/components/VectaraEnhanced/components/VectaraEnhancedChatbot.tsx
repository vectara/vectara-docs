// Enhanced Vectara Chatbot Component
// Main chatbot component with intelligent code generation and search integration

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { EnhancedChatbotProps, ChatMessage, CodeSnippet, SupportedLanguage } from '../types';
import { useProductionChat } from '../hooks/useProductionChat';
import { useProductionChatV2 } from '../hooks/useProductionChatV2';
import { USE_V2_API } from '../config/vectaraConfig';
import CodePanel from '../../../theme/CodePanel';

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

interface CodeBlockProps {
  snippet: CodeSnippet;
  messageId: string;
  onCopy?: (code: string, language: string) => void;
  onParameterUpdate?: (messageId: string, snippetId: string, parameterName: string, value: any) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  snippet, 
  messageId, 
  onCopy, 
  onParameterUpdate 
}) => {
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);

  const handleParameterChange = (paramName: string, value: string) => {
    onParameterUpdate?.(messageId, snippet.id, paramName, value);
  };

  // Convert CodeSnippet to CodePanel format
  const codeSnippets = [{
    language: snippet.language,
    code: snippet.code
  }];

  const openFloatingPanel = () => {
    console.log('Opening floating panel for snippet:', snippet.id, snippet.title);
    setIsFloatingOpen(true);
  };

  const closeFloatingPanel = () => {
    setIsFloatingOpen(false);
  };

  return (
    <>
      <div className="vectara-code-block">
        {/* Code preview with click to expand */}
        <div 
          className="vectara-code-preview"
          onClick={openFloatingPanel}
          style={{
            padding: '12px',
            backgroundColor: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#e9ecef';
            e.currentTarget.style.borderColor = '#007bff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#f8f9fa';
            e.currentTarget.style.borderColor = '#e9ecef';
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '8px'
          }}>
            <div>
              <strong style={{ fontSize: '14px', color: '#333' }}>{snippet.title}</strong>
              <span style={{ 
                marginLeft: '8px', 
                fontSize: '12px', 
                color: '#666',
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                backgroundColor: '#e9ecef',
                padding: '2px 6px',
                borderRadius: '3px'
              }}>
                {snippet.language}
              </span>
            </div>
            <div style={{
              fontSize: '12px',
              color: '#007bff',
              fontWeight: '500'
            }}>
              Click to expand →
            </div>
          </div>
          
          {snippet.description && (
            <p style={{
              margin: '0 0 8px 0',
              fontSize: '13px',
              color: '#666',
              fontStyle: 'italic'
            }}>
              {snippet.description}
            </p>
          )}

          {/* Code preview (first few lines) */}
          <pre style={{
            margin: '0',
            fontSize: '12px',
            color: '#495057',
            backgroundColor: '#ffffff',
            padding: '8px',
            borderRadius: '4px',
            border: '1px solid #dee2e6',
            overflow: 'hidden',
            maxHeight: '60px',
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
          }}>
            <code>
              {snippet.code.split('\n').slice(0, 3).join('\n')}
              {snippet.code.split('\n').length > 3 && '\n...'}
            </code>
          </pre>
        </div>
      </div>

      {/* Floating Code Panel */}
      {isFloatingOpen && (
        <div 
          className="vectara-floating-code-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10001,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'stretch',
            animation: 'fadeIn 0.2s ease'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeFloatingPanel();
            }
          }}
        >
          <div 
            className="vectara-floating-code-panel"
            style={{
              width: '50%',
              maxWidth: '600px',
              minWidth: '400px',
              backgroundColor: 'white',
              boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              animation: 'slideInRight 0.3s ease'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid #e9ecef',
              backgroundColor: '#f8f9fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h3 style={{ margin: '0', fontSize: '16px', color: '#333' }}>
                  {snippet.title}
                </h3>
                {snippet.description && (
                  <p style={{ 
                    margin: '4px 0 0 0', 
                    fontSize: '13px', 
                    color: '#666',
                    fontStyle: 'italic'
                  }}>
                    {snippet.description}
                  </p>
                )}
              </div>
              <button
                onClick={closeFloatingPanel}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '20px',
                  cursor: 'pointer',
                  color: '#666',
                  padding: '4px',
                  borderRadius: '4px',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#333'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
              >
                ×
              </button>
            </div>

            {/* Parameter customization */}
            {Object.keys(snippet.parameters).length > 0 && (
              <div style={{
                padding: '16px 20px',
                borderBottom: '1px solid #e9ecef',
                backgroundColor: '#ffffff'
              }}>
                <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#333' }}>
                  Configuration:
                </h4>
                {Object.entries(snippet.parameters).map(([paramName, param]) => (
                  <div key={paramName} style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '13px' }}>
                      <span style={{
                        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                        backgroundColor: '#e9ecef',
                        padding: '3px 6px',
                        borderRadius: '3px',
                        fontSize: '12px',
                        color: '#495057',
                        display: 'inline-block',
                        marginBottom: '4px'
                      }}>
                        {param.description}
                      </span>
                      <input
                        type="text"
                        value={param.value}
                        onChange={(e) => handleParameterChange(paramName, e.target.value)}
                        placeholder={param.description}
                        style={{
                          fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                          fontSize: '12px',
                          width: '100%',
                          padding: '6px 8px',
                          border: '1px solid #ced4da',
                          borderRadius: '4px',
                          backgroundColor: 'white'
                        }}
                      />
                    </label>
                  </div>
                ))}
              </div>
            )}

            {/* Code Panel */}
            <div style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
              <CodePanel
                snippets={codeSnippets}
                title={snippet.title}
                defaultLanguage={snippet.language}
                layout="stacked"
              />
            </div>
          </div>
        </div>
      )}

    </>
  );
};

interface MessageProps {
  message: ChatMessage;
  onCodeCopy?: (code: string, language: string) => void;
  onParameterUpdate?: (messageId: string, snippetId: string, parameterName: string, value: any) => void;
  onShowCodeExamples?: (messageId: string, language?: string) => void;
  onSendFollowUp?: (content: string, parentMessageId: string) => void;
}

const Message: React.FC<MessageProps> = ({ 
  message, 
  onCodeCopy, 
  onParameterUpdate, 
  onShowCodeExamples,
  onSendFollowUp
}) => {
  const isUser = message.type === 'user';
  const [isSourcesExpanded, setIsSourcesExpanded] = useState(false);
  const [showFollowUpInput, setShowFollowUpInput] = useState(false);
  const [followUpText, setFollowUpText] = useState('');
  
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };
  
  const handleFollowUpSubmit = () => {
    if (followUpText.trim() && onSendFollowUp) {
      onSendFollowUp(followUpText.trim(), message.id);
      setFollowUpText('');
      setShowFollowUpInput(false);
    }
  };
  
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

        {/* Show code examples button */}
        {message.canShowCode && (
          <div className="vectara-code-actions">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
              <button
                className="vectara-show-code-btn"
                onClick={() => {
                  console.log('Show JavaScript code clicked!');
                  onShowCodeExamples?.(message.id, 'javascript');
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#f39c12',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                📝 JavaScript
              </button>
              <button
                className="vectara-show-code-btn"
                onClick={() => {
                  console.log('Show TypeScript code clicked!');
                  onShowCodeExamples?.(message.id, 'typescript');
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#3178c6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                📝 TypeScript
              </button>
              <button
                className="vectara-show-code-btn"
                onClick={() => {
                  console.log('Show Python code clicked!');
                  onShowCodeExamples?.(message.id, 'python');
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#3776ab',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                🐍 Python
              </button>
              <button
                className="vectara-show-code-btn"
                onClick={() => {
                  console.log('Show cURL code clicked!');
                  onShowCodeExamples?.(message.id, 'curl');
                }}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#2c3e50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '11px'
                }}
              >
                💻 cURL
              </button>
            </div>
          </div>
        )}

        {/* Code snippets */}
        {message.hasCodeSnippets && message.codeSnippets && Array.isArray(message.codeSnippets) && message.codeSnippets.length > 0 && (
          <div className="vectara-code-snippets">
            {console.log('Rendering code snippets:', message.codeSnippets.length)}
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
};

export const VectaraEnhancedChatbot: React.FC<EnhancedChatbotProps> = ({
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use the appropriate hook based on API version
  const chatHook = USE_V2_API ? useProductionChatV2 : useProductionChat;
  
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
  } = chatHook({
    customerId,
    corpusKeys,
    apiKey,
    enableStreaming,
    codeGeneration,
    analytics,
    maxRetries: retryAttempts
  });

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const query = inputValue.trim();
    setInputValue('');
    
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

  const handleCodeTest = useCallback((snippet: CodeSnippet) => {
    if (analytics?.enabled && analytics.onEvent) {
      analytics.onEvent({
        type: 'button_click',
        data: { action: 'test_code', language: snippet.language },
        timestamp: Date.now(),
        sessionId: `session_${Date.now()}`
      });
    }
  }, [analytics]);

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
    
    // Submit the suggestion directly without using the form
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

  return (
    <div 
      className={`vectara-enhanced-chatbot ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
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
      }}
    >
      {/* Header */}
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
            {showFullscreenToggle && (
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
              onClick={clearChat}
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

      {/* Messages */}
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
          <Message
            key={message.id}
            message={message}
            onCodeCopy={handleCodeCopy}
            onParameterUpdate={updateCodeParameter}
            onShowCodeExamples={showCodeExamples}
            onSendFollowUp={handleFollowUp}
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
              onClick={retry}
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

      {/* Input */}
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
        {showSuggestions && searchSuggestions.length > 0 && (
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
              overflowY: 'auto'
            }}
          >
            {searchSuggestions.map((suggestion, index) => (
              <div
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderBottom: index < searchSuggestions.length - 1 ? '1px solid #eee' : 'none',
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
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            onFocus={() => inputValue.length > 1 && setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder={placeholder}
            disabled={isLoading || isStreaming}
            style={{
              flex: 1,
              padding: '8px 12px',
              border: '1px solid #ced4da',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading || isStreaming}
            style={{
              padding: '8px 16px',
              backgroundColor: isLoading || isStreaming ? '#6c757d' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isLoading || isStreaming ? 'not-allowed' : 'pointer',
              fontSize: '14px'
            }}
          >
            {isLoading || isStreaming ? '⏳' : '📤'}
          </button>
        </form>
      </div>
    </div>
  );
};

// CSS styles to be included
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