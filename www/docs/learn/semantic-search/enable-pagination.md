---
id: enable-pagination
title: Enable Pagination in Search Results
sidebar_label: Enable Pagination
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

Upon query, <Config v="names.product"/> returns the first 10 most relevant
search results by default.  However, there are times when this is not enough
and you want to offer your users the ability to paginate through results.

To paginate in Vectara, use the `start` and `num_results` parameters.  For
example, to page through where each page has 20 results, you could set `start`
to `0` and `num_results` to `20`.  Then if your users want to paginate to
page 2, you would send `start` as `20` and `num_results` to `20`, and for
each page following, add another 20 to the `start`.