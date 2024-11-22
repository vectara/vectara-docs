---
id: metadata
title: Reading Metadata
sidebar_label: Reading Metadata
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';

In <Config v="names.product"/>, when you [index a document](/docs/api-reference/indexing-apis/indexing), the 
document has a `type` parameter that determines the format of the document 
as `core` or `structured`. The `core` type has `document_parts` and the `structured` 
type has `sections`. Both can be nested and both can contain separate `metadata`, 
including some metadata that <Config v="names.product"/> will auto-generate. 

For example, a document might have global attributes such as the `URL` or `owner` 
but individual sections have a `section` attribute and a `lang`.

Here's an example response with different metadata at these different levels:

```json
{
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
}
```

Within a given item in the `search_results` array, you'll see there's a `part_metadata`
and a `document_metadata` section (among others). The `part_metadata` section holds
section-level metadata and the `document_metadata` section holds document-level
metadata. The reason for this split is that there may be multiple sections
from the same document in the response, and this allows for deduplication of
document-level metadata, which can reduce the total time for the response.

## Metadata type consistency

The metadata type conversion applies only to the query responses. Metadata 
remains unconverted during the document upload process, even when using API v2: 

* **Numbers** are returned as numbers (for example, `section: 2`, `publicationyear: 1979`).
* **Booleans** are returned as booleans.
* **JSON objects** maintain their native structure.

This behavior differs from API v1, where metadata such as `section` or 
`publicationyear` might have been returned as strings (`"2"`, `"1979"`). 
Ensure client applications handle these types correctly for smooth integration. 


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
