---
id: delete-conversations
title: Delete Conversations API Definition
sidebar_label: Delete Conversations API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Delete Conversations API lets you delete conversations from the chat 
history corpus. This is useful for data management to help ensure that you 
maintain data hygiene and support compliance with data retention policies.

:::tip

Check out our **interactive API Playground** that lets you experiment with this 
REST endpoint to delete conversations in the chat history corpus.

:::

## Delete Conversations Request and Response

The Delete Conversations request body specifies the `conversation_id` that you 
want to delete.

```json
{
  "corpus_id": 1,
  "conversation_id": [
    "12345"
  ]
}
```
You get the following response:

```json
{
  "status": {
    "code": 0,
    "message": "string"
  }
}
```

## REST Example

### Delete Conversations Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to delete conversations in the chat history corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/delete-conversations</code>

## gRPC Example

You can find the full Delete Conversations gRPC definition at chat.proto.