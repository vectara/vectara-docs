---
id: corpus
title: Managing Corpora
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";


This guide covers the Vectara Python SDK for managing corpora, which are 
containers for storing documents and metadata in the Vectara platform. These 
methods support administrative tasks like creating, listing, updating, and 
deleting corpora, enabling you to organize data for search and Retrieval 
Augmented Generation (RAG) operations.

This guide focuses on corpus management, not direct search or 
generation. For querying corpora (including RAG), see the `query_corpus` 
method in the [Query API guide](https://docs.vectara.com/docs/api-reference/search-apis/search).

## Corpus management methods

### 1. Create a corpus

**Purpose**: Create a new corpus to store documents and metadata, identified 
by a unique `corpus_key`.

<CodePanel
  title="Method"
  snippets={[
    { language: 'python', code: `client.corpora.create(corpus_key: str, name: str, description: str = "", timeout: int = None, timeout_millis: int = None) -> dict` },
  ]}
  layout="stacked"
/>  


**Parameters**:
- `corpus_key`: Unique identifier for the corpus, such as "legal_docs". Must 
  follow naming conventions (see [Corpus Key Definition](https://docs.vectara.com/docs/api-reference/search-apis/search#corpus-key-definition)).
- `name`: Human-readable name ("Legal Knowledgebase").
- `description`: Optional description of the corpus’s purpose ("Contains case law, contracts").
- `timeout`: Optional timeout in seconds.
- `timeout_millis`: Optional timeout in milliseconds (overrides `timeout` if set).

<CodePanel
  title="Example: Create a legal corpus"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `try:
    response = client.corpora.create(
        corpus_key="legal_docs",
        name="Legal Knowledgebase",
        description="Contains case law, contracts, clause templates"
    )
    print(f"Created corpus: {response['corpus_key']}")
except Exception as e:
    print(f"Failed to create corpus: {e}")`,
    },
  ]}
  layout="stacked"
/>

Now, let's create a manufacturing corpus:

<CodePanel
  title="Example: create a manufacturing corpus"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `import requests
import json

url = "https://api.vectara.io/v2/corpora"

payload = json.dumps({
  "key": "ops_manuals",
  "name": "Manufacturing SOPs",
  "description": "Assembly line shutdown/restart, error codes, maintenance guides"
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


**Returns**: Dictionary with `status` and `corpus_key` (`{"status": "The corpus has been created.", "corpus_key": "legal_docs"}`).

**Error Handling**:
- **400 Bad Request**: Invalid `corpus_key` or request body.
  - *Resolution*: Ensure `corpus_key` is unique and follows naming rules. Check for valid JSON in the request.
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Verify your API key or token has corpus creation rights. Use an Index API Key or OAuth token with appropriate scopes.
- **409 Conflict**: Corpus with the same `corpus_key` already exists.
  - *Resolution*: Choose a different `corpus_key` or delete the existing corpus.

**Notes**:
- Use descriptive `corpus_key` values (e.g., "clinical_guidelines") to simplify querying.
- This method sets up the corpus but doesn’t index documents. Use `client.index` methods for document ingestion.

### 2. List corpora

**Purpose**: Retrieve a paginated list of corpora in your account, with 
optional filtering.

<CodePanel
  title="List Corpora"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.list(limit: int = 10, filter: str = None, corpus_ids: List[str] = None, page_key: str = None, timeout: int = None, timeout_millis: int = None) -> dict`,
    },
  ]}
  layout="stacked"
/>

**Parameters**:
- `limit`: Maximum number of corpora to return (1–100, default: 10).
- `filter`: Optional regex to filter by corpus name or description ("finance").
- `corpus_ids`: Optional list of corpus IDs (`["crp_100101001"]`) to filter 
  specific corpora.
- `page_key`: Optional token for pagination, returned in previous responses.
- `timeout`, `timeout_millis`: Optional timeouts.

<CodePanel
  title="example"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `try:
    response = client.corpora.list(limit=5, filter="finance")
    for corpus in response["corpora"]:
        print(f"Corpus: {corpus['name']} ({corpus['key']})")
    if response["metadata"]["page_key"]:
        print(f"Next page key: {response['metadata']['page_key']}")
except Exception as e:
    print(f"Failed to list corpora: {e}")`,
    },
  ]}
  layout="stacked"
/>

**Returns**: Dictionary with `corpora` (list of corpus metadata) and `metadata` (pagination info, e.g., `page_key`).

---

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Ensure your API key or token allows listing corpora.

**Notes**:
- Use `page_key` to fetch additional pages if more than `limit` corpora exist.
- Corpus metadata is less detailed than `get_corpus`. Use `client.corpora.get` for full details.

### 3. Retrieve a corpus

**Purpose**: Fetch detailed metadata for a specific corpus by its `corpus_key`.

<CodePanel
  title="Retrieve a corpus"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.get(corpus_key: str, timeout: int = None, timeout_millis: int = None) -> dict`,
    },
  ]}
  layout="stacked"
/>

**Parameters**:
- `corpus_key`: Unique identifier of the corpus (e.g., "legal_docs").
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with corpus metadata (e.g., `id`, `name`, `filter_attributes`, `limits`).

<CodePanel
  title="Example"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `try:
    response = client.corpora.get(corpus_key="legal_docs")
    print(f"Corpus Name: {response['name']}")
    print(f"Documents Used: {response['limits']['used_docs']}")
except Exception as e:
    print(f"Failed to retrieve corpus: {e}")`,
    },
  ]}
  layout="stacked"
/>


**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Verify your API key or token has read access.
- **404 Not Found**: Corpus doesn’t exist.
  - *Resolution*: Check the `corpus_key` for typos or confirm the corpus exists via `list_corpora`.

**Notes**:
- Includes details like `filter_attributes` and `custom_dimensions`, useful for configuring queries.

### 4. Update a corpus

**Purpose**: Modify a corpus’s name, description, or enabled status (e.g., for archiving or maintenance).

<CodePanel
  title="Update a corpus"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.update(corpus_key: str, name: str = None, description: str = None, enabled: bool = None, timeout: int = None, timeout_millis: int = None) -> dict`,
    },
  ]}
  layout="stacked"
/>


**Parameters**:
- `corpus_key`: Unique identifier of the corpus.
- `name`: Optional new name.
- `description`: Optional new description.
- `enabled`: Optional boolean to enable/disable the corpus.
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Updated corpus metadata.

<CodePanel
  title="Example"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `try:
    response = client.corpora.update(
        corpus_key="fin-corp-q2-2025",
        name="Financial Archive Q2",
        description="Historical financial data for Q2 2025, retained for audit",
        enabled=False
    )
    print(f"Updated corpus: {response['name']} (Enabled: {response['enabled']})")
except Exception as e:
    print(f"Failed to update corpus: {e}")`,
    },
  ]}
  layout="stacked"
/>

Let's look at another example:

<CodePanel
  title="Example: Update document metadata"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `import requests
import json

url = "https://api.vectara.io/v2/corpora/:corpus_key/documents/:document_id"

payload = json.dumps({
  "metadata": {
    "sector": "banking",
    "risk_rating": "moderate",
    "reviewed_by": "senior analyst"
  }
})
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': '<x-api-key>'
}

response = requests.request("PATCH", url, headers=headers, data=payload)
print(response.text)`
    }
  ]}
  layout="stacked"
/>

Now, let's replace some metadata:

<CodePanel
  title="Example: replace financial metadata"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `import requests
import json

url = "https://api.vectara.io/v2/corpora/:corpus_key/documents/:document_id/metadata"

payload = json.dumps({
  "metadata": {
    "category": "retirement savings",
    "compliance_tag": "SOX-2023",
    "reviewed_by": "jdoe@financecorp.com"
  }
})
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': '<x-api-key>'
}

response = requests.request("PUT", url, headers=headers, data=payload)
print(response.text)`
    }
  ]}
  layout="stacked"
/>


**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use an Index API Key or OAuth token with write access.
- **404 Not Found**: Corpus doesn’t exist.
  - *Resolution*: Verify the `corpus_key`.

**Notes**:
- Disabling a corpus (`enabled=False`) prevents new indexing but allows read-only queries.

### 5. Delete a Corpus

**Purpose**: Permanently remove a corpus and all its data.

<CodePanel
  title="Delete a corpus"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.delete(corpus_key: str, timeout: int = None, timeout_millis: int = None) -> None`,
    },
  ]}
  layout="stacked"
/>

**Parameters**:
- `corpus_key`: Unique identifier of the corpus.
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: None (204 No Content on success).

<CodePanel
  title="Example"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `try:
    client.corpora.delete(corpus_key="old_corpus")
    print("Corpus deleted successfully")
except Exception as e:
    print(f"Failed to delete corpus: {e}")`,
    },
  ]}
  layout="stacked"
/>

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Ensure write access.
- **404 Not Found**: Corpus doesn’t exist.
  - *Resolution*: Confirm the `corpus_key`.

**Notes**:
- Deletion is irreversible. Use `reset_corpus` to clear data without deleting the corpus.

### 6. Reset a Corpus

**Purpose**: Remove all documents and data from a corpus while retaining its configuration.

<CodePanel
  title="Reset a corpus"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.reset(corpus_key: str, timeout: int = None, timeout_millis: int = None) -> None
`,
    },
  ]}
  layout="stacked"
/>

**Parameters**:
- `corpus_key`: Unique identifier of the corpus.
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: None (204 No Content on success).

<CodePanel
  title="Example"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `try:
    client.corpora.reset(corpus_key="test_corpus")
    print("Corpus reset successfully")
except Exception as e:
    print(f"Failed to reset corpus: {e}")`,
    },
  ]}
  layout="stacked"
/>


**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Verify write access.
- **404 Not Found**: Corpus doesn’t exist.
  - *Resolution*: Check the `corpus_key`.

**Notes**:
- Useful for testing or clearing outdated data without recreating the corpus.

### 7. Replace Filter Attributes

**Purpose**: Update a corpus’s filter attributes (e.g., metadata fields for querying) asynchronously.

<CodePanel
  title="Replace filter attributes"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.replace_filter_attributes(corpus_key: str, filter_attributes: List[dict], timeout: int = None, timeout_millis: int = None) -> dict`,
    },
  ]}
  layout="stacked"
/>

**Parameters**:
- `corpus_key`: Unique identifier of the corpus.
- `filter_attributes`: List of filter attribute dictionaries (e.g., `[{"name": "department", "level": "document", "type": "text", "indexed": True}]`).
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with job details (e.g., `job_id`).

<CodePanel
  title="Example"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `try:
    response = client.corpora.replace_filter_attributes(
        corpus_key="legal_docs",
        filter_attributes=[
            {"name": "jurisdiction", "level": "part", "type": "text", "indexed": True},
            {"name": "doc_type", "level": "document", "type": "text", "indexed": True}
        ]
    )
    print(f"Filter replacement job created: {response['job_id']}")
except Exception as e:
    print(f"Failed to replace filter attributes: {e}")`,
    },
  ]}
  layout="stacked"
/>

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Ensure write access.
- **404 Not Found**: Corpus doesn’t exist.
  - *Resolution*: Verify the `corpus_key`.

**Notes**:
- This operation creates a background job. Monitor job status using `client.jobs.get`.
- New filters are applied only after the job completes.

### 8. Compute Corpus Size

**Purpose**: Calculate the current size of a corpus (documents, parts, characters).

<CodePanel
  title="Compute corpus size"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.compute_size(corpus_key: str, timeout: int = None, timeout_millis: int = None) -> dict
`,
    },
  ]}
  layout="stacked"
/>

**Parameters**:
- `corpus_key`: Unique identifier of the corpus.
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with size metrics (e.g., `used_docs`, `used_parts`, `used_characters`).

<CodePanel
  title="Example"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `try:
    response = client.corpora.compute_size(corpus_key="legal_docs")
    print(f"Documents: {response['used_docs']}, Characters: {response['used_characters']}")
except Exception as e:
    print(f"Failed to compute corpus size: {e}")`,
    },
  ]}
  layout="stacked"
/>

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Verify read access.
- **404 Not Found**: Corpus doesn’t exist.
  - *Resolution*: Check the `corpus_key`.

**Notes**:
- Useful for monitoring storage usage against corpus limits.

## Additional Notes

- **Generation Tasks**: Corpus management methods are administrative and don’t directly support generation. For RAG or chat-based generation, use `client.corpora.query` or `client.chats.create` with a `generation_preset_name` like `mockingbird-2.0`. See the [Query API guide](https://docs.vectara.com/docs/api-reference/search-apis/search) for details.
- **Query vs. prompt confusion**: Vectara’s API uses a retrieval-centric model with natural-language queries, not prompt-based interactions like many GenAI platforms. For prompt-like behavior, configure `prompt_template` in query or chat methods.
- **Improving usability**: If SDK methods feel unintuitive, provide feedback to `feedback@vectara.com` with specific examples, as suggested in internal discussions.

## Next steps

- Explore other SDK methods for indexing (`client.index`), querying (`client.corpora.query`), or chat (`client.chats.create`).
- Review the [Vectara API Recipes](https://docs.vectara.com/docs/api-recipes) for practical examples.
- Experiment with the [Vectara API Playground](https://console.vectara.com) to test endpoints before coding.
