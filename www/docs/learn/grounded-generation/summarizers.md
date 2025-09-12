---
id: select-a-summarizer
title: Generation Presets
sidebar_label: Generation Presets
---

import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


Extracting concise, relevant information from large sets of search results 
presents a significant challenge for many applications. Vectara offers 
flexibility in selecting both the summarizer model and its associated prompt 
through `generation_preset_name`. We make a range of these prompt presets and 
define them as follows:

* The specific LLM used for processing.
* The prompt template sent to the model.
* The customizable model parameters, such as temperature and token limits.

Generation presets have prefixes and versions and they encapsulate both the 
prompt text, as well as potentially specific configuration options for the generative
system. `vectara-summary` is the prefix for generative summarization of
the results.

Providing the generation preset as part of the config is optional. If you do 
not provide a generation config at request time, <Config v="names.product"/> uses 
the best available preset for your account.

## Mockingbird 2.0

[**Mockingbird**](/docs/learn/mockingbird-llm) is Vectara's cutting-edge new LLM designed specifically for 
Retrieval Augmented Generation (RAG) use cases. Mockingbird is available to 
all Vectara users by specifying `mockingbird-2.0` as the `generation_preset_name`. 
Mockingbird is ideal for enterprise applications requiring high-quality 
summaries and structured outputs:

- Superior RAG output quality
- Enhanced citation accuracy
- Excellent multilingual performance
- High-precision structured data generation

### Mockingbird 2.0 example

The following example query selects Mockingbird 2.0 generation preset:

<CodePanel snippets={[{language: "json", code: `{
  "query": "What is the infinite improbability drive?",
  "search": {
    "corpora": [
      {
        "corpus_key": "hitchhikers-guide"
      }
    ],
    "limit": 10
  },
  "generation": {
    "generation_preset_name": "mockingbird-2.0",
    "max_used_search_results": 10
  }
}`}]} title="Mockingbird 2.0 Example" layout="stacked" />

:::tip
The `generation_preset_name` is specified in the `generation` object of a [**query**](/docs/api-reference/search-apis/search). 
Excluding this `generation` field disables summarization.
:::

## Currently available generation presets

Vectara provides several official generation presets to our users that you 
specify in the `generation_preset_name` within the `generation` object:

### Recommended prompts

- `mockingbird-2.0` (Vectara's cutting-edge LLM for Retrieval Augmented Generation. See [Mockingbird LLM](/docs/learn/mockingbird-llm) for more details.)
- `vectara-summary-ext-24-05-med-omni` (gpt-4o, for citations)
- `vectara-summary-ext-24-05-large` (gpt-4.0-turbo, for citations)
- `vectara-summary-ext-24-05-med` (gpt-4.0, for citations)
- `vectara-summary-ext-24-05-sml` (gpt-3.5-turbo, for citations)

### Prompts for table data

Use the following if you have tables:

- `vectara-summary-table-query-ext-dec-2024-gpt-4o`

### Legacy prompts

These prompts will soon be deprecated:

- `vectara-summary-ext-v1.2.0`
- `vectara-summary-ext-v1.3.0`

### Advanced summarization customization options

Customers also have access to [advanced summarization customization options](/docs/api-reference/search-apis/search#advanced-summarization-customization-options) 
including [custom prompt templates](/docs/prompts/vectara-prompt-engine), character limits, 
temperature, and frequency and presence penalties.

For detailed information about selecting and configuring models, including use case recommendations and integration options, see [Model Selection](/docs/learn/grounded-generation/model-selection).

:::tip
Check out our [**interactive API Reference**](/docs/rest-api/query) that lets you experiment
with these additional summarization options.
:::


## Default max_used_search_results limit

The default limit of `max_used_search_results` is 25 search results. Setting 
the values closer to the limit generates a more comprehensive summary, but 
using a lower value can balance the results with quality and response time.

:::caution Note
Too many results will prevent the prompt from generating a response. If that 
happens, try reducing this number.
:::

### max_used_search_results example

This generation preset example attempts to balance creating a good quality 
summary with a reasonably fast response by setting `max_used_search_results` to 
`5`. To use `vectara-summary-ext-24-05-med-omni` (GPT-4o), set 
`generation_preset_name` as follows:

<CodePanel snippets={[{language: "json", code: `{
   "query": "What is the infinite improbability drive?",
   "search": {
     "corpora": [
       {
         "corpus_key": "hitchhikers-guide"
       }
     ],
     "limit": 50
   },
   "generation": {
     "generation_preset_name": "vectara-summary-ext-24-05-med-omni",
     "max_used_search_results": 50
   }
 }`
 }]} title="GPT-4o Example" layout="stacked" />

## Advanced Summarization Customization Options

Our users also have access to more powerful summarization capabilities, which 
present a powerful toolkit for tailoring summarizations to specific 
application and user needs.

Use `generation_preset_name` and `prompt_template` to override the default prompt with a
[custom prompt](/docs/prompts/vectara-prompt-engine). Your use case might
require a chatbot to be more human like, so you decide to create a custom
response format that behaves more playfully in a conversation or summary.

In `generation`, `max_response_characters` lets you control the length of the summary, but
note that it is **not a hard limit** like with the `max_tokens` parameter. The
`model_parameters` object provides even more fine-grained controls for the summarizer
model:

- `llm_name` specifies the name of the LLM model to use for summarization, such as 
  `gpt-4`. If specified, it overrides the model behind `generation_preset_name`.
- `max_tokens` specifies a hard limit on the number of characters in a response.
  This value supercedes the `max_response_characters` parameter in the `summary` 
  object.
- `temperature` indicates whether you want the summarization to not be creative at all `0.0`,
  or for the summarization to take more creative liberties as you approach
  the maximium value of `1.0`.
- `frequency_penalty` provides even more granular control to help ensure that the
  summarization decreases the likelihood of repeating words. The values range from `0.0` to `1.0`
- `presence_penalty` provides more control over whether you want the summary to
  include new topics. The values also range from `0.0` to `1.0`.

By leveraging these advanced capabilities, application builders can fine-tune
the behavior and output style of the generation preset to align with your unique
application requirements.

