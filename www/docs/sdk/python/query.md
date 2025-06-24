---
id: query
title: Queries
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

This guide covers the Vectara Python SDK for querying corpora, enabling search 
and Retrieval Augmented Generation (RAG) operations. These methods enables you 
to search a single corpus for relevant documents and generate summarized responses 
using Vectara’s RAG-focused LLM (Mockingbird), supporting enterprise needs like
legal research or customer insights.

## Install the Vectara SDK

<CodePanel
  title="Install Vectara SDK"
  defaultLanguage="bash"
  snippets={[
    { language: 'bash', code: `pip install vectara` }
  ]}
  annotations={{
    bash: [{ line: 1, text: 'Installs the Vectara Python SDK via pip.' }]
  }}
  customWidth="50%"
/>

Install the Vectara Python SDK to enable querying capabilities for your 
enterprise search and RAG applications.

<Spacer size="l" />

## Initialize the Vectara Client

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
  customWidth="50%"
/>

Set up authentication to securely access querying methods, using an API key or 
OAuth 2.0 token.

- **Authentication**: Obtain credentials from the [Vectara Console](https://console.vectara.com).
- **Corpus Setup**: Ensure a corpus exists with indexed documents.

---

## Query methods

### 1. Simple single Corpus query

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
  customWidth="50%"
/>

Perform a basic search on a single corpus to retrieve relevant documents, with 
an option for a summarized response using RAG. This section supports quick 
searches for enterprise data exploration.

- Uses `corpus_key="legal_docs"` to target a legal corpus for context.
- Sets `query="What does the indemnification clause mean..."` for legal
  inquiries, intuitive for users.
- Applies `limit=3` to return top three results, balancing performance
  and precision for quick insights.
- Includes try-except block to handle errors (e.g., invalid keys),
  ensuring robustness in enterprise use.

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

### Example: Simple Query for Legal Contract

<CodePanel
  title="Example: Simple Query for Legal Contract"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:
    response = client.corpora.search(
        corpus_key="legal_docs",
        query="What does the indemnification clause mean in this contract?",
        limit=3
    )
    print(f"Summary: {response['summary']}")
    for result in response['search_results']:
        print(f"Result: {result['text']} (Score: {result['score']})")
except Exception as e:
    print(f"Query failed: {e}")` },
    { language: 'json', code: `{
  "summary": "The indemnification clause transfers liability to the vendor in case of third-party claims.",
  "response_language": "eng",
  "search_results": [
    {
      "text": "Under this agreement, the vendor agrees to indemnify the client...",
      "score": 0.89,
      "document_id": "vendor_contract_2024",
      "document_metadata": {
        "type": "contract",
        "version": "v2"
      }
    }
  ],
  "factual_consistency_score": 0.95
}` }
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
  customWidth="50%"
/>

Execute a simple query to retrieve and summarize information about a 
legal contract, demonstrating basic RAG usage.

- This method is retrieval-focused but includes a summary if the corpus is configured for RAG.
- For advanced RAG, metadata filtering, or custom prompts, use `client.corpora.query` (below).
- `intelligent_query_rewriting` may improve results but is experimental (see [Intelligent Query Rewriting](https://docs.vectara.com/docs/search-and-retrieval/intelligent-query-rewriting)).

**Error handling**:
- **400 Bad Request**: Malformed query or invalid parameters.
  - **Resolution**: Ensure `query` is a non-empty string and `limit` is positive.
- **403 Forbidden**: Insufficient permissions.
  - **Resolution**: Use a Query or Index API Key with query access.
- **404 Not Found**: Corpus doesn’t exist.
  - **Resolution**: Verify `corpus_key` using `client.corpora.list`.

---

## 2. Advanced single corpus query

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
  customWidth="50%"
/>

Conduct a customized search with metadata filters, reranking, and RAG to 
deliver tailored summaries for complex enterprise needs. This section 
enhances query precision and response quality.

**Parameters**:
- `corpus_key`: Unique identifier of the corpus ("legal_docs").
- `query`: Natural-language search query ("Summarize recent IP rulings in California").
- `search`: Optional dictionary with:
  - `metadata_filter`: Filter expression ("doc.jurisdiction = 'California' AND doc.legal_domain = 'IP'").
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

---

### Example: Advanced query for IP rulings

<CodePanel
  title="Example: Advanced Query for IP Rulings"
  defaultLanguage="python"
  snippets={[
    { language: 'python', code: `try:
    response = client.corpora.query(
        corpus_key="legal_docs",
        query="Summarize recent court rulings on IP rights in California",
        search={
            "metadata_filter": "doc.jurisdiction = 'California' AND doc.legal_domain = 'IP'",
            "lexical_interpolation": 0.3,
            "limit": 5
        },
        context_configuration={
            "sentences_before": 3,
            "sentences_after": 3,
            "start_tag": "<em>",
            "end_tag": "</em>"
        },
        reranker={
            "type": "customer_reranker",
            "reranker_name": "Rerank_Multilingual_v1",
            "limit": 100
        },
        generation={
            "generation_preset_name": "mockingbird-2.0",
            "prompt_template": '''[
  {"role": "system", "content": "You are a legal research assistant. Summarize the provided search results concisely."},
  {"role": "user", "content": "Summarize recent court rulings on intellectual property rights in California based on the search results."}
]''',
            "max_response_characters": 500,
            "response_language": "eng",
            "citations": {
                "style": "markdown",
                "url_pattern": "https://docs.example.com/cases/{doc.id}",
                "text_pattern": "{doc.title}"
            }
        },
        save_history=True,
        intelligent_query_rewriting=True
    )
    print(f"Response: {response['summary']}")
    print(f"Factual Consistency: {response.get('factual_consistency_score', 'N/A')}")
    for result in response['search_results']:
        print(f"Result: {result['text']} (Score: {result.get('score', 'N/A')})")
except Exception as e:
    print(f"Advanced query failed: {e}")` },
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
  customWidth="50%"
/>

Perform an advanced query to summarize IP rulings with custom RAG settings, 
demonstrating metadata filtering and reranking.

- Sets `corpus_key="legal_docs"` to focus on a legal corpus for IP
  queries.
- Uses `query="Summarize recent court rulings on IP rights..."` for
  legal research needs.
- Applies `search={"metadata_filter": "doc.jurisdiction = 'California'
  AND doc.legal_domain = 'IP'"}` to filter California IP cases.
- Sets `lexical_interpolation=0.3` for balanced keyword-semantic
  matching, enhancing accuracy.
- Limits `search["limit"]=5` for efficiency in result retrieval.
- Configures `context_configuration={"sentences_before": 3, ...}` with
  `<em>` tags for 3-sentence context and readability.
- Uses `reranker={"type": "customer_reranker", "reranker_name":
  "Rerank_Multilingual_v1", "limit": 100}` for multilingual refinement.
- Applies `generation={"generation_preset_name": "mockingbird-2.0", ...}`
  with Mockingbird for concise summaries.
- Sets `max_response_characters=500` to allow detailed legal output.
- Adds `citations={"style": "markdown", ...}` for traceability in
  documentation.
- Enables `save_history=True` for auditing purposes.
- Turns on `intelligent_query_rewriting=True` to optimize the query.
- Includes try-except for error handling, ensuring reliability.

---

### Example: Advanced query using requests

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
  customWidth="50%"
/>

Conduct an advanced query using HTTP requests to summarize ESG reports, 
demonstrating API integration and customization.

- Uses `url="https://api.vectara.io/v2/corpora/legal_docs/query"` with
  `legal_docs` as a placeholder corpus for legal data.
- Sets `query="Recent ESG compliance reports for European banks"` to
  focus on compliance trends.
- Applies `search={"metadata_filter": "doc.industry = 'banking' AND
  doc.region = 'EU' AND doc.year = 2023"}` for specific filtering.
- Sets `lexical_interpolation=0.15` for slight lexical emphasis in
  search.
- Limits `search["limit"]=5` for brevity and relevance.
- Configures `context_configuration={"sentences_before": 2, ...}` with
  `<mark>` tags for 2-sentence context and readability.
- Uses `reranker={"type": "mmr", "limit": 50, "cutoff": 0.6, ...}` for
  diversity with a 50-limit and 0.6 cutoff.
- Applies `generation={"generation_preset_name": "mockingbird-2.0", ...}`
  with a custom ESG prompt.
- Sets `max_response_characters=400` for concise ESG summaries.
- Uses `response_language="eng"` for English responses.
- Enables `save_history=True` for auditing purposes.
- Turns on `intelligent_query_rewriting=True` to optimize the query.
- Includes `headers={"x-api-key": "<your-api-key>"}` for secure access
  with a valid key.

---

### Example: Query corpus with generation and reranking

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
  customWidth="50%"
/>

Query a corpus to summarize a legal clause, enhancing result relevance and 
accuracy.

- Uses `url="https://api.vectara.io/v2/query"` for multi-corpus
  queries, flexible for various data.
- Sets `corpusKey="legal_docs"` as a placeholder for a legal corpus.
- Uses `query="Summarize the arbitration clause in our vendor NDA..."`
  to focus on NDA terms.
- Applies `metadataFilter="doc_type = 'contract' AND doc_region = 'US'
  AND doc_industry = 'SaaS'"` for US SaaS contract relevance.
- Configures `generation={"responseLanguage": "eng", ...}` for English
  responses.
- Enables `enableFactualConsistencyScore=True` for reliability in
  legal accuracy.
- Uses `reranker={"type": "customer_reranker", "reranker_name":
  "Rerank_Multilingual_v1", "cutoff": 0.6, "limit": 100}` for
  precision with a 0.6 cutoff and 100-limit.
- Includes `headers={"x-api-key": "<x-api-key>"}` for secure access
  with a valid key.

**Error handling**:
- **400 Bad Request**: Invalid query, metadata filter, or generation parameters.
  - *Resolution*: Validate `metadata_filter` syntax (use single quotes for strings). Ensure `prompt_template` is a valid Apache Velocity template.
- **403 Forbidden**: Insufficient permissions.
  - *Resolution*: Use a Query or Index API Key with query access.
- **404 Not Found**: Corpus doesn’t exist.
  - *Resolution*: Verify `corpus_key` using `client.corpora.list`.

