---
id: file-upload-filetypes
title: Supported Filetypes
---

import {Config} from '../definitions.md';
import {vars} from '@site/static/variables.json';

## Binary file types

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
- HTML files.
- LXML files.
- RTF files.
- ePUB files.
- Email files conforming to RFC 822.

## Semi-structured

In addition, the [upload endpoint](/docs/indexing-apis/file-upload) supports
sending semi-structured documents through this endpoint that reflect a
`Document` proto message.  Those can be sent in the following formats:

-  `pb`: Contains binary serialized `Document` proto message.

- `pbtxt`: Contains `Document` proto message in proto text format.

- `json`: Contains `Document` proto message in json text format.

For more details of how to format these types of files, read
[the formatting document](/docs/indexing-apis/format-for-upload)