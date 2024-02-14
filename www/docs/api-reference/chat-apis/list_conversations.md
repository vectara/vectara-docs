---
id: list-conversations
title: List Conversations API Definition
sidebar_label: List Conversations API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The List Conversations API lists all the conversations in a specific corpus. 
This data enables developers to monitor chatbot interactions and understand 
how users engage with the data. Pagination lets developers navigate through 
large datasets.


## Conversation Object Definition

The `conversation` object specifies a unique turn `id`, which is the first turn 
in the conversation. The unique `conversation_id` then specifies the conversation 
within the chat history corpus. 

:::tip

Check out our **interactive API Playground** that lets you experiment with this 
REST endpoint to list conversations in the chat history corpus.

:::

## List Conversations Request and Response

The List Conversations request body has the following parameters:

* `num_results` - Specifies the maximum number of conversations to return. 
  Default value is 5.
* `page_key` - Retrieves a specific page of results. You can leave it blank 
  to get the first page.

```json
{
    "num_results": "5",
    "page_key": "",
}
```

You get the following response:

```json
{
  "conversation": [
    {
      "id": "ID of the turn",
      "conversation_id": "ID of the conversation",
      "query": "First query of the turn",
      "answer": "First answer of the turn",
      "enabled": true,
      "epoch_secs": 0
    }
  ],
  "status": {
    "code": 0,
    "message": "Status message"
  },
  "page_key": ""
}
```

## REST Example

### List Conversations Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to list conversations in the chat history corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/list-conversations</code>

### Request Body and Response

```json
{
    "num_results": "5",
    "page_key": "",
}
```

You get the following response:

```json
{
  "conversation": [
    {
      "id": "4b8a-4aec-b600",
      "conversation_id": "0191086a-4b8a-4aec-b600-affa9b261ac",
      "query": "First query of the turn",
      "answer": "First answer of the turn",
      "enabled": true,
      "epoch_secs": 0
    }
  ],
  "status": {
    "code": 0,
    "message": "Status message"
  },
  "page_key": ""
}
```

## gRPC Example

You can find the full List Conversations gRPC definition at [chat.proto](https://github.com/vectara/protos/blob/main/chat.proto).