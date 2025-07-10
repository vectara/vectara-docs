---
id: rerankers
title: Rerankers
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

Rerankers enhance the relevance of search results by refining and reordering them 
after initial retrieval. The Vectara Python SDK enables you to apply various 
reranker types in queries to optimize result quality for different use cases—from 
improving precision with neural models to adding diversity or custom business logic.

This section shows how to integrate different reranker types into your queries and 
configure them for optimal performance in various scenarios.

:::tip Note
For more information about the available rerankers, see [**Reranking**](/docs/api-reference/search-apis/reranking).
:::

## Basic query with reranker

Improve result ordering in a query by specifying a reranker configuration. This 
ensures the most relevant, business-critical results appear at the top according 
to your chosen ranking logic.

<CodePanel
  title="Query with multilingual reranker"
  snippets={[
    {
      language: 'python',
      code: `from vectara import Vectara, SearchCorporaParameters, GenerationParameters
from vectara.core.api_error import ApiError

client = Vectara(api_key="YOUR_API_KEY")

try:
    # Configure search with reranker
    search = SearchCorporaParameters(
        corpora=[{
            "corpus_key": "knowledge-base",
            "metadata_filter": ""
        }],
        context_configuration={
            "sentences_before": 2,
            "sentences_after": 2
        },
        reranker={
            "type": "customer_reranker",
            "reranker_name": "Rerank_Multilingual_v1"
        }
    )
    
    generation = GenerationParameters(response_language="eng")
    
    response = client.query(
        query="What are the key features of machine learning?",
        search=search,
        generation=generation
    )
    
    print(f"Reranked response: {response.answer}")
    
except ApiError as e:
    print(f"Query with reranker failed: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 18, text: 'Use customer reranker for neural ranking precision' },
      { line: 19, text: 'Specify the multilingual reranker by name' },
      { line: 26, text: 'Execute query with enhanced result ordering' }
    ]
  }}
  customWidth="50%"
/>

This example demonstrates using Vectara's multilingual reranker, which provides 
advanced neural ranking capabilities for both English and multilingual content, 
making it ideal for improving result quality in RAG applications.

**Key Benefits:**
- Enhanced relevance scoring using neural models
- Multilingual support for global applications
- Optimized for RAG and question-answering scenarios

---

## MMR reranker for diversity

Use Maximal Marginal Relevance (MMR) reranking to balance relevance with diversity, 
reducing redundancy in search results while maintaining high quality.

<CodePanel
  title="Query with MMR reranker"
  snippets={[
    {
      language: 'python',
      code: `try:
    # MMR reranker for diverse results
    search = SearchCorporaParameters(
        corpora=[{
            "corpus_key": "product-catalog"
        }],
        reranker={
            "type": "mmr",
            "diversity_bias": 0.4,
            "limit": 10,
            "cutoff": 0.3
        }
    )
    
    generation = GenerationParameters(response_language="eng")
    
    response = client.query(
        query="Latest smartphone features and specifications",
        search=search,
        generation=generation
    )
    
    print(f"Diverse results: {response.answer}")
    
except ApiError as e:
    print(f"MMR reranker failed: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 8, text: 'Use MMR type for diversity-focused reranking' },
      { line: 9, text: 'Balance between relevance (0.6) and diversity (0.4)' },
      { line: 11, text: 'Filter out results below 0.3 relevance score' }
    ]
  }}
  customWidth="50%"
/>

**MMR Configuration Parameters:**
- `diversity_bias`: Float between 0-1 controlling relevance vs diversity balance
- `limit`: Maximum number of results to rerank
- `cutoff`: Minimum relevance score threshold for results

**Use Cases:**
- Product search where you want variety in results
- Research queries requiring diverse perspectives
- Content discovery applications
- Recommendation systems

---

## User Defined Function (UDF) reranker

Implement custom scoring logic using User Defined Functions to boost or filter 
results based on metadata, business rules, or dynamic conditions.

<CodePanel
  title="E-commerce UDF reranker with inventory boost"
  snippets={[
    {
      language: 'python',
      code: `try:
    # UDF reranker for e-commerce with inventory boost
    search = SearchCorporaParameters(
        corpora=[{
            "corpus_key": "product-catalog"
        }],
        reranker={
            "type": "userfn",
            "user_function": "if (get('$.document_metadata.in_stock') == true) get('$.score') * 1.5 else get('$.score') * 0.1"
        }
    )
    
    generation = GenerationParameters(response_language="eng")
    
    response = client.query(
        query="Smart speakers available for purchase",
        search=search,
        generation=generation
    )
    
    print(f"Inventory-optimized results: {response.answer}")
    
except ApiError as e:
    print(f"UDF reranker failed: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 8, text: 'Use userfn type for custom scoring logic' },
      { line: 9, text: 'Boost in-stock products by 50%, reduce out-of-stock by 90%' }
    ]
  }}
  layout="stacked"
/>

**UDF Function Examples:**

**Recency Boost:**
```javascript
get('$.score') * (1 + (now() - get('$.document_metadata.published_date')) / 86400 * 0.01)
```

**Rating Boost:**
```javascript
get('$.score') * (1 + get('$.document_metadata.rating', 0) / 5 * 0.2)
```

**Price Range Filter:**
```javascript
if (get('$.document_metadata.price') <= 100) get('$.score') else null
```

**Use Cases:**
- E-commerce inventory management
- Content freshness prioritization
- User preference personalization
- Business rule enforcement

---

## Chain reranker for complex ranking

Combine multiple rerankers sequentially to implement sophisticated ranking strategies 
that incorporate relevance, diversity, and custom business logic.

<CodePanel
  title="Multi-stage chain reranker"
  snippets={[
    {
      language: 'python',
      code: `try:
    # Chain reranker combining multiple approaches
    search = SearchCorporaParameters(
        corpora=[{
            "corpus_key": "product-reviews"
        }],
        reranker={
            "type": "chain",
            "rerankers": [
                {
                    "type": "customer_reranker",
                    "reranker_name": "Rerank_Multilingual_v1"
                },
                {
                    "type": "mmr",
                    "diversity_bias": 0.2
                },
                {
                    "type": "userfn",
                    "user_function": "get('$.score') * (1 + get('$.document_metadata.review_stars', 0) / 5 * 0.3)"
                }
            ]
        }
    )
    
    generation = GenerationParameters(response_language="eng")
    
    response = client.query(
        query="Best wireless headphones under $200",
        search=search,
        generation=generation
    )
    
    print(f"Multi-stage ranked results: {response.answer}")
    
except ApiError as e:
    print(f"Chain reranker failed: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 8, text: 'Use chain type to apply multiple rerankers sequentially' },
      { line: 11, text: 'Start with neural reranking for precision' },
      { line: 15, text: 'Add diversity with low bias to maintain quality' },
      { line: 19, text: 'Boost products with high customer ratings' }
    ]
  }}
  layout="stacked"
/>

**Chain Reranker Strategy:**
1. **Neural Ranking**: Start with multilingual reranker for semantic precision
2. **Diversity**: Apply MMR with low bias to reduce redundancy while preserving relevance
3. **Business Logic**: Boost results with high customer ratings for business optimization

**Advanced Chain Examples:**

**Academic Research:**
```python
"rerankers": [
    {"type": "customer_reranker", "reranker_name": "Rerank_Multilingual_v1"},
    {"type": "userfn", "user_function": "get('$.score') * (1 + log(get('$.document_metadata.citation_count', 1) + 1) * 0.1)"}
]
```

**Content with Recency Bias:**
```python
"rerankers": [
    {"type": "customer_reranker", "reranker_name": "Rerank_Multilingual_v1"},
    {"type": "userfn", "user_function": "get('$.score') * max(0.5, 1 - (now() - get('$.document_metadata.published_date')) / 31536000)"}
]
```

---

## Streaming queries with rerankers

Apply rerankers in streaming scenarios for real-time applications while maintaining 
improved result quality as each chunk is received.

<CodePanel
  title="Streaming query with reranker"
  snippets={[
    {
      language: 'python',
      code: `try:
    # Streaming query with reranker
    search = SearchCorporaParameters(
        corpora=[{
            "corpus_key": "knowledge-base"
        }],
        reranker={
            "type": "customer_reranker",
            "reranker_name": "Rerank_Multilingual_v1"
        }
    )
    
    generation = GenerationParameters(response_language="eng")
    
    response = client.query_stream(
        query="Explain artificial intelligence and machine learning",
        search=search,
        generation=generation
    )
    
    print("Streaming reranked response:")
    for chunk in response:
        if hasattr(chunk, 'generation_chunk') and chunk.generation_chunk:
            print(chunk.generation_chunk, end='', flush=True)
    print("\\n")
    
except ApiError as e:
    print(f"Streaming with reranker failed: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 7, text: 'Include reranker in streaming configuration' },
      { line: 15, text: 'Use query_stream for real-time response generation' },
      { line: 22, text: 'Process reranked chunks as they arrive' }
    ]
  }}
  customWidth="50%"
/>

**Streaming with Rerankers Benefits:**
- Real-time response generation with improved relevance
- Better user experience for interactive applications
- Optimized result quality for chatbots and live search
- Enhanced performance for long-form content generation

---

## List available rerankers

Discover available rerankers in your Vectara instance to identify their names 
and configurations for use in queries.

<CodePanel
  title="List and filter rerankers"
  snippets={[
    {
      language: 'python',
      code: `try:
    # List rerankers with optional filtering
    response = client.rerankers.list(
        filter=".*multilingual.*",
        limit=10
    )
    
    print("Available rerankers:")
    for reranker in response:
        print(f"ID: {reranker.id}")
        print(f"Name: {reranker.name}")
        print(f"Description: {reranker.description}")
        print("---")
        
except ApiError as e:
    print(f"List rerankers failed: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 4, text: 'Filter for rerankers containing "multilingual" in name or description' },
      { line: 9, text: 'Access reranker properties for configuration' }
    ]
  }}
  customWidth="50%"
/>

**Listing Parameters:**
- `filter`: Regular expression to match reranker names or descriptions
- `limit`: Maximum number of rerankers to return per page
- `page_key`: Pagination token for retrieving additional results

Use the reranker names from this list in your `customer_reranker` configurations.

---

## Best practices and optimization

**Reranker Selection Guidelines:**

<CodePanel
  title="Choosing the right reranker"
  snippets={[
    {
      language: 'python',
      code: `# Production reranker configurations for different scenarios

# High-precision search (legal, medical, technical)
precision_config = {
    "type": "customer_reranker",
    "reranker_name": "Rerank_Multilingual_v1"
}

# Diverse content discovery
discovery_config = {
    "type": "chain",
    "rerankers": [
        {"type": "customer_reranker", "reranker_name": "Rerank_Multilingual_v1"},
        {"type": "mmr", "diversity_bias": 0.5}
    ]
}

# E-commerce with business logic
ecommerce_config = {
    "type": "chain", 
    "rerankers": [
        {"type": "customer_reranker", "reranker_name": "Rerank_Multilingual_v1"},
        {"type": "userfn", "user_function": "if (get('$.document_metadata.in_stock')) get('$.score') * 1.2 else get('$.score') * 0.8"},
        {"type": "mmr", "diversity_bias": 0.3}
    ]
}

# Performance-optimized for high-volume
performance_config = {
    "type": "mmr",
    "diversity_bias": 0.2,
    "limit": 20
}`
    }
  ]}
  layout="stacked"
/>

**Performance Guidelines:**
- Use single rerankers for high-volume, low-latency scenarios
- Apply chain rerankers for complex ranking requirements
- Set appropriate `limit` values to balance quality and performance
- Monitor query latency when adding multiple rerankers
- Use `cutoff` parameters to filter low-relevance results

**Error Handling Best Practices:**
- Validate reranker names using the list endpoint
- Implement fallback queries without rerankers for reliability
- Handle reranker failures gracefully in production systems
- Test UDF functions thoroughly before deployment

---

## Error handling and troubleshooting

**Common Issues and Solutions:**

<CodePanel
  title="Reranker error handling patterns"
  snippets={[
    {
      language: 'python',
      code: `def robust_query_with_reranker(client, query, corpus_key):
    """Execute query with reranker and fallback handling"""
    
    # Primary query with reranker
    search_with_reranker = SearchCorporaParameters(
        corpora=[{"corpus_key": corpus_key}],
        reranker={
            "type": "customer_reranker",
            "reranker_name": "Rerank_Multilingual_v1"
        }
    )
    
    try:
        # Attempt query with reranker
        response = client.query(
            query=query,
            search=search_with_reranker
        )
        return {"success": True, "response": response, "used_reranker": True}
        
    except ApiError as e:
        if e.status_code == 400:
            print("Reranker configuration error, falling back to basic search")
            
            # Fallback query without reranker
            search_basic = SearchCorporaParameters(
                corpora=[{"corpus_key": corpus_key}]
            )
            
            response = client.query(query=query, search=search_basic)
            return {"success": True, "response": response, "used_reranker": False}
        else:
            return {"success": False, "error": f"{e.status_code}: {e.body}"}`
    }
  ]}
  customWidth="52%"
/>

**Common Error Scenarios:**
- **400 Bad Request**: Invalid reranker name or configuration
- **403 Forbidden**: Insufficient permissions for reranker access
- **404 Not Found**: Reranker not available in your instance
- **429 Rate Limit**: Too many reranking requests

**Resolution Strategies:**
- Validate reranker availability using `client.rerankers.list()`
- Implement graceful degradation to basic search
- Use appropriate error handling for production reliability
- Monitor reranker performance and adjust configurations

---

## Next steps

After mastering rerankers:

- **Query Optimization**: Combine rerankers with metadata filtering for precise results
- **Performance Tuning**: Monitor and optimize reranker configurations for your use case
- **Custom Business Logic**: Develop sophisticated UDF functions for domain-specific ranking
- **A/B Testing**: Compare different reranker configurations to optimize user experience

For advanced search capabilities, see the [Query API guide](https://docs.vectara.com/docs/api-reference/search-apis/search). For metadata-based filtering, see the [Metadata guide](https://docs.vectara.com/docs/api-reference/indexing-apis/metadata).