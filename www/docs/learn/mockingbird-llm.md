---
id: mockingbird-llm
title: "Mockingbird: Vectara's LLM"
sidebar_label: Mockingbird LLM
---

import {Config} from '@site/docs/definitions.md';

Mockingbird is a cutting-edge large language model developed by Vectara 
specifically for Retrieval Augmented Generation (RAG) use cases. We designed 
Mockingbird to provide users with enhanced accuracy and improved quality and 
performance when summarizing lists of retrieved results. Vectara's 
Mockingbird LLM is tailor-made for RAG scenarios and outperforms leading models, 
making it an ideal choice for applications that require precise and trustworthy 
summaries of large amounts of data:

* Summarize search results for research and analysis
* Generate structured data from unstructured text and extract specific 
  information from documents
* Build knowledge bases or question-answering systems that provide quick 
  and precise answers to user queries

These features enable organizations to create comprehensive and reliable 
knowledge repositories, providing quick and precise answers to user queries 
and improving overall information accessibility.

## Significantly improved quality for Retrieval Augmented Generation

Mockingbird improves quality for RAG use cases, surpassing general-purpose 
LLMs in critical areas for enterprise applications. Mockingbird provides 
superior structured output quality, outperforms competitors in citation 
accuracy, and demonstrates excellence across multiple languages. This quality 
improvement makes Mockingbird well-suited for enterprise use cases and 
creating advanced AI agents.

## Increased accuracy in summarizing retrieved results

Mockingbird excels at summarizing large collections of search results, 
enabling users to quickly grasp key information and insights without manual 
review. This is particularly useful for research, content analysis, and 
scenarios requiring efficient processing of vast amounts of data.

## Enhanced JSON output for structured data generation

Generate structured data from unstructured text sources. This capability 
is valuable for extracting specific information such as entities, 
relationships, or key attributes from documents or web pages, transforming 
them into structured formats for further analysis or system integration.

## Multilingual capabilities

Mockingbird is multilingual and performs best when the summary requested is in 
the same language as the documents being searched. Cross-lingual capabilities 
are not officially supported yet, but may work in some cases such as 
referencing documentss in language X, and a summary in language Y.

### Supported Mockingbird languages
Mockingbird supports the following languages: Arabic, French, Spanish, 
Portuguese, Italian, German, Chinese, Dutch, Korean, Japanese, and Russian.


## Secure deployment within Vectara's infrastructure

Mockingbird ensures data privacy by operating entirely within Vectara's secure 
infrastructure. Unlike some providers who face accusations of training on 
customer data, Vectara guarantees your data is never used to train or improve 
our models, ensuring data privacy and compliance with the strictest security 
standards.


## Use Mockingbird in summaries

To use Mockingbird in the Vectara Console:

1. Go to a corpus.
2. Select the **Query** tab.
3. Click the Generation drop-down in the Corpus Query Configuration panel.
4. Select the `Mockingbird` model.


screenshot tbd

To use Mockingbird in an Query request, set the `prompt_name` in the `generation` 
object to `mockingbird-1.0`:

```json
{
"query:" "What is the infinite probability drive?",
"generation": {
    "prompt_name": "mockingbird-1.0",
    "max_used_search_results": 5,
    "prompt_text": "",
    "response_language": "eng",
    "enable_factual_consistency_score": true
  }
}  
```



## Default Mockingbird prompt

Mockingbird uses the following `prompt_text` by default. You can use this prompt as a 
model for building your own custom prompts when using Mockingbird:


```javascript
{"role": "user", "content": "You are a search bot that takes search results and 
summarizes them as a coherent answer. Only use information provided in this chat. 
Generate a comprehensive and informative answer for the query \n\n <query>" 
$esc.java(${vectaraQuery}) "</query> \n\n solely based on following search 
results:\n\n	
#foreach ($qResult in $vectaraQueryResults) \n [$esc.java($foreach.index + 1)] 
$esc.java(${qResult.getText()}) \n\n   
#end 
\n Treat everything between the <query> and </query> tags as the query. 
You must only use information from the provided results. Combine search results 
together into a coherent answer. Do not repeat text. Cite search results using 
[number] notation. Only cite the most relevant results that answer the question 
accurately. If the search results are not valid, respond with - No result found. 
Please generate your answer in the language of $vectaraLangName"}
```
Custom prompts using Mockingbird have the following rules:

1. You are only allowed to specify the `assistant` and `user` roles.
2. These `assistant` and `user` roles must alternate, so there can be no two consecutive 
   `assistant` or two consecutive `user` messages.
3. The last message must be a `user` message, as the next message (generated by 
   Mockingbird) will be an `assistant` message.

