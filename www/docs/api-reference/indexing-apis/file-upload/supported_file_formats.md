---
id: file-upload-filetypes
title: Supported File Types
---

import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


## Raw document types

The upload endpoint supports several raw document types. Vectara extracts text
from these documents and sections them as best it can. This provides a
convenient way to index text, yet the caller has less control compared to when
providing the `Document` proto message themselves. The following raw document
types are officially supported:

- Commonmark / Markdown (`md` extension).
- PDF/A (`pdf`).
- Open Office (`odt`).
- Microsoft Word (`doc`, `docx`).
- Microsoft Powerpoint (`ppt`, `pptx`).
- Text files (`txt`).
- HTML files (`.html`).
- LXML files (`.lxml`).
- RTF files (`.rtf`).
- ePUB files (`.epub`).
- Email files conforming to RFC 822.

## Semi-structured documents

In gRPC, the upload endpoint supports sending semi-structured documents through 
this endpoint that reflect a `Document` proto message. Those can be sent in 
the following formats:

- `pb`: Contains binary serialized `Document` proto message.

- `pbtxt`: Contains `Document` proto message in proto text format.

- `json`: Contains `Document` proto message in json text format.

In REST API v2, use the [Indexing API v2 endpoint](/docs/rest-api/create-corpus-document) instead.

## Additional file type support

While the Vectara platform directly supports the file types listed above 
through the file upload API, customers who need support for additional file 
types or data sources can use [Vectara Ingest](https://github.com/vectara/vectara-ingest), 
an open-source Python framework.

Vectara Ingest is an open-source Python framework that demonstrates how to 
crawl datasets and ingest them into Vectara. It extends the file type support 
beyond what is available in the standard file upload API.

:::caution Important
Vectara Ingest is an open-source project provided by Vectara without official 
support. This tool is provided "as-is" without warranties and usage is at your 
own discretion and risk.
:::

### Ingest data from various sources

   - Websites (web crawling)
   - RSS feeds
   - CSV
   - Confluence
   - HubSpot
   - ServiceNow
   - Jira tickets
   - Notion notes
   - Slack channels
   - MediaWiki
   - GitHub repositories
   - SharePoint
   - Twitter/X
   - YouTube
   - and more

### Process additional document types with advanced features

   - Enhanced PDF processing with table extraction
   - OCR (Optical Character Recognition) for scanned documents
   - Image content summarization using vision models
   - Custom document parsing through various parsers (unstructured, llama_parse, docupanda, docling)

### Apply advanced processing

   - Table detection and summarization in PDF, HTML, PPT, and DOCX files
   - PII (Personally Identifiable Information) masking
   - Custom metadata extraction
   - Flexible chunking strategies
