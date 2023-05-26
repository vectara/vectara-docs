---
id: available-summarizers
title: Available Summarizers
---

import {Config} from '@site/docs/definitions.md';

Behind the scenes, <Config v="names.product"/> supports both varying the
summarizer model as well as the prompt for the model.  We make range of these
controls available to our [Scale](https://vectara.com/pricing/) customers.  If
you are a Scale customer or are considering becoming one and have any questions
on your options, please
[reach out to our support team](https://vectara.com/contact-us/), who can help
guide you.

Summarizers have both names and IDs, and are versioned.  Currently, the only
summarizer that is available to Growth users is `vectara-summary-ext-v1.2.0`.

This summarizer attempts to balance creating a good quality summary with a
a reasonably fast response.  To use `vectara-summary-ext-v1.2.0`, send it as
the `summarizerPromptName` as follows:

```
{
  "query": [
    {
      "query": "What is the infinite improbability drive?",
      "start": 0,
      "numResults": 10,
      "corpusKey": [
        {
          "customerId": 12345678,
          "corpusId": 1,
        }
      ],
      "summary": [
        {
            "summarizerPromptName": "vectara-summary-ext-v1.2.0",
            "responseLang": "en"
        }
      ]
    }
  ]
}
```
