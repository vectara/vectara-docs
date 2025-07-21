---
id: interpreting-scores
title: Interpreting Scores
sidebar_label: Interpreting Scores
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import CodePanel from '@site/src/theme/CodePanel';


Like all information retrieval systems, <Config v="names.product"/> scores documents on how
relevant they are to the query. It's important to understand the scoring 
system and how it changes based on the controls and query parameters you have 
provided.

Out of the box scores in <Config v="names.product"/>:
1. Can be either positive or negative
2. Are larger/more positive as relevance is increased
3. Are between -1 and 1 when not [reranked](/docs/api-reference/search-apis/reranking)
4. Can be any real number -- positive or negative -- when
[reranked](/docs/api-reference/search-apis/reranking).  However, scores when reranked are
*typically* between about -10 and 10

See the sections below on "standard" and "reranked" results for details on
how they differ and how to use them best.

:::note

Vectara provides an important control that can affect scores:
[**custom dimensions**](/docs/learn/semantic-search/add-custom-dimensions), which allow you to boost 
or bury results based on metadata.

:::


## Comparison with keyword systems

If you've used a keyword-based system (BM25, TF/IDF, etc) and are used to the
scoring mechanics, it's worth discussing the differences so you can understand
what to expect with <Config v="names.product"/>.

### Limiting number of results

Unlike keyword systems which *only* match documents that *exactly* match
the term(s) that have been searched, <Config v="names.product"/>
attempts to produce scores for the majority of documents in a corpus -- even
those that have low relevance to the given query.  For some use cases, it's
desirable to have as many pages of results as possible, but for others, you
may wish to apply logic to limit the number of results that are shown in the
website or application.

In general, you can safely stop showing results with scores below 0.1 in all
cases and below around 2 when using the reranker for most use cases.  A more
robust strategy for limiting results is to look for a sudden drop in scores.
For example, if the scores are [0.7, 0.6, 0.55, 0.5, 0.2, 0.14], the large drop
from 0.5 to 0.2 means results have gotten significantly worse, and can be used
as a signal to stop returning results.

### Comparing results across time and corpora

One of the advantages of <Config v="names.product"/>'s scoring system is that
results are comparable across both different points in time and completely
different corpora, even after you've indexed additional/different documents.
This means you can split up your data across any corpora and not worry about
how that splitting may affect scoring.  This is because, unlike most keyword
systems, <Config v="names.product"/> does not rely on how **relatively** rare
a term or set of terms is, but rather the absolute semantic significance of a
document to a query.

### Multilingual

Most keyword-derived search systems will instruct you to separate content for
different languages into different corpora or indices because some terms are
extremely common in one language but extremely rare in a different language.
Splitting the indices helps ensure accurate term statistics. <Config v="names.product"/>
is different here, because it provides the *absolute* semantic significance
scores.  That is, <Config v="names.product"/> isn't sensitive to situations
like that where indexing a set of Spanish documents containing the word "hay"
(a common word in Spanish) decreases the relevance of an English document in
the same corpus that talks about the grain "hay" because <Config v="names.product"/>
takes the language and context into account by default.

## Standard results response

By default, results from <Config v="names.product"/> will be scored on a scale
from -1 to 1, with 1 being a perfect match and -1 having absolutely nothing to
do with the query.  In practice, the vast majority will be scored between 0
and 1.

As with most search systems, there is no hard rule around when to cut off
results as no longer very relevant.  However, as a general rule, scores less
than 0.1 tend to be of low quality and can typically be safely removed/ignored.

## Reranked results response

Scores from <Config v="names.product"/> after [reranking](/docs/api-reference/search-apis/reranking) are scored on a
scale from -infinity to +infinity.  Internally, the numbers returned from the
reranker are derived from a logarithmic scoring system, which means that in
practice, scores much higher than 10 or much lower than -10 should be rare.

As with standard results, there's no hard rule around when to cut off results,
but scores above around 2.5 or so tend to be pretty good, though we advise
users to test with their own data and some sample queries.
