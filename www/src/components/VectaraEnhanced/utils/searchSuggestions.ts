// Search Suggestions Utilities
// Generates intelligent search suggestions based on common queries and user patterns

export const POPULAR_QUERIES = [
  // Getting Started
  "How do I get started with Vectara?",
  "How do I create my first corpus?",
  "What is semantic search?",
  "How do I create an account?",
  "How do I sign up for a Vectara account and start the 30-day free trial?",
  "What should new users explore first in Vectara documentation?",

  // Agents Platform
  "How do I create an agent?",
  "What are Vectara agents?",
  "How do I configure agent settings?",
  "How do I get started with the Agent platform?",
  "How do I use agent tools?",
  "How do I set up agent prompts and instructions?",
  "What are agent conversational workflows?",
  "What are best practices for agents?",
  "How do I create virtual assistants in Vectara that handle multi-step queries?",
  "What is Agentic RAG, and how does the Python SDK support building autonomous agents?",
  "How does intelligent query rewriting work for breaking down complex questions?",
  "What tools and sessions are available in the Agents platform?",
  "What is the difference between conversational assistants and AI agents in Vectara?",
  "How do multi-turn interactions maintain conversation state in Vectara?",
  "How can I build AI agents that search, reason, and take actions?",

  // Core Search & Query
  "How do I upload documents?",
  "How do I perform a query?",
  "How do I query with metadata filters?",
  "What is reranking?",
  "How do I configure reranking?",
  "How do I set up hybrid search?",
  "How do I specify the MMR reranker?",
  "How do I structure document data?",
  "What are corpus keys?",
  "How does hybrid search in Vectara combine semantic and keyword capabilities?",
  "Can Vectara search across documents in 100+ languages simultaneously?",
  "What advanced filtering options are available, like by metadata or recency?",
  "How does Vectara's Factual Consistency Scoring provide confidence ratings for responses?",
  "What are source citations, and how do they link answers to documents?",
  "Why is Vectara's retrieval-first architecture better for reducing hallucinations?",

  // API & Authentication
  "How do I set up API authentication?",
  "How do I create API keys?",
  "Can you provide REST API examples for an advanced query?",
  "What are the API rate limits and quotas?",
  "What are generation presets in Vectara, and how do they group properties for configuring generation requests?",
  "How does the Vectara Prompt Engine work in relation to generation presets?",

  // SDKs & Languages
  "How do I create a corpus using the Python SDK?",
  "What are some Python integration examples?",
  "What are some TypeScript examples?",
  "Can you provide a cURL example of a query?",
  "How do I integrate with Node.js?",

  // Troubleshooting
  "What are common API errors?",
  "How do I debug search results?",
  "How do I get support?",

  // Security & Compliance
  "What are the main benefits of using Vectara for reducing information search time in enterprises?",
  "How does Vectara help deploy production-ready AI in a few days?",
  "What security certifications does Vectara have, like SOC 2 or HIPAA?",
  "What deployment options are available for complete data control?",
  "How can technical teams integrate RAG into applications using Vectara's REST APIs?",
  "What private deployment options does Vectara offer for compliance needs?",
  "Does Vectara train on customer data, and how is data privacy ensured?",
  "What fine-grained access controls does Vectara provide, such as role-based permissions?",
  "How does centralized governance help manage AI agents in Vectara?",

  // Advanced Features
  "How do I get started with Vectara's pre-built components for developers?",
  "What are the key features of the newly launched Vectara Agents platform?",
  "How can I leverage Vectara for generating RFP responses based on enterprise data?",
  "What monitoring tools does Vectara provide for AI agents and observability?",
  "How does Vectara ensure compliance with GDPR and other privacy regulations?",
  "What advantages does Vectara's retrieval-first architecture offer over traditional generative AI?",
  "How do I integrate Vectara with AWS for VPC or private cloud deployments?",
  "What is the step-by-step process for creating a corpus and indexing initial data?",
  "How can I set up audit logging and trails for AI responses in Vectara?",
  "What measures does Vectara take for continuous uptime and high availability?",
  "How do I build AI-driven contract agents that enforce compliance rules using Vectara?",
  "What is Vectara Guardian Agents, and how does it automate oversight for AI governance?",
  "How do I create a virtual assistant that handles complex, multi-step questions using Vectara?",
  "What capabilities do enterprise agents in Vectara have for searching knowledge bases and escalating to humans?",
  "Can you explain how intelligent query rewriting breaks down complex questions into smaller steps?",
  "What are some customer case studies, like Anywhere's centralized RAG command center?",
  "How do I configure OAuth and API keys for secure authentication in Vectara?",
  "What self-managed encryption options are available for data in Vectara?",
  "How does role-based access control (RBAC) and attribute-based access control (ABAC) function in Vectara?",
  "Where can I access the Easy RFP demo and what does it demonstrate?",
  "How can I build a semantic search engine across millions of multilingual documents with Vectara?",
  "How do I use the List Generation Presets API to retrieve available presets filtered by LLM name?",
  "What customizable model parameters, such as temperature and token limits, are included in generation presets?",
  "How do generation presets provide flexibility in setting parameters for query requests?",
  "In the Python SDK, how do I define and use generation presets to customize language model behavior?",
  "How do I create a new AI agent using the Create Agent API in Vectara?",
  "What are agent sessions, and how do I create one for interacting with an agent conversationally?",
  "How can instructions be created and managed to guide the behavior of Vectara agents?",
  "What example agents, such as a web research assistant, are available in the Vectara console?",
  "How do I update an agent's configuration, including instructions and tool settings, via the API?",
  "What key query parameters are required for a simple single corpus query in Vectara?",
  "How does the 'limit' query parameter function in APIs like List Chats or List Documents?",
  "What optional query parameters can be used to filter results in the List Jobs API?",
  "How do query parameters like context length and semantics affect semantic search fundamentals?",
  "How does the User Defined Function Reranker allow custom expressions for scoring results?",
  "What statistical analysis and parameters does Knee Reranking use for adaptive filtering?",
  "How does the Vectara Multilingual Reranker (Slingshot) enhance multilingual search precision?",
  "What is the Maximal Marginal Relevance (MMR) Reranker, and how does it reduce redundancy in results?",
  "What is reranking in Vectara, and how does it refine initial query results for better precision?"
];

export const QUERY_PATTERNS = [
  { pattern: /how (do|can) i/i, suggestions: ["How do I create a corpus?", "How do I create an agent?", "How do I upload documents?", "How can I authenticate?"] },
  { pattern: /what is/i, suggestions: ["What is semantic search?", "What are Vectara agents?", "What is a corpus?", "What is reranking?"] },
  { pattern: /(agent|agents)/i, suggestions: ["How do I create an agent?", "What are Vectara agents?", "Agent platform getting started", "Agent configuration"] },
  { pattern: /(javascript|js)/i, suggestions: ["JavaScript SDK examples", "JavaScript authentication", "JavaScript query examples"] },
  { pattern: /(python|py)/i, suggestions: ["Python SDK setup", "Python examples", "Python authentication"] },
  { pattern: /(typescript|ts)/i, suggestions: ["TypeScript examples", "TypeScript SDK usage", "TypeScript integration"] },
  { pattern: /(api|rest)/i, suggestions: ["API authentication", "API rate limits", "REST API examples", "How to get API keys?"] },
  { pattern: /(upload|ingest|add|index)/i, suggestions: ["Upload documents", "Document ingestion", "How to upload documents?", "Add structured data"] },
  { pattern: /(search|query)/i, suggestions: ["Search examples", "Query with filters", "Hybrid search setup", "How do I perform a query?"] },
  { pattern: /(metadata|filter)/i, suggestions: ["Metadata filtering", "Query with metadata filters", "Document metadata"] },
  { pattern: /(rerank|mmr)/i, suggestions: ["What is reranking?", "Reranking configuration", "How to use MMR?"] },
  { pattern: /(start|begin|getting)/i, suggestions: ["How do I get started with Vectara?", "Agent platform getting started", "How to create an account?"] },
  { pattern: /(error|debug|troubleshoot)/i, suggestions: ["Common API errors", "Debugging search results", "How to get support?"] },
  { pattern: /(stream|streaming)/i, suggestions: ["Streaming responses", "How to stream results?", "Real-time updates"] }
];

export const generateSearchSuggestions = (input: string, limit: number = 5): string[] => {
  if (!input || input.length < 2) {
    return POPULAR_QUERIES.slice(0, limit);
  }

  const suggestions = new Set<string>();
  const lowerInput = input.toLowerCase();

  // Pattern-based suggestions
  for (const { pattern, suggestions: patternSuggestions } of QUERY_PATTERNS) {
    if (pattern.test(input)) {
      patternSuggestions.forEach(s => suggestions.add(s));
    }
  }

  // Fuzzy matching from popular queries
  POPULAR_QUERIES.forEach(query => {
    if (query.toLowerCase().includes(lowerInput) || 
        lowerInput.split(' ').some(word => query.toLowerCase().includes(word))) {
      suggestions.add(query);
    }
  });

  // Keyword-based suggestions
  const keywordSuggestions = getKeywordBasedSuggestions(lowerInput);
  keywordSuggestions.forEach(s => suggestions.add(s));

  return Array.from(suggestions).slice(0, limit);
};

const getKeywordBasedSuggestions = (input: string): string[] => {
  const keywords = {
    'agent': ['How do I create an agent?', 'What are Vectara agents?', 'Agent platform getting started', 'Agent configuration'],
    'corpus': ['How do I create a corpus?', 'What are corpus keys?', 'Corpus management', 'How do I create my first corpus?'],
    'document': ['Document upload', 'How to upload documents?', 'Document structuring', 'Document metadata'],
    'search': ['Search examples', 'What is semantic search?', 'Hybrid search setup', 'How do I perform a query?'],
    'query': ['How do I perform a query?', 'Query with metadata filters', 'Query examples', 'REST API examples'],
    'auth': ['API authentication setup', 'Authentication setup', 'How to get API keys?', 'API keys'],
    'filter': ['Metadata filtering', 'Query with metadata filters', 'Query filters'],
    'rerank': ['What is reranking?', 'Reranking configuration', 'How to use MMR?'],
    'sdk': ['JavaScript SDK usage', 'Python integration examples', 'TypeScript examples', 'SDK usage'],
    'javascript': ['JavaScript SDK examples', 'JavaScript SDK usage', 'Node.js integration', 'JavaScript authentication'],
    'python': ['Python integration examples', 'Python SDK setup', 'Python examples'],
    'typescript': ['TypeScript examples', 'TypeScript SDK usage', 'TypeScript integration'],
    'error': ['Common API errors', 'Troubleshooting', 'Error handling', 'Debugging search results'],
    'rate': ['API rate limits and quotas', 'Rate limits', 'API quotas'],
    'stream': ['Streaming responses', 'Real-time updates', 'Stream handling', 'How to stream results?'],
    'start': ['How do I get started with Vectara?', 'Getting started', 'Agent platform getting started', 'How to create an account?'],
    'mmr': ['How to use MMR?', 'MMR configuration', 'Maximum Marginal Relevance'],
    'scale': ['How to scale to production?', 'Production best practices', 'Performance optimization'],
    'support': ['How to get support?', 'Contact support', 'Help and documentation']
  };

  const suggestions: string[] = [];

  Object.entries(keywords).forEach(([keyword, keywordSuggestions]) => {
    if (input.includes(keyword)) {
      suggestions.push(...keywordSuggestions);
    }
  });

  return suggestions;
};

export const saveRecentQuery = (query: string): void => {
  try {
    const key = 'vectara_recent_queries';
    const stored = localStorage.getItem(key);
    const recent: string[] = stored ? JSON.parse(stored) : [];
    
    // Remove if already exists, then add to front
    const filtered = recent.filter(q => q !== query);
    const updated = [query, ...filtered].slice(0, 20); // Keep last 20
    
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (error) {
    console.warn('Failed to save recent query:', error);
  }
};

export const getRecentQueries = (): string[] => {
  try {
    const key = 'vectara_recent_queries';
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.warn('Failed to load recent queries:', error);
    return [];
  }
};