---
id: retrieve-table
title: Retrieve Table API Definition
sidebar_label: Retrieve Table API Definition
---

The Retrieve Table API retrieves metadata and content for a specific table in 
a document. Use this endpoint to access structured data stored within tables.

## Retrieve Table Request and Response

To retrieve a specific table, send a GET request to 
`/v2/corpora/{corpus_key}/documents/{document_id}/tables/{table_id}`. This 
request supports the following query parameters:

* `corpus_key`: The corpus ID that contains the document.
* `document_id`: The document ID that contains the table.
* `table_id`: The specific table that you want to retrieve.

## REST 2.0 URL

### Retrieve Table REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to a specific tables in a document:
<code>https://<Config v="domains.rest.admin"/>/v2/corpora/:corpus_key/documents/{document_id}/tables/{table_id}</code>

The API Reference shows the full [Get Corpus](/docs/rest-api/list-tables) REST definition.
