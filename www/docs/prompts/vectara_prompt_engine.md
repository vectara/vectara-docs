---
id: vectara-prompt-engine
title: Vectara Prompt Engine
sidebar_label: Vectara Prompt Engine
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Vectara Prompt Engine empowers Scale users to customize prompts that can 
reference the most relevant text and metadata for use cases that require 
Retrieval Augmented Generation (RAG). Vectara enables developers to directly 
add the retrieved documents and their metadata into the prompt generation.
Vectara supports [Velocity Templates](https://velocity.apache.org/engine/1.7/user-guide.html) which offer 
developers a flexible way of customizing prompts and enhance the effectiveness 
of their generative AI applications. 

This capability unlocks more advanced workflows and customizations to answer 
questions about your business data. For example, answer questions based on 
previous answers, such as with RFI, RFP, and questionnaires. Draft support 
tickets from user feedback. You can even customize the formatting of results.

:::tip

Users can override the default prompt text with custom `promptText` in the 
`summary` object of a [**query**](/docs/api-reference/search-apis/search). The 
[**Query Request section**](/docs/rest-api/query) of the API Playground provides a Scale 
Example with a sample `summary` object, which includes a custom prompt. 

:::

## Effective prompts

Effective prompts guide LLMs to generate responses that meet specific user 
needs or objectives in generative AI applications. Define an objective 
that outlines what you aim to achieve, and provide detailed context to 
enrich the prompts with nuanced background information to help the AI 
understand the scenario better. Iteration and refinement are important 
processes to help you improve the outcome of your prompts.

:::note

Reach out to support if you want to modify the default prompt.

:::

## Prompt design

Prompt design includes a specific a `role` and `content` about this role, 
which provide context about how you want the role to behave and the kind of 
information that you want to retrieve. These values can also specify [variables 
and functions](/docs/prompts/custom-prompts-with-metadata) to provide more nuanced context. You then add different 
operations to customize the types of answers 
you want to retrieve.


### Role

The `role` specifies the function of the individual or entity that you want to 
respond to the prompt. This function indicates the rules, responsibilities, and
perspective of the action being performed. The typical role value is `system`.

You then add context to this system with a `content` value such as
`You are a helpful search assistant.` You could also specify the platform 
or environment within which you want the prompt issued and subsequent action 
taken and other rules that  you want the system to follow.

### Content

The `content` provides more information about the role and what you expect the 
entity to perform. This is crucial when you have loops and iterations in your 
prompts, like in our example. For each loop, specify the precise action or 
feedback desired from the prompt. Capture the context of what needs to be 
accomplished or directed. Clear and concise content helps ensure that the 
prompt communicates its intent effectively.

Example content can include “You are a helpful search assistant” or 
“Generate a summary for the query”.


## Example prompt template

The following example prompt specifies a role as a helpful search assistant. 
It then loops through Vectara query results with specific variables and 
functions. Finally, it generates a [summary](docs/learn/grounded-generation/select-a-summarizer) for the query. 

```javascript
[
  {"role": "system", "content": "You are a helpful search assistant."},
  #foreach ($qResult in $vectaraQueryResults)
     {"role": "user", "content": "Give me the $vectaraIdxWord[$foreach.index] search result."},
     {"role": "assistant", "content": "${qResult.getText()}" },
  #end
  {"role": "user", "content": "Generate a summary for the query '${vectaraQuery}' based on the above results."}
]
```
