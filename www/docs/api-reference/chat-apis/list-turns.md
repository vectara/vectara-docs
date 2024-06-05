---
id: list-chat-turns
title: List Chat Turns API Definition
sidebar_label: List Chat Turns API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The List Chat Turns API allows you to retrieve a list of all turns in a chat, 
representing the complete dialog of message and response pairs

## List Chat Turns Request and Response

To list chat turns, send a GET request to `/v2/chats/{chat_id}/turns`, where 
`{chat_id}` is the unique identifier of the chat.

The response contains an array of `turn` objects representing the turns in the 
chat, ordered chronologically.

## REST 2.0 URL

### List Chat Turns Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to list chat turns:
<code>https://<Config v="domains.rest.indexing"/>/v2/chats/:chat_id/turns</code>

The API Playground shows the full [List Chat Turns](/docs/rest-api/list-chat-turns) REST definition.

