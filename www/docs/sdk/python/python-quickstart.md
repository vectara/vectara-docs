---
id: python-quickstart
title: Quick Start
sidebar_label: Quick Start
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';

Get up and running with the Vectara Python SDK in minutes. This quick start 
guides you through installing the SDK, authenticating with an API key, creating 
a corpus, uploading a document, and running a semantic query.

Each step builds toward a functional setup for indexing and querying content, 
enabling you to leverage Vectara's Retrieval Augmented Generation (RAG) 
capabilities for applications like enterprise search, chatbots, or knowledge 
bases.

---

## 1. Install the SDK

<CodePanel
  title="Install"
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

---

## 3. Create a Corpus

<CodePanel
  title="Create Corpus"
  snippets={[
    {
      language: 'python',
      code: `from vectara.managers import CreateCorpusRequest

request = CreateCorpusRequest(
    key="quickstart-corpus",
    name="Quick Start Docs"
)
response = client.corpora.create(request)`
    }
  ]}
  annotations={{
    python: [
      { line: 3, text: "Corpus key must be unique in your account" },
      { line: 4, text: "Give your corpus a descriptive name" }
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

The `corpora.create` endpoint 
(HTTP POST `/corpora`) sets up a new corpus with a unique identifier, forming 
the foundation for storing and querying content.

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

Upload a document to your corpus to make its content searchable. The 
`documents.create` endpoint (HTTP POST `/documents`) indexes a structured 
document, consisting of sections with titles and text, into the specified 
corpus. 

This step populates your corpus with content for querying.

- `corpus_key` (string, required): The target corpus identifier (`quickstart-corpus`), matching the key from step 3.
 - `request` (StructuredDocument, required): Defines the document structure.
   - `id` (string, required): A unique document ID within the corpus (`welcome-doc`). 
  Alphanumeric, underscores, or hyphens, maximum 100 characters.
   - `type` (string, required): Set to `"structured"` for section-based documents.
   - `sections` (list[StructuredDocumentSection], required): List of document sections.
     - `title` (string, optional): Section title (`Welcome`).  
  Maximum length: 255 characters.
     - `text` (string, required): Section content (`Welcome to Vectara! This is your first document.`).  
  Maximum length: varies by account limits.
     - `metadata` (dict, optional): Key-value pairs for filtering (`{"category": "intro"}`).
   - `metadata` (dict, optional): Document-level metadata (`{"source": "quickstart"}`).
- **Purpose**: Indexes a document for semantic search, enabling queries to retrieve relevant 
  content.
- **Returns**: A response confirming the document was indexed, including its `id`.
- **Constraints**: The `id` must be unique within the corpus. Exceeding size limits or 
  invalid characters results in an API error (HTTP 400).

Structured documents support section-based organization, ideal for manuals or 
reports. Use metadata to enable filtering in queries (by category). For larger 
datasets, consider uploading files (PDFs).

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
      { line: 7, text: "Query your corpus with natural language" },
      { line: 12, text: "Print search results" }
    ]
  }}
  customWidth="50%"
/>

Run a semantic query against your corpus to retrieve relevant content using 
natural language. 

The `client.query` endpoint (HTTP POST `/query`) searches the corpus and 
returns results ordered by relevance.

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

This quickstart uses a simple query for demonstration. Enhance queries with 
rerankers or metadata filters for precision (see Types of Rerankers). For 
real-time applications, consider streaming queries (`query_stream`).

Your SDK and corpus are live, with a document indexed and a query executed. 
Next, explore advanced features like rerankers, chat sessions, or generation 
presets.