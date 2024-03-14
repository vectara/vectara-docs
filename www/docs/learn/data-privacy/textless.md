---
id: textless
title: Textless Mode
sidebar_label: Enable Textless Mode
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';

When you create a corpus [via the API](/docs/api-reference/admin-apis/create-corpus) or the
[Vectara Console UI](/docs/console-ui/creating-a-corpus), you have the option to **not** store 
the text, also known as a "textless" mode. This mode is available to our 
[Scale plan users](https://vectara.com/pricing/) for when you have very sensitive text content. The text 
content becomes unrecoverable to <Config v="names.product"/> or to any user who successfully 
queries and finds the document.

:::tip

Textless mode is optimal for use cases where the cost of any
information leakage is very high. <Config v="names.product"/> does
[**encrypt documents**](encryption).

:::

## What happens in textless mode?

Let's look at when it's appropriate to enable textless, what happens on the 
platform, and what benefits and limitations it brings.

When you enable `textless` on a corpus, <Config v="names.product"/> discards
the text content of the document immediately after it converts the text to a
vector. At that point, the text is no longer recoverable. It also won't be 
returned in any <Config v="names.product"/> APIs.

:::note

Vectara **does** retain any metadata that were supplied alongside the text, 
including document IDs. This retention lets you retrieve the document 
from a separate system of record based on the ID to show the metadata, and it 
also allows <Config v="names.product"/> to perform any metadata-based 
filtering on the document.

:::

## Enable Textless mode

To enable textless mode, set the `textless` value to `true` under `corpus`:

```json

curl -X POST \
-H "Authorization: Bearer abcefg..." \
-H "customer-id: 123456789" \
https://api.vectara.io:443/v1/create-corpus \
-d @- <<END;
{
  "corpus": {
    "id": 2,
    "name": "Name of my corpus",
    "description": "Description about my corpus",
    "dtProvision": 0,
    "enabled": false,
    "swapQenc": false,
    "swapIenc": false,
    //enable textless mode
    "textless": true,
    "encrypted": true,
    "encoderId": 1,
    "metadataMaxBytes": 0,
    "faissIndexType": "",
    "customDimensions": [],
    "filterAttributes": [
      {
        "name": "lang",
        "description": "Detected language, as an ISO 639-3 code.",
        "indexed": false,
        "type": 25,
        "level": 10
      },
      {
        "name": "is_title",
        "description": "True if the text is a title.",
        "indexed": false,
        "type": 35,
        "level": 10
      }
    ]
  }
}
END
        
```

### Limitations

Currently, the [reranking](/docs/api-reference/search-apis/reranking) capability relies on
the text being stored. As a result, attempting to rerank search results on any
corpora where text storage has been turned off will not work at this time.