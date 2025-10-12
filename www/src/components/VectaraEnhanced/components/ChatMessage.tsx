// Chat Message Component
// Handles individual message rendering with follow-up functionality

import React, { useState, useCallback, useEffect } from 'react';
import { ChatMessage as ChatMessageType, CodeSnippet } from '../types';
import { CodeBlock } from './CodeBlock';
import Prism from 'prismjs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageProps {
  message: ChatMessageType;
  onCodeCopy?: (code: string, language: string) => void;
  onParameterUpdate?: (messageId: string, snippetId: string, parameterName: string, value: any) => void;
  onSendFollowUp?: (content: string, parentMessageId: string) => void;
}

// Enhanced markdown renderer with Prism syntax highlighting (matches CodePanel)
const CodeBlockWithHighlighting: React.FC<{ code: string; language?: string }> = ({ code, language = 'text' }) => {
  const [highlighted, setHighlighted] = useState('');

  useEffect(() => {
    // Initialize Prism grammars (copied from CodePanel.js)
    if (!Prism.languages.bash) {
      Prism.languages.bash = {
        'shebang': { pattern: /^#!\s*\/.*/, alias: 'important' },
        'comment': { pattern: /(^|[^"{\\$])#.*/, lookbehind: true },
        'string': [
          { pattern: /("|')(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"'\\$`])*\1/, greedy: true }
        ],
        'environment': {
          pattern: RegExp('\\$(?:\\{[^}]+\\}|[A-Za-z_]\\w*|[0-9]+|[#$?*!@-])'),
          inside: { 'punctuation': /\$|\{|\}/ }
        },
        'keyword': /\b(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)\b/,
        'builtin': /\b(?:alias|bg|bind|break|cd|command|continue|echo|eval|exec|exit|export|fg|hash|jobs|kill|let|local|pwd|read|return|set|shift|test|times|trap|type|ulimit|umask|unset|wait)\b/,
        'boolean': /\b(?:false|true)\b/,
        'operator': /\d?<>|>\||\+=|[!=]=?|=~|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
        'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
      };
    }

    if (!Prism.languages.python) {
      Prism.languages.python = {
        'comment': { pattern: /(^|[^\\])#.*/, lookbehind: true, greedy: true },
        'string': { pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i, greedy: true },
        'function': { pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g, lookbehind: true },
        'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: true },
        'keyword': /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
        'builtin': /\b(?:__import__|abs|all|any|bool|bytes|callable|chr|classmethod|compile|complex|delattr|dict|dir|divmod|enumerate|eval|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|isinstance|issubclass|iter|len|list|locals|map|max|memoryview|min|next|object|oct|open|ord|pow|print|property|range|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|vars|zip)\b/,
        'boolean': /\b(?:False|None|True)\b/,
        'number': /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
        'operator': /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
        'punctuation': /[{}[\];(),.:]/
      };
    }

    if (!Prism.languages.javascript) {
      Prism.languages.javascript = {
        'comment': [
          { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: true, greedy: true },
          { pattern: /(^|[^\\:])\/\/.*/, lookbehind: true, greedy: true }
        ],
        'string': [
          { pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/, greedy: true },
          { pattern: /`(?:[^`\\$]|\\[\s\S]|\$(?:\{[^}]*\}|[^{]))*`/, greedy: true }
        ],
        'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        'boolean': /\b(?:false|true)\b/,
        'number': /\b(?:(?:0[xX](?:[\dA-Fa-f])+|0[bB](?:[01])+|0[oO](?:[0-7])+)n?|(?:\d+\.?\d*|\.\d+)(?:[Ee][+-]?\d+)?|NaN|Infinity)\b/,
        'function': { pattern: /((?:^|\s|[({[=,:;!+-])|\b)(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*\())/, lookbehind: true },
        'operator': /--|\+\+|\*\*=?|=>|&&|\|\||[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
        'punctuation': /[{}[\];(),.:]/
      };
    }

    if (!Prism.languages.json) {
      Prism.languages.json = {
        'property': { pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: true },
        'string': { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: true },
        'comment': { pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/, greedy: true },
        'number': /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
        'punctuation': /[{}[\],]/,
        'operator': /:/,
        'boolean': /\b(?:false|true)\b/,
        'null': { pattern: /\bnull\b/, alias: 'keyword' }
      };
    }

    // Language mapping (same as CodePanel)
    const languageMap: Record<string, string> = {
      'sh': 'bash',
      'shell': 'bash',
      'curl': 'bash',
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python'
    };

    const normalizedLanguage = languageMap[language] || language;
    const grammar = Prism.languages[normalizedLanguage] || Prism.languages.markup || {};

    try {
      const result = Prism.highlight(code, grammar, normalizedLanguage);
      setHighlighted(result);
    } catch (error) {
      console.warn('Syntax highlighting failed:', error);
      setHighlighted(code);
    }
  }, [code, language]);

  return (
    <pre style={{
      backgroundColor: '#000000', // Black background
      padding: '12px 16px',
      borderRadius: '6px',
      margin: '8px 0',
      overflow: 'auto',
      fontSize: '14px',
      lineHeight: '1.5',
      fontFamily: "'SF Mono', Monaco, 'Inconsolata', 'Roboto Mono', monospace",
      border: '1px solid #434a65'
    }}>
      <code
        className="chatbot-code-highlighted"
        style={{ color: '#abb2bf', backgroundColor: '#000000' }}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </pre>
  );
};

// Custom ReactMarkdown components to preserve Prism highlighting
const markdownComponents = {
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : 'text';
    const codeString = String(children).replace(/\n$/, '');

    if (!inline) {
      // Multi-line code block - use Prism highlighting
      return <CodeBlockWithHighlighting code={codeString} language={language} />;
    }

    // Inline code - use existing styling
    return (
      <code
        style={{
          backgroundColor: '#000000',
          color: '#98c379',
          padding: '2px 6px',
          borderRadius: '3px',
          fontSize: '13px',
          fontFamily: "'SF Mono', Monaco, monospace",
          border: '1px solid #434a65'
        }}
        {...props}
      >
        {children}
      </code>
    );
  },
  a: ({ node, children, ...props }: any) => (
    <a
      {...props}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        color: '#007bff',
        textDecoration: 'underline'
      }}
    >
      {children}
    </a>
  ),
  h1: ({ node, children, ...props }: any) => (
    <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '16px 0 12px 0', lineHeight: '1.3' }} {...props}>
      {children}
    </h1>
  ),
  h2: ({ node, children, ...props }: any) => (
    <h2 style={{ fontSize: '20px', fontWeight: '600', margin: '14px 0 10px 0', lineHeight: '1.3' }} {...props}>
      {children}
    </h2>
  ),
  h3: ({ node, children, ...props }: any) => (
    <h3 style={{ fontSize: '18px', fontWeight: '600', margin: '12px 0 8px 0', lineHeight: '1.3' }} {...props}>
      {children}
    </h3>
  ),
  h4: ({ node, children, ...props }: any) => (
    <h4 style={{ fontSize: '16px', fontWeight: '600', margin: '10px 0 6px 0', lineHeight: '1.3' }} {...props}>
      {children}
    </h4>
  ),
  ul: ({ node, children, ...props }: any) => (
    <ul style={{ margin: '8px 0', paddingLeft: '24px', listStyleType: 'disc' }} {...props}>
      {children}
    </ul>
  ),
  ol: ({ node, children, ...props }: any) => (
    <ol style={{ margin: '8px 0', paddingLeft: '24px', listStyleType: 'decimal' }} {...props}>
      {children}
    </ol>
  ),
  li: ({ node, children, ...props }: any) => (
    <li style={{ margin: '4px 0', lineHeight: '1.6' }} {...props}>
      {children}
    </li>
  ),
  blockquote: ({ node, children, ...props }: any) => (
    <blockquote
      style={{
        margin: '12px 0',
        padding: '8px 16px',
        borderLeft: '4px solid #007bff',
        backgroundColor: '#f8f9fa',
        fontStyle: 'italic'
      }}
      {...props}
    >
      {children}
    </blockquote>
  ),
  table: ({ node, children, ...props }: any) => (
    <div style={{ overflowX: 'auto', margin: '12px 0' }}>
      <table style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid #dee2e6' }} {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ node, children, ...props }: any) => (
    <th
      style={{
        padding: '8px 12px',
        border: '1px solid #dee2e6',
        backgroundColor: '#f8f9fa',
        fontWeight: '600',
        textAlign: 'left'
      }}
      {...props}
    >
      {children}
    </th>
  ),
  td: ({ node, children, ...props }: any) => (
    <td style={{ padding: '8px 12px', border: '1px solid #dee2e6' }} {...props}>
      {children}
    </td>
  )
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
  const [isCopied, setIsCopied] = useState(false);

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

  const handleCopyMessage = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  }, [message.content]);

  return (
    <div className={`vectara-message ${isUser ? 'vectara-message-user' : 'vectara-message-assistant'} ${message.isFollowUp ? 'vectara-message-followup' : ''}`}>
      {/* Avatar for assistant */}
      {!isUser && (
        <div className="vectara-message-avatar">
          <img
            src="https://www.vectara.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fa0552d1ab3c77c6eee33e58f99e564c8.svg&w=256&q=75"
            alt="Vectara Docs Assistant"
            style={{ width: '18px', height: '18px' }}
          />
        </div>
      )}

      <div className="vectara-message-content">
        <div className="vectara-message-header">
          <span className="vectara-message-timestamp">{formatTimestamp(message.timestamp)}</span>
          {message.isFollowUp && <span className="vectara-followup-indicator">↳ Follow-up</span>}
        </div>
        <div className="vectara-message-text">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {message.content}
          </ReactMarkdown>
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
                      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                        {ref.snippet}
                      </ReactMarkdown>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Follow-up actions for assistant messages */}
        {!isUser && !message.isStreaming && (
          <div className="vectara-message-actions" style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <button
              className="vectara-copy-btn"
              onClick={handleCopyMessage}
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
              {isCopied ? '✓ Copied' : '📋 Copy'}
            </button>
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
                color: '#666'
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

      {/* Avatar for user */}
      {isUser && (
        <div className="vectara-message-avatar">
          <span style={{ fontSize: '16px' }}>👤</span>
        </div>
      )}
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';