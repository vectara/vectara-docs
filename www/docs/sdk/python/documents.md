---
id: documents
title: Documents
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

Example Types from DocumentsClient

## List documents in a corpus

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
/>

This basic example retrieves all document metadata from a corpus, using the 
default page size and no filters.

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
/>

Retrieve and iterate over all documents in a corpus. Supports filtering, limits, and pagination.

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
/>

Retrieve only documents that match certain metadata criteria.

---

## 2. Create a Document

Index new content for search and retrieval.

### Example 1: Create a StructuredDocument

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

This example creates a `StructuredDocument` with multiple sections and custom metadata.

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

This example creates a `CoreDocument` with a single text block and a different metadata structure.

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

This example shows a `StructuredDocument` with nested metadata and a larger section structure.


Description: Add a new document (either StructuredDocument or CoreDocument) to your corpus.

Use case: Index new content for search and retrieval.

3. Get a Document by ID
Description: Fetch the content and metadata for a specific document in a corpus.

Use case: Inspect or display a single document.

4. Delete a Document
Description: Permanently remove a document by its ID.

Use case: Data cleanup, document lifecycle management.

5. Update a Document (Partial/Metadata Merge)
Description: Add or modify metadata fields for an existing document (merge, not replace).

Use case: Tagging, categorization, correcting metadata.

6. Replace Document Metadata
Description: Completely replace the metadata object for a document.

Use case: Overwriting tags/categories, resetting metadata.

## Summarize a Document


Use case: Preview content, create search snippets, or power generative UIs.

The summarize method lets you generate an LLM-powered summary for a specific document in your corpus.
You can control the LLM, provide a custom prompt template, or set additional model parameters.

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
Generate a summary using the default LLM and default settings.


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

Customize the prompt for the LLM and add model parameters to influence the summary style.

