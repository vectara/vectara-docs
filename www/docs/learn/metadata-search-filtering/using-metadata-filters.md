---
id: using-metadata-filters
title: Using Metadata 
sidebar_title: UsingMetadata
---


import CodePanel from '@site/src/theme/CodePanel';


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

