// Code Block Component
// Handles code snippet display with interactive parameter customization

import React, { useState, useCallback } from 'react';
import { CodeSnippet } from '../types';
import CodePanel from '../../../theme/CodePanel';

interface CodeBlockProps {
  snippet: CodeSnippet;
  messageId: string;
  onCopy?: (code: string, language: string) => void;
  onParameterUpdate?: (messageId: string, snippetId: string, parameterName: string, value: any) => void;
}

export const CodeBlock: React.FC<CodeBlockProps> = React.memo(({
  snippet,
  messageId,
  onCopy,
  onParameterUpdate
}) => {
  const [isFloatingOpen, setIsFloatingOpen] = useState(false);

  // Convert CodeSnippet to CodePanel format
  const codeSnippets = [{
    language: snippet.language,
    code: snippet.code
  }];

  const openFloatingPanel = useCallback(() => {
    setIsFloatingOpen(true);
  }, []);

  const closeFloatingPanel = useCallback(() => {
    setIsFloatingOpen(false);
  }, []);

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
              width: '80%', // Even wider for better code visibility
              maxWidth: '1000px', // Much larger max width
              minWidth: '600px', // Wider minimum for readability
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

            {/* Parameter customization removed for security - no longer exposing API credentials */}

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
});

CodeBlock.displayName = 'CodeBlock';