---
id: list-documents
title: List Documents API Definition
sidebar_label: List Documents API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The List Documents endpoint lets you view the Document IDs and their metadata 
in a corpus. This is useful for viewing documents indexed so far and helping 
you decide to remove documents that are no longer needed. It helps you manage 
the document lifecycle in your environent.

This information enables you to catalog and inventory large amounts of data 
while also extracting lists of documents for further analysis. For example, 
developers can utilize the metadata to to build custom search and filtering 
capabilities into their applications.

:::tip

Check out our [interactive API Playground](/docs/rest-api/list-documents) that lets you experiment with this 
REST endpoint to manage your documents.

:::

## List Documents Request and Response

The request to list documents provides detailed information about documents 
uploaded to the corpus. You can also specify the `numResults`, `pageKey`, and 
`metadataFilter`. This list documents request also requires the following 
parameters:

* Customer ID
* Corpus ID

The response includes a list of the first 10 documents by default. You can 
configure up to 1000.


## REST Example

### List Documents REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to update the status of a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/list-documents</code>

### Example Request

```json
{
  "corpusId": 12,
  "numResults": 20,
  "pageKey": "",
  "metadataFilter": ""
}
```

### Example Reponse

```json
{
  "id": "NHL2023-24Rulebook_Part2.pdf",
  "metadata": {
    "CreationDate": "1704344165",
    "Producer": "Acrobat 11.0.3",
    "Creator": "Acrobat 11.0.3",
    "ModDate": "1704344166",
    "title": "Front Page"
  }
}
```