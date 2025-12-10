---
id: ootb-metadata-filters
title: Default Metadata Filters
---


import CodePanel from '@site/src/theme/CodePanel';


A few pieces of metadata expressions are filterable out of the box, including 
Document ID, Language, and Titles. These filters are very useful in a variety 
of situations.

Note that you can set up additional fields to filter on by setting up
filter attributes on a corpus.


## `doc.id` field

Each document is assigned a unique identifier at indexing. You can use the 
`doc.id` field to retrieve or filter specific Document IDs in your corpus.

Valid filter expressions include something like:

* `doc.id = 'my-document-2023.pdf'`
* `doc.id = 'my-document-2022.pdf' OR 'my-document-2023.pdf'`
* `doc.id = 'my-document-2023.pdf' AND 'my-document-2024.pdf'`


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

When adding content, <Config v="names.product"/> adds a special Boolean
field to indicate whether the field is a `title` field or not. This is useful
for a few different cases depending on how you model your data. For example,
some users want to **only** match on a title field, or never match on a title field,
in which case this field can be used to filter.

This field actually uses three value logic: true, false, and unset. We 
designed it like this to avoid creating too much metadata because customers 
are billed for metadata, so it is in the customer's interest. Here is 
how it works using "neural networks" and an example document:

* Title: "Neural Networks and Deep Learning"
* Section 1: "Introduction to Neural Networks"
* Section 2: "Applications of Neural Networks in AI"
* Section 3: "Conclusion"

* To filter for only title fields, use `part.is_title = true`. You get results 
  with "neural networks" in the title, such as "Neural Networks and Deep 
  Learning" in the title.
* To return only non-title sections, use `part.is_title = false`. You get 
  results for sections that contain "neural networks" but are not titles, such 
  as "Introduction to Neural Networks," "Applications of Neural Networks in 
  AI," and "Conclusion. You **do not** get titles with that term in the 
  results.
* However, not all documents have titles. To include sections with no title set, 
  use `part.is_title <> true`. You could get a variety of results that do not 
  have specific title designations but they contain the term "neural networks".

