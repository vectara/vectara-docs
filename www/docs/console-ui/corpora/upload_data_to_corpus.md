---
id: upload-data-to-corpus
title: Upload Data to Corpus
sidebar_label: Upload Data to Corpus
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

You can upload data to the corpus from the **Data** tab.

1. Navigate to your corpus.
2. Select the **Data** tab.  
   If the corpus already contains data, a list of documents appears in a table.
3. Select or drag and drop files to upload. The files cannot exceed 10 MB.  
   You can upload Word, PDF, Markdown, Powerpoint, and other file types from 
   our [supported list](/docs/api-reference/indexing-apis/file-upload/file-upload-filetypes).  
   ![Upload data to the corpus](/img/upload_data_to_corpus_console.png)
4. (Optional) Enable the **Extract data data from PDFs** option. For more 
   information, see [Querying Table Data](/docs/learn/querying-table-data).
5. (Optional) Specify additional metadata with a JSON object that you want to 
   associate with the extracted document.
6. (Optional) Select a chunking strategy as **Sentence chunking** (default) or 
   **Max-characters** chunking.
7. Go back to the **Data** tab to view the uploaded documents.

## Asynchronous uploads

* Uploads continue in the background even if you navigate away from this 
  page.
* Monitor active uploads through the [**File uploads**](https://console.vectara.com/console/corpora/uploads) tab under 
  [**View All Corpora**](https://console.vectara.com/console/corpora).
* Progress indicators show upload status.
* Navigate back to the corresponding corpus from the **File uploads** tab.

