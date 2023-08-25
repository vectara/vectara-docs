---
id: key-concepts
title: Key Concepts in Gen AI
sidebar_label: Key Concepts
---

import {Config} from './definitions.md';

Generative AI is a rapidly evolving field that leverages advanced technologies 
to create content and insights. At the core lies the AI Architecture, a 
complex structure that defines the various components of an AI system. The 
AI Architecture is not standalone because it is intricately connected with 
several core concepts and techniques to perform tasks efficiently.

This section describes the most common terminology associated with 
Generative AI and how they connect:

![Key Concepts in Gen AI Diagram](/img/key_concepts.png)

## AI Architecture

AI Architecture refers to the underlying structure of artificial intelligence 
systems. This architecture contains various components that enable AI to 
function effectively:

[placeholder for just the architecture section]

### Large Language Models (LLMs)

Large Language Models (LLMs) provide language prediction models that use machine learning to generate human-like text. Vectara leverages LLMs to understand and respond to queries with precision. 

### Vector Databases

Vectors represent objects in a multi-dimensional space, enabling efficient similarity search.

### Neural Search

Neural search leverages neural networks and machine learning to improve search experiences by creating more contextual and relevant results.

### Semantic Search

Semantic search aims to understand the intent and contextual meaning of a search to generate more accurate results. This approach is different from traditional, keyword-based search.

[Learn about Semantic Search](/docs/common-use-cases/semantic-search/semantic-search-overview)

### Hybrid Search

Hybrid search combines semantic and keyword search as a balanced approach to information retrieval.

### Cross-Language Search

Vectara works across multiple languages in a way that is authentically agnostic. The platform lets users search in one language and get results that were originally written in another language. The best answer may be written in German but a user asked the question in Spanish.

## Core Concepts

These core concepts describe foundational ideas in the broader field of 
GenAI:

[placeholder for just the key concepts section]

### Zero-Shot Models

Zero-shot models have the ability to perform tasks that they were not trained for, so they can understand and encode data at scale.

### Instant Indexing

Instant indexing in Vectara enables the immediate availability of new search data. This capability ensures that users always access the most recent and relevant information.

### Data Preparation and Ingestion

Data preparation involves cleaning the raw data into a format ideal for consuming the information. Data ingestion imports the data in the system for processing by Vectara. 


### Metadata Filtering

Metadata filtering allows users to refine search results based on specific attributes and improves the precision of search results.


### Neural Re-ranking

The Vectara re-ranking capability uses natural language processing and cross-attentional neural ranking to retrieve the best possible answers to user queries.


### Recommendation System

Recommendation systems provide users with suggestions based on preferences and behavior.


### FAQ and Q&A Matching

Matching FAQs and Q&As involves matching user queries with the most relevant answers.


### Exact and Boolean Text Matching

Exact and Boolean text matching involve traditional search methods that use Boolean logic (AND, OR, NOT).

## Techniques

Generative AI employs the following specialized methods to optimize performance and accuracy:

[placeholder for just the techniques section]


### Grounded Generation

Grounded generation means answers to user queries come from actual facts. Vectara can eliminate hallucinations by grounding the data in truth. It relies on facts and data that you provide.

[Learn about Grounded Generation](/docs/grounded-generation)

### Summarization 

The Vectara summarization technology provides concise summarizes of complex queries.

### Hallucinations

Hallucinations occur when AI generates incorrect information that was not present in the input or training data. Simply put, chatbots tend to make things up. Hallucinations appear as made-up facts, events, or details that are simply not true. They occur when the AI model tries to fill in gaps by attempting to create a coherent narrative. Thanks to Vectara's Grounded Generation, the risk of hallucinations is reduced dramatically.