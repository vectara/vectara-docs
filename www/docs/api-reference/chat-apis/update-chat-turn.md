---
id: update-chat-turn
title: Update Chat Turn API Definition
sidebar_label: Update Chat Turn Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

The Update Chat Turn API deletes specific turns from chat. This enables developers
to remove inaccurate or inappropriate responses from the conversation history.

The `chat_id` specifies the conversation ID that contains the turn
you want to delete, and the `turn_id` specifies the Turn ID that you want to
delete.

## REST 2.0 URL

### Update Chat Turn Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to update turns in a chat:
<code>https://<Config v="domains.rest.indexing"/>/v2/chats/:chat_id/turns/:turn_id</code>

The API Reference shows the full [Update Chat Turn](/docs/rest-api/update-chat-turn) REST definition.
