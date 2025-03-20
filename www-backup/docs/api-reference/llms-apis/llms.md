---
id: llms-api
title: Large Language Models (LLMs) API Definition
sidebar_title: Large Language Models (LLMs) API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

The Large Language Models (LLMs) API retrieves a list of available LLMs that
can be used with query and chat endpoints.

## Large Language Models (LLMs) Request and Response

To list the available LLMs, send a GET request to `/v2/llms`. You can
specify optional query parameters to filter the results.

- `filter` - Specifies a regular expression to match against the names and
  descriptions of the LLMs.
- `limit` - Indicates the maximum number of LLMs to return in a single request,
  with a default value of `10` and a maximum value of `100`.
- `page_key` - Indicates the next page of results when the previous request has
  reached the limit.

## REST 2.0 URL

### Large Language Models (LLMs) Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to list LLMs:
<code>https://<Config v="domains.rest.indexing"/>/v2/llms</code>

The API Reference shows the full [Large Language Models (LLMs)](/docs/rest-api/list-ll-ms) REST definition.
