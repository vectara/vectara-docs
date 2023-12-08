---
id: enable-api-key
title: Enable API Key API Definition
sidebar_label: Enable API Key API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Enable API Key endpoint lets you enable or disable specific API keys. 

## Enable API Key REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/enable-api-key</code>

### Request Headers

To interact with the Index service via REST calls, you need the following 
headers:

* `customer_id` is the customer ID to use for the request.
* An JWT token as your authentication method


### Request Body

