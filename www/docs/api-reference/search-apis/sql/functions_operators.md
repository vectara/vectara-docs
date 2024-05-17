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
relevant documents for their specific use cases. Let's look at these operators 
in more detail:

## Unary plus and minus operators (`+`, `-`)

The unary plus and minus operators indicate a positive or negative numeric 
value. Use when you need to filter documents based on numeric fields that can 
have both positive and negative values, such as scores, ratings, or 
temperatures. 

For example, filter documents with a score greater than (or less than) 
specific scores with the positive or negative sign:

* **Unary plus** - Filter documents with a score greater than 
  positive 10:

  `doc.score > 10`
* **Unary minus**  - Filter documents with a score less 
  than negative 5:

  `doc.score < -5` 

## Multiplication, division, and modulo operators (`*`, `/` `%`)

These operators perform mathematical operations on numeric values to multiply, 
divide, and find the remainder of a value. Use when involving calculating 
prices with taxes, determining the number of pages or items 
per group, or finding documents with specific numeric patterns.

For example use multiplication to filter on price, total pages, 
and page count to find odd or even numbers.

* **Multiplication** - Filters documents where the price increased by 10% is 
  greater than 100:

 `doc.price * 1.1 > 100`

* **Division** - Filters documents where the total number of pages divided by 
  10 is less than 20:

 `doc.totalpages / 10 < 20`
* **Modulo** - Filters documents where the page count is 
  divisible by 3:

 `doc.pagecount % 3 = 0` 


## Addition and subtraction operators (`+`, `-`)

These addition and subtraction operators perform arithmetic operations on 
numeric values. Use for tasks like adjusting scores or prices 
based on specific criteria or comparing values with a certain threshold.

For example, filter on scores above a specific number or prices after discount.

* **Addition** - Filters documents where the score plus 10 is greater than or 
  equal to 80:

  `doc.score + 10 >= 80`
* **Subtraction** - Filters documents where the price minus the discount is 
  less than or equal to 50:

  `doc.price - doc.discount <= 50`

## Less and greater comparison operators (`<`, `<=`, `>`, `>=`)

These comparison operators are used to filter documents based on specific 
conditions. Use for a wide range of use cases, such as finding 
documents within a certain price range, date range, or any other numeric or 
comparable values.

For example, filter on prices below a specific number, ratings below a 
threshold, publish dates after a specific date, and scores above a specific 
number.

* **Less than (`<`)** - Filters documents where the price is less than 100:

  `doc.price < 100`
* **Less than or equal to (`<=`)** - Filters documents where the rating is less 
  than or equal to 4.5:

  `doc.rating <= 4.5`
* **Greater than (`>`)** - Filters documents published after January 1, 2022:

  `doc.publishdate > '2022-01-01'`
* **Greater than or equal to (`>=`)** - Filters documents with a score greater 
  than or equal to 80:

  `doc.score >= 80`


## Equality and inequality operators (`=`, `==`, `!=`, `<>`)

These comparison operators check for equality or inequality for each side 
of the function. Use for filtering documents based on specific 
values of fields, such as categories, statuses, or names.

For example, filter on a specific category or status, or filter all except for 
that category.

* **Equals (`=` or `==`)** - Filters documents where the category is "Technology" 
  or the status is "active":

  `doc.category = 'Technology'` or `doc.status == 'active'`
* **Does not equal to (`!=` or `<>`)** - Filters documents where the category is 
  neither "Sports" or "Entertainment":

  `doc.category != 'Sports'` or `doc.category <> 'Entertainment'`


## NULL comparison operators (`IS NULL`, `IS NOT NULL`)

These operators check whether or not a value is NULL (empty or missing). Use 
for filtering documents based on the presence or absence of values 
in specific fields.

For example, filter on no author or only data that has a description.

* **Value is null** - Filters documents where the author field is empty or 
  missing:

  `doc.author IS NULL`
* **Value is not null** - Filters documents where the description field has a 
  value:

  `doc.description IS NOT NULL`


## Range containment operator (`IN`)

The `IN` operator checks if a value is within a specified set. Use for 
filtering documents based on multiple possible values for a field, 
such as categories, tags, or statuses.

For example, filter on two specific categories or statuses.

* **Value is in a category** - Filters documents where the category is either 
  "Science" or "History":

  `doc.category IN ('Science', 'History')`
* **Value is a particular status** - Filters documents where the status is either 
  "active" or "pending":

  `doc.status IN ('active', 'pending')`


## Negation operator (`NOT`)

The `NOT` operator is used to negate a condition, returning documents that do 
not match the specified criteria. Use for excluding certain documents 
based on specific field values.

For example, filter on everything but a specific category or below a certain 
score.

* **Value is not in a specific category** - Filters documents where the category is 
  not "Technology":

  `NOT (doc.category = 'Technology')`
* **Value is not less than a score of `50`** - Filters documents where the score is 
  greater than or equal to 50:

  `NOT (doc.score < 50)`


## Conjunction operator (`AND`)

The `AND` operator combines multiple conditions, requiring all conditions to 
be true. Use for narrowing down search results based on multiple 
factors.

For example, filter on score and publish date ranges, or on a specific 
category and author.

* **Specify score and publish date** - Filters documents with a score greater than 
  80 and published after January 1, 2022:

  `doc.score > 80 AND doc.publishdate > '2022-01-01'`
* **Specify category and author** - Filters documents where the category is 
  "Technology" and the author is "John Smith":

  `doc.category = 'Technology' AND doc.author = 'John Smith'`

## Logical disjunction (`OR`)

The `OR` operator combines multiple conditions, requiring at least one 
condition to be true. Use for broadening search results based on 
multiple possible values.

For example, filter on documents with one of two specific categories or 
documents that either active or above a certain score.

* **Specify one of two possible categories** - Filters documents where the category 
  is either "Technology" or "Business":

  `doc.category = 'Technology' OR doc.category = 'Business'`
* **Specify one of two attributes** - Filters documents where the status is "active" 
  or the score is greater than 90:

  `doc.status = 'active' OR doc.score > 90`

## Operator combinations

Combining different operators enables you to create more specific filtering 
conditions. By using parentheses and combining these operators in different 
ways, you can effectively narrow or broaden your query results to find the 
most relevant documents. The following examples show combinations such as 
"IN and AND," "NOT and AND," "OR and "AND," and "Not and IN and AND."

* **Specify one of two possible categories and a published year** - Filters 
  documents where the category is either "Science" or "Technology" AND the 
  published year is greater than 2020:

  `doc.category IN ('Science', 'Technology') AND doc.publishedyear > 2020`

* **Value is NOT a status and category** - Filters documents that are both NOT 
  in the "draft" status AND "Technology" category:

  `NOT (doc.status = 'draft' AND doc.category = 'Technology)`

* **Specify a status or qualified score** - Filters documents where the status 
  is "active" or the score is greater than 90 as long as the status is also 
  "pending":

  `doc.status = 'active' OR (doc.status = 'pending' AND doc.score > 90)`

* **Value is not in a category and with a specific score** - Filters 
  documents that are NOT in the "Sports" or "Entertainment" category AND have 
  a score greater than or equal to 50:

  `NOT (doc.category IN ('Sports', 'Entertainment') AND doc.score >= 50)`

* **Specify one of two possible categories after a date and with a specific status** - 
  Filters documents where the category is either "Business" or "Finance", the 
  publish date is after January 1, 2022, AND the status is "published":


  `doc.category IN ('Business', 'Finance') AND doc.publishdate > '2022-01-01' AND doc.status = 'published'`

