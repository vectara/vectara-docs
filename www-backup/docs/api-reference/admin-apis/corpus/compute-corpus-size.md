---
id: compute-corpus-size
title: Compute Corpus Size API Definition
sidebar_label: Compute Corpus Size API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Compute Corpus Size API (API 1.0 only) lets you dynamically compute amount of quota consumed
by a corpus. This capability is useful for administrators to track and monitor
the amount of usage for specific corpora. For example, you manage multiple
tenants and determine that a user consumed too much quota and you might decide
to disable the API keys associated with a specific corpus or corpora.

:::tip

Check out our [**interactive API Reference**](/docs/1.0/rest-api/compute-corpus-size) that lets you experiment with this
endpoint to compute the corpus size.

:::

## Compute Corpus Size Request and Response

The request to compute the corpus size provides information about what time
the size was calculated and the size of the corpus. This request also requires
the `corpus_id` and `customer_id` parameters.

The response includes a `size` object that shows the `epochSecs` and corpus `size`
values.

## REST 1.0 URL

### Compute Corpus Size REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to compute the size of a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/compute-corpus-size</code>

The API Reference V1.0 shows the full [Compute Corpus Size](/docs/1.0/rest-api/compute-corpus-size) REST definition.

## gRPC Example

You can find the full Compute Corpus Size gRPC definition at [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).
