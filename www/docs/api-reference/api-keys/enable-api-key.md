---
id: enable-api-key
title: Enable API Key API Definition
sidebar_label: Enable API Key API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Enable API Key API lets you enable or disable specific API keys. You 
can use this API to temporarily disable access without deleting the key.

This capability is useful for scenarios like maintenance windows. or when your 
team no longer requires access to a specific corpus.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/enable-api-key) that lets 
you experiment with this REST endpoint to enable and disable API keys.

:::

## REST Example

### Enable API Key REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to enable an API key:
<code>https://<Config v="domains.rest.indexing"/>/v1/enable-api-key</code>

### Enable API Key Request Body

The Enable API Key request body requires the following parameters:
* `keyID` - Specifies the ID of the API key
* `enable` - Indicates whether to enable (`true`) or disable (`false`) the API key


```json
{
  "keyEnablement": [
    {
      "keyId": "6o59jjft9o...........",
      "enable": true
    }
  ]
}
```