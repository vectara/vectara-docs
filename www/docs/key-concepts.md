---
id: key-concepts
title: Key Concepts in GenAI
sidebar_label: Key Concepts in GenAI
---

import {Config} from '@site/docs/definitions.md';

Vectara is a secure, fast, end-to-end GenAI Platform for builders, by 
builders. It provides you with every tool you need to build a generative AI 
application, whether that's chat, Q&A, semantic search, summarization, 
classification, or whatever else you can imagine.


* **It's simple** -- we designed every aspect of working with GenAI to be 
  accessible and understandable. The simple things are easy, and the hard 
  things are possible.
* **It's flexible** -- we built in great defaults, so for most use cases 
  Vectara just works out of the box. If you have unique requirements, 
  Vectara exposes powerful options that you can configure.

## Grounding

If you ask an LLM a question, it responds like a human. However, it can't 
answer questions about your data without access to that data. This is what 
"grounding" does. Vectara provides grounding tools to enable fast, accurate 
[Retrieval-Augmented Generation (RAG)](/docs/learn/grounded-generation/grounded-generation-overview). You can use these tools to build 
applications that can accurately answer your users' questions about your 
business, organization, or domain.

### Documents

The Vectara platform stores your data in the form of documents. You can 
optimize the structure of your documents by defining metadata.

### Vector store

Vectara optimizes your documents for semantic retrieval in a secure vector 
data store called a "corpus." This vector store embodies three concepts:

* **Embedding model:** The embedding model defines the fundamental semantic 
  retrieval algorithm. Vectara trained its own leading-edge embedding model, 
  called Boomerang. No configuration necessary on your part -- it works right 
  out of the box!
* **Relevance boosting:** You can optionally adjust the relevance scoring of 
  specific documents, so they're weighted higher in the set of retrieved 
  results.
* **Security configuration:** By default, Vectara encrypts your data in transit 
  and at rest, and protects your privacy by **never** training models on your data. 
  You can configure additional security options, such as excluding sensitive text 
  from being stored.

### Retrieval

When your application queries Vectara, the platform retrieves the most relevant 
documents.

* **Search:** Optimize for semantic, keyword-based, or hybrid search.
* **Filtering:** Refine the retrieved documents to the subset you're specifically 
  interested in.
* **Reranking: **Tune query results for relevance or diversity.

## Generation

When an LLM responds to a question it creates novel output in a process called 
"generation". You can configure Vectara to produce the desired output in 
response to queries through a number of options:

### Generative model

Choose from a list of supported generative models.

### Language

Specify a desired language or detect and use the user's language.

### Content

Define the structure and richness of the response, including Markdown and 
citations.

## Production accelerators

To streamline the deployment of your applications, Vectara offers these 
production accelerators to simplify complex tasks:

### Data ingestion

Getting data into Vectara is simple using either our REST or gRPC APIs.

If you need help getting started, we built [**Vectara Ingest**](https://github.com/vectara/vectara-ingest). It's a sample 
ingestion framework that includes preconfigured templates for pulling data 
from many popular data sources.

### User interface

Building an effective UI for querying your data is the last step in providing 
value to your users.

We built [**Vectara Answer**](https://github.com/vectara/vectara-answer) as a configurable sample UI that you 
can use as a starting point. See a demonstration by trying our [AskNews](https://asknews.demo.vectara.com/) demo.