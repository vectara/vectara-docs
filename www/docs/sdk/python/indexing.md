---
id: ingest_data
title: Index
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
  snippets={[
    { language: 'bash', code: `pip install vectara` }
  ]}
  customWidth="50%"
/>

Install the Vectara Python SDK to enable document indexing capabilities for 
your enterprise applications.

<Spacer size="l" />

## Initialize the Vectara Client

<CodePanel
  title="Initialize the Vectara client"
  snippets={[
    {
      language: 'python',
      code: `from vectara import Vectara
from vectara.core.api_error import ApiError

# Initialize client with API key
client = Vectara(api_key="YOUR_API_KEY")`
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: 'Use an API key with indexing permissions for write operations.' }
    ]
  }}
  customWidth="50%"
/>

Set up authentication to securely access indexing methods using an API key.
Ensure your API key has indexing (write) permissions for the target corpus.

---

## Index a structured document

<CodePanel
  title="Index a structured document"
  snippets={[
    {
      language: 'python',
      code: `from vectara import StructuredDocument, StructuredDocumentSection

try:
    # Create structured document
    document = StructuredDocument(
        id="support-contract-001",
        type="structured",
        sections=[
            StructuredDocumentSection(
                title="Contract Overview",
                text="This vendor agreement establishes terms and...",
                metadata={"section_type": "overview"}
            ),
            StructuredDocumentSection(
                title="Payment Terms", 
                text="Payment shall be made within 30 days of invoice...",
                metadata={"section_type": "payment"}
            )
        ],
        metadata={"document_type": "contract", "year": "2025"}
    )
    
    # Index the document
    response = client.documents.create(
        corpus_key="legal-docs",
        request=document
    )
    
    print(f"Document indexed successfully: {response}")
    
except ApiError as e:
    print(f"Failed to index document: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 6, text: 'Document ID must be unique within the corpus' },
      { line: 7, text: 'Type must be "structured" for section-based documents' },
      { line: 12, text: 'Each section can have optional title and metadata' },
      { line: 20, text: 'Document-level metadata for filtering queries' },
      { line: 24, text: 'Use documents.create() method to index the document' }
    ]
  }}
  customWidth="50%"
/>

Ingest a structured document into a corpus to make it searchable. Structured documents
are organized into sections, each with optional titles and metadata, making them ideal
for contracts, reports, or other organized content.

**Key Parameters:**
- `id` (string, required): Unique identifier for the document within the corpus
- `type` (string, required): Must be "structured" for section-based documents  
- `sections` (array, required): List of document sections with text content
- `metadata` (object, optional): Document-level metadata for filtering

**Section Parameters:**
- `title` (string, optional): Section heading or title
- `text` (string, required): The actual content text for this section
- `metadata` (object, optional): Section-level metadata for fine-grained filtering

**Error Handling:**
- **400 Bad Request**: Invalid document structure or parameters
- **403 Forbidden**: Insufficient permissions - ensure API key has indexing rights
- **404 Not Found**: Corpus doesn't exist
- **409 Conflict**: Document with the same ID already exists

---

## Index a core document

<CodePanel
  title="Index a core document"
  snippets={[
    {
      language: 'python',
      code: `from vectara import CoreDocument, CoreDocumentPart

try:
    # Create core document
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
        corpus_key="support-docs",
        request=document
    )
    
    print(f"Core document indexed successfully: {response}")
    
except ApiError as e:
    print(f"Failed to index core document: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 7, text: 'Type must be "core" for part-based documents' },
      { line: 8, text: 'Core documents use document_parts instead of sections' },
      { line: 11, text: 'Each part can have metadata for filtering' }
    ]
  }}
  customWidth="50%"
/>

Index a core document using document parts. Core documents are more flexible than 
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

---

## Complete workflow example

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

try:
    # Step 1: Create corpus
    corpus_response = client.corpora.create(
        key="support-docs",
        name="Support Knowledge Base"
    )
    print(f"Corpus created: {corpus_response.key}")
    
    # Step 2: Create and index document
    document = StructuredDocument(
        id="contract-template-001",
        type="structured",
        sections=[
            StructuredDocumentSection(
                title="Service Agreement Template",
                text="Standard template for service provider...",
                metadata={"template_type": "service"}
            )
        ],
        metadata={"document_category": "template"}
    )
    
    doc_response = client.documents.create(
        corpus_key="support-docs",
        request=document
    )
    
    print(f"Document indexed successfully in new corpus")
    
except ApiError as e:
    if "already exists" in str(e.body).lower():
        print("✅ Resources already exist")
    else:
        print(f"Workflow failed: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 18, text: 'Create corpus first before indexing documents' },
      { line: 19, text: 'Use the corpus key from the creation step' },
      { line: 25, text: 'Index document into the newly created corpus' }
    ]
  }}
  customWidth="50%"
/>

This example demonstrates the fundamental two-step workflow for establishing 
a new knowledge base in Vectara.

1. **Corpus creation**: The first step creates a new corpus with a 
   unique identifier (`key`) and human-readable name. The corpus acts as a 
   namespace for your documents and defines important characteristics like metadata 
   schemas, filter attributes, and access controls. Once created, the corpus is 
   available for document indexing operations immediately.  
   The `corpus_key` from becomes the target identifier for document indexing in Step 2.  
2. **Document ingestion**: The second step uploads and indexes a structured document 
   into the newly created corpus. The document is parsed into searchable sections, 
   with each section containing both text content and optional metadata. Vectara 
   processes the content automatically, making it immediately queryable through the 
   search API.  
   Both operations return response objects that can be used for verification and 
   error handling.

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

---

## Next steps

After indexing documents, you can:

- **Query your corpus**: Use `client.query()` with `SearchCorporaParameters` to search indexed content
- **Add more documents**: Continue indexing additional documents to build your knowledge base
- **Update documents**: Re-index with the same document ID to update existing content
- **Filter by metadata**: Use the metadata you've added during indexing to refine search results

For querying indexed documents, see the [Query API guide](https://docs.vectara.com/docs/api-reference/search-apis/search).