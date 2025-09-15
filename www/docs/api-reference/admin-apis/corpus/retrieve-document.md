---
id: retrieve-document
title: Retrieve Document API Definition
sidebar_label: Retrieve Document
---

import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Retrieve Document API enables you to fetch the content and metadata of a 
specific document from a corpus. Use this endpoint to view the full details of 
a document, including its text, metadata, and associated tables, if table 
extraction is enabled.

This information is particularly useful when you need to analyze the details 
of a specific document or integrate document content into your application 
workflows.

## Retrieve Document Request and Response

To retrieve a document, send a GET request to 
`/v2/corpora/:corpus_key/documents/:document_id`, where `corpus_key` is the 
unique identifier for the corpus. You also specify the unique `document_id` of 
the document to retrieve.

The response contains the unique ID, the parts that make up the document, and 
the metadata of the specific document. If table extraction is enabled, the 
response includes tables associated with the document.

## REST 2.0 URL

### Retrieve Document REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL to 
retrieve a document:

<code>https://<Config v="domains.rest.admin"/>/v2/corpora/:corpus_key/documents/:document_id</code>

The API Reference shows the full [Retrieve Document](/docs/rest-api/get-corpus-document) REST definition.
