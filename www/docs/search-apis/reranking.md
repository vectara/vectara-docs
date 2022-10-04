---
id: reranking
title: Reranking Search Results
sidebar_label: Reranking
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '../definitions.md';
import {vars} from '@site/static/variables.json';

Reranking is the process by which an initial set of query results is rescored
to produce a more refined and accurate ranking. It's usually performed with a
machine learned model that, in contrast to the extremely fast retrieval step,
is slower but more accurate.

Reranking is a beta feature in the platform, and only available as a single
reranker for English results, and can be enabled by specifying 272725717 as
the `reranker_id`.

In order to use the reranker you need to specify two additional parameters in
the request: `start` and `numResults`.  These tell <Config v="names.product"/>
which results to rerank.  In most scenarios, it makes sense to set `start` to
0 so that you're reranking all of the best initial results, and then to set
`numResults` to the total number of documents you wish to rerank.