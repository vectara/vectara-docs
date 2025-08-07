// OpenAPI Example Extractor
// Extracts real examples from vectara-oas-v2.yaml for context-aware code generation

import { OpenAPIContext, fetchOpenAPIContext } from './openApiContext';

export interface APIExample {
  endpoint: string;
  method: string;
  description: string;
  requestExample?: any;
  responseExample?: any;
  parameters?: Array<{
    name: string;
    example: any;
    description?: string;
  }>;
}

export interface EndpointExamples {
  chat: APIExample[];
  search: APIExample[];
  corpus: APIExample[];
  upload: APIExample[];
  auth: APIExample[];
}

let cachedExamples: EndpointExamples | null = null;
let examplesCacheExpiry = 0;
const EXAMPLES_CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

/**
 * Extract practical examples from OpenAPI spec
 */
export async function getOpenAPIExamples(): Promise<EndpointExamples> {
  try {
    // Return cached examples if still valid
    if (cachedExamples && Date.now() < examplesCacheExpiry) {
      return cachedExamples;
    }

    const context = await fetchOpenAPIContext();
    if (!context) {
      return getFallbackExamples();
    }

    const examples: EndpointExamples = {
      chat: [],
      search: [],
      corpus: [],
      upload: [],
      auth: []
    };

    // Extract examples from endpoints
    context.endpoints.forEach(endpoint => {
      const example = extractEndpointExample(endpoint, context);
      if (example) {
        // Categorize examples
        if (endpoint.path.includes('/chats')) {
          examples.chat.push(example);
        } else if (endpoint.path.includes('/search')) {
          examples.search.push(example);
        } else if (endpoint.path.includes('/corpora') && !endpoint.path.includes('/documents')) {
          examples.corpus.push(example);
        } else if (endpoint.path.includes('/documents')) {
          examples.upload.push(example);
        } else {
          examples.auth.push(example);
        }
      }
    });

    // Cache the results
    cachedExamples = examples;
    examplesCacheExpiry = Date.now() + EXAMPLES_CACHE_DURATION;

    return examples;
  } catch (error) {
    console.warn('Error extracting OpenAPI examples:', error);
    return getFallbackExamples();
  }
}

/**
 * Extract example from a single endpoint
 */
function extractEndpointExample(endpoint: any, context: OpenAPIContext): APIExample | null {
  try {
    const example: APIExample = {
      endpoint: endpoint.path,
      method: endpoint.method.toUpperCase(),
      description: endpoint.summary || endpoint.description || ''
    };

    // Extract request examples
    if (endpoint.requestBody?.content?.['application/json']?.example) {
      example.requestExample = endpoint.requestBody.content['application/json'].example;
    } else if (endpoint.requestBody?.content?.['application/json']?.schema) {
      // Generate example from schema
      example.requestExample = generateExampleFromSchema(
        endpoint.requestBody.content['application/json'].schema, 
        context.schemas
      );
    }

    // Extract response examples
    const successResponse = endpoint.responses?.['200'] || endpoint.responses?.['201'];
    if (successResponse?.content?.['application/json']?.example) {
      example.responseExample = successResponse.content['application/json'].example;
    } else if (successResponse?.content?.['application/json']?.schema) {
      example.responseExample = generateExampleFromSchema(
        successResponse.content['application/json'].schema,
        context.schemas
      );
    }

    // Extract parameter examples
    if (endpoint.parameters && endpoint.parameters.length > 0) {
      example.parameters = endpoint.parameters.map((param: any) => ({
        name: param.name,
        example: param.example || getParameterExample(param.name, param.schema),
        description: param.description
      }));
    }

    return example;
  } catch (error) {
    console.warn('Error extracting endpoint example:', error);
    return null;
  }
}

/**
 * Generate example value from OpenAPI schema
 */
function generateExampleFromSchema(schema: any, schemas: Record<string, any>): any {
  if (!schema) return null;

  // Handle schema references
  if (schema.$ref) {
    const refKey = schema.$ref.replace('#/components/schemas/', '');
    if (schemas[refKey]) {
      return generateExampleFromSchema(schemas[refKey], schemas);
    }
  }

  // Handle different schema types
  switch (schema.type) {
    case 'object':
      const obj: any = {};
      if (schema.properties) {
        Object.entries(schema.properties).forEach(([key, prop]: [string, any]) => {
          obj[key] = generateExampleFromSchema(prop, schemas);
        });
      }
      return obj;

    case 'array':
      if (schema.items) {
        return [generateExampleFromSchema(schema.items, schemas)];
      }
      return [];

    case 'string':
      return schema.example || getStringExample(schema.format);

    case 'number':
    case 'integer':
      return schema.example || (schema.format === 'int64' ? 1526022105 : 42);

    case 'boolean':
      return schema.example || true;

    default:
      return schema.example || null;
  }
}

/**
 * Get example for parameter names
 */
function getParameterExample(paramName: string, schema?: any): any {
  const examples: Record<string, any> = {
    'customer_id': '1526022105',
    'corpus_key': 'my-corpus',
    'document_id': 'doc-123',
    'query': 'What is semantic search?',
    'limit': 10,
    'offset': 0
  };

  return examples[paramName] || schema?.example || 'example-value';
}

/**
 * Get example for string formats
 */
function getStringExample(format?: string): string {
  switch (format) {
    case 'uuid':
      return '550e8400-e29b-41d4-a716-446655440000';
    case 'date-time':
      return '2024-01-15T10:30:00Z';
    case 'date':
      return '2024-01-15';
    case 'email':
      return 'user@example.com';
    case 'uri':
      return 'https://example.com';
    default:
      return 'example-string';
  }
}

/**
 * Fallback examples when OpenAPI spec is not available
 */
function getFallbackExamples(): EndpointExamples {
  return {
    chat: [{
      endpoint: '/v2/chats',
      method: 'POST',
      description: 'Start a chat conversation',
      requestExample: {
        query: 'What is semantic search?',
        search: {
          corpora: [{ corpus_key: 'my-corpus' }],
          limit: 5
        },
        generation: {
          max_used_search_results: 5
        }
      },
      responseExample: {
        answer: 'Semantic search is a search method...',
        conversation_id: 'conv_123'
      }
    }],
    search: [{
      endpoint: '/v2/corpora/{corpus-key}/query',
      method: 'POST',
      description: 'Query a corpus',
      requestExample: {
        query: 'machine learning algorithms',
        search: { limit: 10, offset: 0 }
      }
    }],
    corpus: [{
      endpoint: '/v2/corpora',
      method: 'POST',
      description: 'Create a new corpus',
      requestExample: {
        key: 'my-corpus',
        name: 'My Document Collection',
        description: 'A collection of documents for my application'
      }
    }],
    upload: [{
      endpoint: '/v2/corpora/{corpus-key}/documents',
      method: 'POST',
      description: 'Upload a document',
      requestExample: {
        type: 'core',
        document_id: 'doc-123',
        parts: [{
          text: 'This is the document content...'
        }]
      }
    }],
    auth: []
  };
}

/**
 * Get specific examples for a code type and operation
 */
export function getExamplesForOperation(
  operation: string, 
  examples: EndpointExamples
): APIExample[] {
  switch (operation) {
    case 'search':
    case 'query':
      return [...examples.chat, ...examples.search];
    case 'upload':
    case 'document':
      return examples.upload;
    case 'corpus':
      return examples.corpus;
    default:
      return examples.chat;
  }
}