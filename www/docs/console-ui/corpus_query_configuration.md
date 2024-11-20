---
id: corpus-query-configuration
title: Corpus Query Configuration Options
sidebar_label: Corpus Query Configuration Options
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Query tab lets you experiment with different search, summarization, and 
chat options. Whether you want to retrieve relevant information, generate 
summaries grounded in facts with Retrieval-Augmented Generation (RAG), or 
engage in conversational interactions, the Query tab offers a range of 
options. Explore these options and configurations to find the approach that 
best suits your needs.

## Search Your Data

One of the primary uses for the Query tab is to search and retrieve relevant 
information from your corpus and you have two options.

1. **Semantic Search**: This option allows you to perform semantic searches based 
   on natural language queries. Vectara's advanced algorithms understand the meaning 
   and context of your queries, enabling accurate and relevant search results.
2. **Summarized Semantic Search**: Extending the Semantic Search functionality, this 
   option uses Retrieval-Augmented Generation (RAG) to provide concise summaries in 
   response to your queries. This can be particularly useful when you need an 
   overview of the relevant information within your data.

Both search options provide various configuration settings to fine-tune the search experience

## Engage in Conversations with Your Data

The Chat option allows you to engage in conversational interactions with your 
data. This can be particularly useful when you need to ask follow-up 
questions, clarify information, or explore your data in a more interactive 
manner.

Chat leverages the same underlying search and summarization capabilities as 
the other options, but presents the results in a conversational format, making 
it easier to maintain context and engage in multi-turn interactions.

## Customize the Retrieval Experience

Vectara provides various configuration settings to tailor the experience to 
your specific needs:

### Configure retrieval

The Retrieval configuration lets you enable hybrid search by adjusting the 
`lexical_interpolation` value, which is a balance between neural search and keyword search. 

![Configure hybrid search](/img/configure_hybrid_search.png)

The reranking option lets you rerank orders of search results also use the 
Maximum Marginal Relevance (MMR) Reranker with a diversity factor to 
reduce bias.

![Configure reranking](/img/configure_reranking.png)


### Configure context

The Result context lets you configure the number of sentences or characters 
before and after the matched text. If you use the number of characters,  
Vectara captures the entire sentence that contains the captured characters.

![Configure reesult context](/img/configure_result_context.png)

### Configure generation

The Generation section shows the Model and Prompt for your account and lets 
configure the Language and Summarization options:

![Configure generation options](/img/configure_generation.png)

### Configure evaluation

The Factual Consistency Score automatically evaluates and detects 
hallucinations in generated output. This calibrated score can range from `0.0` to `1.0`. 
A higher score indicates a greater probability of being factually accurate, 
while a lower score indicates a greater probability of hallucinations.

![Configure evaluation](/img/configure_evaluation.png)


### Configure search filters

Select the Filters tab to enter a filter expression or select filter attributes 
to further refine your search results. We provide some syntax examples in the 
drawer.

![Configure filters](/img/configure_filters.png)


### Show API Request and Response

While you experiment with these different search options and configurations, 
you can click **Show API request** next to the **Send query** icon to see the 
underlying API request and response:

![Show API request and response](/img/show_api_request.png)