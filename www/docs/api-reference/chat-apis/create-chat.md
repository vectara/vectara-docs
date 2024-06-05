---
id: create-chat
title: Create Chat API Definition
sidebar_label: Create Chat API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Create Chat API allows you to start a new chat while specifying the 
default retrieval parameters for the prompt

## Create Chat Request and Response

To create a chat, send a POST request to `/v2/chats`. The body contains the 
following properties:

* `query` - (Required) Specifies the initial chat message or question.
* `stream_response` - Indicates whether the response should be streamed in 
  real-time. The default value is `false`.
* `search` - (Required) Specifies the search parameters for retrieving 
  relevant information from the corpora including `offset`, `limit`, 
  `context_configuration`, and `reranker`.
* `generation` - (Required) Specifies the generation parameters for the chat 
  response.
* `chat.store` - Indicates whether to store the request message and response 
  message. The default value is `true`.

The response contains the assigned `chat_id`, `turn_id` (if the chat response 
was stored), the generated `answer`, `answer_language`, and the `search_results` 
used by the chat model.

## REST 2.0 URL

### Create Chat Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to create a chat:
<code>https://<Config v="domains.rest.indexing"/>/v2/chats</code>

The API Playground shows the full [Create Chat](/docs/rest-api/create-chat) REST definition.

## gRPC Example

You can find the full List Conversations gRPC definition at [chat.proto](https://github.com/vectara/protos/blob/main/chat.proto).
