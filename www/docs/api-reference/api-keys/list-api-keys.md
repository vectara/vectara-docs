---
id: list-api-keys
title: List API Keys API Definition
sidebar_label: List API Keys API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The List API Keys API lists all existing API keys for a customer ID. 
It also shows what corpora are accessed by these keys and with what 
permissions.

This capability can provide insights into key usage and status and help you
manage the lifecycle and security of your API keys.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/list-api-keys) that lets 
you experiment with this REST endpoint to list API keys in an account.

:::


## REST Example

### List API Keys Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to list the API keys for a Customer ID:
<code>https://<Config v="domains.rest.indexing"/>/v1/list-api-keys</code>

### List API Keys Request Body

The List API Keys request body requires the following parameters:
* `numResults` - Specifies the maximum number of results to return.
* `pageKey` Specifies the page key that retrieves a specific page of results. 
  If you want the first page, leave this field empty.
* `readCorporaInfo`: Indicates whether to return the corpus name and ID 
  associated with the API keys.

```json
{
  "numResults": 0,
  "pageKey": "1",
  "readCorporaInfo": true
}
```