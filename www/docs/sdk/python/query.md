---
id: query
title: Queries
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

This guide covers the Vectara Python SDK for querying corpora, enabling search 
and Retrieval Augmented Generation (RAG) operations. These methods enable you 
to search corpora for relevant documents and generate summarized responses 
using Vectara's RAG-focused LLMs, supporting enterprise needs like
legal research or customer insights.

## Install the Vectara SDK

<CodePanel
  title="Install Vectara SDK"
  snippets={[
    { language: 'bash', code: `pip install vectara` }
  ]}
  customWidth="50%"
/>

Install the Vectara Python SDK to enable querying capabilities for your 
enterprise search and RAG applications.

<Spacer size="l" />

## Initialize the Vectara Client

<CodePanel
  title="Initialize Vectara Client"
  snippets={[
    {
      language: 'python',
      code: `from vectara import Vectara
from vectara.core.api_error import ApiError

# Initialize client with API key
client = Vectara(api_key="YOUR_API_KEY")`
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: 'Use a Query or Index API Key for querying operations' }
    ]
  }}
  customWidth="50%"
/>

Set up authentication to securely access querying methods using an API key.
Ensure your API key has querying permissions for the target corpora.

---

## Simple query with generation

<CodePanel
  title="Simple Query with Generation (RAG)"
  snippets={[
    {
      language: "python", 
      code: `import os
from vectara import Vectara, SearchCorporaParameters, GenerationParameters
from vectara.core.api_error import ApiError

# Initialize client
api_key = os.getenv("VECTARA_API_KEY", "YOUR_API_KEY")
client = Vectara(api_key=api_key)

try:
    # Configure search parameters
    search = SearchCorporaParameters(
        corpora=[{"corpus_key": "support-docs"}]
    )
    
    # Configure generation with recommended settings
    generation = GenerationParameters(
        generation_preset_name="vectara-summary-ext-24-05-med-omni",
        max_used_search_results=50,
        response_language="eng",
        enable_factual_consistency_score=True
    )
    
    # Execute query with RAG
    response = client.query(
        query="What does error 403 mean?",
        search=search,
        generation=generation
    )
    
    print(f"Summary: {response.summary}")
    print(f"Factual Consistency Score: {response.factual_consistency_score}")
    
    for result in response.search_results:
        print(f"Result: {result.text} (Score: {result.score})")
        
except ApiError as e:
    print(f"Query failed: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 12, text: "Target specific corpus for search" },
      { line: 17, text: "Use recommended preset for high-quality responses" },
      { line: 18, text: "Include more results for better context" },
      { line: 20, text: "Enable confidence scoring for generated summaries" },
      { line: 30, text: "AI-generated summary based on search results" },
      { line: 33, text: "Access individual search results with relevance scores" }
    ]
  }}
  customWidth="50%"
/>

Perform a query with Retrieval Augmented Generation (RAG) to get both search results 
and an AI-generated summary. This is the most common pattern for getting comprehensive 
answers from your corpus.

**Key Parameters:**
- `generation_preset_name`: `vectara-summary-ext-24-05-med-omni` provides high-quality, 
  comprehensive responses using GPT-4o
- `max_used_search_results`: 50 results ensures the LLM has substantial context for 
  generation
- `enable_factual_consistency_score`: Provides confidence score for the generated summary

**Returns:**
- `summary`: AI-generated summary based on search results
- `factual_consistency_score`: Reliability score (0.0-1.0) for the summary
- `search_results`: List of relevant documents with scores

Use this pattern when you need both specific document excerpts and a synthesized answer.

---

## Advanced query with filtering and reranking

<CodePanel
  title="Advanced query with filtering and reranking"
  snippets={[
    {
      language: 'python',
      code: `try:
  # Advanced search with metadata filtering
  search = SearchCorporaParameters(
      corpora=[{
          "corpus_key": "support-docs",
          "metadata_filter": "doc.os = 'MacOS'",
          "lexical_interpolation": 0.3
      }],
      context_configuration={
          "sentences_before": 3,
          "sentences_after": 3,
          "start_tag": "<em>",
          "end_tag": "</em>"
      },
      reranker={
          "type": "customer_reranker",
          "reranker_name": "Rerank_Multilingual_v1",
          "limit": 100,
          "cutoff": 0.6
      }
  )
  
  # Advanced generation with custom prompt
  generation = GenerationParameters(
      generation_preset_name="vectara-summary-ext-24-05-med-omni",
      max_used_search_results=25,
      response_language="eng",
      enable_factual_consistency_score=True,
      prompt_template="You are a technical support assistant. Summarize the \nfollowing search results $vectaraQueryResults"
  )
  
  response = client.query(
      query="Summarize recent court rulings on IP rights in California",
      search=search,
      generation=generation
  )
  
  print(f"Summary: {response.summary}")
  print(f"Response based on {len(response.search_results)} filtered results")
  
except ApiError as e:
  print(f"Advanced query failed: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 6, text: 'Filter results by metadata criteria' },
      { line: 7, text: 'Balance lexical and semantic search (0.3 = 30% lexical)' },
      { line: 10, text: 'Add context sentences around matches' },
      { line: 15, text: 'Use reranker to improve result quality' },
      { line: 29, text: 'Custom prompt template for specialized responses' }
    ]
  }}
  customWidth="50%"
/>

Execute sophisticated queries with metadata filtering, reranking, and custom generation 
prompts for specialized use cases.

**Advanced Features:**
- **Metadata Filtering**: Use `doc.field = 'value'` syntax to filter by document properties
- **Lexical Interpolation**: 0.3 balances keyword matching (30%) with semantic search (70%)
- **Context Configuration**: Adds surrounding sentences for better understanding
- **Reranking**: Improves result relevance using specialized models
- **Custom Prompts**: Tailor AI responses for specific domains or formats

**Best Practices:**
- Use metadata filters to narrow scope before expensive generation
- Rerankers improve quality but add latency - use for important queries
- Custom prompts work best with domain-specific instructions

---

## Streaming query

<CodePanel
  title="Streaming query for real-time responses"
  snippets={[
    {
      language: 'python',
      code: `try:
    search = SearchCorporaParameters(
        corpora=[{"corpus_key": "support-docs"}]
    )
    
    generation = GenerationParameters(
        generation_preset_name="vectara-summary-ext-24-05-med-omni",
        max_used_search_results=20,
        response_language="eng"
    )
    
    # Stream the response for real-time display
    response = client.query_stream(
        query="How do I troubleshoot login issues?",
        search=search,
        generation=generation
    )
    
    print("Streaming response:")
    for chunk in response:
        if hasattr(chunk, 'generation_chunk') and chunk.generation_chunk:
            print(chunk.generation_chunk, end='', flush=True)
    print("\\n")  # New line after streaming complete
    
except ApiError as e:
    print(f"Streaming query failed: {e.status_code} - {e.body}")`
    }
  ]}
  annotations={{
    python: [
      { line: 13, text: 'Use query_stream for real-time response generation' },
      { line: 21, text: 'Process chunks as they arrive' },
      { line: 22, text: 'Display text immediately for better user experience' }
    ]
  }}
  customWidth="50%"
/>

Stream query responses in real-time for better user experience in interactive applications 
like chatbots or live search interfaces.

**Streaming Benefits:**
- Immediate feedback to users as content generates
- Better perceived performance for long responses
- Ability to stop generation early if needed

**Use Cases:**
- Interactive chat interfaces
- Live search suggestions
- Long-form content generation where users want to see progress

---

## Error handling and best practices

**Common Error Scenarios:**

<CodePanel
  title="Error handling patterns"
  snippets={[
    {
      language: 'python',
      code: `try:
    response = client.query(
        query="search term",
        search=search_params,
        generation=generation_params
    )
    
    # Check for warnings or issues
    if response.factual_consistency_score < 0.5:
        print("Warning: Low factual consistency score")
    
except ApiError as e:
    if e.status_code == 400:
        print("Bad request - check query parameters")
    elif e.status_code == 403:
        print("Insufficient permissions - check API key")
    elif e.status_code == 404:
        print("Corpus not found - verify corpus_key")
    else:
        print(f"Unexpected error: {e.status_code} - {e.body}")`
    }
  ]}
  customWidth="50%"
/>

**Best Practices:**
- Always use try-catch blocks for production queries
- Monitor factual consistency scores for quality control
- Start with simple queries before adding advanced features
- Use appropriate `max_used_search_results` (50 for comprehensive, 10-20 for fast responses)
- Test metadata filters with small result sets first

**Performance Tips:**
- Cache frequently used search configurations
- Use streaming for long responses
- Consider pagination for very large result sets
- Monitor query latency and adjust parameters accordingly

---

## Next steps

After mastering queries, explore:

- **Chat Sessions**: Use `client.chats.create()` for conversational interfaces
- **Batch Processing**: Process multiple queries efficiently
- **Custom Rerankers**: Train domain-specific reranking models
- **Advanced Analytics**: Track query performance and user patterns

For building conversational experiences, see the [Chat API guide](https://docs.vectara.com/docs/api-reference/chat-apis/chat).