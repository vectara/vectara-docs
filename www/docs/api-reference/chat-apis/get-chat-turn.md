---
id: get-chat-turn
title: Get Chat Turn API Definition
sidebar_label: Get Chat Turn API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Get Chat Turn API allows you to retrieve a specific turn from a chat,
which represents a message and response pair in the conversation.

## Get Chat Turn Request and Response

To get a chat turn, send a GET request to `/v2/chats/{chat_id}/turns/{turn_id}`,
where `{chat_id}` is the unique identifier of the chat and `{turn_id}` is the
unique identifier of the turn within that chat. Note that both `chat_id` and
`turn_id` values were returned when the chat and turn were created.

The response contains an array of `turn` id, chat_id, query, answer, enabled
status, and created_at timestamp.

## REST 2.0 URL

### Get Chat Turn Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to get a chat turn:
<code>https://<Config v="domains.rest.indexing"/>/v2/chats/:chat_id/turns</code>

The API Reference shows the full [Get Chat Turn](/docs/rest-api/list-chat-turns) REST definition.
