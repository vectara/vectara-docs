---
id: hybrid-search
title: Hybrid search
sidebar_label: Hybrid search
---

import CodePanel from '@site/src/theme/CodePanel';

Hybrid search blends traditional keyword matching and semantic matching to 
give you more control over how Vectara retrieves results. It helps you handle 
cases where meaning is important, but specific terms still matter. By adjusting 
the `lexical_interpolation` value, you modify the balance between semantic 
relevance and exact keyword matching.

## How semantic matching works

Semantic matching retrieves content based on *meaning* instead of exact words. 
Vectara represents both your uploaded documents and your queries as _embeddings_. 
These embeddings capture the semantic intent that can identify 
results even with different wording.

Semantic search works as follows:

1. **Indexing**: You upload a document, and Vectara breaks it into small chunks.  
   This generates an embedding for each chunk, where chunks with similar meaning 
   are grouped nearby in the embedding space. For example, the phrases "fix a flat 
   tire" and "change a wheel" use different words but get grouped closely.
2. **Querying**: A user submits a query, and Vectara generates an embedding for that 
   query, which captures the intent behind the query.
3. **Matching**: Vectara compares the query embedding to the indexed chunks and 
   retrieves the ones closest in meaning. Because this comparison is _semantic_, 
   the search results can match intent even when wording differs.

Vectara uses semantic search by default, but you can enable hybrid search when 
you need a combination of both approaches.

## How hybrid search works

Hybrid search combines semantics with keywords to produce a single result. 
The _semantic score_ measures how closely the chunk's meaning matches the query, 
while the _lexical score_ measures how closely the keywords align with the query.

Hybrid search interpolates these signals to give you the best of both worlds:
* When specific keywords must carry weight such as product names, SKUs, and IDs. 
* When your domain includes schema names, commands, or jargon.
* When you need meaningful results but certain keywords should boost ranking.

If you're not sure where to start, begin with semantic search and modify the 
`lexical_interpolation` value until the results match your expectations.

## Enable hybrid search

You enable hybrid search by specifying the `lexical_interpolation` value in 
the `search` object of a [query](/docs/rest-api/query-corpus):

* `lexical_interpolation = 0.0`: Pure semantic search.
* `lexical_interpolation = 1.0`: Pure keyword search.
*  A value between `0.0` and `1.0`: A hybrid search that balances both methods.  

A common starting point is `0.025`.

:::note
A `lexical_interpolation` value of `1.0` is equivalent to traditional BM25 
keyword search.
:::

**Example:**

<CodePanel snippets={[{language: "json", code: `{
   "query": "What is the meaning of life?",
   "search": {
     "corpora": [
      {
        "corpus_key": "my-corpus"
      }
     ],
    "limit": 25,
    "lexical_interpolation": 0.005
   }
}`
}]} title="Lexical Interpolation Example" layout="stacked" />

:::tip
:bulb:
You can test queries with different `lexical_interpolation` values in
our [**API Reference**](/docs/rest-api/query) and in the Vectara Console.
:::

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
