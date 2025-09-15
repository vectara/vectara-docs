---
id: deleting-documents
title: Delete Documents API Definition
sidebar_label: Delete Documents
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Delete Documents API lets you delete a document from a corpus. To verify
that the document no longer exists in the corpus, use the List Documents endpoint.

### Delete Document Request and Response

To delete a document, send a DELETE request to `/v2/corpora/:corpus_key/documents/{document_id}`,
where `corpus_key` is the unique identifier for the corpus and `{document_id}`
is the ID of the document you want to delete. The `document_id` is a string
that uniquely identifies the document within the corpus. The `document_id`
must be [percent encoded](https://developer.mozilla.org/en-US/docs/Glossary/Percent-encoding).

The reply on successful deletion is `{}`.

## REST 2.0 URL

### Delete Documents Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to delete content from a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v2/corpora/:corpus_key/documents/:document_id</code>

The API Reference shows the full [Delete Documents REST definition](/docs/rest-api/delete-corpus-document).
