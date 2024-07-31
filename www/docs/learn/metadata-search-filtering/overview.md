---
id: filter-overview
title: Metadata Filters
sidebar_title: Metadata Filters
---

import {Config} from '@site/docs/definitions.md';

Metadata filter expressions are attached to queries, or more formally, to their 
corpus keys. These filter expressions serve to restrict the search to only the 
part of the corpus that matches the expression. In both form and function, 
they are a simpler version of a `WHERE` clause's *search condition* 
in [ANSI SQL, see §7.6][1].

A filter expression operates on the metadata attached to documents that are 
indexed in <Config v="names.product"/>. Because you can associate this 
metadata to either the entire document, or to specific parts within it, the 
*scope* must be explicitly specified for every metadata reference in the 
expression. 

## Understanding document and part scopes

Valid scopes are `doc.` and `part.`, for document and part-level 
metadata, respectively.
When indexing data in Vectara, you associate metadata at two levels: the 
`doc` level and `part` level:

* **Document-level scope**
    * Applies to the entire document
    * Useful for properties that are consistent across the whole document
    * **Examples:** 
      * `doc.author = 'John Doe' and doc.publication_year > 2024`
      * `doc.publication_date >= '2023-01-01' AND doc.publication_date < '2024-01-01' AND doc.category IN ('Technology', 'Science')`
* **Part-level scope**
    * Applies to specific sections or chunks within a document
    * Useful for properties that may vary within different parts of the document
    * **Examples** 
      * `part.section = 'Introduction'`
      * `part.clause_type = 'Liability' AND part.risk_level = 25 AND part.is_boilerplate = false`


To learn more about setting up filterable metadata review the [filter attribute][4] 
section of the corpus creation documentation.

## Example filter expressions

The following filter expression selects customer reviews in German with better than a
3-star rating. Note that while there is a single rating for the entire document,
the detected language is set at the part level. 

```
doc.rating > 3.0 AND part.lang = 'deu'
```

The `lang` metadata tag used in this example is detected and set automatically
by the platform at indexing time. It's set at the part level for accuracy,
because a single document may contain content in multiple languages.

More complicated expressions are possible, such as the one below, which 
checks for documents with a publication date in 2021.

```
1609459200 < doc.pub_epoch AND doc.pub_epoch < 1640995200
```

Here, `pub_epoch` stores the date in [epoch time][3].

You can find a full list of supported syntax on the [Functions and Operators][2]
page.

[1]: http://www.contrib.andrew.cmu.edu/~shadow/sql/sql1992.txt
[2]: /docs/api-reference/search-apis/sql/func-opr
[3]: https://en.wikipedia.org/wiki/Unix_time
[4]: /docs/api-reference/admin-apis/create-corpus#filter-attribute