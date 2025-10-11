// Vectara Agent Platform Setup Guide
// Instructions for configuring both documentation and code examples accounts

export const SETUP_GUIDE = {
  // Current configuration (working)
  documentationAccount: {
    name: "Vectara Documentation Account",
    customerId: "1526022105",
    apiKey: "zqt_WvU_2ewh7ZGRwq8LdL2SV8B9RJmVGyUm1VAuOw",
    corpusKey: "ofer-bm-moma-docs_232",
    status: "✅ Configured and Ready"
  },

  // Code examples account (to be configured)
  codeExamplesAccount: {
    name: "Vectara Code Examples Account",
    customerId: "YOUR_CODE_EXAMPLES_CUSTOMER_ID",
    apiKey: "YOUR_CODE_EXAMPLES_API_KEY",
    corpusKey: "YOUR_CODE_EXAMPLES_CORPUS_KEY",
    status: "⚠️ Needs Configuration"
  },

  // Setup steps
  setupSteps: [
    {
      title: "1. Create Code Examples Corpus",
      description: "In your second Vectara account, create a new corpus for code examples",
      instructions: [
        "Log into your second Vectara account",
        "Go to Corpus → Create Corpus",
        "Name it something like 'code-examples'",
        "Note the corpus_key (format: account-name_corpus-name_corpus-id)"
      ]
    },
    {
      title: "2. Upload Code Examples",
      description: "Upload your code examples to the new corpus",
      instructions: [
        "Gather your code examples (JavaScript, Python, TypeScript, cURL)",
        "Upload them as documents to the code examples corpus",
        "Include proper metadata for easier searching",
        "Wait for indexing to complete"
      ]
    },
    {
      title: "3. Get Account Credentials",
      description: "Collect the necessary credentials for the code examples account",
      instructions: [
        "Get the customer ID from the account settings",
        "Generate or use an existing API key",
        "Note the exact corpus_key for your code examples corpus"
      ]
    },
    {
      title: "4. Update Configuration",
      description: "Update the agent configuration with your code examples account details",
      instructions: [
        "Edit PRODUCTION_AGENT_CONFIG in agentConfig.ts",
        "Add the code_examples_search tool with your corpus key",
        "Update DEFAULT_AGENT_CREDENTIALS if needed"
      ]
    }
  ],

  // Testing instructions
  testingInstructions: [
    "Enable agent platform using the toggle in development mode",
    "Test questions that should trigger code examples:",
    "  - 'Show me how to create a corpus'",
    "  - 'Give me JavaScript examples for search'",
    "  - 'How do I upload documents with Python?'",
    "Compare responses between Chat API and Agent Platform"
  ],

  // Example configuration update
  exampleConfigUpdate: `
// Update this in PRODUCTION_AGENT_CONFIG:
tools: [
  {
    toolName: "corpora_search",
    description: "Search Vectara documentation corpus",
    parameters: {
      corpusKey: "ofer-bm-moma-docs_232", // Your docs corpus
      maxResults: 5,
      contextLength: 2000,
      responseLanguage: "eng"
    }
  },
  {
    toolName: "code_examples_search",
    description: "Search code examples corpus",
    parameters: {
      corpusKey: "your-account-name_code-examples_123", // Your code corpus
      maxResults: 10,
      contextLength: 3000,
      responseLanguage: "eng"
    }
  },
  {
    toolName: "web_search",
    description: "Search the web for additional information",
    parameters: {
      enabled: true,
      maxResults: 3
    }
  }
]
  `
};

// Development utilities for setup
export const setupUtils = {
  // Show current setup status
  showSetupStatus: () => {
    console.group('🔧 Vectara Agent Platform Setup Status');
    console.log('Documentation Account:', SETUP_GUIDE.documentationAccount);
    console.log('Code Examples Account:', SETUP_GUIDE.codeExamplesAccount);
    console.log('📋 Setup Steps:');
    SETUP_GUIDE.setupSteps.forEach((step, index) => {
      console.log(`${index + 1}. ${step.title}`);
      console.log(`   ${step.description}`);
    });
    console.groupEnd();
  },

  // Show testing instructions
  showTestingInstructions: () => {
    console.group('🧪 Testing Instructions');
    SETUP_GUIDE.testingInstructions.forEach((instruction, index) => {
      console.log(`${index + 1}. ${instruction}`);
    });
    console.groupEnd();
  },

  // Generate example config
  showExampleConfig: () => {
    console.group('⚙️ Example Configuration');
    console.log(SETUP_GUIDE.exampleConfigUpdate);
    console.groupEnd();
  },

  // Validate setup
  validateSetup: () => {
    const issues = [];

    if (!SETUP_GUIDE.documentationAccount.apiKey) {
      issues.push('Documentation account API key is missing');
    }

    if (!SETUP_GUIDE.documentationAccount.corpusKey) {
      issues.push('Documentation corpus key is missing');
    }

    if (SETUP_GUIDE.codeExamplesAccount.customerId === "YOUR_CODE_EXAMPLES_CUSTOMER_ID") {
      issues.push('Code examples account needs configuration');
    }

    if (issues.length > 0) {
      console.warn('⚠️ Setup Issues:', issues);
    } else {
      console.log('✅ Setup appears to be complete!');
    }

    return issues.length === 0;
  }
};

// Make setup utilities available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).vectaraSetupUtils = setupUtils;
}