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


