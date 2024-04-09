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
permissions. This capability can provide insights into key usage and 
status and help you manage the lifecycle and security of your API keys.

Specify `numResults`, the `pageKey`, and `readCorporaInfo` which indicates whether to 
return the corpus name and `corpus_id` associated with the API keys.

The response includes a `keyData` object that shows pairs of `apiKey` and 
`corpus` objects.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/list-api-keys) that lets 
you experiment with this REST endpoint to list API keys in an account.

:::

## REST Example

### List API Keys Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to list API keys:
<code>https://<Config v="domains.rest.indexing"/>/v1/list-api-keys</code>

The API Playground shows the full [List API Keys](/docs/rest-api/list-api-keys) REST definition.

## gRPC Example

You can find the full List API Keys gRPC definition at [admin_apikey.proto](https://github.com/vectara/protos/blob/main/admin_apikey.proto).
