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
data available for search and retrieval more efficiently. The Standard 
Indexing API is recommended for applications where documents already have a 
clear and consistent structure.

Our Standard Indexing capability transforms this structured data into a 
format that enables the data to become easily searchable in just a few 
seconds. We also support a variety of data formats by allowing you to specify 
multiple document attributes and metadata.

:::tip

* Check out our [**interactive API Playground**](/docs/rest-api/index) that lets you experiment 
with this endpoint to index documents from your browser.
* We also provide REST Index examples in in [**C#**](/docs/getting-started-samples/RestIndexData.cs), [**Java**](/docs/getting-started-samples/RestIndex.java), [**NodeJS**](/docs/getting-started-samples/index_document.js), [**PHP**](/docs/getting-started-samples/indexDocument.php), and [**Python**](/docs/getting-started-samples/rest_index_document.py).

:::

### Index Document Request and Response

The request that adds data into a corpus provides essential information about 
the document you want to index. A document is a piece of coherent textual 
matter. This index request requires the following parameters:

* Customer ID 
* Corpus ID
* Document object

The response includes a `status` message and a `StorageQuota` message
indicating how much quota was consumed. An `ALREADY_EXISTS` status code 
indicates how much quota would have been consumed.

:::note

The storage quota object returns the number of characters consumed and the 
number of metadata characters consumed. The total quota consumed is simply the 
sum of both values.

:::

## Document Object Definition

A `document` object encapsulates the information about the data that you want 
to index. A **document** in Vectara is very flexible because it represent a 
short tweet or book with thousands of pages. This object has a `document_id` 
which must be unique among all the documents in the same corpus. The document 
may optionally speciify a `title`, `description`, and `metadata`. The core of 
the document is also structured in `sections` that can include unique 
identifiers, titles, strings, metadata, and so on. 

The `custom_dims` field provides default values for the corresponding
section fields, should they fail to define them explicitly. Most importantly, 
`section` defines the actual textual matter.

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

Finally, `custom_dims` allows you to specify additional factors that can be
used at query time to control the ranking of results. The dimensions must be
defined ahead of time for the corpus, or else they'll be ignored.

## REST Example

### Standard Indexing REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/index</code>

### Index Request and Response

The request body provides essential information about the document you want to
index. The Index request requires the following parameters:

* `customerID`
* `corpusID`
* `document` object


```json
{
  "customerId": 123456789,
  "corpusId": 5,
  "document": {
    "documentId": "issbn-9781405053976",
    "title": "The Hitchhiker's Guide to the Galaxy",
    "description": "A great book with the answer to life, the universe, and everything",
    "metadataJson": "{\"author\": \"Douglas Adams\"}",
    "section": [
      {
        "title": "Intro",
        "text": "Far out in the uncharted backwaters of the unfashionable end of the western spiral arm of the Galaxy lies a small unregarded yellow sun.",
        "metadataJson": "{\"page\": 1}"
      },
      {
        "title": "The answer",
        "text": "The Answer to the Great Question ... Of Life, the Universe and Everything ... Is ... Forty-two.",
        "metadataJson": "{\"speaker\": \"Deep Thought\"}"
      }
    ]
  }
}
```
The response from the server includes a status code and the amount of quota
consumed:

```json
{
  "status": {
    "code": "OK",
    "statusDetail": "",
    "cause": null
  },
  "quotaConsumed": {
    "numChars": "348",
    "numMetadataChars": "469"
  }
}
```
## gRPC Example 

You can find the full Standard Indexing gRPC definition at [indexing.proto](https://github.com/vectara/protos/blob/main/indexing.proto).

### Index Document Request and Response

<pre>{`
message IndexDocumentRequest {
  int64 customer_id = 1;
  int64 corpus_id = 2;
  ${vars['package.protobuf']}.indexing.Document document = 3;
}
`}</pre>

:::note

The reply does not block. The information in the request is not necessarily 
available in the index when the RPC returns. In most cases, it becomes 
available within a second.

:::

Here is an example response:

```protobuf
message IndexDocumentResponse {
  // If ALREADY_EXISTS, it means the document was already indexed, and no new
  // quota was consumed.
  Status status = 1;

  // The storage quota needed for the document indexed in the request.
  // If "status" is ALREADY_EXISTS, it means that the document was already in
  // the index prior to this request. In such cases, quota is not consumed again
  // and the value in this field represents the quota consumed when the document
  // was indexed the first time.
  StorageQuota quota_consumed = 2;
}
```

```protobuf
message StorageQuota {
  // The number of chars from the document that consumed the storage quota.
  int64 num_chars = 1;
  // The number of chars in the metadata of the document that consumed the
  // storage quota.
  int64 num_metadata_chars = 2;
}
```
### Document Format

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

### Section within a Document

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

### Custom Dimensions Use Cases (Scale only)

Custom dimensions are a powerful <Config v="names.product"/> capability. Custom
dimensions enable you to attach numeric factors to every item in the index,
which affect its final ranking during searches. Some example use cases include:

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

```protobuf
message CustomDimension {
  string name = 1;
  double value = 2;
}
```

For more information on how to use custom dimensions, refer to the
[Custom Dimensions Usage Documentation](/docs/learn/semantic-search/add-custom-dimensions)

