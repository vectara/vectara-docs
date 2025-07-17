---
id: list-api-keys
title: List API Keys API Definition
sidebar_label: List API Keys API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The List API Keys API lists all existing API keys for a customer ID.
It also shows what corpora are accessed by these keys and with what
permissions. This capability can provide insights into key usage and
status and help you manage the lifecycle and security of your API keys.

## List API Keys Request and Response

To list API keys, send a GET request to `/v2/api_keys`.

The response includes an `api_keys` array field that contains information about 
the API keys, and a `metadata` field containing information such as pagination key.

## REST 2.0 URL

### List API Keys Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to list API keys:
<code>https://<Config v="domains.rest.indexing"/>/v2/api-keys</code>

The API Reference shows the full [List API Keys](/docs/rest-api/list-api-keys) REST definition.

## gRPC Example

You can find the full List API Keys gRPC definition at [admin_apikey.proto](https://github.com/vectara/protos/blob/main/admin_apikey.proto).
