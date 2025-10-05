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

#### **When users ask "how to" questions:**
- Provide step-by-step instructions
- Include code examples when relevant
- Mention common pitfalls and troubleshooting

### 4. **Code Example Guidelines:**
- Always provide complete, working examples
- Include necessary imports and setup
- Use placeholders like YOUR_CUSTOMER_ID, YOUR_API_KEY, etc.
- Add comments explaining each part of the code
- Show error handling where appropriate

### 5. **Best Practices:**
- Always verify information from the corpora
- If you're unsure about something, acknowledge it
- Provide links to official documentation
- Encourage follow-up questions
- Be conversational but professional

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
`,

  tools: [
    {
      toolName: "corpora_search",
      description: "Search Vectara documentation corpus for information about APIs, concepts, and usage",
      parameters: {
        corpusKey: "DOCUMENTATION_CORPUS_ID",
        maxResults: 5,
        contextLength: 2000,
        responseLanguage: "eng"
      }
    },
    {
      toolName: "code_examples_search",
      description: "Search code examples corpus for implementation samples, templates, and working code",
      parameters: {
        corpusKey: "CODE_EXAMPLES_CORPUS_ID",
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
    "DOCUMENTATION_CORPUS_ID", // Replace with actual documentation corpus ID
    "CODE_EXAMPLES_CORPUS_ID"  // Replace with actual code examples corpus ID
  ],

  modelConfiguration: {
    modelName: "gpt-4o",
    temperature: 0.1,  // Lower temperature for more consistent responses
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