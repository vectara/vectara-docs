---
id: vectara-and-langchain
title: Vectara and LangChain
sidebar_label: Vectara and LangChain
---

import {Config} from '@site/docs/definitions.md';

LangChain is an orchestration framework for building LLM-powered applications. 
Vectara is integrated into LangChain as a vectorstore, which enables 
developers to use its powerful semantic retrieval engine and end-to-end RAG 
capabilities without having to integrate additional components like a vector 
database, an embedding model or even an LLM. All of this can be done through 
Vectara, while taking advantage of additional capabilities provided in the 
LangChain ecosystem. 


## Integration benefits

* Can be used to power semantic search or a full RAG pipeline
* Vectara RAG-as-a-service removes the need to integrate with and maintain 
  additional components like embedding model, vector database, hybrid search 
  or the LLM itself.
* Tight integration with the langchain ecosystem providing low latency and cost
* Enterprise grade scalability, security and privacy features right out of the 
  box

This [example notebook](https://github.com/vectara/example-notebooks/blob/main/notebooks/using-vectara-with-langchain.ipynb) includes code examples showing a few ways to use Vectara 
in a LangChain application, including RAG, semantic search, as well as Self 
Query.
