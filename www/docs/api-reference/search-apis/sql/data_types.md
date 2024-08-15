---
id: data-types
title: Data Types
---

This section provides a list of the various data types supported by Vectara, 
helping you make informed decisions when working with different data types.

| Data Type    | Description                                                        | Metadata Literal Syntax                                                        |
| ------------ | -------------------------------------------------------------------|--------------------------------------------------------------------------------|
| Integer      | The value is a signed integer up to eight bytes in length.         | Any number of digits without a period.                                         |
| Real (Float) | The value is a floating point number corresponding to a Java double, and is of [IEEE 754 float64 format][1]. |  Any number of digits with a period. |
| Text         | The value is UTF-8 text.                                           | A string is enclosed in single quotes (`'`). You can escape a `'` inside text by having two quotes (`''`). |
| Boolean      | The value is Boolean                                               | `true` or `false`                                                              |
| Null         | If metadata is not present, its absence is indicated by NULL.      |  `null`                                                                        |

[1]: https://en.wikipedia.org/wiki/Double-precision_floating-point_format
