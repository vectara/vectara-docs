---
id: relevance-tuning-techniques
title: Relevance Tuning Techniques
sidebar_label: Relevance Tuning Techniques
---

import {Config} from '@site/docs/definitions.md';

By default, <Config v="names.product"/> uses a form of "question-answer"
similarity to produce the scoring. This provides a very robust ability to
answer your users questions. By default, scores go from -1 to 1 where a
score of -1 would be "completely irrelevant" and a score of 1 would be a
near/exact match. There are several controls which affect these scores and
the associated result rankings.

## Custom dimensions

[Custom dimensions](/docs/1.0/learn/semantic-search/add-custom-dimensions) provide [our Scale users](https://vectara.com/pricing/) with a fixed set 
of additional "dimensions" that contain user-defined numerical values and are 
stored in addition to the vectors that <Config v="names.product"/> automatically 
extracts and stores from the text. At query time, users can use these custom 
dimensions to increase or decrease the resulting score dynamically, query by query.

Custom dimensions are great to hold metadata like "upvotes" of a post, number
of times a product has been purchased, and similar measures of business/relevance
value.

## Hybrid search

By default, <Config v="names.product"/> uses purely semantic similarity when
evaluating whether a document/section is responsive to a particular search.
However, we often find that with a _slight_ introduction of keyword-focused
algorithms, the relevance can be much better. <Config v="names.product"/>
supports this out of the box via [hybrid search](/docs/1.0/learn/hybrid-search).

## Alternative similarity measures

While <Config v="names.product"/> uses question-answer style similarity by
default, sometimes it's advantageous to use document-document similarity. For
example, think of a case where a user asks "where can I find great tacos?" You
typically wouldn't want to match the _closest_ document to that question (e.g.
one that just has the text "where can I find great tacos") but instead a document
that _answers_ that question (e.g. "you can find the best tacos at **\_\_\_**").

However, there are times when finding the most semantically similar documents
is advantageous. In particular, [recommendation systems](/docs/1.0/learn/recommendation-systems/recommender-overview)
tend to make heavy use of document similarity metrics. However, these can be
useful in other use cases as well, including [matching questions](/docs/1.0/learn/question-answer/question-answer-overview)
in FAQ search systems.

## Interpreting scores

If you want to understand a bit more about why <Config v="names.product"/>
produced a particular score, have a look at our
[interpreting scores](/docs/1.0/api-reference/search-apis/interpreting-responses/interpreting-scores)
documentation.

## Low-level indexing controls

Sometimes, the best solution to changing relevance is by adjusting the low-level
indexing controls. <Config v="names.product"/> supports fine-grained tuning of
this in the [low-level](/docs/1.0/api-reference/indexing-apis/core_indexing) API.
There, you can pre-segment your documents into sections, and
tell <Config v="names.product"/> what the context is around the documents.

Note that we do consider that anyone that _needs_ to use this API as a bit of a
failure on our side to providing robust-enough APIs! If you find that you need
to use this API because you're getting poor quality without it, please do
[let us know](https://discuss.vectara.com) about your use case so we can consider
adding structured APIs around it.
