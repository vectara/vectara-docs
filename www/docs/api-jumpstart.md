---
id: api-jumpstart
title: API Jumpstart
sidebar_label: API Jumpstart
---

Let’s get you started with the <Config v="names.product"/> API so that you can perform some 
more advanced operations with your data. To issue the types of API calls in these 
examples, you must have the following information available:

* Customer ID
* Index ID
* API Key

## Search for answers in an index

In this example, you already uploaded data from an Employee Handbook. Now you  
want to issue an API call to ask, _“How much PTO is offered to 
employees each year?”_

You need to input the following information:

* `customer_id` and `customerId`
* `x-api-key`
* `corpus_id`
* `query`


### Example cURL command

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

The example API call provides the following response:

_"Employee Handbook PTO is 20 days a year for all new employees. <b>Employees 
earn more vacation days per year of service up to 5 extra days.</b> 
Example: Once you begin your 5th year, you now have 25 vacation days."_

Let's take a look at some other API calls that you can make.

## Upload a file to the index

If you want to add a file to an existing index, you can upload a new file with 
a simple POST request.

You need to input the following information:

* `customer_id`
* `x-api-key`
* `corpus_id`
* File name 
* Path to the file

In this example, you have a local `.rtf` file that you want to upload to 
index 1, which is `corpus_id` = 1.

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

## Update and reindex the document

After you update a document, you can reindex the data to become searchable 
with the updated content. Indexing provides faster search results and it also 
use fewer resources. An index is like a snapshot of your data.

In this example, you send a POST request to the /index endpoint along 
with appropriate parameters:

### Example cURL command


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

### Example JSON Response

```json
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

## Update the metadata of the uploaded file

In this example, you want to add the following metadata to the `.rtf` file:

* "Document-Version": "2.0" - Indicates that this is the second version of the document.
* "Last-Modified-By": "JohnDoe" - Specifies the last person who modified the document.
* "Security-Level": "High" - Indicates the security level of the updated document.
* "Keywords": ["Quantum", "Physics", "Research"] - An array of keywords relevant to the document.

Execute the following cURL command to update the document:

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
    "metadataJson": "{\"X-TIKA:Parsed-By\":\"org.apache.tika.parser.microsoft.rtf.RTFParser\",\"Content-Type\":\"application/rtf\", \"Document-Version\":\"2.0\", \"Last-Modified-By\":\"JohnDoe\", \"Security-Level\":\"High\", \"Keywords\":[\"Quantum\", \"Physics\", \"Research\"]}"
  }
}'
```
You get the following JSON response:

```json
{
  "response": {
    "status": {
      "code": "OK"
    },
    "quotaConsumed": {
      "numChars": "60",
      "numMetadataChars": "250"
    }
  },
  "document": {
    "documentId": "doc.rtf",
    "metadataJson": "{\"X-TIKA:Parsed-By\":\"org.apache.tika.parser.microsoft.rtf.RTFParser\",\"Content-Type\":\"application/rtf\", \"Document-Version\":\"2.0\", \"Last-Modified-By\":\"JohnDoe\", \"Security-Level\":\"High\", \"Keywords\":[\"Quantum\", \"Physics\", \"Research\"]}"
  }
}
```
The metadataJson field now includes additional metadata that can help with 
version tracking, identifying the last person who modified the document, 
setting security levels, and categorizing the document based on keywords.


## Issue a query and return a specific number of results

In this query, you want to search for the term "technology" and then return 
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

### Example JSON response with 5 results

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

## Issue a query with metadata filters

In this example, you want to query the phrase _cloud computing_ with 2 
results in the _IT_ category.

### Example cURL Command

```json
curl -X POST "https://api.vectara.io/v1/query" \
     -H "x-api-key: 12345" \
     -H "customer-id: 7890" \
     -d '{
         "corpusId": "2",
         "query": "cloud computing",
         "numResults": 2,
         "metadataJson": {
             "category": "IT"
         }
     }'
```

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
## Create a new index and ingest a document

In this example, you want to create a new index and also ingest a document in 
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

1. Execute the following curl command to list the indices:

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

2. Execute the following curl command to delete a specific index with `corpus_id` = 3.

  ```json
  curl -X DELETE "https://api.vectara.io/v1/delete-corpus" \
     -H "x-api-key: 12345" \
     -H "customer-id: 7890" \
     -d '{
         "corpusId": "3"
     }'
    ```

     You get the following response:

     ```json
     {
  "status": "OK"
     }
   ```


3. Execute the curl command from Step 1 again:

  You get the following response:

   ```json
   {
  "status": "OK",
  "corpora": [
    {"corpusId": "1", "name": "Default Corpus"},
    {"corpusId": "2", "name": "My Corpus"},
    ]
   }
   ```
  Notice that you only have 2 indices now.

## Update a document, reindex the document, and query the index

In this example, you want to update a documet with new information. Reindexing 
the document improves data retrieval time when you ask a query. After the 
reindex, you want to query the index and get a result from the updated information.

1. Execute the following curl command to update an existing document in your 
   index:

   ```json
   curl -X POST "https://api.vectara.io/v1/index" \
  -H "x-api-key: 12345" \
  -H "customer-id: 7890" \
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
   
   ```json
   curl -X POST "https://api.vectara.io/v1/index" \
  -H "x-api-key: 12345" \
  -H "customer-id: 7890" \
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

2. Reindex the updated document:

  ```json
  curl -X POST "https://api.vectara.io/v1/core/index" \
  -H "x-api-key: 12345" \
  -H "customer-id: 7890" \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "7890",
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

  ```json
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
   
   ```json
   curl -X POST "https://api.vectara.io/v1/query" \
  -H "x-api-key: 12345" \
  -H "customer-id: 7890" \
  -H "Content-Type: application/json" \
  -d '{
    "corpusId": "2",
    "query": "Is entanglement the key to a Theory of Everything?"
  }'
   ```
   You get the following response:

   ```json
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
this updated document to ensure that the latest content is earchable. Finally, 
you issued a query that asked a question about the new content.