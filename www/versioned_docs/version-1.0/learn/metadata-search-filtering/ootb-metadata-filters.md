---
id: ootb-metadata-filters
title: Default Metadata Filters
---

import {Config} from '@site/docs/definitions.md';

A few pieces of metadata expressions filterable out of the box, as they're very
useful in a variety of situations.

Note that you can set up additional fields to filter on by setting up
[filter attributes](/docs/1.0/api-reference/admin-apis/create-corpus#filter-attribute) on a
corpus.


## `doc.id` field
Each document is assigneed a unique identifier at indexing. You can use the 
`doc.id` field to retrieve or filter specific documents in your corpus.

Valid filter expressions include something like:

* `doc.id` = 'my-document-2023.pdf'
* `doc.id` = 'my-document-2022.pdf' OR 'my-document-2023.pdf'
* `doc.id` = 'my-document-2023.pdf' AND 'my-document-2024.pdf'


## `part.lang` field
Each section of a document is evaluated for its language at index time and the
`part.lang` field is added with a 3-character lower-case language code
([ISO 639-2](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes)).  For
example, if the section was detected as English, then `part.lang` would contain
`eng` and if it was detected as German, than `part.lang` would contain `deu`.

Valid filter expressions for this would be something like:
* `part.lang = 'eng'`
* `part.lang = 'deu'`
* `part.lang = 'eng' OR part.lang = 'deu'`

## `part.is_title` field
When adding content, <Config v="names.product"/> will add a special Boolean
field to indicate whether the field is a title field or not. This is useful
for a few different cases depending on how you model your data. For example,
some users want to only match on a title field or never match on a title field,
in which case this field can be used to filter.

To filter for title fields only, you can use: `part.is_title = true` and
conversely `part.is_title = false` will return only non-title sections.

