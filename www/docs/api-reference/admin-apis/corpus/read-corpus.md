---
id: read-corpus
title: Read Corpus API Definition
sidebar_label: Read Corpus API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Read Corpus endpoint lets you view detailed information about corpora 
within your account. It enables you to view different aspects about the corpus 
including basic information like the ID, name, whether it is enabled or 
disabled, and other metadata. You can also view the corpus size, associated 
API keys, custom dimensions, and filter attributes.

This capability helps administrators understand the access control details and 
monitor the size of corpora to understand information like the amount of quota 
consumed. You can also use this information for optimizing 
search and storage utilization. 

For example, you can track the read and write activity of a specific corpus 
which can help you change your security strategy proactively. You noticed a 
corpus with an API key with read/write access that is only being used for high 
volume reads. You may decide to switch to a read-only key.

In another case, you might respond to a security incident by [disabling a specific corpus](/docs/api-reference/admin-apis/corpus/update-corpus-enablement) 
because of information returned by this endpoint.

:::tip

Check out our interactive API Playground that lets you experiment with this 
REST endpoint to manage your corpus details.

:::

## Read Corpus Request and Response

The request to read corpus data provides detailed information about the corpus.
You specifiy either `true` or `false` whether you want to view basic 
information, corpus size, associated API keys, custom dimensions, and filter 
attributes. This read corpus request also requires the following parameters:

* Customer ID
* Corpus ID

The response includes detailed information about the corpus depending on what 
you specified in the request. For example, you wanted to know the associated 
API keys with a specific corpus.

## REST Example

### Read Corpus REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to ingest content into a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/read-corpus</code>

### Read Corpus Request Example

```json
{
  "corpusId": [
    123456789
  ],
  "readBasicInfo": true,
  "readSize": true,
  "readApiKeys": true,
  "readCustomDimensions": true,
  "readFilterAttributes": true
}
```

### Read Corpus Response Example

tbd.. still need to modify fields with realworld values

```json
{
  "corpora": [
    {
      "corpus": {
        "id": 5,
        "name": "string",
        "description": "string",
        "dtProvision": "string",
        "enabled": true,
        "swapQenc": true,
        "swapIenc": true,
        "textless": true,
        "encrypted": true,
        "encoderId": "string",
        "metadataMaxBytes": 0,
        "faissIndexType": "string",
        "customDimensions": [
          {
            "name": "string",
            "description": "string",
            "servingDefault": 0,
            "indexingDefault": 0
          }
        ],
        "filterAttributes": [
          {
            "name": "string",
            "description": "string",
            "indexed": true,
            "type": "FILTER_ATTRIBUTE_TYPE__UNDEFINED",
            "level": "FILTER_ATTRIBUTE_LEVEL__UNDEFINED"
          }
        ]
      },
      "corpusStatus": {
        "code": "OK",
        "statusDetail": "string",
      },
      "size": {
        "epochSecs": "string",
        "size": "string"
      },
      "sizeStatus": {
        "code": "OK",
        "statusDetail": "string",
      },
      "apiKey": [
        {
          "id": "string",
          "description": "string",
          "keyType": "API_KEY_TYPE__UNDEFINED",
          "enabled": true,
          "tsStart": "string",
          "tsEnd": "string",
          "status": "UNKNOWN"
        }
      ],
      "apiKeyStatus": {
        "code": "OK",
        "statusDetail": "string",
      },
      "customDimension": [
        {
          "name": "string",
          "description": "string",
          "servingDefault": 0,
          "indexingDefault": 0
        }
      ],
      "customDimensionStatus": {
        "code": "OK",
        "statusDetail": "string",
      },
      "filterAttribute": [
        {
          "name": "string",
          "description": "string",
          "indexed": true,
          "type": "FILTER_ATTRIBUTE_TYPE__UNDEFINED",
          "level": "FILTER_ATTRIBUTE_LEVEL__UNDEFINED"
        }
      ],
      "filterAttributeStatus": {
        "code": "OK",
        "statusDetail": "string",
      }
    }
  ]
}
```