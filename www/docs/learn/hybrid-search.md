---
id: hybrid-search
title: Hybrid Search
sidebar_label: Hybrid Search
---


import CodePanel from '@site/src/theme/CodePanel';


Traditional keyword-based search often fails to capture the context and intent 
behind user queries, leading to irrelevant or incomplete results. Vectara's 
Hybrid Search combines [semantic search](/docs/learn/semantic-search/semantic-search-overview) with traditional keyword-based 
approaches to offer a powerful and flexible solution for text retrieval.

We combine partial, exact, and Boolean text matching with neural models which 
blend traditional, keyword-based search with semantic search in what is 
called a "hybrid" retrieval model. This enables users to discover information 
based on a combination of keywords and the contextual meaning and relevance of 
their queries.

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

:::note
Setting `lexical_interpolation` to `1.0` is equivalent to the original BM25.
:::

As you ingest data and run queries, adjust the `lexical_interpolation` value to
achieve the perfect balance in answer quality.

<CodePanel snippets={[{language: "json", code: `{
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
}`}]} title="Code Example" layout="stacked" />

:::tip

For more information about queries such as additional search and summarization 
parameters, see the [**Query API Definition**](/docs/api-reference/search-apis/search) 
section and our [**interactive API Reference**](/docs/rest-api/query). 

:::

### Experiment with different lexical interpolation values

The default value of `lexical_interpolation` is `0`, which _disables_ exact and
Boolean text matching. A value of `1` would disable neural retrieval instead,
[relying _only_ on Boolean and exact text matching](/docs/learn/enable-keyword-text-matching). Experimenting with
the `lexical_interpolation` value is useful if you're trying to evaluate how a keyword
system like one based on Elasticsearch or Solr may compare to Vectara.

:::tip

:bulb:
You can test queries with different `lexical_interpolation` values in
our [**API Reference**](/docs/rest-api/query) and in the Vectara Console.

:::

Vectara supports in-between values as well, which tells Vectara to try to
consider _both_ neural _and_ Boolean and exact text matching and then to blend
the scores of the results of the two different scoring models. Users often see
best results by setting this value somewhere between `0.01` and `0.1`, and
we typically recommend users start experimentation with a `lexical_interpolation`
value of `0.025`.

## Syntax interpretation

When interpreting query strings, Vectara treats the following syntax specially.

- Words that are quoted must match exactly in that order. For example, the
  query `blue shoes` must match the word `blue` followed immediately by `shoes`.

- A word fragment suffixed with an asterisk `*` is treated as a prefix match,
  meaning that it matches any word of which it is a prefix. For example,
  `Miss*` matches Mississippi.

- Words prefixed with a minus `-` sign are excluded from the results. To extend
  on the previous example, `-Mississippi` would exclude results referencing the
  Magnolia State. Using `-Miss*` would exclude references to both
  Mississippi and Missouri.
