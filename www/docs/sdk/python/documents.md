---
id: documents
title: Documents
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

Manage document data efficiently by addressing challenges like data sprawl and 
metadata inconsistencies for creating, querying, and maintaining documents. 
This is ideal for building scalable search solutions or automating content 
governance.

- List and filter documents in a corpus
- Create structured or core documents with custom metadata
- Retrieve, update, and delete documents by ID
- Summarize content using LLM-powered tools

## List documents in a corpus

<CodePanel
  title="List documents in a corpus"
  snippets={[
    {
      language: 'python',
      code: `from vectara import Vectara
from vectara.core.api_error import ApiError

client = Vectara(api_key="YOUR_API_KEY")

try:
    # List documents with filtering
    documents = client.documents.list(
        corpus_key="product-docs",
        limit=10,
        metadata_filter='type = "manual"'
    )
    
    for document in documents:
        print(f"Document ID: {document.id}")
        print(f"Metadata: {document.metadata}")
        
except ApiError as e:
    print(f"Failed to list documents: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 8, text: 'Returns an iterator for documents in the corpus' },
      { line: 11, text: 'Filter documents by metadata criteria' },
      { line: 15, text: 'Document objects contain ID and metadata, not full content' }
    ]
  }}
  customWidth="50%"
/>

Explore powerful methods to retrieve and manage document listings within a 
corpus, enabling efficient data access and organization.

**Parameters:**
- `corpus_key` (string, required): Unique identifier for the corpus
- `limit` (int, optional): Maximum number of documents to return per page
- `metadata_filter` (string, optional): Filter expression for document metadata
- `page_key` (string, optional): Token to fetch the next page of results

**Returns:** Iterator of Document objects (containing `id` and `metadata`, but not full content).

Use metadata filters to find specific document types or categories. The method returns 
paginated results for efficient handling of large document collections.

---

## Create a document

<CodePanel
  title="Create a structured document"
  snippets={[
    {
      language: 'python',
      code: `from vectara import StructuredDocument, StructuredDocumentSection

try:
    # Create structured document
    document = StructuredDocument(
        id="policy-manual-v2",
        type="structured",
        sections=[
            StructuredDocumentSection(
                title="Employee Leave Policy",
                text="Detailed employee leave policy information including vacation, sick leave, and personal time...",
                metadata={"section_type": "policy"}
            ),
            StructuredDocumentSection(
                title="Overtime Compensation",
                text="Rules and procedures for overtime compensation and time tracking...",
                metadata={"section_type": "compensation"}
            )
        ],
        metadata={"department": "HR", "version": "2.0"}
    )
    
    # Index the document
    response = client.documents.create(
        corpus_key="employee-handbook",
        request=document
    )
    
    print(f"Document created successfully: {response}")
    
except ApiError as e:
    print(f"Failed to create document: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 6, text: 'Document ID must be unique within the corpus' },
      { line: 10, text: 'Each section can have optional title and metadata' },
      { line: 19, text: 'Document-level metadata for filtering queries' },
      { line: 23, text: 'Use documents.create() method to index the document' }
    ]
  }}
  customWidth="50%"
/>

Unlock the process of indexing new content into your corpus, supporting 
structured document formats with multiple sections for enhanced search capabilities.

**Key Parameters:**
- `id` (string, required): Unique identifier for the document within the corpus
- `type` (string, required): Must be "structured" for section-based documents  
- `sections` (array, required): List of document sections with text content
- `metadata` (object, optional): Document-level metadata for filtering

Use structured documents for organized content like employee handbooks, policies, 
or technical manuals where clear section organization improves searchability.

---

## Get a document by ID

<CodePanel
  title="Get a document by ID"
  snippets={[
    {
      language: 'python',
      code: `try:
    document = client.documents.get(
        corpus_key="employee-handbook",
        document_id="policy-manual-v2"
    )
    
    print(f"Document text: {document.text}")
    print(f"Document metadata: {document.metadata}")
    
except ApiError as e:
    print(f"Failed to get document: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: 'Specify the corpus containing the document' },
      { line: 3, text: 'Unique identifier of the document to fetch' },
      { line: 6, text: 'Access document content and metadata' }
    ]
  }}
  customWidth="50%"
/>

Access specific documents efficiently by their unique IDs, enabling 
detailed inspection or display within your corpus.

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
      code: `try:
    # Update document metadata
    client.documents.update(
        corpus_key="tech-guides",
        document_id="network-setup-v2",
        metadata={"priority": "urgent", "last_updated": "2025-07-02"}
    )
    
    print("Document metadata updated successfully")
    
except ApiError as e:
    print(f"Failed to update document: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Update specific document by corpus and ID' },
      { line: 6, text: 'Provide new metadata to merge with existing data' }
    ]
  }}
  customWidth="50%"
/>

Enhance document management by updating metadata fields, perfect for tagging, 
categorization, and maintaining document status.

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
      code: `try:
    client.documents.delete(
        corpus_key="employee-handbook",
        document_id="old-policy-manual"
    )
    
    print("Document deleted successfully")
    
except ApiError as e:
    print(f"Failed to delete document: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: 'Specify the corpus and document to delete' },
      { line: 7, text: 'Confirm successful deletion' }
    ]
  }}
  customWidth="50%"
/>

Manage your corpus effectively by permanently removing documents, 
supporting data cleanup and lifecycle management.

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
      code: `try:
    summary = client.documents.summarize(
        corpus_key="product-docs",
        document_id="user-guide-v2",
        llm_name="vectara-summary-ext-24-05-sml",
        prompt_template="Provide a concise summary of the following document: $document_content"
    )
    
    print(f"Document summary: {summary.summary}")
    
except ApiError as e:
    print(f"Failed to summarize document: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: 'Specify the LLM model for summarization' },
      { line: 6, text: 'Custom prompt template with $document_content placeholder' },
      { line: 9, text: 'Access the generated summary from the response' }
    ]
  }}
  customWidth="50%"
/>

Generate LLM-powered summaries for specific documents in your corpus. Use this for 
content previews, search snippets, or generative UI applications.

**Parameters:**
- `corpus_key` (string, required): Unique identifier of the corpus
- `document_id` (string, required): Unique identifier of the document
- `llm_name` (string, optional): LLM model to use for summarization
- `prompt_template` (string, optional): Custom prompt with `$document_content` placeholder

**Returns:** Summary response object with the generated summary text.

Use custom prompt templates to tailor summaries for specific use cases like customer 
support, technical documentation, or content previews.

---

## Next steps

After mastering document management, you can:

- **Query documents**: Use `client.query()` to search across document content
- **Manage corpora**: Create and configure corpora with `client.corpora.create()`
- **Batch operations**: Process multiple documents efficiently for large-scale content management
- **Advanced filtering**: Leverage metadata for sophisticated document organization

For comprehensive search capabilities, see the [Query API guide](https://docs.vectara.com/docs/api-reference/search-apis/search).