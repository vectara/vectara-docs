"use strict";
// Enhanced SearchBar with Intelligent Code Generation
// Testing version for platform/react-chatbot branch
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchBar;
var react_1 = require("react");
var BrowserOnly_1 = require("@docusaurus/BrowserOnly");
var vectaraConfig_1 = require("../components/VectaraEnhanced/config/vectaraConfig");
// Get the active Vectara configuration (v1 or v2)
var VECTARA_CONFIG = (0, vectaraConfig_1.getVectaraConfig)();
function SearchBar() {
    var _a = (0, react_1.useState)([]), searchResults = _a[0], setSearchResults = _a[1];
    var _b = (0, react_1.useState)(''), searchQuery = _b[0], setSearchQuery = _b[1];
    var _c = (0, react_1.useState)(false), showChatHandoff = _c[0], setShowChatHandoff = _c[1];
    var _d = (0, react_1.useState)(null), lastSearchData = _d[0], setLastSearchData = _d[1];
    var _e = (0, react_1.useState)(0), lastLoggedElements = _e[0], setLastLoggedElements = _e[1];
    // Debug: Log component state
    (0, react_1.useEffect)(function () {
        console.log('SearchBar state:', { showChatHandoff: showChatHandoff, lastSearchData: lastSearchData, searchQuery: searchQuery });
    }, [showChatHandoff, lastSearchData, searchQuery]);
    // Inject minimal CSS styles for search handoff overlay (global chatbot styles handled in Root.tsx)
    (0, react_1.useEffect)(function () {
        if (typeof document !== 'undefined') {
            var styleId = 'vectara-search-handoff-styles';
            var styleElement = document.getElementById(styleId);
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = styleId;
                styleElement.textContent = "\n          /* Search-to-Chat handoff styles */\n          .search-to-chat-handoff-overlay {\n            position: fixed;\n            bottom: 90px;\n            right: 20px;\n            z-index: 10001;\n            background: white;\n            padding: 16px;\n            border-radius: 12px;\n            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);\n            border: 1px solid #e1e5e9;\n            max-width: 300px;\n          }\n          \n          .search-handoff-button {\n            width: 100%;\n            padding: 12px 16px;\n            background: linear-gradient(135deg, #007bff, #0056b3);\n            color: white;\n            border: none;\n            border-radius: 8px;\n            cursor: pointer;\n            font-weight: 600;\n            font-size: 14px;\n            transition: all 0.2s ease;\n          }\n          \n          .search-handoff-button:hover {\n            transform: translateY(-1px);\n            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);\n          }\n        ";
                document.head.appendChild(styleElement);
            }
        }
    }, []);
    // Monitor search activity by watching for search modal changes
    (0, react_1.useEffect)(function () {
        if (typeof document !== 'undefined') {
            var checkForSearchActivity = function () {
                // More comprehensive element detection
                var allElements = document.querySelectorAll('*');
                var searchElements = Array.from(allElements).filter(function (el) {
                    var className = el.className;
                    if (!className)
                        return false;
                    // Handle both string and DOMTokenList
                    var classStr = typeof className === 'string' ? className : className.toString();
                    return (classStr.includes('vrs') ||
                        classStr.includes('search') ||
                        classStr.includes('Search') ||
                        classStr.includes('modal') ||
                        classStr.includes('Modal'));
                });
                // Only log when count changes to avoid spam
                if (searchElements.length !== lastLoggedElements) {
                    setLastLoggedElements(searchElements.length);
                    // Removed noisy debug logs
                }
                // Try to find any search input
                var allInputs = document.querySelectorAll('input');
                var searchInputs = Array.from(allInputs).filter(function (input) {
                    return input.placeholder && (input.placeholder.toLowerCase().includes('search') ||
                        input.placeholder.toLowerCase().includes('query') ||
                        input.type === 'search');
                });
                // Only log search inputs when they have values or are new
                var inputsWithValues = searchInputs.filter(function (input) { return input.value && input.value.trim().length > 0; });
                // Removed noisy debug logs
                // Look for any input with a value that might be a search
                var activeInput = searchInputs.find(function (input) { return input.value && input.value.trim().length > 0; });
                if (activeInput && activeInput.value) {
                    var currentQuery_1 = activeInput.value.trim();
                    if (currentQuery_1 && currentQuery_1 !== searchQuery && currentQuery_1.length > 2) {
                        console.log('✅ New search detected:', currentQuery_1);
                        setSearchQuery(currentQuery_1);
                        setShowChatHandoff(true);
                        // Simple fallback - use the query for now, look for results later
                        setTimeout(function () {
                            // Look for any elements that might contain results
                            var resultElements = document.querySelectorAll('a[href*="docs"], div[class*="result"], div[class*="Result"], li, .search-result, [class*="SearchResult"]');
                            console.log('📊 Potential result elements found:', resultElements.length);
                            var results = Array.from(resultElements).slice(0, 5).map(function (el, index) {
                                var _a, _b;
                                return ({
                                    id: "search_result_".concat(index),
                                    title: ((_a = el.textContent) === null || _a === void 0 ? void 0 : _a.substring(0, 100)) || "Result ".concat(index + 1),
                                    snippet: ((_b = el.textContent) === null || _b === void 0 ? void 0 : _b.substring(0, 200)) || '',
                                    url: el.href || ''
                                });
                            });
                            setLastSearchData({
                                query: currentQuery_1,
                                results: results.length > 0 ? results : [
                                    { id: 'fallback', title: 'Search Results', snippet: "Results for \"".concat(currentQuery_1, "\""), url: '' }
                                ],
                                timestamp: Date.now()
                            });
                            console.log('💾 Captured search data:', { query: currentQuery_1, resultsCount: results.length });
                        }, 2000); // Longer delay to let results load
                    }
                }
                // Also check if any modal disappeared (search closed)
                if (searchInputs.length === 0 && showChatHandoff) {
                    console.log('🚪 No search inputs found, search likely closed');
                    setTimeout(function () { return setShowChatHandoff(false); }, 5000);
                }
            };
            // Check periodically for search activity
            var interval_1 = setInterval(checkForSearchActivity, 500);
            return function () { return clearInterval(interval_1); };
        }
    }, [searchQuery]);
    var handleSearchResults = (0, react_1.useCallback)(function (results, query) {
        setSearchResults(results);
        setSearchQuery(query);
    }, []);
    var handleAnalyticsEvent = (0, react_1.useCallback)(function (event) {
        var _a;
        // Integration with existing analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', event.type, {
                event_category: 'vectara_enhanced_chatbot',
                event_label: event.sessionId,
                search_query: (_a = event.searchContext) === null || _a === void 0 ? void 0 : _a.originalQuery,
                custom_parameter: event.data
            });
        }
        console.log('Enhanced Chatbot Event:', event);
    }, []);
    var handleChatHandoff = (0, react_1.useCallback)(function () {
        console.log('🚀 handleChatHandoff called', { lastSearchData: lastSearchData });
        if (lastSearchData) {
            // Hide the handoff overlay
            setShowChatHandoff(false);
            // Trigger the chat integration with search context
            var chatEvent = new CustomEvent('openVectaraChat', {
                detail: {
                    query: lastSearchData.query,
                    results: lastSearchData.results,
                    source: 'search_handoff'
                }
            });
            console.log('📡 Dispatching openVectaraChat event', chatEvent.detail);
            document.dispatchEvent(chatEvent);
        }
        else {
            console.log('❌ No lastSearchData available');
        }
    }, [lastSearchData]);
    return (<BrowserOnly_1.default fallback={<div>Loading Search...</div>}>
      {function () {
            // Original search functionality (from SearchBar.tsx)
            var ReactSearch = require("@vectara/react-search").ReactSearch;
            var persistToggleSummaryState = function (isSummaryVisible) {
                localStorage.setItem("isSummaryVisible", isSummaryVisible ? "true" : "false");
            };
            var isSummaryToggleInitiallyEnabled = localStorage.getItem("isSummaryVisible");
            return (<>
            {/* Search-to-Chat handoff overlay */}
            {showChatHandoff && lastSearchData && (<div className="search-to-chat-handoff-overlay">
                <div style={{ marginBottom: '12px', fontSize: '14px', color: '#333' }}>
                  <strong>Continue with AI Chat?</strong>
                </div>
                <div style={{ marginBottom: '12px', fontSize: '13px', color: '#666' }}>
                  Get deeper insights about "{lastSearchData.query}" with our AI assistant
                </div>
                <button className="search-handoff-button" onClick={handleChatHandoff}>
                  💬 Ask AI Assistant
                </button>
                <button onClick={function () { return setShowChatHandoff(false); }} style={{
                        marginTop: '8px',
                        width: '100%',
                        padding: '8px',
                        background: 'transparent',
                        border: '1px solid #ddd',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '12px',
                        color: '#666'
                    }}>
                  Maybe later
                </button>
              </div>)}


            {/* Original search bar - always uses v1 API */}
            <ReactSearch key={VECTARA_CONFIG.customerId} customerId={VECTARA_CONFIG.customerId} corpusId={VECTARA_CONFIG.corpusKeys[0]} // Use first corpus key for compatibility
             apiKey={VECTARA_CONFIG.apiKey} onToggleSummary={function (isSummaryVisible) {
                    return persistToggleSummaryState(isSummaryVisible);
                }} isSummaryToggleVisible={true} isSummaryToggleInitiallyEnabled={isSummaryToggleInitiallyEnabled === "true"} rerankingConfiguration={{ rerankerId: 272725719 }}/>
            
            {/*
                  Note: SearchChatIntegration removed from here since we now have a global chatbot in Root.tsx
                  The search detection and handoff functionality remains to communicate with the global chatbot
                */}
          </>);
        }}
    </BrowserOnly_1.default>);
}
