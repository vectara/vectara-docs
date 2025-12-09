// Feature Flags Configuration
// Controls which features and APIs are enabled

export interface FeatureFlags {
  // Agent Platform vs Chat API
  useAgentPlatform: boolean;

  // Agent-specific features
  enableAgentStreaming: boolean;
  enableAgentThoughts: boolean;
  enableAgentToolTracking: boolean;
  enableSessionPersistence: boolean;
  useTestingConfiguration: boolean;

  // Enhanced UI features
  showAgentStatus: boolean;
  showToolUsage: boolean;
  showAgentThinking: boolean;
  showSuggestedFollowups: boolean;

  // Development features
  enableDebugMode: boolean;
  enablePerformanceMonitoring: boolean;
  enableAnalytics: boolean;
}

// Default feature flag configuration
export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  // Use Agent Platform by default
  useAgentPlatform: true,

  // Agent features (only effective when useAgentPlatform is true)
  enableAgentStreaming: false,
  enableAgentThoughts: true,
  enableAgentToolTracking: true,
  enableSessionPersistence: true,
  useTestingConfiguration: false, // Enable for testing with technical_writing_assistant

  // UI features
  showAgentStatus: true,
  showToolUsage: true,
  showAgentThinking: true,
  showSuggestedFollowups: true,

  // Development features
  enableDebugMode: process.env.NODE_ENV === 'development',
  enablePerformanceMonitoring: true,
  enableAnalytics: true
};

// Feature flag overrides for different environments
export const ENVIRONMENT_FEATURE_FLAGS: Record<string, Partial<FeatureFlags>> = {
  development: {
    useAgentPlatform: true, // Enable Agent Platform in development for testing
    enableDebugMode: true,
    enablePerformanceMonitoring: true
  },

  staging: {
    useAgentPlatform: true, // Test agent platform in staging
    enableDebugMode: true,
    enablePerformanceMonitoring: true
  },

  production: {
    useAgentPlatform: true, // Use Agent Platform in production
    enableDebugMode: false,
    enablePerformanceMonitoring: false
  }
};

// Get current environment
const getCurrentEnvironment = (): string => {
  // Check for environment variable
  if (typeof process !== 'undefined' && process.env?.NODE_ENV) {
    return process.env.NODE_ENV;
  }

  // Check for development indicators
  if (typeof window !== 'undefined' && (window as any).__DEV__) {
    return 'development';
  }

  // Default to production
  return 'production';
};

// Get active feature flags
export const getActiveFeatureFlags = (): FeatureFlags => {
  const environment = getCurrentEnvironment();
  const environmentOverrides = ENVIRONMENT_FEATURE_FLAGS[environment] || {};

  return {
    ...DEFAULT_FEATURE_FLAGS,
    ...environmentOverrides
  };
};

// Feature flag persistence utilities
export class FeatureFlagManager {
  private readonly storageKey = 'vectara-feature-flags';
  private readonly flags: FeatureFlags;

  constructor() {
    this.flags = this.loadFlags();
  }

  // Load flags from storage with environment defaults
  private loadFlags(): FeatureFlags {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsedFlags = JSON.parse(stored);
        return { ...getActiveFeatureFlags(), ...parsedFlags };
      }
    } catch (error) {
      console.warn('Error loading feature flags:', error);
    }

    return getActiveFeatureFlags();
  }

  // Get current flag value
  getFlag<K extends keyof FeatureFlags>(flag: K): FeatureFlags[K] {
    return this.flags[flag];
  }

  // Get all flags
  getAllFlags(): FeatureFlags {
    return { ...this.flags };
  }

  // Update a specific flag
  updateFlag<K extends keyof FeatureFlags>(flag: K, value: FeatureFlags[K]): void {
    this.flags[flag] = value;
    this.saveFlags();
  }

  // Update multiple flags
  updateFlags(updates: Partial<FeatureFlags>): void {
    Object.assign(this.flags, updates);
    this.saveFlags();
  }

  // Save flags to storage
  private saveFlags(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.flags));
    } catch (error) {
      console.warn('Error saving feature flags:', error);
    }
  }

  // Reset to defaults
  resetToDefaults(): void {
    Object.assign(this.flags, getActiveFeatureFlags());
    this.saveFlags();
  }

  // Enable agent platform
  enableAgentPlatform(): void {
    this.updateFlag('useAgentPlatform', true);
  }

  // Disable agent platform
  disableAgentPlatform(): void {
    this.updateFlag('useAgentPlatform', false);
  }

  // Toggle agent platform
  toggleAgentPlatform(): void {
    this.updateFlag('useAgentPlatform', !this.flags.useAgentPlatform);
  }

  // Get current API mode
  getApiMode(): 'chat' | 'agent' {
    return this.flags.useAgentPlatform ? 'agent' : 'chat';
  }
}

// Global feature flag manager instance
export const featureFlagManager = new FeatureFlagManager();

// Hook for using feature flags in components
export const useFeatureFlags = (): FeatureFlags & {
  manager: FeatureFlagManager;
  updateFlag: <K extends keyof FeatureFlags>(flag: K, value: FeatureFlags[K]) => void;
  updateFlags: (updates: Partial<FeatureFlags>) => void;
  resetToDefaults: () => void;
  toggleApiMode: () => void;
  getApiMode: () => 'chat' | 'agent';
} => {
  // Note: In a real implementation, this would use React hooks to trigger re-renders
  // For now, we'll return the current state and methods

  const flags = featureFlagManager.getAllFlags();

  return {
    ...flags,
    manager: featureFlagManager,
    updateFlag: <K extends keyof FeatureFlags>(flag: K, value: FeatureFlags[K]) =>
      featureFlagManager.updateFlag(flag, value),
    updateFlags: (updates: Partial<FeatureFlags>) =>
      featureFlagManager.updateFlags(updates),
    resetToDefaults: () => featureFlagManager.resetToDefaults(),
    toggleApiMode: () => featureFlagManager.toggleAgentPlatform(),
    getApiMode: () => featureFlagManager.getApiMode()
  };
};

// Utility functions for common flag checks
export const isAgentPlatformEnabled = (): boolean => {
  return featureFlagManager.getFlag('useAgentPlatform');
};

export const isDebugModeEnabled = (): boolean => {
  return featureFlagManager.getFlag('enableDebugMode');
};

export const isAnalyticsEnabled = (): boolean => {
  return featureFlagManager.getFlag('enableAnalytics');
};

export const isAgentStreamingEnabled = (): boolean => {
  return featureFlagManager.getFlag('enableAgentStreaming');
};

// Development utilities for toggling features
export const devUtils = {
  // Only available in development
  toggleAgentPlatform: () => {
    if (process.env.NODE_ENV === 'development') {
      featureFlagManager.toggleAgentPlatform();
      console.log('Agent platform:', featureFlagManager.getFlag('useAgentPlatform') ? 'ENABLED' : 'DISABLED');
    }
  },

  toggleDebugMode: () => {
    if (process.env.NODE_ENV === 'development') {
      featureFlagManager.updateFlag('enableDebugMode', !featureFlagManager.getFlag('enableDebugMode'));
      console.log('Debug mode:', featureFlagManager.getFlag('enableDebugMode') ? 'ENABLED' : 'DISABLED');
    }
  },

  showAllFlags: () => {
    if (process.env.NODE_ENV === 'development') {
      console.table(featureFlagManager.getAllFlags());
    }
  },

  resetFlags: () => {
    if (process.env.NODE_ENV === 'development') {
      featureFlagManager.resetToDefaults();
      console.log('Feature flags reset to defaults');
    }
  }
};

// Make devUtils available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).vectaraDevUtils = devUtils;
}