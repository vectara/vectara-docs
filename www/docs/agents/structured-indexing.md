---
id: structured-indexing-tool
title: Structured indexing tool
sidebar_label: Structured indexing tool
---

import CodePanel from '@site/src/theme/CodePanel';

As agents handle more complex conetnt, they need a way to index structured 
information instead of just plain text. This includes reports, manuals, and 
documents that have defined sections, tables, and images that provide important 
context.

Structured indexing enables your agents to ingest and index documents with a 
meaningful structure into a corpus. Instead of flattening a document into a 
plain text file, this tool preserves the hierarchy and relationships between 
document parts.

* Index documents where sections contain text, metadata, tables, or images.
* Store documents in the correct target corpus using a specific `corpus_key`.
* Reference artifacts (such as cached images or tables) by `artifact_id` for efficient ingestion.

## Use structured indexing with an agent

You can configure an agent to use the `structured_document_index` tool. 
Provide the `corpus_key` and document structure in the input schema, or 
reference a stored artifact. Once indexed, the document becomes part of 
your searchable Vectara corpus, with all structure and metadata preserved 
for retrieval.

### Example input schema

In this example, the tool:

* Indexes the document into the `financial-reports` corpus.
* Preserves section boundaries and associated metadata.
* Links media artifacts (like images) with `artifact_id`.


<CodePanel
  title="Structured index example"
  layout="stacked"
  snippets={[
    {
      language: "json",
      code: `{
  "type": "document",
  "corpus_key": "financial-reports",
  "title": "2024 ESG Annual Report",
  "description": "Comprehensive overview of environmental, social, and governance initiatives for 2024.",
  "metadata": {
    "region": "EU",
    "industry": "banking",
    "year": 2024
  },
  "sections": [
    {
      "title": "Environmental Initiatives",
      "text": "In 2024, EuroBank reduced carbon emissions by 22% through investments in renewable energy.",
      "metadata": {
        "section_type": "environmental",
        "priority": "high"
      },
      "images": [
        {
          "id": "img_1",
          "title": "Carbon Emission Reduction Chart",
          "caption": "Year-over-year reduction in CO₂ emissions.",
          "artifact_id": "art_img_12345"
        }
      ]
    },
    {
      "title": "Social Impact Programs",
      "text": "Employee volunteer hours increased by 15%, and community investments reached $2M.",
      "metadata": {
        "section_type": "social"
      }
    }
  ]
}
`
    }
  ]}
/>