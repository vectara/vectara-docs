---
id: filter-overview
title: Metadata Filters
sidebar_title: Metadata Filters
---

import {Config} from '@site/docs/definitions.md';

In many search scenarios, retrieving all available documents is not enough to 
meet your application needs. It may be necessary to narrow the query results 
to documents with specific, granular attributes. This is where metadata 
filters can help you by applying precise conditions to your queries.

## What are metadata filters?

Metadata filter expressions are attached to queries, or more formally, to their 
corpus keys. These filter expressions serve to restrict the search to only the 
part of the corpus that matches the expression. In both form and function, 
they are a simpler version of a `WHERE` clause's *search condition* 
in [ANSI SQL, see §7.6][1].

A filter expression operates on the metadata attached to documents that are 
indexed in <Config v="names.product"/>. Because you can associate this 
metadata to either the entire document, or to specific parts within it, the 
*scope* must be explicitly specified for every metadata reference in the 
expression. 

## Why use metadata filters?

Metadata filters provide the following benefits:

* **Precision:** Restrict query results to relevant sections or documents.
* **Flexibility:** Handle diverse scenarios, from simple document tagging 
  to complex section-level attributes.
* **Customization:** Tailor metadata attributes to align with your data 
  structure and use cases.


After you define filter attributes, you can use them within your queries. 
For example:

```json
"filter_attributes": [
    {
      "name": "Title",
      "level": "document",
      "description": "The title of the document.",
      "indexed": True,
      "type": "text"
    }
  ],
```

## Document-level and part-level metadata

Metadata can be associated with the entire document (document-level) or 
specific sections of the document (part-level). These valid scopes are `doc.` 
and `part.`, for document and part-level metadata, respectively.
When indexing data in Vectara, you associate metadata at these levels:

* **Document-level scope**
    * Applied across the entire document. Use document-level filtering for metadata that does 
      not vary and remains consistent across the whole document.
    * **Examples:** 
      * `doc.author = 'John Doe' and doc.publication_year > 2024`
      * `doc.publication_date >= '2023-01-01' AND doc.publication_date < '2024-01-01' AND doc.category IN ('Technology', 'Science')`
* **Part-level scope**
    * Applied to specific sections or chunks within a document. Use part-level filtering when 
      properties vary within different parts of the document.
    * **Examples** 
      * `part.section = 'Introduction'`
      * `part.clause_type = 'Liability' AND part.risk_level = 25 AND part.is_boilerplate = false`

:::note
For more information, check out some of our [**metadata examples and use cases**](/docs/learn/metadata-examples-and-use-cases).
:::


## Metadata data types

When creating metadata fields for filtering, you must define the appropriate 
[data type](/docs/api-reference/search-apis/sql/data-types) for each field. 
Vectara supports the following metadata field types:

* **Integer:** Stores signed whole numbers. Suitable for fields like year, count, 
  or ID. For example: `doc.publication_year = 2021`
* **Real Number (Float):** Stores decimal numbers, often used for scores, 
  percentages, or measurements. For example: `part.sentiment_score > 0.7`
* **Text:** Stores UTF-8 strings. Ideal for storing names, categories, or labels.
  For example: `doc.category = 'Science'`
* **Boolean:** Stores true or false values, commonly used for toggles or binary 
  states. For example: `doc.is_featured = true`
* **Null:** Indicates the absence of a metadata field for a document. For example: 
  `doc.status IS NULL`

## Selecting the best data type

Select the correct data type to ensure your queries run efficiently and 
produce accurate results. Consider these tips:

* **Match the data to the type:** 
  * Use numeric types (`integer` or `float`) for numerical comparisons and 
  calculations.
  * Use `text` for fields that require exact matches or keyword searches.
  * Use `integer` for `year` values to enable range queries, instead of text.
* **Avoid mixing types:** Keep numerical data in numeric types and text data in 
  `text` fields. Mixing them can cause inefficient queries and unexpected 
  behavior. A bad example is using `doc.year = '2021'` (as a text field).
* **Indexing considerations:** Metadata fields marked as `indexed: True` allow 
  faster querying but may increase storage overhead. Choose indexing 
  selectively based on usage patterns.

