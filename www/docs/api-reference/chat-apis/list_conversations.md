---
id: list-conversations
title: List Conversations API Definition
sidebar_label: List Conversations API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The List Conversations API lists all the conversations in a customer account. 
This data enables developers to monitor chatbot interactions and understand 
how users engage with the data. Pagination lets developers navigate through 
large datasets.

## Conversation Object Definition

The `conversation` object specifies a unique turn `id`, which is the first turn 
in the conversation. The unique `conversation_id` then specifies the conversation 
within the chat history corpus. 

The `num_results` (default 5) specifies the maximum number of conversations to 
return, and `page_key` retrieves a specific page of results. Leave it blank to 
get the first page.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/list-conversations) that lets you experiment with this 
REST endpoint to list conversations in the customer account.

:::

## REST Example

### List Conversations Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to list conversations in the customer account:
<code>https://<Config v="domains.rest.indexing"/>/v1/list-conversations</code>

The API Playground shows the full [List Conversations](/docs/rest-api/list-conversations) REST definition.

## gRPC Example

You can find the full List Conversations gRPC definition at [chat.proto](https://github.com/vectara/protos/blob/main/chat.proto).