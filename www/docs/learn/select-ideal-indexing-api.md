---
id: select-ideal-indexing-api
title: Data Ingestion
sidebar_label: Data Ingestion
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

Efficient data ingestion, also known as indexing, is critical for ensuring 
that your application delivers fast, accurate, and relevant query results. 
Whether handling structured, semi-structured, or unstructured data, selecting 
the right indexing method can significantly impact the performance and 
usability of your applications. Vectara offers multiple indexing methods to 
accommodate different use cases that enable users to efficiently index their 
data and leverage our advanced search capabilities. This flexible approach 
allows for the precise integration of Vectara’s search functionalities into 
different applications.

## Vectara Ingest: sample data ingestion framework

Getting data into Vectara is simple using either our REST or gRPC APIs. We 
built a full sample ingestion framework ready to go with [Vectara Ingest](https://github.com/vectara/vectara-ingest), which 
includes preconfigured templates that enable you to pull data from many 
popular data sources such as websites and RSS feeds.

## Data ingestion with the indexing APIs

Selecting the ideal Indexing API for your application can significantly impact 
the effectiveness of integrating Vectara’s search functionalities into your 
application. The best indexing method depends on your needs, such as when you 
have semi-structured or unstructured documents, or if you want more granular 
control over the data segmentation and indexing process.

Vectara offers the following indexing APIs for these different scenarios:

## File upload API

If you want to extract text from existing, unstructured documents in common 
file types with minimal manual intervention, use the [File Upload API](/docs/api-reference/indexing-apis/file-upload/file-upload). This 
option enables you to attach additional, user-defined metadata at the 
document level. 
  
You can also upload JSON versions of the same Document protocol buffers 
passed to the standard indexing API and the low-level indexing API, as long 
as the file ends with the `.json` extension. Our platform intelligently 
determines which flavor of document proto it's looking at. Note that sending 
any other kind of JSON to the indexing endpoint will cause it to error out.
  
We recommend this option if you have not written your own extraction logic 
already.

## Index document API
  
The Index Document API has a discriminator property `type` that determines the 
format of the document. The supported document types are `structured` and `core`.

### Structured document definition

If you have structured documents that you want Vectara to index and segment
into chunks for you, use the the `structured` type, which has a document with 
layout features such as `title`, `description`,` metadata`, `custom_dimensions`, and 
an array of `sections`. In Vectara, a `document` is very flexible in what it can 
represent. It can be as short as a tweet or as long as the 1600 page Bible.

The document is also broken down into sections. Each `sections` can 
have a unique `id`, `title`, `text`, and `metadata` and also contain other 
nested `sections`.
  
We recommend this option for applications where documents already have a 
clear and consistent structure like news articles, product descriptions, 
rows in database tables or CSV files, or records from an ERP system.

### Core document definition

For the most advanced use cases, if you want full, granular control to chunk 
your document into `document_parts`, use the `core` type, which has a document 
structure that closely corresponds to Vectara's internal document data model. 
It contains an `id`, `metadata`, and an array of individual `document_parts`, 
which make up granular sections of the overall document container. 
These parts define the actual text to be indexed. Each part is converted 
into exactly one vector in the underlying index. Each part can contain 
individual `text` blocks, `context`, and` metadata`, as well as custom dimension 
values that affect ranking results.
  
We recommend this option for Machine Learning teams with expertise in neural
information retrieval who want low-level control over how documents are 
indexed in our systems. Using the low-level API typically involves 
significant coordination between your Machine Learning team and 
organizational stakeholders.

By leveraging the appropriate data indexing method is based on the nature of 
your documents, you can ingest and structure your data for optimal performance 
with Vectara's Retrieval Augmented Generatation as-a-Service platform.

## Document chunking

Chunking refers to the process of breaking a document into smaller parts 
(chunks) for efficient indexing and retrieval. Chunking is critical for 
optimizing search performance, particularly for large documents and corpora.

Both the [File Upload API](/docs/api-reference/indexing-apis/file-upload/file-upload) and [Indexing API](/docs/api-reference/indexing-apis/indexing) provide an optional 
`chunking_strategy` parameter that enables you to define how to chunk 
documents during ingestion. When deciding on a chunking strategy, consider 
the trade-offs between granularity and latency.

### Default chunking

By default, the platform uses sentence-based chunking, where each chunk 
typically contains one complete sentence. This strategy can lead to higher 
retrieval latency for large documents due to the increased number of chunks 
created.

### Fixed-size chunking

When you set the `type` to `max_chars_chunking_strategy`, you can then define 
the maximum number of characters per chunk, which enables more granular control 
over how the platform splits the document. We recommend trying 3–7 sentences 
per chunk, which is about 512–1024 characters. This may be ideal for balancing 
retrieval latency and context preservation

