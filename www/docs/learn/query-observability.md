---
id: query-observability
title: Query Observability
sidebar_label: Query Observability
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


As developers build generative AI applications, one of the biggest challenges 
is understanding why some queries fail to produce the expected results. 
Diagnosing these issues can be complex, and without clear insights into query 
execution, users are left guessing about the root cause of problems. This 
makes it difficult to debug and improve query performance.

Vectara’s query observability provides users with detailed insights into the 
execution of past queries by offering a comprehensive breakdown of each 
query’s configuration, response, and execution flow. This enables users to 
inspect queries at each stage of the query lifecycle which helps diagnose, 
debug, and optimize their searches.

:::tip
For more details about query configurations, see [**Configure Queries**](/docs/console-ui/configure-queries).
:::

## Query histories

A query history explains the actions taken by our platform in service of the 
query. You view query histories from the **Analysis** tab after sending a query, or 
the **Usage** tab of a specific corpus. 
The Query histories tab presents a table of previous queries executed against 
a selected corpus. 

Use this table to inspect query details, mark queries for special 
consideration, and annotate them with comments. The table lists each query ID, 
the time of the query, the mode (such as Summary), the query text, query 
response, latency, and any errors. 

![Query histories](/img/query-histories.png)

You can inspect each query by selecting an ID to see how the platform 
interpreted the query configuration and input, and how the system acted on 
this input, along with the responses and errors. 

## Query details

The query details page provides detailed visibility into how our platform 
processed the query, offering valuable insights for both troubleshooting and 
optimization. These details include the query text, search results, generated 
response, and factual consistency score. 

For example:

![Query analysis](/img/query_analysis.png)

This example query detail shows the following configuration for the query:

* The hybrid search parameters set the lambda value to  `0.0005`.
* Reranking is enabled and using `Rerank_Multilingual_v1`.
* The query does not use any custom dimensions.
* The result context is 2 sentences before and after.
* The number of search results for summarization is 5.

Click **Expand all** to reveal detailed information for each execution stage, 
including specific parameters.
