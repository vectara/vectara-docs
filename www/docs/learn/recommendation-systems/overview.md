---
id: recommender-overview
title: Recommendation System
sidebar_label: Recommendation System
---


import CodePanel from '@site/src/theme/CodePanel';


Many platforms struggle to keep users engaged with relevant content or 
products, often relying on simplistic matching algorithms. Vectara can be used 
as a semantic recommendation system out of the box in order to provide your 
users with semantically similar documents or products. This capability is 
useful when your goal is to increase engagement by accurately matching user 
interest or intent with relevant content.

## Semantic recommendation system considerations

Before you begin using <Config v="names.product"/> for a semantic recommendation
system, it's useful to think through what types of recommendation flows you
want to enable.  For example:
- Do you want to recommend based on the entire document content or just 1 
  section/field like the document title?
- Do you want to recommend semantically similar content regardless of the 
  source language or do you want to only match a particular language?
- Are you looking for exact duplicates or semantic similarity?

## Exact duplicate matching

Exact duplicate matching can be useful when you want to ensure no duplicate
content exists in your corpora or to find exact matches of "known bad" documents
like those that might violate compliance rules in your organization. In general,
we recommend that you use [filter expressions](/docs/api-reference/search-apis/sql/func-opr)
for this.

Specifically:
1. When you index your content, hash your content using something like SHA-256 
   and add that as custom metadata on the document
2. To find similar content to a particular document, hash the entire document 
   using the same hashing algorithm and then perform a filtered query to find 
   exact hash matches

## Similar document matching and near-duplicates

Sometimes, you want to recommend alternative products or web pages to a user that
are similar to the one they're looking at or a recently purchased product. These
use cases can be dealt with by using <Config v="names.product"/> in a
document-to-document search/recommendation platform.  In order to do this, the
most important change is that you'll need to use `RESPONSE` similarity measure
(available to [our Pro and Enterprise plan users](https://vectara.com/pricing/)).
It's easier to explain how this is different by first explaining how the `DEFAULT`
similarity works.

By default, <Config v="names.product"/> is set up in a “question answering” mode.
That is, <Config v="names.product"/>'s large language models are designed in
principal to *answer an end-user's question* instead of finding similar documents
when in their default mode. You can think of this as "the best answer to the
question `Who is the King of England?` is not a document which has the text
`Who is the King of England?` even though that has the highest overlap of keywords
possible.  Instead, <Config v="names.product"/> is set up by default to be able
to find the best *answers* to queries.

Document recommendation systems are not trying to answer questions though:
they're trying to find the most similar documents.  So for that use case, what
you need to do is change the mode of the search to document similarity instead
of question answering. You do that via the semantics key which is inside of the
corpusKey block in the query.

If a user is looking at a document that has the text:

<CodePanel snippets={[{language: "bash", code: `All about me

My name is Paul and I'm ...`
}]} title="Example Text" layout="stacked" />

and you wanted to find other documents that are similar to this, you can pass
this document text to <Config v="names.product"/> and set the `semantics` to
`RESPONSE`.  For example:

<CodePanel snippets={[{language: "json", code: `{
  "query": "All about me my name is Paul and I'm ...",
  "search": {
    "corpora": [
      {
        "corpus_key": "my-corpus",
        "semantics": "response"
      }
    ],
    "offset": 0,
    "limit": 10
   }
}`}]} title="Response Semantics Example" layout="stacked" />

This will find documents that are most semantically similar to that document.

## Further recommendation refinement

At times, it can be useful to further refine the recommendations.  For example:
- Only suggest based on similar document titles
- Only suggest results that share the same language
- Only suggest results that were created by a particular user

In these cases, it can be useful to use <Config v="names.product"/>'s
[filter expressions](/docs/learn/metadata-search-filtering/filter-overview).
There are [out of the box filters](/docs/learn/metadata-search-filtering/ootb-metadata-filters)
for title and language and you can make use of additional metadata you add, such
as the author or publication date.
