---
id: documents
title: Indexing Documents
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

Manage document data efficiently by addressing challenges like data sprawl and 
metadata inconsistencies for creating, querying, and maintaining documents. 
This guide covers both indexing new documents and managing existing ones,
making it ideal for building scalable search solutions or automating content 
governance.

- Create structured or core documents with custom metadata
- Index documents from text content or upload files
- List and filter documents in a corpus
- Retrieve, update, and delete documents by ID
- Summarize content using LLM-powered tools

:::info Prerequisites
This guide assumes you have a corpus called `my-docs`. If you haven't created 
a corpus yet, follow the [Quick Start](/docs/sdk/python/python-quickstart) guide to set up your first corpus.
:::

## Create a structured document

<CodePanel
  title="Create a structured document"
  snippets={[
    {
      language: 'python',
      code: `from vectara import StructuredDocument, StructuredDocumentSection

document = StructuredDocument(
    id="employee-policy-001",
    type="structured",
    sections=[
        StructuredDocumentSection(
            title="Employee Leave Policy",
            text="Detailed employee leave policy information...",
            metadata={"section_type": "policy"}
        ),
        StructuredDocumentSection(
            title="Overtime Compensation",
            text="Rules and procedures for overtime compensation...",
            metadata={"section_type": "compensation"}
        )
    ],
    metadata={"department": "HR", "version": "2.0"}
)

# Index the document
response = client.documents.create(
    corpus_key="my-docs",
    request=document
)`
    }
  ]}
  annotations={{
    python: [
      { line: 4, text: 'Document ID must be unique within the corpus' },
      { line: 8, text: 'Each section can have optional title and metadata' },
      { line: 18, text: 'Document-level metadata for filtering queries' },
      { line: 22, text: 'Use documents.create() method to index the document' }
    ]
  }}
  customWidth="50%"
/>

Create and index a structured document into your corpus to make it searchable. 
Structured documents are organized into sections, each with optional titles and metadata, 
making them ideal for contracts, reports, or other organized content.

The `documents.create` method corresponds to the HTTP POST 
`/v2/corpora/{corpus_key}/documents` endpoint.

**Key Parameters:**
- `id` (string, required): Unique identifier for the document within the corpus
- `type` (string, required): Must be "structured" for section-based documents  
- `sections` (array, required): List of document sections with text content
- `metadata` (object, optional): Document-level metadata for filtering

**Section Parameters:**
- `title` (string, optional): Section heading or title
- `text` (string, required): The actual content text for this section
- `metadata` (object, optional): Section-level metadata for fine-grained filtering

Use structured documents for organized content like employee handbooks, policies, 
or technical manuals where clear section organization improves searchability.

**Error Handling:**
- **400 Bad Request**: Invalid document structure or parameters
- **403 Forbidden**: Insufficient permissions - ensure API key has indexing rights
- **404 Not Found**: Corpus doesn't exist
- **409 Conflict**: Document with the same ID already exists

---

## Create a core document

<CodePanel
  title="Create a core document"
  snippets={[
    {
      language: 'python',
      code: `from vectara import CoreDocument, CoreDocumentPart

document = CoreDocument(
    id="support-guide-001",
    type="core",
    document_parts=[
        CoreDocumentPart(
            text="Troubleshooting 403 authentication errors in...",
            metadata={"part_type": "solution", "error_code": "403"}
        ),
        CoreDocumentPart(
            text="Token expiration is the most common cause of...",
            metadata={"part_type": "explanation", "error_code": "403"}
        )
    ],
    metadata={"category": "support", "priority": "high"}
)

# Index the document
response = client.documents.create(
    corpus_key="my-docs",
    request=document
)`
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: 'Type must be "core" for part-based documents' },
      { line: 6, text: 'Core documents use document_parts instead of sections' },
      { line: 9, text: 'Each part can have metadata for filtering' }
    ]
  }}
  customWidth="50%"
/>

Create and index a core document using document parts. Core documents are more flexible than 
structured documents and work well for unstructured content like support articles,
FAQs, or knowledge base entries.

**Key Differences from Structured Documents:**
- Uses `document_parts` instead of `sections`
- Parts don't have titles, only text content and optional metadata
- Better suited for unstructured or semi-structured content

**Use Core Documents When:**
- Content doesn't have clear section structure
- You want maximum flexibility in document organization
- Working with imported content from various sources

To update or overwrite the document, you must delete it using 
`client.documents.delete()` and then re-index it, as direct updates to 
content are not supported. Attempting to re-index with the same ID and 
different content will result in a 409 error.

**Error Handling:**
- **400 Bad Request**: Invalid document structure or parameters
- **403 Forbidden**: Insufficient permissions - ensure API key has indexing rights
- **404 Not Found**: Corpus doesn't exist
- **409 Conflict**: Document with the same ID already exists with different content
- **413 Payload Too Large**: Document exceeds size limit

<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />

---

## List documents in a corpus

<CodePanel
  title="List documents in a corpus"
  snippets={[
    {
      language: 'python',
      code: `documents = client.documents.list(
    corpus_key="my-docs",
    limit=10,
    metadata_filter='type = "policy"'
)

for document in documents:
    print(f"Document ID: {document.id}")
    print(f"Metadata: {document.metadata}")`
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: 'Returns an iterator for documents in the corpus' },
      { line: 4, text: 'Filter documents by metadata criteria' },
      { line: 8, text: 'Document objects contain ID and metadata, not full content' }
    ]
  }}
  customWidth="50%"
/>

Explore powerful methods to retrieve and manage document listings within a 
corpus, enabling efficient data access and organization.

The `documents.list` method corresponds to the HTTP GET `/v2/corpora/{corpus_key}/documents` endpoint. For more details on request and response parameters, see the [List Documents REST API](https://docs.vectara.com/docs/rest-api/list-documents).

**Parameters:**
- `corpus_key` (string, required): Unique identifier for the corpus
- `limit` (int, optional): Maximum number of documents to return per page (default: 10)
- `metadata_filter` (string, optional): Filter expression for document metadata
- `page_key` (string, optional): Token to fetch the next page of results

**Returns:** Iterator of Document objects (containing `id` and `metadata`, but not full content).

Use metadata filters to find specific document types or categories. The method returns 
paginated results for efficient handling of large document collections.

---

## Get a document by ID

<CodePanel
  title="Get a document by ID"
  snippets={[
    {
      language: 'python',
      code: `document = client.documents.get(
    corpus_key="my-docs",
    document_id="employee-policy-001"
)`
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: 'Specify the corpus containing the document' },
      { line: 3, text: 'Unique identifier of the document to fetch' },
    ]
  }}
  customWidth="50%"
/>

Access specific documents efficiently by their unique IDs, enabling 
detailed inspection or display within your corpus.

The `documents.get` method corresponds to the HTTP GET 
`/v2/corpora/{corpus_key}/documents/{document_id}` endpoint.

**Parameters:**
- `corpus_key` (string, required): Unique identifier of the corpus
- `document_id` (string, required): Unique identifier of the document

**Returns:** Document object with full text content and metadata.

Use this method when you need to retrieve the complete document content, 
not just the metadata returned by the list operation.

---

## Update document metadata

<CodePanel
  title="Update document metadata"
  snippets={[
    {
      language: 'python',
      code: `client.documents.update(
    corpus_key="my-docs",
    document_id="employee-policy-001",
    metadata={"priority": "urgent", "last_updated": "2025-07-02"}
)`
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: 'Update specific document by the corpus key' },
      { line: 3, text: 'Update specific document by the Document ID' },
      { line: 4, text: 'Provide new metadata to merge with existing data' }
    ]
  }}
  customWidth="50%"
/>

Enhance document management by updating metadata fields, perfect for tagging, 
categorization, and maintaining document status.

The `documents.update` method corresponds to the HTTP PATCH 
`/v2/corpora/{corpus_key}/documents/{document_id}` endpoint.

**Parameters:**
- `corpus_key` (string, required): Unique identifier of the corpus
- `document_id` (string, required): Unique identifier of the document
- `metadata` (object, required): New metadata to merge with existing metadata

The update operation merges the provided metadata with existing metadata, 
allowing you to add new fields or modify existing ones without losing other data.

---

## Delete a document

<CodePanel
  title="Delete a document"
  snippets={[
    {
      language: 'python',
      code: `client.documents.delete(
    corpus_key="my-docs",
    document_id="employee-policy-001"
)`
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: 'Specify the corpus key that contains the document for deletion' },
      { line: 3, text: 'Specify the document ID to delete' },
    ]
  }}
  customWidth="50%"
/>

Manage your corpus effectively by permanently removing documents, 
supporting data cleanup and lifecycle management.

The `documents.delete` method corresponds to the HTTP DELETE 
`/v2/corpora/{corpus_key}/documents/{document_id}` endpoint.

**Parameters:**
- `corpus_key` (string, required): Unique identifier of the corpus
- `document_id` (string, required): Unique identifier of the document to delete

:::caution
Deletion is permanent and cannot be undone. Ensure you have backups if the document 
might be needed later.
:::

---

## Summarize a document

<CodePanel
  title="Summarize a document"
  snippets={[
    {
      language: 'python',
      code: `summary = client.documents.summarize(
    corpus_key="my-docs",
    document_id="employee-policy-001",
    llm_name="vectara-summary-ext-24-05-med-omni",
    prompt_template="Provide a concise summary of the following document: $document_content"
  )`
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: 'Specify the corpus key' },
      { line: 3, text: 'Specify the document ID' },
      { line: 4, text: 'Specify the LLM model for summarization' },
      { line: 5, text: 'Custom prompt template with $document_content placeholder' },
    ]
  }}
  customWidth="50%"
/>

Generate LLM-powered summaries for specific documents in your corpus. Use this for 
content previews, search snippets, or generative UI applications.

The `documents.summarize` method corresponds to the HTTP POST 
`/v2/corpora/{corpus_key}/documents/{document_id}/summarize` endpoint.

**Parameters:**
- `corpus_key` (string, required): Unique identifier of the corpus
- `document_id` (string, required): Unique identifier of the document
- `llm_name` (string, optional): LLM model to use for summarization
- `prompt_template` (string, optional): Custom prompt with `$document_content` placeholder

**Returns:** Summary response object with the generated summary text.

Use custom prompt templates to tailor summaries for specific use cases like customer 
support, technical documentation, or content previews.

---

## Workflow: Create corpus and index document

<CodePanel
  title="Complete workflow: Create corpus and index document"
  snippets={[
    {
      language: 'python',
      code: `import os
import time
from vectara import Vectara, StructuredDocument, StructuredDocumentSection
from vectara.core.api_error import ApiError

# Set your API key
api_key = os.getenv("VECTARA_API_KEY", "YOUR_API_KEY")
if api_key == "YOUR_API_KEY":
    print("Please set VECTARA_API_KEY environment variable")
    exit(1)

# 1. Authenticate
print("1. Authenticating...")
client = Vectara(api_key=api_key)

# Step 1: Create corpus (if it doesn't exist)
try:
    corpus_response = client.corpora.create(
        key="my-docs",
        name="My Documentation"
    )
    print(f"Corpus created: {corpus_response.key}")
    time.sleep(2)  # Allow corpus to propagate
except ApiError as e:
    if "already exists" in str(e):
        print("Corpus 'my-docs' already exists, continuing...")
    else:
        raise

# Step 2: Create and index document
print("2. Indexing document...")
document = StructuredDocument(
    id="policy-template-001",
    type="structured",
    sections=[
        StructuredDocumentSection(
            title="Employee Policy Template",
            text="Standard template for employee policies...",
            metadata={"template_type": "policy"}
        )
    ],
    metadata={"document_category": "template"}
)

doc_response = client.documents.create(
    corpus_key="my-docs",
    request=document
)
print(f"✅ Indexed: {document.id}")

print("🎉 Document indexing complete!")`
    }
  ]}
  annotations={{
    python: [
      { line: 18, text: 'Create corpus first before indexing documents' },
      { line: 19, text: 'Use consistent my-docs corpus key' },
      { line: 23, text: 'Handle case where corpus already exists' },
      { line: 42, text: 'Index document into the corpus' }
    ]
  }}
  customWidth="50%"
/>

This example demonstrates the fundamental two-step workflow for establishing 
a new knowledge base in Vectara.

1. **Corpus creation**: The first step creates a new corpus with a 
   unique identifier (`key`) and human-readable name. The corpus acts as a 
   namespace for your documents and defines important characteristics like metadata 
   schemas, filter attributes, and access controls. The example includes error 
   handling for the common case where the corpus already exists.
2. **Document ingestion**: The second step uploads and indexes a structured document 
   into the corpus. The document is parsed into searchable sections, 
   with each section containing both text content and optional metadata. Vectara 
   processes the content automatically, making it immediately queryable through the 
   search API.

### Best Practices

* **Descriptive naming**: Use meaningful corpus keys and names that clearly 
  identify the content domain and purpose.
* **Consistent metadata**: Establish a uniform metadata schema across all documents 
  within a corpus to enable effective filtering.
* **Robust error handling**: Implement comprehensive logic that handles 
  both creation failures and "already exists" scenarios gracefully.
* **Verification steps**: Confirm corpus creation success before attempting document 
  indexing to avoid orphaned content.
* **Resource management**: Consider using unique corpus keys for testing to avoid 
  conflicts with existing resources.

<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />
<Spacer size="l" />


---

## Next steps

After understanding document management and indexing, you can:

- **Query documents**: Use `client.query()` to search across document content with the [Query guide](/docs/sdk/python/query)
- **Upload files**: Use `client.upload.file()` to index PDFs, DOCX, and other file formats with the [Upload Files guide](/docs/sdk/python/upload_file)
- **Manage corpora**: Create and configure corpora with `client.corpora.create()` using the [Corpora guide](/docs/sdk/python/corpus)
- **Batch operations**: Process multiple documents efficiently for large-scale content management
- **Advanced filtering**: Leverage metadata for sophisticated document organization
