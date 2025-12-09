a# Vectara Agent Interaction Example
# Date: 10-06-25
# Demonstrates the hybrid search approach used in the UI

# This example shows how the chatbot searches both corpora simultaneously
# to provide comprehensive answers with code examples

echo "=== Vectara Agent Interaction Example ==="
echo "Date: 10-06-25"
echo "Demonstrating hybrid corpus search for: 'How to create a corpus'"
echo ""

# ============================================================================
# PART 1: Agent Platform Search (technical_writing_assistant corpus)
# ============================================================================
echo "1. AGENT PLATFORM SEARCH"
echo "Corpus: technical_writing_assistant"
echo "Method: Vectara Agent API"
echo ""

curl -X POST "https://api.vectara.io/v2/agents/agt_documentation_assistant_ed3f/sessions/YOUR_SESSION_KEY/events" \
  -H "Content-Type: application/json" \
  -H "x-api-key: YOUR_TESTING_API_KEY" \
  -H "customer-id: YOUR_TESTING_CUSTOMER_ID" \
  -d '{
    "type": "message",
    "content": "How to create a corpus",
    "timestamp": '$(date +%s)000'
  }' | jq '.' > agent_response.json

echo "Agent Response Structure:"
echo "- Uses Agent Platform for context-aware responses"
echo "- Maintains conversation history in session"
echo "- Automatically includes code examples in markdown format"
echo ""

# ============================================================================
# PART 2: Direct API Search (ofer-bm-moma-docs_232 corpus)
# ============================================================================
echo "2. DIRECT API SEARCH (Hybrid)"
echo "Corpus: ofer-bm-moma-docs_232"
echo "Method: Vectara Query API v1"
echo ""

curl -X POST "https://api.vectara.io/v1/query" \
  -H "Content-Type: application/json" \
  -H "x-api-key: zqt_WvU_2ewh7ZGRwq8LdL2SV8B9RJmVGyUm1VAuOw" \
  -H "customer-id: 1526022105" \
  -d '{
    "query": [
      {
        "text": "How to create a corpus",
        "context": ""
      }
    ],
    "num_results": 5,
    "corpus_key": [
      {
        "customer_id": "1526022105",
        "corpus_id": 232,
        "metadata": {}
      }
    ]
  }' | jq '.' > direct_search_response.json

echo "Direct Search Response Structure:"
echo "- Provides raw document snippets"
echo "- Used to supplement agent responses with additional context"
echo ""

# ============================================================================
# PART 3: Sample Combined Response (What the UI shows)
# ============================================================================
echo "3. COMBINED UI RESPONSE"
echo "This is what users see in the chatbot interface:"
echo ""

cat << 'EOF'
To create a new corpus in Vectara, you can use the following approaches:

## Using JavaScript (v2 API)

```javascript
// Create a new Vectara corpus
const createCorpus = async (corpusName, customerId, apiKey) => {
  const response = await fetch('https://api.vectara.io/v2/corpora', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ${apiKey}',
      'customer-id': '${customerId}'
    },
    body: JSON.stringify({
      name: '${corpusName}',
      description: 'Corpus created via API'
    })
  });

  if (!response.ok) {
    throw new Error(`Failed to create corpus: ${response.statusText}`);
  }

  return await response.json();
};

// Usage example
const result = await createCorpus('my-new-corpus', 'YOUR_CUSTOMER_ID', 'YOUR_API_KEY');
console.log('Corpus created:', result);
```

## Using Python (v2 API)

```python
import requests
import json

def create_corpus(corpus_name, customer_id, api_key):
    """Create a new Vectara corpus using v2 API"""
    url = "https://api.vectara.io/v2/corpora"

    headers = {
        'Content-Type': 'application/json',
        'Authorization': f'Bearer {api_key}',
        'customer-id': customer_id
    }

    data = {
        'name': corpus_name,
        'description': 'Corpus created via API'
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code != 200:
        raise Exception(f"Failed to create corpus: {response.text}")

    return response.json()

# Usage example
result = create_corpus('my-new-corpus', 'YOUR_CUSTOMER_ID', 'YOUR_API_KEY')
print(f"Corpus created: {result}")
```

## Using cURL

```bash
curl -X POST "https://api.vectara.io/v2/corpora" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "customer-id: YOUR_CUSTOMER_ID" \
  -d '{
    "name": "my-new-corpus",
    "description": "Corpus created via API"
  }'
```

## Key Points:

1. **Authentication**: Use your API key and customer ID
2. **API Version**: The v2 API is recommended for new implementations
3. **Error Handling**: Always check response status codes
4. **Permissions**: Ensure your API key has corpus creation permissions

The response will include corpus details like corpus ID, creation timestamp, and configuration settings.

**Sources:**
- Vectara API Documentation [vectara_1]
- Corpus Management Guide [vectara_2]
- v2 API Reference [vectara_3]

EOF

echo ""
echo "=== Key Features Demonstrated ==="
echo "✅ Hybrid Search: Agent Platform + Direct API"
echo "✅ Embedded Code Examples: No button clicking required"
echo "✅ Multiple Languages: JavaScript, Python, cURL"
echo "✅ Conversation Context: Follow-up questions maintain context"
echo "✅ Source Citations: Automatic reference linking"
echo ""
echo "=== Architecture Notes ==="
echo "• Agent searches technical_writing_assistant corpus for contextual responses"
echo "• Direct API searches ofer-bm-moma-docs_232 for additional documentation"
echo "• Results are combined and formatted in the UI"
echo "• Session persistence maintains conversation context across interactions"
echo ""

# Clean up sample files
rm -f agent_response.json direct_search_response.json