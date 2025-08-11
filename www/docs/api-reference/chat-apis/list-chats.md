---
id: list-chats
title: List Chats API Definition
sidebar_label: List Chats API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The List Chats API allows you to retrieve a list of previous chats in your
account. This endpoint returns a paginated list of `chat` objects, which
contain basic information about each chat.

## List Chats Request and Response

To list chats, send a GET request to `/v2/chats`. You can specify optional
query parameters to control the pagination of the results.

- `limit` - Specifies the maximum number of chats to return in a single
  request, with a default value of `10` and a maximum value of `100`.
- `page_key` - Retrieves the next page of results when the previous request
  has reached the limit.

The response contains an array of `chat` objects with matching chats and
metadata about the pagination.

## REST 2.0 URL

### List Chats Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to list chats:
<code>https://<Config v="domains.rest.indexing"/>/v2/chats</code>

The API Reference shows the full [List Chats](/docs/rest-api/list-chats) REST definition.
