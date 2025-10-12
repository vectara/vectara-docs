// Global Root component for Docusaurus
// This component wraps every page and allows us to add global UI elements like the chatbot

import React from 'react';
import { SearchChatIntegration } from '../components/VectaraEnhanced/components/SearchChatIntegration';
import { VectaraChatbotStyles } from '../components/VectaraEnhanced/components/VectaraEnhancedChatbot';
import { getVectaraConfig } from '../components/VectaraEnhanced/config/vectaraConfig';

// Get the active Vectara configuration
const VECTARA_CONFIG = getVectaraConfig();

export default function Root({children}: {children: React.ReactNode}): JSX.Element {
  
  const handleAnalyticsEvent = (event: any) => {
    // Integration with existing analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', event.type, {
        event_category: 'vectara_enhanced_chatbot',
        event_label: event.sessionId,
        search_query: event.searchContext?.originalQuery,
        custom_parameter: event.data
      });
    }
    
    console.log('Global Chatbot Event:', event);
  };

  return (
    <>
      {/* Inject global chatbot styles */}
      <style dangerouslySetInnerHTML={{ __html: VectaraChatbotStyles + `
        /* Global chatbot styles */
        .vectara-global-chatbot {
          position: fixed;
          bottom: 0;
          right: 0;
          z-index: 2000; /* Higher than navbar */
        }
        
        /* Floating button animation */
        @keyframes pulse {
          0% { box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3); }
          50% { box-shadow: 0 6px 20px rgba(0, 123, 255, 0.5); }
          100% { box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3); }
        }
        
        .vectara-global-chatbot button[style*="position: fixed"] {
          animation: pulse 3s infinite;
        }
        
        /* Fade in animation for modal */
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Slide up animation for modal */
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}} />
      
      {/* Original page content */}
      {children}
      
      {/* Global Vectara Enhanced Chatbot */}
      <div className="vectara-global-chatbot">
        <SearchChatIntegration
          customerId={VECTARA_CONFIG.customerId}
          corpusKeys={VECTARA_CONFIG.corpusKeys}
          apiKey={VECTARA_CONFIG.apiKey}
          
          mode="overlay"
          position="bottom-right"
          
          chatTitle="Vectara Docs Assistant"
          chatDescription="Ask me anything about Vectara documentation"
          
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
            console.log('🔧 Global Chatbot Integration Event:', event, data);
          }}
          
          onChatOpen={() => {
            console.log('🚀 Global chatbot opened');
          }}
          
          onChatClose={() => {
            console.log('🔄 Global chatbot closed');
          }}
          
          onQuerySubmit={(query) => {
            console.log('📝 Global chatbot query:', query);
          }}
          
          onCodeGenerated={(code, language) => {
            console.log('💻 Global chatbot code generated:', { language, codeLength: code.length });
          }}
          
          onError={(error) => {
            console.error('❌ Global chatbot error:', error);
          }}
        />
      </div>
    </>
  );
}