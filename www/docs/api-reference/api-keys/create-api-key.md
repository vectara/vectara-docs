---
id: create-api-key
title: Create API Key API Definition
sidebar_label: Create API Key API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Create API Key API lets you create new API keys, which you can
bind to one or multiple corpora. You can also decide whether to designate each
key for specific access like personal API keys, only querying (read-only) or
both querying and indexing (read-write).

This capability is useful in scenarios where you have applications that
require different levels of access to corpora data. For example, you might
create a read-only API key for an application that only needs to query data.

:::note

For more information about the different types of API keys, see
[**API Key Management**](/docs/learn/authentication/api-key-management).

:::

To create an API key, send a POST request to `/v2/api_keys` with the following
properties:

- `name` - (Required) Specifies the human-readable name of the API key.
- `api_key_role` - (Required): Specifies the role of the API key as `serving`,
  `serving_and_indexing`, or `personal`.
- `corpus_keys` Specifies the corpora where that which the API key has access.
  If the api_key_role is personal, this value be `null` or missing.

The response includes the assigned API key
ID, name, secret key, enabled status, API key role, and API policy.

## REST 2.0 API URL

### Create API Key Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to create API keys:
<code>https://<Config v="domains.rest.indexing"/>/v2/api_keys</code>

The API Reference shows the full [Create API Key](/docs/rest-api/create-api-key) REST definition.

## gRPC Example

You can find the full Create API Key gRPC definition at [admin_apikey.proto](https://github.com/vectara/protos/blob/main/admin_apikey.proto).
