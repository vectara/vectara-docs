---
id: create-api-key
title: Create API Key API Definition
sidebar_label: Create API Key API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Create API Key endpoint lets you create new API keys, which you can 
bind to one or multiple corpora. You also decide whether to designate each key
for specific access like only querying (read-only) or querying and indexing 
(read-write).


## Create API Key Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/create-api-key</code>

### Request Headers

To interact with the Index service via REST calls, you need the following 
headers:

* `customer_id` is the customer ID to use for the request.
* An JWT token as your authentication method

### Request Body

The possible values for apiKeyType are API_KEY_TYPE__UNDEFINED (default), 
API_KEY_TYPE__SERVING, and API_KEY_TYPE__SERVING_INDEXING.

You also specify the corpus IDs of where you want to bind the API key.

```json
{
  "apiKeyData": [
    {
      "description": "Description of the ApiKey.",
      "apiKeyType": "API_KEY_TYPE__UNDEFINED",
      "corpusId": [
        12
      ]
    }
  ]
}
```