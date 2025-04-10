---
id: enable-keyword-text-matching
title: Keyword Search
sidebar_label: Keyword Search
---


In some specialized fields such as legal, compliance, and technical 
domains, relying solely on [semantic search](/docs/learn/semantic-search/semantic-search-overview) can miss information tied to 
specific phrases or terms. By default, Vectara optimizes for semantic 
understanding and disables exact and Boolean text matching, which is similar 
to a traditional, keyword-based search. However, users can enable precise 
keyword matching by setting the `lexical_interpolation` value to `1` at query 
time.

Vectara offers flexibility in balancing keyword matching with advanced semantic 
capabilities. Keyword search is particularly useful when searching for 
specific legal clauses, regulations, error codes, and precise identifiers. 
This level of control enables users to tailor their searches to the specific 
requirements of their domain, balancing between semantic understanding and 
exact keyword matching as needed.

To enable exact keyword matching and disable neural retrieval, specify the 
`lexical_interpolation` value as `1` in the `search` object at query time:

```json
"search": {
    "corpora": [
      {
        "corpus_key": "sports-rules"
      }
    ],
    "offset": 0,
    "limit": 10,
    "context_configuration": {
      "sentences_before": 2,
      "sentences_after": 2,
      "start_tag": "%START_SNIPPET%",
      "end_tag": "%END_SNIPPET%"
    },
    "lexical_interpolation": 1.0
  },
```

:::note
Setting `lexical_interpolation` to `1.0` is equivalent to the original BM25.
:::

## Enable exact keyword matching in the console UI

You can also set this value in the Console UI and experiment with searches and 
disable the hybrid search option.

![Set lexical_interpolation to 1.0](/img/lambda_console.png)

The default value of `lexical_interpolation` is `0`, which disables exact and 
Boolean text matching. 

## Enable exact keyword Search

The following example shows the full [query](/docs/api-reference/search-apis/search) with 
the `lexical_interpolation` value set to `1`:

```json
curl -X POST \
-H "Content-Type: application/json" \
-H "x-api-key: <API_KEY>" \
https://api.vectara.io/v2/query \
-d @- <<END;
{
  "query": "What is offsides?",
  "search": {
    "corpora": [
      {
        "corpus_key": "nhl-rulebook-2024"
      }
    ],
    "offset": 0,
    "limit": 10,
    "context_configuration": {
      "sentences_before": 2,
      "sentences_after": 2,
      "start_tag": "%START_SNIPPET%",
      "end_tag": "%END_SNIPPET%"
    },
    "lexical_interpolation": 1.0
  },
  "generation": {
    "prompt_name": "vectara-summary-ext-v1.2.0",
    "max_used_search_results": 5
  }
}
END
```

Experimenting with the `lexical_interpolation` value is useful if you're trying
to evaluate how a keyword system like one based on Elasticsearch or Solr may 
compare to Vectara.
