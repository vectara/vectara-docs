---
id: list-documents
title: List Documents API Definition
sidebar_label: List Documents API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The List Documents endpoint lets you view detailed information about documents 
uploaded to corpora, including the Document ID, title, size, date added, and 
total number of documents in a corpus.

This information enables you to catalog and inventory large amounts of data 
while also extracting lists of documents for further analysis. For example, 
developers can utilize the metadata to to build custom search and filtering 
capabilities into their applications.

:::tip

Check out our interactive API Playground that lets you experiment with this 
REST endpoint to manage your documents.

:::

## List Documents Request and Response

The request to list documents provides detailed information about documents 
uploaded to the corpus. You specify the `num_results`, `page_key`, and `metadata_filter`. 
This list documents request also requires the 
following parameters:
* Customer ID
* Corpus ID
* Document ID

The response includes details ....


## REST Example

### List Documents REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to update the status of a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/list-documents</code>

### List Documents Example

```json
tbd
```