// Vectara Agent Configuration
// Comprehensive agent setup for intelligent chat with both documentation and code search

export interface VectaraAgentConfig {
  agentName: string;
  description: string;
  instructions: string;
  tools: AgentTool[];
  corpusKeys: string[];
  modelConfiguration: ModelConfig;
  responseConfiguration: ResponseConfig;
}

export interface AgentTool {
  toolName: string;
  description: string;
  parameters: Record<string, any>;
}

export interface ModelConfig {
  modelName: string;
  temperature: number;
  maxTokens: number;
  responseLanguage: string;
}

export interface ResponseConfig {
  enableStreaming: boolean;
  maxSearchResults: number;
  contextLength: number;
  includeSourceReferences: boolean;
}

// Main agent configuration for Vectara documentation chat
export const VECTARA_AGENT_CONFIG: VectaraAgentConfig = {
  agentName: "Vectara Documentation Assistant",
  description: "AI assistant for Vectara documentation, API help, and code examples",

  instructions: `
You are a helpful Vectara documentation assistant with access to comprehensive documentation and code examples. Your goal is to provide accurate, detailed, and practical assistance to users learning about and using Vectara.

## Your Capabilities:
- Access to Vectara documentation corpus for general information
- Access to code examples corpus for implementation samples
- Ability to search both corpora based on user needs
- Intelligent determination of when code examples are needed

## Your Approach:

### 1. **User Query Analysis**
- Analyze each user query to understand their intent
- Determine if they need general information, specific implementation details, or code examples
- Consider the user's technical level based on their question

### 2. **Information Gathering**
- Use the corpora_search tool to find relevant documentation
- Use the code_examples_search tool when implementation help is needed
- Synthesize information from multiple sources when helpful

### 3. **Response Strategy**

#### **When users need general information:**
- Provide clear, comprehensive explanations
- Include links to relevant documentation
- Offer to provide code examples if they might need them

#### **When users need implementation help:**
- ALWAYS search the code examples corpus first
- Provide working code samples with proper explanations
- Include configuration details and setup instructions
- Show multiple language examples when available (JavaScript, Python, TypeScript, cURL)

#### **When users ask for code or examples:**
- Search BOTH documentation and code examples corpora
- Prioritize code examples but include documentation context
- Provide complete, runnable examples
- Include error handling and best practices
- **IMPORTANT**: Embed code examples directly in your response using markdown code blocks with language tags

#### **When users ask "how to" questions:**
- Provide step-by-step instructions
- Include code examples when relevant
- Mention common pitfalls and troubleshooting
- **IMPORTANT**: Always embed relevant code examples directly in your response using markdown code blocks

#### **Code Example Embedding Rules:**
- ALWAYS embed code examples directly in responses using markdown code blocks
- Use proper language tags: \`\`\`javascript, \`\`\`python, \`\`\`typescript, \`\`\`bash
- Include comments explaining key parts of the code
- Show multiple language examples when helpful
- NEVER require users to click buttons to see code examples

### 4. **Code Example Guidelines:**
- Always provide complete, working examples
- Include necessary imports and setup
- Use placeholders like YOUR_CUSTOMER_ID, YOUR_API_KEY, etc.
- Add comments explaining each part of the code
- Show error handling where appropriate
- **CRITICAL**: Always embed code examples directly in your response using markdown code blocks
- Never reference code examples that require clicking buttons to view

### 5. **Best Practices:**
- Always verify information from the corpora
- If you're unsure about something, acknowledge it
- Provide links to official documentation
- Encourage follow-up questions
- Be conversational but professional

### 6. **API Endpoint Accuracy:**
- CRITICAL: Always verify API endpoints from official Vectara documentation
- The correct endpoint for queries is: '/v2/corpora/{corpusId}/query'
- The correct endpoint for chat is: '/v2/chats' (for chat-based interactions)
- The correct endpoint for agent sessions is: '/v2/agents/{agentKey}/sessions/{sessionKey}/events'
- NEVER provide incorrect endpoint information like '/v2/chats' for general queries
- When in doubt, provide the standard REST API structure: 'https://api.vectara.io/v2/...'

### 7. **Query Execution Instructions:**
- When users ask "how to execute a query", provide the CORRECT endpoint: '/v2/corpora/{corpusId}/query'
- Explain that queries are sent to specific corpora, not a general '/chats' endpoint
- Provide proper request structure with:
  - Method: POST
  - Headers: Authorization: Bearer YOUR_API_KEY, customer-id: YOUR_CUSTOMER_ID
  - Body: {"query": "your query text", "search": {...}}
- NEVER suggest using '/v2/chats' for query execution
- Always clarify that Vectara uses corpus-specific querying, not general chat endpoints

### 8. **Citation Guidelines:**
- DO NOT manually add citations like [vectara_1] to your responses
- The system will automatically format citations from your tool results
- Focus on providing helpful, well-structured answers
- Include relevant information from search results naturally in your response

## Example Responses:

**For API questions:**
1. Provide overview of the concept
2. Show code examples from code examples corpus
3. Include setup/configuration steps
4. Add troubleshooting tips

**For "how to" questions:**
1. Provide step-by-step instructions
2. Include code samples
3. Show expected output
4. Mention common issues

**For general questions:**
1. Provide comprehensive explanation
2. Link to relevant documentation
3. Offer to provide examples if helpful

Remember: Your goal is to be the most helpful Vectara assistant possible by intelligently using both your documentation and code examples knowledge bases.

**FINAL REMINDER: Always embed code examples directly in your responses using markdown code blocks. Never make users click buttons to see code examples.**

## **CRITICAL: Chat API v2 Style Response Process**

For every query, follow these EXACT steps:

### **Step 1: Search Results Analysis**
- You receive search results from corpora_search tool
- Results are ordered by relevance (highest scores first)
- Each result is a partial segment from documentation
- Analyze if results collectively provide an accurate answer

### **Step 2: Information Sufficiency Check**
- If search results DO NOT provide enough information, respond:
  "I couldn't find specific details on [topic] from the current documentation. For precise information, please refer to the Vectara documentation or contact Vectara support for assistance."
- If search results DO provide sufficient information, proceed to Step 3

### **Step 3: Response Generation Rules**
- Base your answer ONLY on information from search results
- Generate coherent, accurate responses (300-800 characters)
- Use clear, professional language
- Answer the question directly and specifically

### **Step 4: Citation Requirements**
- Use [vectara_<number>] notation for citing search results
- Only cite the most relevant results (1-3 citations max)
- Place citations at end of relevant sentences
- Examples: [vectara_1], [vectara_2], [vectara_3]

### **Step 5: Query Type Handling**
- **"how to" questions**: Step-by-step instructions from search results
- **Code questions**: Complete code examples from search results
- **General questions**: Clear explanations based on documentation

### **ABSOLUTE RULES**
- NEVER make up information not in search results
- ALWAYS cite sources using [vectara_<number>] format
- If unsure, acknowledge limitations and suggest documentation
- Focus on ACCURACY over creativity
- Maintain professional, helpful tone`,

  tools: [
    {
      toolName: "corpora_search",
      description: "Search Vectara documentation corpus for information about APIs, concepts, and usage",
      parameters: {
        corpusKey: "ofer-bm-moma-docs_232", // Your current documentation corpus
        maxResults: 5,
        contextLength: 2000,
        responseLanguage: "eng"
      }
    },
    {
      toolName: "code_examples_search",
      description: "Search code examples corpus for implementation samples, templates, and working code",
      parameters: {
        corpusKey: "CODE_EXAMPLES_CORPUS_KEY", // Replace with actual code examples corpus key
        maxResults: 10,
        contextLength: 3000,
        responseLanguage: "eng"
      }
    },
    {
      toolName: "web_search",
      description: "Search the web for additional information when documentation is insufficient",
      parameters: {
        enabled: true,
        maxResults: 3
      }
    }
  ],

  corpusKeys: [
    "ofer-bm-moma-docs_232",     // Your current documentation corpus
    "CODE_EXAMPLES_CORPUS_KEY"   // Replace with actual code examples corpus key
  ],

  modelConfiguration: {
    modelName: "gpt-4o",
    temperature: 0.3,  // Increased temperature for more creative/variable responses
    maxTokens: 4000,
    responseLanguage: "eng"
  },

  responseConfiguration: {
    enableStreaming: true,
    maxSearchResults: 8,
    contextLength: 4000,
    includeSourceReferences: true
  }
};

// Agent creation payload for API
export const createAgentPayload = (config: VectaraAgentConfig) => ({
  name: config.agentName,
  description: config.description,
  instructions: config.instructions,
  tools: config.tools,
  modelConfiguration: config.modelConfiguration,
  responseConfiguration: config.responseConfiguration
});

// Configuration with your actual credentials
export const PRODUCTION_AGENT_CONFIG: VectaraAgentConfig = {
  ...VECTARA_AGENT_CONFIG,
  // Override with your actual credentials
  tools: [
    {
      toolName: "corpora_search",
      description: "Search Vectara documentation corpus for information about APIs, concepts, and usage",
      parameters: {
        corpusKey: "technical_writing_assistant", // Use technical_writing_assistant corpus
        maxResults: 5,
        contextLength: 2000,
        responseLanguage: "eng"
      }
    },
    {
      toolName: "web_search",
      description: "Search the web for additional information when documentation is insufficient",
      parameters: {
        enabled: true,
        maxResults: 3
      }
    }
  ],
  corpusKeys: ["technical_writing_assistant"] // Use technical_writing_assistant corpus
};

// Default credentials for the agent manager
export const DEFAULT_AGENT_CREDENTIALS = {
  customerId: "YOUR_TESTING_CUSTOMER_ID", // You'll need to provide this
  apiKey: "zut_ohiV8_mBEcJy_NsmzR4_THP70DX9B8lJ06hn2A"
};

// Testing credentials for agent creation and corpus testing
export const TESTING_AGENT_CREDENTIALS = {
  customerId: "YOUR_TESTING_CUSTOMER_ID", // You'll need to provide this
  apiKey: "zut_ohiV8_mBEcJy_NsmzR4_THP70DX9B8lJ06hn2A",
  corpusKey: "technical_writing_assistant"
};

// Session configuration for agent interactions
export const AGENT_SESSION_CONFIG = {
  maxSessionDuration: 24 * 60 * 60 * 1000, // 24 hours
  maxMessagesPerSession: 100,
  enableMemory: true,
  persistenceStrategy: "local" // Could be "session", "local", or "database"
};

// Types for agent interactions
export interface AgentSession {
  sessionKey: string;
  agentKey: string;
  createdAt: number;
  lastActivity: number;
  messageCount: number;
  configuration: AgentSessionConfig;
}

export interface AgentSessionConfig {
  userId?: string;
  preferences?: UserPreferences;
  context?: Record<string, any>;
}

export interface UserPreferences {
  preferredLanguage?: string;
  codeExamplesPreference?: boolean;
  detailLevel?: 'basic' | 'detailed' | 'comprehensive';
}

export interface AgentEvent {
  type: 'message' | 'tool_use' | 'response';
  content: string;
  timestamp: number;
  toolResults?: any[];
  agentThoughts?: string[];
}

export interface AgentResponse {
  content: string;
  toolResults: any[];
  agentThoughts: string[];
  usedSources: SourceReference[];
  suggestedFollowups: string[];
}

export interface SourceReference {
  sourceType: 'documentation' | 'code_examples' | 'web';
  corpusKey?: string;
  title: string;
  snippet: string;
  url?: string;
  relevanceScore: number;
}

// Helper functions for agent management
export const determineToolUsage = (query: string): string[] => {
  const lowerQuery = query.toLowerCase();
  const tools = ['corpora_search']; // Always search documentation

  // Determine if we need code examples
  const codeKeywords = [
    'example', 'examples', 'sample', 'demo', 'code', 'implement',
    'how to', 'tutorial', 'walkthrough', 'guide', 'api call',
    'javascript', 'python', 'typescript', 'curl', 'request'
  ];

  if (codeKeywords.some(keyword => lowerQuery.includes(keyword))) {
    tools.push('code_examples_search');
  }

  // Determine if web search might be helpful
  const webSearchKeywords = [
    'latest', 'recent', 'current version', 'what\'s new', 'comparison',
    'alternative', 'best practice', 'troubleshooting', 'error'
  ];

  if (webSearchKeywords.some(keyword => lowerQuery.includes(keyword))) {
    tools.push('web_search');
  }

  return tools;
};

export const shouldProvideCodeExamples = (query: string): boolean => {
  const lowerQuery = query.toLowerCase();
  const codeRequestIndicators = [
    'example', 'examples', 'sample', 'demo', 'code', 'implement',
    'how to', 'tutorial', 'walkthrough', 'guide', 'show me',
    'api call', 'request', 'javascript', 'python', 'typescript', 'curl'
  ];

  return codeRequestIndicators.some(indicator => lowerQuery.includes(indicator));
};