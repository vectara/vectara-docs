---
id: mockingbird-llm
title: "Mockingbird: Vectara's LLM"
sidebar_label: Mockingbird LLM
---

import {Config} from '@site/docs/definitions.md';

Generating accurate and reliable summaries from large datasets can be 
a challenge. Mockingbird is a cutting-edge Large Language Model (LLM)
developed by Vectara specifically for Retrieval Augmented Generation (RAG) use 
cases. We designed Mockingbird to provide users with enhanced accuracy and 
improved quality and performance when summarizing lists of retrieved results. 
Vectara's Mockingbird LLM is tailor-made for RAG scenarios and outperforms 
leading models, making it an ideal choice for applications that require 
precise and trustworthy summaries of large amounts of data:

* Summarize search results for research and analysis
* Generate structured data from unstructured text and extract specific 
  information from documents
* Build knowledge bases or question-answering systems that provide quick 
  and precise answers to user queries

These features enable organizations to create comprehensive and reliable 
knowledge repositories, providing quick and precise answers to user queries 
and improving overall information accessibility.

## Significantly improved quality for Retrieval Augmented Generation (RAG)

Mockingbird improves quality for RAG use cases, surpassing general-purpose 
LLMs in critical areas for enterprise applications. Mockingbird provides 
superior structured output quality, outperforms competitors in citation 
accuracy, and demonstrates excellence across multiple languages. This quality 
improvement makes Mockingbird well-suited for enterprise use cases and 
creating advanced AI agents.

## Increased accuracy in summarizing retrieved results

Mockingbird excels at producing summaries and answers for large collections of 
search results, allowing users to quickly grasp essential information without 
manual review. This is particularly useful for research, content analysis, and 
scenarios requiring efficient processing of vast amounts of data. Mockingbird 
meets or exceeds leading models like GPT-4 and Gemini 1.5 Pro in RAG quality, 
citation quality, multilingual quality and structured output accuracy, 
especially being a smaller and lower cost model, while reducing hallucinations 
and providing more reliable and accurate summaries for important data

## Enhanced JSON output for structured data generation

Mockingbird effectively generates structured data from unstructured text 
sources. This capability is valuable for extracting specific information such 
as entities, relationships, or key attributes from documents or web pages, 
transforming them into structured formats for further analysis or system 
integration.

## Multilingual capabilities

Mockingbird supports the following languages: Arabic, French, Spanish, 
Portuguese, Italian, German, Chinese, Dutch, Korean, Japanese, and Russian.

:::tip
Mockingbird is multilingual and performs best when the summary requested is in 
the same language as the documents being searched. Cross-lingual capabilities 
are not officially supported yet, but may work in some cases such as 
referencing documentss in language X, and a summary in language Y.
:::

## Secure deployment within Vectara's infrastructure

Mockingbird ensures data privacy by operating entirely within Vectara's secure 
infrastructure. Unlike some providers who face accusations of training on 
customer data, Vectara guarantees your data is never used to train or improve 
our models, ensuring data privacy and compliance with the strictest security 
standards.

## Selecting Mockingbird for summarization

To use Mockingbird in the Vectara Console:

1. Select **Corpora** from the main menu and go to a corpus.
2. Select the **Query** tab.
3. Click **Model** from the Generation drop-down in the Corpus Query Configuration panel.
     ![Query model selection drop-down](/img/query_model_selection.png "The currently selected summarizer is vectara-summary-ext-v1.3.0. Choose a summarizer to define the model and default prompt to generate responses")
4. Select the `Mockingbird` model.
    ![Mockingbird model selection](/img/mockingbird-10.png "Mockingbird LLM v1.0 prompt for summarizing query results as an answer. Designed for RAG.")
5. Click **Model** again to minimize the list of models. This example shows a 
   Summary configuration with Mockingbird selected as the model.
    ![Query with Mockingbird selected](/img/query_with_mockingbird_selected.png)

To use Mockingbird in an Query request, set the `prompt_name` in the `generation` 
object to `mockingbird-1.0-2024-07-16`:

```json
{
"query:" "What is the infinite probability drive?",
"generation": {
    "prompt_name": "mockingbird-1.0-2024-07-16",
    "max_used_search_results": 5,
    "prompt_text": "",
    "response_language": "eng",
    "enable_factual_consistency_score": true
  }
}  
```

:::tip

Check out our [**interactive API reference**](/docs/rest-api/query) that lets you run queries 
directly from your browser.

:::

## Default Mockingbird prompt

Mockingbird uses the following `prompt_text` by default. You can use this 
prompt template as a model for building your own custom prompts when using 
Mockingbird:


```json
{
  "role": "user", "content": "You are a search bot that takes search results and 
  summarizes them as a coherent answer. Only use information provided in this chat. 
  Generate a comprehensive and informative answer for the query \n\n <query>" ${vectaraQuery} "</query> \n\n 
  solely based on following search results:\n\n	
  #foreach ($qResult in $vectaraQueryResults) \n [$foreach.index + 1) 
  ${qResult.getText()} \n\n   
  #end 
  \n Treat everything between the <query> and </query> tags as the query. 
  You must only use information from the provided results. Combine search results 
  together into a coherent answer. Do not repeat text. Cite search results using 
  [number] notation. Only cite the most relevant results that answer the question 
  accurately. If the search results are not valid, respond with - No result found. 
  Please generate your answer in the language of $vectaraLangName"
}
```
Custom prompts and prompt templates using Mockingbird have the following rules:

1. You are only allowed to specify the `assistant` and `user` roles.
2. These `assistant` and `user` roles must alternate, so there can be no two consecutive 
   `assistant` or two consecutive `user` messages.
3. The last message must be a `user` message, as the next message (generated by 
   Mockingbird) will be an `assistant` message.

