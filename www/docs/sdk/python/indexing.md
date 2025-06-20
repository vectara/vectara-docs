---
id: ingest_data
title: Ingesting Data
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

This guide covers the Vectara Python SDK for indexing and managing documents 
within corpora. Indexing involves ingesting documents into a corpus, enabling 
them for search and Retrieval Augmented Generation (RAG) operations. These 
methods allow you to add, retrieve, list, and delete documents, preparing your data for querying.

## Install the Vectara SDK

<CodePanel
  title="Install Vectara"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `pip install vectara` }
  ]}
  customWidth="50%"
/>

Install the Vectara Python SDK to enable document indexing capabilities for 
your enterprise applications.

<Spacer size="l" />

### Initialize the Vectara Client

<CodePanel
  title="Initialize the Vectara client"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `from vectara import VectaraClient\n\n# Using API key\nclient = VectaraClient(api_key="your_api_key", customer_id="your_customer_id")\n\n# Using OAuth 2.0\nclient = VectaraClient(bearer_token="your_bearer_token", customer_id="your_customer_id")` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Use an Index API Key for write operations like indexing.' },
      { line: 5, text: 'OAuth 2.0 is recommended for production environments.' }
    ]
  }}
  customWidth="50%"
/>

Set up authentication to securely access indexing methods, using an API key or 
OAuth 2.0 token.

---

## Index a document

<CodePanel
  title="Index a document"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.documents.index(
    corpus_key: str,
    document_id: str,
    title: str = None,
    text: str = None,
    metadata: dict = None,
    parts: List[dict] = None,
    table_extraction: dict = None,
    timeout: int = None,
    timeout_millis: int = None
) -> dict`,
    },
  ]}
  customWidth="50%"
/>

Ingest a document into a corpus to make it searchable, supporting structured 
or unstructured formats with metadata. This section helps you add documents 
efficiently, enhancing enterprise search capabilities.

- `corpus_key`: Unique identifier of the target corpus ("legal_docs").
- `document_id`: Unique identifier for the document ("contract_2025_001").
- `title`: Optional document title ("Vendor Contract 2025").
- `text`: Optional full document text for indexing.
- `metadata`: Optional dictionary of metadata for filtering (`{"department": "legal", "year": 2025}`).
- `parts`: Optional list of document parts, each with `text`, `metadata`, and `context` for structured indexing.
- `table_extraction`: Optional dictionary specifying a table extractor (`{"name": "textract"}`).
- `timeout`, `timeout_millis`: Optional timeouts.

This returns a dictionary with indexing details, including `document_id`, 
`status`, and usage metrics (`bytes_used`).

---

### Example: Index a legal document

<CodePanel
  title="Example: index a legal document"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:
    response = client.documents.index(
        corpus_key="legal_docs",
        document_id="contract_2025_001",
        title="Vendor Contract 2025",
        text="This agreement outlines vendor obligations...",
        metadata={"department": "legal", "year": 2025},
        parts=[
            {
                "text": "Indemnification clause: The vendor agrees...",
                "metadata": {"clause_type": "indemnification"}
            }
        ]
    )
    print(f"Indexed document: {response['document_id']}")
except Exception as e:
    print(f"Indexing failed: {e}")` },
    { language: 'json', code: `{
  "corpus_key": "legal_docs",
  "document_id": "contract_2025_001",
  "title": "Vendor Contract 2025",
  "text": "This agreement outlines vendor obligations...",
  "metadata": {
    "department": "legal",
    "year": 2025
  },
  "parts": [
    {
      "text": "Indemnification clause: The vendor agrees...",
      "metadata": {
        "clause_type": "indemnification"
      }
    }
  ]
}` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Specify the corpus_key for the target corpus.' },
      { line: 7, text: 'Metadata enables filtering during queries.' },
      { line: 9, text: 'Parts allow structured indexing of document sections.' }
    ],
    json: [
      { line: 2, text: 'Matches the corpus_key in the Python example.' },
      { line: 6, text: 'Metadata fields are indexed for query filtering.' }
    ]
  }}
  customWidth="50%"
/>

Add a legal document to a corpus with structured parts and metadata, 
demonstrating how to index complex content for precise retrieval.

---

### Example: Add document to corpus

<CodePanel
  title="Example: Add document to corpus"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `import requests
import json

url = "https://api.vectara.io/v2/corpora/:corpus_key/documents"

payload = json.dumps({
  "type": "structured",
  "id": "sup-403-token-expiry",
  "title": "403 Error – Token Expiration",
  "description": "Troubleshooting stale auth token errors in web portal",
  "metadata": {
    "platform": "web_portal",
    "browser": "chrome",
    "issue_code": "403"
  },
  "sections": [
    {
      "id": 1,
      "title": "Overview",
      "text": "403 errors occur from expired access or refresh tokens."
    },
    {
      "id": 2,
      "title": "Workaround",
      "text": "Clearing browser storage solves the problem.",
      "metadata": {
        "solution": "token_reset"
      }
    }
  ],
  "chunking_strategy": {
    "type": "max_chars_chunking_strategy",
    "max_chars_per_chunk": 256
  }
})
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': '<x-api-key>'
}

response = requests.request("POST", url, headers=headers, data=payload)
print(response.text)`
    }
  ]}
  customWidth="50%"
/>

Upload a structured document to a corpus using an HTTP request, showcasing 
automatic chunking and metadata integration for support-related content.

* Use `parts` for structured documents (contract clauses) to enable precise
retrieval.
* `table_extraction` is optional for documents with tabular data. 
* After indexing, query the document using `client.corpora.query`.

**Error handling**:
- **400 Bad Request**: Invalid document structure or parameters.
  - **Resolution**: Ensure `document_id` is unique and `metadata` is a valid dictionary. Validate `parts` structure.
- **403 Forbidden**: Insufficient permissions.
  - **Resolution**: Use an Index API Key or OAuth token with write access.
- **404 Not Found**: Corpus doesn’t exist.
  - **Resolution**: Verify `corpus_key` using `client.corpora.list`.
- **409 Conflict**: Document with the same `document_id` already exists.
  - **Resolution**: Choose a unique `document_id` or delete the existing document.

