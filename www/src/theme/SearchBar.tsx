// Simplified SearchBar - Opens Chatbot on Click
// Replaced old @vectara/react-search with custom button

import React from 'react';

export default function SearchBar(): JSX.Element {
  const handleClick = () => {
    console.log('🔍 Search bar clicked - opening chatbot');
    const chatEvent = new CustomEvent('openVectaraChat', {
      detail: { source: 'search_click' }
    });
    document.dispatchEvent(chatEvent);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--ifm-color-primary)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--ifm-color-emphasis-300)';
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 12px',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: 'var(--ifm-global-radius)',
        cursor: 'pointer',
        backgroundColor: 'var(--ifm-background-surface-color)',
        transition: 'border-color 0.2s ease',
        minWidth: '200px',
        maxWidth: '400px',
      }}
      title="Click to open AI Assistant"
    >
      {/* Search icon (magnifying glass SVG) */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="currentColor"
        style={{ opacity: 0.5, flexShrink: 0 }}
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg>

      {/* Placeholder text */}
      <span style={{
        color: 'var(--ifm-color-emphasis-600)',
        fontSize: '14px',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      }}>
        Ask the Vectara Docs Assistant...
      </span>
    </div>
  );
}
