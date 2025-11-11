---
id: semantic-search-overview
title: Semantic Search Fundamentals
sidebar_label: Semantic Search Fundamentals
---


import CodePanel from '@site/src/theme/CodePanel';


Vectara lets you build a semantic, LLM-powered search application. Semantic 
search is not just about finding data, but about understanding data and 
helping you answer questions about your data. This topic outlines what <Config v="names.product"/>
can do for this use case as well as why and how to employ these features for 
the best overall end-user experience. By integrating advanced features such 
as metadata filtering, reranking, and Retrieval Augmented Generation, Vectara 
not only simplifies the search process but also enriches the quality of 
information retrieved.

## Large Language Models (LLMs)

[LLMs](https://en.wikipedia.org/wiki/Large_language_model) are deep neural nets
that are built with the task of specifically understanding human language. These
models can be a great asset to many different use cases, including search and
language generation.

These models generally work by reading immense amounts of text to build the 
model and then using that model to convert text into vectors, both at index 
and at query time. For many use cases, this obviates the need for many 
language rules of traditional keyword systems like synonym management, 
stemming, and phrase parsing because the LLM can inherently understand 
what the user is asking.

The team behind <Config v="names.product"/> has built LLMs that work across a
wide variety of languages and verticals. When you index data into <Config v="names.product"/>
or perform a search, also known as retrieval, the text is converted to one or 
more vectors via a LLM and then used to answer questions that your users have.

## Zero-shot models

[Zero-shot](https://en.wikipedia.org/wiki/Zero-shot_learning) models have an excellent 
understanding of language in general. They can understand
and respond to the semantic meaning of questions without any additional tuning.
This obviates much of the need for fine-tuning and specialized training on a
particular dataset or in a particular vertical.

The <Config v="names.product"/> platform makes extensive use of zero-shot models
that have been developed by the team to allow your end users to query using
the language and verbiage of their choosing and find the right documents,
regardless of the domain your documents are in.

## Hybrid search

While zero-shot LLMs work very well in the vast majority of search use cases,
there are some occasions where they struggle. In particular, many zero-shot LLMs
don't work as well when users perform queries for things which have little
semantic meaning. 

For example, a UPC code, barcode number, or particular named
configuration setting has little to no semantic meaning, and if you expect your
users to perform this type of search, it's best to look into our
[hybrid search](/docs/learn/hybrid-search) documentation to learn about how 
to blend neural search and keyword search. The ability to toggle between 
neural and keyword search methodologies enhances the effectiveness of search 
results in these use cases.

## Advanced query configurations

Application builders can define specific [query](/docs/rest-api/queries) parameters 
for their searches, including context, pagination, metadata filters, and 
semantics. This flexibility empowers users to tailog queries to specific use 
cases, ensuring that the search results are as relevant and precise as possible.

### Query request and response
  
Developers can specify the `query` text and manage pagination through the `offset` 
and `limit` parameters. This structured approach helps in managing the 
flow of search results effectively.

### Metadata filtering

Vectara supports enhanced [metadata filtering](/docs/build/prepare-data/metadata-filters), which allows users to restrict  
searches to specific parts of the corpus based on defined criteria, using 
common SQL syntax.

### Reranking
  
Vectara enhances the relevance of search results through its [reranking configurations](/docs/search-and-retrieval/reranking). 
The `reranker` object has different types that can be used to adjust the 
relevance of search results based on specific needs, such as diversity or 
precision.

Consider a scenario where a user queries about the latest advancements in 
medical research. You can configure advanced query settings to pull relevant 
documents from specified corpora, apply metadata filters to focus on recent 
publications, and then use RAG to generate a concise, informative summary that 
directly answers the user’s query.
