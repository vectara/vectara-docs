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

:::tip

The summarizer is specified in the `generation` object of a [**query**](/docs/api-reference/search-apis/search). Excluding 
this `generation` field disables summarization.

:::

## Currently available summarizers

Today, the versions available are `1.2.0` which uses chatgpt-3.5-turbo
and `1.3.0` which uses gpt-4.0 (and only available to our paying [Scale
customers](https://vectara.com/pricing/)). The 1.2.0 summarizer is typically faster while 1.3.0 is typically
slower, but it produces a more accurate summary. Scale users also have access 
to summarizers ideal for citations using gpt-4o, gpt-4.0, and gpt-4.0-turbo.

These are several official summarizers available to our users that you specify
in the `prompt_name` in the `generation` object:

- `vectara-summary-ext-v1.2.0` (gpt-3.5-turbo)
- `vectara-summary-ext-v1.3.0` (gpt-4.0)
- `vectara-summary-ext-24-05-sml` (gpt-3.5-turbo, for citations)
- `vectara-summary-ext-24-05-med-omni` (gpt-4o, for citations)
- `vectara-summary-ext-24-05-med` (gpt-4.0, for citations)
- `vectara-summary-ext-24-05-large` (gpt-4.0-turbo, for citations)

Scale customers also have
access to [advanced summarization customization options](/docs/api-reference/search-apis/search#advanced-summarization-customization-options) including
[custom prompts](/docs/prompts/vectara-prompt-engine), character limits, temperature, and frequency and presence penalties.

:::tip

Check out our [**interactive API Reference**](/docs/rest-api/query) that lets Scale users experiment
with these additional summarization options.

:::

## Beta summarizers

We also have four beta summarizers available for our users to try:

- **Growth and Scale:** `vectara-experimental-summary-ext-2023-10-23-small` (gpt-3.5-turbo)
- **Scale only:** `vectara-experimental-summary-ext-2023-10-23-med` (gpt-4.0)
- **Growth and Scale:** `vectara-experimental-summary-ext-2023-12-11-sml` (gpt-3.5-turbo)
- **Scale only:** `vectara-experimental-summary-ext-2023-12-11-large:` (gpt-4.0-turbo)

These beta versions are a preview of our next improved summarizers. Since
they are experimental, and while we don't support them officially, we are
currently considering promoting them to GA, pending feedback from our users.

### Beta summarizer example

The following example query selects the beta GPT 4.0 summarizer (only
available to Scale users):

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

[Scale users](https://vectara.com/pricing/) have access to more powerful summarization
capabilities, which present a powerful toolkit for tailoring summarizations to
specific application and user needs.

The `prompt_name` allows you to specify one of our [available summarizers](/docs/learn/grounded-generation/select-a-summarizer).
Use `prompt_name` and `prompt_text` to override the default prompt with a
[custom prompt](/docs/prompts/vectara-prompt-engine). Your use case might
require a chatbot to be more human like, so you decide to create a custom
response format that behaves more playfully in a conversation or summary.

The `max_response_characters` lets you control the length of the summary, but
note that it is **not a hard limit** like with the `max_tokens` parameter. The
`generation` object provides even more fine-grained controls for the summarizer
model:

- `max_tokens` specifies a hard limit on the number of characters in a response.
  This value supercedes the `responseChars` parameter in the `summary` object.
- `temperature` indicates whether you want the summarization to not be creative at all `0.0`,
  or for the summarization to take more creative liberties as you approach
  the maximium value of `1.0`.
- `frequency_penalty` provides even more granular control to help ensure that the
  summarization decreases the likelihood of repeating words. The values range from `0.0` to `1.0`
- `presence_penalty` provides more control over whether you want the summary to
  include new topics. The values also range from `0.0` to `1.0`.

By leveraging these advanced capabilities, application builders can fine-tune
the behavior and output style of the summarizer to align with your unique
application requirements.

