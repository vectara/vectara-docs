---
id: highlighting
title: Highlighting and Snippet Extraction
sidebar_label: Highlighting and Snippet Extraction
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import CodePanel from '@site/src/theme/CodePanel';


When you receive query results from <Config v="names.product"/>, alongside the
result, you'll receive values for `part_metadata` and `document_metadata`. For 
example:

```json showLineNumbers
{
  "search_results": [
    {
      "text": "Foo bar baz.",
      "score": 0.2553684115409851,
      "part_metadata": {
        "lang": "eng",
        "section": "1",
        "offset": "36"
      },
      "document_metadata": {},
      "document_id": "doc_123456789",
      "request_corpora_index": 0
    }
  ]
}
<CodePanel snippets={[{language: "bash", code: `For highlighting and snippet extraction, we need to pay attention to three key
elements in this response:
1. \`text\` under \`search_results\` which gives us the text/length to highlight
2. \`section\` under \`part_metadata\` which tells us which specific section the
relevant snippet showed up in
1. \`offest\` under \`part_metadata\` which tells us how far into the section the
relevant snippet is

## Text and offset

The most familiar parts of highlighting or snippet extraction if you've used
any other search system are the \`text\` and \`offset\` values.  The \`offset\` tells
you how many characters into the given section should be skipped before any
highlighting.  Following that, the \`text\` tells you what the specific text is
to highlight.

For example, if the original text was:
> The quick brown fox jumped over the lazy dog.  How vexingly quick daft zebras
jump!

And if the query text is "striped horse-like animal," you might get back an
an \`offset\` of 48 (how many characters before the sentence starting with "How"
starts) and a \`text\` value of "How vexingly quick daft zebras jump!"

## Configuring context

The \`context_configuration\` object in the [query request](/docs/api-reference/search-apis/search#query-definition) allows you to control 
the amount of context included with each matching document part (snippet) that 
appears in a summary. Adding this context configuration affects the results 
quality for summarization by enhancing relevance and reducing ambiguity around 
each snippet. You can specify \`characters_before\` and \`characters_after\` or 
\`sentences_before\` and \`sentences_after\` to include before and after the 
snippet, as well as \`start_tag\` and \`end_tag\` that wrap the snippet, such as 
\`<b>\` and \`</b>\`.`}]} title="Code Example" layout="stacked" />json
"context_configuration": {
   "sentences_before": 2,
   "sentences_after": 2,
   "start_tag": "<b>",
   "end_tag": "</b>"
}
<CodePanel snippets={[{language: "bash", code: `This example uses \`sentences_before\` and \`sentences_after\`. If you enter values 
for sentences before/after and characters before/after, then 
characters_before/after is ignored and summary returns the sentences values. 
Experiment and iteratve with different values.

## Including additional context

Often, just having the \`text\` and \`offset\` values are enough to create a
compelling highlighting/snippet extraction experience for short-form documents
like social media posts and when you just have 1 section per documents.
However, if you'd like to expand the snippet to include additional context,
it's possible that the additional context may not be fully contained in the
given section -- especially for longer documents.  In those cases, you might
want to include content from other sections.

If you created the sections yourself, you may choose to just replay the
sectioning logic at query time and use as much of the additional sections as
desired. However, if you aren't certain as to the section numbers and/or if
you uploaded documents using the File Upload API, then you might need
to look up the additional sections.  This can be done by an additional query
to <Config v="names.product"/> using
[filters](/docs/learn/metadata-search-filtering/filter-overview). To do this, retrieve the
\`document_id\` value of the document and perform a query for that ID. For example:`}]} title="Code Example" layout="stacked" />json showLineNumbers title="https://api.vectara.io/v2/query"
POST https://api.vectara.io/v2/query
{
  "query": "",
  "search": {
    "corpora": [
      {
        "corpus_key": "my-corpus",
        "metadata_filter": "doc.id = '5b943498-d18c-4095-92f9-7a03f026f680'"
      }
    ],
    "offset": 0,
    "limit": 10
  }
}         
```

In this example, the relevant document ID is
`5b943498-d18c-4095-92f9-7a03f026f680`.  We can then iterate through the
results and show any number of sections either before (with a lower `section`
number) or after (with a higher `section` number) as additional context for the
snippet.
