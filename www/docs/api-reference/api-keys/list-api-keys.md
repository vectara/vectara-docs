---
id: list-api-keys
title: List API Keys API Definition
sidebar_label: List API Keys API Definition
---

The List API keys endpoint lists all existng API keys for your customer ID. 
It also shows what corpora are accessed by these keys and also with what permissions.

This can provide insights into key usage and status and help you
manage the lifecycle and security of your API keys.


## List API Keys Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/list-api-keys</code>

### Request Headers

To interact with the List API Keys service via REST calls, you need the following 
headers:

* `customer_id` is the customer ID to use for the request.
* An JWT token as your authentication method


### Request Body

The request body includes...

```json
// tbd

```