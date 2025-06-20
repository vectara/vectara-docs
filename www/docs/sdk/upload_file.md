---
id: upload
title: Upload Files
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

# Vectara Python SDK: Uploading Files

This guide covers the Vectara Python SDK for uploading files to a corpus, enabling automatic parsing, text extraction, chunking, and indexing for search and Retrieval Augmented Generation (RAG) operations. The upload method simplifies ingesting file-based content (e.g., PDFs, DOCX) compared to manual document indexing, making it ideal for bulk data processing.

## Prerequisites

<CodePanel
     title="Install Vectara SDK"
     defaultLanguage="bash"
     snippets={[
       { language: 'bash', code: `pip install vectara` }
     ]}
     annotations={{
       bash: [{ line: 1, text: 'Installs the Vectara Python SDK via pip.' }]
     }}
   />

1. **Install the SDK**:
   
<CodePanel
     title="Initialize VectaraClient"
     defaultLanguage="python"
     snippets={[
       { language: 'python', code: `from vectara import VectaraClient\n\n# Using API key\nclient = VectaraClient(api_key="your_api_key", customer_id="your_customer_id")\n\n# Using OAuth 2.0\nclient = VectaraClient(bearer_token="your_bearer_token", customer_id="your_customer_id")` }
     ]}
     annotations={{
       python: [
         { line: 3, text: 'Use an Index API Key for write operations like uploading.' },
         { line: 6, text: 'OAuth 2.0 is recommended for production environments.' }
       ]
     }}
   />

2. **Authentication**:
   - Obtain an API key or OAuth 2.0 token from the [Vectara Console](https://console.vectara.com).
   - Initialize the `VectaraClient` with your credentials.

3. **Corpus setup**: Create a corpus using `client.corpora.create` (see [Corpus Management Guide](vectara_python_sdk_corpora.md)).
4. **Prepare files**: Ensure files (e.g., PDFs, DOCX) are accessible on the local filesystem or as file objects.
5. Uploading indexes files for retrieval, not direct generation. For RAG or chat-based generation, use `client.corpora.query` or `client.chats.create` after uploading (see [Querying Corpora Guide](vectara_python_sdk_queries.md)).

## Upload method

### Upload a file

**Purpose**: Upload a file to a corpus, where Vectara automatically parses, extracts text, chunks, and indexes the content for search and RAG.

<CodePanel
  title="Method"
  defaultLanguage="python"
  snippets={[
    { language: 'python', 
    code: `client.upload.file(
    corpus_key: str,
    file_path: str,
    document_id: str = None,
    metadata: dict = None,
    table_extraction: dict = None,
    timeout: int = None,
    timeout_millis: int = None
) -> dict` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Specify the target corpus.' },
      { line: 4, text: 'Path to the PDF file on the local filesystem.' },
      { line: 6, text: 'Metadata for query filtering.' },
      { line: 7, text: 'Enable table extraction for tabular data.' }
    ],
    json: [
      { line: 2, text: 'Generated or provided document ID.' },
      { line: 7, text: 'Table extractor configuration.' },
      { line: 10, text: 'Response confirms successful indexing.' }
    ]
  }}
  layout="stacked"
/>


**Parameters**:
- `corpus_key`: Unique identifier of the target corpus (e.g., "legal_docs").
- `file_path`: Path to the file to upload (e.g., "contract.pdf").
- `document_id`: Optional unique identifier for the indexed document (e.g., "contract_2025_001"). If omitted, Vectara generates one.
- `metadata`: Optional dictionary of metadata for filtering (e.g., `{"department": "legal", "year": 2025}`).
- `table_extraction`: Optional dictionary specifying a table extractor (e.g., `{"name": "textract"}`).
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with indexing details, including `document_id`, `status`, and usage metrics (e.g., `bytes_used`, `table_extraction_used`).

<CodePanel
  title="Example: Upload a Legal PDF"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:\n    response = client.upload.file(\n        corpus_key="legal_docs",\n        file_path="contract.pdf",\n        document_id="contract_2025_001",\n        metadata={"department": "legal", "year": 2025},\n        table_extraction={"name": "textract"}\n    )\n    print(f"Uploaded document: {response['document_id']}")\n    print(f"Bytes used: {response['bytes_used']}")\nexcept Exception as e:\n    print(f"Upload failed: {e}")` },
    { language: 'json', code: `{\n  "corpus_key": "legal_docs",\n  "document_id": "contract_2025_001",\n  "metadata": {\n    "department": "legal",\n    "year": 2025\n  },\n  "table_extraction": {\n    "name": "textract"\n  },\n  "status": "File uploaded and indexed successfully",\n  "bytes_used": 524288,\n  "table_extraction_used": 2\n}` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Specify the target corpus.' },
      { line: 4, text: 'Path to the PDF file on the local filesystem.' },
      { line: 6, text: 'Metadata for query filtering.' },
      { line: 7, text: 'Enable table extraction for tabular data.' }
    ],
    json: [
      { line: 2, text: 'Generated or provided document ID.' },
      { line: 7, text: 'Table extractor configuration.' },
      { line: 10, text: 'Response confirms successful indexing.' }
    ]
  }}
  layout="stacked"
/>

**Error Handling**:
- **400 Bad Request**: Invalid file format, metadata, or parameters.
  - *Resolution*: Ensure the file is a supported format (e.g., PDF, DOCX). Validate `metadata` as a dictionary and `table_extraction` structure.
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use an Index API Key or OAuth token with write access.
- **404 Not Found**: Corpus doesn’t exist.
  - *Resolution*: Verify `corpus_key` using `client.corpora.list`.
- **409 Conflict**: Document with the same `document_id` already exists.
  - *Resolution*: Choose a unique `document_id` or delete the existing document using `client.documents.delete`.
- **413 Payload Too Large**: File exceeds size limit (100MB).
  - *Resolution*: Ensure file size is under 100MB or split large files into smaller parts.

:::tip Tips
- Supported file formats include PDF, DOCX, and others (see [Supported File Formats](https://docs.vectara.com/docs/api-reference/indexing-apis/indexing#supported-file-formats)).
- Vectara automatically extracts text and chunks the content into indexable parts, simplifying ingestion compared to `client.documents.index`.
- Use `table_extraction` for documents with tables (e.g., financial reports). See [Table Extractors](https://docs.vectara.com/docs/api-reference/indexing-apis/indexing#table-extraction).
- After uploading, query the document using `client.corpora.query` or verify indexing with `client.documents.get`.
:::

## Additional notes

- **Generation tasks**: Uploading indexes files for retrieval and RAG but doesn’t perform generation. For summarized responses, use `client.corpora.query` with `generation` parameters (e.g., `generation_preset_name="mockingbird-2.0"`) or `client.chats.create` for conversational AI (see [Querying Corpora Guide](vectara_python_sdk_queries.md)).
- **Query vs. prompt confusion**: Vectara’s API is retrieval-centric, using natural-language queries to find indexed content. To mimic prompt-based GenAI interactions, configure `prompt_template` in query or chat methods.
- **File processing**: Vectara handles parsing and chunking, but metadata enhances query precision (e.g., `doc.department = 'legal'`). Review extracted content with `client.documents.get` if needed.
- **Improving usability**: If parameters like `metadata` or `table_extraction` are unclear, provide feedback to `feedback@vectara.com` with specific examples, as suggested in internal discussions.

## Next sSteps

- Upload files to corpora using `client.upload.file`, then query them with `client.corpora.query`.
- Explore manual document indexing with `client.documents.index` for structured content (see [Indexing Documents Guide](vectara_python_sdk_indexing.md)).
- Use `client.chats.create` for conversational AI with uploaded data (forthcoming guide).
- Review the [Vectara API Recipes](https://docs.vectara.com/docs/api-recipes) for file upload examples.
- Test uploads in the [Vectara API Playground](https://console.vectara.com) to validate file formats and metadata.
