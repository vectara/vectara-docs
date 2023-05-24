---
id: question-answer-overview
title: Question-Answer Matching System
sidebar_label: FAQ and Q&A Matching
---

import {Config} from '@site/docs/definitions.md';

Some users have frequently asked question (FAQ) databases or other forms of
question databases where the use case demands that your users are trying to find
the *nearest question* to their own, so you can provide them with the
authoritative answer from the "answer" side of the question-answer database.

This lacks the dynamic nature of Grounded Generation, but can allow you to
very tight controls for the types of questions users can ask and get
authoritative answers to.  These can be great for building things like
RFP-answering systems for employees and FAQ lookups for customers.

# Formatting data for indexing
When you send data to <Config v="names.product"/> for this use case, we
recommend that you index the question in `title` field and the answer to that
question in the text content.  For example:

```
{
  "customerId": 123456,
  "corpusId": 1,
  "document": {
    "documentId": "who-is-the-king-of-england",
    "title": "Who is the King of England?",
    "section": [
      {
        "title": "Answer",
        "text": "Charles III"
      }
    ]
  }
}
```

# Querying for similar questions
Suppose you wanted to find the answer to a question related to this example.
You can put <Config v="names.product"/> into a document-matching mode by
setting `semantics` to `RESPONSE`.  For example:

```
{
  "query": [
    {
      "query": "Who's the English monarch?",
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

This turns off <Config v="names.product"/>'s "question-answering" mode and
instead tells it to find similar questions.

You can also add a [filter expression](/docs/common-use-cases/filtering-by-metadata/filter-overview)
of `part.is_title = true` to *only* match the questions.

# Combining question matching and answering
Expanding on the previous example, we can help users find question or answer
matches together by using [batched queries](/docs/api-reference/search-apis/batched-queries)
combined with filter expressions.  For example:

```
{
  "query": [
    {
      "query": "Who's the English monarch?",
      "start": 0,
      "numResults": 10,
      "corpusKey": [
        {
          "customerId": 12345678,
          "corpusId": 1,
          "semantics": "RESPONSE",
          "metadataFilter": "part.is_title = true"
        }
      ]
    },
    {
      "query": "Who's the English monarch?",
      "start": 0,
      "numResults": 10,
      "corpusKey": [
        {
          "customerId": 12345678,
          "corpusId": 1,
          "metadataFilter": "part.is_title = false"
        }
      ]
    }
  ]
}
```