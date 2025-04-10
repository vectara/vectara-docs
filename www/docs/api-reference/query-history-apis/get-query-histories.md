---
id: get-query-histories
title: List Query Histories API Definition
sidebar_title: List Query Histories API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

The List Query Histories API allows you to retrieve, update, and manage query 
history for a specific corpus. This API is particularly useful for tracking 
query performance, debugging individual queries, and retrieving detailed 
information such as the call stack of a query execution.

## List Query Histories Request and Response

To get a history of a specific query, send a GET request to 
`/v2/queries`. You can specify the `corpus_key`, `chat_id`, and the 
`limit` which is the maximum number of historical queries to list. The 
response includes an array of previous query histories.

## REST 2.0 URL

### List Query Histories Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to list the history of previous queries:
<code>https://<Config v="domains.rest.indexing"/>/v2/queries/:query_id</code>

The API Reference shows the full [List Query Histories](/docs/rest-api/get-query-histories) REST definition.