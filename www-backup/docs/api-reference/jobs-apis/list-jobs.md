---
id: list-jobs
title: List Jobs API Definition
sidebar_title: List Jobs API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

The List Jobs API retrieves a list of jobs for the account. Jobs are
background processes like replacing the filterable metadata attributes of a
corpus.

## List Jobs Request and Response

To get details about a specific job, send a GET request to `/v2/jobs`. You can
specify optional query parameters to filter the results.

- `corpus_key` - Filter jobs by the associated corpus keys.
- `after` - Retrieve jobs created after a specific date and time.
- `state` - Filter jobs by status: queued, started, completed.
- `limit` - Provides the maximum number of jobs to return
  in a single request, with a default value of `10` and a maximum value
  of `100`.
- `page_key` - Retrieves the next page of results when the previous request
  has reached the limit.

## REST 2.0 URL

### List Jobs Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to delete turns in a chat:
<code>https://<Config v="domains.rest.indexing"/>/v2/job</code>

The API Reference shows the full [List Jobs](/docs/rest-api/list-jobs) REST definition.
