---
id: recommender-overview
title: Recommendations
sidebar_label: Recommendation System
---

import {Config} from '@site/docs/definitions.md';

Vectara can be used as a semantic recommendation system out of the box in order
to provide your users with semantically similar documents/products.

# Before you begin
Before you begin using <Config v="names.product"/> for a semantic recommendation
system, it's useful to think through what types of recommendation flows do you
want to enable.  For example:
- Do you want to recommend based on the entire document content or just 1 section/field like the document title?
- Do you want to recommend semantically similar content regardless of the source language or do you want to only match a particular language?
- Are you looking for exact duplicates or semantic similarity?

# Exact duplicate matching
Exact duplicate matching can be useful when you want to ensure no duplicate
content exists in your corpora or to find exact matches of "known bad" documents
like those that might violate compliance rules in your organization. In general,
we recommend that you use [filter expressions](/docs/api-reference/search-apis/sql/func-opr)
for this.

Specifically:
1. When you index your content, hash your content using something like SHA-256 and add that as custom metadata on the document
2. To find similar content to a particular document, hash the entire document using the same hashing algorithm and then perform a filtered query to find exact hash matches

# Similar document matching and near-duplicates
Sometimes, you want to recommend alternative products or web pages to a user that
are similar to the one they're looking at or a recently purchased product. These
use cases can be dealt with by using <Config v="names.product"/> in a
document-to-document search/recommendation platform.  In order to do this, the
most important change is that you'll need to use `RESPONSE` similarity measure.
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
of question answering. You do that by semantics key which is inside of the
corpusKey block in the query.

If a user is looking at a document that has the text:
```
All about me

My name is Shane and I'm ...
```

and you wanted to find other documents that are similar to this, you can pass
this document text to <Config v="names.product"/> and set the `semantics` to
`RESPONSE`.  For example:

```
{
  "query": [
    {
      "query": "All about me\n\nMy name is Shane and I'm ...",
      "start": 0,
      "numResults": 10,
      "corpusKey": [
        {
          "customerId": 12345678,
          "corpusId": 1,
          "semantics": "RESPONSE"
        }
      ]
    }
  ]
}
```

This will find documents that are most semantically similar to that document.

## Further refinement
At times, it can be useful to further refine the recommendations.  For example:
- Only suggest based on similar document titles
- Only suggest results that share the same language
- Only suggest results that was created by a particular user

In these cases, it can be useful to use <Config v="names.product"/>'s
[filter expressions](/docs/common-use-cases/filtering-by-metadata/filter-overview).
There are [out of the box filters](/docs/common-use-cases/filtering-by-metadata/ootb-filters)
for title and language and you can make use of additional metadata you add, such
as the author or publication date.