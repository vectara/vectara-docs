---
id: chat-apis-overview
title: Chat APIs Overview
sidebar_label: Chat APIs Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

**This topic is in-progress**

Vectara's Chat APIs provide a streamlined solution for integrating chatbot 
functionalities into domain-specific applications and websites using Retrieval 
Augmented Generation (RAG). Designed with efficiency in mind, these Chat APIs 
enable developers to create interactive user experiences and manage data 
conversations for users. Each chat session is assigned a unique `chat_id`, 
allowing developers to track and manage conversations over time.

These Chat APIs enable operations and pagination through the history of a chat, 
specifically the conversations and their subsequent exchanges, also known as 
turns. Administrators can gain valuable insights into user behavior by analyzing 
trends among users, which creates opportunities to identify knowledge gaps for 
information about products, technical documentation, and FAQs.

Vectara Chat provides the following Chat APIs:

* [**Create Chat**](/docs/api-reference/search-apis/search) contains a `chat` object within the `summary` 
  which then has a unique `conversationId`.
* [**List Conversations**](/docs/api-reference/chat-apis/list-conversations) and get an an overview 
  of the interactions between chatbots and users. 
* [**Read Conversations**](/docs/api-reference/chat-apis/read-conversations) and retrieve detailed information about specific
  conversations by their IDs from a chat history corpus.
* [**Delete Conversations**](/docs/api-reference/chat-apis/delete-conversations) by their specific Conversation IDs for 
  data management and other purposes.
* [**Delete Turns**](/docs/api-reference/chat-apis/delete-turns) from a conversation starting from a specific 
  Turn ID to manage the content of conversations.
* [**Disable Turns**](/docs/api-reference/chat-apis/disable-turns) to exclude turns from being used in 
  generating responses.

## Chat Object

The `chat` object represents a chat session. A unique `id` is 
generated at the initiation of the chat session, which serves as the 
identifier for all subsequent turns within this conversation. Vectara stores 
conversations in a single chat history corpus in the customer account.

Each `chat` contains the following properties:

```json
{
  "id": "cht_.+$",
  "first_query": "string",
  "first_answer": "string",
  "enabled": true,
  "created_at": "string"
}
```

## Turn Object

Each conversation has a series of `turn` objects, which are the sequence of 
message and response pairs that make up the dialog. Each `turn` represents a 
question/answer pair between the user and the chatbot and has a unique `id` 
that specifies its `chat_id`.


```json
"turn": [
  {
    "id": "ID of the turn",
    "chat_id": "ID of the conversation",
    "query": "First query of the turn",
    "answer": "First answer of the turn",
    "enabled": true,
    "created_at": "string"
  },
  {
    "id": "ID of the second turn",
    "chat_id": "ID of the conversation",
    "query": "Second query of the turn",
    "answer": "Second answer of the turn",
    "enabled": true,
    "created_at": "string"
  },
  // Additional turn IDs are created for each query and answer pair in the conversation
]
```
 
### Conversation

Conversations represent individual chat sessions, and a conversation starts 
with a chat request to the Query endpoint. A unique `conversationId` is 
generated at the initiation of the chat session, which serves as the 
identifier for all subsequent turns within this conversation. Vectara stores 
conversations in a single chat history corpus in the customer account.

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


