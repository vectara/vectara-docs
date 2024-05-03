---
id: func-opr
title: Functions and Operators
---

import {Config} from '@site/docs/definitions.md';

Most operators in <Config v="names.product"/> have the same precedence and are left-associative.
You need to use parenthesis to enforce a different precedence.

The following table indicates the supported operators and their precedence (highest to lowest).
Non-binary operators do not specify associativity.


| Operator                 | Associativity | Description                      |
| ------------------------ | ------------- | -------------------------------- |
| `+`, `-`                 | -             | unary plus and minus             |
| `*`, `/`, `%`            | left          | multiplication, division, modulo |
| `+`, `-`                 | left          | addition, subtraction            |
| `<`, `<=`, `>`, `>=`     | left          | comparison                       |
| `=`, `==`, `!=`, `<>`    | left          | comparison                       |
| `IS NULL`, `IS NOT NULL` | -             | NULL comparison                  |
| `IN`                     | -             | range containment                |
| `NOT`                    | -             | logical negation                 |
| `AND`                    | left          | logical conjunction              |
| `OR`                     | left          | logical disjunction              |

These operators provide a powerful way to filter and retrieve documents. By 
using them effectively, users can create complex queries to find the most 
relevant documents for their specific use cases.

## Unary plus and minus operators (`+`, `-`)

The unary plus and minus operators indicate a positive or negative numeric 
value. They are particularly useful when you need to filter documents based 
on numeric fields that can have both positive and negative values, such as 
scores, ratings, or temperatures. 

For example, to filter documents with a score greater than or less than 
specific values with the positive or negative sign:

* **Unary plus**: `doc.score > -10`
* **Unary minus**: `doc.score < +5`


## Multiplication, division, and modulo operators (`*`, `/` `%`)

These operators perform mathematical operations on numeric values to multiply, 
divide, and find the remainder of a value. They are commonly used for tasks 
like calculating prices with taxes, determining the number of pages or items 
per group, or finding documents with specific numeric patterns:

* **Multiplication**: `doc.price * 1.1 > 100`
* **Division**: `doc.totalpages / 10 < 20`
* **Modulo**: `doc.pagecount % 3 = 0`


## Addition and subtraction operators (`+`, `-`)

These addition and subtraction operators perform arithmetic operations on 
numeric values. They are useful for tasks like adjusting scores or prices 
based on specific criteria or comparing values with a certain threshold.

* **Addition**: `doc.score + 10 >= 80`
* **Subtraction**: `doc.price - doc.discount <= 50`


## Less and greater comparison operators (`<`, `<=`, `>`, `>=`)

These comparison operators are used to filter documents based on specific 
conditions. They are useful for a wide range of use cases, such as finding 
documents within a certain price range, date range, or any other numeric or 
comparable values.

* **Less than (`<`)**: `doc.price < 100`
* **Less than or equal to (`<=`)**: `doc.rating <= 4.5`
* **Greater than (`>`)**: `doc.publishdate > "2022-01-01"`
* **Greater than or equal to (`>=`)**: `doc.score >= 80`


## Equality and inequality operators (`=`, `==`, `!=`, `<>`)

These comparison operators check for equality or inequality for each side 
of the function. They are useful for filtering documents based on specific 
values of fields, such as categories, statuses, or names:

* **Equals (`=` or `==`)**: `doc.category = "Technology"` or `doc.status == "active"`
* **Does not equal to (`!=` or `<>`)**: `doc.category != "Sports"` or `doc.category <> "Entertainment"`


## NULL comparison operators (`IS NULL`, `IS NOT NULL`)

These operators check whether or not a value is NULL (empty or missing). They 
are useful for filtering documents based on the presence or absence of values 
in specific fields.

* **Value is null**: `doc.author IS NULL`
* **Value is not null**: `doc.description IS NOT NULL`


## Containment operator (`IN`)

The `IN` operator checks if a value is within a specified set. They are 
useful for filtering documents based on multiple possible values for a field, 
such as categories, tags, or statuses:

* **Value is in a category**: `doc.category IN ("Science", "History")`
* **Value is a particular status**: `doc.status IN ("active", "pending")`


## Negation operator (`NOT`)

The `NOT` operator is used to negate a condition, returning documents that do 
not match the specified criteria. It is useful for excluding certain documents 
based on specific field values.

* **Value is not in a specific category**: `NOT (doc.category = "Technology")`
* **Value is not less than a score of `50`**: `NOT (doc.score < 50)`


## Conjunction operator (`AND`)

The `AND` operator combines multiple conditions, requiring all conditions to 
be true. It is very useful for narrowing down search results based on multiple 
factors.

* **Specify score and publish date**: `doc.score > 80 AND doc.publishDate > "2022-01-01"`
* **Specify category and author**: `doc.category = "Technology" AND doc.author = "Jane Smith"`

## Logical Disjunction (`OR`)

The `OR` operator combines multiple conditions, requiring at least one 
condition to be true. It is useful for broadening search results based on 
multiple possible values.

* **Specify one of two possible categories**: `doc.category = "Technology" OR doc.category = "Business"`
* **Status is `active` or the document has a score `>90`**: `doc.status = "active" OR doc.score > 90`

