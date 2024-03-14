---
id: delete-turns
title: Delete Turns API Definition
sidebar_label: Delete Turns API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Delete Turns API deletes specific turns from a conversation within the 
chat history corpus. This enables developers to remove inaccurate or 
inappropriate responses from the conversation history. 

The `conversationId` specifies the conversation ID that contains the turn 
you want to delete, and the `turnId` specifies the Turn ID that you want to 
delete.

:::tip

Check out our **interactive API Playground** that lets you experiment with this 
REST endpoint to delete turns in specific chats.

:::

## REST Example

### Delete Turns Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to delete turns in a chat:
<code>https://<Config v="domains.rest.indexing"/>/v1/delete-turns</code>

The API Playground shows the full [Delete Turns](/docs/rest-api/delete-turns) REST definition.

## gRPC Example

You can find the full Delete Turns gRPC definition at [chat.proto](https://github.com/vectara/protos/blob/main/chat.proto).