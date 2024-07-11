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
conversations and chat interactions. This information enables developers to 
analyze the flow of user chats and understand the context of interactions, 
which helps in refining chatbot responses. You can read up to 100 
conversations.

The `conversation_id` specifies the ID of the conversation that you want to read, 
and it retrieves the `Conversation` object. This object has an `id` and `turn` 
object which includes the `id` of the turn, `conversationId`, the `query` text, 
`answer`, and whether the turn is `enabled`.

:::tip

Check out our **interactive API Playground** that lets you experiment with this 
REST endpoint to read conversations in the chat history corpus.

:::

## REST Example

### Read Conversations Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to read conversations in the chat history corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/read-conversations</code>

The API Playground shows the full [Read Conversations](/docs/1.0/rest-api/read-conversations) REST definition.

## gRPC Example

You can find the full Read Conversations gRPC definition at [chat.proto](https://github.com/vectara/protos/blob/main/chat.proto).
