---
id: enable-api-key
title: Enable API Key API Definition
sidebar_label: Enable API Key API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Enable API Key endpoint lets you enable or disable specific API keys. You 
can use this endpoint to temporarily disable access without deleting the key.

This capability is useful for scenarios like maintenance windows. or when your 
team no longer requires access to a specific corpus.

## Enable API Key REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/enable-api-key</code>

## Enable an API Key from the API Playground

Check out our [interactive API Playground](/docs/rest-api/enable-api-key) that lets 
you experiment with this REST endpoint to enable and disable API keys.

### Request Headers

To interact with the Index service via REST calls, you need the following 
headers:

* `customer_id` is the customer ID to use for the request.
* An JWT token as your authentication method


### Request Body

The Enable API Key request body requires the following parameters:
* `keyID` - Specifies the ID of the API key
* `enable` - Indicates whether to enable (`true`) or disable (`false`) the API key


```json
{
  "keyEnablement": [
    {
      "keyId": "6o59jjft9o02jtga72pjfv3qpn",
      "enable": true
    }
  ]
}
```