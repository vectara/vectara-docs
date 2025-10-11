// Testing Configuration for Vectara Agent Platform
// Uses your personal account for agent testing with technical_writing_assistant corpus

import { VectaraAgentConfig } from './agentConfig';

// Testing agent configuration for technical_writing_assistant corpus
export const TESTING_AGENT_CONFIG: VectaraAgentConfig = {
  agentName: "Technical Writing Assistant",
  description: "AI assistant specialized for technical writing documentation and help",

  instructions: `
You are a helpful technical writing assistant with expertise in documentation, API guides, and technical communication. Your goal is to help users create, improve, and understand technical documentation.

## Your Capabilities:
- Access to technical writing documentation corpus
- Ability to provide writing guidance and best practices
- Help with API documentation structure
- Assistance with technical content organization

## Your Approach:

### 1. **Query Analysis**
- Understand the user's technical writing needs
- Determine if they need guidance, examples, or improvements
- Identify the type of technical documentation they're working on

### 2. **Information Gathering**
- Use the corpora_search tool to find relevant documentation examples
- Look for best practices and style guidelines
- Find similar technical writing patterns

### 3. **Response Strategy**

#### **For writing guidance:**
- Provide clear, actionable advice
- Include examples from the technical writing corpus
- Suggest improvements with specific recommendations
- Mention common pitfalls and how to avoid them

#### **For API documentation:**
- Show proper structure and organization
- Include example formats and templates
- Provide best practices for API docs
- Show how to document different types of endpoints

#### **For content improvement:**
- Analyze existing documentation structure
- Suggest better organization and clarity
- Recommend style improvements
- Provide before/after examples

### 4. **Best Practices for Technical Writing:**
- Be clear and concise
- Use consistent terminology
- Provide practical examples
- Include troubleshooting sections
- Consider different audience levels

Remember: Your goal is to be the most helpful technical writing assistant possible by providing practical, actionable advice based on established best practices.
`,

  tools: [
    {
      toolName: "corpora_search",
      description: "Search technical writing documentation corpus for examples and best practices",
      parameters: {
        corpusKey: "technical_writing_assistant",
        maxResults: 8,
        contextLength: 2500,
        responseLanguage: "eng"
      }
    },
    {
      toolName: "web_search",
      description: "Search the web for additional technical writing resources and best practices",
      parameters: {
        enabled: true,
        maxResults: 3
      }
    }
  ],

  corpusKeys: ["technical_writing_assistant"],

  modelConfiguration: {
    modelName: "gpt-4o",
    temperature: 0.2,  // Slightly higher for creative writing assistance
    maxTokens: 4000,
    responseLanguage: "eng"
  },

  responseConfiguration: {
    enableStreaming: true,
    maxSearchResults: 8,
    contextLength: 3000,
    includeSourceReferences: true
  }
};

// Testing configurations for different scenarios
export const TESTING_SCENARIOS = {
  // Documentation writing
  documentationWriting: {
    name: "API Documentation Assistant",
    instructions: `
You are an API documentation specialist. Help users create clear, comprehensive API documentation.
Focus on:
- Endpoint documentation structure
- Parameter descriptions
- Example requests/responses
- Error handling documentation
- Authentication guides
    `,
    testQueries: [
      "How do I document a REST API endpoint?",
      "What should I include in API documentation?",
      "Show me an example of good API docs",
      "How do I document error responses?"
    ]
  },

  // Technical tutorials
  tutorialWriting: {
    name: "Tutorial Writing Assistant",
    instructions: `
You are a technical tutorial specialist. Help users create step-by-step technical tutorials.
Focus on:
- Tutorial structure and organization
- Clear step-by-step instructions
- Code examples and explanations
- Troubleshooting sections
    `,
    testQueries: [
      "How do I structure a technical tutorial?",
      "What makes a good technical tutorial?",
      "Help me write a tutorial for API integration",
      "How do I add code examples to tutorials?"
    ]
  },

  // User guides
  userGuideWriting: {
    name: "User Guide Assistant",
    instructions: `
You are a user guide specialist. Help users create comprehensive user guides and manuals.
Focus on:
- Guide organization and navigation
- Step-by-step instructions
- Visual elements and screenshots
- User-friendly language
    `,
    testQueries: [
      "How do I write a user guide?",
      "What should I include in a user manual?",
      "Help me create a getting started guide",
      "How do I organize a user guide?"
    ]
  }
};

// Testing utilities
export class TestingManager {
  private static instance: TestingManager;
  private currentScenario: string = 'documentationWriting';

  static getInstance(): TestingManager {
    if (!TestingManager.instance) {
      TestingManager.instance = new TestingManager();
    }
    return TestingManager.instance;
  }

  // Get current testing configuration
  getCurrentConfig(): VectaraAgentConfig {
    const scenario = TESTING_SCENARIOS[this.currentScenario as keyof typeof TESTING_SCENARIOS];
    return {
      ...TESTING_AGENT_CONFIG,
      agentName: scenario.name,
      instructions: scenario.instructions
    };
  }

  // Set testing scenario
  setScenario(scenario: keyof typeof TESTING_SCENARIOS): void {
    this.currentScenario = scenario;
  }

  // Get available scenarios
  getAvailableScenarios(): string[] {
    return Object.keys(TESTING_SCENARIOS);
  }

  // Get test queries for current scenario
  getTestQueries(): string[] {
    const scenario = TESTING_SCENARIOS[this.currentScenario as keyof typeof TESTING_SCENARIOS];
    return scenario.testQueries;
  }

  // Run automated test
  async runAutomatedTest(agentManager: any): Promise<{
    success: boolean;
    results: any[];
    errors: string[];
  }> {
    const results: any[] = [];
    const errors: string[] = [];
    const queries = this.getTestQueries();

    try {
      // Create test session
      const session = await agentManager.createSession();

      // Test each query
      for (const query of queries.slice(0, 3)) { // Test first 3 queries
        try {
          const response = await agentManager.sendMessage(session, query);
          results.push({
            query,
            success: true,
            responseLength: response.content.length,
            hasSources: response.usedSources.length > 0
          });
        } catch (error) {
          errors.push(`Query failed: "${query}" - ${error}`);
          results.push({
            query,
            success: false,
            error: error
          });
        }
      }

      // Cleanup
      await agentManager.deleteSession(session);

    } catch (error) {
      errors.push(`Test setup failed: ${error}`);
    }

    return {
      success: errors.length === 0,
      results,
      errors
    };
  }

  // Validate agent setup
  async validateAgentSetup(agentManager: any): Promise<{
    isValid: boolean;
    issues: string[];
  }> {
    const issues: string[] = [];

    try {
      // Test agent creation
      const config = this.getCurrentConfig();
      const validation = await agentManager.validateAgentConfigWithSpec(config);

      if (!validation.isValid) {
        issues.push(...validation.errors);
      }

      // Test OpenAPI spec fetching
      await agentManager.getOpenAPISpecification();

      // Test agent paths
      const paths = await agentManager.getAgentPathsFromSpec();
      if (paths.length === 0) {
        issues.push('No agent paths found in OpenAPI specification');
      }

    } catch (error) {
      issues.push(`Validation failed: ${error}`);
    }

    return {
      isValid: issues.length === 0,
      issues
    };
  }
}

// Development utilities for testing
export const testingUtils = {
  // Run all test scenarios
  runAllScenarios: async (agentManager: any) => {
    const manager = TestingManager.getInstance();
    const results = [];

    for (const scenario of manager.getAvailableScenarios()) {
      console.log(`Testing scenario: ${scenario}`);
      manager.setScenario(scenario as keyof typeof TESTING_SCENARIOS);

      const result = await manager.runAutomatedTest(agentManager);
      results.push({
        scenario,
        ...result
      });
    }

    return results;
  },

  // Show testing status
  showTestingStatus: () => {
    const manager = TestingManager.getInstance();
    console.group('🧪 Agent Testing Status');
    console.log('Current Scenario:', manager.currentScenario);
    console.log('Available Scenarios:', manager.getAvailableScenarios());
    console.log('Test Queries:', manager.getTestQueries());
    console.groupEnd();
  },

  // Validate current setup
  validateSetup: async (agentManager: any) => {
    const manager = TestingManager.getInstance();
    const validation = await manager.validateAgentSetup(agentManager);

    console.group('✅ Agent Setup Validation');
    console.log('Valid:', validation.isValid);
    if (!validation.isValid) {
      console.warn('Issues:', validation.issues);
    }
    console.groupEnd();

    return validation;
  }
};

// Make testing utilities available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).vectaraTestingUtils = testingUtils;
}