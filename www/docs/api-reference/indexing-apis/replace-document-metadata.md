---
id: replace-document-metadata
title: Replace Document Metadata API Definition
sidebar_label: Replace Document Metadata API Definition
---

import {vars} from '@site/static/variables.json';

The Replace Document Metadata API enables you to overwrite the metadata of a 
specific document in a corpus. This endpoint replaces the previous metadata 
object entirely with a new metadata object provided in the request. It is 
useful when you want to reset or standardize metadata fields for a document.

Replacing document metadata ensures that only the fields specified in the new 
metadata object are retained, and all previous metadata fields are replaced.

This operation is particularly helpful for maintaining metadata consistency or 
when significant changes are required in a document's metadata.

## Replace Document Metadata Request and Response

To replace a document’s metadata, send a `PUT` request to 
`/v2/corpora/:corpus_key/documents/:document_id/metadata`, where:

`corpus_key` is the unique identifier of the corpus containing the document.
`document_id` is the unique identifier for the document. This ID must be percent-encoded.

The request body must contain the new metadata object. This object replaces 
all fields in the existing metadata.

## REST 2.0 URL

### Replace Corpus Document Metadata REST Endpoint Address

Vectara exposes a REST endpoint at the following URL to replace document 
metadata:
<code>https://<Config v="domains.rest.admin"/>/v2/corpora/:corpus_key/documents/:document_id/metadata</code>

The API Reference shows the full [Replace Document Metadata](/docs/rest-api/replace-corpus-document-metadata) REST definition.
