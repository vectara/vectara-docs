---
id: integrate-with-llamaindex
title: Use Vectara with LlamaIndex
sidebar_label: Use Vectara with LlamaIndex
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

Vectara integrates with LlamaIndex through a new type of index called the 
Managed Index. This integration enables users to take advantage of the tools 
and capabilities offered by the LlamaIndex library while integrating with 
the Vectara generative AI platform.

Vectara provides an end-to-end platform that offers powerful generative AI 
capabilities for developers including data processing, vector storage, query 
flow, security, an dprivacy. Vectara fully manages this complex flow which 
makes things much easier for developers. They don’t have to specialize in the 
constantly evolving skills of large language models, embedding models, vector 
stores and MLOps



## How does the VectaraIndex work?

Let’s take a look at a simple question-answering example using VectaraIndex, 
in this case asking questions from one of Paul Graham’s Essays.

### Set Up Your Vectara Account and Corpus

1. Setup your Vectara account.
2. Create a corpus.
3. Create an API key.
4. Set up your Vectara `customer_id`, `corpus_id` and `api_key` as environment 
   variables, so that the VectaraIndex can access those easily.
   For example:

```
VECTARA_CUSTOMER_ID=<YOUR_CUSTOMER_ID>
VECTARA_CORPUS_ID=<YOUR_CORPUS_ID>
VECTARA_API_KEY=”zwt_RbZfGT…”
```


### Create a VectaraIndex instance with LlamaIndex

Building the Vectara Index is extremely simple:

```from llama_index import SimpleDirectoryReader
from llama_index.indices import VectaraIndex
documents = SimpleDirectoryReader("paul_graham").load_data()
index = VectaraIndex.from_documents(documents)
```

Load Paul Graham’s Essay using LlamaIndex’s `SimpleDirectoryReader` into a single 
document. The f`rom_documents()` constructor is then used to generate the 
`VectaraIndex` instance. 

Unlike the common flow that uses LlamaIndex tools like data connectors, 
parsers and embedding models to process the input data, with `VectaraIndex`
the documents are sent directly to Vectara through our Indexing API. 

Our platform then processes, chunks, encodes, and stores the text and 
embeddings into a corpus, making it available instantly for querying.

### Query the Data

After the data is fully ingested, you can take advantage of the rich set of 
query constructs built into LlamaIndex. For example let’s use the index to 
retrieve the top-k most relevant nodes:

```from pprint import pprint 

# docs should contain the 7 most relevant documents for the query 
retriever = index.as_retriever(similarity_top_k=7) 

docs = retriever.retrieve(“What is the IBM 1401?”) 
pprint(docs[0].node.text) 

('My stories were awful. They had hardly any plot, just characters with strong '
  'feelings, which I imagined made them deep. The first programs I tried '  
  'writing were on the IBM 1401 that our school district used for what was then ' 
  'called "data processing." This was in 9th grade, so I was 13 or 14. The ' 
  "school district's 1401 happened to be in the basement of our junior high " 
  'school, and my friend Rich Draves and I got permission to use it.')
```

Here we printed out the top matching Node given the query 
`“what is the IBM 1401?”` This query results in a call to Vectara’s Search API 
that returns the top-k matching document segments. 

Those results are transformed into NodeWithScore objects and can be used as 
usual with the rest of the LlamaIndex querying tools. For example we can use 
LlamaIndex’s `query_engine()` to convert the retrieved matching document 
segments (nodes) into a comprehensive response to our question:


```# Get an answer to the query based on the content of the essay
response = index.as_query_engine().query("What can the 1401 do?")
print(response)

"The 1401 was used for "data processing" and could load programs into memory 
and run them. It had a card reader, printer, CPU, disk drives, and used an 
early version of Fortran as the programming language. The only form of input 
to programs was data stored on punched cards."
```

### Why Use VectaraIndex with LlamaIndex?

By adding the concept of a “Managed Index” and the VectaraIndex to LlamaIndex, 
users can continue to take advantage of the tools and capabilities offered by 
the LlamaIndex library while integrating with a generative AI platform like 
Vectara.

LlamaIndex makes it super easy to populate VectaraIndex with content from any 
document or data source, while utilizing the Vectara service for managing the 
document processing, chunking, embedding and making all of this data available 
for advanced retrieval in query time using the LlamaIndex library.

:::tip

VectaraIndex is based on the new LlamaIndex Managed Index abstraction, which 
better supports GenAI platforms like Vectara, and enables additional vendors 
who also provide end-to-end platforms to join in.

:::

Retrievers and Query Engines are just the tip of the iceberg. Using a managed 
index with Vectara, developers have full access to advanced utilities like 
routers, advanced query engines, data agents, chat engines, and more! Being 
able to retrieve context using Vectara empowers developers to build these 
complex applications using LlamaIndex components.

For example, in the following code we use the chat engine in LlamaIndex to 
quickly create a chat interaction using our VectaraIndex:

```chat = index.as_chat_engine(chat_mode='context')
res = chat.chat("When did the author learn Lisp?")
print(res.response)

“The author learned Lisp in college.”
```

A follow up question retains the chat history for context, as you might expect:

chat.chat("and was it helpful for projects?").response

```“Yes, learning Lisp was helpful for the author's projects. They used Lisp in both 
Viaweb and Y Combinator, indicating its usefulness in their work.”
chat.chat("what was a distinctive characteristic of that programming language?").response

“A distinctive characteristic of Lisp is that its core is a language defined by 
writing an interpreter in itself. It was originally designed as a formal model 
of computation and an alternative to the Turing machine. This self-referential 
nature of Lisp sets it apart from other programming languages.”
```

For more information on how to use chat-engines and other query capabilities 
with LlamaIndex, check out the [full documentation here](https://docs.llamaindex.ai/en/latest/index.html).


