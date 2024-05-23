---
id: indexing
title: Standard Indexing API Definition
sidebar_label: Standard Indexing API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

The first step in using <Config v="names.product"/> is to index a set of related 
documents or content into a corpus. Indexing a document enables you to make 
data available for search and retrieval more efficiently. The Create Corpus 
Document API lets you add documents that are either in a typical structured 
format, or in a format that explicitly specifies each document part that 
becomes a search result. 

Our indexing capability transforms this structured data into a 
format that enables the data to become easily searchable in just a few 
seconds. We also support a variety of data formats by allowing you to specify 
multiple document attributes and metadata. You can also specify whether to 
stream the result or receive a complete response.

:::tip

* Check out our [**interactive API Playground**](/docs/rest-api/create-corpus-document) that shows the full 
  Index REST definition and lets you experiment with this endpoint to index 
  documents from your browser.

:::

### Index Document Request and Response

To index a document, send a POST request to `/v2/corpora/{corpus_key}/documents`, 
where `{corpus_key}` is the unique identifier for the corpus where you want to 
add the document. The request body contains a `CreateDocumentRequest` object 
that represents the document to be indexed. This object has a `type` parameter 
that determines the format of the document as `core` or `structured`.

Depending on the document type, there are required properties and any optional 
`metadata` or Scale-only properties like `custom_dimensions`.

The response includes a `status` message and a `StorageQuota` message
indicating how much quota was consumed. An `ALREADY_EXISTS` status code 
indicates how much quota would have been consumed.

* `core` - Specifies a document structure that closely corresponds to 
  Vectara's internal document data model, containing an `id`, `metadata`, and an 
  array of `document_parts` which contain their own `text`, `metadata`, `context`, 
  and `custom_dimensions`.
* `structured` - Specifies a document structure with layout features such as 
  `title`, `description`, `metadata`, `custom_dimensions`, and an array of 
  `sections`. These sections each have an `id`, `title`, `text`, `metadata`, 
  and nested `sections`.

:::note

The storage quota object returns the number of characters consumed and the 
number of metadata characters consumed. The total quota consumed is simply the 
sum of both values.

:::

## Core Document Object Definition

A `core` document object has a unique `id`, `metadata`, and an array of 
`document_parts` which contain their own `text`, `metadata`, `context`, and 
`custom_dimensions`. 

The `document_parts` object defines the actual text items that you want to 
index. The document part is the atomic unit of Vectara. Every part is added to 
the index, and when search results are returned, each result is a document part.

The `text` field defines the text and should generally be a sentence. It 
should not be shorter, but may be longer, up to the length of an entire 
paragraph, although performance may suffer.

The `metadata` is returned with the document part in search query results. For 
example, it can contain information that links the item to records in other 
systems.

The `context` defines the context of the text. It may include any additional 
textual information that helps in disambiguating the meaning. For instance, 
it may include the preceding or following paragraphs, the chapter title, or 
the document title.

For Scale users, `custom_dimensions` allows you to specify additional factors 
that can be used at query time to control the ranking of results. The 
dimensions must be defined ahead of time for the corpus, or else they'll be ignored.

## Structured Document Object Definition

A `structured` document object encapsulates the information about the data that you want 
to index. A **document** in Vectara is very flexible because it represent a 
short tweet or book with thousands of pages. This object has a `document_id` 
which must be unique among all the documents in the same corpus. The document 
may optionally speciify a `title`, `description`, and `metadata`. The core of 
the document is also structured in `sections` that can include unique 
identifiers, titles, strings, metadata, and so on. 

The `custom_dims` field (Scale only) provides default values for the 
corresponding section fields, should they fail to define them explicitly. 
Most importantly, `section` defines the actual textual matter. Documents can 
also have multiple sections.

### Section within a Document

A section represents an organizational subunit within a document. Its 
definition is recursive, since a section can be composed of further `sections`.

The actual textual content, which is at least a single sentence, but might span
several paragraphs or more, is stored in `text`. Like a document, it may
optionally specify a `title`, which semantically corresponds to a section
header or chapter title.

Sections provide flexibility, and it's possible that a section specifies a 
title, but relegates the text to subsections. For instance, consider the 
following simple document excerpt from Wikipedia:

> ## History
>
> ### First inhabitants
>
> Settled by successive waves of arrivals during at least the last 13,000
> years,[41] California was one of the most culturally and linguistically diverse
> areas in pre-Columbian North America. Various estimates of the native population
> range from 100,000 to 300,000.[42] The indigenous peoples of California included
> more than 70 distinct ethnic groups of Native Americans, ranging from large,
> settled populations living on the coast to groups in the interior. California
> groups also were diverse in their political organization with bands, tribes,
> villages, and on the resource-rich coasts, large chiefdoms, such as the Chumash,
> Pomo and Salinan. Trade, intermarriage and military alliances fostered many
> social and economic relationships among the diverse groups.
>
> ### Spanish rule
>
> The first Europeans to explore the California coast were the members of a
> Spanish sailing expedition led by Portuguese captain Juan Rodríguez Cabrillo;
> they entered San Diego Bay on September 28, 1542, and reached at least as far
> north as San Miguel Island. Privateer and explorer Francis Drake explored
> and claimed an undefined portion of the California coast in 1579, landing north
> of the future city of San Francisco. The first Asians to set foot on what
> would be the United States occurred in 1587, when Filipino sailors arrived in
> Spanish ships at Morro Bay. Sebastián Vizcaíno explored and
> mapped the coast of California in 1602 for New Spain, sailing as far north as
> Cape Mendocino.

This could be represented as a top-level section titled "History" and no text.
It would contain two sections, "First inhabitants" and "Spanish rule" that both
specify text.

The part metadata, held in `metadata_json`, is returned in search query
results. It can contain, for example, information that links the item to records
in other systems.

For Scale only users, `custom_dims` allows you to specify additional factors 
that can be used at query time to control the ranking of results. The 
custom dimensions must be defined ahead of time for the corpus, or else 
they'll be ignored.

## REST 2.0 Example

### Indexing REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/index</code>

The API Playground shows the full [Indexing REST definition](/docs/rest-api/create-corpus-document).

## Standard Indexing gRPC Example 

You can find the full Standard Indexing gRPC definition at [indexing.proto](https://github.com/vectara/protos/blob/main/indexing.proto).

For `IndexDocumentRequest`, the reply does not block. The information in the request 
is not necessarily available in the 
index when the RPC returns. In most cases, it becomes available within a second.

The full definition also shows the `Document` format, and a `Section` within 
the document, including metadata about the section.


## Core Document gRPC Example

You can find the full core document, also known as the Low-level Indexing gRPC 
definition at [indexing_core.proto](https://github.com/vectara/protos/blob/main/indexing_core.proto).

A request to add data into a corpus consists of three key pieces of 
information: the customer ID, the corpus ID, and the data itself, represented 
as a `CoreDocument` message.

The reply from the server consists of nothing yet. Note that the reply does 
not block. In other words, the information in the request is not yet available 
in the index when the RPC returns.

The full definition also shows the `CoreDocument` container format, which has 
metadata about the document, and parts within the document as `CoreDocumentPart`.

### Custom Dimensions Use Cases (Scale only)

Custom dimensions are a powerful <Config v="names.product"/> capability for 
our Scale users. Custom dimensions enable you to attach numeric factors to 
every item in the index, which affect its final ranking during searches. Some 
example use cases include:

1. Define the authoritativeness of the content.

   For example, content with 100
   upvotes can be ranked higher than content with no upvotes and 10 downvotes.
2. Indicate the source of the content.

   If there are N sources, this is usually done by defining N custom
   dimensions, and treating them as boolean 0-1 fields.
   This allows weighting results based on source, or even excluding certain
   sources altogether.

   For example, content from a government FAQ would be rated
   higher than content from a user forum.
3. Define the geography in which content is relevant.
4. Indicate the publication date which makes it easy to weight more recent
   results higher.

For more information on how to use custom dimensions, refer to the
[Custom Dimensions Usage Documentation](/docs/learn/semantic-search/add-custom-dimensions)

