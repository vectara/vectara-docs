---
id: data-ingestion
title: Data ingestion
sidebar_label: Data ingestion
---

import { Grid } from "@site/src/components/ui/Grid";
import { Spacer } from "@site/src/components/ui/Spacer";
import { TopicButton } from "@site/src/components/ui/TopicButton";

import CodePanel from '@site/src/theme/CodePanel';

Preparing data powers effective search, retrieval, and operations in Vectara 
and involves the processes to ingest and optimize your data for search, 
retrieval, and AI-driven operations. Whether you're importing data, applying 
metadata, or defining filters, these capabilities help lay the foundation for 
the effective use of our platform.

This section covers information about getting data into Vectara:

- **[Add content to a corpus](#add-content-to-a-corpus):** How to upload documents 
  to a corpus.
- **[Supported file formats](#supported-file-formats):** What file types Vectara
  can process.
- **[Structure your data](#structure-your-data):** Document and part-level formats, 
  metadata, and sections.
- **[Ingest your data](#ingest-your-data):** Using the File Upload API vs Index Document API.
- **[Document chunking](#document-chunking):** Chunking strategies and trade-offs

After understanding these basics, explore these advanced capabilities:

  - **[Working with tables](/docs/build/working-with-tables)** - Ingest and query tabular data
  - **[Metadata filters](/docs/build/prepare-data/metadata-filters)** - Filter results using SQL-like expressions

:::tip Agent Artifacts
For temporary file analysis without permanent indexing, agents support
[artifacts](/docs/agents/artifacts) within sessions as a workspace for documents and
images. Artifacts enable multi-modal analysis without corpus ingestion.
:::

## Add content to a corpus

A corpus is like a container that stores documents and their associated 
metadata in Vectara. It serves as a repository to organize and manage the 
collection of content you plan to index, search, and analyze. When you create 
a corpus, you set up a dedicated space where you can upload and organize your 
documents.

You can upload files or index structured documents into an existing corpus in 
two ways: upload document files or index structured documents with 
JSON. Choose the method that fits your data format. You provide the `x-api-key`, 
`corpus_key`, and file path (for file upload), or document content (for direct 
indexing).

### Option 1: Upload a document file

In this example, you have a local `doc.rtf` file that you want to
upload the corpus with the `corpus_key` as `employee-handbook`:

<CodePanel
  title="Upload File to Corpus"
  snippets={[
    {
      language: 'bash',
      code: `curl -L -X POST 'https://api.vectara.io/v2/corpora/employee-handbook/upload_file' \\
-H 'Content-Type: multipart/form-data' \\
-H 'Accept: application/json' \\
-H 'x-api-key: YOUR_API_KEY' \\
-F 'file=@"//Users/username/Documents/tmp/doc.rtf"'`
    }
  ]}
  annotations={{
    bash: [
      { line: 1, text: 'Enter the corpus key.' },
      { line: 4, text: 'Replace with your actual API key.' },
      { line: 5, text: 'Path to the file to upload; adjust as needed.' }
    ]
  }}
  layout="stacked"
/>

#### Example upload file response

<CodePanel
  title="Upload File Response"
  snippets={[
    {
      language: 'json',
      code: `{
  "document": {
    "id": "doc.rtf",
    "title": "Sample Document",
    "sections": [{
      "id": 1,
      "text": "Simple test doc. Lorem ipsum dolor sit amet..."
    }]
  },
  "status": "indexed"
}`
    }]}  
  annotations={{
    json: [
      { line: 4, text: 'Document identifier and title' },
      { line: 8, text: 'Extracted and processed content' }
    ]
  }}
  layout="stacked"
/>

### Option 2: Index a document directly

If you don't have a file to upload, you can create a document directly with text content:

<CodePanel
  title="Index Document with Content"
  snippets={[
    {
      language: 'bash',
      code: `curl -X POST 'https://api.vectara.io/v2/corpora/employee-handbook/documents' \\
-H 'Content-Type: application/json' \\
-H 'x-api-key: YOUR_API_KEY' \\
-d '{
  "id": "pto-policy",
  "title": "PTO Policy",
  "sections": [{
    "text": "All new employees receive 20 days of PTO annually. Employees earn additional vacation days based on years of service, up to 5 extra days. After 5 years of service, employees have 25 vacation days total."
  }]
}'`
    }
  ]}
  annotations={{
    bash: [
      { line: 3, text: 'Your API key' },
      { line: 5, text: 'Document identifier' },
      { line: 8, text: 'The content to make searchable' }
    ]
  }}
  layout="stacked"
/>


## List and delete corpora

Manage your corpora by listing, filtering, and deleting them. In this example, 
you list all corpora that contain "handbook" in the name, then delete a 
specific corpus.

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
          { line: 1, text: 'Filters corpora containing "handbook" and limits to 8.' }
        ]
      }}
      layout="stacked"/>

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

2. Execute the following curl command to delete a specific corpus with `corpus_key` = `2025-handbook`.  

    <CodePanel
      snippets={[
        {
          language: 'bash',
          code: `curl -L -X DELETE 'https://api.vectara.io/v2/corpora/2025-handbook' \\
      -H 'Content-Type: application/json' \\
      -H 'Accept: application/json' \\
      -H 'x-api-key: abc_12345defg67890hij09876'`
        }
      ]}
      title="Delete Corpus"
      annotations={{
        bash: [
          { line: 1, text: 'Specifies the corpus to delete ("2025-handbook").' },
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


## Supported file formats

For a list of supported file types, see the [API Reference](/docs/rest-api/upload). Customers who need 
support for additional file types or data sources can use [Vectara Ingest](https://github.com/vectara/vectara-ingest), 
an open-source Python framework.

Vectara Ingest is an open-source Python framework that demonstrates how to 
crawl datasets and ingest them into Vectara. It extends the file type support 
beyond what is available in the standard file upload API.

:::caution Important
Vectara Ingest is an open-source project provided by Vectara without official 
support. This tool is provided "as-is" without warranties and usage is at your 
own discretion and risk.
:::

### Process additional document types with advanced features

- Enhanced PDF processing with table extraction.
- OCR (Optical Character Recognition) for scanned documents.
- Image content summarization using vision models.
- Custom document parsing through various parsers (unstructured, 
  llama_parse, docupanda, docling).

### Apply advanced processing

- Table detection and summarization in PDF, HTML, PPT, and DOCX files.
- PII (Personally Identifiable Information) masking.
- Custom metadata extraction.
- Flexible chunking strategies.

## Structure your data

Munging files into a structured data format helps preserve relationships 
between bits of data, retains special meaning of specific data types, and 
enables users to query the data with filters.

The `type: "structured"` format ensures that document-level 
metadata, sections, and optional nested sections are each preserved and 
indexable.

Let's use this National Institute of Health PDF as an example:

[www.techtransfer.nih.gov_tech_tab-3843.pdf](/img/www.techtransfer.nih.gov_tech_tab-3843.pdf)

Vectara offers a structured data format where users can convert PDFs to a 
format like the following structure:

<CodePanel snippets={[{language: "json", code: `{
   "type": "structured",
   "id": "TAB‑3843",
   "title": "Engineered Cell‑Penetrating Monoclonal Antibody for Universal Influenza Immunotherapy",
   "description": "Home » Tech » Engineered Cell‑Penetrating Monoclonal Antibody for Universal Influenza Immunotherapy",
   "metadata": {
     "developmentStatus": "Pre‑Clinical",
     "isAntibodiesProduct": true,
     "date": "2023‑05‑17",
     "patentSeriesCode": 63,
     "patentApplicationNumber": 365841
   },
   "sections": [
     {
       "title": "body",
       "text": "Influenza remains a burden on public health..."
     },
     {
       "title": "Clinical treatment",
       "text": "Clinical Treatment: CPP‑mAbs against influenza NP may...",
       "metadata": {
         "clinicalTreatment": "CPP‑mAbs against influenza NP may..."
       }
     },
     {
       "text": "Current vaccines remain effective for a short time period..."
     }
   ]
}`}]} title="Structured Format Example" layout="stacked" />

This data structure is built upon these core concepts:
* Document
* Metadata
* Sections
* Images (optional, embedded with base64 encoding)
* Tables (optional)

### Document

The document format provides high-level information that gets encoded into 
Vectara and allows users to retrieve this information using semantic search, 
keyword-based search, and hybrid search:

<CodePanel snippets={[{language: "json", code: `"documentId": "TAB‑3843",
  "title": "Engineered Cell‑Penetrating Monoclonal Antibody for Universal Inuenza Immunotherapy",
  "description": "Home » Tech » Engineered Cell‑Penetrating Monoclonal Antibody for Universal Inuenza Immunotherapy",`
  }]} title="Document Format Example" layout="stacked" />

* `documentId` specifies a unique identifier for the document.
* `title` specifies the heading of the document.
* `description` provides additional context about the document.

### Metadata

The document has **metadata** which can include any combination 
of text, numeric, or boolean properties:

In our example document, we selected different properties from the original PDF 
that are useful for the following scenarios:
* Filtering through different documents
* Cross-referencing a document with other data sources
* Comparing and grouping results

Defining metadata properties on the document level instead of the section 
level helps you retrieve the entire document rather than just a part of it. 
Let's look at these metadata properties in more detail.

#### Example Metadata Properties

<CodePanel snippets={[{language: "json", code: `{
   "metadata": {
     "developmentStatus": "Pre‑Clinical",
     "isAntibodiesProduct": true,
     "date": "2023‑05‑17",
     "patentSeriesCode": 63,
     "patentApplicationNumber": 365841
   }
}`}]} title="Metadata Example" layout="stacked" />

* `developmentStatus` specifies status of the patent, such as pre-clinical.
* `isAntibodiesProduct` indicates whether the patent applies to "antibodies-related" 
  products, which is the domain we care about in this contrived example.
* `date` specifies the date this document was created.
* `patentSeriesCode` specifies the patent series code number.
* `patentApplicationNumber` specifies the patent application number.



Metadata can also be attached to sections, which are an organization unit 
for grouping related bodies of text.

### Sections

When Vectara ingests a document, it splits the text in these sections into 
chunks and encodes them in vectors. This enables queries to retrieve 
them based on semantic similarity.

<CodePanel snippets={[{language: "json", code: `{
   "sections": [
     {
       "title": "body",
       "text": "Influenza remains a burden on public health..."
     },
     {
       "title": "Clinical treatment",
       "text": "Clinical Treatment: CPP‑mAbs against influenza NP may...",
       "metadata": {
         "clinicalTreatment": "CPP‑mAbs against influenza NP may..."
       }
     }
   ]
}`}]} title="Section Example" layout="stacked" />

* `text` specifies the body of text.
* `title` specifies an optional name for identifying the body of text. 
  This is like a heading in a document.
* `metadataJson` specifies an optional stringified JSON object, which can be 
  configured as flexibly as the root-level document metadata.
* `sections` specifies an optional array of child sections. Those sections 
  can also have their own child sections.

#### Nested Sections

You can also nest sections within sections, which also have their own 
titles, text, and metadata. The document is structured with a top-level 
`section` array that contains the parent sections. For example, the plays 
titled `King Lear` and `Antony and Cleopatra`.

<CodePanel snippets={[{language: "json", code: `{
   "type": "structured",
   "id": "selected-works-of-shakespeare",
   "title": "William Shakespeare, Greatest Hits",
   "metadata": {
     "timespan": "26 April 1564---23 April 1616",
     "stars": 5,
    "author": "William Shakespeare"
   },
   "sections": [
     {
       "title": "King Lear",
       "sections": [
         {
           "title": "Act I",
           "text": "KENT: I thought the king had more affected the Duke of Albany than Cornwall....",
           "metadata": {
             "stage-instructions": "Enter KENT, GLOUCESTER, and EDMUND"
           }
         },
         {
           "title": "Act II",
           "text": "EDMUND: Save thee, Curan. ...",
           "metadata": {
             "stage-instructions": "Enter EDMUND, and CURAN meets him"
           }
         }
       ]
     },
     {
       "title": "Antony and Cleopatra",
       "text": "PHILO: Nay, but this dotage of our general's O'erflows the measure: those his..."
     }
   ]
}`
}]} title="Section Example" layout="stacked" />

`King Lear` has nested sections for `Act 1` and `Act II`, 
which contain additional text and metadata, while `Antony and Cleopatra` 
directly contains the content for this parent section. This example 
demonstrates the flexibility of the document structure that Vectara can ingest.

### Special Document Metadata

Vectara Console recognizes special metadata which have proven useful across 
many use cases.

#### `date`
If you define `date` in the document's metadata, it appears in the Console 
Corpus Search interface. This can be useful for tracking the recency of a 
document, since older docs can lose relevance in some scenarios.

#### `url`
If you define `url` in the document's metadata, it appears in the Console Corpus 
Search interface as a clickable link. This can be useful for enabling users to 
click through to the document's original resource, such a web page or
downloadable artifact.

#### `ts_create`
If you define `ts_create` and define a creation date in epoch seconds, it 
appears in the Console Corpus Search interface as the document's date of 
creation.

#### `author`
If you define `author` and then define either a string or an array of 
strings, these values appear in the Console Corpus Search interface 
as the document's author(s).

## Ingest your data

Efficient data ingestion, also known as indexing, is critical for ensuring 
that your application delivers fast, accurate, and relevant query results. 
Whether handling structured, semi-structured, or unstructured data, selecting 
the right indexing method can significantly impact the performance and 
usability of your applications. Vectara offers multiple indexing methods to 
accommodate different use cases that enable users to efficiently index their 
data and leverage our advanced search capabilities. This flexible approach 
allows for the precise integration of Vectara’s search functionalities into 
different applications.

### Vectara Ingest: open-source data ingestion framework

Getting data into Vectara is simple using either our UI or APIs. For 
customers who need to ingest data from various sources or require support for 
additional file types beyond those officially supported, we provide 
[Vectara Ingest](https://github.com/vectara/vectara-ingest), an open-source 
Python framework with preconfigured templates for many popular data sources.

Vectara Ingest enables ingestion from:
- Websites and RSS feeds
- Enterprise platforms (SharePoint, Confluence, ServiceNow, HubSpot)
- Collaboration tools (Slack, Notion, Jira)
- Social media (Twitter/X, YouTube)
- Databases and structured data (CSV)
- And many more sources

:::caution Important
Vectara Ingest is an open-source project provided without official support. 
For production use cases requiring support, we recommend using the officially 
supported APIs as described below.
:::

### Data ingestion with the indexing APIs

Selecting the ideal Indexing API for your application can significantly impact 
the effectiveness of integrating Vectara’s search functionalities into your 
application. The best indexing method depends on your needs, such as when you 
have semi-structured or unstructured documents, or if you want more granular 
control over the data segmentation and indexing process.

Vectara offers the following indexing APIs for these different scenarios:

### File upload API

If you want to extract text from existing, unstructured documents in common 
file types with minimal manual intervention, use the [File Upload API](/docs/rest-api/upload-file). This 
option enables you to attach additional, user-defined metadata at the 
document level. 
  
You can also upload JSON versions of the same Document protocol buffers 
passed to the standard indexing API and the low-level indexing API, as long 
as the file ends with the `.json` extension. Our platform intelligently 
determines which flavor of document proto it's looking at. Note that sending 
any other kind of JSON to the indexing endpoint will cause it to error out.
  
We recommend this option if you have not written your own extraction logic 
already.

The File Upload API supports a comprehensive set of document formats including 
PDF, Microsoft Office files, HTML, Markdown, and more. For a complete list of 
supported file types, see [Supported File Types](/docs/rest-api/upload).

For file types not officially supported or for ingestion from various data 
sources, consider using the open-source [Vectara Ingest](https://github.com/vectara/vectara-ingest) 
framework, which provides extended capabilities at your own discretion.

### Index document API
  
The Index Document API has a discriminator property `type` that determines the 
format of the document. The supported document types are `structured` and `core`.

#### Structured document definition

If you have structured documents that you want Vectara to index and segment
into chunks for you, use the the `structured` type, which has a document with 
layout features such as `title`, `description`,` metadata`, `custom_dimensions`, and 
an array of `sections`. In Vectara, a `document` is very flexible in what it can 
represent. It can be as short as a tweet or as long as the 1600 page Bible.

The document is also broken down into sections. Each `sections` can 
have a unique `id`, `title`, `text`, and `metadata` and also contain other 
nested `sections`.
  
We recommend this option for applications where documents already have a 
clear and consistent structure like news articles, product descriptions, 
rows in database tables or CSV files, or records from an ERP system.

#### Core document definition

For the most advanced use cases, if you want full, granular control to chunk 
your document into `document_parts`, use the `core` type, which has a document 
structure that closely corresponds to Vectara's internal document data model. 
It contains an `id`, `metadata`, and an array of individual `document_parts`, 
which make up granular sections of the overall document container. 
These parts define the actual text to be indexed. Each part is converted 
into exactly one vector in the underlying index. Each part can contain 
individual `text` blocks, `context`, and` metadata`, as well as custom dimension 
values that affect ranking results.
  
We recommend this option for Machine Learning teams with expertise in neural
information retrieval who want low-level control over how documents are 
indexed in our systems. Using the low-level API typically involves 
significant coordination between your Machine Learning team and 
organizational stakeholders.

By leveraging the appropriate data indexing method is based on the nature of 
your documents, you can ingest and structure your data for optimal performance 
with Vectara's Retrieval Augmented Generatation as-a-Service platform.

### Document chunking

Chunking refers to the process of breaking a document into smaller parts 
(chunks) for efficient indexing and retrieval. Chunking is critical for 
optimizing search performance, particularly for large documents and corpora.

Both the File Upload API and Indexing API provide an optional 
`chunking_strategy` parameter that enables you to define how to chunk 
documents during ingestion. When deciding on a chunking strategy, consider 
the trade-offs between granularity and latency.

#### Default chunking

By default, the platform uses sentence-based chunking, where each chunk 
typically contains one complete sentence. This strategy can lead to higher 
retrieval latency for large documents due to the increased number of chunks 
created.

#### Fixed-size chunking

When you set the `type` to `max_chars_chunking_strategy`, you can then define 
the maximum number of characters per chunk, which enables more granular control 
over how the platform splits the document. We recommend trying 3–7 sentences 
per chunk, which is about 512–1024 characters. This may be ideal for balancing 
retrieval latency and context preservation

### Choosing the right ingestion method

When deciding how to ingest your data into Vectara, consider these options:

#### For officially supported file types

Use the **File Upload API** if you have:
- Standard document formats (PDF, Word, PowerPoint, HTML, etc.)
- Documents that don't require custom preprocessing
- Need for reliable, supported ingestion

#### For structured data

Use the **Index Document API** with `structured` type if you have:
- Data with clear hierarchical structure
- Content from databases or APIs
- Documents that need custom sectioning

#### For advanced control

Use the **Index Document API** with `core` type if you need:
- Precise control over chunking
- Custom embeddings or dimensions
- Fine-tuned retrieval optimization

#### For extended capabilities

Consider **Vectara Ingest** (open-source) if you need:
- Support for data sources not covered by official APIs
- Advanced document processing (OCR, table extraction)
- Integration with enterprise platforms
- Batch processing from multiple sources

Evaluate your support requirements when choosing between official 
APIs and the open-source framework.