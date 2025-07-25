---
id: enable-pagination
title: Pagination
sidebar_label: Pagination
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


Users often struggle to find relevant information when faced with long lists 
of search results. Pagination provides customization to present search results 
based on individual preferences or application requirements. Upon 
query, <Config v="names.product"/> returns the first 10 most relevant search results 
by default. However, there are times when this is not enough and you want to 
offer your users the ability to paginate through results.

To enable pagination, use the `offset` and `limit` parameters under the 
`search` object. `offset` is not required, but it defaults to `0` if you do not specify 
a value.

## Example: set results to 20 per page

To page through where each page has 20 results, you set `offset` to `0` and 
`limit` to `20`.

<CodePanel snippets={[{language: "json", code: `{
   "query": "What is offsides?",
   "search": {
     "corpora": [
      {
        "corpus_key": "nhl-rulebook-2025"
      }
     ],
     "offset": 0,
     "limit": 20,
     "context_configuration": {
       "sentences_before": 2,
       "sentences_after": 2,
       "start_tag": "%START_SNIPPET%",
       "end_tag": "%END_SNIPPET%"
     }
   },
   "generation": {
     // ...
   }
}`
}]} title="Pagination Example" layout="stacked" />

## Example: set results to begin on page 2

Then if your users want to paginate to page 2, you would send `offset` as 
`20` and `limit` to `20`, and for each page following, add another 20 
to the `offset`.

<CodePanel snippets={[{language: "json", code: `{
   "query": "What is offsides?",
   "search": {
     "corpora": [
      {
        "corpus_key": "nhl-rulebook-2025"
      }
    ],
     "offset": 20,
     "limit": 20,
     "context_configuration": {
       "sentences_before": 2,
       "sentences_after": 2,
       "start_tag": "%START_SNIPPET%",
       "end_tag": "%END_SNIPPET%"
     }
   },
   "generation": {
     // ...
   }
}`
}]} title="Offset Example" layout="stacked" />
