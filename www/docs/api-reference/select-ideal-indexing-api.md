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

Selecting the ideal Indexing API depends on your needs, such as when you have
unstructured files, structured documents, or you need more granular control 
over the indexing process. Vectara offers the following indexing APIs for 
these different scenarios.

* [File Upload API](/docs/api-reference/indexing-apis/file-upload/file-upload)

  If you mainly want to extract text from existing documents, use the File 
  Upload API. You can also drag-and-drop documents in the Console UI.

* [Standard Indexing API](/docs/api-reference/indexing-apis/indexing)
  
  If you have structured documents that you want us to index and chunk for 
  you, use the standard indexing API. The document can include sections with 
  titles, text, and metadata. 

* [Low-Level Indexing API](/docs/api-reference/indexing-apis/core_indexing)

  For the most advanced use cases, if you want full, granular control in what you want your document chunks to 
  be, use the low-level indexing API.