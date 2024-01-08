---
id: manage-documents
title: Manage Documents
sidebar_label: Manage Documents
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The List Documents view provides information about each document ingested into 
the corpus, including  the Document ID, title, size, date added, and metadata. 
This data helps you better manage the lifecycle of your documents by providing  
a quick way to check which documents are already in the index:

* Utilize the metadata to build custom search and filtering capabilities 
  into applications
* Gather Documentation IDs that you can reference for future purposes
  such as deletion for audit and compliance reasons.
* Delete documents from the corpus so that the data no longer appears in 
  queries.


![List Documents](/img/list_documents.png)

The list shows the first 10 documents and you can paginate with the next and 
previous buttons if you have more documents in the corpus.


## View Document Details

Click a Document ID from the list to open the Document details panel. This 
shows the fields associated with the document and also a JSON string that 
you can copy. You can also delete the document permanently.

![List Documents](/img/list_document_details.png)

