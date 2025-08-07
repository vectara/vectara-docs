// Enhanced SearchBar with Intelligent Code Generation
// Testing version for platform/react-chatbot branch

import React, { useState, useCallback, useEffect } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { getVectaraConfig } from '../components/VectaraEnhanced/config/vectaraConfig';

// Get the active Vectara configuration (v1 or v2)
const VECTARA_CONFIG = getVectaraConfig();

export default function SearchBar(): JSX.Element {
  
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showChatHandoff, setShowChatHandoff] = useState(false);
  const [lastSearchData, setLastSearchData] = useState(null);
  const [lastLoggedElements, setLastLoggedElements] = useState(0);

  // Debug: Log component state
  useEffect(() => {
    console.log('SearchBar state:', { showChatHandoff, lastSearchData, searchQuery });
  }, [showChatHandoff, lastSearchData, searchQuery]);

  // Inject minimal CSS styles for search handoff overlay (global chatbot styles handled in Root.tsx)
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const styleId = 'vectara-search-handoff-styles';
      let styleElement = document.getElementById(styleId);
      
      if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = styleId;
        styleElement.textContent = `
          /* Search-to-Chat handoff styles */
          .search-to-chat-handoff-overlay {
            position: fixed;
            bottom: 90px;
            right: 20px;
            z-index: 10001;
            background: white;
            padding: 16px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
            border: 1px solid #e1e5e9;
            max-width: 300px;
          }
          
          .search-handoff-button {
            width: 100%;
            padding: 12px 16px;
            background: linear-gradient(135deg, #007bff, #0056b3);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.2s ease;
          }
          
          .search-handoff-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
          }
        `;
        document.head.appendChild(styleElement);
      }
    }
  }, []);

  // Monitor search activity by watching for search modal changes
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const checkForSearchActivity = () => {
        // More comprehensive element detection
        const allElements = document.querySelectorAll('*');
        const searchElements = Array.from(allElements).filter(el => {
          const className = el.className;
          if (!className) return false;
          
          // Handle both string and DOMTokenList
          const classStr = typeof className === 'string' ? className : className.toString();
          return (
            classStr.includes('vrs') || 
            classStr.includes('search') ||
            classStr.includes('Search') ||
            classStr.includes('modal') ||
            classStr.includes('Modal')
          );
        });
        
        // Only log when count changes to avoid spam
        if (searchElements.length !== lastLoggedElements) {
          setLastLoggedElements(searchElements.length);
          // Removed noisy debug logs
        }
        
        // Try to find any search input
        const allInputs = document.querySelectorAll('input');
        const searchInputs = Array.from(allInputs).filter(input => 
          input.placeholder && (
            input.placeholder.toLowerCase().includes('search') ||
            input.placeholder.toLowerCase().includes('query') ||
            input.type === 'search'
          )
        );
        
        // Only log search inputs when they have values or are new
        const inputsWithValues = searchInputs.filter(input => input.value && input.value.trim().length > 0);
        // Removed noisy debug logs
        
        // Look for any input with a value that might be a search
        const activeInput = searchInputs.find(input => input.value && input.value.trim().length > 0);
        
        if (activeInput && activeInput.value) {
          const currentQuery = activeInput.value.trim();
          if (currentQuery && currentQuery !== searchQuery && currentQuery.length > 2) {
            console.log('✅ New search detected:', currentQuery);
            setSearchQuery(currentQuery);
            setShowChatHandoff(true);
            
            // Simple fallback - use the query for now, look for results later
            setTimeout(() => {
              // Look for any elements that might contain results
              const resultElements = document.querySelectorAll('a[href*="docs"], div[class*="result"], div[class*="Result"], li, .search-result, [class*="SearchResult"]');
              console.log('📊 Potential result elements found:', resultElements.length);
              
              const results = Array.from(resultElements).slice(0, 5).map((el, index) => ({
                id: `search_result_${index}`,
                title: el.textContent?.substring(0, 100) || `Result ${index + 1}`,
                snippet: el.textContent?.substring(0, 200) || '',
                url: (el as HTMLAnchorElement).href || ''
              }));
              
              setLastSearchData({
                query: currentQuery,
                results: results.length > 0 ? results : [
                  { id: 'fallback', title: 'Search Results', snippet: `Results for "${currentQuery}"`, url: '' }
                ],
                timestamp: Date.now()
              });
              
              console.log('💾 Captured search data:', { query: currentQuery, resultsCount: results.length });
            }, 2000); // Longer delay to let results load
          }
        }
        
        // Also check if any modal disappeared (search closed)
        if (searchInputs.length === 0 && showChatHandoff) {
          console.log('🚪 No search inputs found, search likely closed');
          setTimeout(() => setShowChatHandoff(false), 5000);
        }
      };

      // Check periodically for search activity
      const interval = setInterval(checkForSearchActivity, 500);
      return () => clearInterval(interval);
    }
  }, [searchQuery]);

  const handleSearchResults = useCallback((results: any[], query: string) => {
    setSearchResults(results);
    setSearchQuery(query);
  }, []);

  const handleAnalyticsEvent = useCallback((event: any) => {
    // Integration with existing analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', event.type, {
        event_category: 'vectara_enhanced_chatbot',
        event_label: event.sessionId,
        search_query: event.searchContext?.originalQuery,
        custom_parameter: event.data
      });
    }
    
    console.log('Enhanced Chatbot Event:', event);
  }, []);

  const handleChatHandoff = useCallback(() => {
    console.log('🚀 handleChatHandoff called', { lastSearchData });
    if (lastSearchData) {
      // Hide the handoff overlay
      setShowChatHandoff(false);
      
      // Trigger the chat integration with search context
      const chatEvent = new CustomEvent('openVectaraChat', {
        detail: {
          query: lastSearchData.query,
          results: lastSearchData.results,
          source: 'search_handoff'
        }
      });
      console.log('📡 Dispatching openVectaraChat event', chatEvent.detail);
      document.dispatchEvent(chatEvent);
    } else {
      console.log('❌ No lastSearchData available');
    }
  }, [lastSearchData]);

  return (
    <BrowserOnly fallback={<div>Loading Search...</div>}>
      {() => {
        // Original search functionality (from SearchBar.tsx)
        const ReactSearch = require("@vectara/react-search").ReactSearch;

        const persistToggleSummaryState = (isSummaryVisible) => {
          localStorage.setItem(
            "isSummaryVisible",
            isSummaryVisible ? "true" : "false"
          );
        };

        const isSummaryToggleInitiallyEnabled =
          localStorage.getItem("isSummaryVisible");

        return (
          <>
            {/* Search-to-Chat handoff overlay */}
            {showChatHandoff && lastSearchData && (
              <div className="search-to-chat-handoff-overlay">
                <div style={{ marginBottom: '12px', fontSize: '14px', color: '#333' }}>
                  <strong>Continue with AI Chat?</strong>
                </div>
                <div style={{ marginBottom: '12px', fontSize: '13px', color: '#666' }}>
                  Get deeper insights about "{lastSearchData.query}" with our AI assistant
                </div>
                <button 
                  className="search-handoff-button"
                  onClick={handleChatHandoff}
                >
                  💬 Ask AI Assistant
                </button>
                <button 
                  onClick={() => setShowChatHandoff(false)}
                  style={{
                    marginTop: '8px',
                    width: '100%',
                    padding: '8px',
                    background: 'transparent',
                    border: '1px solid #ddd',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '12px',
                    color: '#666'
                  }}
                >
                  Maybe later
                </button>
              </div>
            )}


            {/* Original search bar - always uses v1 API */}
            <ReactSearch
              key={VECTARA_CONFIG.customerId}
              customerId={VECTARA_CONFIG.customerId}
              corpusId={VECTARA_CONFIG.corpusKeys[0]}  // Use first corpus key for compatibility
              apiKey={VECTARA_CONFIG.apiKey}
              onToggleSummary={(isSummaryVisible) =>
                persistToggleSummaryState(isSummaryVisible)
              }
              isSummaryToggleVisible={true}
              isSummaryToggleInitiallyEnabled={
                isSummaryToggleInitiallyEnabled === "true"
              }
              rerankingConfiguration={{ rerankerId: 272725719 }}
            />
            
            {/* 
              Note: SearchChatIntegration removed from here since we now have a global chatbot in Root.tsx
              The search detection and handoff functionality remains to communicate with the global chatbot
            */}
          </>
        );
      }}
    </BrowserOnly>
  );
}