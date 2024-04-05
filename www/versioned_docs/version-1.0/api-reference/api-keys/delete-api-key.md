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

## keyID String

The `keyID` specifies the API key or list of keys that you want to delete.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/delete-api-key) that lets 
you experiment with this REST endpoint to delete API keys from an account.

:::

<Config v="names.product"/> exposes a REST endpoint at the following URL
to delete API keys:
<code>https://<Config v="domains.rest.indexing"/>/v1/delete-api-key</code>

The API Playground shows the full [Delete API Key](/docs/rest-api/delete-api-key) REST definition.

## gRPC Example

You can find the full Delete API Key gRPC definition at [admin_apikey.proto](https://github.com/vectara/protos/blob/main/admin_apikey.proto).