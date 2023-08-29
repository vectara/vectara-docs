---
id: api-jumpstart
title: API Jumpstart
sidebar_label: API Jumpstart
---

Let’s get you started with the Vectara API so that you can perform some 
more advanced operations with your data. To use the API, you must have the 
following information available:

* Customer ID
* Index ID
* API Key

:::note

Some API functions require OAuth 2.0 through a client credentials grant. Learn 
about how to create an application client and obtain a JWT Token.

:::


## Search for answers in the index

Let’s continue using the Employee Handbook example from the 
Now you want to ask another question, “How much PTO is offered to 
employees each year?”

You need to input the following information:

* customer_id and customerId
* API Key
* corpus_id
* query


### Example curl command

```json
curl -L -X POST 'https://api.vectara.io/v1/query' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'customer-id: 123456789' \
-H 'x-api-key: abc_12345defg67890hij09876' \
--data-raw '{
  "query": [
    {
      "query": "How much PTO is offered to employees each year?",
      "start": 0,
      "numResults": 10,
      "contextConfig": {
        "charsBefore": 30,
        "charsAfter": 30,
        "sentencesBefore": 3,
        "sentencesAfter": 3,
        "startTag": "<b>",
        "endTag": "</b>"
      },
      "corpusKey": [
        {
          "customerId": 12345,
          "corpusId": 1,
          "semantics": "DEFAULT",
          "dim": [
            {
              "name": "string",
              "weight": 0
            }
          ],
          "metadataFilter": "part.lang = '\''eng'\''",
          "lexicalInterpolationConfig": {
            "lambda": 0
          }
        }
      ],
      "rerankingConfig": {
        "rerankerId": 272725717
      },
      "summary": [
        {
          "summarizerPromptName": "string",
          "maxSummarizedResults": 0,
          "responseLang": "string"
        }
      ]
    }
  ]
}'
```

### Example JSON response

Let’s take a closer look at the first response:

```json
{
  "responseSet": [
    {
      "response": [
        {
          "text": "Employee Handbook PTO is 20 days a year for all new employees. <b>Employees earn more vacation days per year of service up to 5 extra days.</b> Example: Once you begin your 5th year, you now have 25 vacation days.",
          "score": 4.30505,
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
              "value": "63"
            },
            {
              "name": "len",
              "value": "73"
            }
          ],
          "documentIndex": 0,
          "corpusKey": {
            "customerId": 0,
            "corpusId": 6,
            "semantics": "DEFAULT",
            "dim": [],
            "metadataFilter": "",
            "lexicalInterpolationConfig": null
          },
          "resultOffset": 66,
          "resultLength": 73
        },
	  // More results....
```

The API provides the following response:

"Employee Handbook PTO is 20 days a year for all new employees. <b>Employees 
earn more vacation days per year of service up to 5 extra days.</b> 
Example: Once you begin your 5th year, you now have 25 vacation days."


## Upload a file to the index

Since you already created an index, you can upload a new file with 
a simple POST request.

You need to input the following information:

* customer_id
* API Key
* corpus_id
* File name
* Path to file

In this example, you have a local rtf file that you want to upload to corpus 1.

### Example curl command


```json
curl -L -X POST 'https://api.vectara.io/v1/upload?c=123456789&o=1&d=true' \
-H 'Content-Type: multipart/form-data' \
-H 'Accept: application/json' \
-H 'x-api-key: zwt_asdfasdfasdfasdfasdfasdfasdfasdf' \
-F 'file=@"//Users/username/Documents/tmp/doc.rtf"'
```



### Example JSON response

The file uploads successfully and you get the following response:


```json
{"response":{
  "status": {
  },
  "quotaConsumed": {
    "numChars": "60",
    "numMetadataChars": "148"
  }
},"document":{
  "documentId": "doc.rtf",
  "metadataJson": "{\"X-TIKA:Parsed-By\":\"org.apache.tika.parser.microsoft.rtf.RTFParser\",\"Content-Type\":\"application/rtf\"}",
  "section": [{
    "id": 1,
    "text": "Simple test doc\n\nLorem ipsum \nLorem ipsum \nLorem ipsum \n "
  }]
}} 
```

## Index the document

After you upload a document, you index the data to become searchable. Indexing 
provides faster search results and also use fewer resources. An index is like 
a snapshot of your data.

In this example, you send a POST request to the /index endpoint along 
with appropriate parameters:


```json
curl -L -X POST 'https://api.vectara.io/v1/index' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'customer-id: 12345' \
-H 'x-api-key: asdfasdf' \
--data-raw '{
  "customerId": "12345",
  "corpusId": 1,
  "document": {
    "documentId": "doc.rtf",
    "title": "Sample test doc",
    "description": "This doc is a sample",
    "metadataJson": "{}",
    "customDims": [
      {
        "name": "string",
        "value": 0
      }
    ],
    "section": [
      {
        "id": 0,
        "title": "Section Title",
        "text": "Text in this section",
        "metadataJson": "string",
        "customDims": [
          {
            "name": "string",
            "value": 0
          }
        ],
        "section": [
          null
        ]
      }
    ]
  }
}'
```



## Query a term and return a specific number of results

In this example, you want to search for the term "technology," and then return 
only the first 5 results. 

### Example cURL command

```json

curl -X POST "https://api.vectara.io/v1/query" \
     -H "x-api-key: 12345" \
     -H "customer-id: 7890" \
     -d '{
         "corpusId": "2",
         "query": "technology",
         "numResults": 5,
         "start": 0
     }'



```

### Example response with 5 results

```json

{
  "status": "OK",
  "results": [
    {
      "text": "The future of technology is AI.",
      "score": 0.98,
      "documentIndex": 1
    },
    {
      "text": "Technology is evolving rapidly.",
      "score": 0.95,
      "documentIndex": 2
    },
    {
      "text": "Blockchain technology is revolutionary.",
      "score": 0.92,
      "documentIndex": 3
    },
    {
      "text": "Technology has its pros and cons.",
      "score": 0.90,
      "documentIndex": 4
    },
    {
      "text": "The role of technology in modern society.",
      "score": 0.88,
      "documentIndex": 5
    }
  ]
}

```

## Query with metadata filters

In this example, you want to query _cloud computing_ with 10 results in 
the _IT_ category.

### Example cURL Command

```json
curl -X POST "https://api.vectara.io/v1/query" \
     -H "x-api-key: 12345" \
     -H "customer-id: 7890" \
     -d '{
         "corpusId": "2",
         "query": "cloud computing",
         "numResults": 10,
         "metadataJson": {
             "category": "IT"
         }
     }'


### Example query response


```json

{
  "status": "OK",
  "results": [
    {
      "text": "Cloud computing is changing the IT landscape.",
      "score": 0.99,
      "documentIndex": 8
    },
    {
      "text": "The benefits of cloud computing are numerous.",
      "score": 0.96,
      "documentIndex": 9
    }
  ]
}

```




1. 


## Create a new index and ingest a document

In this example, you want to create a new index and ingest a new document in 
this new index.

1. Execute the following cURL command:

   ```json
   curl -X POST "https://api.vectara.io/v1/create-corpus" \
     -H "x-api-key: 12345" \
     -H "customer-id: 7890" \
     -d '{
         "name": "Tech Corpus"
     }'

   ```

You get the following response:

```json
{
  "status": "OK",
  "corpusId": "3"
}
```

2. Index a document into the new index with the following cURL command:

   ```json
   curl -X POST "https://api.vectara.io/v1/index" \
     -H "x-api-key: 12345" \
     -H "customer-id: 7890" \
     -d '{
         "corpusId": "3",
         "documentId": "doc_1",
         "text": "The future of technology is AI."
     }'
```
   You get the following response:

   ```json
   {
  "status": "OK"
   }
   ```


## List all indices and delete a specific index

1. Execute the following curl command:

   ```json
   curl -X GET "https://api.vectara.io/v1/list-corpora" \
     -H "x-api-key: 12345" \
     -H "customer-id: 7890"
```
You get the following response:


```json
   {
  "status": "OK",
  "corpora": [
    {"corpusId": "1", "name": "Default Corpus"},
    {"corpusId": "2", "name": "My Corpus"},
    {"corpusId": "3", "name": "Tech Corpus"}
  ]
}
```