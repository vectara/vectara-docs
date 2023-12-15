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

Selecting the ideal Indexing API for your application depends on your needs, 
such as when you have structured or unstructured documents, or if you need 
more granular control over the indexing process. Vectara offers the following 
indexing APIs for these different scenarios.

* [File Upload API](/docs/api-reference/indexing-apis/file-upload/file-upload)

  If you mainly want to extract text from existing, unstructured documents, use 
  the File Upload API.

* [Standard Indexing API](/docs/api-reference/indexing-apis/indexing)
  
  If you have structured documents that you want Vectara to index and chunk for 
  you, use the standard indexing API. The document typically includes unique 
  identifiers like title, description, and medtadata. The document is also 
  structured into sections that each can have a unique ID, title, text, 
  metadata, and so on.

* [Low-Level Indexing API](/docs/api-reference/indexing-apis/core_indexing)

  For the most advanced use cases, if you want full, granular control in what 
  you want your document chunks to be, use the low-level indexing API. These 
  documents also have a unique ID and metadata, but you also define document
  `parts`:
    - `text` - A part of the document, such as a sentence
    - `context` - The more nuanced textual information that defines context, which 
      may include preceding or following paragraphs.
    - `metadataJson` - The JSON string that provides more metadata about this part
      of the document.