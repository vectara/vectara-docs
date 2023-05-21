---
id: custom-dimensions
title: Custom Dimensions
sidebar_label: Custom Dimensions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

### Custom Dimensions
Custom dimensions are a fixed set of additional "dimensions" that contain
user-defined numerical values and are stored in addition to the dimensions
that <Config v="names.product"/> automatically extracts and stores from the text. At
query time, users can use these custom dimensions to increase or decrease the
resulting score dynamically, query by query.

For example, let's say we want to add a custom dimension to boost posts from a
forum based on how many "upvotes" it has received.  We can create the corpus
with a "votes" custom dimension as follows:
<CodeBlock language="bash">
{`
curl -X POST \\
  -H "Authorization: Bearer $\{JWT_TOKEN\}" \\
  -H "customer-id: $\{CUSTOMER_ID\}" \\
  https://${vars['domains.rest.admin']}:443/v1/create-corpus \\
  -d @- <<END;
{
  "corpus":
    {
      "name": "Acme Forums",
      "description": "Contents of the Acme Forum",
      "custom_dimensions": [
        {
            "name": "votes",
            "description": "Log of the number of votes received by this post",
            "serving_default": 0.0,
            "indexing_default": 0.0
        }
      ]
    }
}
END
`}
</CodeBlock>

You can then attach the value of a custom dimension as follows:
```
{
    "documentId": "237a8b63-2826-4ee1-8d83-14c2451a3357",
    "parts": [
        {
            "context": "...",
            "text": "Yesterday I woke up and observed a rainbow out of my window.",
            "custom_dims": [{
                "name": "votes",
                "value": 1.235
            }]
        }
    ]
}
```

And then to boost documents based on the value of these custom dimensions, you
can apply a query as follows:
<CodeBlock language="bash">
{`
curl -X POST \\
  -H "Authorization: Bearer $\{JWT_TOKEN\}" \\
  -H "customer-id: $\{CUSTOMER_ID\}" \\
  https://${vars['domains.rest.serving']}:443/v1/query \\
  -d @- <<END;
{
  "query": [
    { "query": "When was the last time you saw a rainbow?",
      "num_results": 5,
      "corpus_key": [{
          "customer_id": $\{CUSTOMER_ID\},
          "corpus_id": $\{CORPUS_ID\},
          "dim": [{
              "name": "votes",
              "value": 0.01
          }]
      }]
    }
  ]
}
END
`}
</CodeBlock>