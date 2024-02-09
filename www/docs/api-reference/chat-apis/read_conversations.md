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

Check out our **interactive API Playground** that lets you experiment with this 
REST endpoint to read conversations in the chat history corpus.

:::

## Read Conversations Request and Response

The Read Conversations request body has the following parameters:

* `conversation_id` - Specifies the ID of the conversation that you want to read

```json
{
  "corpus_id": 1,
  "conversation_id": [
    "12345"
  ]
}
```

You get the following response:


```json
{
  "conversation": [
    {
      "id": "string",
      "turn": [
        {
          "id": "1",
          "conversation_id": "1",
          "query": "First query of the turn",
          "answer": "First answer of the turn",
          "enabled": true,
          "epoch_secs": 0
        },
        {
          "id": "2",
          "conversation_id": "2",
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

```json
{
  "conversation": [
    {
      "id": "1",
      "conversation_id": "12345",
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

### Read Conversations Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to read conversations in the chat history corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/read-conversations</code>




## gRPC Example

You can find the full Read Conversations gRPC definition at chat.proto.