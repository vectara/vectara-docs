// Enhanced Code Generation Templates
// Intelligent code generation based on user queries and context

import { SupportedLanguage, CodeTemplates } from '../types';
import { getOpenAPIExamples, getExamplesForOperation, APIExample } from './openApiExamples';

// Detect when users are asking about API operations that could benefit from code examples
export const detectCodeType = (content: string): string | null => {
  const lowerContent = content.toLowerCase();
  
  // Check for explicit code requests first
  const explicitCodeRequestPatterns = [
    /show\s+me\s+(code|example|implementation)/,
    /give\s+me\s+(code|example|implementation)/,
    /provide\s+(code|example|implementation)/,
    /generate\s+(code|example)/,
    /code\s+(example|sample)/,
    /example\s+code/,
    /sample\s+code/
  ];
  
  // Check for implicit API operation requests
  const apiOperationPatterns = [
    /how\s+(do\s+i|to)\s+(delete|remove)/,
    /how\s+(do\s+i|to)\s+(create|make|add)/,
    /how\s+(do\s+i|to)\s+(upload|index)/,
    /how\s+(do\s+i|to)\s+(search|query)/,
    /how\s+(do\s+i|to)\s+.*(api|request|call)/,
    /(delete|create|upload|search|query).*(document|corpus|data)/,
    /(api|endpoint|request).*(delete|create|upload|search|query)/,
    /\b(post|get|put|delete)\s+request/,
    /api\s+(call|request|endpoint)/
  ];
  
  const hasCodeRequest = explicitCodeRequestPatterns.some(pattern => 
    pattern.test(lowerContent)
  );
  
  const hasApiRequest = apiOperationPatterns.some(pattern => 
    pattern.test(lowerContent)
  );
  
  if (!hasCodeRequest && !hasApiRequest) {
    return null;
  }
  
  // Determine code type based on content
  if (lowerContent.includes('delete') || lowerContent.includes('remove')) {
    return 'delete';
  }
  
  if (lowerContent.includes('search') || lowerContent.includes('query')) {
    return 'search';
  }
  
  if (lowerContent.includes('upload') || lowerContent.includes('document') || lowerContent.includes('index')) {
    return 'upload';
  }
  
  if (lowerContent.includes('corpus') || lowerContent.includes('create')) {
    return 'corpus';
  }
  
  // Default to search for general API questions
  return 'search';
};

// Enhanced code templates with more comprehensive examples
export const CODE_TEMPLATES: CodeTemplates = {
  search: {
    javascript: {
      template: `// Vectara v2 Chat API Example
// Using real examples from OpenAPI specification
const chatWithVectara = async (message, conversationId = null) => {
  const response = await fetch('https://api.vectara.io/v2/chats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer \${apiKey}'
    },
    body: JSON.stringify({
      query: message,
      search: {
        corpora: [{
          corpus_key: '\${corpusId}',
          semantics: 'default',
          lexical_interpolation: 0.005
        }],
        offset: 0,
        limit: 5,
        context_configuration: {
          sentences_before: 2,
          sentences_after: 2,
          start_tag: '%START_SNIPPET%',
          end_tag: '%END_SNIPPET%'
        },
        reranking: {
          reranker_id: 272725719,  // Multilingual reranker
          max_used_search_results: 10
        }
      },
      generation: {
        prompt_name: 'vectara-summary-ext-24-05-med-omni',
        max_used_search_results: 5,
        response_language: 'eng'
      },
      chat: {
        store: true
      },
      ...(conversationId && { conversation_id: conversationId })
    })
  });
  
  const data = await response.json();
  return {
    answer: data.answer || 'No response received',
    conversationId: data.conversation_id,
    turnId: data.turn_id
  };
};

// Usage
chatWithVectara('\${query}').then(result => {
  console.log('Answer:', result.answer);
  console.log('Conversation ID:', result.conversationId);
});

/* Example Request (from OpenAPI spec):
\${requestExample}
*/

/* Example Response (from OpenAPI spec):
\${responseExample}
*/`,
      parameters: ['corpusId', 'apiKey', 'query', 'requestExample', 'responseExample'],
      description: 'Chat with your Vectara corpus using JavaScript v2 Chat API with real OpenAPI examples'
    },
    
    typescript: {
      template: `// Vectara v2 Chat API Example with TypeScript
interface VectaraV2ChatRequest {
  query: string;
  search: {
    corpora: Array<{
      corpus_key: string;
      semantics?: string;
      lexical_interpolation?: number;
    }>;
    offset?: number;
    limit?: number;
    context_configuration?: {
      sentences_before?: number;
      sentences_after?: number;
      start_tag?: string;
      end_tag?: string;
    };
    reranking?: {
      reranker_id?: number;
      mmr_config?: {
        diversity_bias?: number;
      };
    };
  };
  generation?: {
    prompt_name?: string;
    max_used_search_results?: number;
    response_language?: string;
  };
  chat?: {
    store?: boolean;
  };
  conversation_id?: string;
}

interface VectaraV2ChatResponse {
  answer?: string;
  conversation_id?: string;
  turn_id?: string;
  search_results?: Array<{
    text: string;
    score: number;
    part_metadata?: Record<string, any>;
    document_metadata?: Record<string, any>;
  }>;
}

interface ChatResult {
  answer: string;
  conversationId?: string;
  turnId?: string;
}

const chatWithVectara = async (message: string, conversationId?: string): Promise<ChatResult> => {
  const requestBody: VectaraV2ChatRequest = {
    query: message,
    search: {
      corpora: [{
        corpus_key: '\${corpusId}',
        semantics: 'default',
        lexical_interpolation: 0.005
      }],
      offset: 0,
      limit: 5,
      context_configuration: {
        sentences_before: 2,
        sentences_after: 2,
        start_tag: '%START_SNIPPET%',
        end_tag: '%END_SNIPPET%'
      },
      reranking: {
        reranker_id: 272725718,  // MMR reranker
        mmr_config: {
          diversity_bias: 0.4
        }
      }
    },
    generation: {
      prompt_name: 'vectara-summary-ext-24-05-med-omni',
      max_used_search_results: 5,
      response_language: 'eng'
    },
    chat: {
      store: true
    },
    ...(conversationId && { conversation_id: conversationId })
  };

  const response = await fetch('https://api.vectara.io/v2/chats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer \${apiKey}'
    },
    body: JSON.stringify(requestBody)
  });

  const data: VectaraV2ChatResponse = await response.json();
  return {
    answer: data.answer || 'No response received',
    conversationId: data.conversation_id,
    turnId: data.turn_id
  };
};

// Usage
chatWithVectara('How do I search my corpus?').then(result => {
  console.log('Answer:', result.answer);
  console.log('Conversation ID:', result.conversationId);
});`,
      parameters: ['corpusId', 'apiKey'],
      description: 'Chat with your Vectara corpus using TypeScript v2 Chat API with proper types'
    },
    
    python: {
      template: `# Vectara v2 Chat API Example
import requests
import json

def chat_with_vectara(message, conversation_id=None):
    """Chat with your Vectara corpus using Python v2 Chat API"""
    
    url = "https://api.vectara.io/v2/chats"
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer \${apiKey}"
    }
    
    request_body = {
        "query": message,
        "search": {
            "corpora": [{
                "corpus_key": "\${corpusId}",
                "semantics": "default",
                "lexical_interpolation": 0.005
            }],
            "offset": 0,
            "limit": 5,
            "context_configuration": {
                "sentences_before": 2,
                "sentences_after": 2,
                "start_tag": "%START_SNIPPET%",
                "end_tag": "%END_SNIPPET%"
            },
            "reranking": {
                "reranker_id": 272725718,  # MMR reranker
                "mmr_config": {
                    "diversity_bias": 0.4
                }
            }
        },
        "generation": {
            "prompt_name": "vectara-summary-ext-24-05-med-omni",
            "max_used_search_results": 5,
            "response_language": "eng"
        },
        "chat": {
            "store": True
        }
    }
    
    # Add conversation_id if provided for multi-turn chat
    if conversation_id:
        request_body["conversation_id"] = conversation_id
    
    response = requests.post(url, headers=headers, json=request_body)
    response.raise_for_status()
    
    data = response.json()
    return {
        "answer": data.get("answer", "No response received"),
        "conversation_id": data.get("conversation_id"),
        "turn_id": data.get("turn_id")
    }

# Usage
result = chat_with_vectara("How do I search my corpus?")
print("Answer:", result["answer"])
print("Conversation ID:", result["conversation_id"])

# Continue the conversation
follow_up = chat_with_vectara("Can you show me an example?", result["conversation_id"])
print("Follow-up:", follow_up["answer"])`,
      parameters: ['corpusId', 'apiKey'],
      description: 'Chat with your Vectara corpus using Python v2 Chat API'
    },
    
    curl: {
      template: `# Vectara v2 Chat API Example using cURL
curl -X POST "https://api.vectara.io/v2/chats" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer \${apiKey}" \\
  -d '{
    "query": "How do I search my corpus?",
    "search": {
      "corpora": [{
        "corpus_key": "\${corpusId}",
        "semantics": "default",
        "lexical_interpolation": 0.005
      }],
      "offset": 0,
      "limit": 5,
      "context_configuration": {
        "sentences_before": 2,
        "sentences_after": 2,
        "start_tag": "%START_SNIPPET%",
        "end_tag": "%END_SNIPPET%"
      },
      "reranking": {
        "reranker_id": 272725718,
        "mmr_config": {
          "diversity_bias": 0.4
        }
      }
    },
    "generation": {
      "prompt_name": "vectara-summary-ext-24-05-med-omni",
      "max_used_search_results": 5,
      "response_language": "eng"
    },
    "chat": {
      "store": true
    }
  }'

# For follow-up messages, include the conversation_id:
# curl -X POST "https://api.vectara.io/v2/chats" \\
#   -H "Content-Type: application/json" \\
#   -H "Authorization: Bearer \${apiKey}" \\
#   -d '{
#     "query": "Can you show me an example?",
#     "conversation_id": "YOUR_CONVERSATION_ID_FROM_PREVIOUS_RESPONSE",
#     "search": { ... same search config ... },
#     "generation": { ... same generation config ... },
#     "chat": { "store": true }
#   }'`,
      parameters: ['corpusId', 'apiKey'],
      description: 'Chat with your Vectara corpus using cURL v2 Chat API'
    }
  },

  corpus: {
    javascript: {
      template: `// Create a new Vectara corpus
// Using v2 API for corpus management
const createCorpus = async (corpusName, customerId, apiKey) => {
  const response = await fetch('https://api.vectara.io/v2/corpora', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer \${apiKey}',
      'customer-id': '\${customerId}'
    },
    body: JSON.stringify({
      name: '\${corpusName}',
      description: 'Corpus created via API',
      metadata: {
        source: 'api-creation',
        timestamp: new Date().toISOString()
      }
    })
  });

  const result = await response.json();
  console.log('Corpus created:', result);
  return result;
};

// Example usage:
createCorpus('My New Corpus', 'YOUR_CUSTOMER_ID', 'YOUR_API_KEY');`,
      parameters: ['corpusName', 'customerId', 'apiKey'],
      description: 'Create a new Vectara corpus using JavaScript v2 API'
    },
    typescript: {
      template: `// Create a new Vectara corpus
// Using v2 API with proper TypeScript types
interface CorpusRequest {
  name: string;
  description: string;
  metadata?: Record<string, any>;
}

interface CorpusResponse {
  corpusId: string;
  name: string;
  description: string;
  created: string;
}

const createCorpus = async (
  corpusName: string,
  customerId: string,
  apiKey: string
): Promise<CorpusResponse> => {
  const response = await fetch('https://api.vectara.io/v2/corpora', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer \${apiKey}',
      'customer-id': '\${customerId}'
    },
    body: JSON.stringify({
      name: '\${corpusName}',
      description: 'Corpus created via API',
      metadata: {
        source: 'api-creation',
        timestamp: new Date().toISOString()
      }
    })
  });

  const result = await response.json();
  console.log('Corpus created:', result);
  return result;
};

// Example usage:
createCorpus('My New Corpus', 'YOUR_CUSTOMER_ID', 'YOUR_API_KEY');`,
      parameters: ['corpusName', 'customerId', 'apiKey'],
      description: 'Create a new Vectara corpus using TypeScript v2 API'
    },
    python: {
      template: `"""Create a new Vectara corpus
Using v2 API for corpus management
"""
import requests
import json
from datetime import datetime

def create_corpus(corpus_name, customer_id, api_key):
    url = "https://api.vectara.io/v2/corpora"

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}',
        'customer-id': customer_id
    }

    data = {
        "name": corpus_name,
        "description": "Corpus created via API",
        "metadata": {
            "source": "api-creation",
            "timestamp": datetime.now().isoformat()
        }
    }

    response = requests.post(url, headers=headers, json=data)
    result = response.json()
    print(f"Corpus created: {result}")
    return result

# Example usage:
create_corpus("My New Corpus", "YOUR_CUSTOMER_ID", "YOUR_API_KEY")`,
      parameters: ['corpusName', 'customerId', 'apiKey'],
      description: 'Create a new Vectara corpus using Python v2 API'
    },
    curl: {
      template: `curl -X POST "https://api.vectara.io/v2/corpora" \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer \${apiKey}" \\
  -H "customer-id: \${customerId}" \\
  -d '{
    "name": "\${corpusName}",
    "description": "Corpus created via API",
    "metadata": {
      "source": "api-creation",
      "timestamp": "'$(date -u +%Y-%m-%dT%H:%M:%S.%3NZ)'"
    }
  }'`,
      parameters: ['corpusName', 'customerId', 'apiKey'],
      description: 'Create a new Vectara corpus using cURL v2 API'
    }
  },

  upload: {
    javascript: {
      template: `// Vectara Document Upload Example
const uploadDocument = async (file, metadata = {}) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('doc_metadata', JSON.stringify(metadata));
  
  const response = await fetch('https://api.vectara.io/v1/upload?c=\${customerId}&o=\${corpusId}', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer \${apiKey}'
    },
    body: formData
  });
  
  if (!response.ok) {
    throw new Error(\`Upload failed: \${response.statusText}\`);
  }
  
  return await response.json();
};

// Usage
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];
const metadata = { title: 'My Document', author: 'John Doe' };

uploadDocument(file, metadata)
  .then(result => console.log('Upload successful:', result))
  .catch(error => console.error('Upload failed:', error));`,
      parameters: ['customerId', 'corpusId', 'apiKey'],
      description: 'Upload documents to your Vectara corpus using JavaScript'
    },
    
    python: {
      template: `# Vectara Document Upload Example
import requests

def upload_document(file_path, metadata=None):
    """Upload a document to your Vectara corpus"""
    
    url = f"https://api.vectara.io/v1/upload?c=\${customerId}&o=\${corpusId}"
    
    headers = {
        "Authorization": "Bearer \${apiKey}"
    }
    
    with open(file_path, 'rb') as file:
        files = {'file': file}
        data = {}
        
        if metadata:
            data['doc_metadata'] = json.dumps(metadata)
        
        response = requests.post(url, headers=headers, files=files, data=data)
    
    response.raise_for_status()
    return response.json()

# Usage
metadata = {"title": "My Document", "author": "John Doe"}
result = upload_document("path/to/your/document.pdf", metadata)
print("Upload successful:", result)`,
      parameters: ['customerId', 'corpusId', 'apiKey'],
      description: 'Upload documents to your Vectara corpus using Python'
    },
    
    curl: {
      template: `# Vectara Document Upload using cURL
curl -X POST "https://api.vectara.io/v1/upload?c=\${customerId}&o=\${corpusId}" \\
  -H "Authorization: Bearer \${apiKey}" \\
  -F "file=@/path/to/your/document.pdf" \\
  -F 'doc_metadata={"title": "My Document", "author": "John Doe"}'`,
      parameters: ['customerId', 'corpusId', 'apiKey'],
      description: 'Upload documents to your Vectara corpus using cURL'
    }
  },
  delete: {
    javascript: {
      template: `// Delete a document from Vectara corpus
const deleteDocument = async (documentId) => {
  const response = await fetch(\`https://api.vectara.io/v1/corpora/\${corpusId}/documents/\${documentId}\`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer \${apiKey}',
      'customer-id': '\${customerId}'
    }
  });
  
  if (!response.ok) {
    throw new Error(\`Failed to delete document: \${response.status} \${response.statusText}\`);
  }
  
  return { success: true, documentId };
};

// Usage
deleteDocument('doc-123').then(result => {
  console.log('Document deleted:', result);
}).catch(error => {
  console.error('Error:', error);
});`,
      parameters: ['customerId', 'corpusId', 'apiKey'],
      description: 'Delete a document from your Vectara corpus'
    },
    python: {
      template: `# Delete a document from Vectara corpus
import requests

def delete_document(document_id, customer_id, corpus_id, api_key):
    url = f"https://api.vectara.io/v1/corpora/{corpus_id}/documents/{document_id}"
    headers = {
        'Authorization': f'Bearer {api_key}',
        'customer-id': customer_id
    }
    
    response = requests.delete(url, headers=headers)
    response.raise_for_status()
    
    return {"success": True, "document_id": document_id}

# Usage
try:
    result = delete_document(
        document_id='doc-123',
        customer_id='\${customerId}',
        corpus_id='\${corpusId}', 
        api_key='\${apiKey}'
    )
    print(f"Document deleted: {result}")
except requests.exceptions.RequestException as e:
    print(f"Error: {e}")`,
      parameters: ['customerId', 'corpusId', 'apiKey'],
      description: 'Delete a document from your Vectara corpus using Python'
    },
    curl: {
      template: `# Delete a document from Vectara corpus
curl -X DELETE "https://api.vectara.io/v1/corpora/\${corpusId}/documents/doc-123" \\
  -H "Authorization: Bearer \${apiKey}" \\
  -H "customer-id: \${customerId}"`,
      parameters: ['customerId', 'corpusId', 'apiKey'],
      description: 'Delete a document from your Vectara corpus using cURL'
    }
  }
};

// Generate code with parameter substitution
export const generateCode = async (
  codeType: string, 
  language: SupportedLanguage, 
  parameters: Record<string, any> = {}
): Promise<string> => {
  const template = CODE_TEMPLATES[codeType]?.[language];
  
  if (!template) {
    return `// ${language} example for ${codeType} not available`;
  }
  
  let code = template.template;
  
  // Apply context-aware parameter substitutions with OpenAPI examples
  let contextParams;
  try {
    contextParams = await applyContextualParameters(parameters, codeType, language);
  } catch (error) {
    console.warn('Failed to load OpenAPI context, using fallback parameters:', error);
    contextParams = { ...parameters };
  }
  
  // Replace parameter placeholders
  template.parameters.forEach(param => {
    const value = contextParams[param] || parameters[param] || getDefaultParameterValue(param, codeType);
    const regex = new RegExp(`\\$\\{${param}\\}`, 'g');
    code = code.replace(regex, value);
  });
  
  return code;
};

// Synchronous wrapper for backward compatibility
export const generateCodeSync = (
  codeType: string, 
  language: SupportedLanguage, 
  parameters: Record<string, any> = {}
): string => {
  const template = CODE_TEMPLATES[codeType]?.[language];
  
  if (!template) {
    return `// ${language} example for ${codeType} not available`;
  }
  
  let code = template.template;
  
  // Use synchronous fallback parameters
  template.parameters.forEach(param => {
    const value = parameters[param] || getDefaultParameterValue(param, codeType);
    const regex = new RegExp(`\\$\\{${param}\\}`, 'g');
    code = code.replace(regex, value);
  });
  
  return code;
};

// Apply contextual intelligence to parameters using OpenAPI examples
const applyContextualParameters = async (params: Record<string, any>, codeType: string, language: string): Promise<Record<string, any>> => {
  const contextParams = { ...params };
  
  // Use actual values from the current configuration if available
  if (typeof window !== 'undefined' && (window as any).VECTARA_CONFIG) {
    const config = (window as any).VECTARA_CONFIG;
    if (!contextParams.customerId && config.customerId) contextParams.customerId = config.customerId;
    if (!contextParams.corpusKey && config.corpusKeys?.[0]) contextParams.corpusKey = config.corpusKeys[0];
    if (!contextParams.apiKey && config.apiKey) contextParams.apiKey = config.apiKey.substring(0, 20) + '...';
  }
  
  // Get OpenAPI examples for enhanced context
  try {
    const examples = await getOpenAPIExamples();
    const relevantExamples = getExamplesForOperation(params.operation || codeType, examples);
    
    if (relevantExamples.length > 0) {
      const example = relevantExamples[0]; // Use first relevant example
      contextParams.endpoint = example.endpoint;
      contextParams.method = example.method;
      
      // Use actual request/response examples from OpenAPI spec
      if (example.requestExample) {
        contextParams.requestExample = JSON.stringify(example.requestExample, null, 2);
      }
      if (example.responseExample) {
        contextParams.responseExample = JSON.stringify(example.responseExample, null, 2);
      }
      
      // Use parameter examples
      if (example.parameters) {
        example.parameters.forEach(param => {
          if (!contextParams[param.name]) {
            contextParams[param.name] = param.example;
          }
        });
      }
    }
  } catch (error) {
    console.warn('Could not load OpenAPI examples, using fallback:', error);
  }
  
  // Fallback endpoint selection
  if (!contextParams.endpoint) {
    if (params.operation === 'search') {
      contextParams.endpoint = '/v2/chats';
    } else if (params.operation === 'upload') {
      contextParams.endpoint = `/v2/corpora/\${corpusKey}/documents`;
    } else if (params.operation === 'corpus') {
      contextParams.endpoint = '/v2/corpora';
    }
  }
  
  return contextParams;
};

// Get intelligent default values based on context
const getDefaultParameterValue = (param: string, codeType: string): string => {
  const defaults: Record<string, Record<string, string>> = {
    search: {
      query: 'What is semantic search?',
      customerId: 'YOUR_CUSTOMER_ID',
      corpusKey: 'your-corpus-key',
      apiKey: 'YOUR_API_KEY'
    },
    upload: {
      customerId: 'YOUR_CUSTOMER_ID', 
      corpusKey: 'your-corpus-key',
      apiKey: 'YOUR_API_KEY',
      documentId: 'doc-123',
      title: 'My Document'
    },
    corpus: {
      customerId: 'YOUR_CUSTOMER_ID',
      apiKey: 'YOUR_API_KEY',
      corpusName: 'My Corpus',
      description: 'Documents for my application'
    }
  };
  
  return defaults[codeType]?.[param] || `YOUR_${param.toUpperCase()}`;
};