// Search Suggestions Utilities
// Generates intelligent search suggestions based on common queries and user patterns

export const POPULAR_QUERIES = [
  "How do I create a corpus?",
  "What is semantic search?",
  "How to upload documents?",
  "API authentication setup",
  "Query with metadata filters",
  "Reranking configuration",
  "Document data structuring",
  "Streaming responses",
  "JavaScript SDK usage",
  "Python integration examples",
  "Rate limits and quotas",
  "Hybrid search setup"
];

export const QUERY_PATTERNS = [
  { pattern: /how (do|can) i/i, suggestions: ["How do I create a corpus?", "How do I upload documents?", "How can I authenticate?"] },
  { pattern: /what is/i, suggestions: ["What is semantic search?", "What is a corpus?", "What is reranking?"] },
  { pattern: /(javascript|js)/i, suggestions: ["JavaScript SDK examples", "JavaScript authentication", "JavaScript query examples"] },
  { pattern: /(python|py)/i, suggestions: ["Python SDK setup", "Python examples", "Python authentication"] },
  { pattern: /(api|rest)/i, suggestions: ["API authentication", "API rate limits", "REST API examples"] },
  { pattern: /(upload|ingest|add)/i, suggestions: ["Upload documents", "Document ingestion", "Add structured data"] },
  { pattern: /(search|query)/i, suggestions: ["Search examples", "Query with filters", "Hybrid search setup"] },
  { pattern: /(metadata|filter)/i, suggestions: ["Metadata filtering", "Query with metadata", "Document metadata"] }
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
    'corpus': ['How do I create a corpus?', 'Corpus management', 'Multiple corpora setup'],
    'document': ['Document upload', 'Document structuring', 'Document metadata'],
    'search': ['Search examples', 'Semantic search', 'Hybrid search'],
    'auth': ['API authentication', 'Authentication setup', 'API keys'],
    'filter': ['Metadata filtering', 'Query filters', 'Search filters'],
    'code': ['Code examples', 'SDK usage', 'Implementation guide'],
    'error': ['Common errors', 'Troubleshooting', 'Error handling'],
    'rate': ['Rate limits', 'API quotas', 'Usage limits'],
    'stream': ['Streaming responses', 'Real-time updates', 'Stream handling']
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