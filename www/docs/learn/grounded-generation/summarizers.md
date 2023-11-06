---
id: select-a-summarizer
title: Select a Summarizer
sidebar_label: Select a Summarizer
---

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

## Currently Available Summarizers

Today, the versions available are `1.2.0` which uses chatgpt-3.5-turbo 
and `1.3.0` which uses gpt-4.0 (and only available to our paying Scale 
customers). The 1.2.0 summarizer is typically faster while 1.3.0 is typically 
slower, but it produces a more accurate summary.

These are the two official summarizers available to our users that you specify 
in the `summarizerPromptName`:

* `vectara-summary-ext-v1.2.0` (gpt-3.5-turbo)
* `vectara-summary-ext-v1.3.0` (gpt-4.0)

## Beta Summarizers

We also have two new beta summarizers available for our users to try:

* **Growth and Scale:** `vectara-experimental-summary-ext-2023-10-23-small` (gpt-3.5-turbo)
* **Scale only:** `vectara-experimental-summary-ext-2023-10-23-med` (gpt-4.0)

These beta versions are a preview of our next improved summarizers. Since 
they are experimental, and while we don't support them officially, we are 
currently considering promoting them to GA, pending feedback from our users.

### Beta Summarizer Example

The following example query selects the beta GPT 4.0 summarizer (only 
available to Scale users):

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

The default limit of maxSummarizedResults is 10 search results for Growth 
plans and this limit can be extended for Scale plan users. Setting the values 
closer to the limit generates a more comprehensive summary, but using a lower 
value can balance the results with quality and response time.

### maxSummarizedResults Example

This summarizer example attempts to balance creating a good quality summary 
with a reasonably fast response by setting maxSummarizedResults to 5. To use 
vectara-summary-ext-v1.2.0, send it as the summarizerPromptName as follows:

This summarizer attempts to balance creating a good quality summary with a
reasonably fast response.  To use `vectara-summary-ext-v1.2.0`, send it as
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

## Add a Timeout to REST Calls

Adding `grpc-timeout` to the header of your REST call lets you specify how 
long to wait for queries that have the potential to take longer to process. We 
recommend a timeout value of 30 seconds `30S` as typically long enough to 
allow the call to complete successfully.

You can pass this parameter in header as follows:

```json
-H "grpc-timeout: 30S" 
```

