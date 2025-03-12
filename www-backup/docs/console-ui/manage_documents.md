---
id: manage-documents
title: Manage Documents
sidebar_label: Manage Documents
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Data view provides information about each document ingested into 
the corpus, including the Document ID, title, size, date added, metadata, 
document parts, and table information.

This data helps you better manage the lifecycle of your documents by providing  
a quick way to check which documents are already in the index:

* Utilize the metadata to build custom search and filtering capabilities 
  into applications
* Gather Documentation IDs that you can reference for future purposes
  such as deletion for audit and compliance reasons.
* Delete documents from the corpus so that the data no longer appears in 
  queries.

## View Document List

To view a list of documents in the corpus:
1. Select a corpus.
2. Select the **Data** tab.

The list of document IDs shows the first 10 documents in the corpus. You can 
paginate with the next and previous buttons if you have more documents. This 
page also enables you to filter through your documents.

## View Document Details

Select a **Document ID** from the list to open the Document Overview. This 
shows the fields associated with the document and also a JSON string that 
you can copy. You can also delete the document permanently.

![List Document details](/img/document_overview_tab.png)

Select the **Parts** tab to view the parts of the ingested document. This table 
shows the Text, Context, and Metadata.

![View Document Parts](/img/parts_tab.png)

Select the **Tables** tab to view information about ingested tables, including 
their ID, Title, Rows, and Description. You can also select **View Table** in 
the Table column to view the rendered table.

![View Table Tab](/img/tables_tab.png)
