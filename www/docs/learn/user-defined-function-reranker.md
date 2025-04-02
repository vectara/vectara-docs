---
id: user-defined-function-reranker
title: User Defined Function Reranker
sidebar_label: User Defined Function Reranker
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Our out-of-the-box rerankers are effective for general use cases, but some 
specific use cases require fine-grained control over how search results are 
ordered. For example, bubbling recently-added documents to the top, or 
limiting search results to a specific geolocation. This granular control 
plays a crucial role in Generative AI experiences. Customizing how search 
results are ranked enables you to influence which information is prioritized 
by Large Language Models (LLMs). Boosting certain results to the top can 
effectively guide the LLM to consider that information more prominently, 
biasing the generated response.

The User Defined Functions Reranker enables users to define custom reranking 
functions using [document-level metadata, part-level metadata](/docs/learn/metadata-search-filtering/filter-overview), or scores 
generated from the request-level metadata. To use this reranker, set the 
`type` to `userfn` in a query and specify a string within the 
`reranker` section of the query. This string syntax is custom and similar to our 
SQL-like [filter expressions](/docs/learn/metadata-search-filtering/filter-overview). 
You can also use our [chain reranker](/docs/learn/chain-reranker) which 
applies multiple rerankers in complex search scenarios that require multiple 
dimensions of relevance.

With the flexibility to modify scores based on metadata, conditions, and 
custom logic, enterprises can craft highly tailored search experiences that 
meet specific business needs. This new User Defined Functions reranker allows 
for a wide range of use cases:

* **Recency bias**: Prioritize the most recent results in cases where answers 
  based on older data are less relevant than newer data. Examples include news 
  and current events searches, stock market queries, and recruitment searches. 
* **Location bias**: Prioritize results closer to the location of the user such 
  as local business searches, real estate listings, and event queries.
* **E-commerce bias**: Prioritize promotional and sponsored merchandise for 
  sale promotions and new product launches.

## Language definition

The User Function Language allows you to specify an expression that computes a 
new score for a search result. There are no statements or variables. The 
expression definition has access to the search result, and various Vectara 
provided functions to enable computing new scores for a variety of use cases.

It is expected that every expression returns a number to be used in reranking of
search results.

## Types and literals

User Function Language only has number, string, boolean, datetime, and 
duration as types. You can define number, string, and boolean literals. String 
literals are enclosed in single quotes (`'`). To encode a single quote requires 
two repeated single quotes (`''`).

### Duration

Datetime operations such as subtraction result in `duration`s instead of integers
unlike many SQL languages. This allows precise handling of datetime operations
when doing recency boosting or other time based modifications of the score.

You can convert to and from durations and numbers by using the `seconds`, `minutes`,
and `hours` functions.

### Types and literals examples:

```
2.45
true
false
null
'Vectara''s string'
```

## Operators

Arithmetic, logic, and comparison operators are all present in the language. 
The current list of operators are `*, / %, +, -, <, <=, >=, >, ||, &&, ==, !`. 
Operator precedence is in the previous listed order.

### Operators examples:

```
2 + 3
100 % 10
(true != false)
(1 + 2 + 3) / 6
```

## If expression

Expressions may also be a conditional if expression. Both results of the 
condition must be defined. The grammar for the if expression is 
`'if' '(' 'expr' ')' expr 'else' expr.`

### If example:

```
if (now() < iso_datetime_parse('2024-12-04T10:14:50Z')) 1 else 2
```

## Functions

Functions are in the normal `function(argument1, argument2)` syntax. All 
functions are predefined by Vectara, and retrieving properties of the current 
search result is done with the function `get.`

### Get function

The `get` function allows you to retrieve properties of the result. The `get` 
argument is a [JSONPath](https://en.wikipedia.org/wiki/JSONPath) string that retrieves values 
from a search result object. JSON paths that do not exist return null.
The `get` function can also optionally take a second argument as a default 
value if the JSONPath is null.

The search result object is similar to the definition of the search 
result in the HTTP API definition. What follows is the schema for the search 
result object. 


```json
{
  "score": .9,
  "text": "search result text",
  "document_metadata": {
    "Document level metadata": "metadata"
   }
   "part_metadata": {
     "Part level metadata": "metadata"
   },
   "document_id": "document id"
}
```
The `$.score` is the score that Vectara has calculated up to 
this point in the retrieval chain.

#### Get examples

```sql
get('$.score') * get('$.part_metadata.boost')
get('$.document_metadata.reviews[0].score', 0)
```

## Time functions

The following table lists the available time functions that allow you to 
perform various operations with datetime values, such as retrieving the 
current time or converting durations to different units.

| **Function**         | **Description**                                               | **Example**                                 |
|----------------------|---------------------------------------------------------------|---------------------------------------------|
| `now()`              | Returns the current time as a datetime.                       | `now()`                                     |
| `iso_datetime_parse(a)` | Parses an ISO datetime string to a datetime.                 | `iso_date_time_parse('2024-12-04T10:14:50Z')` |
| `datetime_parse(a,b)`| Parses a datetime string with a format string. The format string follows the Java format string [format](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html). | `datetime_parse('2024 02 09', 'yyyy MM dd')` |
| `to_unix_timestamp(a)`| Converts a datetime to seconds from the epoch.               | `to_unix_timestamp(now())`         |
| `seconds(a)`         | Converts a duration to the number of seconds.                 | `seconds(minutes(1)) == 60`        |
| `minutes(a)`         | Converts a duration to the number of minutes.                 | `hours(minutes(60)) == 1`          |
| `hours(a)`           | Converts a duration to the number of hours.                   | `minutes(hours(1)) == 60`          |
| `seconds(a)`         | Converts a number to a seconds duration.                      | `seconds(50)`                      |
| `minutes(a)`         | Converts a number to a minutes duration.                      | `minutes(80)`                      |
| `hours(a)`           | Converts a number to a hours duration.                        | `hours(1)`                         |

The `seconds`, `minutes`, and `hours` functions allow you to convert a number to a duration, and convert a duration to a number.

## Math functions

The following table lists the math functions available that allow you to perform 
various mathematical operations, such as calculating absolute values, powers, 
and logarithms.

| **Function**   | **Description**                                 | **Example**                    |
|----------------|-------------------------------------------------|--------------------------------|
| `abs(a)`       | Returns the absolute value of a value           | `abs(-123) => 123.0`           |
| `power(a,b)`   | Computes a to the power of b                    | `power(2,3) => 8.0`            |
| `min(a,b)`     | Returns the smaller of two values               | `min(1,2) => 1.0`              |
| `max(a,b)`     | Returns the larger of two values                | `max(1, 2) => 2.0`             |
| `sqrt(a)`      | Computes the square root of a value             | `sqrt(64) => 8.0`              |
| `trunc(x)`     | Truncates a value towards zero                  | `trunc(1.123) => 1.0`          |
| `sign(s)`      | Computes the sign of a value                    | `sign(2) => 1.0`               |
| `radians(x)`   | Converts degrees to radians                     | `radians(180) => 3.1415`       |
| `degrees(x)`   | Converts radians to degrees                     | `degrees(3.141592653589793) => 180.0` |
| `log(b,x)`     | Computes the logarithm of x in base b           | `log(2,16) => 4.0`             |
| `ln(x)`        | Computes the natural logarithm of x             | `ln(2.718281828459045) => 1.0` |
| `log10(x)`     | Computes the base-10 logarithm of x             | `log10(100) => 2.0`            |
| `sin(x)`       | Computes the sine of x in radians               | `sin(1.57079632679) => 1.0`    |
| `sind(x)`      | Computes the sine of x in degrees               | `sind(90) => 1.0`              |
| `cos(x)`       | Computes the cosine of x in radians             | `cos(3.141592653589793) => -1.0` |
| `cosd(x)`      | Computes the cosine of x in degrees             | `cosd(180) => -1.0`            |
| `tan(x)`       | Computes the tangent of x in radians            | `tan(0.78539816339) => 1.0`    |
| `tand(x)`      | Computes the tangent of x in degrees            | `tand(45) => 1.0`              |

### Function calling example

```sql
get('$.score') * 1 / as_days(iso_datetime_parse(get('$.document_metadata.publication_date')) - now())
```

## Null score handling

The User Defined Function reranker supports returning null scores, allowing 
for more flexible result filtering. When a UDF returns a null score for a 
result, that result is automatically removed from the set.

:::note
Null removal occurs before limits are applied and before results are passed to 
the next reranker in the pipeline. Only the UDF reranker can deliberately return 
null scores.
:::

## Null score usage examples

In this example, you want to remove results with a score below a specific 
threshold:

`user_function: "if (get('$.score') < 0.5) null else get('$.score')";`

This example filters results based on metadata:

`user_function: "get('$.document_metadata.category') === 'blog' ? get('$.score') : null";`

### Null score usage in a chain

In this example, the UDF filter out results with scores below `0.5` and limits 
the output to `100` results. The MMR reranker then processes these results by 
applying a diversity bias and further limits the output to `50` results.

```json
{
  "reranker": {
    "type": "chain",
    "rerankers": [
      {
        "type": "userfn",
        "user_function": "if (get('$.score') < 0.5) null else get('$.score')",
        "limit": 100
      },
      {
        "type": "mmr",
        "user_function": "get('$.document_metadata.popularity') * get('$.document_metadata.score')",
        "limit": 50
      }
    ]
  }
}
```
## Example document with nuanced metadata

This example document shows featured electronics for the upcoming fall season. 
It contains metadata for information such as `customer_review_stars`, 
`units_in_stock`, and other nuanced information about the products.

```json
{
  "id": "DD-2025-ELECTRONICS-FALL",
  "type": "core",
  "metadata": {
    "category": "Electronics",
    "status": "Published",
    "published": "2024-09-15",
    "publish_ts": 1726358400,
    "title": "Featured Electronics: Fall 2024"
  },
  "document_parts": [
    {
      "text": "Product 1: Smart Speaker",
      "metadata": {
        "promoted": true,
        "customer_review_stars": 4.5,
        "price": 199.99,
        "units_in_stock": 20
      },
      "context": "A smart speaker with voice assistant integration and premium sound quality."
    },
    {
      "text": "Product 2: Noise-Canceling Headphones",
      "metadata": {
        "promoted": false,
        "customer_review_stars": 4.8,
        "price": 299.99,
        "units_in_stock": 15
      },
      "context": "High-fidelity noise-canceling headphones with wireless capability."
    },
    {
      "text": "Product 3: 4K Ultra HD Streaming Device",
      "metadata": {
        "promoted": true,
        "customer_review_stars": 4.6,
        "price": 99.99,
        "units_in_stock": 30
      },
      "context": "A 4K Ultra HD streaming device with voice control and many apps."
    }
  ]
}
```

## Example User Defined Functions

<Tabs
  defaultValue="rest"
  values={[
    { label: 'REST', value: 'rest', },
    { label: 'gRPC', value: 'grpc', },
  ]
}>

<TabItem value="grpc">

 ```grpc
 request = serving_pb2.QueryRequest(
        query=query, num_results=fetch)
 request.reranking_config.reranker_id = 272725722
 request.reranking_config.user_function = \
     "get('$.score') + log10(get('$.document_metadata.publish_ts')) + log(get('$.document_metadata.customer_review_stars')) + get('$.document_metadata.promoted')"
```

</TabItem>
<TabItem value="rest">

```json
 "reranker": {
    "type": "userfn",
    "user_function": "get('$.score') + log10(get('$.document_metadata.publish_ts')) + log(get('$.document_metadata.  customer_review_stars')) + get('$.document_metadata.promoted')"
  }
```

</TabItem>
</Tabs>

This example UDF modifies the score with the following options:

* **Recency bias:** Ensures that newer content is more likely to appear higher in 
  search results for queries about the *latest gadgets* or *new electronics*. 
  This function adds the log of the publication timestamp 
  (`get('$.document_metadata.publish_ts')`)
* **Popularity bias:** Incorporates user feedback into the ranking to help surface 
  content that other users found helpful like for queries about *top rated electronics*. 
  This can improve user satisfaction by promoting popular items. This function 
  adds the log of the customer review, which can be 1 to 5 stars 
  (`get('$.document_metadata.customer_review_stars')`)
* **Sponsored promotions bias:** Allows for surfacing paid or sponsored content into 
  search results for queries about *promoted* or *clearance electronics*. This 
  allows a business to increase visibility of certain items. This function 
  adds the value of the promoted variable (`get('$.document_metadata.promoted')`)


Some additional examples have `get('$.score')` appearing twice, which means 
the original relevance score gets modified by additional functions such as 
boosts. You can experiment with different score multipliers to provide small 
boosts like `1.3`, or moderate to large boost values like `1.5` or `1.8`.

### Sort on metadata 

Sort based on metadata like “price, increasing” and set the 
score function to only consider the metadata. For example:

`get('$.document_metadata.price', -999999)`

This sets the result score to the price value but if there is no price defined 
on the result, default the score to -999999 to place it at the bottom of the 
list.


### Place products with no stock at the bottom

Place all products that have no stock at the bottom of the results for an 
e-commerce use case:

`if get('$.document_metadata.units_in_stock') > 0 then get('$.score') else -999999`

## Boosting scores in UDFs

Boosting enables increasing or decreasing the relevance of a search result 
using multipliers. How you boost depends on your specific use case and how 
much you want to influence the search results. For example, boosting a result 
by 30% (`1.3`) is more subtle than a powerful multiplier like 60% (`1.6`).

* Use a lower value like 1.3 and 1.4 to give a slight advantage to certain 
  items without drastically altering the overall ranking
* Use 1.5 to strongly favor certain items like premium content or highly 
  relevant matches.
* Use 1.6 or higher for items you want to almost always appear at the top, 
  such as top-tier products.

### Boost on metadata

This example multiplies the base score by a boost value from the document 
metadata:

`get('$.score') * get('$.document_metadata.boost')`

### Boost products that have a higher customer rating

Higher customer review scores generally indicate better quality or more 
popular products. This function is designed to boost products that have 
higher customer review scores by factoring the review into the overall 
relevance score. This approach is useful in e-commerce, service platforms, or 
content recommendation systems where user feedback plays an important role in 
ranking and relevance.

Many customer review systems use a scale from 0 to 10. In this example, 
dividing by 10 normalizes the impact of customer reviews on the final score and 
prevents overweighting the review score. If the scale was 0 to 5, you would 
divide by 5. This way the customer feedback acts as a boost rather than 
dominating the search rankin:

`get('$.score') + get('$.part_metadata.customer_review_stars', 0) / 10`

### Boost content by type

Boost sections for queries about `product manual for model X` in product 
documentation that contains `Technical Specifications`. This example uses `1.5` 
(50%) as a boost value which aims to have the matching result appear near  
the top. Using a smaller boost value will make it more subtle.

`if(get('$.part_metadata.content_type') == 'Technical Specifications', get('$.score') * 1.5, get('$.score'))`


### Boost content by language

In multilingual documents, boost sections written in French by `1.6` (60%), 
ensuring that users see content in this preferred language when searching for 
`tourism industry reports`. You can experiment with different boost values 
depending on your intentions for the search results. 

`if(get('$.part_metadata.lang') == 'fra') get('$.score') * 1.6 else get('$.score')`

In this example, `get('$.part_metadata.lang') == 'fra'` checks whether the `lang` 
metadata for the part is equal to `fra`. If the condition is true, it multiplies 
the original score by 1.6. If the condition is false (the content is not in 
French), the score remains unchanged.

A `1.6` boost represents a significant increase in the ranking of French 
content so that French content is more visible. Lowering this value may balance 
the results so French does not completely dominate the search results. If you want 
an even more significant boost, use `1.7` or higher.

### Prioritize low-rated documents

Sometimes you **do not** want to prioritize high-rated documents. Instead, 
you want to know more about bad reviews to identify issues with your products. 
For example, boost `customer support feedback` documents with bad reviews 
(scored 3 out of five or less) by 60% to help identify problem areas based on 
negative feedback.

`if(get('$.document_metadata.customer_review_score', 5) < 3) get('$.score') * 1.6 else get('$.score')`

In this example, `get('$.document_metadata.customer_review_score', 5)` retrieves 
the `customer_review_score`. If it does not find a score, it defaults to 5 
(assuming a common 1-5 scale), so that documents without scores are not 
boosted.

