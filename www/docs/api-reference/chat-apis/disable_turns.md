---
id: disable-turns
title: Disable Turns API Definition
sidebar_label: Disable Turns API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Disable Turns API disables specific turns from a conversation within the
chat history corpus. This enables developers to exclude specific responses
from the conversation history.

The `conversationId` specifies the conversation ID that contains the turn
you want to disable, and the `turnId` specifies the Turn ID that you want to
disable.

## REST 2.0 URL

### Delete Turns Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to disable turns in a chat:
<code>https://<Config v="domains.rest.indexing"/>/v2/chats/:chat_id/turns/:turn_id</code>

The API Reference shows the full [Disable Turns](/docs/rest-api/update-chat-turn) REST definition.

## gRPC Example

You can find the full Disable Turns gRPC definition at [chat.proto](https://github.com/vectara/protos/blob/main/chat.proto).
