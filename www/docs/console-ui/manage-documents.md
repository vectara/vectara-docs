---
id: manage-documents
title: Manage Documents
sidebar_label: Manage Documents
---

import {Config} from '@site/docs/definitions.md';

The Search tab lets you manage documents in a corpus including viewing 
the `document_id`, filtering the search on specific documents, and deleting 
documents.

## View a Document ID

The corpus contains your data stores in the form of documents. If you want to 
view a `document_id`, search for content in the corpus which then displays the 
source document. 

1. Complete a search for content in your corpus.
2. Click **Parent document** on the right side of the search
result:

  ![Parent Document Option](/img/parent_document.png)
3. Click **View document** to display details about the document:

  ![Parent Document Dropdown](/img/parent_document_dropdown.png)

  The details about your document appear, including the `document_id`. 

  ![View Document ID](/img/view_document_id.png)

  You can also copy the `document_id` and `metadata` string values.

## Filter on a Specific Document

The **Parent document** drop-down also lets you filter your searches on the 
document from the search results:



1. Click **Filter on document**.
   
   ![Document Filter Dropdown](/img/filter_by_document_dropdown.png)

2. The Filters field populates with the `doc.id`.

  ![Filter by Document](/img/doc_id_filter.png)

   Now you can filter your search results on that `doc.id` or use 
   additional operators if you want to include other document IDs. 

## Delete a Document

1. Search for the document in your corpus.
2. Click **Parent document**, **View document**.
3. Click **Delete document**.

  Wait for the confirmation message.

![Delete Document Confirmation](/img/delete_confirmation.png)