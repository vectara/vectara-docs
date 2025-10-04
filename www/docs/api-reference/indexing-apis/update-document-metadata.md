---
id: update-document-metadata
title: Update Document Metadata API Definition
sidebar_label: Update Document Metadata
---

import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Update Document Metadata API enables you to modify the metadata of a 
specific document in a corpus by merging the new metadata with the existing 
metadata. This operation allows you to add or update specific fields without 
affecting other metadata fields.

Updating document metadata ensures that existing metadata fields not specified 
in the request remain unchanged. This is useful for incremental updates, such 
as adding new tags or updating specific attributes of a document.

This operation is ideal for scenarios where metadata changes are additive or 
require only partial updates to specific fields.

## Update Corpus Document Metadata Request and Response

To update a document’s metadata, send a `PATCH` request to 
`/v2/corpora/:corpus_key/documents/:document_id`, where:

`corpus_key` is the unique identifier of the corpus containing the document.
`document_id` is the unique identifier for the document. This ID must be percent-encoded.

The request body must include the metadata fields to add or update. Only the 
specified fields will be modified; all other metadata fields will remain 
unchanged.

## REST 2.0 URL

### Update Corpus Document Metadata REST Endpoint Address

Vectara exposes a REST endpoint at the following URL to update document 
metadata:
<code>https://<Config v="domains.rest.admin"/>/v2/corpora/:corpus_key/documents/:document_id</code>

The API Reference shows the full [Update Document Metadata](/docs/rest-api/list-corpus-documents) REST definition.
