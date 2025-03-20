---
id: list-corpora
title: List Corpora API Definition
sidebar_label: List Corpora API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The List Corpora API lets you retrieve a list of corpora in your account. This
endpoint returns a paginated list of `corpora` objects, which contain basic
information about each corpus.

## List Corpora Request and Response

To list corpora, send a GET request to `/v2/corpora`. You can specify optional
parameters to control the pagination and filtering of the results. The `limit`
parameter determines the maximum number of corpora to return, with a default
value of `10` and a maximum value of `100`.

The `filter` parameter also lets you specify a regular expression to filter  
based on name or summary. The `page_key` parameter retrieves the next page of
results when the previous request has reached the limit.

The response includes an array of corpora `objects` with matching `corpora` and
`metadata`.

## REST 2.0 URL

### List Corpora REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to list corpora in the account:
<code>https://<Config v="domains.rest.admin"/>/v2/corpora</code>

The API Reference shows the full [List Corpora](/docs/rest-api/list-corpora) REST definition.

## gRPC Example

You can find the full List Corpora gRPC definition at [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).
