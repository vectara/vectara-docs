---
id: read-conversations
title: Read Conversations API Definition
sidebar_label: Read Conversations API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Read Conversations API retrieves detailed information about specific 
conversations. This information enables developers to analyze the flow of 
user chats and understand the context of interactions, which helps in 
refining chatbot responses. You can read up to 100 conversations.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/read-conversations) that lets you experiment with this 
REST endpoint to read conversations in the chat history corpus.

:::

## Read Conversations Request and Response

The Read Conversations request body has the following parameters:

* `conversation_id` - Specifies the ID of the conversation that you want to read

```json
{
  "conversation_id": [
    "0191086a-4b8a-4aec-b600-affa9b261ac"
  ]
}
```

You get the following response:


```json
{
  "conversation": [
    {
      "id": "ID of the conversation",
      "turn": [
        {
          "id": "ID of the turn",
          "conversation_id": "ID of the conversation",
          "query": "First query of the turn",
          "answer": "First answer of the turn",
          "enabled": true,
          "epoch_secs": 0
        },
        {
          "id": "ID of the second turn",
          "conversation_id": "ID of the conversation",
          "query": "Second query of the turn",
          "answer": "Second answer of the turn",
          "enabled": true,
          "epoch_secs": 0
        }
      ]
    }
  ],
  "status": {
    "code": 0,
    "message": ""
  }
}
```

## REST Example

### Read Conversations Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to read conversations in the chat history corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/read-conversations</code>

## gRPC Example

You can find the full Read Conversations gRPC definition at [chat.proto](https://github.com/vectara/protos/blob/main/chat.proto).
