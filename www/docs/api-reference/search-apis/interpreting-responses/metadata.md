---
id: metadata
title: Reading Metadata
sidebar_label: Reading Metadata
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import CodePanel from '@site/src/theme/CodePanel';


In <Config v="names.product"/>, when you [index a document](/docs/api-reference/indexing-apis/indexing), the 
document has a `type` parameter that determines the format of the document 
as `core` or `structured`. The `core` type has `document_parts` and the `structured` 
type has `sections`. Both can be nested and both can contain separate `metadata`, 
including some metadata that <Config v="names.product"/> will auto-generate.

## Metadata structure

For example, a document might have global attributes such as the `URL` or `owner` 
but individual sections have a `section` attribute and a `lang`.

Here's an example response with different metadata at these different levels:

<CodePanel snippets={[{language: "json", code: `{
  "search_results": [
    {
      "text": "Answer to the Ultimate Question of Life, the Universe, and Everything, is 42.",
      "score": 0.1401531994342804,
      "part_metadata": {
        "speaker": "Deep Thought",
        "lang": "eng",
        "section": 2,
        "offset": 316
      },
      "document_metadata": {
        "author": "Douglas Adams",
        "publicationyear": 1979
      },
      "document_id": "hitchhikers-guide",
      "request_corpora_index": 0
    },
    {
      "text": "Sometimes the questions are complicated and the answers are simple.",
      "score": 0.13511724770069122,
      "part_metadata": {
        "lang": "eng",
        "section": 17,
        "offset": 171
      },
      "document_metadata": {
        "author": "Dr. Seuss"
      },
      "document_id": "authors-quotes",
      "request_corpora_index": 0
    }
  ]
}`}]} title="Code Example" layout="stacked" />

Within a given item in the `search_results` array, you'll see there's a `part_metadata`
and a `document_metadata` section (among others). The `part_metadata` section holds
section-level metadata and the `document_metadata` section holds document-level
metadata. The reason for this split is that there may be multiple sections
from the same document in the response, and this allows for deduplication of
document-level metadata, which can reduce the total time for the response.

## Metadata type consistency

The metadata type conversion applies only to the `part_metadata` and 
`document_metadata` fields in query responses. Metadata remains 
unconverted during the document upload process, even when using API v2:

* **Numbers** are returned as numbers (for example, `section: 2`, `publicationyear: 1979`).
* **Booleans** are returned as `true` or `false` (case-sensitive).
* **JSON objects** maintain their native structure.

This behavior differs from API v1, where metadata such as `section` or 
`publicationyear` might have been returned as strings (`"2"`, `"1979"`). 
Ensure client applications handle these types correctly for smooth integration. 

## Metadata type regex patterns

The following regex examples provide information about how each type is 
identified and processed. By understanding these patterns, users can account 
for type conversion in their client applications.

### Numbers regex

This pattern matches valid numeric formats, including integers, decimals, and 
scientific notation, ensuring they are returned as numbers instead of strings. 
Examples include `section: 2` or `offset: 316`.

**Pattern:** `-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?`


| Input      | Matches | Explanation                                |
|------------|---------|--------------------------------------------|
| `123`      | ✅  | Valid integer.                            |
| `0`        | ✅  | Valid zero.                               |
| `-456`     | ✅  | Valid negative integer.                   |
| `3.14`     | ✅  | Valid decimal number.                     |
| `-0.001`   | ✅  | Valid negative decimal.                   |
| `2e10`     | ✅  | Valid scientific notation.                |
| `-1.23E-4` | ✅  | Valid negative number in scientific notation. |
| `.5`       | ❌  | Invalid (missing leading integer).        |
| `1e`       | ❌  | Invalid (missing exponent value).         |
| `1.2.3`    | ❌  | Invalid (multiple decimal points).        |
| `-`        | ❌  | Invalid (missing digits).                 |


### Boolean regex

This pattern matches exact boolean values (`true` or `false`), with exact case 
sensitivity and no extra characters.

**Pattern:** `^(true|false)$`

| Input      | Matches | Explanation                                     |
|------------|---------|-------------------------------------------------|
| `true`     | ✅  | Exact match for `true`.                        |
| `false`    | ✅  | Exact match for `false`.                       |
| ` true`    | ❌  | Invalid (leading space).                       |
| `false `   | ❌  | Invalid (trailing space).                      |
| `True`     | ❌  | Invalid (case-sensitive; must be lowercase).   |
| `TRUE`     | ❌  | Invalid (case-sensitive; must be lowercase).   |
| `falsey`   | ❌  | Invalid (extra characters after `false`).      |
| `truest`   | ❌  | Invalid (extra characters after `true`).       |
| `tru`      | ❌  | Invalid (partial match; incomplete `true`).    |

### JSON regex

This pattern identifies JSON-like structures, ensuring valid JSON objects so 
that `{}` or arrays like `[]` are properly maintained.

**Pattern:** `^[{|\[].*$`

| Input         | Matches | Explanation                                  |
|---------------|---------|----------------------------------------------|
| `{example}`   | ✅  | Starts with `{` and has additional content.  |
| `[data]`      | ✅  | Starts with `[` and has additional content.  |
| `{`           | ✅  | Matches a single `{` at the start.           |
| `[`           | ✅  | Matches a single `[` at the start.           |
| `example`     | ❌  | Does not start with `{` or `[`.              |
| `something{`  | ❌  | Starts with other characters, not `{`.       |
| `(empty)`     | ❌  | Empty string does not match.                 |

## Combining document and section metadata

To display metadata for a particular section, you may want to combine it with 
the document-level metadata.

In order to display metadata for a particular section, you may want to combine 
it with the document-level metadata. Use the `document_id` value to determine 
which document the metadata belongs to.

For example, the first result in the `search_results` array ("Answer to the Ultimate 
Question of Life, the Universe, and Everything, is 42.") has a `document_id` 
value of `hitchhikers-guide` and has a `part_metadata` of `speaker:Deep Thought`, `lang:eng`, 
`section:2`, and `offset:316`. These are the section-level metadata for this 
result.

Because the `document_id` is `hitchhikers-guide`, we look at the first result in the 
`search_results` array to find the document-level metadata and document ID. In this 
case, the `id` is `hitchhikers-guide` and the document-level metadata is 
`author:Douglas Adams` and `publicationyear:1979`.

Depending on your use case, you might want to combine these metadata elements 
together for display purposes.

## Filtering

You can also use the `document`- and `section`-level metadata to filter search 
results. For more information on how to apply filter expressions at 
either the document or section/part level, please see the 
[filter expression](/docs/learn/metadata-search-filtering/filter-overview) documentation.
