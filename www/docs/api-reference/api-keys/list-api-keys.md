---
id: list-api-keys
title: List API Keys API Definition
sidebar_label: List API Keys API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The List API keys endpoint lists all existng API keys for a customer ID. 
It also shows what corpora are accessed by these keys and with what 
permissions.

This capability can provide insights into key usage and status and help you
manage the lifecycle and security of your API keys.


## List API Keys Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/list-api-keys</code>

## List the API Keys from the API Playground

Check out our [interactive API Playground](/docs/rest-api/list-api-keys) that lets 
you experiment with this REST endpoint to list API keys in your account.


### Request Headers

To interact with the List API Keys service via REST calls, you need the 
following headers:

* `customer_id` is the customer ID to use for the request.
* An JWT token as your authentication method


### Request Body

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