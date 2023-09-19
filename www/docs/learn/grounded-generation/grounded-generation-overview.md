---
id: grounded-generation-overview
title: Grounded Generation Overview
sidebar_label: Grounded Generation Overview
---

import {Config} from '@site/docs/definitions.md';

Grounded generation, also known as Retrieval Augmented Generation (RAG) 
ensures that generated content is both verifiable and anchored to the data 
you supply. This approach minimizes the occurrence of innaccurate or 
misleading information found in generative AI systems, specifically 
[hallucinations](https://vectara.com/avoiding-hallucinations-in-llm-powered-applications/). <Config v="names.product"/> 
provides grounded generation to summarize search results that answer queries 
directly.


## Enable Summarization in a Query

Summarization provides a chatbot-like experience to your users. To 
enable this behavior, send a `summary` request with your `query`.  For example:

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

:::note

The `summarizerPromptName` is optional and will default
to the best summarizer available to your account type.

:::

When <Config v="names.product"/> responds, it will contain the list of results
as well as the generative summary.  Here is an example response to the query
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
`summary`.  <Config v="names.product"/> issues these citations by putting
them in `[number]` format in the summary text, where `number` starts from 1
and increases by 1 in each result in the `responseList`.