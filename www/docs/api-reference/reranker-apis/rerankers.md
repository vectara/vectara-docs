---
id: reranker-apis
title: List Rerankers API Definition
sidebar_title: List Rerankers API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

The List Rerankers API retrieves a list of available rerankers used to improve 
the ranking and ordering of search results.

## List Rerankers Request and Response

To list the available rerankers, send a GET request to `/v2/rerankers`. You can 
specify optional query parameters to filter the results.

* `filter` - Provides a regular expression to match against the names and 
  descriptions of the rerankers.
* `limit` - Indicates the maximum number of rerankers to return in a single 
  request, with a default value of `10` and a maximum value of `100`.
* `page_key` - Indicates the next page of results when the previous request 
  has reached the limit.


## REST 2.0 Example

### List Rerankers Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to delete turns in a chat:
<code>https://<Config v="domains.rest.indexing"/>/v2/rerankers</code>

The API Playground shows the full [List Rerankers](/docs/rest-api/list-rerankers) REST definition.