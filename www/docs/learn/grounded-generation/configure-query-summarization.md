---
id: configure-query-summarization
title: Configure Summarization
sidebar_label: Configure Summarization
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

Summarization provides a chatbot-like experience to your users by enhancing 
the efficiency of information delivery. Offering quick and concise summaries 
can lead to faster decision-making, improved user satisfaction, and higher 
engagement levels. The versatility of summarizations makes it a valuable tool 
across multiple industries, and any application requiring the summarization of 
complex data into more manageable insights.

Whether it's streamlining customer service interactions, accelerating research, 
or enhancing educational tools, the ability to summarize vast amounts of data 
into digestible, actionable insights can significantly boost productivity 
across various business operations and industries.

To enable summarization, send a `summary` request with your `query`. This 
example configuration instructs Vectara not only to search for relevant data but also 
also to generate a summary based on the most relevant five results, which 
provides a comprehensive response rooted in the queried data.

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
          "corpusId": 1,
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

This query tells <Config v="names.product"/> to return a summary in English using the
`vectara-summary-ext-v1.2.0` summarizer and to consider the first 5 results when
summarizing. 

### Example query response

When <Config v="names.product"/> responds, it will contain the list of results
as well as the generative summary. Here is an example response to the query
`What is the infinite improbability drive?` when searching across the
Hitchhiker's Guide to the Galaxy:

```json showLineNumbers title="response.json"
[
    {
        "summary": {
            "text": "\nThe Infinite Improbability Drive is a form of propulsion developed by the Galactic Government on Damogran which allows for vast interstellar distances to be crossed in a nothingth of a second without the use of hyperspace [3]. It is incredibly powerful and rare, with only rumors circulating of its existence prior to its development [1]. It has been known to cause problems with other forms of propulsion, like the photon drive [4]. It is a remarkable breakthrough in Improbability Physics [2].",
            "lang": "eng",
            "statusList": [],
            "futureId": 2
        },
        "statusList": []
    },
    {
        "responseSet": {
            "responseList": [
                {
                    "text": "Ford was wildly excited. \"Arthur!\" he said, \"this is fantastic! We've been picked up by a ship \npowered by the Infinite Improbability Drive! This is incredible! I heard \nrumors about it before! They were all officially denied, but they must \nhave done it!",
                    "score": 0.9203816652297974,
                    "metadataList": [
                        {
                            "name": "title",
                            "value": "Chapter 9"
                        },
                        {
                            "name": "lang",
                            "value": "eng"
                        },
                        {
                            "name": "breadcrumb",
                            "value": "[\"THE HITCHHIKER'S GUIDE TO THE GALAXY\"]"
                        },
                        {
                            "name": "section",
                            "value": "12"
                        },
                        {
                            "name": "offset",
                            "value": "8137"
                        },
                        {
                            "name": "len",
                            "value": "76"
                        }
                    ],
                    "documentIndex": 0,
                    "corpusKey": {
                        ...
                    },
                    "resultOffset": 79,
                    "resultLength": 76
                },
                {
                    "text": "Look, I was right.\"   \nFord jabbed at one of the pages and showed it to Arthur.  \n\" It says: 'Sensational new breakthrough in Improbability Physics. As \nsoon as the ship's drive reaches Infinite Improbability it passes \nthrough every point in the Universe. Be the envy of other major \ngovernments. ' Wow, this is big league stuff.",
                    "score": 0.8904105424880981,
                    "metadataList": [
                        {
                            "name": "title",
                            "value": "Chapter 11"
                        },
                        {
                            "name": "lang",
                            "value": "eng"
                        },
                        {
                            "name": "breadcrumb",
                            "value": "[\"THE HITCHHIKER'S GUIDE TO THE GALAXY\"]"
                        },
                        {
                            "name": "section",
                            "value": "14"
                        },
                        {
                            "name": "offset",
                            "value": "8211"
                        },
                        {
                            "name": "len",
                            "value": "107"
                        }
                    ],
                    "documentIndex": 0,
                    "corpusKey": {
                        ...
                    },
                    "resultOffset": 164,
                    "resultLength": 107
                },
                {
                    "text": "Chapter 10 Chapter 10 The Infinite Improbability Drive is a wonderful new method of \ncrossing vast interstellar distances in a mere nothingth of a second, \nwithout all that tedious mucking about in hyperspace. It was discovered by a lucky chance, and then developed into a \ngovernable form of propulsion by the Galactic Government's research \nteam on Damogran. This, briefly, is the story of its discovery.",
                    "score": 0.8826565742492676,
                    "metadataList": [
                        {
                            "name": "title",
                            "value": "Chapter 10"
                        },
                        {
                            "name": "lang",
                            "value": "eng"
                        },
                        {
                            "name": "breadcrumb",
                            "value": "[\"THE HITCHHIKER'S GUIDE TO THE GALAXY\"]"
                        },
                        {
                            "name": "section",
                            "value": "13"
                        },
                        {
                            "name": "offset",
                            "value": "8"
                        },
                        {
                            "name": "len",
                            "value": "187"
                        }
                    ],
                    "documentIndex": 0,
                    "corpusKey": {
                        ...
                    },
                    "resultOffset": 37,
                    "resultLength": 187
                },
                {
                    "text": "The photon drive gave a sickly judder and cut out again. said Arthur.  \n\"Hey, didja hear that?\" muttered Zaphod as he leapt now for the \nmanual controls of the Infinite Improbability Drive, \"the monkey \nspoke!\" The Improbability Drive gave two small whines and then also cut \nout. \"Pure history, man,\" said Zaphod, kicking the Improbability Drive, \n\"a talking monkey!\"",
                    "score": 0.7908053398132324,
                    "metadataList": [
                        {
                            "name": "title",
                            "value": "Chapter 3"
                        },
                        {
                            "name": "lang",
                            "value": "eng"
                        },
                        {
                            "name": "breadcrumb",
                            "value": "[\"THE RESTAURANT AT THE END OF THE UNIVERSE\"]"
                        },
                        {
                            "name": "section",
                            "value": "42"
                        },
                        {
                            "name": "offset",
                            "value": "769"
                        },
                        {
                            "name": "len",
                            "value": "114"
                        }
                    ],
                    "documentIndex": 0,
                    "corpusKey": {
                        ...
                    },
                    "resultOffset": 111,
                    "resultLength": 114
                },
                ...
            ],
            "documentList": [
                {
                    "id": "TheultimateHitchhikersGuide.pdf",
                    "metadataList": [
                        {
                            "name": "Author",
                            "value": "Douglas Neil Adams"
                        }
                    ]
                }
            ],
            "futureId": 1
        }
    },
    {
       ...
    }
]
```

You can see in the results that the specific sources are referenced in the
`summary`. <Config v="names.product"/> issues these citations by putting
them in `[number]` format in the summary text, where `number` starts from 1
and increases by 1 in each result in the `responseList`.


## Advanced summarization parameters

[Scale users](https://vectara.com/pricing/) have access to more powerful summarization 
capabilities, which present a powerful toolkit for tailoring summarizations to 
specific application and user needs. 

### Select the summarizer model

Selecting the summarizer gives you more options to try official and 
experimental versions of our [available summarizers](/docs/learn/grounded-generation/select-a-summarizer). For example, Scale users 
can use our GPT 4.0 and GPT 4.0-Turbo summarizers.

### Customize the prompt

Override the default prompt text with a [custom prompt](/docs/prompts/vectara-prompt-engine). 
Your use case might require a chatbot to be more human like, so you decide to 
create a custom response format that behaves more playfully in a conversation 
or summary. 

### Control the summary length

The `responseChars` parameter enables users to suggest a preferred length for 
the summary. While it is not a strict limit like the fine-grained `maxTokens` 
parameter, it provides a guideline, helping to maintain a balance between verbosity and 
conciseness.

### Fine-grained control over summarization output

The `modelParams` object provides even more fine-grained controls for the 
summarizer model:
* `maxToken` specifies a hard limit on the number of characters in a response. 
* `temperature` indicates whether you want the summarization to **not** be creative at all `0.0`,
    or for the summarization to take more creative liberties as you approach 
    the maximium value of `1.0`.
* `frequencyPenalty` provides even more granular control to help ensure that the 
  summarization decreases the likelihood of repeating words. These values range from `0.0` to `1.0`
* `presencePenalty` provides more control over whether you want the summary to 
  include new topics. These values also range from `0.0` to `1.0`.

## Example summarization use cases

Application builders can leverage these advanced capabilties to fine-tune 
the behavior and output style of the summarizer to align with unique 
application requirements. Experiment with different values in these controls. 

### Concise summary without creative deviations

Some use cases require more concise and with minimal creative interpretations:

* `maxToken` = `200` – Brief summary but comprehensive enough to cover critical 
  information.
* `temperature` = `0.0` – Factual summary with no creative deviations, and 
  accuracy is crucial.
* `frequencyPenalty` = `0.1` – Minimally reduces repetition to keep essential 
  recurring terminology.
* `presencePenalty` = `0.0` – Focuses on existing topics in the content history 
  without introducing new topics.

### Brief abstract summary

Researchers often need to distill complex research papers into abstracts that 
convey the essence of the work creatively to capture the attention of other 
scholars:

* `maxToken` = `150` – Limits the summary to an abstract length, suitable for 
  quick scanning.
* `temperature` = `0.7` – Allows for a moderate level of creativity to articulate
  the research's novelty and implications effectively.
* `frequencyPenalty` = `0.5` – Reduces repetition to ensure the 
  summary is more succinct and to the point.
* `presencePenalty` = `0.3` – Encourages the inclusion of new topics or findings 
  from the research, adding depth to the summary.

### Product description summarization

E-commerce platforms require concise summarizations of product descriptions to 
provide engaging and informative summaries that can influence purchase 
decisions.

* `maxToken` = `100` – Short length for quick browsing without overwhelming the 
  customer with information.
* `temperature` = `0.5` – Balances creativity and factus, making the description 
  more lively and appealing.
* `frequencyPenalty` = `0.4` – Helps avoid redundancy in describing product 
  features, keeping the summary fresh and engaging.
* `presencePenalty` = `0.2` – Slightly encourages the introduction of new but 
  relevant topics, such as possible use-cases or product comparisons.

