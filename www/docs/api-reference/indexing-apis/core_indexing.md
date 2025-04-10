---
id: core_indexing
title: Low-level Indexing API Definition
sidebar_label: Low-level Indexing API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

The Low-level Indexing API provides low-level access to the semantic indexing
capabilities of the <Config v="names.product"/> platform. It focuses on document `parts` which allow for
specific text and context definitions within a document. This approach differs
from the [Standard Indexing API](indexing) which organizes documents
into sections that have IDs, titles, and descriptions, like traditional,
hierarchical document structures.

This more granular control over documents enables you to tailor your indexing
strategies. The Low-level Indexing API is reserved for advanced use cases and
normal users should use the Standard Indexing API.

:::tip

Check out our [**interactive API Reference**](/docs/rest-api/create-corpus-document) that lets you experiment
with this endpoint to index documents from your browser.

:::

### Low-level Index Document Request and Response

The low-level indexing service accepts individual documents or messages to
be indexed. In a short period of time, generally a few minutes, the new
content becomes available in the search index. This index request requires the
following parameters:

- Customer ID
- Corpus ID
- Document object

The response includes a `status` message and a `StorageQuota` message
indicating how much quota was consumed.

## Document Container Definition

The `document` object contains the related textual items that are indexed.
This object has a `document_id`, which must be unique among all the documents in
the same corpus. It may optionally define `metadata_json`.

The two fields `default_part_context` and `custom_dims` (Scale only) provide
default values for the corresponding sub-document fields, should they fail to
define either of these explicitly.

### Parts within a Document

Most importantly, `parts` defines the actual text items that you want to index.
The document _part_ is the atomic unit of <Config v="names.product"/>. Every
part is added to the index, and when search results are returned, each result
is a document part.

The `text` field defines the text and should generally be a sentence. It
should not be shorter, but may be longer, up to the length of an entire
paragraph, although performance may suffer.

The `context` defines the context of the text. It may include any additional
textual information that helps in disambiguating the meaning. For instance, it
may include the preceding or following paragraphs, the chapter title, or the
document title.

The part metadata, held in `metadata_json`, is returned with the document part
in search query results. For example, it can contain information that links the
item to records in other systems.

For Scale users, `custom_dims` allows you to specify additional factors that can be
used at query time to control the ranking of results. The dimensions must be
defined ahead of time for the corpus, or else they'll be ignored.

## REST Example

### Low-level Indexing REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v2/corpora/:corpus_key/documents</code>

The API Reference shows the full [Low-level Indexing REST definition](/docs/rest-api/create-corpus-document).

## gRPC Example

You can find the full Low-level Indexing gRPC definition at [indexing_core.proto](https://github.com/vectara/protos/blob/main/indexing_core.proto).

A request to add data into a corpus consists of three key pieces of information:
the customer ID, the corpus ID, and the data itself, represented as a
`CoreDocument` message.

The reply from the server consists of nothing yet. Note that the reply does not
block. In other words, the information in the request is not yet available in
the index when the RPC returns.

The full definition also shows the `CoreDocument` container format, which has
metadata about the document, and parts within the document as `CoreDocumentPart`.
