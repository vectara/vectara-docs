// Debug utility for controlled logging
// Toggle debug mode in development vs production

const DEBUG_MODE = process.env.NODE_ENV === 'development';

export const debug = {
  log: (...args: any[]) => {
    if (DEBUG_MODE) {
      console.log('[Vectara Debug]', ...args);
    }
  },
  warn: (...args: any[]) => {
    if (DEBUG_MODE) {
      console.warn('[Vectara Warning]', ...args);
    }
  },
  error: (...args: any[]) => {
    // Always show errors, even in production
    console.error('[Vectara Error]', ...args);
  },
  info: (...args: any[]) => {
    if (DEBUG_MODE) {
      console.info('[Vectara Info]', ...args);
    }
  }
};

// Export specific debug functions for different areas
export const debugCodeGeneration = (...args: any[]) => {
  if (DEBUG_MODE) {
    console.log('[Vectara Code Generation]', ...args);
  }
};

export const debugSearchIntegration = (...args: any[]) => {
  if (DEBUG_MODE) {
    console.log('[Vectara Search Integration]', ...args);
  }
};

export const debugAPI = (...args: any[]) => {
  if (DEBUG_MODE) {
    console.log('[Vectara API]', ...args);
  }
};