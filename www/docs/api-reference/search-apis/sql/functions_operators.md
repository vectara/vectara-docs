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

## Unary Plus and Minus (+, -)

```sql
SELECT +value AS positive_value, -value AS negative_value;
```

## Multiplication, Division, and Modulo (*, /, %)

```sql
SELECT value1 * value2 AS multiplication;
SELECT value1 / value2 AS division;
SELECT value1 % value2 AS modulo;
```

## Addition and Subtraction (+, -)

```sql
SELECT value1 + value2 AS addition;
SELECT value1 - value2 AS subtraction;
```

## Comparison Operators (<, <=, >, >=)


```sql
SELECT value1 < value2 AS less_than;
SELECT value1 <= value2 AS less_than_or_equal;
SELECT value1 > value2 AS greater_than;
SELECT value1 >= value2 AS greater_than_or_equal;
```

<!--
## Equality Operators (=, ==, !=, <>) -->

```sql
SELECT value1 = value2 AS equal;
SELECT value1 == value2 AS double_equal;
SELECT value1 != value2 AS not_equal;
SELECT value1 <> value2 AS not_equal_case_sensitive;
```


## NULL Comparison Operators (IS NULL, IS NOT NULL)

```sql
SELECT value IS NULL AS is_null;
SELECT value IS NOT NULL AS is_not_null;
```

## IN Operator

```sql
SELECT value IN (value1, value2, ...) AS in_list;
SELECT value IN (SELECT blah_blah FROM blah_table WHERE blah_condition) AS in_subquery;
```

## NOT Operator

```sql
SELECT NOT boolean_expression AS negated_expression;
```


## AND Operator

```sql
SELECT condition1 AND condition2 AS combined_condition;
```
## OR Operator

```sql
SELECT condition1 OR condition2 AS combined_condition;
```
