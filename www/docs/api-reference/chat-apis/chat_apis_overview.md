---
id: chat-apis-overview
title: Chat APIs Overview
sidebar_label: Chat APIs Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


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

* [**Create Chat**](/docs/api-reference/chat-apis/create-chat) contains the 
  initial user message, search parameters, and generation settings.
* [**Get Chat**](/docs/api-reference/chat-apis/get-chat) retrieves the chat metadata, 
  such as the initial query and answer.
* [**List Chats**](/docs/api-reference/chat-apis/list-chats) includes a paginated list 
  of chats with their metadata
* [**Delete Chat**](/docs/api-reference/chat-apis/delete-conversations) by their specific Chat IDs for 
  data management and other purposes.
* [**Create Chat Turn**](/docs/api-reference/chat-apis/create-chat-turn) adds a new turn to an existing chat.
* [**List Chat Turns**](/docs/api-reference/chat-apis/list-chat-turns) returns a list of turns within a chat.
* [**Delete Chat Turns**](/docs/api-reference/chat-apis/delete-turns) from a conversation starting from a specific 
  Turn ID to manage the content of conversations.
* [**Update Chat Turn**](/docs/api-reference/chat-apis/update-chat-turn) modifies a specific turn within a chat.

## Chat Object

The `chat` object represents a chat session. A unique `id` is 
generated at the initiation of the chat session, which serves as the 
identifier for all subsequent turns within this conversation. Vectara stores 
conversations in a single chat history corpus in the customer account.

Each `chat` contains the following properties:

<CodePanel snippets={[{language: "json", code: `{
   "id": "cht_.+\$",
   "first_query": "string",
   "first_answer": "string",
   "enabled": true,
   "created_at": "string"
}`
}]} title="Chat Example" layout="stacked" />

## Turn Object

Each conversation has a series of `turn` objects, which are the sequence of 
message and response pairs that make up the dialog. Each `turn` represents a 
question/answer pair between the user and the chatbot and has a unique `id` 
that specifies its `chat_id`.


<CodePanel snippets={[{language: "json", code: `"turn": [
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
]`}]} title="Turn Example" layout="stacked" />
