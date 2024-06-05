---
id: get-chat
title: Get Chat API Definition
sidebar_label: Get Chat API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Get Chat API allows you to view what started a chat, but not the 
subsequent turns.

## Get Chat Request and Response

To get a chat, send a GET request to `/v2/chats/{chat_id}`, where `{chat_id}` is 
the unique identifier of the chat you want to retrieve. The `chat_id` is 
a string that was returned when the chat was created.

The response contains the chat `id`, `first_query`, `first_answer`, enabled status, 
and `created_at` timestamp.

## REST 2.0 URL

### Get Chat Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to get a chat:
<code>https://<Config v="domains.rest.indexing"/>/v2/chats/:chat_id</code>

The API Playground shows the full [Get Chat](/docs/rest-api/get-chat) REST definition.
