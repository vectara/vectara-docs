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

## Add metadata at ingestion

Add metadata when indexing documents using the Python SDK.  
You can set metadata at:

- **Document level** (applies to the whole doc)
- **Part/Section level** (applies to a section/part)

### Example: Ingest a document with metadata

<CodePanel
  title="Index a Document with Metadata"
  snippets={[
    {
      language: "python",
      code: `import os
from vectara import Vectara, StructuredDocument, StructuredDocumentSection
from vectara.core.api_error import ApiError

try:  
    doc = StructuredDocument(
        id="employee-handbook-2025",
        type="structured",
        metadata={
            "department": "hr",
            "year": 2024,
            "doc_type": "policy"
        },
        sections=[
            StructuredDocumentSection(
                title="Vacation Policy",
                text="Employees receive 20 days of PTO.",
                metadata={"section": "vacation", "policy_level": "global"}
            )
        ]
    )
    
    response = client.documents.create(
        corpus_key="hr-docs",
        request=doc
    )
    print(f"✅ Document indexed: {doc.id}")
    
except ApiError as e:
    print(f"❌ Failed: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 9, text: 'Document-level metadata (available for filtering)' },
      { line: 18, text: 'Section-level metadata (for part-level filters)' }
    ]
  }}
  layout="stacked"
/>


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
      code: `import os
from vectara import Vectara, SearchCorporaParameters, KeyedSearchCorpus
from vectara.core.api_error import ApiError

try:
    search = SearchCorporaParameters(
        corpora=[
            KeyedSearchCorpus(
                corpus_key="hr-docs",
                metadata_filter="department = 'hr' AND year = 2024"
            )
        ]
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
        print("⚠️ No results found")
        
except ApiError as e:
    print(f"❌ Query failed: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 10, text: "Use AND/OR for advanced filtering" },
      { line: 16, text: "Enter your search query" }
    ]
  }}
  layout="stacked"
/>

:::tip
* Filter syntax is similar to SQL. Use single quotes for strings.  
* Combine multiple conditions with `AND` or `OR`.  
* You can filter on any metadata field defined as a “filter attribute” in your 
  corpus.
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

## Troubleshooting metadata filters

- If your filter does not work, ensure the metadata field is included as a 
  filter attribute in your corpus definition.
- Check for typos and use single quotes for string values.
- Part-level filters require the metadata to be present at the section/part 
  level.
