---
id: select-a-summarizer
title: Select a Summarizer
sidebar_label: Select a Summarizer
---

import {Config} from '@site/docs/definitions.md';

Behind the scenes, <Config v="names.product"/> supports both selecting the
summarizer model as well as the prompt for the model.  We make range of these
you are a Scale customer or are considering becoming one and have any questions
on your options, please
[reach out to our support team](https://vectara.com/contact-us/), who can help
guide you.

Summarizers have both names and IDs, and are versioned. Providing the
summarizer as part of the config is optional. If you do not provide a
summarizer config at request time, <Config v="names.product"/> uses the best
available summarizer for your account. 

## Currently Available Summarizers

Currently, we have two official summarizers available to our users. Growth 
users have `vectara-summary-ext-v1.2.0` (GPT 3.5), while Scale users have 
access to `vectara-summary-ext-v1.3.0` (GPT 4.0).

## Beta Summarizers

We also have two new beta summarizers available only for
Scale users:

* `vectara-experimental-summary-ext-2023-10-23-small` (GPT 3.5) 
* `vectara-experimental-summary-ext-2023-10-23-med` (GPT 4.0)

These beta versions are a preview of our next improved summarizers. Since 
they are experimental, we do not support them officially.

### Beta Summarizer Example

The following example query selects GPT 4.0 summarizer (only available to 
Scale users):

```json showLineNumbers title="https://api.vectara.io/v1/query"
{
  "query": [
    {
      "query": "What is the infinite improbability drive?",
      "start": 0,
      "numResults": 10,
      "corpusKey": [
        {
          "customerId": 12345678,
          "corpusId": 1
        }
      ],
      "summary": [
        {
            "summarizerPromptName": "vectara-experimental-summary-ext-2023-10-23-med",
            "responseLang": "en",
            "maxSummarizedResults": 5
        }
      ]
    }
  ]
}
```
## Default maxSummarizedResults Limit

The default limit of maxSummarizedResults is 10 search results for Growth plans and this limit can be extended for Scale plan users. Setting the values closer to the limit generates a more comprehensive summary, but using a lower value can balance the results with quality and response time.

maxSummarizedResults Example
This summarizer example attempts to balance creating a good quality summary with a a reasonably fast response by setting maxSummarizedResults to 5. To use vectara-summary-ext-v1.2.0, send it as the summarizerPromptName as follows:

This summarizer attempts to balance creating a good quality summary with a
a reasonably fast response.  To use `vectara-summary-ext-v1.2.0`, send it as
the `summarizerPromptName` as follows:

```json showLineNumbers title="https://api.vectara.io/v1/query"
{
  "query": [
    {
      "query": "What is the infinite improbability drive?",
      "start": 0,
      "numResults": 10,
      "corpusKey": [
        {
          "customerId": 12345678,
          "corpusId": 1
        }
      ],
      "summary": [
        {
            "summarizerPromptName": "vectara-summary-ext-v1.2.0",
            "responseLang": "en",
            "maxSummarizedResults": 5
        }
      ]
    }
  ]
}
```
