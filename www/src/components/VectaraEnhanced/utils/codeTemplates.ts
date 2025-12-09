// Enhanced Code Generation Templates - Simplified
// Static code templates without runtime OpenAPI fetching

import { SupportedLanguage, CodeTemplates } from '../types';

// Detect when users are asking about API operations that could benefit from code examples
export const detectCodeType = (content: string): string | null => {
  const lowerContent = content.toLowerCase();

  // Check for delete operations
  if (lowerContent.match(/\b(delete|remove)\b.*\b(document|doc)\b/)) {
    return 'delete';
  }

  // Check for search/query operations
  if (lowerContent.match(/\b(search|query|find|chat)\b/)) {
    return 'search';
  }

  // Check for upload/index operations
  if (lowerContent.match(/\b(upload|add|create|index)\b.*\b(document|doc)\b/)) {
    return 'upload';
  }

  // Check for corpus management
  if (lowerContent.match(/\b(corpus|corpora|create.*corpus)\b/)) {
    return 'corpus';
  }

  return null;
};

// Check if query warrants code examples
export const shouldProvideCodeExamples = (query: string): boolean => {
  const keywords = [
    'show code', 'give me code', 'example code', 'how to code',
    'how do i', 'how can i', 'show me', 'api call', 'endpoint',
    'code example', 'sample code', 'implementation'
  ];

  const lowerQuery = query.toLowerCase();
  return keywords.some(keyword => lowerQuery.includes(keyword));
};

// Static code templates
export const CODE_TEMPLATES: CodeTemplates = {
  search: {
    javascript: {
      template: `// Search using Vectara Chat API (v2)
const response = await fetch('https://api.vectara.io/v2/chats', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    query: "What is semantic search?",
    search: {
      corpora: [{
        corpus_key: "YOUR_CORPUS_KEY",
        lexical_interpolation: 0.005
      }],
      limit: 5,
      context_configuration: {
        sentences_before: 2,
        sentences_after: 2
      }
    },
    generation: {
      max_used_search_results: 5,
      prompt_name: "vectara-summary-ext-24-05-med-omni"
    },
    chat: {
      store: true
    }
  })
});

const data = await response.json();
console.log('Answer:', data.answer);
console.log('Conversation ID:', data.conversation_id);`,
      parameters: ['apiKey', 'corpusKey'],
      description: 'Search and chat with your Vectara corpus using JavaScript'
    },

    typescript: {
      template: `// Search using Vectara Chat API (v2) with TypeScript
interface ChatRequest {
  query: string;
  search: {
    corpora: Array<{
      corpus_key: string;
      lexical_interpolation?: number;
    }>;
    limit?: number;
  };
  generation?: {
    max_used_search_results?: number;
    prompt_name?: string;
  };
  chat?: {
    store?: boolean;
  };
}

interface ChatResponse {
  answer: string;
  conversation_id: string;
  turn_id: string;
  search_results?: Array<any>;
}

const searchVectara = async (query: string): Promise<ChatResponse> => {
  const response = await fetch('https://api.vectara.io/v2/chats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      query,
      search: {
        corpora: [{ corpus_key: "YOUR_CORPUS_KEY" }],
        limit: 5
      },
      generation: {
        max_used_search_results: 5
      }
    } as ChatRequest)
  });

  if (!response.ok) {
    throw new Error(\`API error: \${response.status}\`);
  }

  return response.json();
};

// Usage
searchVectara("What is semantic search?").then(result => {
  console.log('Answer:', result.answer);
});`,
      parameters: ['apiKey', 'corpusKey'],
      description: 'Search with TypeScript types for type safety'
    },

    python: {
      template: `# Search using Vectara Chat API (v2)
import requests
import json

def search_vectara(query: str, api_key: str, corpus_key: str):
    response = requests.post(
        'https://api.vectara.io/v2/chats',
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        },
        json={
            'query': query,
            'search': {
                'corpora': [{'corpus_key': corpus_key}],
                'limit': 5
            },
            'generation': {
                'max_used_search_results': 5
            },
            'chat': {
                'store': True
            }
        }
    )

    response.raise_for_status()
    data = response.json()

    return {
        'answer': data.get('answer'),
        'conversation_id': data.get('conversation_id')
    }

# Usage
result = search_vectara(
    "What is semantic search?",
    "YOUR_API_KEY",
    "YOUR_CORPUS_KEY"
)
print('Answer:', result['answer'])`,
      parameters: ['apiKey', 'corpusKey'],
      description: 'Search using Python with error handling'
    },

    curl: {
      template: `# Search using Vectara Chat API (v2)
curl -X POST https://api.vectara.io/v2/chats \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "query": "What is semantic search?",
    "search": {
      "corpora": [{"corpus_key": "YOUR_CORPUS_KEY"}],
      "limit": 5
    },
    "generation": {
      "max_used_search_results": 5
    },
    "chat": {
      "store": true
    }
  }'`,
      parameters: ['apiKey', 'corpusKey'],
      description: 'Search using cURL command'
    }
  },

  upload: {
    javascript: {
      template: `// Upload document to Vectara corpus
const response = await fetch('https://api.vectara.io/v2/corpora/YOUR_CORPUS_KEY/documents', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    type: 'core',
    document_id: 'doc_123',
    metadata: {
      title: 'My Document',
      author: 'John Doe',
      date: new Date().toISOString()
    },
    parts: [
      {
        text: 'This is the content of my document. It can contain multiple paragraphs and will be indexed for semantic search.',
        metadata: {
          section: 'introduction'
        }
      }
    ]
  })
});

const result = await response.json();
console.log('Document uploaded:', result.document_id);`,
      parameters: ['apiKey', 'corpusKey'],
      description: 'Upload a document to your Vectara corpus'
    },

    python: {
      template: `# Upload document to Vectara corpus
import requests

def upload_document(api_key: str, corpus_key: str, document_id: str, content: str):
    response = requests.post(
        f'https://api.vectara.io/v2/corpora/{corpus_key}/documents',
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        },
        json={
            'type': 'core',
            'document_id': document_id,
            'metadata': {
                'title': 'My Document',
                'author': 'John Doe'
            },
            'parts': [
                {
                    'text': content,
                    'metadata': {'section': 'main'}
                }
            ]
        }
    )

    response.raise_for_status()
    return response.json()

# Usage
result = upload_document(
    "YOUR_API_KEY",
    "YOUR_CORPUS_KEY",
    "doc_123",
    "This is my document content..."
)
print('Document ID:', result['document_id'])`,
      parameters: ['apiKey', 'corpusKey'],
      description: 'Upload document using Python'
    },

    curl: {
      template: `# Upload document to Vectara corpus
curl -X POST https://api.vectara.io/v2/corpora/YOUR_CORPUS_KEY/documents \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "type": "core",
    "document_id": "doc_123",
    "metadata": {
      "title": "My Document",
      "author": "John Doe"
    },
    "parts": [
      {
        "text": "This is the content of my document...",
        "metadata": {"section": "introduction"}
      }
    ]
  }'`,
      parameters: ['apiKey', 'corpusKey'],
      description: 'Upload document using cURL'
    }
  },

  delete: {
    javascript: {
      template: `// Delete document from Vectara corpus
const response = await fetch('https://api.vectara.io/v2/corpora/YOUR_CORPUS_KEY/documents/doc_123', {
  method: 'DELETE',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY'
  }
});

if (response.ok) {
  console.log('Document deleted successfully');
} else {
  console.error('Delete failed:', response.status);
}`,
      parameters: ['apiKey', 'corpusKey'],
      description: 'Delete a document from your corpus'
    },

    python: {
      template: `# Delete document from Vectara corpus
import requests

def delete_document(api_key: str, corpus_key: str, document_id: str):
    response = requests.delete(
        f'https://api.vectara.io/v2/corpora/{corpus_key}/documents/{document_id}',
        headers={
            'Authorization': f'Bearer {api_key}'
        }
    )

    response.raise_for_status()
    return {'success': True}

# Usage
delete_document("YOUR_API_KEY", "YOUR_CORPUS_KEY", "doc_123")
print('Document deleted')`,
      parameters: ['apiKey', 'corpusKey'],
      description: 'Delete document using Python'
    },

    curl: {
      template: `# Delete document from Vectara corpus
curl -X DELETE https://api.vectara.io/v2/corpora/YOUR_CORPUS_KEY/documents/doc_123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
      parameters: ['apiKey', 'corpusKey'],
      description: 'Delete document using cURL'
    }
  },

  corpus: {
    javascript: {
      template: `// Create a new Vectara corpus
const response = await fetch('https://api.vectara.io/v2/corpora', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    key: 'my-corpus',
    name: 'My Corpus',
    description: 'Documents for my application',
    queries_are_answers: false,
    filter_attributes: [
      {
        name: 'category',
        level: 'document',
        type: 'text',
        indexed: true
      }
    ]
  })
});

const corpus = await response.json();
console.log('Corpus created:', corpus.key);`,
      parameters: ['apiKey'],
      description: 'Create a new corpus'
    },

    python: {
      template: `# Create a new Vectara corpus
import requests

def create_corpus(api_key: str, corpus_key: str, name: str):
    response = requests.post(
        'https://api.vectara.io/v2/corpora',
        headers={
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {api_key}'
        },
        json={
            'key': corpus_key,
            'name': name,
            'description': 'Documents for my application',
            'queries_are_answers': False
        }
    )

    response.raise_for_status()
    return response.json()

# Usage
corpus = create_corpus("YOUR_API_KEY", "my-corpus", "My Corpus")
print('Corpus key:', corpus['key'])`,
      parameters: ['apiKey'],
      description: 'Create corpus using Python'
    },

    curl: {
      template: `# Create a new Vectara corpus
curl -X POST https://api.vectara.io/v2/corpora \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{
    "key": "my-corpus",
    "name": "My Corpus",
    "description": "Documents for my application",
    "queries_are_answers": false
  }'`,
      parameters: ['apiKey'],
      description: 'Create corpus using cURL'
    }
  }
};

// Generate code snippet with parameter substitution
export const generateCodeSnippet = (
  codeType: string,
  language: string,
  params?: Record<string, string>
): string => {
  const template = CODE_TEMPLATES[codeType]?.[language];
  if (!template) return '';

  let code = template.template;

  // Simple parameter substitution
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      const placeholder = new RegExp(`YOUR_${key.toUpperCase()}`, 'g');
      code = code.replace(placeholder, value);
    }
  }

  return code;
};

// Synchronous code generation (simplified)
export const generateCodeSync = (
  language: SupportedLanguage,
  codeType: string,
  params?: Record<string, string>
): string => {
  return generateCodeSnippet(codeType, language, params);
};
