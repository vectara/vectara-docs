---
id: delete-turns
title: Delete Turns API Definition
sidebar_label: Delete Turns API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

The Delete Turns API deletes specific turns from chat. This enables developers
to remove inaccurate or inappropriate responses from the conversation history.

The `chat_id` specifies the conversation ID that contains the turn
you want to delete, and the `turn_id` specifies the Turn ID that you want to
delete.

## REST 2.0 URL

### Delete Turn Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to delete turns in a chat:
<code>https://<Config v="domains.rest.indexing"/>/v2/chats/:chat_id/turns/:turn_id</code>

The API Reference shows the full [Delete Turns](/docs/rest-api/delete-chat-turn) REST definition.

## gRPC Example

You can find the full Delete Turns gRPC definition at [chat.proto](https://github.com/vectara/protos/blob/main/chat.proto).
