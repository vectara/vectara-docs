---
id: vectara-python-sdk
title: Vectara Python
sidebar_label: Python
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

The Vectara Python SDK provides a simple and intuitive way to interact with 
the Vectara platform. This guide walks you through installation, 
authentication, and core operations to get you building AI-powered 
applications quickly.

## Install the Vectara SDK

<CodePanel
  title="Install SDK"
  snippets={[
    {
      language: 'bash',
      code: `pip install vectara`,
    },
  ]}
  customWidth="50%"
/>

Start by installing the Vectara SDK using pip. The SDK requires Python 3.7 or higher 
and includes all necessary dependencies for making API calls to the Vectara platform. 
The installation process is straightforward and should complete within a few seconds.  

---

## Get started

<CodePanel
  title="Authenticate with API Key"
  snippets={[
    {
      language: "python",
      code: "from vectara import Vectara\n\nclient = Vectara(api_key=\"YOUR_API_KEY\")"
    }
  ]}
  annotations={{
    python: [
      { line: 3, text: "Initialize client with your API key" }
    ]
  }}
  customWidth="50%"
/>

<CodePanel
  title="Authenticate with OAuth"
  snippets={[
    {
      language: "python",
      code: "from vectara import Vectara\n\nclient = Vectara(\n    client_id=\"YOUR_CLIENT_ID\",\n    client_secret=\"YOUR_CLIENT_SECRET\"\n)"
    }
  ]}
  annotations={{
    python: [
      { line: 3, text: "Use OAuth credentials for authentication" }
    ]
  }}
  customWidth="50%"
/>

To get started with the Vectara Python SDK:
* Authenticate with either an API key or OAuth credentials 
(client ID and client secret).
* Create a Vectara client using one of our examples.
* Obtain your API key or OAuth credentials from the Vectara platform. 

---

## Create a Corpus

<CodePanel
  title="Create Corpus"
  snippets={[
    {
      language: 'python',
      code: `corpus = client.corpora.create({
    "corpus_key": "product_docs",
    "name": "Product Documentation", 
    "description": "User guides and technical manuals"
})`,
    },
  ]}
  annotations={{
    python: [
      { line: 2, text: 'Corpus key must be unique within your account' },
      { line: 4, text: 'Description helps organize your corpora' },
    ],
  }}
  customWidth="50%"
/>


A corpus is a collection of documents that you can search and query. Think of 
it as a database for your text content. Each corpus can have its own 
configuration, metadata schema, and access controls.

Creating a corpus requires a unique key and descriptive name. The corpus key 
acts as an identifier for all future operations, so choose something 
memorable and descriptive.

---

## Indexing Documents

You can add documents to a corpus in two formats: 
* Structured (with sections and titles)
* Core (simple text parts). 

Alternatively, upload files like PDFs for automatic parsing.

### Add a structured Document

Structured documents organize content into sections with titles and metadata. 

Build a structured document with multiple sections and metadata, perfect for 
detailed content organization.

<CodePanel
  title="Add Structured Document"
  snippets={[
    {
      language: "python",
      code: "from vectara import StructuredDocument, StructuredDocumentSection\n\nclient.documents.create(\n    corpus_key=\"my-corpus-key\",\n    request=StructuredDocument(\n        id=\"doc-001\",\n        type=\"structured\",\n        sections=[\n            StructuredDocumentSection(\n                id=\"sec-001\",\n                title=\"Introduction\",\n                text=\"Welcome to our guide.\",\n                metadata={\"section\": \"1.1\"}\n            ),\n            StructuredDocumentSection(\n                id=\"sec-002\",\n                title=\"Features\",\n                text=\"Explore key features.\",\n                metadata={\"section\": \"1.2\"}\n            )\n        ],\n        metadata={\"source\": \"website\"}\n    )\n)"
    }
  ]}
  annotations={{
    python: [
      { line: 6, text: "Unique document ID" },
      { line: 10, text: "Section with title and text" },
      { line: 13, text: "Metadata for filtering or querying" }
    ]
  }}
  layout="stacked"
/>


### Add a core document

Core documents consist of simple text parts, each with optional metadata, 
suitable for straightforward content indexing.

Streamline document ingestion by uploading files like PDFs for automatic text 
extraction and indexing. This example demonstrates how to add a file with 
metadata, accelerating the process of enriching your corpus with existing content.

<CodePanel
  title="Add Core Document"
  snippets={[
    {
      language: "python",
      code: "from vectara import CoreDocument, CoreDocumentPart\n\nclient.documents.create(\n    corpus_key=\"my-corpus-key\",\n    request=CoreDocument(\n        id=\"doc-002\",\n        type=\"core\",\n        document_parts=[\n            CoreDocumentPart(\n                text=\"This is the first part of the document.\",\n                metadata={\"author\": \"Alice\"}\n            ),\n            CoreDocumentPart(\n                text=\"This is the second part, covering additional details.\",\n                metadata={\"author\": \"Bob\"}\n            )\n        ],\n        metadata={\"category\": \"guide\"}\n    )\n)"
    }
  ]}
  annotations={{
    python: [
      { line: 6, text: "Unique document ID" },
      { line: 10, text: "Text content for a document part" },
      { line: 11, text: "Part-specific metadata" },
      { line: 18, text: "Document-level metadata" }
    ]
  }}
  layout="stacked"
/>

## Upload files

Upload files (Word documents, txt files, and PDFs) for automatic text 
extraction and indexing.

In this example, you upload a file to your corpus with metadata.

<CodePanel
  title="Upload File"
  snippets={[
    {
      language: 'python',
      code: `response = client.upload.file(
    corpus_key="product_docs",
    file=open("user_guide.pdf", "rb"),
    filename="user_guide.pdf",
    metadata={"type": "manual", "version": "2.1"}
)`,
    },
  ]}
  annotations={{
    python: [
      { line: 3, text: 'Open file in binary mode for upload' },
      { line: 5, text: 'Metadata helps with filtering and organization' },
    ],
  }}
  layout="stacked"
/>

## Query a corpus

Execute a query with advanced search parameters, including filtering and 
generation, to retrieve targeted results.

This example shows how to perform a hybrid search with filtering, context, reranking, and generation, 
delivering precise answers to enhance business intelligence.

<CodePanel
  title="Query a Corpus"
  snippets={[
    {
      language: "python",
      code: "from vectara import SearchCorporaParameters, KeyedSearchCorpus, ContextConfiguration, CustomerSpecificReranker, GenerationParameters\n\nsearch = SearchCorporaParameters(\n    corpora=[\n        KeyedSearchCorpus(\n            corpus_key=\"my-corpus-key\",\n            metadata_filter=\"\",\n            lexical_interpolation=0.005\n        )\n    ],\n    context_configuration=ContextConfiguration(\n        sentences_before=2,\n        sentences_after=2\n    ),\n    reranker=CustomerSpecificReranker(reranker_id=\"rnk_272725719\")\n)\ngeneration = GenerationParameters(\n    response_language=\"eng\",\n    enable_factual_consistency_score=True\n)\n\nresponse = client.query(\n    query=\"What are the key features?\",\n    search=search,\n    generation=generation\n)\nprint(response.answer)"
    }
  ]}
  annotations={{
    python: [
      { line: 6, text: "Target corpus for search" },
      { line: 12, text: "Context around search results" },
      { line: 15, text: "Rerank results for relevance" }
    ]
  }}
  layout="stacked"
/>




