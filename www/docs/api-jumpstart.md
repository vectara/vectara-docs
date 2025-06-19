---
id: api-recipes
title: API Recipes
sidebar_label: API Recipes
---

import CodePanel from '@site/src/theme/CodePanel';

Using our APIs enable application developers and data engineers to seamlessly
integrate the <Config v="names.product"/> semantic search capabilities into
your applications. After you review this section, you can
check out our [API Reference](/docs/rest-api/vectara-rest-api-v-2) to experiment with Vectara's REST APIs directly
from your browser!

The Vectara Console and our APIs work hand-in-hand as part of the app development
process. For example, a builder uses this following workflow:

- Fine-tune a query's lambda and filters until the answer quality is just
  right.
- Copy the request directly from the Vectara Console and paste it into your IDE.
- Copy the customer ID and API key from the Vectara Console to further configure
  the request.
- Test out the software and then verify that requests are hitting your
  corpus by checking the querying graph on the Overview tab.

Let’s get you started with using the <Config v="names.product"/> APIs so that
you can perform queries on some data.

## What you will learn

We'll show you several example API recipes that include queries with some
values in the parameters, and then display example responses:

- [Search for answers in a corpus](/docs/api-recipes#search-for-answers-in-a-corpus)
- [Upload a file to the corpus](/docs/api-recipes#upload-a-file-to-the-corpus)
- [Issue a query and return a specific number of results](/docs/api-recipes#issue-a-query-and-return-a-specific-number-of-results)
- [List all corpora and delete a specific corpus](/docs/api-recipes#list-all-corpora-and-delete-a-specific-corpus)

To issue the types of API calls in these recipes, you typically need the
following information that you can get from the Vectara Console UI:

- Customer ID
- Corpus ID
- API Key

### Search for answers in a corpus

In this example, you have a corpus with uploaded data from an Employee
Handbook. Now you want to ask, _“How much PTO is offered to employees each
year?”_

To issue the cURL command in the example, you input the following
field values:

- `x-api-key` = `abc_12345defg67890hij09876`
- `corpus_key` = `employee-handbook`
- `query` = How much PTO is offered to employees each year?

#### Example cURL command

This example queries the corpus with the question about annual PTO.

<CodePanel
  snippets={[
    {
      language: 'bash',
      code: `curl -L -X POST 'https://api.vectara.io/v2/corpora/employee-handbook/query' \\
-H 'Content-Type: application/json' \\
-H 'Accept: application/json' \\
-H 'x-api-key: abc_12345defg67890hij09876' \\
--data-raw '{
  "query": "How much PTO is offered to employees each year?",
  "stream_response": false,
  "search": {
    "limit": 20,
    "context_configuration": {
      "sentences_before": 3,
      "sentences_after": 3,
      "start_tag": "<b>",
      "end_tag": "</b>"
    },
    "metadata_filter": "part.lang = \'eng\'",
    "lexical_interpolation": 0.1,
    "semantics": "default"
  },
  "generation": [
    {
      "generation_preset_name": "mockingbird-2.0",
      "max_used_search_results": 5
    }
  ]
}'`
    }
  ]}
  title="Vectara API Query"
  annotations={{
    bash: [
      { line: 4, text: 'Replace with your actual API key.' },
      { line: 13, text: 'Limits summarization to 5 results.' }
    ]
  }}
  layout="stacked"
/>


#### Example JSON response

Let’s take a closer look at the first response:

<CodePanel
  snippets={[
    {
      language: 'json',
      code: `{
  "summary": "Employee Handbook PTO is 20 days a year for all new employees. \n<b>Employees earn more vacation days per year of service up to 5 extra days.\n</b> Example: Once you begin your 5th year, you now have 25 vacation days.",
  "summary_language": "eng",
  "search_results": [
    {
      "text": "Employee Handbook PTO is 20 days a year for all new employees. \n<b>Employees earn more vacation days per year of service up to 5 extra days.\n</b> Example: Once you begin your 5th year, you now have 25 vacation days.",
      "score": 4.30505,
      "part_metadata": {
        "lang": "eng",
        "section": "1",
        "offset": "63",
        "len": "73"
      },
      "document_metadata": {},
      "document_id": "doc_123456789",
      "request_corpora_index": 0
    }
  ]
  // More results....
}`
    }
  ]}
  title="Example JSON Response"
  annotations={{
    json: [
      { line: 2, text: 'Summary of the query result with highlighted text.' },
      { line: 5, text: 'Detailed search result with metadata.' }
    ]
  }}
  layout="stacked"
/>

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

- `x-api-key`
- `corpus_id`
- File Path

#### Example cURL command

In this example, you have a local `doc.rtf` file that you want to
upload the corpus with the `corpus_key` as `employee-handbook`:

<CodePanel
  snippets={[
    {
      language: 'bash',
      code: `curl -L -X POST 'https://api.vectara.io/v2/corpora/employee-handbook/upload_file' \\
-H 'Content-Type: multipart/form-data' \\
-H 'Accept: application/json' \\
-H 'x-api-key: abc_12345defg67890hij09876' \\
-F 'file=@"//Users/username/Documents/tmp/doc.rtf"'`
    }
  ]}
  title="Upload File to Corpus"
  annotations={{
    bash: [
      { line: 4, text: 'Replace with your actual API key.' },
      { line: 5, text: 'Path to the file to upload; adjust as needed.' }
    ]
  }}
  layout="stacked"
/>

#### Example JSON response

The file uploads successfully and you get the following response:

<CodePanel
  snippets={[
    {
      language: 'json',
      code: `{
  "response": {
    "status": {},
    "quotaConsumed": {
      "numChars": "60",
      "numMetadataChars": "148"
    }
  },
  "document": {
    "documentId": "doc.rtf",
    "metadataJson": "{\"X-TIKA:Parsed-By\":\"org.apache.tika.parser.microsoft.rtf.RTFParser\",\"Content-Type\":\"application/rtf\"}",
    "section": [{
      "id": 1,
      "text": "Simple test doc\\n\\nLorem ipsum \\nLorem ipsum \\nLorem ipsum \\n "
    }]
  }
}`
    }
  ]}
  title="Upload File Response"
  annotations={{
    json: [
      { line: 3, text: 'Quota consumption details for the upload.' },
      { line: 6, text: 'Metadata about the uploaded document.' }
    ]
  }}
  layout="stacked"
/>

### Issue a query and return a specific number of results

In this query, you want to search for the term "technology" and then return
only the first 5 results.

#### Example cURL command

<CodePanel
  snippets={[
    {
      language: 'bash',
      code: `curl -L -X POST 'https://api.vectara.io/v2/corpora/technology-corpus/query' \\
-H 'Content-Type: application/json' \\
-H 'Accept: application/json' \\
-H 'x-api-key: abc_12345defg67890hij09876' \\
--data-raw '{
  "query": "Technology",
  "stream_response": false,
  "search": {
    "offset": 0,
    "limit": 5,
    "custom_dimensions": {},
    "metadata_filter": "part.lang = \'eng\'",
    "lexical_interpolation": 0,
    "semantics": "default"
  },
  "generation": {
    "max_used_search_results": 5
  }
}'`
    }
  ]}
  title="Query with 5 Results"
  annotations={{
    bash: [
      { line: 4, text: 'Replace with your actual API key.' },
      { line: 10, text: 'Limits the number of results to 5.' }
    ]
  }}
  layout="stacked"
/>

#### Example JSON response with 5 results

<CodePanel
  snippets={[
    {
      language: 'json',
      code: `{
  "summary": "The future of technology is AI. Technology is evolving rapidly, with
    generative AI technology being revolutionary. While technology has its pros and cons,
    it plays a significant role in modern society.",
  "summary_language": "eng",
  "search_results": [
    {
      "text": "The future of technology is AI.",
      "score": 0.98,
      "document_id": "doc_1",
      "request_corpora_index": 0
    },
    {
      "text": "Technology is evolving rapidly.",
      "score": 0.95,
      "document_id": "doc_2",
      "request_corpora_index": 0
    },
    {
      "text": "Generative AI technology is revolutionary.",
      "score": 0.92,
      "document_id": "doc_3",
      "request_corpora_index": 0
    },
    {
      "text": "Technology has its pros and cons.",
      "score": 0.90,
      "document_id": "doc_4",
      "request_corpora_index": 0
    },
    {
      "text": "The role of technology in modern society.",
      "score": 0.88,
      "document_id": "doc_5",
      "request_corpora_index": 0
    }
  ]
}`
    }
  ]}
  title="Response with 5 Results"
  annotations={{
    json: [
      { line: 2, text: 'Summary of the search results.' },
      { line: 5, text: 'First of the five returned results.' }
    ]
  }}
  layout="stacked"
/>

### List all corpora and delete a specific corpus

In this example, you want to list all corpora that contain the word "handbook" in
the name.

1. Execute the following curl command to list the corpora:

  <CodePanel
  snippets={[
    {
      language: 'bash',
      code: `curl -L -X GET 'https://api.vectara.io/v2/corpora?limit=8&filter=handbook' \\
   -H 'Content-Type: application/json' \\
   -H 'Accept: application/json' \\
   -H 'x-api-key: abc_12345defg67890hij09876'`
    }
  ]}
  title="List Corpora with Filter"
  annotations={{
    bash: [
      { line: 4, text: 'Replace with your actual API key.' },
      { line: 2, text: 'Filters corpora containing "handbook" and limits to 8.' }
    ]
  }}
  layout="stacked"
/>

   You get the following response:

   <CodePanel
  snippets={[
    {
      language: 'json',
      code: `{
 "corpus": [
   {
   "id": 6,
   "key": "Employee handbook",
   "description": "Employee guidelines from HR",
   "enabled": true,
   "queries_are_answers": false,
   "documents_are_questions": false,
   "encoder_id": "enc_0",
   },
  {
   "id": 11,
   "name": "Employee Handbook",
   "description": "Pet Policy",
   "enabled": true,
   "queries_are_answers": false,
   "documents_are_questions": false,
   "encoder_id": "enc_0",
  },
  {
   "id": 13,
   "name": "2025 handbook",
   "description": "",
   "enabled": true,
   "queries_are_answers": false,
   "documents_are_questions": false,
   "encoder_id": "enc_0",
 }
],
"metadata": {
 "page_key": ""
}
}`
    }
  ]}
  title="List Corpora Response"
  annotations={{
    json: [
      { line: 3, text: 'First corpus in the list.' },
      { line: 12, text: 'Second corpus with a different description.' }
    ]
  }}
  layout="stacked"
/>

1. Execute the following curl command to delete a specific corpus with `corpus_id` = 13.

<CodePanel
  snippets={[
    {
      language: 'bash',
      code: `curl -L -X DELETE 'https://api.vectara.io/v2/corpora/2022-handbook' \\
  -H 'Content-Type: application/json' \\
  -H 'Accept: application/json' \\
  -H 'x-api-key: abc_12345defg67890hij09876'`
    }
  ]}
  title="Delete Corpus"
  annotations={{
    bash: [
      { line: 2, text: 'Specifies the corpus to delete (e.g., "2022-handbook").' },
      { line: 4, text: 'Replace with your actual API key.' }
    ]
  }}
  layout="stacked"
/>

You get the following response:

<CodePanel
  snippets={[
    {
      language: 'json',
      code: `{
 "status": 204,
 "message": "Corpus deleted successfully"
}`
    }
  ]}
  title="Delete Corpus Response"
  annotations={{
    json: [
      { line: 2, text: 'HTTP status code 204 indicates success.' }
    ]
  }}
  layout="stacked"
/>

3. Execute the curl command from Step 1 again and the corpus you deleted
   no longer exists.

This API recipes section provided a variety of query examples that you can leverage
as you start building with <Config v="names.product"/>.
