---
id: hybrid-search
title: Hybrid Search
sidebar_label: Hybrid Search
---

[Semantic search](/docs/learn/semantic-search/semantic-search-overview) enables users to discover information 
based not just on keywords, but on the contextual meaning and relevance of their 
queries. This neural search understands the intent behind user inquiries, 
leveraging natural language understanding to deliver more accurate and 
insightful search results. 

Leveraging these semantic search capabilities, Vectara also provides a Hybrid 
Search option that offers a powerful and flexible approach to text retrieval. 
We combine partial, exact, and Boolean text matching with neural models which 
blends traditional, keyword-based search with semantic search in what is 
called a "hybrid" retrieval model.

For example, you can use this in Vectara to:
- Include exact keyword matches for occasions where a search
term was absent from Vectara's training data (e.g. product SKUs)
- Disable neural retrieval entirely, and instead use exact term matching
- Incorporate typical keyword modifiers like a `NOT` function, exact phrase
matching, and wildcard prefixes of terms

## Enable hybrid search

Enable hybrid search by specifying `lexical_interpolation` value at query time, 
specifically in the `search` object. This value can range from `0.0` to `1.0` 
(inclusive).

As you ingest data and run queries, adjust the `lexical_interpolation` value to 
achieve the perfect balance in answer quality.

```json
{
  "query": "What is the meaning of life?",
  "search": {
    "corpora": [
      {
        "corpus_key": "my-corpus"
      }
    ],
    "offset": 0,
    "limit": 10,
    "lexical_interpolation": 0.025
  }
}
```

### Experiment with different lexical interpolation values

The default value of `lexical_interpolation` is `0`, which *disables* exact and 
Boolean text matching. A value of `1` would disable neural retrieval instead, 
[relying _only_ on Boolean and exact text matching](/docs/learn/enable-keyword-text-matching). Experimenting with 
the `lexical_interpolation` value is useful if you're trying to evaluate how a keyword 
system like one based on Elasticsearch or Solr may compare to Vectara.

:::tip

:bulb:
You can test queries with different `lexical_interpolation` values in 
our [**API Playground**](/docs/rest-api/query) and in the Vectara Console.

:::

Vectara supports in-between values as well, which tells Vectara to try to
consider _both_ neural _and_ Boolean and exact text matching and then to blend
the scores of the results of the two different scoring models. Users often see
best results by setting this lambda value somewhere between `0.01` and `0.1`, and 
we typically recommend users start experimentation with a `lexical_interpolation` 
value of `0.025`.

## Syntax interpretation

When interpreting query strings, Vectara treats the following syntax specially.

* Words that are quoted must match exactly in that order. For example, the
query `blue shoes` must match the word `blue` followed immediately by `shoes`.

* A word fragment suffixed with an asterisk `*` is treated as a prefix match, 
meaning that it matches any word of which it is a prefix. For example, 
`Miss*` matches Mississippi.

* Words prefixed with a minus `-` sign are excluded from the results. To extend 
on the previous example, `-Mississippi` would exclude results referencing the 
Magnolia State. Using `-Miss*` would exclude references to both 
Mississippi and Missouri.
