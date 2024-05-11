---
id: select-ideal-indexing-api
title: Indexing
sidebar_label: Indexing
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

Vectara offers multiple data ingestion methods to accommodate different types 
of use cases. By choosing the appropriate ingestion method, users can 
efficiently index their data and leverage our advanced search capabilities. 
This flexible approach allows for the precise integration of Vectara’s search 
functionalities into different applications.

## Vectara Ingest: Sample Data Ingestion Framework

Getting data into Vectara is simple using either our REST or gRPC APIs. We 
built a full sample ingestion framework ready to go with [Vectara Ingest](https://github.com/vectara/vectara-ingest), which 
includes preconfigured templates that enable you to pull data from many 
popular data sources such as websites and RSS feeds.

## Data Ingestion with the Indexing APIs

Selecting the ideal Indexing API for your application can significantly impact 
the effectiveness of integrating Vectara’s search functionalities into your 
application. The best indexing method depends on your needs, such as when you 
have semi-structured or unstructured documents, or if you want more granular 
control over the data segmentation and indexing process.

Vectara offers the following indexing APIs for these different scenarios:

### File Upload API

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

### Standard Indexing API
  
  If you have structured documents that you want Vectara to index and segment
  into chunks for you, use the [Standard Indexing API](/docs/api-reference/indexing-apis/indexing). In Vectara, a `document` 
  is very flexible in what it can represent. It can be as short as a tweet or 
  as long as the 1600 page Bible. The `document` object typically includes 
  unique identifiers like `title`, `description`, and `metadata` that you can 
  leverage. The document is also broken down into sections. Each `section` can 
  have a unique `id`, `title`, `text`, and `metadata`. Each section can also 
  contain other sections.

  We recommend this option for applications where documents already have a 
  clear and consistent structure like news articles, product descriptions, 
  rows in database tables or CSV files, or records from an ERP system.


### Low-Level Indexing API

  For the most advanced use cases, if you want full, granular control to chunk 
  your document into `parts`, use the [Low-level Indexing API](/docs/api-reference/indexing-apis/core_indexing). These documents 
  also have a unique ID and metadata, but you also define individual document 
  `parts` which make up granular sections of the overall document container. 
  These parts define the actual text to be indexed. Each part is converted 
  into exactly one vector in the underlying index. Each part can contain 
  individual `text` blocks, `context`, and` metadata`, as well as custom dimension 
  values that affect ranking results.
  
  We recommend this option for Machine Learning teams with expertise in neural
  information retrieval who want low-level control over how documents are 
  indexed in our systems. Using the low-level API typically involves 
  significant coordination between your Machine Learning team and 
  organizational stakeholders.
