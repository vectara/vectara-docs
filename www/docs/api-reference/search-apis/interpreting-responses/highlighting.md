---
id: highlighting
title: Highlighting and Snippet Extraction
sidebar_label: Highlighting
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';

When you receive search results from <Config v="names.product"/>, alongside the
result, you'll receive a values for `section` and `offset`.  For example:

```
{
    "responseSet": [
        {
            "response": [
                {
                    "text": "Foo bar baz.",
                    "score": 0.2553684115409851,
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
                            "name": "lang",
                            "value": "eng"
                        },
                        {
                            "name": "section",
                            "value": "1"
                        },
                        {
                            "name": "offset",
                            "value": "36"
                        }
                    ]
                },
                ...
            ]
        }
    ]
}
```

For highlighting and snippet extraction, we need to pay attention to three key
elements in this response:
1. `text` under `response` which gives us the text/length to highlight
2. `section` under `metadata` which tells us which specific section the
relevant snippet showed up in
3. `offest` under `metadata` which tells us how far into the section the
relevant snippet is

## Text and Offset
The most familiar parts of highlighting or snippet extraction if you've used
any other search system are the `text` and `offset` values.  The `offset` tells
you how many characters into the given section should be skipped before any
highlighting.  Following that, the `text` tells you what the specific text is
to highlight.

For example, if the original text was:
> The quick brown fox jumped over the lazy dog.  How vexingly quick daft zebras
jump!

And if the query text is "striped horse-like animal," you might get back an
an `offset` of 48 (how many characters before the sentence starting with "How"
starts) and a `text` value of "How vexingly quick daft zebras jump!"

## Including Additional Context
Often, just having the `text` and `offset` values are enough to create a
compelling highlighting/snippet extraction experience for short-form documents
like social media posts and when you just have 1 section per documents.
However, if you'd like to expand the snippet to include additional context,
it's possible that the additional context may not be fully contained in the
given section -- especially for longer documents.  In those cases, you might
want to include content from other sections.

If you created the sections yourself, you may choose to just replay the
sectioning logic at query time and use as much of the additional sections as
desired.  However, if you aren't certain as to the section numbers and/or if
you uploaded documents using the
[file upload API](/docs/api-reference/indexing-apis/format-for-upload), then you might need
to look up the additional sections.  This can be done by an additional query
to <Config v="names.product"/> using
[filters](/docs/api-reference/search-apis/sql/filter-overview).  Do do this, retrieve the
`id` value of the document and perform a query for that ID.  For example:

```
curl -X POST ^
{
    "query":[
        {
            "query": "",
            "start":0,
            "numResults":10,
            "corpusKey":[
                {
                    "customerId":123456789,
                    "corpusId":1234,
                    "semantics":0,
                    "metadataFilter":"doc.id = '5b943498-d18c-4095-92f9-7a03f026f680'",
                    "dim":[]
                }
            ]
        }
    ]
}          
```

In this example, the relevant document ID is
`5b943498-d18c-4095-92f9-7a03f026f680`.  We can then iterate through the
results and show any number of sections either before (with a lower `section`
number) or after (with a higher `section` number) as additional context for the
snippet.