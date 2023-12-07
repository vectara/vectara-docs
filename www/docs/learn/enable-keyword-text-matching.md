---
id: enable-keyword-text-matching
title: 'Enable Exact Keyword Text Matching'
sidebar_label: Enable Exact Keyword Text Matching
---

By default, Vectara disables exact and Boolean text matching, which is similar 
to a traditional, keyword-based search. You enable exact keyword matching, 
which disables neural retrieval, by specifying the `lambda` value as `1` at 
query time, specifically under the `corpusKey`:

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
```

## Enable Exact Keyword Matching in the Console UI

You can also set this value in the Console UI:

![Set Lambda to 1.0](/img/lambda_console.png)

The default value of `lambda` is `0`, which disables exact and Boolean text
matching. 


## Example Query with Exact Keyword Search Enabled

The following example shows the full query with the `lambda` value set to `1`:

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


Experiemnting with the `lambda` value is 
useful if you're trying to evaluate how a keyword system like one based on 
Elasticsearch or Solr may compare to Vectara.