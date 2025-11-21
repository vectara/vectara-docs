---
id: get-started
title: Get started
sidebar_label: Get started
---

This section introduces the fundamentals of retrieval in Vectara, guiding you 
through loading data into a corpus and running your first queries. The 
following process describes how Vectara retrieves search results:

1.  **Retrieval and filtering:** Vectara searches your data containers (corpora) 
   for most relevant document chunks.
    * Vectara uses **semantic search** to understand the _intent_ of your query, 
  optionally blending this behavior with lexical search.
    * **Metadata filters** limit search results to a specific subset
  of your documents.
    * An optional **reranker** further refines the order of search results.
1.  **Generation:** The top-ranked results are sent to a Large Language Model (LLM) 
   along with your query.
    * The model relies on context (surrounding text) from the search results to 
  generate a summary.
    * The answer can also include **citations** that link the generated summary back 
  to the source documents.

## Try the sample corpus

The fastest way to experience Vectara immediately is by querying our pre-built 
sample data.

1. Navigate to the [**Corpora page**](https://console.vectara.com/console/corpora/list).
2. Click the drop-down on the **Create corpus** button, and select 
   **Try a sample corpus**.  
   The sample data populates the corpus and takes you to the [**Query tab**](https://console.vectara.com/console/corpus/key/black-holes-sample-data/query) of the samples corpus.
3. Type a query like `What are black holes?` and press Enter.
4. You can experiment with different retrieval and generation options like 
   hybrid search, retanking, and summarization.

The `score` value is our confidence in the match. The text under each result 
is a snippet from the source document.

## Use your own data

You can also search your own documents. First, you need to create a corpus
and upload files.

1. Read the [**Data ingestion guide**](/docs/build/data-ingestion) to
   create a new corpus and upload your documents (PDFs, TXT, etc.).
2. Once Vectara indexes your files, return to the [**Corpora page**](https://console.vectara.com/console/corpora/list),
   select your new corpus.
3. Enter your query.
4. Inspect the result text, metadata, and scores to understand how your content 
   is interpreted.

## Understanding the Query API

The [**Query APIs**](/docs/rest-api/queries) enable Retrieval Augmented Generation (RAG), 
allowing you to search your data and generate AI-powered summaries. Vectara 
provides three query types to match different search needs:

* [**Single corpus query**](/docs/rest-api/search-corpus): For a simple search within a single data source.
* [**Advanced single corpus query**](/docs/rest-api/query-corpus): For full-featured search and RAG within one 
  corpus, supporting advanced features like table summarization, metadata 
  filtering, and reranking.
* [**Multiple corpora query**](/docs/rest-api/query): For searching across one or more corpora 
  with full RAG capabilities.

:::tip Tip
You can also check out the [**Vectara Python SDK**](/docs/sdk/vectara-python-sdk).
:::

### Context configuration

When you issue a query, you can control how much text is sent to the
generative model for summarization. This is done with the `context`
configuration.

* `sentences_before`: The number of sentences to include before each
  matching sentence in the response.
* `sentences_after`: The number of sentences to include after each
  matching sentence in the response.
* `start_tag` / `end_tag`: HTML-style tags to wrap the retrieved
  context.

:::note 
You can only use **sentences before/after** or **characters before/after**, but not both.
:::

### Metadata filtering

You can attach **metadata** (`doc_year`, `author`, `category`) to your documents 
to **filter** the search results, making your search more precise. For more 
information, see [**Metadata filters**](/docs/build/prepare-data/metadata-filters).

### Custom dimensions

[**Custom dimensions**](/docs/tutorials/add-custom-dimensions) are user-defined numerical values ( `upvotes`, `recency`) 
stored with your data. At query time, you use these values to dynamically 
boost or bury a document's retrieval score, ensuring results are ranked by 
relevance *and* custom factors.
