---
id: chat-apis-overview
title: Chat APIs Overview
sidebar_label: Chat APIs Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

Vectara's Chat APIs provide a streamlined solution for integrating chatbot 
functionalities into domain-specific applications and websites using Retrieval 
Augmented Generation (RAG). Designed with efficiency in mind, these Chat APIs 
enable developers to create interactive user experiences and manage data 
conversations for users. With the unique `conversationId` generated for each 
chat session, developers can track and manage conversations over time.

These Chat APIs enable operations and pagination through the history of a chat, 
specifically the conversations and their subsequent exchanges, also known as 
turns. Administrators can gain valuable insights into user behavior by analyzing 
trends among users, which creates opportunities to identify knowledge gaps for 
information about products, technical documentation, and FAQs.

Vectara Chat provides the following Chat APIs:

* [**Query**](/docs/1.0/api-reference/search-apis/search) contains a `chat` object within the `summary` 
  which then has a unique `conversationId`.
* [**List Conversations**](/docs/1.0/api-reference/chat-apis/list-conversations) in a chat history corpus 
  and get an an overview of the interactions between chatbots and users. 
* [**Read Conversations**](/docs/1.0/api-reference/chat-apis/read-conversations) and retrieve detailed information about specific
  conversations by their IDs from a chat history corpus.
* [**Delete Conversations**](/docs/1.0/api-reference/chat-apis/delete-conversations) by their specific Conversation IDs for 
  data management and other purposes.
* [**Delete Turns**](/docs/1.0/api-reference/chat-apis/delete-turns) from a conversation starting from a specific 
  Turn ID to manage the content of conversations.
* [**Disable Turns**](/docs/1.0/api-reference/chat-apis/disable-turns) to exclude turns from being used in 
  generating responses.

## Chat Object

The `summary` within a Query contains the `chat` object which then specifies the `conversationId`
and `store` status as `true` or `false`. Chats are set to `false` by default so 
you must set them to `true` or [enable the chat option](/docs/1.0/console-ui/chat-with-your-data) 
in the Vectara Console.

```json
"chat": {
  "store": true,
  "conversationId": "string"
}
```
 
### Conversation

Conversations represent individual chat sessions, and a conversation starts 
with a chat request to the Query endpoint. A unique `conversationId` is 
generated at the initiation of the chat session, which serves as the 
identifier for all subsequent turns within this conversation. 

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
      ]
    }
  ] 
}    
```

### Turns

Each conversation has a series of `turn` objects, which are the sequence of 
message and response pairs that make up the dialog. Each `turn` represents a 
question/answer pair between the user and the chatbot and has a unique `id` 
that specifies its `conversation_id`.


```json
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
  },
  // Additional turn IDs are created for each query and answer pair in the conversation
]
```


