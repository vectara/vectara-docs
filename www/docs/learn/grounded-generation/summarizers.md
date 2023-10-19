---
id: select-a-summarizer
title: Select a Summarizer
sidebar_label: Select a Summarizer
---

import {Config} from '@site/docs/definitions.md';

Behind the scenes, <Config v="names.product"/> supports both selecting the
summarizer model as well as the prompt for the model.  We make range of these
controls available to our [Scale](https://vectara.com/pricing/) customers.  If
you are a Scale customer or are considering becoming one and have any questions
on your options, please
[reach out to our support team](https://vectara.com/contact-us/), who can help
guide you.

Summarizers have both names and IDs, and are versioned.  Providing the
summarizer as part of the config is optional: if you do not provide a
summarizer config at request time, <Config v="names.product"/> will use the best
available summarizer for your account.  Currently, the only summarizer that is
available to Growth users is `vectara-summary-ext-v1.2.0`.

The limit of `maxSummarizedResults` is `10` for Growth plans and can be extended 
for Scale customers. Setting the values closer to the limit generates a more 
comprehensive summary, but using a lower value can balance the results with 
quality and response time.

This summarizer example attempts to balance creating a good quality summary with a
a reasonably fast response by setting `maxSummarizedResults` to `5`. To use `vectara-summary-ext-v1.2.0`, send 
it as the `summarizerPromptName` as follows:

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
