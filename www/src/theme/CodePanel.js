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
  customWidth // New prop for manual width override
}) {
  /* ---------------------------------------------------------- */
  /* State                                                     */
  /* ---------------------------------------------------------- */
  const [selectedLanguage, setSelectedLanguage] = useState(
  snippets[0]?.language || defaultLanguage
  );

  const [toast, setToast] = useState(null);
  const [highlighted, setHighlighted] = useState('');

  /* ---------------------------------------------------------- */
  /* Helpers                                                   */
  /* ---------------------------------------------------------- */
  const validSnippets =
    Array.isArray(snippets) && snippets.length
      ? snippets
      : [{language: defaultLanguage, code: '// No code provided'}];

  const snippet =
    validSnippets.find((s) => s.language === selectedLanguage) ??
    validSnippets[0];

  const annoFor = annotations[selectedLanguage] ?? [];

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(snippet.code.trim());
    showToast('Copied!');
  };

  const copyLine = (line) => {
    navigator.clipboard.writeText(line.trim());
    showToast('Line copied');
  };

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
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python'
    };
    
    const normalizedLanguage = languageMap[snippet.language] || snippet.language;
    
    const grammar = Prism.languages[normalizedLanguage] || Prism.languages.markup;
    
    try {
      const result = Prism.highlight(snippet.code, grammar, normalizedLanguage);
      setHighlighted(result);
    } catch (error) {
      console.warn('Syntax highlighting failed:', error);
      // Fallback to plain text if highlighting fails
      setHighlighted(snippet.code);
    }
  }, [snippet]);

  /* Strip tags when copying an individual line */
  const stripHtml = (h) => h.replace(/<[^>]*>?/gm, '');

  /* Build line-by-line DOM so we can attach markers & numbers */

  const renderLines = () =>
    highlighted.split('\n').map((html, idx) => {
      const num = idx + 1;
      const anno = annoFor.find((a) => a.line === num);

      return (
        <div
          key={num}
          className={styles.codeLine}
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

  /* ---------------------------------------------------------- */
  /* Render                                                    */
  /* ---------------------------------------------------------- */
  const panelStyle = layout === 'floating' && customWidth ? { width: customWidth, maxWidth: customWidth } : {};

  return (
    <div 
      className={`${styles.codePanel} ${layout === 'stacked' ? styles.stackedLayout : styles.floatingLayout}`}
      style={panelStyle} // Apply inline style for customWidth
    >
      {/* Header ------------------------------------------------ */}
      <div className={styles.panelHeader}>
        <span className={styles.headerTitle}>{title.toUpperCase()}</span>

        <select
          className={styles.languageSelect}
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {validSnippets.map(({language}) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={copyAll}
          className={styles.iconButton}
          aria-label="Copy entire snippet"
        >
          📋
        </button>
      </div>

      {/* Code body -------------------------------------------- */}
      <pre className={styles.pre}>{renderLines()}</pre>

      {/* Toast ------------------------------------------------ */}
      {toast && <div className={styles.toast}>{toast}</div>}
    </div>
  );
} 