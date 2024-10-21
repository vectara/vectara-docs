---
id: query-evaluation
title: Query Evaluation
sidebar_label: Query Evaluation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

As developers build generative AI applications, one of the biggest challenges 
is understanding why some queries fail to produce the expected results. 
Diagnosing these issues can be complex, and without clear insights into query 
execution, users are left guessing about the root cause of problems. This 
makes it difficult to debug and improve query performance.

Vectara’s query evaluation provides users with detailed insights into the 
execution of past queries by offering a comprehensive breakdown of each 
query’s configuration, response, and execution flow. This allows users to 
inspect queries at each stage of the query lifecycle which helps diagnose, 
debug, and optimize their searches.

## Query history

The Query History tab presents a table of previous queries executed against a 
selected corpus. Use this table to inspect query details, mark queries for 
special consideration, and annotate them with comments.

screenshots tbd

You can inspect each query to see how the platform interpreted the query 
configuration and input, and how the system acted on this input, along with 
the responses and errors. 


## Query details

The query details page shows details about each query, including the summary, 
search results, and configuration. For example:

screenshotstbd


This example query detail shows the following information:

* The application type is summary
* The hybrid search parameters set lambda to 0.005 and isCustom to true.
* Reranking is enabled and using the MMR reranker with a diversity factor of 0 and 25 maximum reranker results
* The relevance tuning can be expanded to show …
* This query used the Mockingbird prompt template with an English summary language and 5 summarized results
* The user enabled FCS with both 2 sentences before and after.

## Query debugger

The query debugger shows the call stack executed by the platform when 
surfacing the request including the query type, input, output, time spent, and 
errors:

screenshot tbd


