---
id: enable-api-key
title: Update API Key API Definition
sidebar_label: Update API Key API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Update API Key API lets you enable or disable specific API keys. You
can use this endpoint to temporarily disable access without deleting the key.

This capability is useful for scenarios like maintenance windows, or when your
team no longer requires access to a specific corpus.

## Update API Key Request and Response

To update an API key, send a PATCH request to `/v2/api_keys/{api_key_id}`,
where `{api_key_id}` is the ID of the API key you want to update with the
`enabled` property set to `true` or `false` for the API key.

## REST 2.0 URL

### Enable API Key Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to enable API keys:
<code>https://<Config v="domains.rest.indexing"/>/v2/api_keys/:api_key_id</code>

The API Reference shows the full [Update API Key](/docs/rest-api/update-api-key) REST definition.

## gRPC Example

You can find the full Update API Key gRPC definition at [admin_apikey.proto](https://github.com/vectara/protos/blob/main/admin_apikey.proto).
