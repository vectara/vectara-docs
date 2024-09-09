---
id: custom-prompts-with-metadata
title: Custom Prompts with Metadata
sidebar_label: Custom Prompts with Metadata
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

Vectara handles the system and user prompts automatically, but if you want to
do it yourself, Vectara now empowers developers with a flexible way of
customizing prompts with metadata. Our Custom Retrieval Augmented Generation
(RAG) Prompt Engine provides several available prompt variables and functions
for Scale users to customize prompt templates in their [Queries](/docs/api-reference/search-apis/search).

## Available prompt variables

The following table shows the available custom prompt template variables:

| Variable  | Description  | Example Usage Input  | Example Usage Output  |
|---|---|---|---|
| $vectaraOutChars  | Number of characters  | See below  | See below  |
| $vectaraLangCode  | ISO639 v3 code for the passed language code  | See below  | See below  |
| $vectaraQuery  | The query provided by the user  | Generate a summary in $vectaraOutChars characters in language '${vectaraLangCode}' for the query ${vectaraQuery} solely based on the search results in this chat.  | Generate a summary in 512 characters in language 'ara' for the query 'Give me "some" search results.' solely based on the search results in this chat.  |
| $vectaraIdxWord  | A utility array to convert the index to words i.e "first", "second", "third", "forth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"  | $vectaraIdxWord[0]  | first  |
| $vectaraLangName  | Set to the requested language name. The language can either be requested explicitly or detected from the language of the query.  | You are a helpful assistant. Answer in ${vectaraLangName}.  | You are a helpful assistant. Answer in Arabic.  |
| $vectaraQueryResults  | An array of query results is found in the response, sorted by relevance score.  | #foreach ($qResult in $vectaraQueryResults)    {"role": "user", "content": "Give me the $vectaraIdxWord[$foreach.index] search result."},    {"role": "assistant", "content": ${qResult.text()} },#end  | {"role": "user", "content": "Give me the second search result."},{"role": "assistant", "content": "2nd result" },  |


## Available Prompt Functions

The following table shows the available custom prompt functions: 

| Function | Description  | Example Usage Input  | Example Usage Output  |
|---|---|---|---|
| #foreach ($qResult in $vectaraQueryResults)  | Iterates through each query result  | -  | -  |
| $qResult.getText() or $qResult.text()  | Returns text of the query result  | $qResult.text()  | Result text  |
| $qResult.docMetadata()  | Returns the metadata of the document this result belongs to  | $qResult.docMetadata()  | {"title": "documentTitle", ...}  |
| $qResult.docMetadata().present()  | Returns true/false if there are any values present in the metadata  | #if ($qResult.docMetadata().present())...#end  |   |
| $qResult.docMetadata().get("title")  | Returns the specified field value from doc metadata, an incorrect key would result in an empty value  | $qResult.docMetadata().get("title")  | documentTitle  |
| $qResult.partMetadata().present()  | Returns true/false if there are any values present in the metadata  | #if ($qResult.partMetadata().present())...#end  |   |
| $qResult.partMetadata()  | Returns the metadata of the part of the document this result belongs to  | $qResult.partMetadata()  | {"page": "1", ...}  |
| $qResult.partMetadata().get("page")  | Returns the specified field value from part metadata, incorrect key would result in empty value  | $qResult.docMetadata().get("page")  | "1"  |


## Setting a Custom Prompt

To set a custom prompt, Scale users can add custom `promptText` within the 
`summary` [object](/docs/learn/grounded-generation/select-a-summarizer) of a [query](/docs/api-reference/search-apis/search) 
to override the default prompt text. The [API Reference](/docs/rest-api/query) provides a custom 
prompt in the Query endpoint Scale Example.

## Include metadata in prompt

This snippet shows how to get metadata associated with a single result `qResult`
by retrieving metadata `docMetadata` from the date that information was
answered `answerDate`. It then extracts the text content of `qResult`.

```javascript
{"role": "assistant", "content": "qResult.docMetadata().get('answerDate') ${qResult.getText()}" },
```

Let's dive into a full custom prompt example that shows more details about a
custom prompt with
metadata.

## Example custom prompt template for an RFI answering bot

The following example prompt creates a Request for information (RFI)
answering bot that includes metadata. First, we ask the generative LLM to
answer an RFI question and tell it how the results will come back from the
query.

We want to iterate through `$vectaraQueryResults` inserting the results
in the order that we like. `$qResult.getText()` provides the most relelvant
snippet of text that answers the query from the result. You can iterate to
tell the LLM where to focuse its response, cut or omit results, and tell the
query to reference individual results or even metadata.

For each result, we simulate the user requesting the next search result. Then
we have an assistant's response, which includes the answer date from the
metadata of the document.

Finally, we generate a comprehensive summary and answer to the question with
additional rules and constraints. For example, if a result does not answer the
question, we do not use the result. If search results are not valid, then the
user gets a response that `The returned results did not contain sufficient information to the question.`

```javascript
[
    {
        "role": "system",
        "content": "You are an RFI answering assistant acting on behalf of the company Vectara. You are provided with search results from previously answered RFIs that may help answer the given question. The format of each result is the date in         which it was answered and the response text. You must summarize these results into a coherent answer. Only use information provided in this chat."
    },
    #foreach ($qResult in $vectaraQueryResults)
    #if ($foreach.first)
        {"role": "user", "content": "Search for '${vectaraQuery}', and give me the first search result."},
        {"role": "assistant", "content": "${qResult.getText()}" },
    #else
        {"role": "user", "content": "Give me the $vectaraIdxWord[$foreach.index] search result."},
        {"role": "assistant", "content": "$qResult.docMetadata().get('answerDate') ${qResult.getText()}" },
    #end
    #end
    {
        "role": "user",
        "content": "Generate a comprehensive and informative answer for the question ${vectaraQuery} solely based on the search results in this chat. You must only use information from the provided results. Combine search results together into a coherent answer. Do not repeat text. Only use the most relevant results that answer the question accurately. If there are 2 answers that seem in conflict, use the most recent answer according to the date. If a result does not answer the question, do not use it. If the search results are not valid, respond with 'The returned results did not contain sufficient information to the question.'"
    }
]

```
