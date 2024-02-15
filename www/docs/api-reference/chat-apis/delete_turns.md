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

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/delete-turns) that lets you experiment with this 
REST endpoint to delete turns in specific chats.

:::

## Delete Turns Request and Response

The Delete Turns request body specifies following parameters:

* `conversationId` - Specifies the conversation ID that contains the turn 
  you want to delete
* `turnId` - Specifies the Turn ID that you want to delete

```json
{
  "conversationId": "0191086a-4b8a-4aec-b600-affa9b261ac",
  "turnId": "4b8a-4aec-b600"
}
```

You get the following response:

```json
{
  "status": {
    "code": 0,
    "message": ""
  }
}
```

## REST Example

### Delete Turns Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to delete turns in a chat:
<code>https://<Config v="domains.rest.indexing"/>/v1/delete-turns</code>


## gRPC Example

You can find the full Delete Turns gRPC definition at [chat.proto](https://github.com/vectara/protos/blob/main/chat.proto).