---
id: create-api-key
title: Create API Key API Definition
sidebar_label: Create API Key API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Create API Key API lets you create new API keys, which you can 
bind to one or multiple corpora. You can also decide whether to designate each 
key for specific access like only querying (read-only) or both querying and 
indexing (read-write).

This capability is useful in scenarios where you have applications that 
require different levels of access to corpora data. For example, you might 
create a read-only API key for an application that only needs to query data.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/create-api-key) that lets 
you experiment with this REST endpoint to create API keys for your account.

:::

## REST Example

### Create API Key Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to create an API key:
<code>https://<Config v="domains.rest.indexing"/>/v1/create-api-key</code>

### Create API Key Request Body

The Create API Key request body requires the following parameters:
* `description` - Provides details about the API key
* `apiKeyType` - Indicates the type of API key including `API_KEY_TYPE__UNDEFINED` 
  (default), `API_KEY_TYPE__SERVING`, or `API_KEY_TYPE__SERVING_INDEXING`.
* `corpusId` - Specifies the corpus IDs where you want to bind the API key.

In this example, you create a default key.

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