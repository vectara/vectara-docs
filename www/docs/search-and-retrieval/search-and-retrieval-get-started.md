---
id: get-started
title: Get started
sidebar_label: Get started
---

Use this guide to understand the basics of retrieval in Vectara, load data 
into a corpus, run your first queries, and explore how the Query API works.

* [Try the sample corpus](#try-the-sample-corpus)
* [Use your own data](#use-your-own-data)
* [Understanding the query API](#understanding-the-query-api)

## Try the sample corpus

The fastest way to see Vectara in action is with our pre-built sample
data.

1. Navigate to the [Corpora page](https://console.vectara.com/console/corpora/list).
2. Click the drop-down on the **Create corpus** button, and select 
   **Try a sample corpus**.  
   The sample data populates the corpus and takes you to the [Query tab](https://console.vectara.com/console/corpus/key/black-holes-sample-data/query) of the samples corpus.
3. In the query box, type a query like `What are black holes?` and press Enter.

The `score` value is our confidence in the match. The text under each result 
is a snippet from the source document.

## Use your own data

You can also search your own content. First, you need to create a corpus
and upload files.

1. Read about [Data ingestion](/docs/build/data-ingestion) to
   create a new corpus and upload your documents (PDFs, TXT, etc.).
2. Once your files are indexed, return to the [Corpora page](https://console.vectara.com/console/corpora/list), select
   your new corpus, and start searching.

## Understanding the Query API

The Query API provides many options for refining retrieval, because accurate retrieval 
is essential to accurate agent responses.

### Core Concepts

* **Retrieval:** This is the initial phase of finding relevant documents
  in your corpus. Vectara uses powerful neural (semantic) matching to
  understand the intent behind a query, but you can also opt for
  traditional lexical (keyword) matching.
* **Custom Dimensions:** This is metadata you can attach to your
  documents (e.g., `doc_year`, `author`, `category`). You can then use
  this metadata to filter search results, making your search more
  precise.

### Context Configuration

When you issue a query, you can control how much text is sent to the
generative model for summarization. This is done via the `context`
configuration.

* `sentences_before`: The number of sentences to include before each
  matching sentence in the response.
* `sentences_after`: The number of sentences to include after each
  matching sentence in the response.
* `start_tag` / `end_tag`: HTML-style tags to wrap the retrieved
  context.

This ensures the LLM has sufficient surrounding information to generate
a coherent and accurate answer.

### Next Steps

Ready to integrate search into your application?

* See the [Query REST API reference](/docs/rest-api/query) for a basic
  query example and a full list of parameters.
* Explore our [SDKs](/docs/sdks/overview) to get started quickly in
  Python, Java, JavaScript, and more.
