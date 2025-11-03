// Vectara API Configuration
// Switch between v1 and v2 APIs by changing USE_V2_API

import { VectaraConfig, APIEndpoints, EnhancedParams } from '../types';

export const USE_V2_API = false; // Set to true once you have v2 corpus set up

// V1 API Configuration (current working setup)
export const V1_CONFIG: VectaraConfig = {
  customerId: "1526022105",
  corpusKeys: ["232"],
  apiKey: "zqt_WvU_2ewh7ZGRwq8LdL2SV8B9RJmVGyUm1VAuOw"
};

// V2 API Configuration (update these once you have v2 corpus)
export const V2_CONFIG: VectaraConfig = {
  customerId: "YOUR_V2_CUSTOMER_ID",
  corpusKeys: ["YOUR_V2_CORPUS_ID"], // Note: v2 uses single corpus_key but we keep array for compatibility
  apiKey: "YOUR_V2_API_KEY"
};

// Get the active configuration
export const getVectaraConfig = (): VectaraConfig => {
  return USE_V2_API ? V2_CONFIG : V1_CONFIG;
};

// Enhanced parameters for both APIs
export const ENHANCED_PARAMS: EnhancedParams = {
  lexicalInterpolation: 0.005,
  summarizer: "vectara-summary-ext-24-05-med-omni",
  maxResults: 10,
  contextConfig: {
    sentencesBefore: 2,
    sentencesAfter: 2,
    startTag: "%START_SNIPPET%",
    endTag: "%END_SNIPPET%"
  }
};

// API endpoints
export const API_ENDPOINTS: APIEndpoints = {
  v1: {
    base: "https://api.vectara.io/v1",
    query: "https://api.vectara.io/v1/query"
  },
  v2: {
    base: "https://api.vectara.io/v2",
    query: (corpusId: string) => `https://api.vectara.io/v2/corpora/${corpusId}/query`
  }
};

export const getApiEndpoint = (endpoint: 'query', corpusId?: string): string => {
  if (USE_V2_API) {
    return endpoint === 'query' && corpusId 
      ? API_ENDPOINTS.v2.query(corpusId)
      : API_ENDPOINTS.v2.base;
  }
  return API_ENDPOINTS.v1[endpoint] || API_ENDPOINTS.v1.base;
};