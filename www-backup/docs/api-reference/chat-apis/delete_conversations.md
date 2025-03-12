---
id: delete-conversations
title: Delete Chat API Definition
sidebar_label: Delete Chat API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Delete Chat API lets you permanently delete a chat and all its associated
turns. This is useful for data management to help ensure that you
maintain data hygiene and support compliance with data retention policies.

## Delete Chat Request and Response

To delete a chat, send a DELETE request to `/v2/chats/{chat_id}`, where
`{chat_id}` is the unique identifier of the chat you want to delete.

The response returns a `204` status code which indicates that the chat was
successfully deleted.

## REST 2.0 URL

### Delete Chat Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to delete a chat:
<code>https://<Config v="domains.rest.indexing"/>/v2/chats/:chat_id</code>

The API Reference shows the full [Delete Chat](/docs/rest-api/delete-chat) REST definition.

## gRPC Example

You can find the full Delete Chat gRPC definition at [chat.proto](https://github.com/vectara/protos/blob/main/chat.proto).
