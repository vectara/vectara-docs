---
id: metadata
title: Reading Metadata
sidebar_label: Metadata
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '../../definitions.md';

In <Config v="names.product"/>, when you
[index a document](/docs/indexing-apis/indexing), it will consist of both a
top-level `Document` object and a series of `Section`s which can be nested.
Both can contain separate metadata, including some metadata
that <Config v="names.product"/> will auto-generate.  A good example of
this is that you could have a document which has some global attributes like
the `URL` or `owner` but individual sections will have a `section` attribute
and a `lang`.


Here's an example response with different metadata at these different levels:

```json
{
    "responseSet": [
        {
            "response": [
                {
                    "text": "Answer to the Ultimate Question of Life, the Universe, and Everything, is 42.",
                    "score": 0.1401531994342804,
                    "documentIndex": 0,
                    "corpusKey": {
                        "customerId": 0,
                        "corpusId": 1234,
                        "semantics": 0,
                        "metadataFilter": "",
                        "dim": []
                    },
                    "metadata": [
                        {
                            "name": "speaker",
                            "value": "Deep Thought"
                        },
                        {
                            "name": "lang",
                            "value": "eng"
                        },
                        {
                            "name": "section",
                            "value": "2"
                        },
                        {
                            "name": "offset",
                            "value": "316"
                        }
                    ]
                },
                {
                    "text": "Sometimes the questions are complicated and the answers are simple.",
                    "score": 0.13511724770069122,
                    "documentIndex": 1,
                    "corpusKey": {
                        "customerId": 0,
                        "corpusId": 1234,
                        "semantics": 0,
                        "metadataFilter": "",
                        "dim": []
                    },
                    "metadata": [
                        {
                            "name": "lang",
                            "value": "eng"
                        },
                        {
                            "name": "section",
                            "value": "17"
                        },
                        {
                            "name": "offset",
                            "value": "171"
                        }
                    ]
                },
            ],
            "status": [],
            "document": [
                {
                    "id": "hitchhikers-guide",
                    "metadata": [
                        {
                            "name": "author",
                            "value": "Douglas Adams"
                        },
                        {
                            "name": "publicationyear",
                            "value": "1979"
                        }
                    ]
                },
                {
                    "id": "authors-quotes",
                    "metadata": [
                        {
                            "name": "author",
                            "value": "Dr. Seuss"
                        }
                    ]
                }
            ]
        }
    ],
    "status": []
}
```

Within a given item in the `responseSet` array, you'll see there's a `response`
and a `document` section (among others).  The `response` section holds
section-level metadata and the `document` section holds document-level
metadata.  The reason for this split is that there may be multiple sections
from the same document in the response, and this allows for deduplication of
document-level metadata, which can reduce the total time for the response.

## Combining document and section metadata
In order to display metadata for a particular section, you may want to combine
it with the document-level metadata.  To do so, look at the `documentIndex`
value.  This tells you which index into the `document` array you should grab
associated `metadata` from.

For example, the first result in the `response` array ("Answer to the Ultimate
Question of Life, the Universe, and Everything, is 42.") has a `documentIndex`
value of `0` and has metadata of `speaker:Deep Thought`, `lang:eng`,
`section:2`, and `offset:316`.  These are the section-level metadata for this
result.

Because the `documentIndex` is `0`, we look at the first result in the
`document` array to find the document-level metadata and document ID.  In this
case, the `id` is `hitchhikers-guide` and the document-level metadata is
`author:Douglas Adams` and `publicationyear:1979`.

Depending on your use case, you might want to combine these metadata elements
together for display purposes.

## Filtering
You can also use the `document`- and `section`-level metadata to filter in a
search operation.  For more information on how to apply filter expressions at
either the document or section/part level, please see the
[filter expression](/docs/search-apis/sql/filter-overview) documentation.