---
id: metadata
title: Metadata and Filtering
sidebar_label: Metadata
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

Metadata lets you tag documents and document parts with structured 
information, such as type, department, creation date, or custom business 
attributes.

With Vectara, metadata powers precise search, filtering, and 
vertical-specific retrieval—enabling smarter RAG and analytics use cases.

Metadata is a dictionary of key-value pairs associated with each document 
or document part. You use metadata to:

- Enable fast filtering ('doc.department = "finance"')
- Control vertical-specific queries ('doc.type = "contract"')
- Add business context (`part.customer_id, 'doc.location')
- Support structured retrieval for complex applications

:::info Prerequisites
This guide assumes you have a corpus called `my-docs`. If you haven't created a corpus yet, follow 
the [Quick Start](/docs/sdk/python/python-quickstart) guide to set up your first corpus.
:::

## Create corpus with filter attributes

Before you can filter by metadata, you must define filter attributes when creating your corpus. These attributes tell Vectara which metadata fields should be indexed for fast filtering.

<CodePanel
  title="Create Corpus with Filter Attributes"
  snippets={[
    {
      language: "python",
      code: `import os
from vectara import Vectara
from vectara.core.api_error import ApiError

# Initialize client
client = Vectara(api_key=os.getenv("VECTARA_API_KEY"))

# Create corpus with filter attributes for metadata
try:
    corpus = client.corpora.create(
        key="my-docs",
        name="My Documentation",
        description="Contains documents with filterable metadata",
        filter_attributes=[
            {
                "name": "department",
                "level": "document",
                "type": "text",
                "indexed": True
            },
            {
                "name": "year", 
                "level": "document",
                "type": "integer",
                "indexed": True
            },
            {
                "name": "doc_type",
                "level": "document", 
                "type": "text",
                "indexed": True
            },
            {
                "name": "section_type",
                "level": "part",
                "type": "text", 
                "indexed": True
            }
        ]
    )
    print(f"✅ Created corpus: {corpus.key}")
except ApiError as e:
    if "already exists" in str(e):
        print("Corpus 'my-docs' already exists")
    else:
        raise`
    }
  ]}
  annotations={{
    python: [
      { line: 9, text: 'Define filter attributes when creating the corpus' },
      { line: 15, text: 'Document-level filter for department metadata' },
      { line: 21, text: 'Integer filter for year metadata' },
      { line: 27, text: 'Document-level filter for document type' },
      { line: 33, text: 'Part-level filter for section metadata' }
    ]
  }}
  layout="stacked"
/>

**Critical: Filter attributes must be defined at corpus creation time.** You cannot add filter attributes to an existing corpus later.

**Filter Attribute Parameters:**
- `name` (string): The metadata field name to make filterable
- `level` (string): Either "document" or "part" depending on where metadata is attached
- `type` (string): Data type - "text", "integer", "real", or "boolean"  
- `indexed` (boolean): Set to `true` for fast filtering performance

---

## Add metadata at ingestion

Add metadata when indexing documents using the Python SDK. You can set metadata at:

- **Document level** (applies to the whole doc)
- **Part/Section level** (applies to a section/part)

### Example: Ingest a document with metadata

<CodePanel
  title="Index a Document with Metadata"
  snippets={[
    {
      language: "python",
      code: `from vectara import StructuredDocument, StructuredDocumentSection

# Create document with metadata that matches filter attributes
doc = StructuredDocument(
    id="employee-handbook-2025",
    type="structured",
    metadata={
        "department": "hr",
        "year": 2025,
        "doc_type": "policy"
    },
    sections=[
        StructuredDocumentSection(
            title="Vacation Policy",
            text="Employees receive 20 days of PTO per year. This applies to all full-time employees after 90 days of employment.",
            metadata={"section_type": "vacation"}
        ),
        StructuredDocumentSection(
            title="Remote Work Policy", 
            text="Employees may work remotely up to 3 days per week with manager approval.",
            metadata={"section_type": "remote_work"}
        )
    ]
)

# Index the document
response = client.documents.create(
    corpus_key="my-docs",
    request=doc
)
print(f"✅ Indexed document: {doc.id}")`
    }
  ]}
  annotations={{
    python: [
      { line: 7, text: 'Document-level metadata matching corpus filter attributes' },
      { line: 16, text: 'Section-level metadata for part-level filtering' },
      { line: 21, text: 'Another section with different metadata values' },
      { line: 27, text: 'Index into the corpus with filter attributes' }
    ]
  }}
  layout="stacked"
/>

**Important:** The metadata field names (`department`, `year`, `doc_type`, `section_type`) must exactly match the filter attribute names defined in your corpus.

## Querying with metadata filters

Filter your queries using metadata fields to target only relevant documents or 
parts.

- **Document-level filter**: Applies to whole documents.
- **Part-level filter**: Targets individual sections/parts based on their metadata.

### Example: Query with a metadata filter

<CodePanel
  title="Query by Metadata"
  snippets={[
    {
      language: "python",
      code: `from vectara import SearchCorporaParameters

# Query with document-level metadata filter
search = SearchCorporaParameters(
    corpora=[{
        "corpus_key": "my-docs",
        "metadata_filter": "doc.department = 'hr' AND doc.year = 2025"
    }]
)

response = client.query(
    query="How much PTO do employees receive?",
    search=search
)

if hasattr(response, 'search_results') and response.search_results:
    print(f"✅ Found {len(response.search_results)} results")
    for result in response.search_results:
        print(f"Score: {result.score:.3f}")
        print(f"Text: {result.text[:100]}...")
        print("---")
else:
    print("⚠️ No results found")`
    }
  ]}
  annotations={{
    python: [
      { line: 6, text: "Use metadata filter matching corpus filter attributes" },
      { line: 7, text: "Combine conditions with AND/OR operators" },
      { line: 11, text: "Execute query with metadata filtering" }
    ]
  }}
  layout="stacked"
/>

### Example: Part-level metadata filtering

<CodePanel
  title="Filter by Section Metadata"
  snippets={[
    {
      language: "python", 
      code: `# Query filtering by section-level metadata
search = SearchCorporaParameters(
    corpora=[{
        "corpus_key": "my-docs",
        "metadata_filter": "part.section_type = 'vacation'"
    }]
)

response = client.query(
    query="vacation policy details",
    search=search
)

if response.search_results:
    print(f"✅ Found {len(response.search_results)} vacation-related results")
    for result in response.search_results:
        print(f"Text: {result.text}")
        print("---")`
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: "Filter by part-level metadata using 'part.' prefix" },
      { line: 9, text: "Query will only search vacation policy sections" }
    ]
  }}
  layout="stacked"
/>

### Example: Complex metadata filtering

<CodePanel
  title="Advanced Metadata Filtering"
  snippets={[
    {
      language: "python",
      code: `# Complex filter combining document and part level metadata
search = SearchCorporaParameters(
    corpora=[{
        "corpus_key": "my-docs", 
        "metadata_filter": "(doc.department = 'hr' OR doc.department = 'legal') AND doc.year >= 2024 AND part.section_type IN ('vacation', 'remote_work')"
    }]
)

response = client.query(
    query="What are the current policies for time off and remote work?",
    search=search
)

print(f"Found {len(response.search_results)} policy results")
for result in response.search_results:
    print(f"Score: {result.score:.3f}")
    print(f"Text: {result.text[:150]}...") 
    print("---")`
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: "Complex filter with OR, AND, comparison, and IN operators" },
      { line: 9, text: "Natural language query with precise metadata filtering" }
    ]
  }}
  layout="stacked"
/>

:::tip Filter Syntax
* Filter syntax is similar to SQL. Use single quotes for strings.  
* Combine multiple conditions with `AND` or `OR`.  
* Use comparison operators: `=`, `!=`, `>`, `>=`, `<`, `<=`
* Use `IN` for multiple values: `doc.type IN ('policy', 'procedure')`
* You can only filter on metadata fields defined as filter attributes in your corpus.
:::


## Metadata best practices

- **Plan filter fields:** When creating a corpus, define which metadata 
  keys should be indexed for filtering.
- **Use consistent types:** Stick to string, number, or boolean values 
  for predictable filtering.
- **Be explicit:** Set metadata at both document and section level if your 
  queries require fine-grained filtering.
- **Keep keys lowercase:** Avoid spaces and special characters in metadata 
  keys.
- **Match filter attributes:** Ensure metadata field names exactly match the filter attribute names defined in your corpus.

## Troubleshooting metadata filters

The error `INVALID_ARGUMENT: The filter expression contains an error. Unrecognized references: doc.department, doc.year` occurs when:

1. **Filter attributes not defined**: The corpus doesn't have filter attributes for the metadata fields you're trying to filter on.
2. **Name mismatch**: The metadata field names don't exactly match the filter attribute names.
3. **Wrong level**: Using `doc.` prefix for part-level attributes or vice versa.

**Solutions:**
- Ensure filter attributes are defined when creating the corpus (cannot be added later)
- Verify metadata field names exactly match filter attribute names  
- Use `doc.` prefix for document-level filters and `part.` for part-level filters
- Check for typos and use single quotes for string values

## Complete working example

<CodePanel
  title="End-to-End Metadata Example"
  snippets={[
    {
      language: "python",
      code: `import os
from vectara import Vectara, StructuredDocument, StructuredDocumentSection, SearchCorporaParameters

client = Vectara(api_key=os.getenv("VECTARA_API_KEY"))

# Step 1: Create corpus with filter attributes
try:
    corpus = client.corpora.create(
        key="my-docs",
        name="My Documentation",
        filter_attributes=[
            {"name": "department", "level": "document", "type": "text", "indexed": True},
            {"name": "year", "level": "document", "type": "integer", "indexed": True}
        ]
    )
    print("✅ Created corpus with filter attributes")
except ApiError as e:
    if "already exists" in str(e):
        print("✅ Using existing corpus")

# Step 2: Index document with metadata
doc = StructuredDocument(
    id="hr-policy-2025",
    type="structured", 
    metadata={"department": "hr", "year": 2025},
    sections=[
        StructuredDocumentSection(
            title="PTO Policy",
            text="Employees receive 20 days paid time off annually."
        )
    ]
)

client.documents.create(corpus_key="my-docs", request=doc)
print("✅ Indexed document with metadata")

# Step 3: Query with metadata filter
search = SearchCorporaParameters(
    corpora=[{
        "corpus_key": "my-docs",
        "metadata_filter": "doc.department = 'hr' AND doc.year = 2025" 
    }]
)

response = client.query(query="PTO policy", search=search)
print(f"✅ Found {len(response.search_results)} results with metadata filter")`
    }
  ]}
  annotations={{
    python: [
      { line: 8, text: "Define filter attributes at corpus creation" },
      { line: 21, text: "Add metadata matching filter attribute names" },
      { line: 34, text: "Filter using the defined attributes" }
    ]
  }}
  layout="stacked"
/>

This complete example shows the proper workflow:
1. Create corpus with filter attributes
2. Index documents with matching metadata  
3. Query with metadata filters

The key is ensuring metadata field names exactly match the filter attribute names defined in your corpus.
