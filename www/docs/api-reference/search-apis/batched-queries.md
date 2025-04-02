---
id: batched-queries
title: Batch Multiple Queries
sidebar_label: Batch Multiple Queries
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

Some applications may be designed to be powered by different queries in
different parts of the UI.  In order to decrease the number of network round
trips (and thereby the net latency), you may want to batch those multiple
queries with a single API call.

## Query Array in a Request

This pattern can be done in <Config v="names.product"/> by sending an array of
queries in a single request, as in:

```jsx
{
  "query": [
     {
       ... Query 1 ...
     },
     {
       ... Query 2 ...
     },
     ...
  ]
}
```

:::important

When using batched queries, each query within the query array counts as a
separate query for billing purposes.

:::

## Batched Query Responses

When you query <Config v="names.product"/>, you get back an array of results.
This array is to assist in using batched queries. 

```jsx
{
	"responseSet": [
        {
            ... Response 1 ...
        },
        {
            ... Response 2 ...
        },
        ...
    ]
}
```

Each response object within the `responseSet` array is directly associated with
the query in the same position as the response.  e.g. in this example case,
the block in `Response 1` will be the results for `Query 1`.  Therefore, it's
important you keep track of the order of your queries in order to interpret
the responses.