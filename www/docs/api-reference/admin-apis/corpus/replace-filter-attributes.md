---
id: replace-filter-attributes
title: Replace Filter Attributes API Definition
sidebar_label: Replace Filter Attributes API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Replace Filter Attributes API lets you replace the filter attributes of a 
corpus. Filter attributes enable metadata filtering on the corpus and they are  
defined as an array of `FilterAttribute` objects.

* `name` - Specifies the JSON path of the filter attribute in the document 
  or part metadata.
* `level` - Indicates whether the filter attribute is at the document or 
  part level.
* `description` - Provides an optional description of the filter attribute.
* `indexed` - Indicates whether an index should be created for the filter 
  attribute to improve query performance.
* `type`: Specifies the data type of the filter attribute as `integer`, 
  `real_number`, `text`, or `boolean`.

## REST 2.0 Example

### Replace Filter Attributes REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to replace filter attributes:
<code>https://<Config v="domains.rest.admin"/>/v2/corpora/:corpus_key/replace_filter_attributes</code>

The API Playground shows the full [Replace Filter Attributes](/docs/rest-api/replace-filter-attributes) REST definition.

## gRPC Example

You can find the full Replace Filter Attributes gRPC definition at [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).
