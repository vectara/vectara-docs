// Enhanced SearchBar V2 - Test Version for platform/react-chatbot branch
// Uses the enhanced VectaraEnhanced components with intelligent code generation

import React, { useState, useCallback } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { SearchChatIntegration } from '../components/VectaraEnhanced/components/SearchChatIntegration';
import { getVectaraConfig, USE_V2_API } from '../components/VectaraEnhanced/config/vectaraConfig';

// Get the active Vectara configuration (v1 or v2)
const VECTARA_CONFIG = getVectaraConfig();

export default function EnhancedSearchBarV2(): JSX.Element {
  
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchResults = useCallback((results: any[], query: string) => {
    setSearchResults(results);
    setSearchQuery(query);
  }, []);

  const handleAnalyticsEvent = useCallback((event: any) => {
    // Integration with existing analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', event.type, {
        event_category: 'vectara_enhanced_chatbot_v2',
        event_label: event.sessionId,
        search_query: event.searchContext?.originalQuery,
        custom_parameter: event.data
      });
    }
    
    console.log('Enhanced Chatbot V2 Event:', event);
  }, []);

  return (
    <BrowserOnly fallback={<div>Loading Enhanced Search...</div>}>
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
            
            {/* Enhanced chatbot integration - uses configured API version */}
            <SearchChatIntegration
              customerId={VECTARA_CONFIG.customerId}
              corpusKeys={VECTARA_CONFIG.corpusKeys}
              apiKey={VECTARA_CONFIG.apiKey}
              
              mode="overlay"
              position="bottom-right"
              
              title="Vectara AI Assistant"
              description="Ask me anything about Vectara"
              
              codeGeneration={{
                enabled: true,
                supportedLanguages: ['javascript', 'typescript', 'python', 'curl'],
                autoDetect: true,
                defaultParameters: {
                  customerId: VECTARA_CONFIG.customerId,
                  corpusId: VECTARA_CONFIG.corpusKeys[0],
                  apiKey: VECTARA_CONFIG.apiKey
                }
              }}
              
              analytics={{
                enabled: true,
                onEvent: handleAnalyticsEvent
              }}
              
              onIntegrationEvent={(event, data) => {
                console.log('Integration Event V2:', event, data);
              }}
            />
          </>
        );
      }}
    </BrowserOnly>
  );
}