---
id: query
title: Querying Corpora
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

This guide covers the Vectara Python SDK for querying corpora, enabling search and Retrieval Augmented Generation (RAG) operations. These methods allow you to search a single corpus for relevant documents and generate summarized responses using Vectara’s RAG-focused LLM (Mockingbird).

## Prerequisites

1. **Install the SDK**:
   <CodePanel
     title="Install Vectara SDK"
     defaultLanguage="bash"
     snippets={[
       { language: 'bash', code: `pip install vectara` }
     ]}
     annotations={{
       bash: [{ line: 1, text: 'Installs the Vectara Python SDK via pip.' }]
     }}
     layout="stacked"
   />

2. **Authentication**:
   - Obtain an API key or OAuth 2.0 token from the [Vectara Console](https://console.vectara.com).
   - Initialize the `VectaraClient` with your credentials.

   <CodePanel
     title="Initialize VectaraClient"
     defaultLanguage="python"
     snippets={[
       { language: 'python', code: `from vectara import VectaraClient\n\n# Using API key\nclient = VectaraClient(api_key="your_api_key", customer_id="your_customer_id")\n\n# Using OAuth 2.0\nclient = VectaraClient(bearer_token="your_bearer_token", customer_id="your_customer_id")` }
     ]}
     annotations={{
       python: [
         { line: 3, text: 'Use a Query or Index API Key for querying operations.' },
         { line: 6, text: 'OAuth 2.0 is recommended for production environments.' }
       ]
     }}
     layout="stacked"
   />

3. **Corpus Setup**: Ensure a corpus exists with indexed documents (see [Corpus Management Guide](vectara_python_sdk_corpora.md) and [Indexing Documents Guide](vectara_python_sdk_indexing.md)).
4. Vectara’s API uses natural-language queries for retrieval, not prompt-based interactions like many GenAI platforms. For RAG, configure `generation` parameters to generate prompt-like responses.

## Query methods

### 1. Simple single Corpus query

**Purpose**: Perform a straightforward search on a single corpus, returning relevant documents and an optional summarized response.

<CodePanel
     title="Method"
     defaultLanguage="python"
     snippets={[
       { language: 'python', code: `client.corpora.search(
    corpus_key: str,
    query: str,
    limit: int = 10,
    offset: int = 0,
    save_history: bool = None,
    intelligent_query_rewriting: bool = False,
    timeout: int = None,
    timeout_millis: int = None
) -> dict` }
     ]}
     layout="stacked"
   />

**Parameters**:
- `corpus_key`: Unique identifier of the corpus ("legal_docs").
- `query`: Natural-language search query ("What does the indemnification clause mean?").
- `limit`: Maximum number of results to return (default: 10, minimum: 1).
- `offset`: Starting position in the result set (default: 0).
- `save_history`: Optional boolean to save the query in history.
- `intelligent_query_rewriting`: Optional boolean to enable query rewriting for improved results (tech preview).
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with:
- `summary`: Summarized response (if RAG is enabled).
- `response_language`: Language of the response ("eng").
- `search_results`: List of results with `text`, `score`, and `document_metadata`.
- `factual_consistency_score`: Reliability score for the summary (0.0–1.0, if applicable).

<CodePanel
  title="Example: Simple Query for Legal Contract"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:\n    response = client.corpora.search(\n        corpus_key="legal_docs",\n        query="What does the indemnification clause mean in this contract?",\n        limit=3\n    )\n    print(f"Summary: {response['summary']}")\n    for result in response['search_results']:\n        print(f"Result: {result['text']} (Score: {result['score']})")\nexcept Exception as e:\n    print(f"Query failed: {e}")` },
    { language: 'json', code: `{\n  "summary": "The indemnification clause transfers liability to the vendor in case of third-party claims.",\n  "response_language": "eng",\n  "search_results": [\n    {\n      "text": "Under this agreement, the vendor agrees to indemnify the client...",\n      "score": 0.89,\n      "document_id": "vendor_contract_2024",\n      "document_metadata": {\n        "type": "contract",\n        "version": "v2"\n      }\n    }\n  ],\n  "factual_consistency_score": 0.95\n}` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Specify the corpus to search.' },
      { line: 4, text: 'Natural-language query for retrieval.' },
      { line: 7, text: 'Access the summarized response.' }
    ],
    json: [
      { line: 2, text: 'Summary generated if RAG is enabled.' },
      { line: 6, text: 'Search result text and score.' }
    ]
  }}
  layout="stacked"
/>

**Error handling**:
- **400 Bad Request**: Malformed query or invalid parameters.
  - *Resolution*: Ensure `query` is a non-empty string and `limit` is positive.
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use a Query or Index API Key with query access.
- **404 Not Found**: Corpus doesn’t exist.
  - *Resolution*: Verify `corpus_key` using `client.corpora.list`.

**Notes**:
- This method is retrieval-focused but includes a summary if the corpus is configured for RAG.
- For advanced RAG, metadata filtering, or custom prompts, use `client.corpora.query` (below).
- `intelligent_query_rewriting` may improve results but is experimental (see [Intelligent Query Rewriting](https://docs.vectara.com/docs/search-and-retrieval/intelligent-query-rewriting)).

### 2. Advanced single corpus query

**Purpose**: Perform a customized search with metadata filters, reranking, and RAG, including detailed summarization options and prompt templates.

<CodePanel
     title="Method"
     defaultLanguage="python"
     snippets={[
       { language: 'python', code: `client.corpora.query(
    corpus_key: str,
    query: str,
    search: dict = None,
    context_configuration: dict = None,
    reranker: dict = None,
    generation: dict = None,
    save_history: bool = None,
    intelligent_query_rewriting: bool = None,
    timeout: int = None,
    timeout_millis: int = None
) -> dict` }
     ]}
     layout="stacked"
   />

**Parameters**:
- `corpus_key`: Unique identifier of the corpus ("legal_docs").
- `query`: Natural-language search query ("Summarize recent IP rulings in California").
- `search`: Optional dictionary with:
  - `metadata_filter`: Filter expression ("doc.jurisdiction = 'California'").
  - `lexical_interpolation`: Float (0–1) for hybrid search (0.3).
  - `semantics`: Query semantics (default: "query").
  - `offset`, `limit`: Pagination controls.
- `context_configuration`: Optional dictionary for result context:
  - `sentences_before`, `sentences_after`: Context around matched text.
  - `start_tag`, `end_tag`: Highlight tags ("<em>", "</em>").
- `reranker`: Optional dictionary for reranking:
  - `type`: Reranker type ("mmr", "customer_reranker").
  - `reranker_name`: Specific reranker ("Rerank_Multilingual_v1").
  - `limit`, `cutoff`, `include_context`: Reranking options.
- `generation`: Optional dictionary for RAG:
  - `generation_preset_name`: LLM preset ("mockingbird-2.0").
  - `prompt_template`: Custom prompt template (Apache Velocity format).
  - `max_response_characters`: Maximum summary length.
  - `response_language`: Language code ("eng").
  - `citations`: Citation style and patterns (`style: "markdown"`).
- `save_history`: Optional boolean to save the query in history.
- `intelligent_query_rewriting`: Optional boolean for query rewriting.
- `timeout`, `timeout_millis`: Optional timeouts.

**Returns**: Dictionary with:
- `summary`: Generated summary (if `generation` is set).
- `response_language`: Response language.
- `search_results`: List of results with `text`, `score`, and `document_metadata`.
- `factual_consistency_score`: Summary reliability score (if applicable).
- `rendered_prompt`: Rendered prompt sent to the LLM (if `prompt_template` is used).
- `rephrased_query`: Rewritten query (if `intelligent_query_rewriting` is enabled).

<CodePanel
  title="Example: Advanced Query for IP Rulings"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:\n    response = client.corpora.query(\n        corpus_key="legal_docs",\n        query="Summarize recent court rulings on IP rights in California",\n        search={\n            "metadata_filter": "doc.jurisdiction = 'California' AND doc.legal_domain = 'IP'",\n            "lexical_interpolation": 0.3,\n            "limit": 5\n        },\n        context_configuration={\n            "sentences_before": 3,\n            "sentences_after": 3,\n            "start_tag": "<em>",\n            "end_tag": "</em>"\n        },\n        reranker={\n            "type": "customer_reranker",\n            "reranker_name": "Rerank_Multilingual_v1",\n            "limit": 100\n        },\n        generation={\n            "generation_preset_name": "mockingbird-2.0",\n            "prompt_template": '''[\n  {"role": "system", "content": "You are a legal research assistant. Summarize the provided search results concisely."},\n  {"role": "user", "content": "Summarize recent court rulings on intellectual property rights in California based on the search results."}\n]''',\n            "max_response_characters": 500,\n            "response_language": "eng",\n            "citations": {\n                "style": "markdown",\n                "url_pattern": "https://docs.example.com/cases/{doc.id}",\n                "text_pattern": "{doc.title}"\n            }\n        },\n        save_history=True,\n        intelligent_query_rewriting=True\n    )\n    print(f"Response: {response['summary']}")\n    print(f"Factual Consistency: {response.get('factual_consistency_score', 'N/A')}")\n    for result in response['search_results']:\n        print(f"Result: {result['text']} (Score: {result.get('score', 'N/A')})")\nexcept Exception as e:\n    print(f"Advanced query failed: {e}")` },
    { language: 'json', code: `{
  "corpus_key": "legal_docs",
  "query": "Summarize recent court rulings on IP rights in California",
  "search": {
    "metadata_filter": "doc.jurisdiction = 'California' AND doc.legal_domain = 'IP'",
    "lexical_interpolation": 0.3,
    "limit": 5
  },
  "context_configuration": {
    "sentences_before": 3,
    "sentences_after": 3,
    "start_tag": "<em>",
    "end_tag": "</em>"
  },
  "reranker": {
    "type": "customer_reranker",
    "reranker_name": "Rerank_Multilingual_v1",
    "limit": 100
  },
  "generation": {
    "generation_preset_name": "mockingbird-2.0",
    "prompt_template": "[{\\"role\\": \\"system\\", \\"content\\": \\"You are a legal research assistant. Summarize the provided search results concisely.\\"},{\\"role\\": \\"user\\", \\"content\\": \\"Summarize recent court rulings on intellectual property rights in California based on the search results.\\"}]",
    "max_response_characters": 500,
    "response_language": "eng",
    "citations": {
      "style": "markdown",
      "url_pattern": "https://docs.example.com/cases/{doc.id}",
      "text_pattern": "{doc.title}"
    }
  },
  "save_history": true,
  "intelligent_query_rewriting": true
}` }
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Target corpus for the query.' },
      { line: 6, text: 'Filter results by metadata.' },
      { line: 19, text: 'Enable RAG with Mockingbird LLM.' },
      { line: 20, text: 'Simplified prompt template for summarization.' }
    ],
    json: [
      { line: 5, text: 'Metadata filter in query syntax.' },
      { line: 20, text: 'Static prompt template for RAG, without Velocity variables.' }
    ]
  }}
  layout="stacked"
/>
Let'see an example using requests.

<CodePanel
  title="Example: Advanced Query using requests"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `import requests
import json

url = "https://api.vectara.io/v2/corpora/legal_docs/query"

payload = json.dumps({
  "query": "Recent ESG compliance reports for European banks",
  "search": {
    "metadata_filter": "doc.industry = 'banking' AND doc.region = 'EU' AND doc.year = 2023",
    "lexical_interpolation": 0.15,
    "semantics": "query",
    "offset": 0,
    "limit": 5
  },
  "context_configuration": {
    "sentences_before": 2,
    "sentences_after": 2,
    "start_tag": "<mark>",
    "end_tag": "</mark>"
  },
  "reranker": {
    "type": "mmr",
    "limit": 50,
    "cutoff": 0.6,
    "include_context": true
  },
  "generation": {
    "generation_preset_name": "mockingbird-2.0",
    "prompt_template": "[{\\"role\\": \\"system\\", \\"content\\": \\"You are a helpful assistant summarizing ESG reports.\\"}, {\\"role\\": \\"user\\", \\"content\\": \\"Summarize the ESG compliance trends from these documents.\\"}]",
    "max_response_characters": 400,
    "response_language": "eng"
  },
  "save_history": true,
  "intelligent_query_rewriting": true
})

headers = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "x-api-key": "<your-api-key>"
}

response = requests.post(url, headers=headers, data=payload)
print(response.text)`
    }
  ]}
  annotations={{
    python: [
      { line: 4, text: 'Replace `legal_docs` with your actual corpus key.' },
      { line: 7, text: 'Query ESG compliance among European banks.' },
      { line: 21, text: 'Configure reranker for better result ranking.' },
      { line: 29, text: 'Simplified prompt for RAG with no Velocity variables.' },
      { line: 40, text: 'Insert your actual Vectara API key.' }
    ]
  }}
  layout="stacked"
/>

Let's query a corpus with generation and reranking

<CodePanel
  title="Example: query corpus with generation and reranking"
  defaultLanguage="python"
  snippets={[
    {
      language: 'python',
      code: `import requests
import json

url = "https://api.vectara.io/v2/query"

payload = json.dumps({
  "query": "Summarize the arbitration clause in our vendor NDA, focusing on governing law and venue.",
  "corpusKey": "legal_docs",
  "generation": {
    "responseLanguage": "eng",
    "enableFactualConsistencyScore": True
  },
  "reranker": {
    "type": "customer_reranker",
    "reranker_name": "Rerank_Multilingual_v1",
    "cutoff": 0.6,
    "limit": 100
  },
  "metadataFilter": "doc_type = 'contract' AND doc_region = 'US' AND doc_industry = 'SaaS'"
})
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'x-api-key': '<x-api-key>'
}

response = requests.request("POST", url, headers=headers, data=payload)
print(response.text)`
    }
  ]}
  layout="stacked"
/>



**Error handling**:
- **400 Bad Request**: Invalid query, metadata filter, or generation parameters.
  - *Resolution*: Validate `metadata_filter` syntax (use single quotes for strings). Ensure `prompt_template` is a valid Apache Velocity template.
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use a Query or Index API Key with query access.
- **404 Not Found**: Corpus doesn’t exist.
  - *Resolution*: Verify `corpus_key` using `client.corpora.list`.

:::tip Tips
- **Retrieval Augmented Generation**: Enable generation by setting `generation` parameters. Use `prompt_template` to create prompt-like summaries, aligning with GenAI expectations.
- **Query vs. prompt**: The `query` parameter is a search term, not a prompt. Use `generation.prompt_template` to define how search results are summarized (see [Vectara Prompt Engine](https://docs.vectara.com/docs/prompts/vectara-prompt-engine)).
- **Advanced features**: Metadata filters improve precision, reranking enhances result ordering, and `intelligent_query_rewriting` optimizes queries. See [Hybrid Search](https://docs.vectara.com/docs/learn/hybrid-search) and [Mockingbird LLM](https://docs.vectara.com/docs/learn/mockingbird-llm).
- **Factual consistency**: A `factual_consistency_score` below 0.9 may indicate potential inaccuracies in the summary. Review `search_results` for verification.
:::

## Additional notes

- **Generation tasks**: The `query` method supports RAG via `generation` parameters, addressing user needs for generation beyond retrieval. For conversational generation, use `client.chats.create` (forthcoming guide).
- **Query vs. prompt confusion**: Unlike prompt-based GenAI APIs, Vectara’s queries are retrieval-focused. The `prompt_template` in `generation` mimics prompt-based interactions by structuring search results into a conversational summary.
- **Improving usability**: If parameters like `metadata_filter` or `prompt_template` are unclear, provide feedback to `feedback@vectara.com` with specific examples, as suggested internally.
- **Testing**: Use the [Vectara API Playground](https://console.vectara.com) to test queries and refine `prompt_template` before coding.

## Next steps

- Populate corpora with documents using `client.documents.index` (see [Indexing Documents Guide](vectara_python_sdk_indexing.md)).
- Explore conversational AI with `client.chats.create` (forthcoming guide).
- Review the [Vectara API Recipes](https://docs.vectara.com/docs/api-recipes) for query examples.
- Experiment with advanced features in the [Vectara API Playground](https://console.vectara.com).
