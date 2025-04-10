---
id: delete-api-key
title: Delete API Key API Definition
sidebar_label: Delete API Key API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

The Delete API Key API lets you delete one or more existing API keys.
This capability is useful for managing the lifecycle and security of API keys
such as when they are no longer needed or when a key is compromised.

## Delete API Key Request and Response

To delete an API key, send a DELETE request to `/v2/api_keys/{api_key_id}`,
where `{api_key_id}` is the ID of the API key you want to delete.

## REST 2.0 URL

### Delete API Key Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to delete API keys:
<code>https://<Config v="domains.rest.indexing"/>/v2/delete-api-key</code>

The API Reference shows the full [Delete API Key](/docs/rest-api/delete-api-key) REST definition.

## gRPC Example

You can find the full Delete API Key gRPC definition at [admin_apikey.proto](https://github.com/vectara/protos/blob/main/admin_apikey.proto).
