// Search Chat Integration Component
// Provides seamless integration between search results and AI chat

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { VectaraEnhancedChatbot } from './VectaraEnhancedChatbot';
import { SearchChatIntegrationProps, SearchResult } from '../types';
import { USE_V2_API } from '../config/vectaraConfig';

interface SearchToChatHandoffProps {
  searchQuery: string;
  searchResults: SearchResult[];
  onHandoff: (query: string, results: SearchResult[]) => void;
  handoffText?: string;
  className?: string;
}

// Component for the "Ask AI" handoff button in search results
export const SearchToChatHandoff: React.FC<SearchToChatHandoffProps> = ({
  searchQuery,
  searchResults,
  onHandoff,
  handoffText = "💬 Ask AI about this",
  className = ""
}) => {
  const handleHandoff = useCallback(() => {
    onHandoff(searchQuery, searchResults);
  }, [searchQuery, searchResults, onHandoff]);

  if (!searchQuery || !searchResults?.length) {
    return null;
  }

  return (
    <div className={`search-to-chat-handoff ${className}`}>
      <div style={{
        padding: '12px',
        backgroundColor: '#f8f9fa',
        border: '1px solid #e9ecef',
        borderRadius: '8px',
        margin: '8px 0',
        textAlign: 'center'
      }}>
        <p style={{
          margin: '0 0 8px 0',
          fontSize: '14px',
          color: '#6c757d'
        }}>
          Need more help with "{searchQuery}"?
        </p>
        <button
          onClick={handleHandoff}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '600',
            transition: 'background-color 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          {handoffText}
        </button>
      </div>
    </div>
  );
};

// Main integration component
export const SearchChatIntegration: React.FC<SearchChatIntegrationProps> = ({
  customerId,
  corpusKeys,
  apiKey,
  searchResults,
  searchQuery,
  onSearchToChat,
  chatTitle = "AI Assistant",
  chatDescription = "Ask me anything about your search",
  showSearchContext = true,
  searchChatHandoffText = "💬 Ask AI about this",
  mode = "overlay",
  position = "bottom-right",
  className = "",
  style = {},
  onChatOpen,
  onChatClose,
  onIntegrationEvent,
  codeGeneration,
  analytics,
  enableStreaming,
  onQuerySubmit,
  onCodeGenerated,
  onError
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatContext, setChatContext] = useState<{
    query?: string;
    results?: SearchResult[];
  }>({});
  
  const chatRef = useRef<HTMLDivElement>(null);

  // Handle search to chat handoff
  const handleSearchToChat = useCallback((query: string, results?: SearchResult[]) => {
    setChatContext({ query, results });
    setIsOpen(true);
    onChatOpen?.();
    
    onIntegrationEvent?.('search_to_chat_handoff', {
      query,
      resultsCount: results?.length || 0,
      timestamp: Date.now()
    });
  }, [onChatOpen, onIntegrationEvent]);

  // Handle chat close
  const handleChatClose = useCallback(() => {
    setIsOpen(false);
    setChatContext({});
    onChatClose?.();
    
    onIntegrationEvent?.('chat_closed', {
      timestamp: Date.now()
    });
  }, [onChatClose, onIntegrationEvent]);

  // Enhanced query submission with context
  const handleQuerySubmit = useCallback((query: string) => {
    onQuerySubmit?.(query);
    
    onIntegrationEvent?.('chat_query', {
      query,
      hasContext: !!chatContext.query,
      originalQuery: chatContext.query,
      timestamp: Date.now()
    });
  }, [onQuerySubmit, onIntegrationEvent, chatContext]);

  // Handle clicks outside chat (for overlay mode)
  useEffect(() => {
    if (mode === 'overlay' && isOpen) {
      const handleClickOutside = (event: MouseEvent) => {
        if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
          handleChatClose();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [mode, isOpen, handleChatClose]);

  // Position styles for overlay mode
  const getPositionStyles = () => {
    if (mode !== 'overlay') return {};

    const baseStyles = {
      position: 'fixed' as const,
      zIndex: 1000,
      width: '400px',
      height: '600px',
      maxWidth: '90vw',
      maxHeight: '80vh'
    };

    switch (position) {
      case 'bottom-right':
        return { ...baseStyles, bottom: '20px', right: '20px' };
      case 'bottom-left':
        return { ...baseStyles, bottom: '20px', left: '20px' };
      case 'top-right':
        return { ...baseStyles, top: '20px', right: '20px' };
      case 'top-left':
        return { ...baseStyles, top: '20px', left: '20px' };
      case 'center':
        return {
          ...baseStyles,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
      default:
        return { ...baseStyles, bottom: '20px', right: '20px' };
    }
  };

  // Floating chat button for overlay mode
  const FloatingChatButton = () => {
    if (mode !== 'overlay' || isOpen) return null;

    return (
      <button
        onClick={() => handleSearchToChat(searchQuery || 'Ask me anything', searchResults)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)',
          transition: 'all 0.3s ease',
          zIndex: 999
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = '#0056b3';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = '#007bff';
          e.currentTarget.style.transform = 'scale(1)';
        }}
        title="Open AI Assistant"
      >
        💬
      </button>
    );
  };

  // Chat component with enhanced context
  const ChatComponent = () => {
    if (!isOpen && mode === 'overlay') return null;

    const contextualTitle = chatContext.query 
      ? `${chatTitle} - "${chatContext.query}"`
      : chatTitle;

    const contextualDescription = chatContext.query
      ? `Continuing from your search: "${chatContext.query}"`
      : chatDescription;

    return (
      <div
        ref={chatRef}
        className={`vectara-search-chat-integration ${className}`}
        style={{
          ...getPositionStyles(),
          ...style,
          ...(mode === 'overlay' && {
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
            borderRadius: '12px',
            overflow: 'hidden'
          })
        }}
      >
        {/* Close button for overlay mode */}
        {mode === 'overlay' && (
          <button
            onClick={handleChatClose}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              background: 'rgba(0, 0, 0, 0.1)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontSize: '16px',
              zIndex: 1001,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            title="Close chat"
          >
            ✕
          </button>
        )}

        {/* Search context display */}
        {showSearchContext && chatContext.query && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#e3f2fd',
            borderBottom: '1px solid #bbdefb',
            fontSize: '14px'
          }}>
            <strong>Context:</strong> {chatContext.query}
            {chatContext.results && (
              <span style={{ color: '#666', marginLeft: '8px' }}>
                ({chatContext.results.length} results)
              </span>
            )}
          </div>
        )}

        <VectaraEnhancedChatbot
          customerId={customerId}
          corpusKeys={corpusKeys}
          apiKey={apiKey}
          title={contextualTitle}
          description={contextualDescription}
          codeGeneration={codeGeneration}
          analytics={{
            ...analytics,
            onEvent: (event) => {
              analytics?.onEvent?.(event);
              onIntegrationEvent?.('chat_event', event);
            }
          }}
          enableStreaming={enableStreaming}
          onQuerySubmit={handleQuerySubmit}
          onCodeGenerated={onCodeGenerated}
          onError={onError}
          style={{ height: '100%' }}
        />
      </div>
    );
  };

  return (
    <>
      <FloatingChatButton />
      <ChatComponent />
    </>
  );
};

// Utility hook for search-chat integration
export const useSearchChatIntegration = (
  onIntegrationEvent?: (event: string, data: any) => void
) => {
  const [chatState, setChatState] = useState({
    isOpen: false,
    context: null as { query?: string; results?: SearchResult[] } | null
  });

  const openChatWithContext = useCallback((query: string, results?: SearchResult[]) => {
    setChatState({
      isOpen: true,
      context: { query, results }
    });
    
    onIntegrationEvent?.('chat_opened_with_context', {
      query,
      resultsCount: results?.length || 0,
      timestamp: Date.now()
    });
  }, [onIntegrationEvent]);

  const closeChat = useCallback(() => {
    setChatState({
      isOpen: false,
      context: null
    });
    
    onIntegrationEvent?.('chat_closed', {
      timestamp: Date.now()
    });
  }, [onIntegrationEvent]);

  return {
    chatState,
    openChatWithContext,
    closeChat
  };
};