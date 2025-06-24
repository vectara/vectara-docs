---
id: corpus
title: Corpora
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

This guide covers the Vectara Python SDK for managing corpora, which are 
containers for storing documents and metadata in the Vectara platform. These 
methods support administrative tasks like creating, listing, updating, and 
deleting corpora, enabling you to organize data for search and Retrieval 
Augmented Generation (RAG) operations. This guide focuses on corpus management, 
not direct search or generation. For querying corpora (including RAG), see the 
`query_corpus` method in the [Query API guide](https://docs.vectara.com/docs/api-reference/search-apis/search).

## Create a corpus

<CodePanel
  title="Create a corpus"
  snippets={[
    { language: 'python', code: `client.corpora.create(corpus_key: str, name: str, description: \nstr = "", timeout: int = None, timeout_millis: int = None) -> dict` },
  ]}
  customWidth="50%"
/>

Set up a new corpus to serve as a centralized container for your organization’s 
documents and metadata, enabling efficient search and RAG operations.

This section guides you through creating a corpus with a unique identifier, making 
it a foundational step for managing enterprise data.

- `corpus_key`: Unique identifier for the corpus, such as "legal_docs". Must follow 
  naming conventions (see [Corpus Key Definition](https://docs.vectara.com/docs/api-reference/search-apis/search#corpus-key-definition)).
- `name`: Human-readable name ("Legal Knowledgebase").
- `description`: Optional description of the corpus’s purpose ("Contains case 
  law, contracts").
- `timeout`: Optional timeout in seconds.
- `timeout_millis`: Optional timeout in milliseconds (overrides `timeout` if set).

---

### Example: Create a legal corpus

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
  customWidth="50%"
/>

Create a corpus tailored for legal documents, demonstrating how to initialize 
it with a unique key, name, and description. 

This example helps you establish 
a dedicated storage space for case law and contracts, streamlining legal data 
management.

---

### Example: Create a manufacturing corpus

<CodePanel
  title="Example: Create a manufacturing corpus"
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
  "description": "Assembly line shutdown/restart, error codes, \nmaintenance guides"
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

Build a corpus for manufacturing standard operating procedures (SOPs) using 
the API, showcasing an alternative approach with HTTP requests. 

This example illustrates how to set up a corpus for operational data, 
enhancing workflow efficiency.

Use descriptive `corpus_key` values (`"clinical_guidelines"`) to simplify 
querying. 

This method sets up the corpus but doesn’t index documents. Use `client.index` 
methods for document ingestion.

This example returns a ictionary with `status` and `corpus_key`:

(`{"status": "The corpus has been created.", "corpus_key": "legal_docs"}`).

<Spacer size="l" />
<Spacer size="l" />

**Error Handling**:
- **400 Bad Request**: Invalid `corpus_key` or request body.
  - **Resolution**: Ensure `corpus_key` is unique and follows naming rules. Check for 
  valid JSON in the request.
- **403 Forbidden**: Insufficient permissions.
  - **Resolution**: Verify your API key or token has corpus creation rights. Use an Index API 
  Key or OAuth token with appropriate scopes.
- **409 Conflict**: Corpus with the same `corpus_key` already exists.
  - **Resolution**: Choose a different `corpus_key` or delete the existing corpus.

---

## List corpora

<CodePanel
  title="Example: List corpora"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.list(limit: int = 10, filter: str = None, page_key: \nstr = None, timeout: int = None, timeout_millis: int = None) -> dict`,
    },
  ]}
  customWidth="50%"
/>

Efficiently manage your account’s corpora by retrieving a paginated list, with 
options to filter and paginate results. This section helps you oversee 
multiple corpora, ensuring you can monitor and maintain your enterprise 
data infrastructure.

- `limit`: Maximum number of corpora to return (1–100, default: 10).
- `filter`: Optional regex to filter by corpus name or description ("finance").
- `page_key`: Optional token for pagination, returned in previous responses.
- `timeout`, `timeout_millis`: Optional timeouts.

### Example: List a financial corpora

<CodePanel
  title="Example: List a financial corpora"
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
  customWidth="50%"
/>

Retrieve a filtered list of corpora containing "finance" in their name, 
demonstrating pagination and error handling. This example enables you to 
quickly identify and manage finance-related corpora in your organization.

- Use `page_key` to fetch additional pages if more than `limit` corpora 
  exist.
- Corpus metadata is less detailed than `get_corpus`. Use `client.corpora.get` 
  for full details.

This returns a ictionary with `corpora` (list of corpus metadata) and 
`metadata` (pagination info, `page_key`).

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
  - **Resolution**: Ensure your API key or token allows listing corpora.

---

## Retrieve a corpus

<CodePanel
  title="Example: Retrieve a corpus"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.get(corpus_key: str, timeout: int = None, \ntimeout_millis: int = None) -> dict`,
    },
  ]}
  customWidth="50%"
/>

Access detailed metadata for a specific corpus to gain insights into its 
configuration and usage. 

This section supports administrative tasks like 
auditing or verifying corpus settings, critical for enterprise data 
governance.

- `corpus_key`: Unique identifier of the corpus (e.g., "legal_docs").
- `timeout`, `timeout_millis`: Optional timeouts.

This returns a dictionary with corpus metadata, such as `id`, `name`, 
`filter_attributes`, and `limits`.

### Example: Retrieve legal metadata

<CodePanel
  title="Example: List legal metadata"
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
  customWidth="50%"
/>

Fetch metadata for a legal corpus, showcasing how to retrieve document counts 
and other details. 

This example aids in monitoring corpus usage and ensuring 
compliance with data policies. 

It includes details like `filter_attributes` 
and `custom_dimensions`, useful for configuring queries.

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
  - **Resolution**: Verify your API key or token has read access.
- **404 Not Found**: Corpus doesn’t exist.
  - **Resolution**: Check the `corpus_key` for typos or confirm the corpus 
  exists with `list_corpora`.

---

## Update a corpus

<CodePanel
  title="Example: Update a corpus"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.update(corpus_key: str, name: str = None, description: \nstr = None, enabled: bool = None, \ntimeout: int = None, timeout_millis: int = None) -> dict`,
    },
  ]}
  customWidth="50%"
/>

Modify an existing corpus’s properties, such as its name or status, to adapt 
to changing business requirements. This section supports maintenance tasks 
like archiving or enabling/disabling corpora for operational flexibility.

- `corpus_key`: Unique identifier of the corpus.
- `name`: Optional new name.
- `description`: Optional new description.
- `enabled`: Optional boolean to enable/disable the corpus.
- `timeout`, `timeout_millis`: Optional timeouts.

This returns the updated corpus metadata.

### Example: Disable a financial corpus

<CodePanel
  title="Example: Disable a financial corpus"
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
  customWidth="50%"
/>

Disable a corpus for archiving, demonstrating name and status changes. 

This example helps manage data availability during audits or maintenance 
periods.

---

### Example: Update document metadata

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
  customWidth="50%"
/>

Modify document metadata within a corpus using an HTTP PATCH request, showing 
how to update specific fields.

This example supports dynamic tagging and 
categorization in a financial context.

---

### Example: Replace financial metadata

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
  customWidth="50%"
/>

Replace all metadata for a document using an HTTP PUT request, demonstrating a 
complete overhaul of tags. Disabling a corpus (`enabled=False`) prevents new 
indexing but allows read-only queries.

This example is useful for resetting metadata to 
align with new business categories.

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
  - **Resolution**: Use an Index API Key or OAuth token with write access.
- **404 Not Found**: Corpus doesn’t exist.
  - **Resolution**: Verify the `corpus_key`.

---

## Delete a corpus

<CodePanel
  title="Example: Delete a corpus"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.delete(corpus_key: str, timeout: int = None, timeout_millis: int = None) -> None`,
    },
  ]}
  customWidth="50%"
/>

Permanently remove a corpus and its data to manage storage and lifecycle 
effectively. This section is essential for enterprise data cleanup and 
compliance with retention policies.

- `corpus_key`: Unique identifier of the corpus.
- `timeout`, `timeout_millis`: Optional timeouts.

This returns none (204 No Content on success).

### Example: Delete an outdated corpus

<CodePanel
  title="Example: Delete an outdated corpus"
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
  customWidth="50%"
/>

Delete an outdated corpus, demonstrating error handling for a clean removal 
process. This example supports purging obsolete data to optimize resource 
usage.

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
  - **Resolution**: Ensure write access.
- **404 Not Found**: Corpus doesn’t exist.
  - **Resolution**: Confirm the `corpus_key`.

:::caution
Deletion is irreversible. Use `reset_corpus` to clear data without deleting 
the corpus.
:::

---

## Reset a Corpus

<CodePanel
  title="Example: Reset a corpus"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.reset(corpus_key: str, timeout: int = None, timeout_millis: int = None) -> None`,
    },
  ]}
  customWidth="50%"
/>

Clear all documents and data from a corpus while preserving its structure, 
ideal for testing or data refresh scenarios. This section helps maintain 
corpus integrity without recreation.

- `corpus_key`: Unique identifier of the corpus.
- `timeout`, `timeout_millis`: Optional timeouts.

This returns none (204 No Content on success).

### Example: Reset a test corpus

<CodePanel
  title="Example: Reset a test corpus"
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
  customWidth="50%"
/>

Reset a test corpus to clear its data, showcasing error handling for a safe 
reset. This example is perfect for preparing a corpus for new test data.

This is useful for testing or clearing outdated data without recreating the 
corpus.

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
  - **Resolution**: Verify write access.
- **404 Not Found**: Corpus doesn’t exist.
  - **Resolution**: Check the `corpus_key`.

---

## Replace Filter Attributes

<CodePanel
  title="Example: Replace filter attributes"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.replace_filter_attributes(corpus_key: str, filter_attributes: \nList[dict], timeout: int = None, timeout_millis: int = None) -> dict`,
    },
  ]}
  customWidth="50%"
/>

Update a corpus’s filter attributes asynchronously to refine metadata-based 
querying capabilities. This section enhances search precision for enterprise 
applications with evolving data needs.

- `corpus_key`: Unique identifier of the corpus.
- `filter_attributes`: List of filter attribute dictionaries (e.g., `[{"name": "department", "level": "document", "type": "text", "indexed": True}]`).
- `timeout`, `timeout_millis`: Optional timeouts.

This returns a dictionary with job details (`job_id`).

### Example: Replace filter attributes

<CodePanel
  title="Example: Replace filter attributes"
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
  customWidth="50%"
/>

Replace filter attributes for a legal corpus to include jurisdiction and 
document type, demonstrating job creation. This example improves query 
targeting for legal searches.

This operation creates a background job. Monitor job status using 
`client.jobs.get`. 

New filters are applied only after the job completes.

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
  - **Resolution**: Ensure write access.
- **404 Not Found**: Corpus doesn’t exist.
  - **Resolution**: Verify the `corpus_key`.

---

## Compute corpus size

<CodePanel
  title="Example: Compute corpus size"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.compute_size(corpus_key: str, \ntimeout: int = None, timeout_millis: int = None) -> dict`,
    },
  ]}
  customWidth="50%"
/>

Assess a corpus’s current size to monitor storage usage and plan capacity 
effectively. This section supports enterprise resource management and 
compliance with usage limits.

- `corpus_key`: Unique identifier of the corpus.
- `timeout`, `timeout_millis`: Optional timeouts.

This returns a dictionary with size metrics (`used_docs`, `used_parts`, 
`used_characters`).

### Example: Compute legal corpus size

<CodePanel
  title="Example: Compute legal corpus size"
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
  customWidth="50%"
/>

Compute the size of a legal corpus, displaying document and character counts. 
This example aids in tracking storage consumption for optimization.

This is useful for monitoring storage usage against corpus limits.

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
  - **Resolution**: Verify read access.
- **404 Not Found**: Corpus doesn’t exist.
  - **Resolution**: Check the `corpus_key`.

## Differences from generation and query tasks

- **Generation Tasks**: Corpus management methods are administrative and do not 
  directly support generation. For RAG or chat-based generation, use 
  `client.corpora.query` or `client.chats.create` with a `generation_preset_name` 
  like `mockingbird-2.0`. See the [Query API guide](https://docs.vectara.com/docs/api-reference/search-apis/search) 
  for details.
- **Query vs. prompt confusion**: Vectara’s API uses a retrieval-centric model with 
  natural-language queries, not prompt-based interactions like many GenAI 
  platforms. For prompt-like behavior, configure `prompt_template` in query or 
  chat methods.

## Next steps

- Explore other SDK methods for indexing (`client.index`), querying (
  `client.corpora.query`), or chat (`client.chats.create`).
- Experiment with the [Vectara Console](https://console.vectara.com) 
  to test endpoints before coding.

