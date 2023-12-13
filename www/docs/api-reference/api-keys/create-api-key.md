---
id: create-api-key
title: Create API Key API Definition
sidebar_label: Create API Key API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Create API Key endpoint lets you create new API keys, which you can 
bind to one or multiple corpora. You also decide whether to designate each key
for specific access like only querying (read-only) or both querying and 
indexing (read-write).

This is useful in scenarios where you have applications that 
require different levels of access to corpora data. For example, you might 
create a read-only API key for an application that only nees to query data.

## Create API Key Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/create-api-key</code>

## Create an API Key from the API Playground

Check out our [interactive API Playground](/docs/rest-api/create-api-key) that lets 
you experiment with this REST endpoint to create API keys for your account.

### Request Headers

To interact with the Index service via REST calls, you need the following 
headers:

* `customer_id` is the customer ID to use for the request.
* An JWT token as your authentication method

### Request Body

The Create API Key request body requires the following parameters:
* `description` - Provides details about the API key
* `apiKeyType` - Indicates the type of API key including `API_KEY_TYPE__UNDEFINED` 
  (default), `API_KEY_TYPE__SERVING`, or `API_KEY_TYPE__SERVING_INDEXING`.
* `corpusId` - Specifies the corpus IDs where you want to bind the API key.

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