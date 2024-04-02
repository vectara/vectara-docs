---
id: stream-query
title: Stream Query API Definition
sidebar_label: Stream Query API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Stream Query API enables continuous streamed responses as data becomes 
available, improving responsiveness and reducing latency. Instead of waiting 
for the entire response to complete, you get query results and summaries in a 
streaming manner. The Stream Query API streams the response back in smaller 
chunks as the data is generated, rather than returning the complete response 
in a single message like the [Standard Query API](/docs/api-reference/search-apis/search).

This streaming approach is beneficial when generating summaries using LLMs 
like GPT-4, which can have significant latencies of 5-10 seconds. 
In contrast, the Standard Query API makes users wait for the full summarization 
process before receiving any results. With streaming, the summary request 
processes with near-zero latency, significantly enhancing the user experience.


## Stream Query Request Body

The Stream Query API has the same request parameters as the [Standard Query API](/docs/api-reference/search-apis/search).
The `stream-query` endpoint enables streaming. Use this endpoint instead of 
the standard `query` endpoint.


## Stream Query Response Types

Each streamed chunk contains a portion of the summary text, identified by a 
unique `future_id`. Once the full summary is streamed, you receive a final 
response with the `done` field set to `true`, allowing flexible handling and 
processing of results. The Stream Query API request has three different types 
of responses:

### Preamble Response

This initial response establishes `future_id` values and serves as a preamble, 
like a "heads up." It contains the `batchQueryResponse` with only the `future_id` 
values set, which are assigned to different parts of the response, such 
as search results or the summary. You can use the `future_id` values to 
correlate the subsequent streamed chunks with their respective parts.

### Search Results Response

This second response type contains the search results as the 
`batchQueryResponse` populates with these results in real time. The `future_id` 
value in this response matches the `future_id` assigned to the search results in the 
initial response.

### Streamed Parts of the Summary Response

The third response type, which streams until you get the final `done` value, 
returns the subsequent streamed chunks of the summary. Each response has a 
`batchQueryResponse` that contains a portion of the `summary` text. The 
`future_id` value in this response matches the `future_id` assigned to the 
search results of the initial response.

## Concatenation of Streamed Data Chunks

The Stream Query API returns a stream of data chunks, and the consuming 
application is responsible for concatenating these chunks to form the complete 
response. To handle the streamed data effectively, consider the following 
process:

1. Receive each data chunk as it arrives from the Stream Query API.
2. Identify the corresponding part of the response based on the `future_id` 
   field in each chunk.
3. Concatenate each data chunk to the appropriate variable associated with its 
   `future_id`.
4. When a chunk with `done` set to `true` is received for a particular `future_id`, 
   consider the data for that part of the response as complete.
5. Combine the concatenated chunks for each `future_id` to form the complete 
   response.

Concatenating the streamed chunks in the correct order based `future_id` enables 
you to reconstruct the complete summary text and other relevant data. This 
allows you to process and display the response progressively as the chunks 
arrive, providing a more responsive and engaging user experience with 
near-zero latency.

## REST Example

### Stream Query API Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to search content from a corpus:
<code>https://<Config v="domains.rest.serving"/>/v1/stream-query</code>

The API Playground shows the full [Stream Query REST definition](/docs/rest-api/query).

## gRPC Example

You can find the full Stream Query gRPC definition at [serving.proto](https://github.com/vectara/protos/blob/main/serving.proto).
