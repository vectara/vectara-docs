// OpenAPI Specification Context Integration
// Uses the always up-to-date vectara-oas-v2.yaml file for enhanced code generation

export interface OpenAPIEndpoint {
  path: string;
  method: string;
  summary: string;
  description?: string;
  parameters?: Array<{
    name: string;
    in: string;
    required: boolean;
    schema: any;
    description?: string;
  }>;
  requestBody?: any;
  responses?: any;
}

export interface OpenAPIContext {
  endpoints: OpenAPIEndpoint[];
  schemas: Record<string, any>;
  version: string;
  lastUpdated: number;
}

let cachedContext: OpenAPIContext | null = null;
let cacheExpiry = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Fetches and parses the latest OpenAPI specification
 */
export async function fetchOpenAPIContext(): Promise<OpenAPIContext | null> {
  try {
    // Return cached version if still valid
    if (cachedContext && Date.now() < cacheExpiry) {
      return cachedContext;
    }

    // Fetch the latest OpenAPI spec
    const response = await fetch('/vectara-oas-v2.yaml', {
      cache: 'no-cache',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    if (!response.ok) {
      console.warn('Failed to fetch OpenAPI spec:', response.status);
      // Return a minimal context to avoid breaking functionality
      return {
        endpoints: [],
        schemas: {},
        version: '2.0.0',
        lastUpdated: Date.now()
      };
    }

    const yamlContent = await response.text();
    
    // Parse YAML content (simplified parsing - in production use yaml parser)
    const spec = parseYAMLSimple(yamlContent);
    
    const endpoints: OpenAPIEndpoint[] = [];
    
    // Extract endpoints
    if (spec.paths) {
      Object.entries(spec.paths).forEach(([path, pathObj]: [string, any]) => {
        Object.entries(pathObj).forEach(([method, methodObj]: [string, any]) => {
          if (method !== 'parameters' && typeof methodObj === 'object') {
            endpoints.push({
              path,
              method: method.toUpperCase(),
              summary: methodObj.summary || '',
              description: methodObj.description || '',
              parameters: methodObj.parameters || [],
              requestBody: methodObj.requestBody,
              responses: methodObj.responses
            });
          }
        });
      });
    }

    const context: OpenAPIContext = {
      endpoints,
      schemas: spec.components?.schemas || {},
      version: spec.info?.version || '2.0.0',
      lastUpdated: Date.now()
    };

    // Cache the result
    cachedContext = context;
    cacheExpiry = Date.now() + CACHE_DURATION;

    return context;
  } catch (error) {
    console.warn('Error fetching OpenAPI context, using fallback:', error.message);
    // Return fallback context to ensure functionality continues
    return {
      endpoints: [],
      schemas: {},
      version: '2.0.0',
      lastUpdated: Date.now()
    };
  }
}

/**
 * Simplified YAML parser for OpenAPI spec
 * Note: This is a basic implementation - in production use a proper YAML library
 */
function parseYAMLSimple(yamlContent: string): any {
  try {
    // For now, we'll create a minimal parser or use browser's built-in capabilities
    // This is a placeholder - in production you'd use js-yaml or similar
    
    // Basic structure extraction for common patterns
    const result: any = {
      info: { version: '2.0.0' },
      paths: {},
      components: { schemas: {} }
    };

    const lines = yamlContent.split('\n');
    let currentSection = '';
    let currentPath = '';
    let currentMethod = '';
    
    for (const line of lines) {
      const trimmed = line.trim();
      
      if (trimmed.startsWith('paths:')) {
        currentSection = 'paths';
        continue;
      }
      
      if (currentSection === 'paths' && trimmed.startsWith('/')) {
        currentPath = trimmed.replace(':', '');
        if (!result.paths[currentPath]) {
          result.paths[currentPath] = {};
        }
        continue;
      }
      
      if (currentSection === 'paths' && currentPath && 
          ['get:', 'post:', 'put:', 'delete:', 'patch:'].some(method => trimmed.startsWith(method))) {
        currentMethod = trimmed.replace(':', '').toLowerCase();
        result.paths[currentPath][currentMethod] = {
          summary: '',
          description: '',
          parameters: []
        };
        continue;
      }
      
      if (currentMethod && trimmed.startsWith('summary:')) {
        result.paths[currentPath][currentMethod].summary = trimmed.replace('summary:', '').trim();
      }
      
      if (currentMethod && trimmed.startsWith('description:')) {
        result.paths[currentPath][currentMethod].description = trimmed.replace('description:', '').trim();
      }
    }

    return result;
  } catch (error) {
    console.error('YAML parsing error:', error);
    return { info: { version: '2.0.0' }, paths: {}, components: { schemas: {} } };
  }
}

/**
 * Gets relevant endpoint information based on user query
 */
export function getRelevantEndpoints(query: string, context: OpenAPIContext): OpenAPIEndpoint[] {
  const queryLower = query.toLowerCase();
  const keywords = ['search', 'query', 'upload', 'index', 'corpus', 'document', 'chat', 'stream'];
  
  return context.endpoints.filter(endpoint => {
    const searchText = `${endpoint.path} ${endpoint.summary} ${endpoint.description}`.toLowerCase();
    
    // Check if query contains relevant keywords and endpoint matches
    return keywords.some(keyword => {
      return queryLower.includes(keyword) && searchText.includes(keyword);
    }) || queryLower.includes(endpoint.path.toLowerCase());
  });
}

/**
 * Generates enhanced context string for code generation
 */
export function generateEnhancedContext(query: string, context: OpenAPIContext | null): string {
  if (!context) {
    return '';
  }

  const relevantEndpoints = getRelevantEndpoints(query, context);
  
  if (relevantEndpoints.length === 0) {
    return `Based on Vectara API v${context.version} specification (${context.endpoints.length} endpoints available).`;
  }

  const endpointDescriptions = relevantEndpoints.map(endpoint => 
    `${endpoint.method} ${endpoint.path}: ${endpoint.summary}`
  ).join(', ');

  return `Based on Vectara API v${context.version} specification. Relevant endpoints: ${endpointDescriptions}. Always use the latest API patterns and best practices.`;
}

// useOpenAPIContext hook removed to avoid React dependency in utility file
// If needed, create a separate hooks file for React-specific functionality