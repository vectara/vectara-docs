---
id: select-ideal-indexing-api
title: Select the Ideal Indexing API for Your Needs
sidebar_label: Select the Ideal Indexing API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

Selecting the ideal Indexing API for your application can significantly impact 
the effectiveness of integrating Vectara’s search functionalities into your 
application. The best indexing method depends on your needs, such as when you 
have semi-structured or unstructured documents, or if you want more granular 
control over the data segmentation and indexing process.

Vectara offers the following indexing APIs for these different scenarios:


* [File Upload API](/docs/api-reference/indexing-apis/file-upload/file-upload)

  If you want to extract text from existing, unstructured documents in common 
  file types with minimal manual intervention, use the File Upload API.

  We recommend this option if you haven't written your own extraction logic 
  already.  

  user-supplied metadata beyond what is extracted by the Vectara platform when 
  you upload the `file`. You can still optionally attach metadata by formatting 
  your data as JSON.


* [Standard Indexing API](/docs/api-reference/indexing-apis/indexing)
  
  If you have structured documents that you want Vectara to index and chunk 
  for you, use the standard indexing API. In Vectara, a `document` is very 
  flexible in what it can represent. It can be as short as a tweet or as long 
  as the Bible. The document typically includes 
  unique identifiers like title, description, and metadata that you can 
  leverage. The document is also broken down into sections. Each `section` can 
  have a unique `id`, `title`, `text`, and `metadata`.

  We recommend this option for applications where documents already have a 
  clear and consistent structure like news articles, product descriptions, 
  rows in database tables or CSV files, or records from an ERP system.


* [Low-Level Indexing API](/docs/api-reference/indexing-apis/core_indexing)

  For the most advanced use cases, if you want full, granular control to chunk 
  your document into parts, use the low-level indexing API. These documents also 
  have a unique ID and metadata, but you also define document `parts` that 
  break down into individual `text` blocks, `context`, `metadata`, and custom 
  dimensions. 

  We recommend this option for Machine Learning teams with expertise in neural
  information retrieval, who want low-level control over how documents are 
  indexed in our systems. Using the low-level API typically involves a formal 
  and large coordination with our team.
  
