import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import Prism from 'prismjs'; 

// Import CSS theme
// import 'prismjs/themes/prism.css';

import styles from './CodePanel.module.css';

export default function CodePanel({
  snippets,
  title = 'Code example',
  defaultLanguage = 'bash',
  annotations = {},
  layout = 'floating',
  customWidth, // New prop for manual width override
  collapsible = true, // Enable collapse feature
  initialCollapsedLines = 30, // Auto-collapse if more than N lines
  highlightLines = '', // Line ranges to highlight e.g. "2-4,7,10-12"
  tabs = false, // Enable tabs mode for multiple snippets
  editable = false // Enable live code editor mode
}) {
  /* ---------------------------------------------------------- */
  /* State                                                     */
  /* ---------------------------------------------------------- */
  const [selectedLanguage, setSelectedLanguage] = useState(
  snippets[0]?.language || defaultLanguage
  );

  const [toast, setToast] = useState(null);
  const [highlighted, setHighlighted] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [editableCode, setEditableCode] = useState('');
  
  // Refs for scroll synchronization
  const textareaRef = React.useRef();
  const highlightRef = React.useRef();
  const lineNumbersRef = React.useRef();

  /* ---------------------------------------------------------- */
  /* Helpers                                                   */
  /* ---------------------------------------------------------- */
  const validSnippets =
    Array.isArray(snippets) && snippets.length
      ? snippets
      : [{language: defaultLanguage, code: '// No code provided'}];

  const snippet = tabs 
    ? validSnippets[selectedTab] ?? validSnippets[0]
    : validSnippets.find((s) => s.language === selectedLanguage) ?? validSnippets[0];

  const annoFor = tabs 
    ? annotations[snippet.language] ?? []
    : annotations[selectedLanguage] ?? [];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const copyAll = () => {
    const codeToCopy = editable ? editableCode : snippet.code;
    navigator.clipboard.writeText(codeToCopy.trim());
    showToast('Copied!');
  };

  const copyLine = (line) => {
    navigator.clipboard.writeText(line.trim());
    showToast('Line copied');
  };

  const resetCode = () => {
    setEditableCode(snippet.code);
    showToast('Code reset');
  };

  // Synchronize scroll between textarea, background, and line numbers
  const handleScroll = (e) => {
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.target.scrollTop;
    }
  };

  // Keyboard navigation handlers
  const handleKeyDown = (e) => {
    // Ctrl/Cmd + Enter to copy code
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      copyAll();
      return;
    }
    
    // Ctrl/Cmd + R to reset (only in editable mode)
    if (editable && (e.ctrlKey || e.metaKey) && e.key === 'r') {
      e.preventDefault();
      resetCode();
      return;
    }
  };

  const handleTabKeyDown = (e, tabIndex) => {
    if (e.key === 'ArrowLeft' && tabIndex > 0) {
      e.preventDefault();
      setSelectedTab(tabIndex - 1);
    } else if (e.key === 'ArrowRight' && tabIndex < validSnippets.length - 1) {
      e.preventDefault();
      setSelectedTab(tabIndex + 1);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSelectedTab(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSelectedTab(validSnippets.length - 1);
    }
  };

  // Parse line highlight ranges (e.g., "2-4,7,10-12" -> Set of line numbers)
  const parseHighlightLines = (hlString) => {
    const lines = new Set();
    if (!hlString) return lines;
    
    hlString.split(',').forEach(part => {
      const range = part.trim().split('-');
      if (range.length === 1) {
        lines.add(parseInt(range[0]));
      } else if (range.length === 2) {
        const start = parseInt(range[0]);
        const end = parseInt(range[1]);
        for (let i = start; i <= end; i++) {
          lines.add(i);
        }
      }
    });
    return lines;
  };

  const highlightedLines = parseHighlightLines(highlightLines);
  const currentCode = editable ? editableCode : snippet.code;
  const codeLines = currentCode.split('\n');
  const totalLines = codeLines.length;
  const shouldAutoCollapse = collapsible && totalLines > initialCollapsedLines;

  // Initialize editable code when snippet changes
  useEffect(() => {
    if (editable && snippet.code) {
      setEditableCode(snippet.code);
    }
  }, [editable, snippet.code]);

  // Initialize collapse state
  useEffect(() => {
    setIsCollapsed(shouldAutoCollapse);
  }, [shouldAutoCollapse]);

  /* ---------------------------------------------------------- */
  /* Re-highlight whenever language or code changes            */
  /* ---------------------------------------------------------- */
  useEffect(() => {
    // Define Python grammar manually
    if (!Prism.languages.python) {
      Prism.languages.python = {
        'comment': {
          pattern: /(^|[^\\])#.*/,
          lookbehind: true,
          greedy: true
        },
        'string-interpolation': {
          pattern: /(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
          greedy: true,
          inside: {
            'interpolation': {
              pattern: /((?:^|[^{])(?:\{\{)*)\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/,
              lookbehind: true,
              inside: {
                'format-spec': {
                  pattern: /(:)[^:(){}]+(?=\}$)/,
                  lookbehind: true,
                  alias: 'number'
                },
                'conversion-option': {
                  pattern: /![sra](?=[:}]$)/,
                  alias: 'punctuation'
                },
                rest: null
              }
            },
            'string': /[\s\S]+/
          }
        },
        'triple-quoted-string': {
          pattern: /(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,
          greedy: true,
          alias: 'string'
        },
        'string': {
          pattern: /(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
          greedy: true
        },
        'function': {
          pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
          lookbehind: true
        },
        'class-name': {
          pattern: /(\bclass\s+)\w+/i,
          lookbehind: true
        },
        'decorator': {
          pattern: /(^[\t ]*)@\w+(?:\.\w+)*/m,
          lookbehind: true,
          alias: ['annotation', 'punctuation'],
          inside: {
            'punctuation': /\./
          }
        },
        'keyword': /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
        'builtin': /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
        'boolean': /\b(?:False|None|True)\b/,
        'number': /\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,
        'operator': /[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
        'punctuation': /[{}[\];(),.:]/
      };
    }
    
    // Define JSON grammar manually
    if (!Prism.languages.json) {
      Prism.languages.json = {
        'property': {
          pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
          lookbehind: true,
          greedy: true
        },
        'string': {
          pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
          lookbehind: true,
          greedy: true
        },
        'comment': {
          pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
          greedy: true
        },
        'number': /-?\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
        'punctuation': /[{}[\],]/,
        'operator': /:/,
        'boolean': /\b(?:false|true)\b/,
        'null': {
          pattern: /\bnull\b/,
          alias: 'keyword'
        }
      };
    }

    // Define JavaScript grammar manually
    if (!Prism.languages.javascript) {
      Prism.languages.javascript = {
        'comment': [
          {
            pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
            lookbehind: true,
            greedy: true
          },
          {
            pattern: /(^|[^\\:])\/\/.*/,
            lookbehind: true,
            greedy: true
          }
        ],
        'string': [
          {
            pattern: /(["'])(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
            greedy: true
          },
          {
            pattern: /`(?:[^`\\$]|\\[\s\S]|\$(?:\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}|(?!\{)[^`\\]))*`/,
            greedy: true,
            inside: {
              'template-punctuation': {
                pattern: /^`|`$/,
                alias: 'string'
              },
              'interpolation': {
                pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})*\}/,
                lookbehind: true,
                inside: {
                  'interpolation-punctuation': {
                    pattern: /^\$\{|\}$/,
                    alias: 'punctuation'
                  },
                  rest: null
                }
              }
            }
          }
        ],
        'class-name': [
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,
            lookbehind: true
          },
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:call|apply))/,
            lookbehind: true
          },
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*/,
            lookbehind: true
          }
        ],
        'function': {
          pattern: /((?:^|\s|[({[=,:;!+-])|\b)(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*\s*\())/,
          lookbehind: true
        },
        'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        'boolean': /\b(?:false|true)\b/,
        'function-variable': {
          pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
          alias: 'function'
        },
        'parameter': [
          {
            pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
            lookbehind: true,
            inside: {
              'punctuation': /[,]/
            }
          },
          {
            pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
            lookbehind: true
          },
          {
            pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
            lookbehind: true,
            inside: {
              'punctuation': /[,]/
            }
          },
          {
            pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
            lookbehind: true,
            inside: {
              'punctuation': /[,]/
            }
          }
        ],
        'constant': /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
        'number': /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
        'operator': /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
      };
    }

    // Define bash grammar manually
    if (!Prism.languages.bash) {
      Prism.languages.bash = {
        'shebang': {
          pattern: /^#!\s*\/.*/,
          alias: 'important'
        },
        'comment': {
          pattern: /(^|[^"{\\$])#.*/,
          lookbehind: true
        },
        'function-name': [
          {
            pattern: /(\bfunction\s+)[\w-]+(?=(?:\s*\(?:\s*\))?\s*\{)/,
            lookbehind: true,
            alias: 'function'
          },
          {
            pattern: /\b[\w-]+(?=\s*\(\s*\)\s*\{)/,
            alias: 'function'
          }
        ],
        'for-or-select': {
          pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
          alias: 'variable',
          lookbehind: true
        },
        'assign-left': {
          pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
          inside: {
            'environment': {
              pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + '(?:' + [
                '[A-Za-z_]\\w*',
                '\\$(?:\\{[^}]+\\}|[A-Za-z_]\\w*|[0-9]+)'
              ].join('|') + ')'),
              lookbehind: true,
              inside: {
                'punctuation': /\$|\{|\}/
              }
            }
          },
          alias: 'environment',
          lookbehind: true
        },
        'parameter': {
          pattern: /(^|[^$\\])\$(?:\w+|[0-9]+|[#$?*!@-])/,
          lookbehind: true,
          inside: {
            'variable': /\w+|[0-9]+|[#$?*!@-]/
          }
        },
        'string': [
          {
            pattern: /((?:^|[^<])<<-?\s*)(\w+)\s[\s\S]*?(?:\r?\n|\r)\2/,
            lookbehind: true,
            greedy: true,
            inside: {
              'bash': {
                pattern: /^(\s*)[\s\S]*?(?=\s*$)/m,
                lookbehind: true,
                inside: null
              }
            }
          },
          {
            pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s[\s\S]*?(?:\r?\n|\r)\3/,
            lookbehind: true,
            greedy: true,
            inside: {
              'bash': {
                pattern: /^(\s*)[\s\S]*?(?=\s*$)/m,
                lookbehind: true,
                inside: null
              }
            }
          },
          {
            pattern: /("|')(?:\\[\s\S]|\$\([^)]+\)|\$(?!\()|`[^`]+`|[^"'\\$`])*\1/,
            greedy: true,
            inside: {
              'parameter': {
                pattern: /(^|[^$\\])\$(?:\w+|[0-9]+|[#$?*!@-])/,
                lookbehind: true,
                inside: {
                  'variable': /\w+|[0-9]+|[#$?*!@-]/
                }
              }
            }
          }
        ],
        'environment': {
          pattern: RegExp('\\$' + '(?:' + [
            '\\{[^}]+\\}',
            '[A-Za-z_]\\w*',
            '[0-9]+',
            '[#$?*!@-]'
          ].join('|') + ')'),
          inside: {
            'punctuation': /\$|\{|\}/
          }
        },
        'keyword': /\b(?:case|do|done|elif|else|esac|fi|for|function|if|in|select|then|until|while)\b/,
        'builtin': /\b(?:alias|bg|bind|break|builtin|caller|cd|command|compgen|complete|compopt|continue|declare|dirs|disown|echo|enable|eval|exec|exit|export|fc|fg|getopts|hash|help|history|jobs|kill|let|local|logout|mapfile|popd|printf|pushd|pwd|read|readarray|readonly|return|set|shift|shopt|source|suspend|test|times|trap|type|typeset|ulimit|umask|unalias|unset|wait)\b/,
        'boolean': /\b(?:false|true)\b/,
        'file-descriptor': {
          pattern: /\B&[0-9]+\b/,
          alias: 'important'
        },
        'operator': /\d?<>|>\||\+=|[!=]=?|=~|<<[<-]?|[&\d]?>>|\d[<>]&?|[<>][&=]?|&[>&]?|\|[&|]?/,
        'punctuation': /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
        'number': /(?:\b\d+(?:\.\d+)?|\B\.\d+)(?:[Ee][+-]?\d+)?/
      };
    }
    
    // Ensure proper language mapping and fallback
    const languageMap = {
      'sh': 'bash',
      'shell': 'bash',
      'curl': 'bash', // Use bash highlighting for curl commands
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python'
    };
    
    const normalizedLanguage = languageMap[snippet.language] || snippet.language;
    
    const grammar = Prism.languages[normalizedLanguage] || Prism.languages.markup;
    
    try {
      const codeToHighlight = editable ? editableCode : snippet.code;
      const result = Prism.highlight(codeToHighlight, grammar, normalizedLanguage);
      setHighlighted(result);
    } catch (error) {
      console.warn('Syntax highlighting failed:', error);
      // Fallback to plain text if highlighting fails
      setHighlighted(editable ? editableCode : snippet.code);
    }
  }, [snippet, editableCode, editable]);

  /* Strip tags when copying an individual line */
  const stripHtml = (h) => h.replace(/<[^>]*>?/gm, '');

  /* Build line-by-line DOM so we can attach markers & numbers */

  const renderLines = () => {
    const lines = highlighted.split('\n');
    const linesToRender = isCollapsed ? lines.slice(0, initialCollapsedLines) : lines;
    
    return linesToRender.map((html, idx) => {
      const num = idx + 1;
      const anno = annoFor.find((a) => a.line === num);
      const isHighlighted = highlightedLines.has(num);

      return (
        <div
          key={num}
          className={`${styles.codeLine} ${isHighlighted ? styles.highlightedLine : ''}`}
          onClick={() => copyLine(stripHtml(html))}
        >
          <span className={styles.lineNumber}>{num}</span>

                    {/* eslint-disable-next-line react/no-danger */}
          <span
            className={styles.codeHtml}
            dangerouslySetInnerHTML={{__html: html || ''}}
          />

          {anno && (
            <span className={styles.marker} data-tooltip={anno.text}>
              ?
            </span>
          )}          
        </div>
      );
    });
  };

  /* ---------------------------------------------------------- */
  /* Render                                                    */
  /* ---------------------------------------------------------- */
  const panelStyle = layout === 'floating' && customWidth ? { width: customWidth, maxWidth: customWidth } : {};

  return (
    <div 
      className={`${styles.codePanel} ${layout === 'stacked' ? styles.stackedLayout : styles.floatingLayout}`}
      style={panelStyle} // Apply inline style for customWidth
      role="group"
      aria-labelledby="code-panel-title"
      aria-describedby="code-panel-description"
      onKeyDown={handleKeyDown}
    >
      {/* Header ------------------------------------------------ */}
      <div className={styles.panelHeader}>
        <h3 
          id="code-panel-title" 
          className={styles.headerTitle}
        >
          {title.toUpperCase()}
        </h3>
        
        {/* Hidden description for screen readers */}
        <span 
          id="code-panel-description" 
          className={styles.srOnly}
        >
          {editable ? 'Interactive code editor' : 'Code example'} with {validSnippets.length > 1 ? 'multiple language options' : snippet.language + ' syntax'}. 
          {editable && 'You can edit the code and reset to original.'}
        </span>

        {tabs ? (
          <div 
            className={styles.tabsContainer}
            role="tablist"
            aria-label="Code language options"
          >
            {validSnippets.map((snippet, idx) => (
              <button
                key={idx}
                role="tab"
                className={`${styles.tab} ${selectedTab === idx ? styles.activeTab : ''}`}
                onClick={() => setSelectedTab(idx)}
                onKeyDown={(e) => handleTabKeyDown(e, idx)}
                aria-selected={selectedTab === idx}
                aria-controls="code-content"
                id={`tab-${idx}`}
                tabIndex={selectedTab === idx ? 0 : -1}
              >
                {snippet.language || snippet.title}
              </button>
            ))}
          </div>
        ) : (
          <select
            className={styles.languageSelect}
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            aria-label="Select programming language"
          >
            {validSnippets.map(({language}) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        )}

        <div className={styles.buttonGroup} role="group" aria-label="Code actions">
          <button
            type="button"
            onClick={copyAll}
            className={styles.iconButton}
            aria-label={`Copy ${snippet.language} code to clipboard`}
            title="Copy code"
          >
            <span aria-hidden="true">📋</span>
            <span className={styles.srOnly}>Copy</span>
          </button>
          
          {/* Reset button for editable panels */}
          {editable && (
            <button
              type="button"
              onClick={resetCode}
              className={styles.iconButton}
              aria-label="Reset code to original version"
              title="Reset to original code"
            >
              <span aria-hidden="true">↺</span>
              <span className={styles.srOnly}>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Code body -------------------------------------------- */}
      {editable ? (
        <div 
          className={styles.editorContainer}
          role="tabpanel"
          id="code-content"
          aria-labelledby={tabs ? `tab-${selectedTab}` : undefined}
        >
          <div className={styles.editorSection}>
            <div className={styles.editorWrapper}>
              {/* Line numbers */}
              <div
                ref={lineNumbersRef}
                className={styles.editorLineNumbers}
                aria-hidden="true"
              >
                {(editableCode || snippet.code).split('\n').map((_, idx) => (
                  <div key={idx} className={styles.editorLineNumber}>
                    {idx + 1}
                  </div>
                ))}
              </div>

              {/* Syntax highlighted background */}
              <pre
                ref={highlightRef}
                className={styles.syntaxHighlight}
                dangerouslySetInnerHTML={{ __html: highlighted }}
                aria-hidden="true"
              />
              {/* Transparent textarea overlay */}
              <textarea
                ref={textareaRef}
                className={styles.codeEditor}
                value={editableCode}
                onChange={(e) => setEditableCode(e.target.value)}
                onScroll={handleScroll}
                spellCheck={false}
                wrap="off"
                aria-label={`Editable ${snippet.language} code. Current content: ${editableCode.substring(0, 100)}${editableCode.length > 100 ? '...' : ''}`}
                role="textbox"
                aria-multiline="true"
                aria-describedby="editor-instructions"
              />

              {/* Hidden instructions for screen readers */}
              <span id="editor-instructions" className={styles.srOnly}>
                Use Tab to navigate to buttons. The code is editable. Use the Reset button to restore original code.
              </span>
            </div>
          </div>
        </div>
      ) : (
        <pre 
          className={styles.pre}
          role="tabpanel"
          id="code-content"
          aria-labelledby={tabs ? `tab-${selectedTab}` : undefined}
          aria-label={`${snippet.language} code example`}
          tabIndex="0"
        >
          {renderLines()}
          
          {/* Collapse/Expand button */}
          {collapsible && totalLines > initialCollapsedLines && (
            <div className={styles.collapseContainer}>
              <button
                type="button"
                className={styles.collapseButton}
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-expanded={!isCollapsed}
                aria-controls="code-content"
                aria-label={isCollapsed ? 
                  `Show ${totalLines - initialCollapsedLines} more lines of code` : 
                  'Collapse code to show fewer lines'
                }
              >
                {isCollapsed ? (
                  <>Show {totalLines - initialCollapsedLines} more lines ↓</>
                ) : (
                  <>Collapse ↑</>
                )}
              </button>
            </div>
          )}
        </pre>
      )}

      {/* Live region for announcements ----------------------- */}
      <div 
        aria-live="polite" 
        aria-atomic="true"
        className={styles.srOnly}
        role="status"
      >
        {toast}
      </div>

      {/* Visual toast ---------------------------------------- */}
      {toast && <div className={styles.toast} aria-hidden="true">{toast}</div>}
    </div>
  );
} 