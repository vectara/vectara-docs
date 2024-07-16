---
id: enable-keyword-text-matching
title: Keyword Search
sidebar_label: Keyword Search
---

Vectara disables exact and Boolean text matching by default, which is similar 
to a traditional, keyword-based search. Exact keyword matching is particularly 
useful in environments that do not require [semantic search](/docs/learn/semantic-search/semantic-search-overview) where specific 
phrases and terms are crucial to the desired outcome. This can include 
information in legal, compliance, technical fields where you might need 
specific error codes of system specifications. 

You enable exact keyword matching, which disables neural retrieval, by 
specifying the `lexical_interpolation` value as `1` at query time, specifically in 
the `search` object:

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
