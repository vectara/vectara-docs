---
id: stream-query
title: Stream Query API Definition
sidebar_label: StreamQuery API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';


The Stream Query API enables continuous streamed responses as data becomes 
available, improving responsiveness and reducing latency. Instead of waiting 
for the entire response, you receive query results and summaries in a 
streaming manner. The Stream Query API streams the response back in smaller 
chunks as the data is generated, rather than returning the complete response 
at once.

This streaming approach is particularly beneficial when generating summaries 
using LLMs like GPT-4, which can have significant latencies of 5-10 seconds. 
In contrast, the regular Query API makes users wait for the full summarization 
process before receiving any results. With streaming, the summary request 
processes with near-zero latency, significantly enhancing the user experience. 


## Stream Query Request Body and Response

The `/v1/stream-query` endpoint enables streaming. Use this endpoint instead of 
the standard `/v1/query` endpoint.

Each streamed chunk contains a portion of the summary text, identified by a 
unique `future_id`. Once the entire summary is streamed, you receive a final 
response with the `done` field set to `true`, allowing flexible handling and 
processing of results.

## REST Example

### Query API Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to search content from a corpus:
<code>https://<Config v="domains.rest.serving"/>/v1/stream-query</code>

The API Playground shows the full [Stream Query REST definition](/docs/rest-api/stream-query).

## gRPC Example

You can find the full Stream Query gRPC definition at [serving.proto](https://github.com/vectara/protos/blob/main/serving.proto).
