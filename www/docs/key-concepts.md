---
id: key-concepts
title: Key Concepts in Gen AI
sidebar_label: Key Concepts in Gen AI
---

import {Config} from './definitions.md';

This section describes common terminology associated with Generative (Gen AI)
AI and how these concepts connect or complement each other on the <Config v="names.product"/>
platform.

## Generative AI Architecture

Generative AI architecture refers to the underlying structure that contains the 
important components that enable this technology to function effectively:

![AI Architecture](/img/ai_architecture.png)

### Large Language Models (LLMs)

Large Language Models (LLMs) represent deep learning algorithms that mimic the 
way humans interpreet, translate, and create content. <Config v="names.product"/> leverages LLMs 
to provide helpful answers to questions.

### Vector Databases

Vectors represent objects in a multi-dimensional space, enabling efficient 
similarity search. <Config v="names.product"/> uses vector databases to retrieve the 
data it needs to accurately answer questions.

### Semantic Search

Whereas traditional, keyword-based search is limited to results 
that literally match the words in a query, semantic search identifies 
the intent and contextual meaning of a query. Vector databases 
enable semantic search.

[Learn about Semantic Search](/docs/common-use-cases/semantic-search/semantic-search-overview)

### Neural Search

Neural search utilizes neural networks, often deep learning models, 
to understand the context of a query. It goes beyond the rule-based 
approach of semantic search as an advanced form of Natural Language 
Processing (NLP). Neural search is general more resource-intensive than 
semantic search. However, you can combine the strengths of both methods. 


### Hybrid Search

Hybrid search combines semantic and keyword search as a balanced approach to 
information retrieval. Some data is most meaningful when interpreted 
literally, such as serial numbers, dates, or product codes.

### Cross-Language Search

Vectara works across multiple languages in a way that is authentically 
agnostic. The platform lets users search in one language and get results 
that were originally written in another language. The best answer may be 
written in German but a user asked the question in Spanish.

## Techniques

Generative AI techniques define how specialized methods enhance the 
performance of a system, and improve both accuracy and reliability. <Config v="names.product"/> 
uses these advanced methods to enable powerful incomes. For example, distill 
complex information into easily understandable insights, and trust that the data 
remains grounded in reality.

![Techniques](/img/techniques.png)

### Grounded Generation

Grounded generation, also known as _Retrieval Augmented Generation (RAG)_,
ensures that generated content is verifiable and rooted in factual 
data. Grounded generation enables users to mitigate the risks 
associated with AI-generated content when misinformation is created, 
also known as hallucinations. With grounded generation, answers to 
user queries come from reality. <Config v="names.product"/> helps 
eliminate hallucinations significantly by grounding the data in 
truth.

[Learn about Grounded Generation](/docs/common-use-cases/chatbots-grounded-generation/grounded-generation-overview)

### Summarization 

Summarization algorithms utilize Natural Language Processing (NLP) techniques 
to distill large volumes of data into concise summaries. This reduced 
information enables rapid data assimilation and decision-making
By leveraging machine learning models, summarizations adapt to different 
contexts and content types, while preserving the essence of the original 
data

### Hallucination Reduction

Hallucinations occur when Generative AI creates incorrect information. This 
generateve information was not present in the input or training data. 
Hallucinations appear as made-up facts, events, or details that are simply 
not true. They occur when the Generative AI model tries to fill in gaps by 
attempting to create a coherent narrative. Thanks to Grounded Generation, <Config v="names.product"/> reduces 
the risk of hallucinations dramatically.

## Query Mechanisms

The query mechanisms in Gen AI enable effective interactions between users 
and the AI system. These mechanisms describe foundational ideas in the broader 
field of queries in Gen AI:

![Query Mechanisms](/img/query_mechanisms.png)

### Data Preparation and Ingestion

Data preparation involves cleaning and transforming the raw data into a format 
ideal for consuming the information. These tasks can include handing missing 
values, standardizing formats, and removing duplicate information. Data 
ingestion imports the data in the system for addiitional processing and 
processing by <Config v="names.product"/>. Taking the time to clean and 
prepare data helps improve how the system generates accurate insights.

### Zero-Shot Models

Zero-shot models have the ability to perform tasks for which they were not 
trained. These models can both understand and encode data at scale. Agnostic 
handling of data for specific tasks provides incredible versability and 
reliability for just about any Gen AI use case.

### Instant Indexing

Instant indexing in <Config v="names.product"/> enables the immediate availability of new search 
data. This capability ensures that users always access the most recent and 
relevant information. This functionality is a game-changer for dynamic 
environments that require timely access to the most current data.

### Metadata Filtering

Metadata filtering allows users to refine search results based on specific 
attributes to improve the precision of search results. This additional 
information can vary from publication dates to content type.

[Learn about Metadata Filtering](/docs/common-use-cases/filtering-by-metadata/filter-overview)

### Re-ranking

The neural re-ranking capability in <Config v="names.product"/> uses natural 
language processing and cross-attentional neural ranking to retrieve the best 
possible answers to user queries. Re-ranking assesses the contextual 
relevance and quality of search results to provide the most reliable 
information to users.

### Recommendation System

Recommendation systems provide users with suggestions based on a 
multitude of factors including preferences, user behavior, and historical 
information. These systems adapt and refine the recommendation logic and 
can provide highly personalized suggestions.

[Learn about Recommendation Systems](/docs/common-use-cases/recommendation-systems/recommender-overview)

### FAQ and Q&A Matching

Matching FAQs and Q&As involve matching user queries with the most relevant 
answers stored in a dataset. This query mechanism benefits customer 
support systems and knowledge bases that required rapid and accurate 
information.

[Learn about FAQs and Q&A Matching](/docs/common-use-cases/question-answer/question-answer-overview)

### Exact and Boolean Text Matching

Exact and Boolean text matching involve traditional search methods. Exact
matching use keyword search to find character-by-character matches. 
Boolean text matching uses more advanced logic (AND, OR, NOT operators) that 
combine or exclude keywords.

[Learn about Exact Matching and Boolean Text Matching](/docs/api-reference/search-apis/lexical-matching)