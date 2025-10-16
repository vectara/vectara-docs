"use strict";
// Enhanced SearchBar V2 - Test Version for platform/react-chatbot branch
// Uses the enhanced VectaraEnhanced components with intelligent code generation
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EnhancedSearchBarV2;
var react_1 = require("react");
var BrowserOnly_1 = require("@docusaurus/BrowserOnly");
var SearchChatIntegration_1 = require("../components/VectaraEnhanced/components/SearchChatIntegration");
var vectaraConfig_1 = require("../components/VectaraEnhanced/config/vectaraConfig");
// Get the active Vectara configuration (v1 or v2)
var VECTARA_CONFIG = (0, vectaraConfig_1.getVectaraConfig)();
function EnhancedSearchBarV2() {
    var _a = (0, react_1.useState)([]), searchResults = _a[0], setSearchResults = _a[1];
    var _b = (0, react_1.useState)(''), searchQuery = _b[0], setSearchQuery = _b[1];
    var handleSearchResults = (0, react_1.useCallback)(function (results, query) {
        setSearchResults(results);
        setSearchQuery(query);
    }, []);
    var handleAnalyticsEvent = (0, react_1.useCallback)(function (event) {
        var _a;
        // Integration with existing analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', event.type, {
                event_category: 'vectara_enhanced_chatbot_v2',
                event_label: event.sessionId,
                search_query: (_a = event.searchContext) === null || _a === void 0 ? void 0 : _a.originalQuery,
                custom_parameter: event.data
            });
        }
        console.log('Enhanced Chatbot V2 Event:', event);
    }, []);
    return (<BrowserOnly_1.default fallback={<div>Loading Enhanced Search...</div>}>
      {function () {
            // Original search functionality (from SearchBar.tsx)
            var ReactSearch = require("@vectara/react-search").ReactSearch;
            var persistToggleSummaryState = function (isSummaryVisible) {
                localStorage.setItem("isSummaryVisible", isSummaryVisible ? "true" : "false");
            };
            var isSummaryToggleInitiallyEnabled = localStorage.getItem("isSummaryVisible");
            return (<>
            {/* Original search bar - always uses v1 API */}
            <ReactSearch key={VECTARA_CONFIG.customerId} customerId={VECTARA_CONFIG.customerId} corpusId={VECTARA_CONFIG.corpusKeys[0]} // Use first corpus key for compatibility
             apiKey={VECTARA_CONFIG.apiKey} onToggleSummary={function (isSummaryVisible) {
                    return persistToggleSummaryState(isSummaryVisible);
                }} isSummaryToggleVisible={true} isSummaryToggleInitiallyEnabled={isSummaryToggleInitiallyEnabled === "true"} rerankingConfiguration={{ rerankerId: 272725719 }}/>
            
            {/* Enhanced chatbot integration - uses configured API version */}
            <SearchChatIntegration_1.SearchChatIntegration customerId={VECTARA_CONFIG.customerId} corpusKeys={VECTARA_CONFIG.corpusKeys} apiKey={VECTARA_CONFIG.apiKey} mode="overlay" position="bottom-right" title="Vectara AI Assistant" description="Ask me anything about Vectara" codeGeneration={{
                    enabled: true,
                    supportedLanguages: ['javascript', 'typescript', 'python', 'curl'],
                    autoDetect: true,
                    defaultParameters: {
                        customerId: VECTARA_CONFIG.customerId,
                        corpusId: VECTARA_CONFIG.corpusKeys[0],
                        apiKey: VECTARA_CONFIG.apiKey
                    }
                }} analytics={{
                    enabled: true,
                    onEvent: handleAnalyticsEvent
                }} onIntegrationEvent={function (event, data) {
                    console.log('Integration Event V2:', event, data);
                }}/>
          </>);
        }}
    </BrowserOnly_1.default>);
}
