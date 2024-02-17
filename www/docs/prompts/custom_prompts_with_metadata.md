---
id: custom-prompts-with-metadata
title: Custom Prompts with Metadata
sidebar_label: Custom Prompts with Metadata
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

Vectara supports Velocity Templates which offer developers a flexible way of 
customizing prompts and enhance the effectiveness of their generative AI 
applications. Prompts can indicate a `role`, `system`, and `content` which 
provide context about the kind of information that you want to retrieve.

## Example Prompt Template

```javascript
Example template:
[
  {"role": "system", "content": "You are a helpful search assistant."},
  #foreach ($qResult in $vectaraQueryResults)
     {"role": "user", "content": "Give me the $vectaraIdxWord[$foreach.index] search result."},
     {"role": "assistant", "content": "${qResult.getText()}" },
  #end
  {"role": "user", "content": "Generate a summary for the query \"${vectaraQuery}\" based on the above results."}
]
```

## Include Metadata in Prompt

This example shows how to get metadata associated with a single result `qResult` 
by retrieving metadata `docMetadata` from the date that information was 
answered `answerDate`. It then extracts the text content of `qResult`.

```javascript
{"role": "assistant", "content": "qResult.docMetadata().get('answerDate') $esc.java(${qResult.getText()})" },
```

The custom prompt example below shows more details about a custom prompt with 
metadata.

## Example Custom Prompt for an RFI Answering Bot

The following example prompt wants to create a Request for information (RFI) 
answering bot that includes metadata.

```javascript
[
	{
"role": "system",
"content": "You are an RFI answering assistant acting on behalf of the company Vectara. 
You are provided with search results from previously answered RFIs that may help answer 
the given question. The format of each result is the date in which it was answered and 
the response text.  You must summarize these results into a coherent answer. Only use 
information provided in this chat."},
	#foreach ($qResult in $vectaraQueryResults)
  	#if ($foreach.first)
    	{"role": "user", "content": "Search for \"$esc.java(${vectaraQuery})\", and give me the first search result."},
    	{"role": "assistant", "content": "$esc.java(${qResult.getText()})" },
  	#else
    	{"role": "user", "content": "Give me the $vectaraIdxWord[$foreach.index] search result."},
    	{"role": "assistant", "content": "qResult.docMetadata().get('answerDate') $esc.java(${qResult.getText()})" },
  	#end
	#end
	{
"role": "user",
"content": "Generate a comprehensive and informative answer for the question \"$esc.java(${vectaraQuery})\" solely 
based on the search results in this chat. You must only use information from the provided results. Combine search 
results together into a coherent answer. Do not repeat text. Only use the most relevant results that answer the 
question accurately. If there are 2 answers that seem in conflict, use the most recent answer according to the 
date.  If a result does not answer the question, do not use it. If the search results are not valid, 
respond with \"The returned results did not contain sufficient information to the question.\"."}
]
```

### Generative Prompt Breakdown

First, we ask the generative LLM to answer an RFI question and tell it how the 
results will come back from the query.

```javascript
{
"role": "system",
"content": "You are an RFI answering assistant acting on behalf of the company Vectara. 
You are provided with search results from previously answered RFIs that may help answer 
the given question. The format of each result is the date in which it was answered and 
the response text.  You must summarize these results into a coherent answer. Only use 
information provided in this chat."},

// Velocity Template to iterative through the results

"role": "user",
"content": "Generate a comprehensive and informative answer for the question \"$esc.java(${vectaraQuery})\" solely 
based on the search results in this chat. You must only use information from the provided results. Combine search 
results together into a coherent answer. Do not repeat text. Only use the most relevant results that answer the 
question accurately. If there are 2 answers that seem in conflict, use the most recent answer according to the 
date.  If a result does not answer the question, do not use it. If the search results are not valid, 
respond with \"The returned results did not contain sufficient information to the question.\"."}

```

Next, we want to iterate through `$vectaraQueryResults` inserting the results 
in the order that we like. `qResult.getText()` provides the most relelvant 
snippet of text that answers the query from the result. You can iterate to 
tell the LLM where to focuse its response, cut or omit results, and tell the query 
to reference individual results or even metadata.

```javascript
#foreach ($qResult in $vectaraQueryResults)
#if ($foreach.first)
  	{"role": "user", "content": "Search for \"$esc.java(${vectaraQuery})\", and give me the first search result."},
   	{"role": "assistant", "content": "$esc.java(${qResult.getText()})" },
#else
   	{"role": "user", "content": "Give me the $vectaraIdxWord[$foreach.index] search result."},
   	{"role": "assistant", "content": "qResult.docMetadata().get('answerDate') $esc.java(${qResult.getText()})" },
#end
#end
```

