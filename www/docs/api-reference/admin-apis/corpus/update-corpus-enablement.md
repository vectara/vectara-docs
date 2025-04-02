---
id: update-corpus-enablement
title: Update Corpus API Definition
sidebar_label: Update Corpus API Definition
---

import {vars} from '@site/static/variables.json';

The Update Corpus API lets you enable or disable a corpus, and it also lets 
you modify the name and description of a corpus. This is useful to manage the 
availability of data within the system, such as when you need to take the 
corpus offline without having to delete the corpus.

This capability can help you utilize automated scripts to programmatically
control the availability of corpora based on certain conditions. For example,
quickly disable a corpus for maintenance updates or in response to security
incidents.

:::tip

Check out our [**interactive API Reference**](/docs/rest-api/update-corpus) that lets you experiment 
with this REST endpoint to enable or disable corpora, and to modify the name 
description.

:::

## Update Corpus Request and Response

To update a corpus, send a PATCH request to `/v2/corpora/:corpus_key`, where
`corpus_key` is the unique identifier for the corpus you want to update. The
request body specifies the `enabled` as `true` or `false`, and the `name` and 
`description` parameters.  If not specified, the corpus remains in its current 
state.

## REST 2.0 URL

### Update Corpus REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to enable or disable a corpus:
<code>https://<Config v="domains.rest.admin"/>/v2/corpora/:corpus_key</code>

The API Reference shows the full [Update Corpus](/docs/rest-api/update-corpus) REST definition.

## gRPC Example

You can find the full Update Corpus Enablement gRPC definition at [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).
