---
id: disable-turns
title: Disable Turns API Definition
sidebar_label: Disable Turns API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Disable Turns API disables specific turns from a conversation within the 
chat history corpus. This enables developers to exclude specific responses 
from the conversation history.

The `conversationId` specifies the conversation ID that contains the turn 
you want to disable, and the `turnId` specifies the Turn ID that you want to 
disable.

:::tip

Check out our **interactive API Playground** that lets you experiment with this 
REST endpoint to delete turns in specific chats.

:::

## REST Example

### Delete Turns Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to disable turns in a chat:
<code>https://<Config v="domains.rest.indexing"/>/v1/disable-turns</code>

The API Playground shows the full [Disable Turns](/docs/rest-api/disable-turns) REST definition.

## gRPC Example

You can find the full Disable Turns gRPC definition at [chat.proto](https://github.com/vectara/protos/blob/main/chat.proto).