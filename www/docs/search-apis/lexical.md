---
id: lexical
title: Lexical Matching
sidebar_label: Lexical Matching
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '../definitions.md';
import {vars} from '@site/static/variables.json';

:::important

Lexical matching is currently a beta feature.

:::

## Overview

Sometimes, it may be desirable to perform a hybrid search, that is, a search that
blends together semantic and lexical matches into a single set of results.

Lexical matching, also known as keyword matching, is implemented using a version
of the BM25 algorithm. Results are blended using a simple linear interpolation
value, lambda ($\lambda$), that is specified at [query time](/docs/search-apis/search#corpus-key).


Formally, lambda ranges from zero to one:

$$
0 \le \lambda \le 1
$$

Its value controls the weight given to the lexical match score, $S_{l}$, and the
semantic match score, $S_{s}$. The final score, $S$, assigned by the platform is
computed as:

$$
S = \lambda S_{l} + (1 - \lambda) S_{s}
$$

A value of zero, the default, turns off lexical matching, while a value of one
effectively turns off semantic matching. In practice values between 0.05 and
0.10 work well in practice to balance semantic and lexical results.

## Syntax

When interpreting query strings, <Config v="names.product"/> treats the following
syntax specially.

Words that are quoted must match exactly in that order. So, for example, the
query "blue shoes" must match the word *blue* followed immediately by *shoes*.

A word fragment suffixed with a "\*" is treated as a prefix match, meaning that it
matches any word of which it is a prefix. For example, *Miss*\* matches *Mississippi*.

Words prefixed with a "-" sign are excluded from the results. So, to extend the
previous example, -*Mississippi* would exclude results referencing the Magnolia
State. While -*Miss*\* would exclude references to both *Mississippi* and *Missouri*.
