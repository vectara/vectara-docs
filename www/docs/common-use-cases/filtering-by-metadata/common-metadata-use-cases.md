---
id: filter-common-use-cases
title: Common Use Cases
---

import {Config} from '@site/docs/definitions.md';

In addition to the [built in metadata that you can filter on](ootb-filters)
in <Config v="names.product"/>, there are several common use cases that can be
handled via metadata:

# Date filtering (before/after)
Often, documents will have dates associated with them: the creation date, last
modified, date, or ingest date that can prove useful to filter by.  To use
these in <Config v="names.product"/>, first convert the dates to epoch
seconds and then use an [integer](/docs/api-reference/search-apis/sql/data-types)

# Indexing checkpoints
A frequent use case is