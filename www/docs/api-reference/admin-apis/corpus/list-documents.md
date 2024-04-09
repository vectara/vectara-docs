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

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/list-corpus-documents) that lets you experiment with this 
REST endpoint to list your documents.

:::

## List Documents Request and Response

The request to list documents provides detailed information about documents 
uploaded to the corpus. You can also specify the `numResults`, `pageKey`, and 
`metadataFilter`. This list documents request requires the `corpus_id` and 
`customer_id` parameters.

The response includes a list of the first 10 documents by default. You can 
configure up to 1000.

## REST Example

### List Documents REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to list documents:
<code>https://<Config v="domains.rest.admin"/>/v2/corpora/:corpus_key/documents</code>

The API Playground shows the full [List Documents](/docs/rest-api/list-corpus-documents) REST definition.

## gRPC Example

You can find the full List Documents gRPC definition at [list_documents.proto](https://github.com/vectara/protos/blob/main/list_documents.proto).
