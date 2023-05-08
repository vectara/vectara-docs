---
id: lexical-matching
title: Exact and Boolean Text Matching
sidebar_label: Exact and Boolean Text Matching
---

Vectara supports the ability to incorporate partial/exact/Boolean matching in
search results and even to blend them with the neural model in what's called
a "hybrid" retrieval model.

For example, you can use this in Vectara to:
- Allow Vectara to include exact keyword matches for occasions where a search
term was absent from Vectara's training data (e.g. product SKUs)
- Turn off neural retrieval entirely, and instead use exact term matching
- Incorporate typical keyword modifiers like a `NOT` function, exact phrase
matching, and wildcard prefixes of terms

# Enabling Exact and Boolean Text Matching
By default, the exact and Boolean text matching is disabled and only neural
retrieval is used.  You can enable the feature by specifying a value,
`lambda`, at query time.  This value can range from `0` to `1` (inclusive).

The default value of `lambda` is `0`, thus turning off exact and Boolean text
matching.

A value of `1` would turn off _neural_ retrieval instead, relying _only_ on
Boolean and exact text matching.  This can be useful if you're trying to
evaluate how a keyword system like one based on Elasticsearch or Solr may
compare to Vectara.

Vectara supports values in between as well, which tells Vectara to try to
consider _both_ neural _and_ Boolean and exact text matching and then to blend
the scores of the results of the two different scoring models.  Users often see
best results by setting this value somewhere between 0.01 and 0.1, and we
typically recommend users start experimentation with a value of 0.025.

# Syntax
When interpreting query strings, Vectara treats the following syntax specially.

Words that are quoted must match exactly in that order. So, for example, the
query "blue shoes" must match the word blue followed immediately by shoes.

A word fragment suffixed with a "*" is treated as a prefix match, meaning that
it matches any word of which it is a prefix. For example, Miss* matches
Mississippi.

Words prefixed with a "-" sign are excluded from the results. So, to extend the
previous example, -Mississippi would exclude results referencing the Magnolia
State. While -Miss* would exclude references to both Mississippi and Missouri.
