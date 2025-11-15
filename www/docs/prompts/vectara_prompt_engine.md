---
id: vectara-prompt-engine
title: Custom prompts
sidebar_label: Custom prompts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Vectara Prompt Engine empowers our users to customize prompt templates 
that can reference the most relevant text and metadata for use cases that 
require Retrieval Augmented Generation (RAG). Vectara enables developers to 
directly add the retrieved documents and their metadata into the prompt 
generation. Vectara supports [Velocity Templates](https://velocity.apache.org/engine/1.7/user-guide.html) which offer 
developers a flexible way of customizing prompt templates and enhance the 
effectiveness of their generative AI applications.

This capability unlocks more advanced workflows and customizations to answer 
questions about your business data. For example, answer questions based on 
previous answers, such as with RFI, RFP, and questionnaires. Draft support 
tickets from user feedback. You can even customize the formatting of results.

:::tip
Users can override the default prompt text with custom `prompt_template` in the 
`generation` object of a [**query**](/docs/rest-api/queries).
:::

## Effective prompts and templates

Effective prompt templates guide LLMs to generate responses that meet specific 
user needs or objectives in generative AI applications. Define an objective 
that outlines what you aim to achieve, and provide detailed context to 
enrich the prompts with nuanced background information to help the AI 
understand the scenario better. Iteration and refinement are important 
processes to help you improve the outcome of your prompts.

:::note
Reach out to support if you want to modify the default prompt that Vectara 
uses.
:::

## Prompt template design
Prompt template design includes a specific a `role` and `content` about this role, 
which provide context about how you want the role to behave and the kind of 
information that you want to retrieve. These values can also specify [variables 
and functions](/docs/prompts/custom-prompts-with-metadata) to provide more nuanced context. You then 
add different operations to customize the types of answers you want to retrieve.


### Role

The `role` specifies the function of the individual or entity that you want to
respond to the prompt. This function indicates the rules, responsibilities, and
perspective of the action being performed. The typical role value is `system`.

You then add context to this system with a `content` value such as
`You are a helpful search assistant.` You could also specify the platform
or environment within which you want the prompt issued and subsequent action
taken and other rules that you want the system to follow.

### Content

The `content` provides more information about the role and what you expect the
entity to perform. This is crucial when you have loops and iterations in your
prompt templates, like in our example. For each loop, specify the precise action or
feedback desired from the prompt. Capture the context of what needs to be
accomplished or directed. Clear and concise content helps ensure that the
prompt communicates its intent effectively.

Example content can include “You are a helpful search assistant” or
“Generate a summary for the query”.

## Example prompt template

The following example prompt specifies a role as a helpful search assistant. 
It then loops through Vectara query results with specific variables and 
functions. Finally, it generates a [summary](docs/learn/grounded-generation/select-a-summarizer) for the query. 

<CodePanel snippets={[{language: "javascript", code: `[
  {"role": "system", "content": "You are a helpful search assistant."},
  #foreach (\$qResult in \$vectaraQueryResults)
     {"role": "user", "content": "Give me the \$vectaraIdxWord[\$foreach.index] search result."},
     {"role": "assistant", "content": "\${qResult.getText()}" },
  #end
  {"role": "user", "content": "Generate a summary for the query '\${vectaraQuery}' based on the above results."}
]`
}]} title="Code Example" layout="stacked" />

## Custom prompts with metadata

Vectara handles the system and user prompts automatically, but if you want to
do it yourself, Vectara now empowers developers with a flexible way of
customizing prompts with metadata. Our Custom Retrieval Augmented Generation
(RAG) Prompt Engine provides several available prompt variables and functions
for our users to customize prompt templates in their [Queries](/docs/rest-api/queries).

### Available prompt variables

The following table shows the available custom prompt template variables:

| Variable  | Description  | Example Usage Input  | Example Usage Output  |
|---|---|---|---|
| $vectaraOutChars  | Number of characters  | See below  | See below  |
| $vectaraLangCode  | ISO639 v3 code for the passed language code  | See below  | See below  |
| $vectaraQuery  | The query provided by the user  | Generate a summary in $vectaraOutChars characters in language ```'${vectaraLangCode}'``` for the query ```${vectaraQuery}``` solely based on the search results in this chat.  | Generate a summary in 512 characters in language 'ara' for the query 'Give me "some" search results.' solely based on the search results in this chat.  |
| $vectaraIdxWord  | A utility array to convert the index to words i.e "first", "second", "third", "forth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth"  | $vectaraIdxWord[0]  | first  |
| $vectaraLangName  | Set to the requested language name. The language can either be requested explicitly or detected from the language of the query.  | You are a helpful assistant. Answer in ```${vectaraLangName}```.  | You are a helpful assistant. Answer in Arabic.  |
| $vectaraQueryResults  | An array of query results is found in the response, sorted by relevance score.  | ```#foreach ($qResult in $vectaraQueryResults) {"role": "user", "content": "Give me the $vectaraIdxWord[$foreach.index] search result."}, {"role": "assistant", "content": ${qResult.text()} },#end```  | ```{"role": "user", "content": "Give me the second search result."},{"role": "assistant", "content": "2nd result" },```  |


### Available Prompt Functions

The following table shows the available custom prompt functions: 

| Function | Description  | Example Usage Input  | Example Usage Output  |
|---|---|---|---|
| ```#foreach ($qResult in $vectaraQueryResults)```  | Iterates through each query result  | -  | -  |
| $qResult.getText() or $qResult.text()  | Returns text of the query result  | $qResult.text()  | Result text  |
| $qResult.docMetadata()  | Returns the metadata of the document this result belongs to  | $qResult.docMetadata()  | ```{"title": "documentTitle", ...}```  |
| $qResult.docMetadata().present()  | Returns true/false if there are any values present in the metadata  | ```#if ($qResult.docMetadata().present())...#end```  |   |
| $qResult.docMetadata().get("title")  | Returns the specified field value from doc metadata, an incorrect key would result in an empty value  | $qResult.docMetadata().get("title")  | documentTitle  |
| $qResult.partMetadata().present()  | Returns true/false if there are any values present in the metadata  | ```#if ($qResult.partMetadata().present())...#end```  |   |
| $qResult.partMetadata()  | Returns the metadata of the part of the document this result belongs to  | $qResult.partMetadata()  | ```{"page": "1", ...}```  |
| $qResult.partMetadata().get("page")  | Returns the specified field value from part metadata, incorrect key would result in empty value  | $qResult.docMetadata().get("page")  | "1"  |


### Setting a Custom Prompt

To set a custom prompt, users can add custom `prompt_template` within the 
`generation` [object](/docs/learn/grounded-generation/select-a-summarizer) 
to override the default prompt text.

### Include metadata in prompt

This snippet shows how to get metadata associated with a single result `qResult`
by retrieving metadata `docMetadata` from the date that information was
answered `answerDate`. It then extracts the text content of `qResult`.

<CodePanel snippets={[{language: "javascript", code: `{"role": "assistant", "content": "qResult.docMetadata().get('answerDate') \${qResult.getText()}" },`
}]} title="Code Example" layout="stacked" />

Let's dive into a full custom prompt example that shows more details about a
custom prompt with
metadata.

### Example custom prompt template for an RFI answering bot

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

<CodePanel snippets={[{language: "javascript", code: `[
    {
        "role": "system",
        "content": "You are an RFI answering assistant acting on behalf of the company Vectara. You are provided with search results from previously answered RFIs that may help answer the given question. The format of each result is the date in         which it was answered and the response text. You must summarize these results into a coherent answer. Only use information provided in this chat."
    },
    #foreach (\$qResult in \$vectaraQueryResults)
    #if (\$foreach.first)
        {"role": "user", "content": "Search for '\${vectaraQuery}', and give me the first search result."},
        {"role": "assistant", "content": "\${qResult.getText()}" },
    #else
        {"role": "user", "content": "Give me the \$vectaraIdxWord[\$foreach.index] search result."},
        {"role": "assistant", "content": "\$qResult.docMetadata().get('answerDate') \${qResult.getText()}" },
    #end
    #end
    {
        "role": "user",
        "content": "Generate a comprehensive and informative answer for the question \${vectaraQuery} solely based on the search results in this chat. You must only use information from the provided results. Combine search results together into a coherent answer. Do not repeat text. Only use the most relevant results that answer the question accurately. If there are 2 answers that seem in conflict, use the most recent answer according to the date. If a result does not answer the question, do not use it. If the search results are not valid, respond with 'The returned results did not contain sufficient information to the question.'"
    }
]`}]} title="Code Example" layout="stacked" />

