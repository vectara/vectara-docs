// Multi-Account Configuration for Vectara Agent Platform
// Handles different API keys and corpus keys for different purposes

export interface AccountConfig {
  name: string;
  customerId: string;
  apiKey: string;
  corpusKeys: string[];
  description: string;
}

export interface MultiAccountAgentConfig {
  primaryAccount: AccountConfig;      // For documentation
  secondaryAccount?: AccountConfig;   // For code examples (different account)
  enableCrossAccountSearch: boolean;
  fallbackToPrimaryOnly: boolean;
}

// Primary account configuration (your current setup)
export const PRIMARY_ACCOUNT_CONFIG: AccountConfig = {
  name: "Vectara Documentation Account",
  customerId: "1526022105",
  apiKey: "zqt_WvU_2ewh7ZGRwq8LdL2SV8B9RJmVGyUm1VAuOw",
  corpusKeys: ["ofer-bm-moma-docs_232"],
  description: "Primary account for Vectara documentation search"
};

// Secondary account configuration (for code examples - to be configured)
export const SECONDARY_ACCOUNT_CONFIG: AccountConfig = {
  name: "Vectara Code Examples Account",
  customerId: "SECONDARY_CUSTOMER_ID",    // Replace with actual customer ID
  apiKey: "SECONDARY_API_KEY",            // Replace with actual API key
  corpusKeys: ["CODE_EXAMPLES_CORPUS_KEY"], // Replace with actual corpus key
  description: "Secondary account for code examples and implementation samples"
};

// Multi-account agent configuration
export const MULTI_ACCOUNT_AGENT_CONFIG: MultiAccountAgentConfig = {
  primaryAccount: PRIMARY_ACCOUNT_CONFIG,
  secondaryAccount: undefined, // Will be enabled when configured
  enableCrossAccountSearch: false, // Start with primary only
  fallbackToPrimaryOnly: true
};

// Account management utilities
export class MultiAccountManager {
  private config: MultiAccountAgentConfig;

  constructor(config?: MultiAccountAgentConfig) {
    this.config = config || MULTI_ACCOUNT_AGENT_CONFIG;
  }

  // Get all available accounts
  getAvailableAccounts(): AccountConfig[] {
    const accounts = [this.config.primaryAccount];
    if (this.config.secondaryAccount) {
      accounts.push(this.config.secondaryAccount);
    }
    return accounts;
  }

  // Get primary account
  getPrimaryAccount(): AccountConfig {
    return this.config.primaryAccount;
  }

  // Get secondary account (if configured)
  getSecondaryAccount(): AccountConfig | null {
    return this.config.secondaryAccount || null;
  }

  // Check if multi-account is enabled
  isMultiAccountEnabled(): boolean {
    return this.config.enableCrossAccountSearch && !!this.config.secondaryAccount;
  }

  // Configure secondary account
  configureSecondaryAccount(config: AccountConfig): void {
    this.config.secondaryAccount = config;
    this.config.enableCrossAccountSearch = true;
  }

  // Disable secondary account
  disableSecondaryAccount(): void {
    this.config.secondaryAccount = undefined;
    this.config.enableCrossAccountSearch = false;
  }

  // Get all corpus keys across accounts
  getAllCorpusKeys(): string[] {
    const keys = [...this.config.primaryAccount.corpusKeys];
    if (this.config.secondaryAccount) {
      keys.push(...this.config.secondaryAccount.corpusKeys);
    }
    return keys;
  }

  // Find which account owns a corpus key
  findAccountForCorpus(corpusKey: string): AccountConfig | null {
    if (this.config.primaryAccount.corpusKeys.includes(corpusKey)) {
      return this.config.primaryAccount;
    }
    if (this.config.secondaryAccount?.corpusKeys.includes(corpusKey)) {
      return this.config.secondaryAccount;
    }
    return null;
  }

  // Get account for specific search type
  getAccountForSearchType(searchType: 'documentation' | 'code_examples'): AccountConfig {
    if (searchType === 'documentation') {
      return this.config.primaryAccount;
    }

    // For code examples, prefer secondary account if available
    if (searchType === 'code_examples' && this.config.secondaryAccount) {
      return this.config.secondaryAccount;
    }

    // Fallback to primary
    return this.config.primaryAccount;
  }

  // Create agent configurations for each account
  createAgentConfigs(): any[] {
    const configs = [];

    // Primary account configuration
    configs.push({
      name: `${VECTARA_AGENT_CONFIG.agentName} - Documentation`,
      description: VECTARA_AGENT_CONFIG.description,
      instructions: VECTARA_AGENT_CONFIG.instructions,
      tools: [
        {
          toolName: "corpora_search",
          description: "Search Vectara documentation corpus",
          parameters: {
            corpusKey: this.config.primaryAccount.corpusKeys[0],
            maxResults: 5,
            contextLength: 2000,
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
      ],
      modelConfiguration: VECTARA_AGENT_CONFIG.modelConfiguration,
      responseConfiguration: VECTARA_AGENT_CONFIG.responseConfiguration
    });

    // Secondary account configuration (if available)
    if (this.config.secondaryAccount && this.config.enableCrossAccountSearch) {
      configs.push({
        name: `${VECTARA_AGENT_CONFIG.agentName} - Code Examples`,
        description: "Specialized for code examples and implementation",
        instructions: VECTARA_AGENT_CONFIG.instructions,
        tools: [
          {
            toolName: "corpora_search",
            description: "Search code examples corpus",
            parameters: {
              corpusKey: this.config.secondaryAccount.corpusKeys[0],
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
        ],
        modelConfiguration: VECTARA_AGENT_CONFIG.modelConfiguration,
        responseConfiguration: VECTARA_AGENT_CONFIG.responseConfiguration
      });
    }

    return configs;
  }

  // Get current configuration
  getConfig(): MultiAccountAgentConfig {
    return { ...this.config };
  }

  // Update configuration
  updateConfig(updates: Partial<MultiAccountAgentConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  // Validate configuration
  validateConfiguration(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate primary account
    if (!this.config.primaryAccount.customerId) {
      errors.push('Primary account customer ID is required');
    }
    if (!this.config.primaryAccount.apiKey) {
      errors.push('Primary account API key is required');
    }
    if (!this.config.primaryAccount.corpusKeys.length) {
      errors.push('Primary account must have at least one corpus key');
    }

    // Validate secondary account (if configured)
    if (this.config.secondaryAccount) {
      if (!this.config.secondaryAccount.customerId) {
        errors.push('Secondary account customer ID is required');
      }
      if (!this.config.secondaryAccount.apiKey) {
        errors.push('Secondary account API key is required');
      }
      if (!this.config.secondaryAccount.corpusKeys.length) {
        errors.push('Secondary account must have at least one corpus key');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Export configuration for backup
  exportConfiguration(): string {
    return JSON.stringify(this.config, null, 2);
  }

  // Import configuration from backup
  importConfiguration(configJson: string): boolean {
    try {
      const imported = JSON.parse(configJson);
      this.config = { ...MULTI_ACCOUNT_AGENT_CONFIG, ...imported };
      return true;
    } catch (error) {
      console.error('Failed to import configuration:', error);
      return false;
    }
  }
}

// Global multi-account manager instance
export const multiAccountManager = new MultiAccountManager();

// Development utilities for testing multi-account setup
export const devUtils = {
  // Configure secondary account for testing
  configureTestCodeExamplesAccount: () => {
    if (process.env.NODE_ENV === 'development') {
      multiAccountManager.configureSecondaryAccount({
        name: "Test Code Examples Account",
        customerId: "TEST_CUSTOMER_ID",
        apiKey: "TEST_API_KEY",
        corpusKeys: ["test-code-examples-corpus"],
        description: "Test account for code examples"
      });
      console.log('Test code examples account configured');
    }
  },

  // Show current configuration
  showConfiguration: () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Multi-Account Configuration:');
      console.table(multiAccountManager.getAvailableAccounts());
      console.log('Multi-Account Enabled:', multiAccountManager.isMultiAccountEnabled());
    }
  },

  // Validate current setup
  validateSetup: () => {
    if (process.env.NODE_ENV === 'development') {
      const validation = multiAccountManager.validateConfiguration();
      console.log('Configuration Validation:', validation);
      return validation;
    }
  }
};

// Make devUtils available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).vectaraMultiAccountUtils = devUtils;
}

// Import VECTARA_AGENT_CONFIG from the main config file
import { VECTARA_AGENT_CONFIG } from './agentConfig';