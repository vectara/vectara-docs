import React, { useState, useEffect } from 'react';
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
  customWidth,
}) {
  /* ---------------------------------------------------------- */
  /* State                                                     */
  /* ---------------------------------------------------------- */
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const firstSnippet = Array.isArray(snippets) && snippets.length ? snippets[0].language : defaultLanguage;
    console.log('Initial selected language:', firstSnippet);
    return firstSnippet;
  });
  const [toast, setToast] = useState(null);
  const [highlighted, setHighlighted] = useState('');

  /* ---------------------------------------------------------- */
  /* Helpers                                                   */
  /* ---------------------------------------------------------- */
  const validSnippets =
    Array.isArray(snippets) && snippets.length
      ? snippets
      : [{ language: defaultLanguage, code: '// No code provided' }];

  const snippet =
    validSnippets.find((s) => s.language === selectedLanguage) ??
    validSnippets[0];

  const annoFor = annotations[selectedLanguage] ?? [];
  console.log('Current selected language:', selectedLanguage, 'Annotations:', annoFor);

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
    const grammar = Prism.languages[snippet.language] ?? Prism.languages.markup;
    const highlightedCode = Prism.highlight(snippet.code, grammar, snippet.language);
    setHighlighted(highlightedCode); // Preserve Prism's HTML with token classes
    console.log('Highlighted code:', highlightedCode);
  }, [snippet]);

  /* Debug rendered DOM */
  useEffect(() => {
    const codeHtmlElements = document.querySelectorAll(`.${styles.codeHtml}`);
    codeHtmlElements.forEach((el, idx) => {
      console.log(`CodeHtml element ${idx} content:`, el.innerHTML);
    });
  }, [highlighted]);

  /* Strip tags when copying an individual line */
  const stripHtml = (h) => h.replace(/<[^>]*>?/gm, '');

  /* Build line-by-line DOM so we can attach markers & numbers */
  const renderLines = () => {
    const originalLines = snippet.code.split('\n');
    const highlightedLines = highlighted.split('\n').map((line) => {
      // Wrap each line in a span to preserve Prism's token classes
      return `<span>${line}</span>`;
    });
    console.log('Original lines count:', originalLines.length);
    console.log('Highlighted lines count:', highlightedLines.length);
    return originalLines.map((_, idx) => {
      const num = idx + 1;
      const html = highlightedLines[idx] || '';
      const anno = annoFor.find((a) => a.line === num);
      console.log(`Line ${num}: anno=${!!anno}, html=${html.substring(0, 20)}...`);
      if (idx >= highlightedLines.length) {
        console.warn('Highlighted lines exhausted at index', idx, 'original:', originalLines[idx]);
      }
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
          <span
            className={styles.codeHtml}
            dangerouslySetInnerHTML={{ __html: html }}
          />
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
      className={clsx(
        styles.codePanel,
        'codePanelScope', // Unique scoping class
        layout === 'stacked' ? styles.stackedLayout : styles.floatingLayout
      )}
      style={panelStyle}
    >
      {/* Header ------------------------------------------------ */}
      <div className={styles.panelHeader}>
        <span className={styles.headerTitle}>{title.toUpperCase()}</span>

        <select
          className={styles.languageSelect}
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
        >
          {validSnippets.map(({ language }) => (
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