---
id: corpus-query-configuration
title: Corpus Query Configuration
sidebar_label: Corpus Query Configuration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Query tab of a corpus lets you ask questions about your data through 
searches or chats. Opening a corpus from Data lets you access this tab, and 
then you select the app type that you want from the drop-down 
as Semantic Search, Summarized Semantic Search, or Chat.

Each of these app types has configuration options for Retrieval, Generation, 
Filters, or Evaluation:

![Select an app type](/img/choose_app_type.png)

## Semantic Search Option

### Search your data

The semantic search finds the most relevant responses to a query. You can 
configure retrieval options, search filters, and show the API request.

![Semantic search layout](/img/query_semantic_search_option.png)


### Configure retrieval

The retrieval configuration lets you enable hybrid search by adjusting the 
`lambda` value, which is a balance between neural search and keyword search. The 
reranking option lets you rerank orders of search results and Scale users can 
use the Maximum Marginal Relevance (MMR) Reranker with a diversity factor to 
reduce bias.

![Configure retrieval drawer](/img/configure_retrieval.png)

### Specify search filters

Select Filters and enter a filter expression or select filter attributes to 
further refine your search results. We provide some syntax examples in the 
drawer.

![Configure search filters](/img/configure_filters_drawer.png)


### Configure evaluation

The Vectara Factual Consistency Score automatically evaluates and detects 
hallucinations in generated output. This score can range from `0.0` to `1.0`. 
Higher scores indicate a greater probability of being factually accurate, 
while lower scores indicate a greater probability of hallucinations.

![Configure evaluation](/img/configure_evaluation.png)

### Show API Request and Response

When you complete a search and also use the different configuration options, click 
**Show API request** to see the underlying API request and response.

## Summarized Semantic Search Option

### Ask a question of your data

The summarized semantic search uses retrieval-augmented generation (RAG) to 
summarize information in response to a semantic search query. You get the same 
Retrieval and Filter configuration drawers as with the semantic search option, 
but now you can also configure the generation. Growth users have access to the 
GPT 3.5 summarizer, a language drop-down, and an option to specify the number 
of search results to summarize:

![Configure generation](/img/configure_generation.png)

Scale users have additional generation options:

[need Scale screenshot]

## Chat Option

### Chat with your data

The chat does not introduce any new configuration options, but you have the 
same Retrieval, Generation, and Filter drawers. As you have conversations with 
your data, you can also see the API requests and responses.

![Configure chat options](/img/query_chat_option.png)



