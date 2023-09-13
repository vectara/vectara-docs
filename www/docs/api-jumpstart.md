---
id: api-recipes
title: API Recipes
sidebar_label: API Recipes
---
import {Config} from '@site/docs/definitions.md';

Using our APIs enable application developers and data engineers to seamlessly 
integrate the <Config v="names.product"/> semantic search capabilities into your applications. 

The Console UI and our APIs work hand-in-hand as part of the app development 
process. For example, a builder uses this following workflow: 

* Fine-tune a query's lambda and filters until the answer quality is just 
  right.
* Copy the request directly from the console and paste it into your IDE.
* Copy the customer ID and API key from Console to further configure 
  the request.
* Test out the software and then verify that requests are hitting your 
  corpus by checking the querying graph on the Overview tab.

Let’s get you started with using the <Config v="names.product"/> APIs so that 
you can perform queries on some data. 

## What you will learn

We'll show you several example API recipes that include queries with some 
values in the parameters, and then display example responses:
* [Search for answers in a corpus](/docs/api-recipes#search-for-answers-in-a-corpus)
* [Upload a file to the corpus](/docs/api-recipes#upload-a-file-to-the-corpus)
* [Issue a query and return a specific number of results](/docs/api-recipes#issue-a-query-and-return-a-specific-number-of-results)
* [List all corpora and delete a specific corpus](/docs/api-recipes#list-all-corpora-and-delete-a-specific-corpus)

To issue the types of API calls in these recipes, you typically need the 
following information that you can get from the console UI:

* Customer ID
* Corpus ID
* API Key

### Search for answers in a corpus

In this example, you have a corpus with uploaded data from an Employee 
Handbook. Now you want to ask, _“How much PTO is offered to employees each 
year?”_

To issue the cURL command in the example, you input the following 
field values:

* `customer_id` and `customerId` = 123456789
* `x-api-key` = abc_12345defg67890hij09876
* `corpus_id` = 1
* `query` = How much PTO is offered to employees each year?


#### Example cURL command

This example queries the corpus with the question about annual PTO.

```js
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
          "customerId": 123456789,
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

#### Example JSON response

Let’s take a closer look at the first response:

```js
{
  "responseSet": [
    {
      "response": [
        {
          "text": "Employee Handbook PTO is 20 days a year for all new employees. 
          <b>Employees earn more vacation days per year of service up to 5 extra 
          days.</b> Example: Once you begin your 5th year, you now have 25 
          vacation days.",
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
            "customerId": 1,
            "corpusId": 123456789,
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

The example API call provided the following response:

_"Employee Handbook PTO is 20 days a year for all new employees. <b>Employees 
earn more vacation days per year of service up to 5 extra days.</b> 
Example: Once you begin your 5th year, you now have 25 vacation days."_

The result answers the question and returns additional details about the 
query, such as the language, section, and offset. 

Let's take a look at some other API calls that you can make.

### Upload a file to the corpus

If you want to add a file to an existing corpus, you can upload a new file with 
a simple command.

You need to input the following information:

* `customer_id`
* `x-api-key`
* `corpus_id`
* File name 
* Path to the file

#### Example cURL command

In this example command, you have a local `doc.rtf` file that you want to 
upload to corpus 1, which is `corpus_id` = 1.

```js
curl -L -X POST 'https://api.vectara.io/v1/upload?c=123456789&o=1&d=true' \
-H 'Content-Type: multipart/form-data' \
-H 'Accept: application/json' \
-H 'x-api-key: abc_12345defg67890hij09876' \
-F 'file=@"//Users/username/Documents/tmp/doc.rtf"'
```

#### Example JSON response

The file uploads successfully and you get the following response:

```js
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

### Issue a query and return a specific number of results

In this query, you want to search for the term "technology" and then return 
only the first 5 results. 

#### Example cURL command

```js
curl -L -X POST 'https://api.vectara.io/v1/query' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'customer-id: 123456789' \
-H 'x-api-key: abc_12345defg67890hij09876' \
--data-raw '{
  "query": [
    {
      "query": "Technology",
      "start": 0,
      "numResults": 5,
      "corpusKey": [
        {
          "customerId": 123456789,
          "corpusId": 2,
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
#### Example JSON response with 5 results

```js
{
  "status": "OK",
  "results": [
    {
      "text": "The future of technology is AI.",
      "score": 0.98,
      "documentIndex": 1
      // More results....
    },
    {
      "text": "Technology is evolving rapidly.",
      "score": 0.95,
      "documentIndex": 2
    },
    {
      "text": "Generative AI technology is revolutionary.",
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
### List all corpora and delete a specific corpus

In this example, you want to list all corpora that contain the word "handbook" in 
the name.

1. Execute the following curl command to list the corpora:

   ```js
   curl -L -X POST 'https://api.vectara.io/v1/list-corpora' \
      -H 'Content-Type: application/json' \
      -H 'Accept: application/json' \
      -H 'customer-id: 123456789' \
      -H 'Authorization: Bearer zwt_bearer_token' \
      --data-raw '{
  "numResults": 8,
  "filter": "handbook"
   }'
   ```
You get the following response:

   ```js
   {
    "corpus": [
      {
      "id": 6,
      "name": "Employee handbook",
      "description": "Employee guidelines from HR",
      "enabled": true,
      "swapQenc": false,
      "swapIenc": false,
      "textless": false,
      "encrypted": false,
      "encoderId": "0",
      "metadataMaxBytes": 0,
      "faissIndexType": "",
      "customDimensions": [],
      "filterAttributes": []
      },
     {
      "id": 11,
      "name": "Employee Handbook",
      "description": "Pet Policy",
      "enabled": true,
      "swapQenc": false,
      "swapIenc": false,
      "textless": false,
      "encrypted": false,
      "encoderId": "0",
      "metadataMaxBytes": 0,
      "faissIndexType": "",
      "customDimensions": [],
      "filterAttributes": []
     },
     {
      "id": 13,
      "name": "2022 handbook",
      "description": "",
      "enabled": true,
      "swapQenc": false,
      "swapIenc": false,
      "textless": false,
      "encrypted": false,
      "encoderId": "0",
      "metadataMaxBytes": 0,
      "faissIndexType": "",
      "customDimensions": [],
      "filterAttributes": []
    }
   ],
   "pageKey": "",
   "status": null
  }
   ```

2. Execute the following curl command to delete a specific corpus with `corpus_id` = 13.

  ```js
  curl -L -X POST 'https://api.vectara.io/v1/delete-corpus' \
      -H 'Content-Type: application/json' \
      -H 'Accept: application/json' \
      -H 'customer-id: 123456789' \
      -H 'Authorization: Bearer zwt_bearer_token' \
     --data-raw '{
  "corpusId": 13
  }'
  ```

 You get the following response:

 ```js
 {
   "status": {
    "code": "OK",
    "statusDetail": "Corpus Deleted",
    "cause": null
  }
 }
 ```

3. Execute the curl command from Step 1 again and the corpus you deleted 
   no longer exists.

This API recipes section provided a variety of query examples that you can leverage 
as you start building with <Config v="names.product"/>.