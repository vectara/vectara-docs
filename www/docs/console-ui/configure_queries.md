---
id: configure-queries
title: Configure Queries
sidebar_label: Configure Queries
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

When you add data to a corpus, the **Query** tab lets you experiment with 
different semantic search, summarization, and chat options. Whether you want 
to retrieve relevant information, generate summaries grounded in facts with 
Retrieval-Augmented Generation (RAG), or engage in conversational 
interactions, explore these options and configurations to find the optimal 
settings for your applications.

## Search your Data

The **Query** tab enables you to perform searches against your data while testing 
different query configuration settings for retrieval and generation.

![Query tab](/img/query_tab.png)

The **Pretty Request** and **Request Code** tabs allow you to view and copy the 
request code used for executing queries. This enables easy integration of 
query configurations into applications.

A magnifying glass icon allows you to locate specific controls. Use this icon 
to search and instantly locate a retrieval or generation setting. This is 
useful for navigating complex query configurations quickly.

## Configure retrieval

The Retrieval section provides different configuration settings to tailor the 
query experience to your specific needs. For example, configuring filters, 
reranking results, and refining output context.


### Enter your query

Enter a natural language search query in the **Query** field. You can either 
use the default retrieval and generation settings or experiment with different 
configurations.

### Configure search filters

By default, no filter is applied to your query. Select **Filter** to 
* Enter a custom filter expression 
* Select predefined filter attributes to refine your search results.
* View **Available filter attributes** and **Syntax examples**. 

![Configure filters](/img/configure_filters.png)

### Configure hybrid search

Hybrid search improves retrieval accuracy by balancing neural search with 
keyword-based search using the **Lambda** option.

* **Enable hybrid search** to activate hybrid retrieval.
* Adjust the **Lambda** range from `0` (pure neural search) to `1` (pure 
  keyword-based search).
* The recommended range is `0.005` to `0.0075`.
* By default, Lambda is set to `0.5`.

![Configure hybrid search](/img/configure_hybrid_search.png)

**Reranking** lets you rerank orders of search results also use our 
available rerankers:

* **Multilingual Ranker** – Optimized for multiple languages.
* **User-Defined Function (UDF) Reranker** – Customizable ranking function.
* **Maximum Marginal Relevance (MMR) Reranker** – Reduces bias by applying a 
  diversity factor.

See [Reranking](/docs/api-reference/search-apis/reranking) more advanced details about our reranking capabilities.

![Configure reranking](/img/configure_reranking.png)

### Configure relevance tuning

Fine-tune search relevance by adjusting custom dimension weights.

**Enable relevance tuning** to control how search results rank based on 
predefined relevance factors.

See [Custom Dimensions](/docs/learn/semantic-search/add-custom-dimensions) for more details.

### Configure result context

Control how much contextual information appears before and after matched 
search results:

* **Sentences Before:** Default: 2
* **Sentences After:** Default: 2
* **Characters Before:** Default: 0
* **Characters After:** Default: 0

If you use character-based limits, Vectara ensures that full sentences display 
to preserve meaning.

![Configure result context](/img/configure_result_context.png)

## Configure generation

The Generation section shows the following options:

### Configure model

Select a generation preset, LLM, and prompt template to use for the query:

![Configure generation options](/img/configuration_generation.png)  

You can also copy the prompt template from the generation preset.

### Configure summarization

Summarization uses Retrieval-Augmented Generation (RAG) to provide concise 
summaries in response to your queries. This can be particularly useful when 
you need an overview of the relevant information within your data.

![Configure summarization](/img/configure_summarization.png) 

### Configure evaluation

The Factual Consistency Score automatically evaluates and detects 
hallucinations in generated output. 

* **Score range:** `0.0` - `1.0`
* **Higher score:** More factually accurate responses
* **Lower score:** Greater probability of hallucinations
* **Enable calculation of Factual Consistency Score:** to monitor and improve 
  response reliability.

![Configure evaluation](/img/configure_evaluation.png)

### Configure chat

Chat enables you to engage in conversational interactions with your data. This 
can be particularly useful when you need to ask follow-up questions, clarify 
information, or explore your data in a more interactive manner.

Select **Enable Chat** to retain the conversational context across your queries.

### Save query to history

Set this toggle on to generate a query history from your query. Vectara enables you to generate query histories from your queries. These are 
analyses of your queries that give you visibility into how Vectara executed 
your query through specific steps such as retrieval, reranking, and 
generation. This is important for troubleshooting issues, inspecting past 
queries, and optimizing configurations.

### View the history of the query

1. Ask questions of your data with **Send query**.
2. Select the **Analysis** or **Usage** tab to see a list of query histories.  
   ![Query history tab](/img/query_history_tab.png)
3. Click Reload to refresh the list. 
4. Select an ID to reveal the query history for a specific query 
   the most recently executed query. 
   ![Query tab](/img/query_analysis.png)
5. View the complete breakdown of how the query was executed.
6. Use this information to optimize your configuration and submit a new query.



## Query results

After executing a query, the results appear in the output panel, which 
includes the following tabs:

* **Pretty Response:** Formatted view of the query response.
* **Response JSON:** Raw JSON representation of the query output.
* **Analysis:** Displays the query history analysis including the rephrased 
  query (if IQR enabled), compiled prompt and query history.
* **Errors:** Displays encountered errors (if any).

