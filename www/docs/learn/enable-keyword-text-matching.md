---
id: enable-keyword-text-matching
title: Keyword Search
sidebar_label: Keyword Search
---

Vectara disables exact and Boolean text matching by default, which is similar 
to a traditional, keyword-based search. Exact keyword matching is particularly 
useful in environments that do not require [semantic search](/docs/learn/semantic-search/semantic-search-overview) where specific 
phrases and terms are crucial to the desired outcome. This can include 
information in legal, compliance, technical fields where you might need 
specific error codes of system specifications. 

You enable exact keyword matching, which disables neural retrieval, by 
specifying the `lambda` value as `1` at query time, specifically under 
the `corpusKey`:

```json
      "corpusKey": [
        {
          "customerId": 123456789,
          "corpusId": 5,
          "semantics": 0,
          "metadataFilter": "",
          "lexicalInterpolationConfig": {
            "lambda": 1.0
          },
          "dim": []
        }
      ]
```

## Enable Exact Keyword Matching in the Console UI

You can also set this value in the Console UI and experiment with searches and 
disable the hybrid search option.

![Set Lambda to 1.0](/img/lambda_console.png)

The default value of `lambda` is `0`, which disables exact and Boolean text
matching. 

## Enable Exact Keyword Search

The following example shows the full [query](/docs/api-reference/search-apis/search) with the `lambda` value set to `1`:

```json

curl -X POST \
-H "Authorization: <Bearer Token>" \
-H "customer-id: 1234567899" \
https://api.vectara.io:443/v1/query \
-d @- <<END;
{
  "query": [
    {
      "query": "What is offsides?",
      "queryContext": "",
      "start": 0,
      "numResults": 10,
      "contextConfig": {
        "charsBefore": 0,
        "charsAfter": 0,
        "sentencesBefore": 2,
        "sentencesAfter": 2,
        "startTag": "%START_SNIPPET%",
        "endTag": "%END_SNIPPET%"
      },
      "corpusKey": [
        {
          "customerId": 123456789,
          "corpusId": 5,
          "semantics": 0,
          "metadataFilter": "",
          "lexicalInterpolationConfig": {
            "lambda": 1.0
          },
          "dim": []
        }
      ],
      "summary": [
        {
          "maxSummarizedResults": 5,
          "responseLang": "eng",
          "summarizerPromptName": "vectara-summary-ext-v1.2.0"
        }
      ]
    }
  ]
}
END
        
```

Experimenting with the `lambda` value is useful if you're trying to evaluate 
how a keyword system like one based on Elasticsearch or Solr may compare to 
Vectara.

