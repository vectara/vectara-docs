---
id: add-custom-dimensions
title: Custom dimensions
sidebar_label: Custom dimensions
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


Many search scenarios require considering factors beyond the text content 
itself, such as user engagement metrics or temporal relevance. Custom 
dimensions enable users to have a fixed set of additional 
"dimensions" that contain user-defined numerical values and are stored in 
addition to the dimensions that <Config v="names.product"/> automatically 
extracts and stores from the text. At query time, users can use these custom 
dimensions to increase or decrease the resulting score dynamically, query by 
query.

For example, let's say we want to add a custom dimension to boost posts from a
forum based on how many "upvotes" it has received.  We can create the corpus
with a "votes" custom dimension as follows:

<CodePanel snippets={[{language: "js", code: `curl -X POST \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: \${API_KEY}" \\
  https://api.vectara.io/v2/corpora \\
  -d @- <<END;
{
   "key": "acme-forums",
   "name": "Acme Forums",
   "description": "Contents of the Acme Forum",
   "custom_dimensions": [
    {
      "name": "votes",
      "indexing_default": 0.0,
      "querying_default": 0.0
    }
   ]
}
END`
}]} title="Votes Custom Dimension Example" layout="stacked" />

Then, at index time, you can attach the value of the custom dimension of 
votes with a value of `1.235` as follows:

<CodePanel snippets={[{language: "js", code: `{
   "id": "237a8b63-2826-4ee1-8d83-14c2451a3357",
   "type": "core",
   "document_parts": [
    {
      "text": "Yesterday I woke up and observed a rainbow out of my window.",
      "context": "...",
      "custom_dimensions": {
        "votes": 1.235
      }
    }
   ]
}`
}]} title="Attach Custom Dimension Value Example" layout="stacked" />

And then to boost documents based on the value of these custom dimensions, you
can apply a query as follows:

<CodePanel snippets={[{language: "js", code: `curl -X POST \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: \${API_KEY}" \\
  https://api.vectara.io/v2/corpora/acme-forums/query \\
  -d @- <<END;
{
   "query": "When was the last time you saw a rainbow?",
   "search": {
     "custom_dimensions": {
       "votes": 0.01
     },
    "limit": 25
   }
}
END`
}]} title="Boost Documents Example" layout="stacked" />

## How custom dimensions affect scores

In order to calculate the final score of a document and query that contains
custom dimensions, <Config v="names.product"/> takes the dot product of the
query's custom dimensions with the document's custom dimensions and the resulting
number is added to their score.

Negative values decrease the overall score (sometimes called "burying") and
postive values increase the overall score (sometimes called "boosting").  A dot
product of 0 does not affect the underlying text retrieval score.

For more information on how scores can be interpreted in general, see the
documentation on [interpreting scores](/docs/search-and-retrieval/working-with-results/interpreting-scores).

## Choosing values for custom dimensions

Because scores in <Config v="names.product"/> range from -1 to 1, in general
it's best to make sure the dot product of the custom dimension values you store
in your document and the query custom dimensions are between -1 and 1.  

### Indexing

If you're tracking some underlying value that increases or decreases linearly
(like upvotes, number of responses, total units sold, etc), then you would
typically take the `log()` of the value first before storing it in a document to
ensure that it cannot dominate the overall score too much.

In some cases, it can be useful to bound the boost or penalty for a field.  For
example, in some cases a longer content length might warrant a boost while older
documents might warrant being buried, but in either case, there may be a point
at which "even longer" or "even older" doesn't really matter.  In these cases,
it can be useful to apply a [sigmoid function](https://en.wikipedia.org/wiki/Sigmoid_function)
to the content length or age at indexing time.

### Querying

Even if the absolute value of the custom dimension is small, it will still have
a large impact on the score.  Try to keep the document values in the -100 to +100
range so that you don't need to suppress these values further.  Depending on how
your document values scale, query values for a custom dimension should
normally be in a range of -0.1 to 0.1, or even smaller like -0.01 to 0.01 if
document values on the larger side of that.
