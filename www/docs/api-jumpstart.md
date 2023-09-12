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
  index by checking the querying graph on the Overview tab.

Let’s get you started with using the <Config v="names.product"/> APIs so that 
you can perform queries on some data. 

## What you will learn

We'll show you several example API recipes that include queries with some 
values in the parameters, and then display example responses:
* [Search for answers in an index](/docs/api-recipes#search-for-answers-in-an-index)
* [Upload a file to the index](/docs/api-recipes#upload-a-file-to-the-index)
* [Issue a query and return a specific number of results](/docs/api-recipes#issue-a-query-and-return-a-specific-number-of-results)
* [Issue a query with metadata filters](/docs/api-recipes#issue-a-query-with-metadata-filters)
* [Create a new index and ingest a document](/docs/api-recipes#create-a-new-index-and-ingest-a-document)
* [List all indices and delete a specific index](/docs/api-recipes#list-all-indices-and-delete-a-specific-index)
* [Update a document, reindex the document, and query the index](/docs/api-recipes#update-a-document-reindex-the-document-and-query-the-index)

To issue the types of API calls in these recipes, you typically need the 
following information that you can get from the console UI:

* Customer ID
* Index ID
* API Key

### Search for answers in an index

In this example, you have an index with uploaded data from an Employee 
Handbook. Now you want to ask, _“How much PTO is offered to employees each 
year?”_

To issue the cURL command in the example, you input the following 
field values:

* `customer_id` and `customerId` = 123456789
* `x-api-key` = abc_12345defg67890hij09876
* `corpus_id` = 1
* `query` = How much PTO is offered to employees each year?


#### Example cURL command

This example queries the index with the question about annual PTO.

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

### Upload a file to the index

If you want to add a file to an existing index, you can upload a new file with 
a simple command.

You need to input the following information:

* `customer_id`
* `x-api-key`
* `corpus_id`
* File name 
* Path to the file

#### Example cURL command

In this example command, you have a local `doc.rtf` file that you want to upload to 
index 1, which is `corpus_id` = 1.

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

### Update and reindex the document

After you update a document, you can reindex the data to become searchable 
with the updated content. Indexing provides faster search results and it also 
use fewer resources. An index is like a snapshot of your data.

#### Example cURL command

In this example, you send a POST request to the index endpoint along 
with appropriate parameters:

```js
curl -L -X POST 'https://api.vectara.io/v1/index' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-H 'customer-id: 123456789' \
-H 'x-api-key: abc_12345defg67890hij09876' \
--data-raw '{
  "customerId": "123456789",
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

#### Example JSON Response

```js
{
  "status": {
    "code": "OK"
  },
  "quotaConsumed": {
    "numChars": "250",
    "numMetadataChars": "15"
  }
}

```

### Issue a query and return a specific number of results

In this query, you want to search for the term "technology" and then return 
only the first 5 results. 

#### Example cURL command

```js
curl -X POST "https://api.vectara.io/v1/query" \
     -H "x-api-key: abc_12345defg67890hij09876" \
     -H "customer-id: 123456789" \
     -d '{
         "corpusId": "2",
         "query": "technology",
         "numResults": 5,
         "start": 0
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

### Issue a query with metadata filters

In this example, you want to query the phrase _cloud computing_ with 2 
results in the _IT_ category.

#### Example cURL command

```js
curl -X POST "https://api.vectara.io/v1/query" \
     -H "x-api-key: abc_12345defg67890hij09876" \
     -H "customer-id: 123456789" \
     -d '{
         "corpusId": "2",
         "query": "IT,
         "numResults": 2,
         "metadataJson": {
             "category": "IT"
         }
     }'
```

#### Example JSON response


```js
{
  "status": "OK",
  "results": [
    {
      "text": "Generative AI is changing the IT landscape.",
      "score": 0.99,
      "documentIndex": 8
    },
    {
      "text": "The benefits of Generative AI are numerous.",
      "score": 0.96,
      "documentIndex": 9
    }
  ]
}
```
### Create a new index and ingest a document

In this example, you want to create a new index and also ingest a document in 
this new index.

1. Execute the following cURL command:

   ```js
   curl -X POST "https://api.vectara.io/v1/create-corpus" \
     -H "x-api-key: abc_12345defg67890hij09876" \
     -H "customer-id: 123456789" \
     -d '{
         "name": "AI Future"
     }'
   ```

 You get the following response:

 ```js
{
  "status": "OK",
  "corpusId": "3"
}
 ```

2. Index a document into the new index with the following cURL command:

   ```js
   curl -X POST "https://api.vectara.io/v1/index" \
     -H "x-api-key: abc_12345defg67890hij09876" \
     -H "customer-id: 123456789" \
     -d '{
         "corpusId": "3",
         "documentId": "doc_1",
         "text": "The future of technology is AI."
     }'
   ```

 You get the following response:

   ```js
   {
  "status": "OK"
   }
   ```


### List all indices and delete a specific index

1. Execute the following curl command to list the indices:

   ```js
   curl -X GET "https://api.vectara.io/v1/list-corpora" \
     -H "x-api-key: abc_12345defg67890hij09876" \
     -H "customer-id: 123456789"
   ```
You get the following response:

   ```js
   {
  "status": "OK",
  "corpora": [
    {"corpusId": "1", "name": "Modern AI"},
    {"corpusId": "2", "name": "AI Now"},
    {"corpusId": "3", "name": "AI Future"}
    ]
   }
   ```

2. Execute the following curl command to delete a specific index with `corpus_id` = 3.

  ```js
  curl -X DELETE "https://api.vectara.io/v1/delete-corpus" \
     -H "x-api-key: abc_12345defg67890hij09876" \
     -H "customer-id: 123456789" \
     -d '{
         "corpusId": "3"
     }'
    ```

     You get the following response:

     ```js
     {
  "status": "OK"
     }
   ```

3. Execute the curl command from Step 1 again. You get the following response: 

   ```js
   {
  "status": "OK",
  "corpora": [
    {"corpusId": "1", "name": "Modern AI"},
    {"corpusId": "2", "name": "AI Now"},
    ]
   }
   ```
  Notice that you only have 2 indices now.

### Update a document, reindex the document, and query the index

In this example, you want to update a document with new information. Reindexing 
the document improves data retrieval time when you ask a query. After the 
reindex, you want to query the index and get a result from the updated information.

1. Execute the following curl command to update an existing document in your 
   index:

   ```js
   curl -X POST "https://api.vectara.io/v1/index" \
  -H "x-api-key: abc_12345defg67890hij09876" \
  -H "customer-id: 123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "corpusId": "2",
    "document": {
      "documentId": "quantum_doc_001",
      "title": "Quantum Entanglement and Spacetime: An Updated Perspective",
      "description": "An updated analysis on quantum entanglement and its implications on spacetime.",
      "metadataJson": "{\"author\": \"Dr. Quantum\", \"field\": \"Quantum Physics\", \"version\": \"2.1\"}",
      "parts": [
        {
          "text": "Quantum entanglement is a phenomenon where the states of two particles are correlated.",
          "context": "Introduction"
        },
        {
          "text": "Einstein's 'spooky action at a distance' has been experimentally verified.",
          "context": "Historical Context"
        },
        {
          "text": "Entanglement could be the key to a Theory of Everything.",
          "context": "Recent Research"
        }
      ]
    }
  }'
   ```
   You get the following response:
   
   ```js
   {
  "status": {
    "code": "OK"
    },
  "quotaConsumed": {
    "numChars": "330",
    "numMetadataChars": "65"
    }
  }
   ```

2. Reindex the updated document:

  ```js
  curl -X POST "https://api.vectara.io/v1/core/index" \
  -H "x-api-key: abc_12345defg67890hij09876" \
  -H "customer-id: 123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "123456789",
    "corpusId": "2",
    "document": {
      "documentId": "quantum_doc_001",
      "metadataJson": "{\"author\": \"Dr. Quantum\", \"field\": \"Quantum Physics\", \"version\": \"2.1\"}",
      "parts": [
        {
          "text": "Entanglement could be the key to a Theory of Everything.",
          "context": "Recent Research"
        }
      ]
    }
  }'
  ```
  You get the following response:

  ```js
  {
  "status": {
    "code": "OK"
    },
  "quotaConsumed": {
    "numChars": "100",
    "numMetadataChars": "20"
    }
  }
  ```

3. Query the updated index:
   
   ```js
   curl -X POST "https://api.vectara.io/v1/query" \
  -H "x-api-key: abc_12345defg67890hij09876" \
  -H "customer-id: 123456789" \
  -H "Content-Type: application/json" \
  -d '{
    "corpusId": "2",
    "query": "Is entanglement the key to a Theory of Everything?"
  }'
   ```
   You get the following response:

   ```js
   {
  "status": {
    "code": "OK"
  },
  "results": [
    {
      "text": "Entanglement could be the key to a Theory of Everything.",
      "score": 0.99,
      "metadata": [
        {
          "key": "author",
          "value": "Dr. Quantum"
        },
        {
          "key": "field",
          "value": "Quantum Physics"
        },
        {
          "key": "version",
          "value": "2.1"
        }
      ],
      "documentIndex": 1,
      "corpusKey": "quantum_doc_001"
    }
  ]
}
   ```

In this final example, you updated an existing document to include new 
information from the latest version of a document. You wanted to reindex 
this updated document to ensure that the latest content is searchable. 
Finally, you issued a query that asked a question about the new content.

This API recipes section provided a variety of query examples that you can leverage 
as you start building with <Config v="names.product"/>.