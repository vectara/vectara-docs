---
id: delete-api-key
title: Delete API Key API Definition
sidebar_label: Delete API Key API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Delete API Key endpoint lets you delete one or more existing API keys. 
This capability is useful for managing the lifecycle and security of API keys 
such as when they are no longer needed or when a key is compromised.

## Delete API Key Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/delete-api-key</code>

## Delete an API Key from the API Playground

Check out our [interactive API Playground](/docs/rest-api/delete-api-key) that lets 
you experiment with this REST endpoint to delete API keys from an account.

### Request Headers

To interact with the Index service via REST calls, you need the following 
headers:

* `customer_id` is the customer ID to use for the request.
* An JWT token as your authentication method

### Request Body


The Delete API Key request body requires the `keyID` of the API key you 
want to delete.


```json
{
  "keyId": [
    "6o59jjft9o02jtga72pjfv3qpn"
  ]
}
```