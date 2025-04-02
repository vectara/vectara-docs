---
id: get-job
title: Get Job API Definition
sidebar_title: Get Job API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

The Get Job API retrieves details about a specific job by `job_id`. Jobs are
background processes like replacing the filterable metadata attributes of a
corpus.

## Get Job Request and Response

To get details about a specific job, send a GET request to `/v2/jobs/{job_id}`,
where `{job_id}` is the unique identifier of the job you want to retrieve.
The `job_id` is the string that was returned when the job was created; for
example when replacing filter attributes on a corpus.

## REST 2.0 URL

### Get Job Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to delete turns in a chat:
<code>https://<Config v="domains.rest.indexing"/>/v2/jobs/:job_id</code>

The API Reference shows the full [Get Job](/docs/rest-api/get-job) REST definition.
