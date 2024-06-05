---
id: create-chat-turn
title: Create Chat Turn API Definition
sidebar_label: Create Chat Turn API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Create Chat Turn API allows you to create a new turn in a chat. Each 
conversation consists of a series of `turn` objects, which represent the 
sequence of message and response pairs that make up the dialog.

## Create Chat Turn Request and Response

To create a chat turn, send a POST request to `/v2/chats/{chat_id}/turns`, where 
`{chat_id}` is the unique identifier of the chat which you want to add the 
turn. The request contains the following properties:

* `query` - (Required) Specifies the chat message or question for the new turn. 
* `stream_response` - Indicates whether the response should be streamed in 
  real-time. The default value is `false`.
* `search` - (Required) Specifies the search parameters for retrieving 
  relevant information from the corpora.
* `generation` - (Required) Specifies the generation parameters for the chat 
  response.
* `chat.store` - Indicates whether to store the request message and response 
  message. The default value is true.

The response returns assigned `turn_id`, the generated answer, `answer_language`, 
and the `search_results` used by the chat model.

## REST 2.0 URL

### Create Chat Turn Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to create a chat turns:
<code>https://<Config v="domains.rest.indexing"/>/v2/chats/:chat_id/turns</code>

The API Playground shows the full [Create Chat Turn](/docs/rest-api/create-chat-turn) REST definition.

