---
id: indexing
title: Indexing
sidebar_label: API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The first step in using <Config v="names.product"/> is to index a set of related documents
or content into a corpus. This reference page provides a detailed guide for how
to do that.

## Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/index</code>
This page describes the details of interacting with this endpoint.

## Full Definition

The full definition of the gRPC interface is covered below.

### Service

The indexing service operates by accepting individual documents or messages to be indexed. In a short period of time, generally a few minutes, the new content will become available in the search index.

The definition of the service is shown below.


```protobuf
service IndexService {
  // Adds a document to the corpus.
  rpc Index(IndexDocumentRequest) returns (IndexDocumentResponse) {}

  // Deletes a document from the corpus.
  rpc Delete(DeleteDocumentRequest) returns (DeleteDocumentResponse) {}
}
```

## Index Document

A request to add data into a corpus consists of three key pieces of information:
the customer ID, the corpus ID, and the data itself, represented as a
**Document** message.

<pre>{`
message IndexDocumentRequest {
  int64 customer_id = 1;
  int64 corpus_id = 2;
  ${vars['package.protobuf']}.indexing.Document document = 3;
}
`}</pre>

The reply from the server consists of nothing yet. Note that the reply does not
block. In other words, the information in the request is not yet available in
the index when the RPC returns.

```protobuf
message IndexDocumentResponse {
}
```

### Document

A document is a piece of coherent textual matter. It defines an ID,
**document_id**, which must be unique among all the documents in
the same corpus. It may optionally specify a **title** and a **description**,
as well as metadata in **metadata_json**.

The field **custom_dims**, provide default values for the corresponding
section fields, should they fail to define them explicitly.

Most importantly, **section** defines the actual textual matter.

```protobuf
message Document {
  // Client assigned document ID to this document.
  string document_id = 1;
  // The title of the document.
  string title = 2;
  // An optional description for the document.
  string description = 3;
  // Metadata about the document. This should be a json string, and it can be
  // retrieved at query time.
  string metadata_json = 4;
  // A list of custom dimension values that are included in the generated
  // representation of all sections.
  repeated CustomDimension custom_dims = 5;

  // The actual content of the document, structured as a repeating list
  // of sections.
  repeated Section section = 10;
}

```

### Section

A section represents an organizational subunit within a document. Its definition
is recursive, since a section can be composed of further **sections**.

The actual textual content, which is at least a single sentence, but might span
several paragraphs or more, is stored in **text**. Like a Document, it may
optionally specify a **title**, which semantically corresponds to a section
header or chapter title.

Sections are flexible, and it's possible that a section specifies a title, but
relegates the text to subsections. For instance, consider the following simple
document, excerpted from Wikipedia:

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

The part metadata, held in **metadata_json**, is returned in search query
results. It can contain, for example, information that links the item to records
in other systems.

Finally, **custom_dims** allows you to specify additional factors that can be
used at query time to control the ranking of results. The dimensions must be
defined ahead of time for the corpus, or else they'll be ignored.


```protobuf
message Section {
  // Optionally, the unique ID of this section. If set, it will be returned as
  // metadata in query results.
  int32 id = 1;
  // Optionally, the title of the section. This may be empty.
  string title = 2;
  // The text of the section. This should never be empty.
  string text = 3;
  // Metadata about this section. This should be a json string. It is passed
  // through the system, without being used at indexing time. It can be
  // retrieved at query time.
  string metadata_json = 4;
  // A list of custom dimension values that are included in the generated
  // representation of all subsections (i.e. sections contains by this section).
  repeated CustomDimension custom_dims = 5;

  // A list of subsections.
  repeated Section section = 10;
}
```

### Custom Dimension

Custom dimensions are a powerful feature of <Config v="names.product"/>. They allow you to
attach numeric factors to every item in the index, which affect its final
ranking during searches. Some example use cases include:

1. Defining the authoritativeness of the content. For example, content with 100
   upvotes can be ranked higher than content with no upvotes and 10 downvotes.
2. Indicating the source of the content. If there are N sources, this is usually
   done by defining N custom dimensions, and treating them as boolean 0-1 fields.
   This allows weighting results based on source, or even excluding certain
   sources altogether. For example, content from a government FAQ would be rated
   higher than content from a user forum.
3. Defining the geography in which content is relevant.
4. Indicating the publication date. This makes it easy to weight more recent
   results higher.

```protobuf
message CustomDimension {
  string name = 1;
  double value = 2;
}
```

For more information on how to use custom dimensions, refer to the
[Custom Dimensions Usage Documentation](/docs/common-use-cases/semantic-search/custom_dimensions.md)

## Frequently Asked Questions

### Error received from peer...Trying to connect an http1.x server

You are receiving this error message because you are trying to connect via
an insecure channel. The endpoint only allows secure (TLS) connections.

This is bad:

```python
grpc.insecure_channel(...)
```
