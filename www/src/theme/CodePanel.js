import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import Prism from 'prismjs';

import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-javascript'; 
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-sql';

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
  const [selectedLanguage, setSelectedLanguage] = useState(defaultLanguage);
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
    const grammar =
      Prism.languages[snippet.language] ?? Prism.languages.markup;
    setHighlighted(
      Prism.highlight(snippet.code, grammar, snippet.language),
    );
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

          {anno && (
            <span className={styles.marker} data-tooltip={anno.text}>
              ?
            </span>
          )}

          {/* eslint-disable-next-line react/no-danger */}
          <span
            className={styles.codeHtml}
            dangerouslySetInnerHTML={{__html: html || ''}}
          />
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