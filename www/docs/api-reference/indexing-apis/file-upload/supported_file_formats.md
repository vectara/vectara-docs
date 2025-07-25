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
types are supported:

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