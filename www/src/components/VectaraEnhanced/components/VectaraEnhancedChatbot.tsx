// Enhanced Vectara Chatbot Component
// Main chatbot component with intelligent code generation and search integration

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { EnhancedChatbotProps, ChatMessage, CodeSnippet, SupportedLanguage } from '../types';
import { useProductionChat } from '../hooks/useProductionChat';
import { useProductionChatV2 } from '../hooks/useProductionChatV2';
import { USE_V2_API } from '../config/vectaraConfig';

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
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onCopy?.(snippet.code, snippet.language);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const handleParameterChange = (paramName: string, value: string) => {
    onParameterUpdate?.(messageId, snippet.id, paramName, value);
  };

  return (
    <div className="vectara-code-block">
      <div className="vectara-code-header">
        <div className="vectara-code-info">
          <span className="vectara-code-title">{snippet.title}</span>
          <span className="vectara-code-language">{snippet.language}</span>
        </div>
        <button 
          className="vectara-code-copy-btn"
          onClick={handleCopy}
          title={copied ? 'Copied!' : 'Copy to clipboard'}
        >
          {copied ? '✓' : '📋'}
        </button>
      </div>
      
      {snippet.description && (
        <p className="vectara-code-description">{snippet.description}</p>
      )}

      {/* Parameter customization */}
      {Object.keys(snippet.parameters).length > 0 && (
        <div className="vectara-code-parameters">
          <h4>Configuration:</h4>
          {Object.entries(snippet.parameters).map(([paramName, param]) => (
            <div key={paramName} className="vectara-parameter-input">
              <label>
                {param.description}:
                <input
                  type="text"
                  value={param.value}
                  onChange={(e) => handleParameterChange(paramName, e.target.value)}
                  placeholder={param.description}
                />
              </label>
            </div>
          ))}
        </div>
      )}

      <pre className="vectara-code-content">
        <code className={`language-${snippet.language}`}>
          {snippet.code}
        </code>
      </pre>
    </div>
  );
};

interface MessageProps {
  message: ChatMessage;
  onCodeCopy?: (code: string, language: string) => void;
  onParameterUpdate?: (messageId: string, snippetId: string, parameterName: string, value: any) => void;
  onShowCodeExamples?: (messageId: string) => void;
}

const Message: React.FC<MessageProps> = ({ 
  message, 
  onCodeCopy, 
  onParameterUpdate, 
  onShowCodeExamples 
}) => {
  const isUser = message.type === 'user';
  
  return (
    <div className={`vectara-message ${isUser ? 'vectara-message-user' : 'vectara-message-assistant'}`}>
      <div className="vectara-message-content">
        <div className="vectara-message-text">
          {message.content}
          {message.isStreaming && <span className="vectara-typing-indicator">▋</span>}
        </div>

        {/* Show code examples button */}
        {message.canShowCode && (
          <div className="vectara-code-actions">
            <button
              className="vectara-show-code-btn"
              onClick={() => onShowCodeExamples?.(message.id)}
            >
              📝 Show code examples
            </button>
          </div>
        )}

        {/* Code snippets */}
        {message.hasCodeSnippets && message.codeSnippets && (
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

        {/* References */}
        {message.references && message.references.length > 0 && (
          <div className="vectara-references">
            <h4>Sources:</h4>
            <ul>
              {message.references.map((ref) => (
                <li key={ref.id} className="vectara-reference">
                  <strong>{ref.title}</strong>
                  <p>{ref.snippet}</p>
                  {ref.score && (
                    <span className="vectara-reference-score">
                      Score: {ref.score.toFixed(2)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
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
  className = "",
  style = {}
}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Use the appropriate hook based on API version
  const chatHook = USE_V2_API ? useProductionChatV2 : useProductionChat;
  
  const {
    messages,
    isLoading,
    error,
    isStreaming,
    retryCount,
    sendMessage,
    retry,
    clearChat,
    updateCodeParameter,
    showCodeExamples
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

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  }, [handleSubmit]);

  return (
    <div 
      className={`vectara-enhanced-chatbot ${className}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        backgroundColor: '#ffffff',
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        overflow: 'hidden',
        ...style
      }}
    >
      {/* Header */}
      <div 
        className="vectara-chatbot-header"
        style={{
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderBottom: '1px solid #e1e5e9'
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
          />
        ))}
        
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
          backgroundColor: '#f8f9fa'
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '8px' }}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
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
}

.vectara-message {
  margin-bottom: 16px;
}

.vectara-message-user .vectara-message-content {
  background-color: var(--vectara-primary);
  color: white;
  margin-left: 20%;
  border-radius: 12px 12px 4px 12px;
  padding: 12px 16px;
}

.vectara-message-assistant .vectara-message-content {
  background-color: var(--vectara-light);
  color: var(--vectara-dark);
  margin-right: 20%;
  border-radius: 12px 12px 12px 4px;
  padding: 12px 16px;
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
  padding: 16px;
  background-color: #f6f8fa;
  overflow-x: auto;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.5;
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
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 6px;
  border: 1px solid var(--vectara-border);
}

.vectara-references h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: var(--vectara-secondary);
}

.vectara-references ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.vectara-reference {
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid var(--vectara-border);
}

.vectara-reference:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.vectara-reference strong {
  font-size: 13px;
  color: var(--vectara-dark);
}

.vectara-reference p {
  margin: 4px 0 0 0;
  font-size: 12px;
  color: var(--vectara-secondary);
  line-height: 1.4;
}

.vectara-reference-score {
  font-size: 11px;
  color: var(--vectara-secondary);
}

.vectara-typing-indicator {
  animation: vectara-blink 1s infinite;
}

@keyframes vectara-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
`;