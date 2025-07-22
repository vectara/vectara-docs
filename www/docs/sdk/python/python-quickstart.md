---
id: python-quickstart
title: Quick Start
sidebar_label: Quick Start
hide_table_of_contents: true
---

import { Spacer } from "@site/src/components/ui/Spacer";
import CodePanel from '@site/src/theme/CodePanel';

Get up and running with the Vectara Python SDK in minutes. This quick start 
guides you through installing the SDK, authenticating with an API key, creating 
a corpus, uploading a document, and running a semantic query.

Each step builds toward a functional setup for indexing and querying content, 
enabling you to leverage Vectara's Retrieval Augmented Generation (RAG) 
capabilities for applications like enterprise search, chatbots, or knowledge 
bases.

## Prerequisites

1. Install Python 3.7 or later.
2. Get an API key from the [Vectara Console](https://console.vectara.com).
  
API keys can have multiple types and roles from Personal (most 
administrative functions) to QueryService (read-only) to read and write 
(IndexService). For more information, see 
[Authentication Methods and Authorization Levels](https://docs.vectara.com/docs/learn/authentication/auth-overview).


---

## 1. Install the SDK

<CodePanel
  title="Install the SDK"
  snippets={[
    {
      language: 'bash',
      code: `pip install vectara`,
    },
  ]}
  customWidth="50%"
/>

Install the Vectara Python SDK using pip to access its core functionality for 
interacting with Vectara's API.

This step prepares your Python environment 
(version 3.7 or higher recommended) for corpus management, document indexing, 
and querying.

- **Command**: `pip install vectara`
- **Purpose**: Downloads and installs the SDK and its dependencies from PyPI.
- Run in a virtual environment to avoid dependency conflicts.  

Ensure pip is up-to-date (`pip install --upgrade pip`). After installation, import the `vectara` module to begin using the SDK.

---

## 2. Authenticate

<CodePanel
  title="Authenticate with API Key"
  snippets={[
    {
      language: 'python',
      code: `from vectara import Vectara

client = Vectara(api_key="YOUR_API_KEY")`
    }
  ]}
  annotations={{
    python: [
      { line: 3, text: "Replace with your API key from the Vectara Console" }
    ]
  }}
  customWidth="50%"
/>

Authenticate with the Vectara API using an API key to securely access your 
account's resources.  

The `Vectara` client initializes a connection to 
Vectara's services, enabling subsequent operations like corpus creation and 
querying.

 - `api_key` (string, required): A unique API key from the Vectara Console, used 
  for authentication.  
  Example: `zwt_abc123...`.  
  Keep this secret to prevent unauthorized access.
- **Purpose**: Establishes a secure session with Vectara's API, required for all SDK 
  operations.
- **Constraints**: Obtain the API key from the Vectara Console under your 
  account settings.  
  Ensure the key has appropriate roles (`serving` for querying, `admin` for corpus creation).  

Store API keys in environment variables or secure vaults (`.env` 
files) to avoid hardcoding in production code. 

<CodePanel
  title="Authenticate with OAuth"
  snippets={[
    {
      language: 'python',
      code: `from vectara import Vectara

client = Vectara(
    client_id="YOUR_CLIENT_ID",
    client_secret="YOUR_CLIENT_SECRET"
)`
    }
  ]}
  annotations={{
    python: [
      { line: 4, text: "Replace with your OAuth client ID" },
      { line: 5, text: "Replace with your OAuth client secret" }
    ]
  }}
  customWidth="50%"
/>

Alternatively, authenticate using OAuth2:

Obtain your OAuth credentials from the Vectara Console. This method is 
suitable for applications requiring token-based authentication.

<Spacer size="l" />
<Spacer size="l" />

---

## 3. Create a Corpus

<CodePanel
  title="Create Corpus"
  snippets={[
    {
      language: 'python',
      code: `response = client.corpora.create(
      key=corpus_key,
      name="Quick Start Docs"
  )`
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: "Corpus key must be unique in your account" },
      { line: 3, text: "Give your corpus a descriptive name" }
    ]
  }}
  customWidth="50%"
/>

A corpus is a collection of documents that you can search and query. Think of 
it as a database for your text content. Each corpus can have its own 
configuration, metadata schema, and access controls.

Creating a corpus requires a unique key and descriptive name. The corpus key 
acts as an identifier for all future operations, so choose something memorable 
and descriptive. 

The `corpora.create` endpoint (HTTP POST `/corpora`) sets up a new corpus with a 
unique identifier, forming the foundation for storing and querying content. 
For more details on request and response parameters, see the 
[Create Corpus REST API](https://docs.vectara.com/docs/rest-api/create-corpus).

- `key` (string, required): A unique identifier for the corpus 
  (`quickstart-corpus`).  
  Must be alphanumeric, underscores, or hyphens, with a maximum length of 100 characters.  
- `name` (string, required): A human-readable name (`Quick Start Docs`).  
  Maximum length: 255 characters.  
  Helps identify the corpus in the Vectara Console.
- `description` (string, optional): A brief description of the corpus's 
  purpose (`Demo corpus for quickstart`).  
  Maximum length: 1000 characters.
- `request_timeout` (integer, optional): Timeout in seconds for the 
  API request (10).
- `request_timeout_millis` (integer, optional): Timeout in milliseconds, 
  overriding `request_timeout` if set (10000).
- **Purpose**: Initializes a corpus for storing documents, enabling search, 
  chat, or RAG workflows.
- **Returns**: A corpus object with `key`, `name`, and other metadata, confirming 
  creation.
- **Constraints**: The `key` must be unique within your account.  
  Invalid characters or duplicates result in an API error (HTTP 400).

Use descriptive names for team collaboration. After creation, assign user or 
API key permissions to control access.

---

## 4. Upload a Document

<CodePanel
  title="Upload Document"
  snippets={[
    {
      language: 'python',
      code: `from vectara import StructuredDocument, StructuredDocumentSection

document = StructuredDocument(
    id="welcome-doc",
    type="structured",
    sections=[
        StructuredDocumentSection(
            title="Welcome",
            text="Welcome to Vectara! This is your first document."
        )
    ]
)

response = client.documents.create(
    corpus_key="quickstart-corpus",
    request=document
)`
    }
  ]}
  annotations={{
    python: [
      { line: 4, text: "Document must have a unique ID" },
      { line: 8, text: "Add a simple section with title and text" }
    ]
  }}
  customWidth="50%"
/>

Vectara supports two types of documents: `structured` and `core`. Upload a 
document to your corpus to make its content searchable. The `documents.create` 
endpoint (HTTP POST `/documents`) indexes a structured 
document, consisting of sections with titles and text, into the specified 
corpus. 

This step populates your corpus with content for querying. For more details on 
request and response parameters, see the [Index Document REST API](https://docs.vectara.com/docs/rest-api/index-document).

<CodePanel
  title="Upload Core Document"
  snippets={[
    {
      language: 'python',
      code: `from vectara import CoreDocument, CoreDocumentPart

document = CoreDocument(
    id="welcome-doc",
    type="core",
    document_parts=[
        CoreDocumentPart(
            text="Welcome to Vectara! This is your first document."
        )
    ]
)

response = client.documents.create(
    corpus_key="quickstart-corpus",
    request=document
)`
    }
  ]}
  annotations={{
    python: [
      { line: 4, text: "Document must have a unique ID" },
      { line: 8, text: "Add a simple part with text" }
    ]
  }}
  customWidth="50%"
/>

To upload a core document:

- `corpus_key` (string, required): The target corpus identifier (`quickstart-corpus`), matching the key from step 3.
 - `request` (StructuredDocument or CoreDocument, required): Defines the document structure.
   - `id` (string, required): A unique document ID within the corpus (`welcome-doc`). 
  Alphanumeric, underscores, or hyphens, maximum 100 characters.
   - `type` (string, required): Set to `"structured"` for section-based documents or `"core"` for part-based documents.
   - For structured: `sections` (list[StructuredDocumentSection], required): List of document sections.
     - `title` (string, optional): Section title (`Welcome`).  
  Maximum length: 255 characters.
     - `text` (string, required): Section content (`Welcome to Vectara! This is your first document.`).  
  Maximum length: varies by account limits.
     - `metadata` (dict, optional): Key-value pairs for filtering (`{"category": "intro"}`).
   - For core: `document_parts` (list[CoreDocumentPart], required): List of document parts.
     - `text` (string, required): Part content.
     - `metadata` (dict, optional): Key-value pairs.
   - `metadata` (dict, optional): Document-level metadata (`{"source": "quickstart"}`).
- **Purpose**: Indexes a document for semantic search, enabling queries to retrieve relevant 
  content.
- **Returns**: A response confirming the document was indexed, including its `id`.
- **Constraints**: The `id` must be unique within the corpus. Exceeding size limits or 
  invalid characters results in an API error (HTTP 400).

Structured documents support section-based organization, ideal for manuals or 
reports. Core documents are simpler, with sequential parts. Use metadata to 
enable filtering in queries (by category). For larger datasets, consider 
uploading files (PDFs).

---

## 5. Run a Query

<CodePanel
  title="Query"
  snippets={[
    {
      language: 'python',
      code: `from vectara import SearchCorporaParameters

search = SearchCorporaParameters(
    corpora=[{"corpus_key": "quickstart-corpus"}]
)

response = client.query(
    query="What is Vectara?",
    search=search
)

print(response.results)`
    }
  ]}
  annotations={{
    python: [
      { line: 8, text: "Query your corpus with natural language" },
      { line: 12, text: "Print search results" }
    ]
  }}
  customWidth="50%"
/>

Run a semantic query against your corpus to retrieve relevant content using 
natural language. 

The `client.query` endpoint (HTTP POST `/query`) searches the corpus and 
returns results ordered by relevance. For more details on request and response 
parameters, see the [Query REST API](https://docs.vectara.com/docs/rest-api/query-corpus).

 - `query` (string, required): The natural language query (`"What is Vectara?"`).  
  Maximum length: 1000 characters.
 - `search` (SearchCorporaParameters, required): Configures the search parameters.
   - `corpora` (list[dict], required): List of corpora to query.
     - `corpus_key` (string, required): The corpus to search (`quickstart-corpus`).
     - `metadata_filter` (string, optional): Filters results by metadata (`doc.category = 'intro'`).  
  Default: empty string.
     - `lexical_interpolation` (float, optional): Balances lexical and semantic search 
  (0.0 to 1.0, default 0.005).
   - `context_configuration` (ContextConfiguration, optional): Configures result context 
  (`sentences_before=2`, `sentences_after=2`).
   - `reranker` (dict, optional): Applies a reranker for refined ordering  
  (`{"type": "customer_reranker", "reranker_name": "Rerank_Multilingual_v1"}`).
 - `generation` (GenerationParameters, optional): Configures response generation 
(`response_language="eng"`).
- **Purpose**: Retrieves relevant documents or generates answers based on the corpus content, using semantic understanding.
- **Returns**: A response object with:
  - `results` (list): Search results, each with `text`, `score` (float, 0.0 to 1.0), and metadata.
  - `answer` (string, optional): Generated answer if `generation` is configured.
- **Constraints**: The `corpus_key` must exist and contain indexed documents. Queries exceeding length limits result in an API error (HTTP 400).

---

## Quick start validation script

<CodePanel
title="Complete Validation Script"
snippets={[
{
language: 'python',
code: `import os
import time
from vectara import Vectara
from vectara import StructuredDocument, StructuredDocumentSection, SearchCorporaParameters
from vectara.core.api_error import ApiError

# Set your API key
api_key = os.getenv("VECTARA_API_KEY", "YOUR_API_KEY")

if api_key == "YOUR_API_KEY":
    print("Please set VECTARA_API_KEY environment variable")
    exit(1)

# 1. Authenticate
print("1. Authenticating...")
client = Vectara(api_key=api_key)

# 2. Create corpus
print("2. Creating corpus...")
corpus_key = "quickstart-docs"
response = client.corpora.create(
        key=corpus_key,
        name="Quick Start Docs"
    )
    print(f"✅ Created: {response.name}")
    time.sleep(2)  # Allow corpus to propagate

# 3. Upload document
print("3. Uploading document...")
document = StructuredDocument(
    id="welcome-doc",
    type="structured",
    sections=[
        StructuredDocumentSection(
            title="Welcome",
            text="Welcome to Vectara! This is your first document."
        )
    ]
)

response = client.documents.create(
        corpus_key=corpus_key,
        request=document
    )
    print(f"✅ Uploaded: {document.id}")

# 4. Query
print("4. Running query...")
response = client.corpora.search(
    corpus_key=corpus_key,
    query="What is Vectara?"
)

if hasattr(response, 'search_results') and response.search_results:
    print(f"✅ Found {len(response.search_results)} results")
    top_result = response.search_results[0]
    print(f"Top result: {top_result.text[:100]}...")

print("🎉 Quickstart validation complete!")`
}
]}
annotations={{
python: [
{ line: 8, text: "Get API key from environment variable for security" },
{ line: 16, text: "Initialize the Vectara client with your API key" },
{ line: 22, text: "Use a simple, descriptive corpus key" },
{ line: 21, text: "Create corpus with direct method parameters" },
{ line: 26, text: "Small delay ensures corpus is ready for document upload" },
{ line: 30, text: "Create a structured document with sections" },
{ line: 50, text: "Upload document using the corpus key" },
{ line: 51, text: "Use single-corpus search method" },
{ line: 56, text: "Access results via search_results attribute" }
]
}}
layout="stacked"
/>


This full validation script demonstrates all the quickstart concepts working 
together in a single, executable file. The script handles common edge cases 
and provides clear feedback at each step.

* **Environment Variables:** The script securely retrieves the API key from 
  environment variables (`VECTARA_API_KEY`) rather than hardcoding sensitive 
  credentials.
* **Error handling:** Uses `ApiError` for proper exception handling, catching 
  specific error conditions like "already exists" scenarios that commonly 
  occur during testing.
* **Corpus Propagation:** Includes a small delay (`time.sleep(2)`) after corpus 
  creation to ensure the corpus is fully available before attempting document 
  upload.
* **Simple Corpus Keys:** Uses straightforward naming conventions (`quickstart-docs`) 
  that are reliable across different environments.
* **Single-Corpus Search:** Demonstrates the simplified `client.corpora.search()` 
  method for querying a specific corpus directly.

### Run the validation script

1. Set your API key: `export VECTARA_API_KEY=your_key_here`.
2. Save the script as `validate_quickstart.py`.
3. Run python3 `validate_quickstart.py`.

The script outputs step-by-step progress and handles cases where resources 
already exist from previous runs.

Expected Output
```
1. Authenticating...
2. Creating corpus...
✅ Created: Quick Start Docs
1. Uploading document...
✅ Uploaded: welcome-doc
1. Running query...
✅ Found 1 results
Top result: Welcome to Vectara! This is your first document...
🎉 Quickstart validation complete!
```

This quickstart uses a simple query for demonstration. Enhance queries with 
rerankers or metadata filters for precision (see Types of Rerankers). For 
real-time applications, consider streaming queries (`query_stream`).

Your SDK and corpus are live, with a document indexed and a query executed. 
Next, explore advanced features like rerankers, chat sessions, or generation 
presets.

---

## Cleanup: Delete the Corpus

<CodePanel
  title="Delete Corpus"
  snippets={[
    {
      language: 'python',
      code: `from vectara import Vectara

# Assuming client is already created as in step 2
response = client.corpora.delete(key="quickstart-docs")
print("✅ Corpus deleted")`
    }
  ]}
  customWidth="50%"
/>

If you want to delete the corpus to clean up or retry the quickstart:

This calls the delete corpus API to remove the corpus and all its documents. Note that this operation is irreversible.