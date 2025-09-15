---
id: get-query-history
title: Get Query History API Definition
sidebar_label: Get Query History
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Get Query History API allows you to retrieve detailed history about a 
specific query that was made against a corpus. The response includes detailed 
information about the query, such as latency, the time it was executed, and 
the various stages in the query pipeline.

## Get Query History Request and Response

To get a history of a specific query, send a GET request to 
`/v2/queries/{query_id}`. You specify the `query_id` and the response includes 
the `id` of the query, the `query` object, the `chat_id`, the time taken to 
complete the query (`latency_ms`) the time that the query `started_at`, along 
with the `spans` object.

The `spans` object provides information about the ordered parts of the query 
pipeline and you get information about what happens during each stage of the 
pipeline.

## REST 2.0 URL

### Get Query History Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to get a history of a specific query:
<code>https://<Config v="domains.rest.indexing"/>/v2/queries/:query_id</code>

The API Reference shows the full [Get Query History](/docs/rest-api/get-query-history) REST definition.
