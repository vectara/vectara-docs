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

The `apiKeyData` object includes a `description`, `apiKeyType`, and `corpusId`.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/create-api-key) that lets 
you experiment with this REST endpoint to create API keys for your account.

:::

## REST API Example

### Create API Key Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to create API keys:
<code>https://<Config v="domains.rest.indexing"/>/v1/create-api-key</code>

The API Playground shows the full [Create API Key](/docs/rest-api/create-api-key) REST definition.

## gRPC Example

You can find the full Create API Key gRPC definition at [admin_apikey.proto](https://github.com/vectara/protos/blob/main/admin_apikey.proto).
