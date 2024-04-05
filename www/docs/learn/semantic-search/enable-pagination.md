---
id: enable-pagination
title: Pagination
sidebar_label: Pagination
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

Pagination provides you with customization options for individual preferences 
or application requirements. Upon query, <Config v="names.product"/> 
returns the first 10 most relevant search results by default. However, there 
are times when this is not enough and you want to offer your users the ability 
to paginate through results.

To enable pagination, use the `start` and `num_results` parameters under the 
`query`.  

## Example: Set Results to 20 Per Page

To page through where each page has 20 results, you set `start` to `0` and 
`num_results` to `20`.

```json
{
  "query": [
    {
      "query": "What is offsides?",
      "queryContext": "",
      "start": 0,
      "numResults": 20,
      "contextConfig": {
        "charsBefore": 0,
        "charsAfter": 0,
        "sentencesBefore": 2,
        "sentencesAfter": 2,
        "startTag": "%START_SNIPPET%",
        "endTag": "%END_SNIPPET%"
      },
      "corpusKey": [
        
       // ...
        
      ],
      "summary": [
       
       // ...
      ]
    }
  ]
}
```

## Example: Set Results to Begin on Page 2

Then if your users want to paginate to page 2, you would send `start` as 
`20` and `num_results` to `20`, and for each page following, add another 20 
to the `start`.

```json
{
  "query": [
    {
      "query": "What is offsides?",
      "queryContext": "",
      "start": 20,
      "numResults": 20,
      "contextConfig": {
        "charsBefore": 0,
        "charsAfter": 0,
        "sentencesBefore": 2,
        "sentencesAfter": 2,
        "startTag": "%START_SNIPPET%",
        "endTag": "%END_SNIPPET%"
      },
      "corpusKey": [
        
       // ...
        
      ],
      "summary": [
       
       // ...
      ]
    }
  ]
}
```