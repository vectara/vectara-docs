---
id: list-documents
title: List Documents API Definition
sidebar_label: List Documents API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The List Documents API lets you view the Document IDs and their metadata 
in a corpus. This is useful for viewing documents indexed so far and helping 
you decide to remove documents that are no longer needed. It helps you manage 
the document lifecycle in your enviroment.

This information enables you to catalog and inventory large amounts of data 
while also extracting lists of documents for further analysis. For example, 
developers can utilize the metadata to to build custom search and filtering 
capabilities into their applications.

## List Documents Request and Response

To list documents, send a GET request to `/v2/corpora/{corpus_key}/documents`, 
where `{corpus_key}` is the unique identifier for the corpus. You can specify 
optional query parameters to control the pagination of the results. 

* `limit` - Indicates the maximum number of documents to return in a single 
  request, with a default value of `10` and a maximum value of `100`. 
* `page_key` - Retrieves the next page of results when the previous request 
  has reached the limit.

The response contains an array of `cocument` objects with the matching 
documents and metadata about the pagination.

## REST 2.0 Example

### List Documents REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to list documents:
<code>https://<Config v="domains.rest.admin"/>/v2/corpora/:corpus_key/documents</code>

The API Playground shows the full [List Documents](/docs/rest-api/list-corpus-documents) REST definition.

## gRPC Example

You can find the full List Documents gRPC definition at [list_documents.proto](https://github.com/vectara/protos/blob/main/list_documents.proto).
