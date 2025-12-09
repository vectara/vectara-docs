"use strict";
// Global Root component for Docusaurus
// This component wraps every page and allows us to add global UI elements like the chatbot
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Root;
var react_1 = require("react");
var SearchChatIntegration_1 = require("../components/VectaraEnhanced/components/SearchChatIntegration");
var VectaraEnhancedChatbot_1 = require("../components/VectaraEnhanced/components/VectaraEnhancedChatbot");
var vectaraConfig_1 = require("../components/VectaraEnhanced/config/vectaraConfig");
// Get the active Vectara configuration
var VECTARA_CONFIG = (0, vectaraConfig_1.getVectaraConfig)();
function Root(_a) {
    var children = _a.children;
    var handleAnalyticsEvent = function (event) {
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
        console.log('Global Chatbot Event:', event);
    };
    return (<>
      {/* Inject global chatbot styles */}
      <style dangerouslySetInnerHTML={{ __html: VectaraEnhancedChatbot_1.VectaraChatbotStyles + "\n        /* Global chatbot styles */\n        .vectara-global-chatbot {\n          position: fixed;\n          bottom: 0;\n          right: 0;\n          z-index: 2000; /* Higher than navbar */\n        }\n        \n        /* Floating button animation */\n        @keyframes pulse {\n          0% { box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3); }\n          50% { box-shadow: 0 6px 20px rgba(0, 123, 255, 0.5); }\n          100% { box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3); }\n        }\n        \n        .vectara-global-chatbot button[style*=\"position: fixed\"] {\n          animation: pulse 3s infinite;\n        }\n        \n        /* Fade in animation for modal */\n        @keyframes fadeIn {\n          from { opacity: 0; }\n          to { opacity: 1; }\n        }\n        \n        /* Slide up animation for modal */\n        @keyframes slideUp {\n          from { transform: translateY(30px); opacity: 0; }\n          to { transform: translateY(0); opacity: 1; }\n        }\n      " }}/>
      
      {/* Original page content */}
      {children}
      
      {/* Global Vectara Enhanced Chatbot */}
      <div className="vectara-global-chatbot">
        <SearchChatIntegration_1.SearchChatIntegration customerId={VECTARA_CONFIG.customerId} corpusKeys={VECTARA_CONFIG.corpusKeys} apiKey={VECTARA_CONFIG.apiKey} mode="overlay" position="bottom-right" chatTitle="Vectara Docs Assistant" chatDescription="Ask me anything about Vectara documentation" codeGeneration={{
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
            console.log('🔧 Global Chatbot Integration Event:', event, data);
        }} onChatOpen={function () {
            console.log('🚀 Global chatbot opened');
        }} onChatClose={function () {
            console.log('🔄 Global chatbot closed');
        }} onQuerySubmit={function (query) {
            console.log('📝 Global chatbot query:', query);
        }} onCodeGenerated={function (code, language) {
            console.log('💻 Global chatbot code generated:', { language: language, codeLength: code.length });
        }} onError={function (error) {
            console.error('❌ Global chatbot error:', error);
        }}/>
      </div>
    </>);
}
