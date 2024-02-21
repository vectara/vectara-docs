---
id: enable-api-key
title: Enable API Key API Definition
sidebar_label: Enable API Key API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Enable API Key API lets you enable or disable specific API keys. You 
can use this endpoint to temporarily disable access without deleting the key.

This capability is useful for scenarios like maintenance windows. or when your 
team no longer requires access to a specific corpus.

## keyEnablement Object

The `keyEnablement` object contains pairs of a `keyID` with the `enable` 
status as enable (`true`) or disable (`false`) the API key.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/enable-api-key) that lets 
you experiment with this REST endpoint to enable and disable API keys.

:::

## REST Example

### Enable API Key REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to enable API keys:
<code>https://<Config v="domains.rest.indexing"/>/v1/enable-api-key</code>

The API Playground shows the full [Enable API Key](/docs/rest-api/enable-api-key) REST definition.

## gRPC Example

You can find the full Enable API Key gRPC definition at [admin_apikey.proto](https://github.com/vectara/protos/blob/main/admin_apikey.proto).