---
id: search-quick-start
title: Quickstart
sidebar_label: Quickstart
---

import CodePanel from '@site/src/theme/CodePanel';

The fastest way to experience Vectara immediately is by querying our pre-built 
sample data.

1. Navigate to the [**Corpora page**](https://console.vectara.com/console/corpora/list).
2. Click the drop-down on the **Create corpus** button, and select 
   **Try a sample corpus**.  
   The sample data populates the corpus and takes you to the [**Query tab**](https://console.vectara.com/console/corpus/key/black-holes-sample-data/query) of the samples corpus.
   :::tip
   Want to use your own data? Read the [**Data ingestion guide**](/docs/build/data-ingestion) to
   create a new corpus and upload your documents (PDFs, TXT, etc.).
   :::
3. Type a query like `What's inside a black hole?` and press Enter.  
   If you're using your own data, type a query relevant to the data that you 
   uploaded.  
   ![Sample corpus search](/img/sample-corpus-search-results.png)   
   The `score` value is our confidence in the match. The text under each result 
is a snippet from the source document.
1. You can experiment with different retrieval and generation options like 
   hybrid search, reranking, and summarization.

## Search for answers with the Query API

:::tip Tip
Use our [**Query APIs**](/docs/rest-api/queries) directly or use our [**Vectara Python SDK**](/docs/sdk/vectara-python-sdk) 
if you're working on Python applications.
:::

Query an existing corpus and get AI-generated answers with context. In this 
example, you query the `black-holes-sample-data` corpus.

<CodePanel
  snippets={[
    {
      language: 'bash',
      code: `curl -L -X POST 'https://api.vectara.io/v2/corpora/black-holes-sample-data/query' \\
    -H 'Content-Type: application/json' \\
    -H 'Accept: application/json' \\
    -H 'x-api-key: YOUR_API_KEY' \\
    -d '{
        "query": "What's inside a black hole?",
        "stream_response": false,
        "search": {
          "limit": 25,
          "context_configuration": {
            "sentences_before": 2,
            "sentences_after": 2,
            "start_tag": "<b>",
            "end_tag": "</b>"
          },
          "metadata_filter": "part.lang = \'eng\'",
          "lexical_interpolation": 0.005,
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
  title="Example API query"
  annotations={{
    bash: [
      { line: 4, text: 'Replace with your actual API key.' },
      { line: 9, text: 'Sets context to 2 sentences before and after finding matching text.' },
      { line: 10, text: 'Limits summarization to 25 results.' },
      { line: 21, text: 'Specifies Mockingbird 2.0 as the generation preset.' }
    ]
  }}
  layout="stacked"
/>


Let’s take a closer look at the first response:

<CodePanel
  collapsible={false}
  snippets={[
    {
      language: 'json',
      code: `[
    {
        "type": "search_results",
        "search_results": [
            {
                "text": "Inside of the event horizon, all paths bring the particle closer to the ...",
                "score": 0.9837850332260132,
                "part_metadata": {
                    "title": "Event horizon",
                    "breadcrumb": [
                        "Black hole",
                        "Properties and structure"
                    ],
                    "lang": "eng",
                    "section": 8,
                    "offset": 1086,
                    "len": 188
                },
                "document_metadata": {
                    "X-TIKA:Parsed-By": "org.apache.tika.parser.html.JSoupParser",
                    "dc:title": "Black hole - Wikipedia",
                    "Content-Encoding": "ISO-8859-1",
                    "X-TIKA:detectedEncoding": "ISO-8859-1",
                    "X-TIKA:encodingDetector": "UniversalEncodingDetector",
                    "Content-Language": "en",
                    "Content-Type": "text/html; charset=ISO-8859-1",
                    "title": "Black hole - Wikipedia"
                },
                "document_id": "file_1763427394244"
            },
            {
                "text": More results....
}`
    }]}
  title="Example JSON Response"
  annotations={{
    json: [
      { line: 6, text: 'Text of the query result with highlighted text.' },
      { line: 7, text: 'The factual consistency score of the search result.' },
      { line: 8, text: 'Detailed part level metadata.' },
      { line: 19, text: 'Detailed document level metadata.' },
      { line: 32, text: 'The next search result.' },
    ]
  }}
  layout="stacked"
/>

The result answers the question and returns additional details about the
query, such as the language, section, and offset.

