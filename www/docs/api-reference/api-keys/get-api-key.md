---
id: get-api-key
title: Get API Key API Definition
sidebar_label: Get API Key API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

The Get API Key API lists all existing API keys for a customer ID.
It also shows what corpora are accessed by these keys and with what
permissions. This capability can provide insights into key usage and
status and help you manage the lifecycle and security of your API keys.

## Get API Key Request and Response

To get an API key, send a GET request to `/v2/api_keys/{api_key_id}`, where
`{api_key_id}` is the ID of the API key you want to retrieve.

The response includes the API name, enabled 
status, API key role, and API policy.

## REST 2.0 URL

### Get API Key Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to get an API key:
<code>https://<Config v="domains.rest.indexing"/>/v2/api-keys</code>

The API Reference shows the full [Get API Key](/docs/rest-api/get-api-key) REST definition.

## gRPC Example

You can find the full List API Keys gRPC definition at [admin_apikey.proto](https://github.com/vectara/protos/blob/main/admin_apikey.proto).
