---
id: vectara-and-langchain
title: Vectara and LangChain
sidebar_label: Vectara and LangChain
---


LangChain serves as an orchestration framework for building LLM-powered 
applications. Vectara's [integration into LangChain](https://python.langchain.com/docs/integrations/vectorstores/vectara/) as a vectorstore empowers 
developers to utilize its robust semantic retrieval engine and end-to-end RAG 
capabilities without having to integrate additional components like a vector 
database, an embedding model, or even an LLM. All of this can be done through 
Vectara, while taking advantage of additional capabilities provided in the 
LangChain ecosystem.

## Integration benefits

* Provides semantic search and full RAG pipelines.
* Vectara RAG-as-a-Service removes the need to integrate with and maintain 
  additional components like embedding model, vector database, hybrid search 
  or the LLM itself.
* Offers tight integration with the LangChain ecosystem for low latency and 
  reduced cost.
* Enables enterprise grade scalability, security, and privacy features right 
  out of the box.

This [example notebook](https://github.com/vectara/example-notebooks/blob/main/notebooks/using-vectara-with-langchain.ipynb) includes code examples showing a few ways to use Vectara 
in a LangChain application, including RAG, semantic search, as well as Self 
Query.
