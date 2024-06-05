---
id: select-a-summarizer
title: Summarizers
sidebar_label: Summarizers
---

import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

Behind the scenes, <Config v="names.product"/> supports both selecting the
summarizer model as well as the prompt for the model. We make a range of these 
and if you are a Scale customer, or are considering becoming one and have 
any questions on your options, please
[reach out to our support team](https://vectara.com/contact-us/), who can help
guide you.

Summarizers have prefixes and versions and they encapsulate both a prompt text, 
as well as potentially specific configuration options for the generative 
system. `vectara-summary-ext` is the prefix for generative summarization of 
the results.

Providing the summarizer as part of the config is optional. If you do not 
provide a summarizer config at request time, <Config v="names.product"/> uses 
the best available summarizer for your account.

## Currently available summarizers

Today, the versions available are `1.2.0` which uses chatgpt-3.5-turbo 
and `1.3.0` which uses gpt-4.0 (and only available to our paying [Scale 
customers](https://vectara.com/pricing/)). The 1.2.0 summarizer is typically faster while 1.3.0 is typically 
slower, but it produces a more accurate summary.

These are the two official summarizers available to our users that you specify 
in the `model_id`:

* `vectara-summary-ext-v1.2.0` (gpt-3.5-turbo)
* `vectara-summary-ext-v1.3.0` (gpt-4.0)

Scale customers also have 
access to [advanced summarization customization options](/docs/api-reference/search-apis/search#advanced-summarization-customization-options) including 
[custom prompts](/docs/prompts/vectara-prompt-engine), character limits, temperature, and frequency and presence penalties.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/query) that lets Scale users experiment 
with these additional summarization options.

:::

## Beta summarizers

We also have four beta summarizers available for our users to try:

* **Growth and Scale:** `vectara-experimental-summary-ext-2023-10-23-small` (gpt-3.5-turbo)
* **Scale only:** `vectara-experimental-summary-ext-2023-10-23-med` (gpt-4.0)
* **Growth and Scale:** `vectara-experimental-summary-ext-2023-12-11-sml` (gpt-3.5-turbo)
* **Scale only:** `vectara-experimental-summary-ext-2023-12-11-large:` (gpt-4.0-turbo)

These beta versions are a preview of our next improved summarizers. Since 
they are experimental, and while we don't support them officially, we are 
currently considering promoting them to GA, pending feedback from our users.

### Beta summarizer example

The following example query selects the beta GPT 4.0 summarizer (only 
available to Scale users):

```json showLineNumbers title="https://api.vectara.io/v1/query"
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
  "summarization": {
    "prompt_name": "vectara-experimental-summary-ext-2023-10-23-med",
    "max_used_search_results": 5
  }
}
```
## Default maxSummarizedResults limit

The default limit of `max_used_search_results` is 10 search results for Growth 
plans and this limit can be extended for Scale plan users. Setting the values 
closer to the limit generates a more comprehensive summary, but using a lower 
value can balance the results with quality and response time.

### maxSummarizedResults example

This summarizer example attempts to balance creating a good quality summary 
with a reasonably fast response by setting `max_used_search_results` to `5`. To use 
`vectara-summary-ext-v1.2.0`, send it as the summarizerPromptName as follows:

```json showLineNumbers title="https://api.vectara.io/v1/query"
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
  "summarization": {
    "prompt_name": "vectara-summary-ext-v1.2.0",
    "max_used_search_results": 5
  }
}
```
