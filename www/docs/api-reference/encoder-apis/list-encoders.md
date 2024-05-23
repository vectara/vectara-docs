---
id: list-encoders
title: List Encoders API Definition
sidebar_title: List Encoders API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

The List Encoders API retrieves a list of available encoders used for 
embedding documents and queries.

## List Encoders Request and Response

To list the available encoders, send a GET request to `/v2/encoders`. You can 
specify optional query parameters to filter the results.

* `filter` - Specifies a regular expression to match against the names and 
  descriptions of theencoders.
* `limit` - Indicates the maximum number of encoders to return in a single 
  request, with a default value of `10` and a maximum value of `100`.
* `page_key` - Indicates the next page of results when the previous request 
  has reached the limit.

## REST 2.0 Example

### List Encoders Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to delete turns in a chat:
<code>https://<Config v="domains.rest.indexing"/>/v2/encoders</code>

The API Playground shows the full [List Rerankers](/docs/rest-api/list-encoders) REST definition.