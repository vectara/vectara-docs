---
id: ootb-filters
title: Default Filterable Metadata
---

import {Config} from '@site/docs/definitions.md';

A few pieces of metadata are filterable out of the box, as they're very
useful in a variety of situations. This page describes these.

Note that you can set up additional fields to filter on by setting up
[filter attributes](/docs/api-reference/admin-apis/create-corpus#filter-attribute) on a
corpus.

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
field to indicate whether the field is a title field or not.  This is useful
for a few different cases depending on how you model your data.  For example,
Some users want to only match on a title field or never match on a title field,
in which case this field can be used to filter.

To filter for title fields only, you can use: `part.is_title = true` and
conversely `part.is_title = false` will return only non-title sections.

