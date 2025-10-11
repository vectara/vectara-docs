// Chat Message Component
// Handles individual message rendering with follow-up functionality

import React, { useState, useCallback, useEffect } from 'react';
import { ChatMessage as ChatMessageType, CodeSnippet } from '../types';
import { CodeBlock } from './CodeBlock';
import Prism from 'prismjs';

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
      backgroundColor: '#282c34', // CodePanel dark background
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
        style={{ color: '#abb2bf' }}
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </pre>
  );
};

// Simple markdown renderer for basic formatting
const renderMarkdown = (text: string): JSX.Element => {
  // Split by code blocks first
  const parts = text.split(/(```[\s\S]*?```|`[^`]+`)/);

  return (
    <>
      {parts.map((part, index) => {
        // Handle code blocks with language detection
        if (part.startsWith('```') && part.endsWith('```')) {
          const content = part.slice(3, -3);
          const firstLineEnd = content.indexOf('\n');
          const language = firstLineEnd > 0 ? content.slice(0, firstLineEnd).trim() : 'text';
          const code = firstLineEnd > 0 ? content.slice(firstLineEnd + 1) : content;

          return <CodeBlockWithHighlighting key={index} code={code} language={language} />;
        }

        // Handle inline code
        if (part.startsWith('`') && part.endsWith('`')) {
          const code = part.slice(1, -1);
          return (
            <code key={index} style={{
              backgroundColor: '#282c34',
              color: '#98c379',
              padding: '2px 6px',
              borderRadius: '3px',
              fontSize: '13px',
              fontFamily: "'SF Mono', Monaco, monospace",
              border: '1px solid #434a65'
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
          .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #007bff; text-decoration: underline;">$1</a>')
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