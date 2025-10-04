---
id: codepanel-examples
title: CodePanel Examples
sidebar_label: CodePanel Examples
---

import CodePanel from '@site/src/theme/CodePanel';

## Basic Examples

### 1. Minimal Usage (Single Language)
The simplest possible implementation - just code and a language.

<CodePanel
  snippets={[
    {
      language: 'bash',
      code: `curl -X POST https://api.example.com/search`
    }
  ]}
/>

---

### 2. Custom Title
Adding a descriptive title to the panel.

<CodePanel
  title="Quick Start"
  snippets={[
    {
      language: 'python',
      code: `import requests

response = requests.get('https://api.example.com')
print(response.json())`
    }
  ]}
  layout="stacked"
/>

---

### 3. Custom Width (Floating)
Control the width of floating panels with the `customWidth` prop.

<CodePanel
  title="API Request"
  customWidth="600px"
  snippets={[
    {
      language: 'javascript',
      code: `fetch('https://api.example.com/data')
  .then(res => res.json())
  .then(data => console.log(data));`
    }
  ]}
/>

---

### 4. Always Expanded (No Collapse)
Disable auto-collapse to always show the full code, regardless of length.

<CodePanel
  title="Full Configuration"
  collapsible={false}
  snippets={[
    {
      language: 'json',
      code: `{
  "apiKey": "your-api-key",
  "endpoint": "https://api.example.com",
  "timeout": 5000,
  "retryAttempts": 3,
  "retryDelay": 1000,
  "headers": {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  "cors": {
    "enabled": true,
    "allowedOrigins": ["*"]
  },
  "logging": {
    "level": "info",
    "format": "json"
  },
  "cache": {
    "enabled": true,
    "ttl": 3600
  },
  "rateLimiting": {
    "enabled": true,
    "maxRequests": 100,
    "windowMs": 60000
  },
  "validation": {
    "strict": true,
    "schemas": true
  }
}`
    }
  ]}
  layout="stacked"
/>

---

### 5. Vectara Agent Creation
Create a new Vectara agent with specific configuration.

<CodePanel
  title="Create Agent"
  tabs={true}
  snippets={[
    {
      language: 'python',
      code: `import requests

url = "https://api.vectara.io/v2/agents"
headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

payload = {
    "name": "Customer Support Agent",
    "description": "AI agent for handling customer inquiries",
    "corpus_ids": ["corp_123", "corp_456"],
    "model": "gpt-4",
    "temperature": 0.7
}

response = requests.post(url, headers=headers, json=payload)
agent = response.json()
print(f"Agent created with ID: {agent['id']}")`
    },
    {
      language: 'javascript',
      code: `const url = 'https://api.vectara.io/v2/agents';
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};

const payload = {
  name: 'Customer Support Agent',
  description: 'AI agent for handling customer inquiries',
  corpus_ids: ['corp_123', 'corp_456'],
  model: 'gpt-4',
  temperature: 0.7
};

const response = await fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(payload)
});

const agent = await response.json();
console.log(\`Agent created with ID: \${agent.id}\`);`
    },
    {
      language: 'curl',
      code: `curl -X POST https://api.vectara.io/v2/agents \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Customer Support Agent",
    "description": "AI agent for handling customer inquiries",
    "corpus_ids": ["corp_123", "corp_456"],
    "model": "gpt-4",
    "temperature": 0.7
  }'`
    }
  ]}
  layout="stacked"
/>

---

## Medium Complexity Examples

### 6. Multiple Languages (Dropdown)
Show the same functionality in different languages with a dropdown selector.

<CodePanel
  title="Multi-Language Example"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `import requests

headers = {"Authorization": "Bearer YOUR_API_KEY"}
response = requests.post(
    "https://api.example.com/search",
    headers=headers,
    json={"query": "hello world"}
)
print(response.json())`
    },
    {
      language: 'javascript',
      code: `const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};

fetch('https://api.example.com/search', {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({query: 'hello world'})
})
.then(res => res.json())
.then(data => console.log(data));`
    },
    {
      language: 'bash',
      code: `curl -X POST https://api.example.com/search \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"query": "hello world"}'`
    }
  ]}
  layout="stacked"
/>

---

### 7. Database Connection with Error Handling
Demonstrate proper error handling patterns with highlighted error-checking lines.

<CodePanel
  title="Database Connection"
  highlightLines="7-9,14-16"
  snippets={[
    {
      language: 'python',
      code: `import psycopg2
from contextlib import contextmanager

@contextmanager
def get_db_connection():
    conn = None
    try:
        conn = psycopg2.connect(
            host="localhost",
            database="mydb",
            user="user",
            password="password"
        )
        yield conn
    except psycopg2.Error as e:
        print(f"Database error: {e}")
        raise
    finally:
        if conn:
            conn.close()

# Usage
with get_db_connection() as db:
    cursor = db.cursor()
    cursor.execute("SELECT * FROM users")
    results = cursor.fetchall()`
    }
  ]}
  annotations={{
    python: [
      { line: 7, text: 'Connection wrapped in try-except for error handling' },
      { line: 14, text: 'Catch and log database-specific errors' },
      { line: 18, text: 'Always close connection in finally block' }
    ]
  }}
  layout="stacked"
/>

---

### 8. Tabs Mode
Use tabs instead of a dropdown for language selection.

<CodePanel
  title="API Authentication"
  tabs={true}
  snippets={[
    {
      language: 'python',
      code: `from your_sdk import Client

client = Client(api_key="YOUR_API_KEY")
result = client.search(query="hello world")
print(result)`
    },
    {
      language: 'javascript',
      code: `import { Client } from 'your-sdk';

const client = new Client({apiKey: 'YOUR_API_KEY'});
const result = await client.search({query: 'hello world'});
console.log(result);`
    },
    {
      language: 'curl',
      code: `curl -X POST https://api.example.com/search \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -d '{"query": "hello world"}'`
    }
  ]}
  layout="stacked"
/>

---

### 9. Vectara Agent Chat
Send a message to a Vectara agent and stream the response.

<CodePanel
  title="Agent Chat"
  tabs={true}
  highlightLines="11-13"
  snippets={[
    {
      language: 'python',
      code: `import requests

agent_id = "agent_abc123"
url = f"https://api.vectara.io/v2/agents/{agent_id}/chat"

headers = {
    "Authorization": "Bearer YOUR_API_KEY",
    "Content-Type": "application/json"
}

payload = {
    "message": "What are your return policies?",
    "stream": True
}

response = requests.post(url, headers=headers, json=payload, stream=True)

for line in response.iter_lines():
    if line:
        chunk = line.decode('utf-8')
        print(chunk, end='', flush=True)`
    },
    {
      language: 'javascript',
      code: `const agentId = 'agent_abc123';
const url = \`https://api.vectara.io/v2/agents/\${agentId}/chat\`;

const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};

const payload = {
  message: 'What are your return policies?',
  stream: true
};

const response = await fetch(url, {
  method: 'POST',
  headers: headers,
  body: JSON.stringify(payload)
});

const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const {done, value} = await reader.read();
  if (done) break;
  const chunk = decoder.decode(value);
  process.stdout.write(chunk);
}`
    }
  ]}
  annotations={{
    python: [
      { line: 11, text: 'Message payload with streaming enabled' },
      { line: 18, text: 'Iterate through response chunks for real-time output' }
    ],
    javascript: [
      { line: 9, text: 'Message payload with streaming enabled' },
      { line: 22, text: 'Read stream chunks for real-time output' }
    ]
  }}
  layout="stacked"
/>

---

### 10. Line Highlighting
Emphasize specific lines of code.

<CodePanel
  title="Important Lines Highlighted"
  highlightLines="3,5-7"
  snippets={[
    {
      language: 'python',
      code: `import os
from your_sdk import Client

api_key = os.getenv("API_KEY")  # Get from environment
client = Client(api_key=api_key)
result = client.search(
    query="example search",
    limit=10
)
print(result)`
    }
  ]}
  layout="stacked"
/>

---

### 10a. Long Single Line (Horizontal Scroll)
Demonstrates horizontal scrolling for very long single lines of code.

<CodePanel
  title="Long Command Example"
  snippets={[
    {
      language: 'bash',
      code: `curl -X POST https://api.vectara.io/v2/agents/agent_abc123/chat -H "Authorization: Bearer sk_very_long_api_key_that_demonstrates_horizontal_scrolling_behavior_in_the_code_panel_component_12345" -H "Content-Type: application/json" -d '{"message": "What are your return policies?", "stream": true, "temperature": 0.7, "max_tokens": 1500, "context": {"user_id": "user_123", "session_id": "session_456"}}'`
    }
  ]}
  layout="stacked"
/>

---

### 11. React Component with Hooks
Modern React component using hooks with annotations on key concepts.

<CodePanel
  title="Custom React Hook"
  highlightLines="4-6,14"
  snippets={[
    {
      language: 'javascript',
      code: `import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Usage in component
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Perform search API call
      console.log('Searching for:', debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}`
    }
  ]}
  annotations={{
    javascript: [
      { line: 4, text: 'State to store the debounced value' },
      { line: 6, text: 'useEffect runs when value or delay changes' },
      { line: 11, text: 'Cleanup function cancels pending timeout' },
      { line: 22, text: 'Custom hook delays search by 500ms' }
    ]
  }}
  layout="stacked"
/>

---

### 12. Single Annotation
Add a helpful note to a specific line.

<CodePanel
  title="Code with Annotation"
  snippets={[
    {
      language: 'javascript',
      code: `const apiKey = process.env.API_KEY;

const response = await fetch('https://api.example.com/search', {
  method: 'POST',
  headers: {
    'Authorization': \`Bearer \${apiKey}\`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    query: 'hello world',
    limit: 10
  })
});

const data = await response.json();
console.log(data);`
    }
  ]}
  annotations={{
    javascript: [
      { line: 1, text: 'Store API keys in environment variables, never hardcode them' }
    ]
  }}
  layout="stacked"
/>

---

### 13. Vectara List Agents
Retrieve and filter all agents in your account.

<CodePanel
  title="List All Agents"
  tabs={true}
  snippets={[
    {
      language: 'python',
      code: `import requests

url = "https://api.vectara.io/v2/agents"
headers = {
    "Authorization": "Bearer YOUR_API_KEY"
}

# Optional query parameters
params = {
    "limit": 50,
    "filter": "status:active"
}

response = requests.get(url, headers=headers, params=params)
agents = response.json()

print(f"Found {len(agents['agents'])} agents:")
for agent in agents['agents']:
    print(f"- {agent['name']} (ID: {agent['id']})")
    print(f"  Status: {agent['status']}")
    print(f"  Created: {agent['created_at']}")`
    },
    {
      language: 'javascript',
      code: `const url = 'https://api.vectara.io/v2/agents';
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY'
};

// Optional query parameters
const params = new URLSearchParams({
  limit: '50',
  filter: 'status:active'
});

const response = await fetch(\`\${url}?\${params}\`, {
  method: 'GET',
  headers: headers
});

const agents = await response.json();

console.log(\`Found \${agents.agents.length} agents:\`);
agents.agents.forEach(agent => {
  console.log(\`- \${agent.name} (ID: \${agent.id})\`);
  console.log(\`  Status: \${agent.status}\`);
  console.log(\`  Created: \${agent.created_at}\`);
});`
    },
    {
      language: 'curl',
      code: `curl -X GET "https://api.vectara.io/v2/agents?limit=50&filter=status:active" \\
  -H "Authorization: Bearer YOUR_API_KEY"`
    }
  ]}
  annotations={{
    python: [
      { line: 9, text: 'Query parameters to filter and limit results' },
      { line: 17, text: 'Iterate through returned agents' }
    ],
    javascript: [
      { line: 7, text: 'URLSearchParams builds query string automatically' },
      { line: 20, text: 'Iterate through returned agents' }
    ]
  }}
  layout="stacked"
/>

---

### 14. Collapsible with Custom Threshold
Set a custom line threshold for auto-collapse.

<CodePanel
  title="Long Code Example"
  collapsible={true}
  initialCollapsedLines={5}
  snippets={[
    {
      language: 'python',
      code: `import requests
import json
from typing import Dict, List

class APIClient:
    def __init__(self, api_key: str, base_url: str):
        self.api_key = api_key
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json'
        })

    def search(self, query: str, limit: int = 10) -> Dict:
        endpoint = f"{self.base_url}/search"
        payload = {"query": query, "limit": limit}
        response = self.session.post(endpoint, json=payload)
        response.raise_for_status()
        return response.json()

    def get_results(self, result_ids: List[str]) -> List[Dict]:
        endpoint = f"{self.base_url}/results"
        payload = {"ids": result_ids}
        response = self.session.post(endpoint, json=payload)
        response.raise_for_status()
        return response.json()`
    }
  ]}
  layout="stacked"
/>

---

## Complex Examples

### 15. WebSocket Real-Time Updates
Establish WebSocket connection with reconnection logic.

<CodePanel
  title="WebSocket Client"
  highlightLines="8-10,23-26"
  collapsible={true}
  initialCollapsedLines={15}
  snippets={[
    {
      language: 'javascript',
      code: `class WebSocketClient {
  constructor(url, options = {}) {
    this.url = url;
    this.options = {
      reconnectInterval: 5000,
      maxReconnectAttempts: 5,
      ...options
    };
    this.reconnectAttempts = 0;
    this.ws = null;
  }

  connect() {
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.options.onOpen?.();
    };

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.options.onMessage?.(data);
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      this.options.onError?.(error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.handleReconnect();
    };
  }

  handleReconnect() {
    if (this.reconnectAttempts < this.options.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(\`Reconnecting... Attempt \${this.reconnectAttempts}\`);
      setTimeout(() => this.connect(), this.options.reconnectInterval);
    } else {
      console.error('Max reconnection attempts reached');
      this.options.onMaxReconnect?.();
    }
  }

  send(data) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  disconnect() {
    this.reconnectAttempts = this.options.maxReconnectAttempts;
    this.ws?.close();
  }
}

// Usage
const client = new WebSocketClient('wss://api.example.com/ws', {
  onMessage: (data) => console.log('Received:', data),
  onError: (error) => console.error('Error:', error),
  reconnectInterval: 3000,
  maxReconnectAttempts: 10
});

client.connect();`
    }
  ]}
  annotations={{
    javascript: [
      { line: 8, text: 'Reconnection configuration with defaults' },
      { line: 16, text: 'Reset reconnect counter on successful connection' },
      { line: 22, text: 'Parse incoming messages as JSON' },
      { line: 38, text: 'Automatic reconnection with exponential backoff' }
    ]
  }}
  layout="stacked"
/>

---

### 16. Multiple Annotations Across Languages
Add contextual help to multiple lines in different languages.

<CodePanel
  title="Comprehensive API Setup"
  tabs={true}
  highlightLines="4,8-10"
  snippets={[
    {
      language: 'python',
      code: `import os
import requests

API_KEY = os.getenv("VECTARA_API_KEY")
CUSTOMER_ID = os.getenv("VECTARA_CUSTOMER_ID")
CORPUS_ID = os.getenv("VECTARA_CORPUS_ID")

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "customer-id": CUSTOMER_ID
}

response = requests.post(
    f"https://api.vectara.io/v1/query",
    headers=headers,
    json={
        "query": "What is semantic search?",
        "corpusId": CORPUS_ID,
        "top_k": 10
    }
)

results = response.json()
print(results)`
    },
    {
      language: 'javascript',
      code: `const API_KEY = process.env.VECTARA_API_KEY;
const CUSTOMER_ID = process.env.VECTARA_CUSTOMER_ID;
const CORPUS_ID = process.env.VECTARA_CORPUS_ID;

const headers = {
  'Authorization': \`Bearer \${API_KEY}\`,
  'customer-id': CUSTOMER_ID,
  'Content-Type': 'application/json'
};

const response = await fetch('https://api.vectara.io/v1/query', {
  method: 'POST',
  headers: headers,
  body: JSON.stringify({
    query: 'What is semantic search?',
    corpusId: CORPUS_ID,
    top_k: 10
  })
});

const results = await response.json();
console.log(results);`
    },
    {
      language: 'curl',
      code: `curl -X POST https://api.vectara.io/v1/query \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "customer-id: YOUR_CUSTOMER_ID" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "What is semantic search?",
    "corpusId": "YOUR_CORPUS_ID",
    "top_k": 10
  }'`
    }
  ]}
  annotations={{
    python: [
      { line: 4, text: 'Get your API key from the Vectara console' },
      { line: 8, text: 'Required headers for authentication' },
      { line: 14, text: 'Query endpoint URL' }
    ],
    javascript: [
      { line: 1, text: 'Get your API key from the Vectara console' },
      { line: 5, text: 'Required headers for authentication' },
      { line: 11, text: 'Query endpoint URL' }
    ],
    curl: [
      { line: 2, text: 'Replace with your actual API key' },
      { line: 3, text: 'Replace with your customer ID' },
      { line: 6, text: 'Your corpus identifier' }
    ]
  }}
  layout="stacked"
/>

---

### 17. GraphQL Query Builder
Type-safe GraphQL query construction with TypeScript.

<CodePanel
  title="GraphQL Client"
  highlightLines="15-20,35-37"
  collapsible={true}
  initialCollapsedLines={20}
  snippets={[
    {
      language: 'javascript',
      code: `class GraphQLClient {
  constructor(endpoint, options = {}) {
    this.endpoint = endpoint;
    this.headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };
  }

  async query(queryString, variables = {}) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        query: queryString,
        variables: variables
      })
    });

    const result = await response.json();

    if (result.errors) {
      throw new GraphQLError(result.errors);
    }

    return result.data;
  }

  mutation(mutationString, variables = {}) {
    return this.query(mutationString, variables);
  }

  // Builder pattern for type-safe queries
  buildQuery(fields) {
    return {
      select: (...selectedFields) => {
        const fieldStr = selectedFields.join('\\n    ');
        return \`{
  \${fields} {
    \${fieldStr}
  }
}\`;
      }
    };
  }
}

// Usage
const client = new GraphQLClient('https://api.example.com/graphql', {
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN'
  }
});

const query = \`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      posts {
        title
        content
      }
    }
  }
\`;

const data = await client.query(query, { id: '123' });
console.log(data.user);

class GraphQLError extends Error {
  constructor(errors) {
    super('GraphQL request failed');
    this.errors = errors;
  }
}`
    }
  ]}
  annotations={{
    javascript: [
      { line: 15, text: 'GraphQL queries are sent as POST with JSON body' },
      { line: 22, text: 'GraphQL can return errors alongside data' },
      { line: 35, text: 'Builder pattern provides type-safe query construction' },
      { line: 54, text: 'Example query with variables for dynamic values' }
    ]
  }}
  layout="stacked"
/>

---

### 18. Editable Code with Custom Execution
Live code editor with custom execution handler.

<CodePanel
  title="Interactive Code Editor"
  editable={true}
  defaultOutput="Click Run to see output"
  snippets={[
    {
      language: 'javascript',
      code: `// Try editing this code!
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(n => n * 2);
console.log('Original:', numbers);
console.log('Doubled:', doubled);

const sum = doubled.reduce((a, b) => a + b, 0);
console.log('Sum:', sum);`
    }
  ]}
  onRun={async (code, language) => {
    // Custom execution logic here
    try {
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => logs.push(args.join(' '));

      eval(code);

      console.log = originalLog;
      return logs.join('\\n');
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }}
  layout="stacked"
/>

---

### 19. Complete Feature Showcase
Everything enabled: tabs, annotations, highlighting, collapse control.

<CodePanel
  title="Complete Feature Example"
  tabs={true}
  highlightLines="5-8,15"
  collapsible={true}
  initialCollapsedLines={20}
  snippets={[
    {
      language: 'python',
      code: `import os
import requests
from typing import Dict, List, Optional

class VectaraClient:
    """
    A comprehensive client for the Vectara API
    """
    def __init__(
        self,
        api_key: Optional[str] = None,
        customer_id: Optional[str] = None
    ):
        self.api_key = api_key or os.getenv("VECTARA_API_KEY")
        self.customer_id = customer_id or os.getenv("VECTARA_CUSTOMER_ID")
        self.base_url = "https://api.vectara.io/v1"

        if not self.api_key:
            raise ValueError("API key is required")

        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {self.api_key}",
            "customer-id": self.customer_id,
            "Content-Type": "application/json"
        })

    def query(
        self,
        query: str,
        corpus_id: str,
        top_k: int = 10,
        lambda_val: float = 0.025
    ) -> Dict:
        """
        Execute a semantic search query
        """
        endpoint = f"{self.base_url}/query"
        payload = {
            "query": query,
            "corpusId": corpus_id,
            "top_k": top_k,
            "lambda": lambda_val
        }

        response = self.session.post(endpoint, json=payload)
        response.raise_for_status()
        return response.json()

    def index_document(
        self,
        corpus_id: str,
        document_id: str,
        text: str,
        metadata: Optional[Dict] = None
    ) -> Dict:
        """
        Index a document into a corpus
        """
        endpoint = f"{self.base_url}/index"
        payload = {
            "corpusId": corpus_id,
            "document": {
                "documentId": document_id,
                "text": text,
                "metadata": metadata or {}
            }
        }

        response = self.session.post(endpoint, json=payload)
        response.raise_for_status()
        return response.json()

# Usage example
client = VectaraClient()
results = client.query(
    query="What is semantic search?",
    corpus_id="my-corpus-123",
    top_k=5
)

for result in results.get("results", []):
    print(f"Score: {result['score']}")
    print(f"Text: {result['text']}")
    print("---")`
    },
    {
      language: 'javascript',
      code: `class VectaraClient {
  /**
   * A comprehensive client for the Vectara API
   */
  constructor(apiKey = null, customerId = null) {
    this.apiKey = apiKey || process.env.VECTARA_API_KEY;
    this.customerId = customerId || process.env.VECTARA_CUSTOMER_ID;
    this.baseUrl = 'https://api.vectara.io/v1';

    if (!this.apiKey) {
      throw new Error('API key is required');
    }

    this.headers = {
      'Authorization': \`Bearer \${this.apiKey}\`,
      'customer-id': this.customerId,
      'Content-Type': 'application/json'
    };
  }

  async query(query, corpusId, topK = 10, lambdaVal = 0.025) {
    /**
     * Execute a semantic search query
     */
    const endpoint = \`\${this.baseUrl}/query\`;
    const payload = {
      query: query,
      corpusId: corpusId,
      top_k: topK,
      lambda: lambdaVal
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(\`Query failed: \${response.statusText}\`);
    }

    return await response.json();
  }

  async indexDocument(corpusId, documentId, text, metadata = {}) {
    /**
     * Index a document into a corpus
     */
    const endpoint = \`\${this.baseUrl}/index\`;
    const payload = {
      corpusId: corpusId,
      document: {
        documentId: documentId,
        text: text,
        metadata: metadata
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(\`Indexing failed: \${response.statusText}\`);
    }

    return await response.json();
  }
}

// Usage example
const client = new VectaraClient();
const results = await client.query(
  'What is semantic search?',
  'my-corpus-123',
  5
);

results.results.forEach(result => {
  console.log(\`Score: \${result.score}\`);
  console.log(\`Text: \${result.text}\`);
  console.log('---');
});`
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: 'Main client class that handles all API interactions' },
      { line: 14, text: 'API key can be passed or loaded from environment' },
      { line: 15, text: 'Customer ID identifies your Vectara account' },
      { line: 22, text: 'Session headers include authentication and customer ID' },
      { line: 28, text: 'Query method for semantic search' },
      { line: 33, text: 'Lambda controls the balance between neural and keyword search' },
      { line: 73, text: 'Example usage of the client' }
    ],
    javascript: [
      { line: 5, text: 'API key can be passed or loaded from environment' },
      { line: 6, text: 'Customer ID identifies your Vectara account' },
      { line: 14, text: 'Headers include authentication and customer ID' },
      { line: 21, text: 'Query method for semantic search' },
      { line: 29, text: 'Lambda controls the balance between neural and keyword search' },
      { line: 71, text: 'Example usage of the client' }
    ]
  }}
  layout="stacked"
/>

---

### 19a. Language-Specific Highlighting (Dropdown Mode)
Different highlight lines for each language using dropdown selector.

<CodePanel
  title="Conditional Rendering"
  defaultLanguage="python"
  highlightLines="4-6"
  snippets={[
    {
      language: 'python',
      code: `def get_user_data(user_id):
    user = database.get(user_id)

    if user is None:
        return {"error": "User not found"}

    return {
        "id": user.id,
        "name": user.name,
        "email": user.email
    }`
    },
    {
      language: 'javascript',
      code: `function getUserData(userId) {
  const user = database.get(userId);

  if (user === null) {
    return { error: "User not found" };
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email
  };
}`
    }
  ]}
  annotations={{
    python: [
      { line: 4, text: 'Python uses "is None" for null checking' },
      { line: 5, text: 'Return error dict if user not found' }
    ],
    javascript: [
      { line: 4, text: 'JavaScript uses "=== null" for null checking' },
      { line: 5, text: 'Return error object if user not found' }
    ]
  }}
  layout="stacked"
/>

---

## Editable Examples

### 20. Basic Editable Example
Try editing this simple JavaScript code and run it to see the results.

<CodePanel
  title="Interactive JavaScript"
  editable={true}
  defaultOutput="Click Run to execute the code"
  snippets={[
    {
      language: 'javascript',
      code: `// Try editing this code!
const greeting = "Hello, World!";
console.log(greeting);

const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log("Doubled numbers:", doubled);

const sum = doubled.reduce((a, b) => a + b, 0);
console.log("Sum of doubled numbers:", sum);`
    }
  ]}
  layout="stacked"
/>

---

### 21. Editable Python Example
Modify this Python code to experiment with string manipulation.

<CodePanel
  title="Interactive Python"
  editable={true}
  defaultOutput="Click Run to see the output"
  snippets={[
    {
      language: 'python',
      code: `# Try editing this code!
text = "Hello, World!"
print(f"Original: {text}")

# Convert to uppercase
upper_text = text.upper()
print(f"Uppercase: {upper_text}")

# Replace "World" with your name
custom_text = text.replace("World", "Docusaurus")
print(f"Custom: {custom_text}")

# Split into words
words = text.split(", ")
print(f"Words: {words}")`
    }
  ]}
  onRun={async (code, language) => {
    // Custom execution for Python (in a real app, this would call a backend service)
    return "Python execution would require a backend service in a real implementation.";
  }}
  layout="stacked"
/>

---

### 22. Editable API Request
Try modifying this API request to see how different parameters affect the response.

<CodePanel
  title="Interactive API Request"
  editable={true}
  defaultOutput="Click Run to see the API response"
  snippets={[
    {
      language: 'javascript',
      code: `// Try editing this API request!
const endpoint = 'https://jsonplaceholder.typicode.com/posts/1';

// Modify the request options
const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};

fetch(endpoint, options)
  .then(response => response.json())
  .then(data => {
    console.log('API Response:', data);
    console.log('Title:', data.title);
  })
  .catch(error => {
    console.error('Error:', error);
  });`
    }
  ]}
  onRun={async (code, language) => {
    try {
      // Create a mock fetch function for demonstration
      const mockResponse = {
        json: () => Promise.resolve({
          userId: 1,
          id: 1,
          title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        })
      };
      
      // Replace fetch with our mock
      const originalFetch = window.fetch;
      window.fetch = () => Promise.resolve(mockResponse);
      
      // Execute the user's code
      const logs = [];
      const originalLog = console.log;
      const originalError = console.error;
      
      console.log = (...args) => logs.push(args.join(' '));
      console.error = (...args) => logs.push('ERROR: ' + args.join(' '));
      
      eval(code);
      
      // Restore original functions
      console.log = originalLog;
      console.error = originalError;
      window.fetch = originalFetch;
      
      return logs.join('\n') || 'Code executed successfully (no output)';
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }}
  layout="stacked"
/>

---

### 23. Editable React Component
Experiment with this React component to see how state changes affect the UI.

<CodePanel
  title="Interactive React Component"
  editable={true}
  defaultOutput="Click Run to see the component output"
  snippets={[
    {
      language: 'javascript',
      code: `// Try editing this React component!
const { useState } = React;

function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);
  
  return React.createElement('div', null, 
    React.createElement('h2', null, 'Counter: ' + count),
    React.createElement('button', { onClick: increment }, 'Increment'),
    ' ',
    React.createElement('button', { onClick: decrement }, 'Decrement'),
    ' ',
    React.createElement('button', { onClick: reset }, 'Reset')
  );
}

// Simulate rendering the component
const counter = Counter();
console.log('Component structure:', counter);`
    }
  ]}
  onRun={async (code, language) => {
    try {
      // Mock React for demonstration
      window.React = {
        useState: (initial) => {
          let value = initial;
          const setValue = (newValue) => {
            value = typeof newValue === 'function' ? newValue(value) : newValue;
            console.log(`State updated to: ${value}`);
          };
          return [value, setValue];
        },
        createElement: (type, props, ...children) => {
          return {
            type,
            props: props || {},
            children: children.flat()
          };
        }
      };
      
      // Execute the user's code
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => logs.push(args.join(' '));
      
      eval(code);
      
      // Restore original console.log
      console.log = originalLog;
      
      return logs.join('\n') || 'Code executed successfully (no output)';
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }}
  layout="stacked"
/>

---

### 24. Editable Data Processing
Try modifying this data processing code to experiment with different transformations.

<CodePanel
  title="Interactive Data Processing"
  editable={true}
  defaultOutput="Click Run to see the processed data"
  snippets={[
    {
      language: 'javascript',
      code: `// Try editing this data processing code!
const data = [
  { name: 'Alice', age: 30, city: 'New York' },
  { name: 'Bob', age: 25, city: 'Chicago' },
  { name: 'Charlie', age: 35, city: 'San Francisco' },
  { name: 'Diana', age: 28, city: 'Boston' }
];

// Filter people older than 28
const olderThan28 = data.filter(person => person.age > 28);
console.log('People older than 28:', olderThan28);

// Get just the names
const names = data.map(person => person.name);
console.log('All names:', names);

// Group by city
const groupedByCity = data.reduce((acc, person) => {
  if (!acc[person.city]) {
    acc[person.city] = [];
  }
  acc[person.city].push(person);
  return acc;
}, {});
console.log('Grouped by city:', groupedByCity);`
    }
  ]}
  layout="stacked"
/>

---

### 25. Editable with Tabs & Multiple Languages
Interactive editor with language tabs - edit and run code in different languages.

<CodePanel
  title="Multi-Language Interactive Editor"
  editable={true}
  tabs={true}
  defaultOutput="Select a language tab and click Run to execute"
  snippets={[
    {
      language: 'javascript',
      code: `// Edit and run JavaScript
const names = ['Alice', 'Bob', 'Charlie'];
const greetings = names.map(name => \`Hello, \${name}!\`);

greetings.forEach(greeting => console.log(greeting));

const totalLength = greetings.reduce((sum, g) => sum + g.length, 0);
console.log(\`Total characters: \${totalLength}\`);`
    },
    {
      language: 'python',
      code: `# Python code (requires backend to run)
names = ['Alice', 'Bob', 'Charlie']
greetings = [f"Hello, {name}!" for name in names]

for greeting in greetings:
    print(greeting)

total_length = sum(len(g) for g in greetings)
print(f"Total characters: {total_length}")`
    }
  ]}
  onRun={async (code, language) => {
    if (language === 'javascript' || language === 'js') {
      const logs = [];
      const originalLog = console.log;
      console.log = (...args) => logs.push(args.join(' '));

      try {
        const func = new Function(code);
        func();
        console.log = originalLog;
        return logs.join('\n') || 'Code executed successfully (no output)';
      } catch (error) {
        console.log = originalLog;
        return `Error: ${error.message}`;
      }
    } else {
      return `Note: ${language} execution requires a backend service. This is a browser-only demo.\n\nTo run Python code, you would need to send it to a server-side execution environment.`;
    }
  }}
  layout="stacked"
/>

---

### 26. Editable with Real-Time Validation
Interactive editor that validates syntax and provides feedback.

<CodePanel
  title="JSON Validator"
  editable={true}
  defaultOutput="Edit the JSON and click Run to validate"
  snippets={[
    {
      language: 'json',
      code: `{
  "name": "API Configuration",
  "version": "2.0",
  "endpoints": {
    "search": "/v1/search",
    "index": "/v1/index"
  },
  "timeout": 5000,
  "retries": 3
}`
    }
  ]}
  onRun={async (code, language) => {
    try {
      const parsed = JSON.parse(code);
      const keys = Object.keys(parsed);
      const depth = JSON.stringify(parsed, null, 2).split('\n').length;

      return `✓ Valid JSON!\n\nStructure Analysis:\n- Top-level keys: ${keys.join(', ')}\n- Total lines: ${depth}\n- Size: ${code.length} characters\n\nParsed object:\n${JSON.stringify(parsed, null, 2)}`;
    } catch (error) {
      return `✗ Invalid JSON\n\nError: ${error.message}\n\nTip: Check for:\n- Missing or extra commas\n- Unquoted property names\n- Trailing commas\n- Single quotes (use double quotes)`;
    }
  }}
  layout="stacked"
/>

---

### 27. Edge Case: Minimal Code
Example with very minimal code content.

<CodePanel
  title="Minimal Example"
  snippets={[
    {
      language: 'bash',
      code: `ls`
    }
  ]}
/>

---

### 28. Edge Case: Empty Snippet
Shows how the component handles edge cases gracefully.

<CodePanel
  title="Edge Case Test"
  snippets={[
    {
      language: 'javascript',
      code: ``
    }
  ]}
  layout="stacked"
/>

---

## Usage Tips

1. **Start Simple**: Begin with basic examples and add features as needed
2. **Layout Choice**: Use `layout="stacked"` for documentation, `layout="floating"` for sidebars
3. **Annotations**: Use sparingly - only for critical information that needs emphasis
4. **Line Highlighting**: Great for focusing attention on changed or important lines
5. **Tabs vs Dropdown**: Tabs work better for 2-4 languages, dropdown for more
6. **Collapsible**: Adjust `initialCollapsedLines` based on your typical code length (set `collapsible={false}` to disable)
7. **Editable Mode**: Best for interactive tutorials and playgrounds
8. **Browser Limitations**: Editable mode only executes JavaScript natively - other languages require backend integration
9. **Custom Width**: Works with floating layout - use pixel values or percentages (e.g., `customWidth="600px"`)
10. **Horizontal Scroll**: Long single lines will scroll horizontally automatically