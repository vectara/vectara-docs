---
id: metadata-filters
title: Metadata Filters
sidebar_title: Metadata Filters
---


import CodePanel from '@site/src/theme/CodePanel';


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

<CodePanel snippets={[{language: "json", code: `"filter_attributes": [
    {
      "name": "Title",
      "level": "document",
      "description": "The title of the document.",
      "indexed": True,
      "type": "text"
    }
  ],`}]} title="Filter Attribute Example" layout="stacked" />

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
For more information, check out some of our [**Metadata Examples and Use Cases**](/docs/build/prepare-data/metadata-filters/metadata-examples-and-use-cases).
:::

## Metadata data types

When creating metadata fields for filtering, you must define the appropriate 
[data type](/docs/build/prepare-data/metadata-filters/data-types) for each field. 
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

## Using metadata

To effectively use metadata filters in Vectara, you need to configure the 
metadata fields that your queries can filter on. This process involves 
creating or updating metadata attributes during corpus setup or for an 
existing corpus.

This section explains how to create or add metadata filters and provides 
helpful context for planning and implementing metadata fields. Let's look at 
the ways to create and add metadata filters to your corpus data.

## Add metadata during corpus creation

When creating a corpus with the [Vectara Console](/docs/console-ui/creating-a-corpus) or [the Create Corpus API](/docs/api-reference/admin-apis/create-corpus#filter-attribute), you define metadata fields using the `filter_attributes` 
object. This ensures the corpus supports filtering on specific metadata 
attributes, either at the document level or the part level.

**API Endpoint:** POST [`https://api.vectara.io/v2/corpora`](/docs/rest-api/create-corpus)

## Upload documents with metadata

Metadata can also be added while uploading documents to the corpus. Specify 
this in the `metadata` field of the multipart request. For more information 
about the request details, see [File Upload API Definition](/docs/api-reference/indexing-apis/file-upload/file-upload).
For more information about how to structure your documents, see [Structure your data](/docs/learn/structure-your-data).

**API Endpoint:** POST [`https://api.vectara.io/v2/corpora/:corpus_key/upload_file`](/docs/rest-api/upload-file)

## Update or replace metadata for an existing corpus

To update or replace metadata fields for documents in an existing corpus, use 
the following APIs:

**API Endpoints:**

* `PATCH` [`https://api.vectara.io/v2/corpora/:corpus_key/documents/:document_id`](/docs/rest-api/update-corpus-document)
  
  Use the [Update Document Metadata API](/docs/api-reference/indexing-apis/update-document-metadata) to add or update specific metadata 
  fields for a corpus at the document level.
* `PUT` [`https://api.vectara.io/v2/corpora/:corpus_key/documents/:document_id/metadata`](/docs/rest-api/replace-corpus-document-metadata)
  
  Use the [Replace Document Metadata API](/docs/api-reference/indexing-apis/replace-document-metadata) to entirely replace the existing 
  metadata for a document.

:::caution Note
Updating or replacing metadata is limited only to document-level metadata.
:::


## Default metadata filters

A few pieces of metadata expressions are filterable out of the box, including 
Document ID, Language, and Titles. These filters are very useful in a variety 
of situations.

Note that you can set up additional fields to filter on by setting up
[filter attributes](/docs/api-reference/admin-apis/create-corpus#filter-attribute) on a
corpus.


## `doc.id` field

Each document is assigned a unique identifier at indexing. You can use the 
`doc.id` field to retrieve or filter specific Document IDs in your corpus.

Valid filter expressions include something like:

* `doc.id = 'my-document-2023.pdf'`
* `doc.id = 'my-document-2022.pdf' OR 'my-document-2023.pdf'`
* `doc.id = 'my-document-2023.pdf' AND 'my-document-2024.pdf'`


## `part.lang` field

Each section of a document is evaluated for its language at index time and the
`part.lang` field is added with a 3-character lower-case language code
([ISO 639-2](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes)).  For
example, if the section was detected as English, then `part.lang` would contain
`eng` and if it was detected as German, than `part.lang` would contain `deu`.

Valid filter expressions for this would be something like:
* `part.lang = 'eng'`
* `part.lang = 'deu'`
* `part.lang = 'eng' OR part.lang = 'deu'`

## `part.is_title` field

When adding content, <Config v="names.product"/> adds a special Boolean
field to indicate whether the field is a `title` field or not. This is useful
for a few different cases depending on how you model your data. For example,
some users want to **only** match on a title field, or never match on a title field,
in which case this field can be used to filter.

This field actually uses three value logic: true, false, and unset. We 
designed it like this to avoid creating too much metadata because customers 
are billed for metadata, so it is in the customer's interest. Here is 
how it works using "neural networks" and an example document:

* Title: "Neural Networks and Deep Learning"
* Section 1: "Introduction to Neural Networks"
* Section 2: "Applications of Neural Networks in AI"
* Section 3: "Conclusion"

* To filter for only title fields, use `part.is_title = true`. You get results 
  with "neural networks" in the title, such as "Neural Networks and Deep 
  Learning" in the title.
* To return only non-title sections, use `part.is_title = false`. You get 
  results for sections that contain "neural networks" but are not titles, such 
  as "Introduction to Neural Networks," "Applications of Neural Networks in 
  AI," and "Conclusion. You **do not** get titles with that term in the 
  results.
* However, not all documents have titles. To include sections with no title set, 
  use `part.is_title <> true`. You could get a variety of results that do not 
  have specific title designations but they contain the term "neural networks".

