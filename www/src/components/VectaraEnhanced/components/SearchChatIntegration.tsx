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
  const [isFullscreen, setIsFullscreen] = useState(true); // Always start in fullscreen
  const [chatContext, setChatContext] = useState<{
    query?: string;
    results?: SearchResult[];
  }>({});
  
  
  const chatRef = useRef<HTMLDivElement>(null);

  // Listen for search-to-chat handoff events
  useEffect(() => {
    const handleChatHandoff = (event: CustomEvent) => {
      const { query, results, source } = event.detail;
      
      console.log('✅ Chat handoff received:', { query, results, source });
      
      // Set up chat with search context
      setChatContext({ query, results });
      setIsOpen(true);
      onChatOpen?.();
      
      onIntegrationEvent?.('search_to_chat_handoff', {
        query,
        resultsCount: results?.length || 0,
        source,
        timestamp: Date.now()
      });
    };

    console.log('🎧 Setting up event listener for openVectaraChat');
    document.addEventListener('openVectaraChat', handleChatHandoff as EventListener);
    return () => {
      console.log('🗑️ Removing event listener for openVectaraChat');
      document.removeEventListener('openVectaraChat', handleChatHandoff as EventListener);
    };
  }, [onChatOpen, onIntegrationEvent]);

  // Debug: Log component state
  useEffect(() => {
    console.log('SearchChatIntegration state:', { isOpen, isFullscreen, chatContext });
  }, [isOpen, isFullscreen, chatContext]);

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

  // Handle chat close - preserves context for potential resume
  const handleChatClose = useCallback(() => {
    setIsOpen(false);
    // Note: We keep chatContext intact so conversation can resume if modal reopens
    // To fully reset: setChatContext({});
    onChatClose?.();

    onIntegrationEvent?.('chat_closed', {
      timestamp: Date.now(),
      contextPreserved: true
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

  // Note: Removed click-outside-to-close behavior to prevent accidental conversation loss
  // Users must explicitly click the X button to close the modal

  // Position styles - always fullscreen modal positioned like ReactSearch
  const getPositionStyles = useCallback(() => {
    if (mode === 'embedded') return {};

    // Always use fullscreen modal positioning
    return {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      zIndex: 1050,
      pointerEvents: 'none' as const
    };
  }, [mode]);

  // Floating chat button for overlay mode
  const FloatingChatButton = () => {
    if (mode !== 'overlay' || isOpen) {
      return null;
    }

    return (
      <button
        onClick={() => {
          console.log('💬 Chat button clicked - opening in fullscreen');
          setIsOpen(true);
          onChatOpen?.();
        }}
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
          zIndex: 1000
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

  // Chat component with enhanced context - always fullscreen
  const ChatComponent = () => {
    if (!isOpen && mode === 'overlay') return null;

    const contextualTitle = chatContext.query 
      ? `${chatTitle} - "${chatContext.query}"`
      : chatTitle;

    const contextualDescription = chatContext.query
      ? `I can help you explore "${chatContext.query}" further. Ask me follow-up questions or request more details!`
      : chatDescription;

    // Always render in fullscreen mode (search-like modal)
    return (
      <div
        style={getPositionStyles()}
      >
        <div
          ref={chatRef}
          className={`vectara-search-chat-integration fullscreen-modal ${className}`}
          style={{
            marginTop: '3vh',
            backgroundColor: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '1100px',
            maxHeight: '92vh',
            pointerEvents: 'all',
            boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
            borderRadius: '8px',
            overflow: 'hidden',
            ...style
          }}
        >
          {/* Search context display */}
          {showSearchContext && chatContext.query && (
            <div style={{
              padding: '12px 16px',
              backgroundColor: '#e8f5e8',
              borderBottom: '1px solid #c8e6c9',
              fontSize: '13px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px', marginRight: '6px' }}>🔍</span>  
                <strong style={{ color: '#2e7d32' }}>Search Context</strong>
              </div>
              <div style={{ color: '#1b5e20' }}>
                "{chatContext.query}"
              </div>
              {chatContext.results && (
                <div style={{ color: '#4caf50', fontSize: '12px', marginTop: '4px' }}>
                  Found {chatContext.results.length} relevant result{chatContext.results.length === 1 ? '' : 's'}
                </div>
              )}
            </div>
          )}

          <VectaraEnhancedChatbot
            key={`vectara-chat-${customerId}-${corpusKeys.join('-')}`}
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
            showFullscreenToggle={false} // No toggle needed - always fullscreen
            isFullscreen={true}
            onToggleFullscreen={undefined}
            onClose={handleChatClose}
          />
        </div>
      </div>
    );
  };

  return (
    <>
      <FloatingChatButton />
      {/* Modal backdrop - non-dismissive to prevent accidental conversation loss */}
      {isOpen && mode === 'overlay' && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 1040,
            animation: 'fadeIn 0.3s ease'
          }}
          // Note: Removed onClick={handleChatClose} - users must click X button to close
        />
      )}
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