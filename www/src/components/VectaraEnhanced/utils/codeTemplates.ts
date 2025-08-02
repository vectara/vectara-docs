// Enhanced Code Generation Templates
// Intelligent code generation based on user queries and context

import { SupportedLanguage, CodeTemplates } from '../types';

// More restrictive detection to avoid cluttering responses
export const detectCodeType = (content: string): string | null => {
  const lowerContent = content.toLowerCase();
  
  // Only trigger auto code generation for very specific, explicit code requests
  const codeRequestPatterns = [
    /show\s+me\s+(code|example)/,
    /how\s+do\s+i\s+(implement|code)/,
    /give\s+me\s+(code|example)/,
    /(javascript|python|typescript|curl)\s+(code|example)/,
    /code\s+(example|sample)/,
    /implementation\s+in\s+(javascript|python|typescript)/
  ];
  
  const hasExplicitCodeRequest = codeRequestPatterns.some(pattern => 
    pattern.test(lowerContent)
  );
  
  if (!hasExplicitCodeRequest) {
    return null;
  }
  
  // Determine code type based on content
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
      template: `// Vectara Search Example
const searchVectara = async (query) => {
  const response = await fetch('https://api.vectara.io/v1/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'customer-id': '\${customerId}',
      'Authorization': 'Bearer \${apiKey}'
    },
    body: JSON.stringify({
      query: [{
        query: query,
        queryContext: '',
        start: 0,
        numResults: 10,
        contextConfig: {
          charsBefore: 0,
          charsAfter: 0,
          sentencesBefore: 2,
          sentencesAfter: 2,
          startTag: '%START_SNIPPET%',
          endTag: '%END_SNIPPET%'
        },
        corpusKey: [{
          customerId: parseInt('\${customerId}'),
          corpusId: parseInt('\${corpusId}'),
          semantics: 'DEFAULT',
          metadataFilter: '',
          lexicalInterpolationConfig: {
            lambda: 0.005
          }
        }],
        summary: [{
          maxSummarizedResults: 10,
          responseLang: 'eng',
          summarizerPromptName: 'vectara-summary-ext-24-05-med-omni'
        }]
      }]
    })
  });
  
  const data = await response.json();
  return data.responseSet?.[0]?.summary?.[0]?.text || 'No response received';
};

// Usage
searchVectara('How do I search my corpus?').then(console.log);`,
      parameters: ['customerId', 'corpusId', 'apiKey'],
      description: 'Search your Vectara corpus using JavaScript'
    },
    
    typescript: {
      template: `// Vectara Search Example with TypeScript
interface VectaraSearchRequest {
  query: Array<{
    query: string;
    queryContext: string;
    start: number;
    numResults: number;
    contextConfig: {
      charsBefore: number;
      charsAfter: number;
      sentencesBefore: number;
      sentencesAfter: number;
      startTag: string;
      endTag: string;
    };
    corpusKey: Array<{
      customerId: number;
      corpusId: number;
      semantics: string;
      metadataFilter: string;
      lexicalInterpolationConfig: {
        lambda: number;
      };
    }>;
    summary: Array<{
      maxSummarizedResults: number;
      responseLang: string;
      summarizerPromptName: string;
    }>;
  }>;
}

interface VectaraSearchResponse {
  responseSet?: Array<{
    summary?: Array<{
      text: string;
    }>;
    response?: Array<{
      text: string;
      score: number;
      metadata: Array<{
        name: string;
        value: string;
      }>;
    }>;
  }>;
}

const searchVectara = async (query: string): Promise<string> => {
  const requestBody: VectaraSearchRequest = {
    query: [{
      query,
      queryContext: '',
      start: 0,
      numResults: 10,
      contextConfig: {
        charsBefore: 0,
        charsAfter: 0,
        sentencesBefore: 2,
        sentencesAfter: 2,
        startTag: '%START_SNIPPET%',
        endTag: '%END_SNIPPET%'
      },
      corpusKey: [{
        customerId: parseInt('\${customerId}'),
        corpusId: parseInt('\${corpusId}'),
        semantics: 'DEFAULT',
        metadataFilter: '',
        lexicalInterpolationConfig: {
          lambda: 0.005
        }
      }],
      summary: [{
        maxSummarizedResults: 10,
        responseLang: 'eng',
        summarizerPromptName: 'vectara-summary-ext-24-05-med-omni'
      }]
    }]
  };

  const response = await fetch('https://api.vectara.io/v1/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'customer-id': '\${customerId}',
      'Authorization': 'Bearer \${apiKey}'
    },
    body: JSON.stringify(requestBody)
  });

  const data: VectaraSearchResponse = await response.json();
  return data.responseSet?.[0]?.summary?.[0]?.text || 'No response received';
};

// Usage
searchVectara('How do I search my corpus?').then(console.log);`,
      parameters: ['customerId', 'corpusId', 'apiKey'],
      description: 'Search your Vectara corpus using TypeScript with proper types'
    },
    
    python: {
      template: `# Vectara Search Example
import requests
import json

def search_vectara(query):
    """Search your Vectara corpus using Python"""
    
    url = "https://api.vectara.io/v1/query"
    
    headers = {
        "Content-Type": "application/json",
        "customer-id": "\${customerId}",
        "Authorization": "Bearer \${apiKey}"
    }
    
    request_body = {
        "query": [{
            "query": query,
            "queryContext": "",
            "start": 0,
            "numResults": 10,
            "contextConfig": {
                "charsBefore": 0,
                "charsAfter": 0,
                "sentencesBefore": 2,
                "sentencesAfter": 2,
                "startTag": "%START_SNIPPET%",
                "endTag": "%END_SNIPPET%"
            },
            "corpusKey": [{
                "customerId": int("\${customerId}"),
                "corpusId": int("\${corpusId}"),
                "semantics": "DEFAULT",
                "metadataFilter": "",
                "lexicalInterpolationConfig": {
                    "lambda": 0.005
                }
            }],
            "summary": [{
                "maxSummarizedResults": 10,
                "responseLang": "eng",
                "summarizerPromptName": "vectara-summary-ext-24-05-med-omni"
            }]
        }]
    }
    
    response = requests.post(url, headers=headers, json=request_body)
    response.raise_for_status()
    
    data = response.json()
    return data.get("responseSet", [{}])[0].get("summary", [{}])[0].get("text", "No response received")

# Usage
result = search_vectara("How do I search my corpus?")
print(result)`,
      parameters: ['customerId', 'corpusId', 'apiKey'],
      description: 'Search your Vectara corpus using Python'
    },
    
    curl: {
      template: `# Vectara Search Example using cURL
curl -X POST "https://api.vectara.io/v1/query" \\
  -H "Content-Type: application/json" \\
  -H "customer-id: \${customerId}" \\
  -H "Authorization: Bearer \${apiKey}" \\
  -d '{
    "query": [{
      "query": "How do I search my corpus?",
      "queryContext": "",
      "start": 0,
      "numResults": 10,
      "contextConfig": {
        "charsBefore": 0,
        "charsAfter": 0,
        "sentencesBefore": 2,
        "sentencesAfter": 2,
        "startTag": "%START_SNIPPET%",
        "endTag": "%END_SNIPPET%"
      },
      "corpusKey": [{
        "customerId": \${customerId},
        "corpusId": \${corpusId},
        "semantics": "DEFAULT",
        "metadataFilter": "",
        "lexicalInterpolationConfig": {
          "lambda": 0.005
        }
      }],
      "summary": [{
        "maxSummarizedResults": 10,
        "responseLang": "eng",
        "summarizerPromptName": "vectara-summary-ext-24-05-med-omni"
      }]
    }]
  }'`,
      parameters: ['customerId', 'corpusId', 'apiKey'],
      description: 'Search your Vectara corpus using cURL'
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
  }
};

// Generate code with parameter substitution
export const generateCode = (
  codeType: string, 
  language: SupportedLanguage, 
  parameters: Record<string, any> = {}
): string => {
  const template = CODE_TEMPLATES[codeType]?.[language];
  
  if (!template) {
    return `// ${language} example for ${codeType} not available`;
  }
  
  let code = template.template;
  
  // Replace parameter placeholders
  template.parameters.forEach(param => {
    const value = parameters[param] || `YOUR_${param.toUpperCase()}`;
    const regex = new RegExp(`\\$\\{${param}\\}`, 'g');
    code = code.replace(regex, value);
  });
  
  return code;
};