---
id: list-users
title: List Users API Definition
sidebar_label: List Users API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The List Users endpoint lets you list all users on your team and also their
corpus access and customer-level authorizations.

Other activities
such as adding, deleting, enabling, disabling, resetting passwords, and 
editing user roles are performed by the [Manage Users](/docs/api-reference/admin-apis/manage-users/manage-user) endpoint.

## List Users Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to index content into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/create-corpus</code>

## Manage Users from the API Playground

Check out our [interactive API Playground](/docs/rest-api/create-user) that lets 
you experiment with this REST endpoint to manage users for your Vectara
account.


### Request Headers

To interact with the List Users service via REST calls, you need the following headers:

* `customer_id` is the Customer ID to use for the request
* An API Key or JWT Token as your authentication method


### Request Body

The List Users request body has the following parameters:
* `corpus_id` - Specifies a specific corpus
* `filter`
* `list_users_type`
* `page_key`
* `num_results`


```json
{
    "corpus_id" 1234,
    "filter" ".@company.com",
    "list_users_type": "LIST_USERS_TYPE__NONE" or "LIST_USERS_TYPE__CORPUS" or "LIST_USERS_TYPE__CUSTOMER",
    "page_key": "encrypted_key",
    "num_results": "5",

}
```