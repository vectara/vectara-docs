---
id: textless
title: Client-configurable data retention
sidebar_label: Configurable Data Retention
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from './definitions.md';

## Textless
When you create a corpus [via the API](/docs/admin-apis/create-corpus) or the
[UI](/docs/console-ui/creating-a-corpus), you will have the option to create it
and "don't store the text," also known as a "textless" mode.  When this is
enabled, several things happen in the platform.  This document talks about when
it's appropriate to enable textless, what happens on the platform, and what
benefits and limitations it brings.

## What happens when textless is enabled
When you enable `textless` on a corpus, <Config v="names.product"/> discards
the text content of the document immediately after it converts the text to a
vector.  At that point, the text is no longer recoverable and won't be
returned in any <Config v="names.product"/> APIs.

Note that <Config v="names.product"/> *does* retain any metadata -- including
document IDs -- that were supplied alongside the text.  This allows you to
retrieve the document from a separate system of record based on the ID to show
it and also allows <Config v="names.product"/> to perform any metadata-based
filtering on the document.

## Use cases
One use case for `textless` is when you have very sensitive text content.  By
enabling this feature, the text content becomes unrecoverable
to <Config v="names.company"/> or to any user that manages to query for and
find the document.

In general, this feature is optimal for use cases where the cost of any
information leakage is very high.  Note that <Config v="names.product"/> does
[encrypt documents](/docs/encryption)

## Limitations
Currently, the [reranking](/docs/search-apis/reranking) capability relies on
the text being stored.  As a result, attempting to rerank search results on any
corpora where text storage has been turned off will not work at this time.