---
id: hybrid-search
title: 'Blend Neural Search and Keyword Search'
sidebar_label: Blend Neural Search and Keyword Search
---

Vectara provides a Hybrid Search that offers a powerful and flexible approach 
to text retrieval. We combine partial, exact, and Boolean text matching with 
neural models which blends traditional, keyword-based search with 
semantic search in what is called "hybrid" retrieval model.

For example, Vectara enables you to do the following:
- Include exact keyword matches for occasions where a search
term was absent from Vectara's training data (e.g. product SKUs)
- Disable neural retrieval entirely, and instead use exact term matching
- Incorporate typical keyword modifiers like a `NOT` function, exact phrase
matching, and wildcard prefixes of terms

You can enable hybrid search by specifying a value, `lambda`, at
query time, specifically under the `corpusKey`. This value can range 
from `0` to `1` (inclusive).

```json
      "corpusKey": [
        {
          "customerId": 123456789,
          "corpusId": 5,
          "semantics": 0,
          "metadataFilter": "",
          "lexicalInterpolationConfig": {
            "lambda": 0.025
          },
          "dim": []
        }
```

The default value of `lambda` is `0`, which disables exact and Boolean text
matching. A value of `1` would disable _neural_ retrieval instead, [relying _only_ on
Boolean and exact text matching](/docs/learn/enable-keyword-text-matching). Experiemnting with the `lambda` value is 
useful if you're trying to evaluate how a keyword system like one based on 
Elasticsearch or Solr may compare to Vectara.

:::note

:bulb:
You can test queries with different `lambda` values in 
our [**API Playground**](/docs/rest-api/query).

:::

Vectara supports in-between values as well, which tells Vectara to try to
consider _both_ neural _and_ Boolean and exact text matching and then to blend
the scores of the results of the two different scoring models. Users often see
best results by setting this value somewhere between 0.01 and 0.1, and we
typically recommend users start experimentation with a `lambda` value of 0.025.

## Syntax Interpretation

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