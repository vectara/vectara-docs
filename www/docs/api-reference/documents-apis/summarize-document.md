---
id: summarize-document
title: Summarize Document API Definition
sidebar_label: Summarize Document API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

Organizations often struggle with extracting relevant insights from extensive 
documentation, such as vendor quotes, financial statements, and technical 
reports. Manually reviewing these documents is both time-consuming and prone 
to errors. 

The tech preview of the Documentation Summarization API enables users to 
generate concise summaries that capture essential insights from single 
documents without having to process entire documents manually. Efficiently 
process large documents, extract key insights, and interact with real-time
data summaries.

* Enable streaming for large documents to receive summaries incrementally.
* Customize `prompt_template` to fine-tune summary output for specific domains.
* Use standard responses for small documents where streaming is unnecessary.
* Monitor streaming events to track the progress of real-time summarization.

## Summarize Document Request and Response Details

To generate a summary for an individual document, send a `POST` request to 
`/v2/corpora/{corpus_key}/documents/{document_id}/summarize`. You specify the 
unique `corpus_key` and the `document_id` of the document that you want to 
summarize. 

The request body specifies additional parameters:

* `llm_name`: Determines which Large Language Model (LLM) you want to generate 
  the summary.
* `prompt_template`: Enables users to customize the prompt of how the summary 
  is generated, leveraging Apache Velocity templates. 
* `model_parameters`: Lets you modify behavior further with additional parameters 
  for the specified model used when generating the summary.
* `stream_response`: Enables real-time streamed responses. By default, this is 
* set to `false`.

:::tip Note
The documentation length is limited by the context window of your selected LLM.
:::

### Example request

```json
{
  "llm_id": "llm_custom_llama3_70B",
  "prompt_template": "Summarize this document concisely, highlighting key points.",
  "additional_properties": {},
  "stream_response": true,
}
```

## Response formats

The API supports two response modes:

* **Standard**: Provides a complete summary in one response.
* **Streaming** Provides incremental responses using Server-Sent Events (SSE).

### Non-streaming response

In standard mode, the API returns a structured response containing the 
complete summary of the document. The summary field contains the generated 
text, enabling users to extract essential information quickly.


```json
{
    "summary": "The ABC1 0XYZ document provides details on its energy-efficient ARM microcontroller, Bluetooth 5.2 capabilities, and security features. It includes a breakdown of its low-power operation, hardware accelerators, and applications for IoT and embedded systems. The document further details supported development tools and firmware integration."
}
```

### Streaming response

For streaming responses, the API returns Server-Sent Events (SSE). The first 
event begins streaming partial results as soon as they are available, while 
the final event marks the end of the summarization process.

```json
{
    "type": "generation_chunk",
    "content": "The ABC1 0XYZ document provides details on its energy-efficient ARM..."
}
{
    "type": "generation_end",
    "content": "The document further details supported development tools and firmware integration."
}
```

The streamed response consists of multiple events:

* `generation_info`: Contains the `rendered_prompt` which is the compiled 
  prompt sent to the LLM for document summarization.
* `generation_chunk`: Returns partial chunk of the generated summary.
* `generation_end`: Marks the completion of the summary generation.
* `error`: Returns an error message if summarization fails.
* `end`: Indicates the end of the streaming session.

## Prompt template example

When crafting a prompt, you can access your document with the `$vectaraDocument` 
field. This example shows a simple prompt:

```json
[
  {
    "role": "user",
    "content": "Summarize the document: $vectaraDocument.json()"
  }
]
```
The document also has the following methods to support custom prompts. 

* `$vectaraDocument.json()`: Provides a JSON representation of the whole document.
* `$vectaraDocument.id()`: Specifies the unique identifier of the document (`document_id`)
* `$vectaraDocument.metadata()`: Specifies metadata from the document.  
  For example, 
  `$vectaraDocument.metadata().get("key")` retrieves a specific metadata value by key.
* `$vectaraDocument.parts()`: Returns an array of document parts which you can look 
  through.  
  For example, `#foreach ($part in $vectaraDocument.parts())`.  
* `$part.text()`: Retrieves the text of the part.
* `$part.metadata()`: Retrieves metadata of a part.
* `$part.hasTable()`: Determines if the part contains a table.
* `$part.table()`: Provides access to the table within the part. For example, 
  use `$part.table().json()` to retrieve the table in JSON format.

