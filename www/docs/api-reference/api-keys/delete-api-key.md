---
id: delete-api-key
title: Delete API Key API Definition
sidebar_label: Delete API Key API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Delete API Key API lets you delete one or more existing API keys. 
This capability is useful for managing the lifecycle and security of API keys 
such as when they are no longer needed or when a key is compromised.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/delete-api-key) that lets 
you experiment with this REST endpoint to delete API keys from an account.

:::

## REST Example

### Delete API Key Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to delete an API key:
<code>https://<Config v="domains.rest.indexing"/>/v1/delete-api-key</code>

### Delete API Key Request Body


The Delete API Key request body requires the `keyID` of the API key you 
want to delete.


```json
{
  "keyId": [
    "6o59jjft9o02jtga72pjfv3qpn"
  ]
}
```