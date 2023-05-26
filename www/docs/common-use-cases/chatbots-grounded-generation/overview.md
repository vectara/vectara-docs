---
id: grounded-generation-overview
title: Grounded Generation Overview
sidebar_label: Overview
---

import {Config} from '@site/docs/definitions.md';

In addition to "just" returning search results, <Config v="names.product"/> can
summarize those results in a way that answers the user's question directly.
This can be useful to provide a chatbot-like experience to your users while
avoiding some of the problems that many generative AI systems have, such as
[hallucinations](https://vectara.com/avoiding-hallucinations-in-llm-powered-applications/).

To enable this behavior, send a `summary` request with your `query`.  For example:

```
{
  "query": [
    {
      "query": "Who's the English monarch?",
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
            "responseLang": "en"
        }
      ]
    }
  ]
}
```

# Available summarizers


