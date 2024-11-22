---
id: list-tables
title: List Tables API Definition
sidebar_label: List Tables API Definition
---

The List Tables API retrieves a list of tables stored within a document in a 
specified corpus. Use this endpoint to discover structured data extracted from 
uploaded documents.

## List Tables Request and Response

To list tables in a document, send a GET request to 
`/v2/corpora/{corpus_key}/documents/{document_id}/tables`, where `corpus_key` 
identifies the corpus, and `document_id` identifies the document. This request 
supports the following query parameters:

* `limit` (Optional): The maximum number of tables to return in a single 
  response. Default is `10`. Minimum value is `1`, and the maximum is `100`.
* `page_key` (Optional): Use this parameter to retrieve the next page of tables 
  after reaching the limit. You can find the `page_key` value in the metadata of 
  a previous response.

## REST 2.0 URL

### List Tables REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to get a list of tables in a document within a corpus:
<code>https://<Config v="domains.rest.admin"/>/v2/corpora/:corpus_key/documents</code>

The API Reference shows the full [Get Corpus](/docs/rest-api/list-tables) REST definition.

