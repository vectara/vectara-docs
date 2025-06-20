---
id: index
title: Indexing Data
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";


This guide covers the Vectara Python SDK for indexing and managing documents within corpora. Indexing involves ingesting documents into a corpus, enabling them for search and Retrieval Augmented Generation (RAG) operations. These methods allow you to add, retrieve, list, and delete documents, preparing your data for querying.

## Prerequisites

1. **Install the SDK**:
   <CodePanel
     title="Install Vectara"
     defaultLanguage="python"
     snippets={[
       { language: 'python', code: `pip install vectara` }
     ]}
     layout="stacked"
   />

2. **Authentication**:
   - Obtain an API key or OAuth 2.0 token from the [Vectara Console](https://console.vectara.com).
   - Initialize the `VectaraClient` with your credentials.

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
     layout="stacked"
   />

3. **Corpus setup**: Create a corpus using `client.corpora.create` (see [Corpus Management Guide](vectara_python_sdk_corpora.md)).
4. Indexing prepares documents for retrieval, not direct generation. For RAG or chat-based generation, use `client.corpora.query` or `client.chats.create` after indexing (see [Querying Corpora Guide](vectara_python_sdk_queries.md)).

## Indexing methods

### 1. Index a document

**Purpose**: Ingest a document into a corpus for search and RAG, including text, metadata, and optional structured parts.

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
  layout="stacked"
/>

**Parameters**:
- `corpus_key`: Unique identifier of the target corpus ("legal_docs").
- `document_id`: Unique identifier for the document ("contract_2025_001").
- `title`: Optional document title ("Vendor Contract 2025").
- `text`: Optional full document text for indexing.
- `metadata`: Optional dictionary of metadata for filtering (`{"department": "legal", "year": 2025}`).
- `parts`: Optional list of document parts, each with `text`, `metadata`, and `context` for structured indexing.
- `table_extraction`: Optional dictionary specifying a table extractor (`{"name": "textract"}`).
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with indexing details, including `document_id`, `status`, and usage metrics (`bytes_used`).

<CodePanel
  title="Example: index a legal document"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:\n    response = client.documents.index(\n        corpus_key="legal_docs",\n        document_id="contract_2025_001",\n        title="Vendor Contract 2025",\n        text="This agreement outlines vendor obligations...",\n        metadata={"department": "legal", "year": 2025},\n        parts=[\n            {\n                "text": "Indemnification clause: The vendor agrees...",\n                "metadata": {"clause_type": "indemnification"}\n            }\n        ]\n    )\n    print(f"Indexed document: {response['document_id']}")\nexcept Exception as e:\n    print(f"Indexing failed: {e}")` },
    { language: 'json', code: `{\n  "corpus_key": "legal_docs",\n  "document_id": "contract_2025_001",\n  "title": "Vendor Contract 2025",\n  "text": "This agreement outlines vendor obligations...",\n  "metadata": {\n    "department": "legal",\n    "year": 2025\n  },\n  "parts": [\n    {\n      "text": "Indemnification clause: The vendor agrees...",\n      "metadata": {\n        "clause_type": "indemnification"\n      }\n    }\n  ]\n}` }
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
  layout="stacked"
/>

Now let's upload a structured document:

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
      "text": "403 errors typically arise from expired access or refresh tokens."
    },
    {
      "id": 2,
      "title": "Workaround",
      "text": "Clearing browser storage or re-authenticating solves the problem.",
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
  layout="stacked"
/>

**Error handling**:
- **400 Bad Request**: Invalid document structure or parameters.
  - *Resolution*: Ensure `document_id` is unique and `metadata` is a valid dictionary. Validate `parts` structure.
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use an Index API Key or OAuth token with write access.
- **404 Not Found**: Corpus doesn’t exist.
  - *Resolution*: Verify `corpus_key` using `client.corpora.list`.
- **409 Conflict**: Document with the same `document_id` already exists.
  - *Resolution*: Choose a unique `document_id` or delete the existing document.

:::tip Tips
- Use `parts` for structured documents (contract clauses) to enable precise retrieval.
- `table_extraction` is optional for documents with tabular data. See [Table Extractors](https://docs.vectara.com/docs/api-reference/indexing-apis/indexing#table-extraction).
- After indexing, query the document using `client.corpora.query`.
:::

### 2. Delete a document

**Purpose**: Permanently remove a document from a corpus by its `document_id`.

<CodePanel
     title="Method"
     defaultLanguage="python"
     snippets={[
       { language: 'python', code: `client.documents.delete(
    document_id: str,
    corpus_key: str,
    timeout: int = None,
    timeout_millis: int = None
) -> None` }
     ]}
     layout="stacked"
   />

**Parameters**:
- `document_id`: Unique identifier of the document ("contract_2025_001").
- `corpus_key`: Unique identifier of the corpus ("legal_docs").
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: None (204 No Content on success).

<CodePanel
  title="Example: delete a document"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:\n    client.documents.delete(\n        document_id="contract_2025_001",\n        corpus_key="legal_docs"\n    )\n    print("Document deleted successfully")\nexcept Exception as e:\n    print(f"Deletion failed: {e}")` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Ensure document_id matches an existing document.' },
      { line: 4, text: 'Specify the corpus containing the document.' }
    ]
  }}
  layout="stacked"
/>

**Error handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use an Index API Key or OAuth token with write access.
- **404 Not Found**: Document or corpus doesn’t exist.
  - *Resolution*: Verify `document_id` and `corpus_key`. Use `client.documents.list` to confirm document existence.

:::tip Tips
- Deletion is irreversible. Ensure you no longer need the document before deleting.
- Use `client.corpora.reset` to clear all documents in a corpus without deleting it.
:::

### 3. Retrieve a document

**Purpose**: Fetch metadata and content for a specific document by its `document_id`.

<CodePanel
     title="Method"
     defaultLanguage="python"
     snippets={[
       { language: 'python', code: `client.documents.get(
    document_id: str,
    corpus_key: str,
    timeout: int = None,
    timeout_millis: int = None
) -> dict` }
     ]}
     layout="stacked"
   />

**Parameters**:
- `document_id`: Unique identifier of the document ("contract_2025_001").
- `corpus_key`: Unique identifier of the corpus ("legal_docs").
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with document details (`id`, `title`, `text`, `metadata`, `parts`).

<CodePanel
  title="Example: retrieving a document"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:\n    response = client.documents.get(\n        document_id="contract_2025_001",\n        corpus_key="legal_docs"\n    )\n    print(f"Title: {response['title']}")\n    print(f"Metadata: {response['metadata']}")\nexcept Exception as e:\n    print(f"Retrieval failed: {e}")` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Specify the exact document_id to retrieve.' },
      { line: 6, text: 'Access document fields like title or metadata.' }
    ]
  }}
  layout="stacked"
/>

**Error handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use a Query or Index API Key with read access.
- **404 Not Found**: Document or corpus doesn’t exist.
  - *Resolution*: Verify `document_id` and `corpus_key`.

:::tips Tips
- Useful for administrative tasks, such as auditing document content or metadata.
- For searching document content, use `client.corpora.query` instead.
:::

### 4. List documents

**Purpose**: Retrieve a paginated list of documents in a corpus, with optional filtering.

<CodePanel
     title="Method"
     defaultLanguage="python"
     snippets={[
       { language: 'python', code: `client.documents.list(
    corpus_key: str,
    limit: int = 10,
    filter: str = None,
    document_ids: List[str] = None,
    page_key: str = None,
    timeout: int = None,
    timeout_millis: int = None
) -> dict` }
     ]}
     layout="stacked"
   />

**Parameters**:
- `corpus_key`: Unique identifier of the corpus ("legal_docs").
- `limit`: Maximum number of documents to return (1–100, default: 10).
- `filter`: Optional regex to filter by document title or metadata ("contract").
- `document_ids`: Optional list of document IDs to filter (`["contract_2025_001"]`).
- `page_key`: Optional token for pagination.
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with `documents` (list of document metadata) and `metadata` (pagination info, `page_key`).


<CodePanel
  title="Example: list documents"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:\n    response = client.documents.list(\n        corpus_key="legal_docs",\n        limit=5,\n        filter="contract"\n    )\n    for doc in response["documents"]:\n        print(f"Document: {doc['title']} ({doc['id']})")\n    if response["metadata"]["page_key"]:\n        print(f"Next page key: {response['metadata']['page_key']}")\nexcept Exception as e:\n    print(f"Listing failed: {e}")` }
  ]}
  annotations={{
    python: [
      { line: 4, text: 'Limit the number of returned documents.' },
      { line: 5, text: 'Filter by title or metadata content.' },
      { line: 9, text: 'Use page_key for pagination.' }
    ]
  }}
  layout="stacked"
/>

**Error handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use a Query or Index API Key with read access.
- **404 Not Found**: Corpus doesn’t exist.
  - *Resolution*: Verify `corpus_key`.

:::tip Tips
- Use `page_key` to fetch additional pages if more than `limit` documents exist.
- Document metadata is less detailed than `get_document`. Use `client.documents.get` for full details.
:::

## Additional notes

- **Generation Tasks**: Indexing methods prepare data for retrieval and RAG but don’t perform generation. For summarized responses, use `client.corpora.query` with `generation` parameters (`generation_preset_name="mockingbird-2.0"`) or `client.chats.create` for conversational AI.
- **Query vs. Prompt Confusion**: Vectara’s API is retrieval-centric, using natural-language queries to find indexed documents. To mimic prompt-based GenAI interactions, configure `prompt_template` in query or chat methods. For example, see the `query` method in [Querying Corpora Guide](vectara_python_sdk_queries.md).
- **Structured Indexing**: Use `parts` to index document sections (contract clauses) for precise retrieval. Metadata enables filtering during queries (`doc.department = 'legal'`).
- **Improving Usability**: If SDK methods or parameters (`metadata`, `parts`) are unclear, provide feedback to `feedback@vectara.com` with specific examples, as suggested in internal discussions.

## Next steps

- Populate corpora with documents using `client.documents.index`, then query them with `client.corpora.query`.
- Explore chat methods (`client.chats.create`) for conversational AI with indexed data.
- Review the [Vectara API Recipes](https://docs.vectara.com/docs/api-recipes) for indexing examples.
- Test indexing in the [Vectara API Playground](https://console.vectara.com) to validate document structures.
