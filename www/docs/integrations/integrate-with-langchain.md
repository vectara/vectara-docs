---
id: integrate-with-langchain
title: Integrate Vectara with LangChain
sidebar_label: Integrate with LangChain
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

This document provides a detailed guide on how to integrate Vectara with 
LangChain for building Generative AI applications with Retrieval Augmented 
Generation. LangChain is a framework for creating LLM-powered applications. 
This integration enables developers to create scalable and accurate 
applications that can handle a large volume of documents and queries.

The benefits of LangChain users integrating with Vectara include obtaining 
the most relevant facts through RAG, combining neural and keyword-style 
approaches to queries, efficient vector database reindexing, data security, 
data privacy, and optimizing latency and cost. 

:::tip

Check out our blog on [**5 Reasons to Use Vectara's LangChain Integration**](https://vectara.com/5-reasons-to-use-vectaras-langchain-integration/).

:::

## Set Up Vectara as a Vector Store with LangChain.js

To set up Vectara as a vector store:

1. Create a free Vectara account.
2. Create a corpus to store your data.
3. Create an API key with both QueryService and IndexService access for this 
   new corpus.
4. Configure your `.env` file or provide arguments to connect LangChain to the 
   corpus:
```
VECTARA_CUSTOMER_ID=your_customer_id
VECTARA_CORPUS_ID=your_corpus_id
VECTARA_API_KEY=your-vectara-api-key
```

You can provide multiple corpus IDs separated by commas for querying 
multiple corpora at once. For example: `VECTARA_CORPUS_ID=3,8,9,43`. 

For indexing multiple corpora, you'll need to create a separate VectaraStore 
instance for each corpus.

## Example Integrations

### Question and Answering with Retrieval Augmented Generation

This [simple example](https://github.com/langchain-ai/langchain/blob/b95002289409077965d99636b15a45300d9c0b9d/docs/use_cases/evaluation/data_augmented_question_answering.ipynb?ref=blog.langchain.dev#L8) from LangChain shows question-answering with RAG.
   
Vectara provides embeddings which we optimized for accurate retrieval, 
so LangChain users do not have to use (or pay for) an additional 
embedding model. Instead, LangChain uses `Vectara.from_documents()` to upload 
the documents into our index for this corpus, and then use that as a 
retriever in the chain:

```
from langchain.vectorstores import Vectara
loader = TextLoader(“state_of_the_union.txt”)
documents = loader.load()
vectara  = Vectara.from_documents(documents)
qa = RetrievalQA.from_llm(llm=OpenAI(), retriever=vectara.as_retriever())
print(qa({“query”:  “What did the president say about Ketanji Brown Jackson?”}))
```

Vectara takes the source documents and automatically chunks them in an
optimized manner and creates the embeddings. LangChain users don't even have 
to use the TextSplitter (and decide on chunk size), nor call (or pay for) 
OpenAIEmbeddings. Since Vectara has its own internal vector storage, these 
users do not need to use FAISS or any other commercial vector database.

Finally, you build a RetrievalQA (retrieval question-answer) chain in the same 
way as before, and again we get the response:

`He praised her legal ability and said he nominated her for the supreme court.`

### Add Two Documents and Perform a Similarity Search 

The following example shows how to integrate Vectara with LangChain for 
document management and similarity search:

1. Creates a Vectara store using environment variables.
2. Adds two documents with metadata to the Vectara store.
3. Performs a similarity search on the stored documents with the following 
   query: `"What were the women talking about?"`
4. Prints the search results that include the document content and a similarity
   score:
   ```
   "pageContent": "<b>In the room the women come and go talking of Michelangelo</b>",
    "metadata": {
      "lang": "eng",
      "offset": "0",
      "len": "57",
      "foo": "bar"
    }
   ```
5. Deletes the documents from the Vectara store.

```js
import { Document } from "langchain/document";
import { VectaraStore } from "@langchain/community/vectorstores/vectara";
import { VectaraSummaryRetriever } from "@langchain/community/retrievers/vectara_summary";

// Create the Vectara store.
const store = new VectaraStore({
  customerId: Number(process.env.VECTARA_CUSTOMER_ID),
  corpusId: Number(process.env.VECTARA_CORPUS_ID),
  apiKey: String(process.env.VECTARA_API_KEY),
  verbose: true,
});

// Add two documents with some metadata.
const doc_ids = await store.addDocuments([
  new Document({
    pageContent: "Do I dare to eat a peach?",
    metadata: {
      foo: "baz",
    },
  }),
  new Document({
    pageContent: "In the room the women come and go talking of Michelangelo",
    metadata: {
      foo: "bar",
    },
  }),
]);

// Perform a similarity search.
const resultsWithScore = await store.similaritySearchWithScore(
  "What were the women talking about?",
  1,
  {
    lambda: 0.025,
  }
);

// Print the results.
console.log(JSON.stringify(resultsWithScore, null, 2));
/*
[
  [
    {
      "pageContent": "In the room the women come and go talking of Michelangelo",
      "metadata": {
        "lang": "eng",
        "offset": "0",
        "len": "57",
        "foo": "bar"
      }
    },
    0.4678752
  ]
]
*/

const retriever = new VectaraSummaryRetriever({ vectara: store, topK: 3 });
const documents = await retriever.getRelevantDocuments(
  "What were the women talking about?"
);

console.log(JSON.stringify(documents, null, 2));
/*
[
  {
    "pageContent": "<b>In the room the women come and go talking of Michelangelo</b>",
    "metadata": {
      "lang": "eng",
      "offset": "0",
      "len": "57",
      "foo": "bar"
    }
  },
  {
    "pageContent": "<b>In the room the women come and go talking of Michelangelo</b>",
    "metadata": {
      "lang": "eng",
      "offset": "0",
      "len": "57",
      "foo": "bar"
    }
  },
  {
    "pageContent": "<b>In the room the women come and go talking of Michelangelo</b>",
    "metadata": {
      "lang": "eng",
      "offset": "0",
      "len": "57",
      "foo": "bar"
    }
  }
]
*/

// Delete the documents.
await store.deleteDocuments(doc_ids);
```
