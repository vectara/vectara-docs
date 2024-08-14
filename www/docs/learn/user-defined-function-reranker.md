---
id: user-defined-function-reranker
title: User Defined Function Reranker
sidebar_label: User Defined Function Reranker
---

import {Config} from '@site/docs/definitions.md';

The User Defined Functions Reranker enables users to define custom reranking 
functions using document-level metadata, part-level metadata, or scores 
generated from the request-level metadata. To use this reranker, set the 
`type` to `userfn` in a query and specify a string within the 
`reranker` section of the query. This string syntax is custom and similar to 
SQL like filter expressions.

This new user-defined functions reranker allows for a wide range of use cases:

* **Recency bias**: Prioritize the most recent results in cases where answers 
  based on older data are less relevant than newer data.
* **Location bias**: Prioritize results closer to the location of the user.
* **E-commerce bias**: Prioritize promotional and sponsored merchandise.

## Language definition

The User Function Language allows you to specify an expression that computes a 
new score for a search result. There are no statements or variables. The 
expression definition has access to the search result, and various Vectara 
provided functions to enable computing new scores for a variety of use cases.

## Types and literals

User Function Language only has double, string, boolean, datetime, and 
duration as types. You can define double, string, and boolean literals. String 
literals are enclosed in single quotes (`'`). To encode a single quote requires 
two repeated single quotes (`''`).

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
The current list of operators are `*, / %, +, -, &lt;, &lt;=, >=, >, ||, &&, ==, !`. 
Operator precedence is in the previous listed order.

### Operators examples:

```
2 + 3
100 % 10
(true != false)
(1 + 2 + 3) / 6
```

## If Expression

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

### Get Function

The `get` function allows you to retrieve properties of the result. The `get` 
argument is a [JSONPath](https://en.wikipedia.org/wiki/JSONPath) string that retrieves values
from a search result object. JSON paths that do not exist return null.
The `get` function can also optionally take a second argument as a default value if the JSONPath is null.

The search result object is similiar to the definition of the search 
result in the HTTP API definition. What follows is the schema for the search result object.


```json
{
  "scores": {
    "lexical": 234,
    "neural": 0.34,
    "interpolated": 0.90,
    "previous": 0.34
  },
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

#### Scores object

The scores object allows you to acccess the different scores computed for a 
search result.
* `lexical` - The lexical score before the neural score is applied, optimized for 
  keyword search. This score may be missing. 
* `neural` - The neural score before the lexical score is applied, providing a 
  semantic understanding of the query intent.
* `interpolated` - The computed interpolation between the lexical and neural 
  scores, blending the keyword and neural. This score may be missing.
* `previous` - The last score computed by the retrieval pipeline. Most often 
  the interpolated score.

#### Get examples

```sql
get('$.scores.previous') * get('$.part_metadata.boost')
get('$.document_metadata.reviews[0].score', 0)
```

#### Lexical score example

Query for an exact title match of `The Great Gatsby`:

```json
{
  "query": "The Great Gatsby",
  "search": {
    "reranker": {
      "type": "userfn",
      "function": "get('$.scores.lexical')"
    }
  }
}
```
#### Neural score example

Query products related to `comfortable sleeping` even if 
the exact word "comfortable" is not used:

```json
{
  "query": "comfortable sleeping",
  "search": {
    "reranker": {
      "type": "userfn",
      "function": "get('$.scores.neural')"
    }
  }
}
```

#### Interpolated score example

Query example of a hybrid search that balances the scores of neural 
and lexiccal results that find laptops which are both affordable and suitable 
for gaming:

```json
{
  "query": "affordable laptops for gaming",
  "search": {
    "reranker": {
      "type": "userfn",
      "function": "get('$.scores.interpolated')"
    }
  }
}
```

#### Previous score example

In this example, you want popular coffee shops that have ranked high in 
previous searches:

```json
{
  "query": "best coffee shops nearby",
  "search": {
    "reranker": {
      "type": "userfn",
      "function": "get('$.scores.previous')"
    }
  }
}

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
| `seconds(a)`         | Converts a duration to the number of seconds.                 | `seconds(seconds(50))`             |
| `minutes(a)`         | Converts a duration to the number of minutes.                 | `minutes(minutes(60))`             |
| `hours(a)`           | Converts a duration to the number of hours.                   | `hours(hours(1))`                  |
| `seconds(a)`         | Converts a number to a seconds duartion.                      | `seconds(50)`                      |
| `minutes(a)`         | Converts a number to a minutes duration.                      | `minutes(80)`                      |
| `hours(a)`           | Converts a number to a hours duration.                        | `hours(1)`                         |

## Math functions

The following table list the math functions available that allow you to perform 
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

### Function calling examples


```sql
get('$.scores.previous') * 1 / as_days(iso_datetime_parse(get('$.document_metadata.publication_date')) - now())
```

## API v2 example

This example multiplies the base score by a boost value from the document 
metadata:

```json
{
   "query": "query",
   "search": {
      "reranker": {
        "type": "userfn",
        "function": "get('$.scores.previous') * get('$.document_metadata.boost')"
      }
   }
}
```
## gRPC example

This example of a toy shows how ranking in an ecommerce system would work:


```grpc
 request = serving_pb2.QueryRequest(
        query=query, num_results=fetch)
 request.reranking_config.reranker_id = 272725722
 request.reranking_config.userfn_config.expression = \
     "get('$.scores.previous') + log10(get('$.document_metadata.publish_ts')) + log(get('$.document_metadata.customer_review_stars')) + get('$.document_metadata.promoted')"
```

This example modifies the score with the following options:

* Recency bias: Adds the log of the publication timestamp (`get('$.document_metadata.publish_ts`))
* Popularity bias: Adds the log of the customer review, which can be 1 to 5 
  stars (`get('$.document_metadata.customer_review_stars')`)
* Sponsored promotions bias: Adds the value of the promoted variable (`get('$.document_metadata.promoted')`)
