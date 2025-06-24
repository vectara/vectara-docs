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

Explore powerful methods to retrieve and manage document listings within a 
corpus, enabling efficient data access and organization.

- `corpus_key` (str): Unique identifier for the corpus (required)
- `limit` (int, optional): Maximum number of documents to return per page
- `metadata_filter` (str, optional): Filter expression for document metadata, 
  `type = "manual"`
- `page_key` (str, optional): Token to fetch the next page of results
- `request_timeout` (int, optional): Timeout in seconds
- `request_timeout_millis` (int, optional): Timeout in milliseconds (overrides 
  `request_timeout`)


**Returns:**

Iterator of Document objects (containing `id`,` metadata`, but not full content).

<CodePanel
title="List documents in a corpus"
snippets={[
{ language: 'python', code: `client.documents.list( corpus_key: str, limit: int = None, metadata_filter: str = None, page_key: str = None, request_timeout: int = None, request_timeout_millis: int = None ) -> Iterator[Document]` }
]}
layout="stacked"
/>


### Example 1. List all documents in a corpus

<CodePanel
  title="List all documents in a corpus"
  defaultLanguage="python"
  snippets={[
  { language: 'python', code: `response = client.documents.list(corpus_key="product_docs")
for document in response:
    print(document.id, document.metadata)
` }
]}
  annotations={{
    python: [
      { line: 1, text: 'Returns an iterator for all documents in the corpus.' },
      { line: 2, text: 'Iterate over each document returned in the current page.' },
    ],
  }}
  customWidth="50%"
  isSequential={true}
/>

Discover a straightforward approach to fetch all document metadata 
from a corpus with the corpus key of `product_docs`, leveraging 
default settings for a comprehensive overview.

---

### Example 2: Limit number of documents returned

<CodePanel
  title="List first 5 documents"
  defaultLanguage="python"
  snippets={[
  { language: 'python', code: `response = client.documents.list(
    corpus_key="product_docs",
    limit=5

for document in response:
    print(document.id, document.metadata)
` }
]}
  annotations={{
    python: [
      { line: 2, text: 'Only 5 documents will be retrieved at a time.' },
      { line: 5, text: 'Process the results (for example, show a preview or for pagination).' },
    ],
  }}
  customWidth="50%"
  isSequential={true}
/>

Learn how to constrain the number of documents retrieved, perfect for 
paginated views or performance optimization in large corpora.

---

### Example 3: Filter Documents by Metadata

<CodePanel
  title="List documents filtered by metadata"
  defaultLanguage="python"
  snippets={[
  { language: 'python', code: `response = client.documents.list(
    corpus_key="product_docs",
    metadata_filter='type = "manual"'
)
for document in response:
    print(document.id, document.metadata)
`}
]}
  annotations={{
    python: [
      { line: 3, text: 'Only documents with metadata type = "manual" are returned.' },
      { line: 5, text: 'You can combine filters for advanced queries.' },
    ],
  }}
  customWidth="50%"
  isSequential={true}
/>

Retrieve only documents that match certain metadata, unlocking targeted data 
retrieval based on specific criteria.

---

## 2. Create a Document

Unlock the process of indexing new content into your corpus, supporting 
diverse document structures for enhanced search capabilities.

### Example 1: Create a Structured Document

<CodePanel
  snippets={[
    {
      language: 'python',
      code: `from vectara.client import StructuredDocument

document = StructuredDocument(
    corpus_key="employee_handbook",
    document_id="policy_manual_v1",
    metadata={"department": "HR", "version": "1.0"},
    sections=[
        {"id": "section1", "text": "Employee leave policy details."},
        {"id": "section2", "text": "Overtime compensation rules."}
    ]
)
client.documents.create(document)
`
    }
  ]}
  title="Create StructuredDocument"
  annotations={{
    python: [
      { line: 3, text: 'Specifies the corpus to add the document to.' },
      { line: 4, text: 'Unique identifier for the document.' },
      { line: 5, text: 'Custom metadata for filtering or categorization.' },
      { line: 7, text: 'First section with a unique ID and text.' },
      { line: 8, text: 'Second section with different content.' },
      { line: 10, text: 'Commits the document to the corpus.' }
    ]
  }}
  customWidth="50%"
/>

Dive into creating a `StructuredDocument` with multiple sections, ideal for 
organizing complex content with custom metadata.

---

## Example 2: Create a CoreDocument

<CodePanel
  snippets={[
    {
      language: 'python',
      code: `from vectara.client import CoreDocument

document = CoreDocument(
    corpus_key="tech_guides",
    document_id="network_setup_v2",
    text="Step-by-step guide to network configuration.",
    metadata={"category": "IT", "priority": "high"}
)
client.documents.create(document)
`
    }
  ]}
  title="Create CoreDocument"
  annotations={{
    python: [
      { line: 3, text: 'Targets a different corpus for this document.' },
      { line: 4, text: 'Unique ID for the network setup guide.' },
      { line: 5, text: 'Single text block containing the full content.' },
      { line: 6, text: 'Alternative metadata with category and priority.' },
      { line: 8, text: 'Saves the document to the corpus.' }
    ]
  }}
  customWidth="50%"
/>

Explore the simplicity of adding a `CoreDocument` with a single text block, tailored for 
straightforward content indexing.

---

## Example 3: Create a StructuredDocument with Advanced Metadata


<CodePanel
  snippets={[
    {
      language: 'python',
      code: `from vectara.client import StructuredDocument

document = StructuredDocument(
    corpus_key="training_materials",
    document_id="safety_training_v3",
    metadata={"training": {"level": "advanced", "date": "2025-06-19"}},
    sections=[
        {"id": "intro", "text": "Introduction to safety protocols."},
        {"id": "procedures", "text": "Detailed safety procedures.\nStep 1: Wear PPE.\nStep 2: Follow signage."},
        {"id": "conclusion", "text": "Summary of safety training."}
    ]
)
client.documents.create(document)
`
    }
  ]}
  title="Create StructuredDocument with Advanced Metadata"
  annotations={{
    python: [
      { line: 3, text: 'Uses a corpus for training materials.' },
      { line: 4, text: 'Unique ID with version number.' },
      { line: 5, text: 'Nested metadata with level and date.' },
      { line: 7, text: 'Introduction section with basic text.' },
      { line: 8, text: 'Procedures section with multi-line content.' },
      { line: 10, text: 'Conclusion section summarizing the training.' },
      { line: 12, text: 'Persists the document with all sections.' }
    ]
  }}
  customWidth="50%"
/>

Create an advanced `StructuredDocument` with nested metadata and multi-section 
content for robust data management.

---

## 3. Get a Document by ID

Access specific documents efficiently by their unique IDs, enabling 
detailed inspection or display within your corpus.

### Example 1: Basic Document Retrieval

<CodePanel
  snippets={[
    {
      language: 'python',
      code: `document = client.documents.get(
    corpus_key="employee_handbook",
    document_id="policy_manual_v1"
)
print(document.text, document.metadata)
`
    }
  ]}
  title="Basic Document Retrieval"
  annotations={{
    python: [
      { line: 2, text: 'Specifies the corpus containing the document.' },
      { line: 3, text: 'Unique identifier of the document to fetch.' },
      { line: 5, text: 'Displays the document text and metadata.' }
    ]
  }}
  customWidth="50%"
/>

See how to perform a basic retrieval of a document using its ID, showcasing 
default settings for simplicity.

---

### Example 2: Retrieve with Specific Metadata Fields


<CodePanel
  snippets={[
    {
      language: 'python',
      code: `document = client.documents.get(
    corpus_key="tech_guides",
    document_id="network_setup_v2",
    metadata_fields=["category", "version"]
)
print(f"Category: {document.metadata.get('category')}, Version: {document.metadata.get('version')}")
`
    }
  ]}
  title="Document Retrieval with Metadata Fields"
  annotations={{
    python: [
      { line: 2, text: 'Targets a different corpus for this document.' },
      { line: 3, text: 'ID of the document to retrieve.' },
      { line: 4, text: 'Limits metadata to specified fields only.' },
      { line: 6, text: 'Accesses and prints specific metadata values.' }
    ]
  }}
  customWidth="50%"
/>

Learn to fetch a document while selectively retrieving only specified metadata 
fields for targeted insights.

---

### Example 3: Error Handling for Missing Document

<CodePanel
  snippets={[
    {
      language: 'python',
      code: `try:
    document = client.documents.get(
        corpus_key="training_materials",
        document_id="non_existent_doc"
    )
    print(document.text)
except Exception as e:
    print(f"Error fetching document: {e}")
`
    }
  ]}
  title="Document Retrieval with Error Handling"
  annotations={{
    python: [
      { line: 2, text: 'Starts a try block to catch potential errors.' },
      { line: 3, text: 'Specifies the corpus to search in.' },
      { line: 4, text: 'Uses an invalid ID to demonstrate error handling.' },
      { line: 6, text: 'Prints the document text if successful.' },
      { line: 7, text: 'Catches and displays any exception message.' }
    ]
  }}
  customWidth="50%"
/>

Understand how to implement error handling when retrieving a document that may 
not exist, ensuring robust application behavior.

---
## 4. Delete a Document

Manage your corpus effectively by learning to permanently remove documents, 
supporting data cleanup and lifecycle management.

### Example: Delete a Document by ID

<CodePanel
  snippets={[
    {
      language: 'python',
      code: `try:
    client.documents.delete(
        corpus_key="employee_handbook",
        document_id="policy_manual_v1"
    )
    print("Document deleted successfully")
except Exception as e:
    print(f"Error deleting document: {e}")
`
    }
  ]}
  title="Delete Document"
  annotations={{
    python: [
      { line: 2, text: 'Starts a try block to handle potential errors.' },
      { line: 3, text: 'Specifies the corpus containing the document.' },
      { line: 4, text: 'ID of the document to delete.' },
      { line: 6, text: 'Confirms deletion if successful.' },
      { line: 7, text: 'Catches and displays any error message.' }
    ]
  }}
  customWidth="50%"
/>

Review this practical example of deleting a document by its ID, complete 
with error handling for reliability.

---

## 5. Update a Document (Partial/Metadata Merge)

Enhance document management by mastering partial metadata updates, 
perfect for tagging, categorization, and corrections.

### Example 1: Add New Metadata Fields


<CodePanel
  snippets={[
    {
      language: 'python',
      code: `document = client.documents.get(
    corpus_key="employee_handbook",
    document_id="policy_manual_v1"
)
document.metadata.update({"status": "active", "review_date": "2025-06-19"})
client.documents.update(document)
print("Metadata updated successfully")
`
    }
  ]}
  title="Add New Metadata Fields"
  annotations={{
    python: [
      { line: 2, text: 'Fetches the existing document to update.' },
      { line: 3, text: 'Specifies the corpus and document ID.' },
      { line: 5, text: 'Merges new metadata fields (status and review date).' },
      { line: 6, text: 'Commits the updated document to the corpus.' },
      { line: 7, text: 'Confirms the update operation.' }
    ]
  }}
  customWidth="50%"
/>

Discover how to add new metadata fields to an existing document, merging 
them seamlessly with current data.

---

### Example 2: Modify Existing Metadata


<CodePanel
  snippets={[
    {
      language: 'python',
      code: `document = client.documents.get(
    corpus_key="tech_guides",
    document_id="network_setup_v2"
)
document.metadata["priority"] = "urgent"
client.documents.update(document)
print(f"Priority updated to: {document.metadata.get('priority')}")
`
    }
  ]}
  title="Modify Existing Metadata"
  annotations={{
    python: [
      { line: 2, text: 'Retrieves the document from a different corpus.' },
      { line: 3, text: 'ID of the document to modify.' },
      { line: 5, text: 'Updates the existing "priority" field, merging with other data.' },
      { line: 6, text: 'Saves the changes to the corpus.' },
      { line: 7, text: 'Verifies the updated priority value.' }
    ]
  }}
  customWidth="50%"
/>

Learn to modify specific metadata fields of a document while preserving other 
existing data for flexibility.

---

### Example 3: Update with Error Handling

<CodePanel
  snippets={[
    {
      language: 'python',
      code: `try:
    document = client.documents.get(
        corpus_key="training_materials",
        document_id="safety_training_v3"
    )
    document.metadata.update({"trainer": "John Doe", "duration": "2 hours"})
    client.documents.update(document)
    print("Metadata updated with new trainer and duration")
except Exception as e:
    print(f"Error updating metadata: {e}")
`
    }
  ]}
  title="Update Metadata with Error Handling"
  annotations={{
    python: [
      { line: 2, text: 'Begins a try block for error management.' },
      { line: 3, text: 'Fetches the document from the training corpus.' },
      { line: 4, text: 'Specifies the document ID to update.' },
      { line: 6, text: 'Merges new metadata fields for trainer and duration.' },
      { line: 7, text: 'Applies the metadata changes.' },
      { line: 8, text: 'Confirms success if no errors occur.' },
      { line: 9, text: 'Catches and displays any errors encountered.' }
    ]
  }}
  customWidth="50%"
/>

Gain insight into updating metadata with robust error handling, ensuring 
smooth operations even with potential issues.

---

## 6. Replace Document Metadata

Completely replace the metadata object for a document. Use this for 
overwriting tags or categories, and resetting metadata.

### Example 1: Replace Metadata with New Tags


<CodePanel
  snippets={[
    {
      language: 'python',
      code: `document = client.documents.get(
    corpus_key="employee_handbook",
    document_id="policy_manual_v1"
)
document.metadata = {"tags": ["active", "2025"], "category": "policies"}
client.documents.update(document)
print("Metadata replaced successfully")
`
    }
  ]}
  title="Replace Metadata with New Tags"
  annotations={{
    python: [
      { line: 2, text: 'Fetches the document to update its metadata.' },
      { line: 3, text: 'Specifies the corpus and document ID.' },
      { line: 5, text: 'Completely replaces metadata with new tags and category.' },
      { line: 6, text: 'Commits the updated document to the corpus.' },
      { line: 7, text: 'Confirms the metadata replacement.' }
    ]
  }}
  customWidth="50%"
/>

See how to replace all existing metadata with a new set of tags, offering a 
clean slate for categorization.

---

### Example 2: Reset Metadata to Empty


<CodePanel
  snippets={[
    {
      language: 'python',
      code: `document = client.documents.get(
    corpus_key="tech_guides",
    document_id="network_setup_v2"
)
document.metadata = {}
client.documents.update(document)
print("Metadata reset to empty")
`
    }
  ]}
  title="Reset Metadata to Empty"
  annotations={{
    python: [
      { line: 2, text: 'Retrieves the document from a different corpus.' },
      { line: 3, text: 'ID of the document to reset.' },
      { line: 5, text: 'Replaces all metadata with an empty object.' },
      { line: 6, text: 'Saves the changes to the corpus.' },
      { line: 7, text: 'Indicates the metadata has been cleared.' }
    ]
  }}
  customWidth="50%"
/>

Explore the process of resetting a document’s metadata to an empty state, 
effectively clearing all previous data.

---

### Example 3: Replace with Nested Metadata

<CodePanel
  snippets={[
    {
      language: 'python',
      code: `document = client.documents.get(
    corpus_key="training_materials",
    document_id="safety_training_v3"
)
document.metadata = {"training": {"level": "intermediate", "date": "2025-06-19"}, "status": "completed"}
client.documents.update(document)
print("Metadata replaced with nested structure")
`
    }
  ]}
  title="Replace Metadata with Nested Structure"
  annotations={{
    python: [
      { line: 2, text: 'Fetches the document from the training corpus.' },
      { line: 3, text: 'Specifies the document ID to update.' },
      { line: 5, text: 'Replaces metadata with a nested training object and status.' },
      { line: 6, text: 'Applies the new metadata to the corpus.' },
      { line: 7, text: 'Confirms the replacement with nested data.' }
    ]
  }}
  customWidth="50%"
/>

Dive into replacing metadata with a nested structure, enabling advanced 
categorization and detailed tracking.

---

## Summarize a Document

The summarize method lets you generate an LLM-powered summary for a 
specific document in your corpus. Preview content, create search 
snippets, or power generative UIs.

You can control the LLM, provide a custom prompt template, or set additional 
model parameters.

### Example 1: Basic Document Summarization


<CodePanel
  title="Summarize a document with default LLM"
  language="python"
  snippets={[
  { code: `summary = client.documents.summarize(
    corpus_key="product_docs",
    document_id="user_guide_v2",
    llm_name="vectara-summary-llm"
)
print(summary.summary)
`}
]}
  annotations={{
    python: [
      { line: 4, text: 'Specify the LLM to use for summarization.' },
      { line: 5, text: 'Access the generated summary from the response.' },
    ],
}}
  customWidth="50%"
/>

Learn to generate a summary using the default LLM settings, providing a 
quick overview of document content.

---


### Example 2: Summarize with a Custom Prompt Template and Model Parameters

<CodePanel
  title="Summarize with custom prompt and model parameters"
  snippets={[
    {
      language: 'python',
      code: `summary = client.documents.summarize(
    corpus_key="product_docs",
    document_id="troubleshooting_faq",
    llm_name="mockingbird-2.0",
    prompt_template="Summarize the following document for customer support \nagents: $document_content",
    model_parameters={"temperature": 0.2}
)
print(summary.summary)`    }
  ]}
  annotations={{
    python: [
      { line: 5, text: 'Use a custom prompt template for your use case.' },
      { line: 6, text: 'Control summary style/creativity with model parameters.' },
    ],
  }}
  customWidth="50%"
/>

Customize the summarization process with a tailored prompt and model 
parameters for precise control.

