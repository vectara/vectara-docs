---
id: rerankers
title: Rerankers
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

Rerankers enhance the relevance of search results by refining and reordering. 
The Vectara Python SDK enables you to apply rerankers in queries using 
`CustomerSpecificReranker` within `SearchCorporaParameters`. You can also list 
available rerankers to identify their IDs for use in queries. 

This section shows how to integrate rerankers into synchronous and asynchronous 
queries and how to retrieve reranker details. 

:::tip Note
For more information about the available rerankers, see [**Reranking**](/docs/api-reference/search-apis/reranking).
:::

## Use a reranker in a synchronous query

Improve result ordering in a query by specifying its ID in the 
`SearchCorporaParameters`. This ensures the most relevant, business-critical 
results appear at the top, according to your chosen logic.

<CodePanel
  title="Query with Reranker (Synchronous)"
  snippets={[
    {
      language: "python",
      code: "from vectara import Vectara, SearchCorporaParameters, KeyedSearchCorpus, ContextConfiguration, CustomerSpecificReranker, GenerationParameters\n\nclient = Vectara(api_key=\"YOUR_API_KEY\")\nsearch = SearchCorporaParameters(\n    corpora=[\n        KeyedSearchCorpus(\n            corpus_key=\"my-corpus-key\",\n            metadata_filter=\"\"\n        )\n    ],\n    context_configuration=ContextConfiguration(\n        sentences_before=2,\n        sentences_after=2\n    ),\n    reranker=CustomerSpecificReranker(reranker_id=\"rnk_272725719\")\n)\ngeneration = GenerationParameters(response_language=\"eng\")\nresponse = client.query(\n    query=\"What are the key features?\",\n    search=search,\n    generation=generation\n)\nprint(response.answer)"
    }
  ]}
  annotations={{
    python: [
      { line: 15, text: "Specify reranker ID to reorder results" },
      { line: 7, text: "Target corpus for the query" },
      { line: 19, text: "Execute query with reranker" }
    ]
  }}
  layout="stacked"
/>

---

## Use a reranker in an asynchronous query

You can apply rerankers in asynchronous (non-blocking) queries to boost search 
result quality in applications that require high responsiveness or parallel 
processing. Specify the reranker ID as you would in a synchronous query.

<CodePanel
  title="Query with Reranker (Asynchronous)"
  snippets={[
    {
      language: "python",
      code: "from vectara import AsyncVectara, SearchCorporaParameters, KeyedSearchCorpus, ContextConfiguration, CustomerSpecificReranker, GenerationParameters\nimport asyncio\n\nasync def main():\n    client = AsyncVectara(api_key=\"YOUR_API_KEY\")\n    search = SearchCorporaParameters(\n        corpora=[\n            KeyedSearchCorpus(\n                corpus_key=\"my-corpus-key\",\n                metadata_filter=\"\"\n            )\n        ],\n        context_configuration=ContextConfiguration(\n            sentences_before=2,\n            sentences_after=2\n        ),\n        reranker=CustomerSpecificReranker(reranker_id=\"rnk_272725719\")\n    )\n    generation = GenerationParameters(response_language=\"eng\")\n    response = await client.query(\n        query=\"What are the key features?\",\n        search=search,\n        generation=generation\n    )\n    print(response.answer)\n\nasyncio.run(main())"
    }
  ]}
  annotations={{
    python: [
      { line: 16, text: "Apply reranker to improve result ordering" },
      { line: 5, text: "Initialize asynchronous client" },
      { line: 19, text: "Await asynchronous query execution" }
    ]
  }}
  layout="stacked"
/>

---

## Listing Rerankers to Find IDs

Before using a reranker, list all available rerankers to discover their IDs, 
names, and descriptions. Filtering by keyword (such as "multilingual") helps you 
quickly identify the best match for your search scenario.

* Use the `filter` parameter to match rerankers by name or description (regular 
  expression).
* Set the `limit` parameter to control page size.
* Use the resulting reranker IDs when building your search queries.

<CodePanel
  title="List Available Rerankers"
  snippets={[
    {
      language: "python",
      code: "from vectara import Vectara\n\nclient = Vectara(api_key=\"YOUR_API_KEY\")\nresponse = client.rerankers.list(\n    filter=\".*multilingual.*\",\n    limit=5\n)\nfor reranker in response:\n    print(f\"ID: {reranker.id}, Name: {reranker.name}, Description: {reranker.description}\")"
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: "Filter for rerankers with 'multilingual' in name/description" },
      { line: 6, text: "Limit to 5 rerankers per page" },
      { line: 8, text: "Access reranker ID for use in queries" }
    ]
  }}
  layout="stacked"
/>

---

## Use a reranker in a streaming query

In streaming scenarios, apply a reranker to improve result ordering as each 
chunk is received. This is especially useful for real-time UIs, chatbots, or 
long-running queries where partial results are processed incrementally.

<CodePanel
  title="Streaming Query with Reranker"
  snippets={[
    {
      language: "python",
      code: "from vectara import Vectara, SearchCorporaParameters, KeyedSearchCorpus, ContextConfiguration, CustomerSpecificReranker, GenerationParameters\n\nclient = Vectara(api_key=\"YOUR_API_KEY\")\nsearch = SearchCorporaParameters(\n    corpora=[\n        KeyedSearchCorpus(\n            corpus_key=\"my-corpus-key\"\n        )\n    ],\n    reranker=CustomerSpecificReranker(reranker_id=\"rnk_272725719\")\n)\ngeneration = GenerationParameters(response_language=\"eng\")\nresponse = client.query_stream(\n    query=\"What is AI?\",\n    search=search,\n    generation=generation\n)\nfor chunk in response:\n    if chunk.type == \"generation_chunk\":\n        print(chunk.generation_chunk)"
    }
  ]}
  annotations={{
    python: [
      { line: 10, text: "Include reranker in streaming query" },
      { line: 13, text: "Initiate streaming query" },
      { line: 17, text: "Process streamed response chunks" }
    ]
  }}
  layout="stacked"
/>


## Types of Rerankers

Rerankers refine search result ordering to improve relevance, diversity, or 
custom business logic. The Vectara Python SDK supports several reranker types,
each tailored to specific use cases. This section demonstrates how to use the 
Vectara Multilingual Reranker, Maximal Marginal Relevance (MMR) Reranker, User 
Defined Function (UDF) Reranker, Chain Reranker, and Knee Reranker in queries.

### Vectara Multilingual Reranker

The Multilingual Reranker (Rerank_Multilingual_v1, aka Slingshot) refines 
search results with advanced neural ranking, excelling in both English and 
multilingual datasets. Use it for precise document scoring in Retrieval 
Augmented Generation (RAG) pipelines.

<CodePanel
  title="Query with MMR Reranker"
  snippets={[
    {
      language: "python",
      code: "from vectara import Vectara, SearchCorporaParameters, KeyedSearchCorpus, GenerationParameters\n\nclient = Vectara(api_key=\"YOUR_API_KEY\")\nsearch = SearchCorporaParameters(\n    corpora=[\n        KeyedSearchCorpus(corpus_key=\"my-corpus-key\")\n    ],\n    reranker={\n        \"type\": \"mmr\",\n        \"diversity_bias\": 0.4\n    }\n)\ngeneration = GenerationParameters(response_language=\"eng\")\nresponse = client.query(\n    query=\"Latest smartphone features\",\n    search=search,\n    generation=generation\n)\nprint(response.answer)"
    }
  ]}
  annotations={{
    python: [
      { line: 9, text: "Enable MMR Reranker for diverse results" },
      { line: 10, text: "Set diversity bias to balance relevance and variety" },
      { line: 14, text: "Query for varied smartphone feature results" }
    ]
  }}
  layout="stacked"
/>

### User Defined Function (UDF) Reranker

The UDF Reranker allows custom scoring based on metadata, enabling use cases 
like recency bias, location bias, or e-commerce promotions. Use the User 
Function Language to define expressions.

<CodePanel
  title="Query with UDF Reranker (E-commerce Boost)"
  snippets={[
    {
      language: "python",
      code: "from vectara import Vectara, SearchCorporaParameters, KeyedSearchCorpus, GenerationParameters\n\nclient = Vectara(api_key=\"YOUR_API_KEY\")\nsearch = SearchCorporaParameters(\n    corpora=[\n        KeyedSearchCorpus(corpus_key=\"my-corpus-key\")\n    ],\n    reranker={\n        \"type\": \"userfn\",\n        \"user_function\": \"if (get('$.document_metadata.units_in_stock') > 0) get('$.score') * 1.5 else null\"\n    }\n)\ngeneration = GenerationParameters(response_language=\"eng\")\nresponse = client.query(\n    query=\"Smart speakers\",\n    search=search,\n    generation=generation\n)\nprint(response.answer)"
    }
  ]}
  annotations={{
    python: [
      { line: 9, text: "Use UDF Reranker for custom scoring" },
      { line: 10, text: "Boost in-stock products by 50%, filter out-of-stock" },
      { line: 14, text: "Query for e-commerce product search" }
    ]
  }}
  layout="stacked"
/>

### Chain Reranker

The Chain Reranker applies multiple rerankers sequentially for complex ranking 
needs, combining relevance, diversity, and custom logic. Specify a list of 
rerankers in order.

<CodePanel
  title="Query with Chain Reranker"
  snippets={[
    {
      language: "python",
      code: "from vectara import Vectara, SearchCorporaParameters, KeyedSearchCorpus, GenerationParameters\n\nclient = Vectara(api_key=\"YOUR_API_KEY\")\nsearch = SearchCorporaParameters(\n    corpora=[\n        KeyedSearchCorpus(corpus_key=\"my-corpus-key\")\n    ],\n    reranker={\n        \"type\": \"chain\",\n        \"rerankers\": [\n            {\n                \"type\": \"customer_reranker\",\n                \"reranker_name\": \"Rerank_Multingual_v1\"\n            },\n            {\n                \"type\": \"mmr\",\n                \"diversity_bias\": 0.2\n            },\n            {\n                \"type\": \"userfn\",\n                \"user_function\": \"get('$.score') * get('$.document_metadata.customer_review_stars', 0) / 5\"\n            }\n        ]\n    }\n)\ngeneration = GenerationParameters(response_language=\"eng\")\nresponse = client.query(\n    query=\"Best headphones\",\n    search=search,\n    generation=generation\n)\nprint(response.answer)"
    }
  ]}
  annotations={{
    python: [
      { line: 9, text: "Chain multiple rerankers for complex ranking" },
      { line: 12, text: "Start with Multilingual Reranker for precision" },
      { line: 16, text: "Add MMR for diversity" },
      { line: 19, text: "Boost by customer review stars" }
    ]
  }}
  layout="stacked"
/>

## Knee Reranker

The Knee Reranker, used after the Multilingual Reranker, automatically detects 
relevance cutoffs by analyzing score patterns, ideal for adaptive filtering in 
RAG systems.

<CodePanel
  title="Query with Knee Reranker (Async)"
  snippets={[
    {
      language: "python",
      code: `from vectara import AsyncVectara, SearchCorporaParameters, KeyedSearchCorpus, GenerationParameters\nimport asyncio\n\nasync def main():\n    client = AsyncVectara(api_key=\"YOUR_API_KEY\")\n    search = SearchCorporaParameters(\n        corpora=[\n            KeyedSearchCorpus(corpus_key=\"my-corpus-key\")\n        ],\n        reranker={\n            \"type\": \"chain\",\n            \"rerankers\": [\n                {\n                    \"type\": \"customer_reranker\",\n                    \"reranker_name\": \"Rerank_Multingual_v1\"\n                },\n                {\n                    \"type\": \"userfn\",\n                    \"user_function\": \"knee(sensitivity=0.7, early_bias=0.3)\",\n                    \"cutoff\": 0.5\n                }\n            ]\n        }\n    )\n    generation = GenerationParameters(response_language=\"eng\")\n    response = await client.query(\n        query=\"AI trends 2025\",\n        search=search,\n        generation=generation\n    )\n    print(response.answer)\n\nasyncio.run(main())`
    }
  ]}
  annotations={{
    python: [
      { line: 11, text: "Chain rerankers with Knee after Multilingual" },
      { line: 18, text: "Configure Knee with high sensitivity for precision" },
      { line: 19, text: "Set relevance cutoff at 0.5" },
      { line: 25, text: "Async query for performance" }
    ]
  }}
  layout="stacked"
/>

## Error Handling
* **400 Bad Request:** Invalid reranker ID or configuration.
  * **Resolution:** Double-check the reranker ID and input parameters.
* **403 Forbidden:** Insufficient permissions to list or use rerankers.
  * **Resolution:** Ensure your API key or token grants access.
* **404 Not Found:** The reranker does not exist or is not accessible.
  * **Resolution:** Use the list method to confirm available rerankers.


:::tip
Experiment with different reranker types and parameters to optimize ranking 
for your specific dataset and business needs. Use the list endpoint to 
discover new rerankers as they become available.
:::
