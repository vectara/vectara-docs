---
id: metadata-filters
title: Metadata filters
sidebar_title: Metadata filters
---

import CodePanel from '@site/src/theme/CodePanel';

This section helps you learn about metadata filter expressions and how to 
use them with your data.

* **[What are metadata filters?](/docs/build/prepare-data/metadata-filters#what-are-metadata-filters)**
* **[Document-level and part-level metadata](/docs/build/prepare-data/metadata-filters#document-level-and-part-level-metadata)**
* **[Using metadata](/docs/build/prepare-data/metadata-filters#using-metadata)**
* **[Functions and operators](/docs/build/prepare-data/metadata-filters#functions-and-operators)**
* **[Data types](/docs/build/prepare-data/metadata-filters#data-types)**
* **[Metadata use case examples](/docs/build/prepare-data/metadata-filters#metadata-use-case-examples)**


## What are metadata filters?

Metadata filter expressions are attached to queries and to their 
corpus keys. These filter expressions serve to restrict the search to only the 
part of the corpus that matches the expression. In both form and function, 
they are a simpler version of a `WHERE` clause's *search condition* 
in [ANSI SQL, see §7.6][1].

A filter expression operates on the metadata attached to documents that are 
indexed in <Config v="names.product"/>. Because you can associate this 
metadata to either the entire document, or to specific parts within it, the 
*scope* must be explicitly specified for every metadata reference in the 
expression.

:::tip
When defining filter attributes in the UI, do not include the `'doc.'` prefix. 
Only use the prefix when writing filter expressions.
:::

After you define filter attributes, you can use them within your queries. 
For example:

<CodePanel snippets={[{language: "json", code: `"filter_attributes": [
    {
      "name": "Title",
      "level": "document",
      "description": "The title of the document.",
      "indexed": True,
      "type": "text"
    }
  ],`}]} title="Filter Attribute Example" layout="stacked" />

## Document-level and part-level metadata

Metadata can be associated with the entire document (document-level) or 
specific sections of the document (part-level). These valid scopes are `doc.` 
and `part.`, for document and part-level metadata, respectively.
When indexing data in Vectara, you associate metadata at these levels:

* **Document-level scope**
    * Applied across the entire document. Use document-level filtering for metadata that does 
      not vary and remains consistent across the whole document.
    * **Examples:** 
      * `doc.author = 'John Doe' and doc.publication_year > 2024`
      * `doc.publication_date >= '2023-01-01' AND doc.publication_date < '2024-01-01' AND doc.category IN ('Technology', 'Science')`
* **Part-level scope**
    * Applied to specific sections or chunks within a document. Use part-level filtering when 
      properties vary within different parts of the document.
    * **Examples** 
      * `part.section = 'Introduction'`
      * `part.clause_type = 'Liability' AND part.risk_level = 25 AND part.is_boilerplate = false`

:::note
For more information, check out some of our [**Metadata Examples and Use Cases**](/docs/build/prepare-data/metadata-filters/metadata-examples-and-use-cases).
:::

## Metadata data types

When creating metadata fields for filtering, you must define the appropriate 
[data type](/docs/build/prepare-data/metadata-filters/data-types) for each field. 
Vectara supports the following metadata field types:

* **Integer:** Stores signed whole numbers. Suitable for fields like year, count, 
  or ID. For example: `doc.publication_year = 2021`
* **Real Number (Float):** Stores decimal numbers, often used for scores, 
  percentages, or measurements. For example: `part.sentiment_score > 0.7`
* **Text:** Stores UTF-8 strings. Ideal for storing names, categories, or labels.
  For example: `doc.category = 'Science'`
* **Boolean:** Stores true or false values, commonly used for toggles or binary 
  states. For example: `doc.is_featured = true`
* **Null:** Indicates the absence of a metadata field for a document. For example: 
  `doc.status IS NULL`

### Selecting the best data type

Select the correct data type to ensure your queries run efficiently and 
produce accurate results. Consider these tips:

* **Match the data to the type:** 
  * Use numeric types (`integer` or `float`) for numerical comparisons and 
  calculations.
  * Use `text` for fields that require exact matches or keyword searches.
  * Use `integer` for `year` values to enable range queries, instead of text.
* **Avoid mixing types:** Keep numerical data in numeric types and text data in 
  `text` fields. Mixing them can cause inefficient queries and unexpected 
  behavior. A bad example is using `doc.year = '2021'` (as a text field).
* **Indexing considerations:** Metadata fields marked as `indexed: True` allow 
  faster querying but may increase storage overhead. Choose indexing 
  selectively based on usage patterns.

## Using metadata

To effectively use metadata filters in Vectara, you need to configure the 
metadata fields that your queries can filter on. This process involves 
creating or updating metadata attributes during corpus setup or for an 
existing corpus.

This section explains how to create or add metadata filters and provides 
helpful context for planning and implementing metadata fields. Let's look at 
the ways to create and add metadata filters to your corpus data.

* Add metadata during corpus creation
  Use the [Create Corpus API](/docs/rest-api/create-corpus).
* Upload documents with metadata
  Use the [File Upload API](/docs/rest-api/upload-file).
* Update metadata for an existing corpus
  Use the [Update Corpus Document API](/docs/rest-api/update-corpus-document).
* Replace metadata for an existing corpus
  Use the [Replace Corpus Document Metadata API](/docs/rest-api/replace-corpus-document-metadata).

:::caution Note
Updating or replacing metadata is limited only to document-level metadata.
:::

## Default metadata filters

A few pieces of metadata expressions are filterable out of the box, including 
Document ID, Language, and Titles. These filters are very useful in a variety 
of situations.

### `doc.id` field

Each document is assigned a unique identifier at indexing. You can use the 
`doc.id` field to retrieve or filter specific Document IDs in your corpus.

Valid filter expressions include something like:

* `doc.id = 'my-document-2023.pdf'`
* `doc.id = 'my-document-2022.pdf' OR 'my-document-2023.pdf'`
* `doc.id = 'my-document-2023.pdf' AND 'my-document-2024.pdf'`


### `part.lang` field

Each section of a document is evaluated for its language at index time and the
`part.lang` field is added with a 3-character lower-case language code
([ISO 639-2](https://en.wikipedia.org/wiki/List_of_ISO_639-2_codes)).  For
example, if the section was detected as English, then `part.lang` would contain
`eng` and if it was detected as German, than `part.lang` would contain `deu`.

Valid filter expressions for this would be something like:
* `part.lang = 'eng'`
* `part.lang = 'deu'`
* `part.lang = 'eng' OR part.lang = 'deu'`

### `part.is_title` field

When adding content, <Config v="names.product"/> adds a special Boolean
field to indicate whether the field is a `title` field or not. This is useful
for a few different cases depending on how you model your data. For example,
some users want to **only** match on a title field, or never match on a title field,
in which case this field can be used to filter.

This field actually uses three value logic: true, false, and unset. We 
designed it like this to avoid creating too much metadata because customers 
are billed for metadata, so it is in the customer's interest. Here is 
how it works using "neural networks" and an example document:

* Title: "Neural Networks and Deep Learning"
* Section 1: "Introduction to Neural Networks"
* Section 2: "Applications of Neural Networks in AI"
* Section 3: "Conclusion"

* To filter for only title fields, use `part.is_title = true`. You get results 
  with "neural networks" in the title, such as "Neural Networks and Deep 
  Learning" in the title.
* To return only non-title sections, use `part.is_title = false`. You get 
  results for sections that contain "neural networks" but are not titles, such 
  as "Introduction to Neural Networks," "Applications of Neural Networks in 
  AI," and "Conclusion. You **do not** get titles with that term in the 
  results.
* However, not all documents have titles. To include sections with no title set, 
  use `part.is_title <> true`. You could get a variety of results that do not 
  have specific title designations but they contain the term "neural networks".


## Functions and operators

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

### Unary plus and minus operators (`+`, `-`)

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

### Multiplication, division, and modulo operators (`*`, `/` `%`)

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


### Addition and subtraction operators (`+`, `-`)

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

### Less and greater comparison operators (`<`, `<=`, `>`, `>=`)

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


### Equality and inequality operators (`=`, `==`, `!=`, `<>`)

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


### NULL comparison operators (`IS NULL`, `IS NOT NULL`)

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


### Range containment operator (`IN`)

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


### Using IN with list metadata types

When working with list metadata types (Integer List, Float List, Text List), 
the syntax is different from regular fields. For list attributes, use the 
following pattern:

* **Value is in a list** - To check if a specific value exists in a list attribute:  
  * `'value' IN doc.list_attribute` (for Text List)
  * `number IN doc.list_attribute` (for Integer List or Float List).  
  
  **Examples:** 
  * `'India' IN doc.country` (for Text List), 
  * `2023 IN doc.years` (for Integer List)
  * `3.14 IN doc.scores` (for Float List)
* **Multiple values are in a list** - To check if multiple values exist in a list attribute: 
  * `'value1' IN doc.list_attribute AND 'value2' IN doc.list_attribute` (for Text List)
  * `number1 IN doc.list_attribute AND number2 IN doc.list_attribute` (for Integer List or Float List). 
  
  **Examples:** 
  * `'India' IN doc.country AND 'Denmark' IN doc.country` (for Text List)
  * `2023 IN doc.years AND 2024 IN doc.years` (for Integer List)
  * `3.14 IN doc.scores AND 2.71 IN doc.scores` (for Float List)
* **Empty values** - To check if an empty value exists in a Text List: `' ' IN doc.list_attribute`

### Negation operator (`NOT`)

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

### Logical disjunction (`OR`)

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

### Operator combinations

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

## Data types

This section provides a list of the various data types supported by Vectara, 
helping you make informed decisions when working with different data types.

| Data Type    | Description                                                        | Metadata Literal Syntax                                                        |
| ------------ | -------------------------------------------------------------------|--------------------------------------------------------------------------------|
| Integer      | The value is a signed integer up to eight bytes in length.         | Any number of digits without a period.                                         |
| Real (Float) | The value is a floating point number corresponding to a Java double, and is of [IEEE 754 float64 format][1]. |  Any number of digits with a period. |
| Text         | The value is UTF-8 text.                                           | A string is enclosed in single quotes (`'`). You can escape a `'` inside text by having two quotes (`''`). |
| Boolean      | The value is Boolean                                               | `true` or `false`                                                              |
| Null         | If metadata is not present, its absence is indicated by NULL.      |  `null`                                                                        |
| Integer List | A list of signed integers.                                         | A list of integers without periods.                                            |
| Float List   | A list of floating point numbers.                                  | A list of numbers with periods.                                                |
| Text List    | A list of UTF-8 text strings.                                      | A list of strings enclosed in single quotes (`'`).                             |

[1]: https://en.wikipedia.org/wiki/Double-precision_floating-point_format


