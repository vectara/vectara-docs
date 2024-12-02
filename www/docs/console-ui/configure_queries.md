---
id: configure-queries
title: Configure Queries
sidebar_label: Configure Queries
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

When you add data to a corpus, the Query tab lets you experiment with 
different semantic search, summarization, and chat options. Whether you want 
to retrieve relevant information, generate summaries grounded in facts with 
Retrieval-Augmented Generation (RAG), or engage in conversational 
interactions, explore these options and configurations to find the optimal 
settings for your applications.

## Search Your Data

The Query tab provides the following application types for search and 
retrieval:

1. **Semantic search**: Perform semantic searches based 
   on natural language queries. Vectara's advanced algorithms understand the meaning 
   and context of your queries, enabling accurate and relevant search results.
2. **Summary**: Extending the Semantic Search functionality, this 
   option uses Retrieval-Augmented Generation (RAG) to provide concise summaries in 
   response to your queries. This can be particularly useful when you need an 
   overview of the relevant information within your data.
3. **Chat**: Engage in conversational interactions 
   with your data. This can be particularly useful when you need to ask 
   follow-up questions, clarify information, or explore your data in a more 
   interactive manner.
   :::tip
   Chat leverages the same underlying search and summarization capabilities as 
   the other options, but presents the results in a conversational format, making 
   it easier to maintain context and engage in multi-turn interactions.
   :::

## Customize the Query Experience

These search options provide different configuration settings to tailor the 
query experience to your specific needs:

### Save query to history

When experimenting with configurations and running queries against a corpus, 
Vectara lets you log your queries into a query history. This is important for 
troubleshooting issues, inspecting past queries, and optimizing configurations. 
By surfacing data like query latency, search results, reranking, and 
generative response times, users can better understand how our system performs 
relative to their business goals.

### View the history of query

1. Experiment with different query configurations by asking questions of 
   your data with **Send query**.
2. Select **View query history** to review a table of past queries executed 
   against your corpus. 
3. Select a query from the table to view its detailed configuration, execution 
   flow, and results.

![Query histories](/img/query-histories.png)

### Configure retrieval

The Retrieval configuration lets you enable hybrid search by adjusting the 
`lexical_interpolation` value, also known as lambda, which is a balance 
between neural search and keyword search. 

![Configure hybrid search](/img/configure_hybrid_search.png)

The reranking option lets you rerank orders of search results also use the 
Maximum Marginal Relevance (MMR) Reranker with a diversity factor to 
reduce bias.

![Configure reranking](/img/configure_reranking.png)

The result context option lets you configure the number of sentences or 
characters before and after the matched text. If you use the number of 
characters, Vectara captures the entire sentence that contains the captured 
characters.

![Configure result context](/img/configure_result_context.png)

### Configure generation

The Generation section shows the LLM and prompt template used and lets you
configure the Language and Summarization options for the query:

![Configure generation options](/img/configure_generation.png)

### Configure evaluation

The Factual Consistency Score automatically evaluates and detects 
hallucinations in generated output. This calibrated score can range from `0.0` 
to `1.0`. A higher score indicates a greater probability of being factually 
accurate, while a lower score indicates a greater probability of 
hallucinations.

![Configure evaluation](/img/configure_evaluation.png)


### Configure search filters

Select the Filters tab to enter a filter expression or select filter attributes 
to further refine your search results. We provide some syntax examples in the 
drawer.

![Configure filters](/img/configure_filters.png)

