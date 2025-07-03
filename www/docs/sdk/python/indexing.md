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
      { line: 4, text: 'Use an API key with indexing permissions for write operations.' }
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
        id="legal-contract-001",
        type="structured",
        sections=[
            StructuredDocumentSection(
                title="Contract Overview",
                text="This vendor agreement establishes terms and obligations for service delivery...",
                metadata={"section_type": "overview"}
            ),
            StructuredDocumentSection(
                title="Payment Terms", 
                text="Payment shall be made within 30 days of invoice receipt...",
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
      { line: 19, text: 'Document-level metadata for filtering queries' },
      { line: 23, text: 'Use documents.create() method to index the document' }
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
                text="Troubleshooting 403 authentication errors in the web portal requires clearing browser cache.",
                metadata={"part_type": "solution", "error_code": "403"}
            ),
            CoreDocumentPart(
                text="Token expiration is the most common cause of 403 errors in authenticated sessions.",
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
      { line: 6, text: 'Type must be "core" for part-based documents' },
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
      code: `from vectara import Vectara, StructuredDocument, StructuredDocumentSection
from vectara.managers import CreateCorpusRequest
from vectara.core.api_error import ApiError

client = Vectara(api_key="YOUR_API_KEY")

try:
    # Step 1: Create corpus
    corpus_request = CreateCorpusRequest(
        key="legal-knowledge-base",
        name="Legal Knowledge Base"
    )
    corpus_response = client.corpora.create(corpus_request)
    print(f"Corpus created: {corpus_response.key}")
    
    # Step 2: Create and index document
    document = StructuredDocument(
        id="contract-template-001",
        type="structured",
        sections=[
            StructuredDocumentSection(
                title="Service Agreement Template",
                text="Standard template for service provider agreements with liability and payment terms...",
                metadata={"template_type": "service"}
            )
        ],
        metadata={"document_category": "template"}
    )
    
    doc_response = client.documents.create(
        corpus_key="legal-knowledge-base",
        request=document
    )
    
    print(f"Document indexed successfully in new corpus")
    
except ApiError as e:
    print(f"Workflow failed: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 9, text: 'Create corpus first before indexing documents' },
      { line: 17, text: 'Use the corpus key from the creation step' },
      { line: 29, text: 'Index document into the newly created corpus' }
    ]
  }}
  customWidth="50%"
/>

Complete example showing corpus creation followed by document indexing. This workflow
demonstrates the typical process of setting up a new knowledge base and populating 
it with content.

**Best Practices:**
- Create corpus with descriptive key and name
- Use consistent metadata schemas across documents
- Handle errors gracefully with try-catch blocks
- Verify corpus exists before attempting to index documents

---

## Next steps

After indexing documents, you can:

- **Query your corpus**: Use `client.query()` with `SearchCorporaParameters` to search indexed content
- **Add more documents**: Continue indexing additional documents to build your knowledge base
- **Update documents**: Re-index with the same document ID to update existing content
- **Filter by metadata**: Use the metadata you've added during indexing to refine search results

For querying indexed documents, see the [Query API guide](https://docs.vectara.com/docs/api-reference/search-apis/search).