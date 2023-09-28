---
id: textless
title: Textless Mode
sidebar_label: Textless Mode
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';

When you create a corpus [via the API](/docs/api-reference/admin-apis/create-corpus) or the
[console UI](/docs/console-ui/creating-a-corpus), you have the option to **not** store 
the text, also known as a "textless" mode. This mode is useful when you have 
very sensitive text content. In this mode, the text content becomes 
unrecoverable to <Config v="names.product"/> or to any user who successfully queries and 
finds the document.

:::note

Textless mode is optimal for use cases where the cost of any
information leakage is very high. <Config v="names.product"/> does
[**encrypt documents**](encryption).

:::

## What happens in textless mode?

Let's look at when it's appropriate to enable textless, what happens on the 
platform, and what benefits and limitations it brings.

When you enable `textless` on a corpus, <Config v="names.product"/> discards
the text content of the document immediately after it converts the text to a
vector. At that point, the text is no longer recoverable. It also won't be 
returned in any <Config v="names.product"/> APIs.

Note that <Config v="names.product"/> **does** retain any metadata that were supplied 
alongside the text, including document IDs. This retention allows you to 
retrieve the document from a separate system of record based on the ID to show 
the metadata, and it also allows <Config v="names.product"/> to perform any metadata-based 
filtering on the document.

### Limitations

Currently, the [reranking](/docs/api-reference/search-apis/reranking) capability relies on
the text being stored.  As a result, attempting to rerank search results on any
corpora where text storage has been turned off will not work at this time.