---
id: vectara-and-llamaindex
title: Vectara and LlamaIndex
sidebar_label: Vectara and LlamaIndex
---

import {Config} from '@site/docs/definitions.md';

LlamaIndex is another LLM orchestration framework that focuses more on the 
data aspect of building LLM-based applications. LlamaIndex provides a 
different set of abstractions and tools than LangChain. Vectara is integrated 
into LlamaIndex as a ManagedIndex, providing a natural interface for an 
end-to-end RAG-as-a-service platform. For LlamaIndex developers, using Vectara 
provides a powerful semantic retrieval engine and end-to-end RAG capabilities 
without having to integrate additional components like a vector database, an 
embedding model or even an LLM. 

## Integration benefits

Similar to LangChain, integrating with Vectara from a LlamaIndex application 
provides the following benefits:

* Can be used to power semantic search or a full RAG pipeline, and removes the 
  need to integrate with and maintain additional components - all is handled 
  in a scalable manner through Vectara’s platform.
* Tight integration with the LlamaIndex ecosystem providing low latency and 
  cost
* Enterprise grade scalability, security and privacy features right out of 
  the box

This [example notebook](https://github.com/vectara/example-notebooks/blob/main/notebooks/using-vectara-with-llamaindex.ipynb) includes code examples showing a few ways to use Vectara 
in a LlamaIndex application, including RAG, semantic search, as well as 
AutoRetrieval.
