---
id: question-answer-overview
title: FAQ and Q&A Matching
sidebar_label: FAQ and Q&A Matching
---

import {Config} from '@site/docs/definitions.md';

FAQ and Question-and-Answer (Q&A) matching leverages our neural retrieval 
capabilities to deliver precise answers and can help streamline support 
and knowledge management use cases. Enabling precise Q&A matching reduces the 
time users spend searching for information by enhancing both the accuracy and 
contextuality of responses. By parsing and understanding complex queries, 
Vectara transforms how organizations engage with their users, making 
interactions more context-aware.

Some users have frequently asked question (FAQ) databases or other forms of 
question databases where the use case demands that your users are trying to 
find the *nearest question* to their own, so you can provide them with the 
authoritative answer from the "answer" side of the question-answer database.

This approach may not offer the dynamic nature of Retrieval Augmented 
Generation (RAG), but it allows you to establish tight controls over the 
types of questions that users can ask and receive authorizative answers. 
These question-answer systems can be great for building RFP-answering systems 
for employees and FAQ lookups for customers.

## Configure corpus for question matching

During corpus creation, set `documents_are_questions` to `true` to configures 
the corpus to use the query encoder for both indexing and querying. This is 
ideal for direct question-to-question matching, ensuring that the encoder 
used for indexing is aligned with the one used for querying, which improves 
match relevance.

We **do not** recommend changing the `semantics` setting to `response` for question 
matching. This method uses an encoder that is tailored for handling arbitrary 
textual content and would reverse the intended effect. It is often most 
effective when used in combination with a well-structured corpus and clear 
understanding of the user's search intent. Leave the default `semantics` setting.

## Format data for question indexing

When you send data to <Config v="names.product"/> for this use case, we
recommend that you index the question in the `title` field and the answer to
that question in the `text` content. For example:

```json showLineNumbers title="document.json"
{
  "id": "who-is-the-king-of-england",
  "type": "structured",
  "title": "Who is the King of England?",
  "sections": [
    {
      "text": "Charles III"
    }
  ]
}
```

## Query for similar questions

Suppose you wanted to find the answer to a question related to this example.
You can put <Config v="names.product"/> into a document-matching mode by
setting `semantics` to `response`. For example:

```json showLineNumbers title="https://api.vectara.io/v2/query"
{
  "query": "Who's the English monarch?",
  "search": {
    "corpora": [
      {
        "corpus_key": "faq-corpus",
        "semantics": "response"
      }
    ],
    "offset": 0,
    "limit": 10
  }
}
```

This `response` setting disables <Config v="names.product"/>'s "question-answering" mode and
instead tells it to find similar questions. This setting is useful when the 
objective is to discover content that is similar in context or subject matter 
to a given query

You can also add a [filter expression](/docs/learn/metadata-search-filtering/filter-overview)
of `part.is_title = true` to *only* match the questions.

## Combine question matching and answering

Expanding on the previous example, we can help users find question or answer
matches together by using querying multiple corpora. For example:

```json showLineNumbers title="https://api.vectara.io/v2/query"
{
  "query": "Who's the English monarch?",
  "search": {
    "corpora": [
      {
        "corpus_key": "faq-corpus",
        "semantics": "response",
        "metadata_filter": "part.metadata.is_title = true"
      },
      {
        "corpus_key": "faq-corpus",
        "metadata_filter": "part.metadata.is_title IS NULL"
      }
    ],
    "offset": 0,
    "limit": 10
  }
}
```
