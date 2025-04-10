---
id: select-a-summarizer
title: Generation Presets
sidebar_label: Generation Presets
---

import {vars} from '@site/static/variables.json';


Extracting concise, relevant information from large sets of search results 
presents a significant challenge for many applications. Vectara offers 
flexibility in selecting both the summarizer model and its associated prompt 
through `generation_preset`. We make a range of these presets and define them 
as follows:

* The LLM used for processing.
* The prompt template sent to the model.
* The customizable model parameters, such as temperature and token limits.

Generation presets have prefixes and versions and they encapsulate both the 
prompt text,as well as potentially specific configuration options for the generative
system. `vectara-summary-ext` is the prefix for generative summarization of
the results.

Providing the generation preset as part of the config is optional. If you do 
not provide a generation config at request time, <Config v="names.product"/> uses 
the best available preset for your account.

## Mockingbird

[**Mockingbird**](/docs/learn/mockingbird-llm) is Vectara's cutting-edge new LLM designed specifically for 
Retrieval Augmented Generation (RAG) use cases. Mockingbird is available to 
all Vectara users by specifying `mockingbird-1.0-2024-07-16` as the `generation_preset_name`. 
Mockingbird is ideal for enterprise applications requiring high-quality 
summaries and structured outputs:

- Superior RAG output quality
- Enhanced citation accuracy
- Excellent multilingual performance
- High-precision structured data generation

:::tip

The `generation_preset_name` is specified in the `generation` object of a [**query**](/docs/api-reference/search-apis/search). 
Excluding this `generation` field disables summarization.

:::

## Currently available generation presets

Today, the versions available are `1.2.0` which uses chatgpt-3.5-turbo
and `1.3.0` which uses gpt-4.0. The 1.2.0 summarizer is typically faster while 
1.3.0 is typically slower, but it produces a more accurate summary. You also 
have access to presets ideal for citations using gpt-4o, gpt-4.0, and 
gpt-4.0-turbo.

:::caution
The Vectara trial includes access to all GPT4-based generation presets. After 
the trial ends and you upgrade your plan, you can purchase separate GPT4 
bundles or bring your own API key. Vectara bundles offer the advantage of 
HIPAA compliance.
:::

These are several official generation presets available to our users that you 
specify in the `generation_preset_name` in the `generation` object:

- `mockingbird-1.0-2024-07-16` (Vectara's cutting-edge LLM for Retrieval Augmented Generation. See [Mockingbird LLM](/docs/learn/mockingbird-llm) for more details.)
- `vectara-summary-ext-v1.2.0` (gpt-3.5-turbo)
- `vectara-summary-ext-v1.3.0` (gpt-4.0)
- `vectara-summary-ext-24-05-sml` (gpt-3.5-turbo, for citations)
- `vectara-summary-ext-24-05-med-omni` (gpt-4o, for citations)
- `vectara-summary-ext-24-05-med` (gpt-4.0, for citations)
- `vectara-summary-ext-24-05-large` (gpt-4.0-turbo, for citations)
- `vectara-summary-table-query-ext-dec-2024-gpt-3-5` (gpt-3-5, for tables)
  `vectara-summary-table-query-ext-dec-2024-gpt-4o` (gpt-4o, for tables)

Customers also have access to [advanced summarization customization options](/docs/api-reference/search-apis/search#advanced-summarization-customization-options) 
including [custom prompt templates](/docs/prompts/vectara-prompt-engine), character limits, 
temperature, and frequency and presence penalties.

:::tip

Check out our [**interactive API Reference**](/docs/rest-api/query) that lets you experiment
with these additional summarization options.

:::

## Beta generation preset names

We also have four beta generation presets available for our users to try:

- `vectara-experimental-summary-ext-2023-10-23-small` (gpt-3.5-turbo)
- `vectara-experimental-summary-ext-2023-10-23-med` (gpt-4.0)
- `vectara-experimental-summary-ext-2023-12-11-sml` (gpt-3.5-turbo)
- `vectara-experimental-summary-ext-2023-12-11-large:` (gpt-4.0-turbo)

These beta versions are a preview of our next improved generation presets. 
Since they are experimental, and while we don't support them officially, we 
are currently considering promoting them to GA, pending feedback from our 
users.

### Beta generation preset example

The following example query selects the beta GPT 4.0 generation preset:

```json showLineNumbers title="https://api.vectara.io/v2/query"
{
  "query": "What is the infinite improbability drive?",
  "search": {
    "corpora": [
      {
        "corpus_key": "hitchhikers-guide"
      }
    ],
    "offset": 0,
    "limit": 10
  },
  "generation": {
    "generation_preset_name": "vectara-experimental-summary-ext-2023-10-23-med",
    "max_used_search_results": 5
  }
}
```

## Default maxSummarizedResults limit

The default limit of `max_used_search_results` is 500 search results. Setting 
the values closer to the limit generates a more comprehensive summary, but 
using a lower value can balance the results with quality and response time.

### maxSummarizedResults example

This generation preset example attempts to balance creating a good quality 
summary with a reasonably fast response by setting `max_used_search_results` to 
`5`. To use `vectara-summary-ext-v1.2.0`, send it as the summarizerPromptName 
as follows:

```json showLineNumbers title="https://api.vectara.io/v2/query"
{
  "query": "What is the infinite improbability drive?",
  "search": {
    "corpora": [
      {
        "corpus_key": "hitchhikers-guide"
      }
    ],
    "offset": 0,
    "limit": 10
  },
  "generation": {
    "prompt_name": "vectara-summary-ext-v1.2.0",
    "max_used_search_results": 5
  }
}
```

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

