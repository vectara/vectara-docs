---
id: list-users
title: List Users API Definition
sidebar_label: List Users API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The List Users API lets you list all users on your team and also their
corpus access and customer-level authorizations.

Other activities such as adding, deleting, enabling, disabling, resetting 
passwords, and editing user roles are performed by the [Manage Users](/docs/api-reference/admin-apis/manage-users/manage-user) API.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/list-users) that lets 
you experiment with this REST endpoint to manage users for your Vectara
account.

:::

## List Users Request and Response


The List Users request body has the following parameters:
* `list_users_type` - Specifies the type of users as none, all, or only to list users
  with acustomer account level.
* `page_key`
* `num_results`


```json
{
    "list_users_type": ["LIST_USERS_TYPE__NONE", "LIST_USERS_TYPE__CUSTOMER", 
    "LIST_USERS_TYPE__ALL"],
    "page_key": "encrypted_key",
    "num_results": "5",
}
```

## REST Example

### List Users Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to list users:
<code>https://<Config v="domains.rest.indexing"/>/v1/list-users</code>

### Request Body and Response

```json
{
    "list_users_type": "LIST_USERS_TYPE__ALL",
    "page_key": "",
    "num_results": "5",
}
```
You get the following response:

```json
{
  "user": [
    {
      "id": 1,
      "sub": "xyz.....",
      "handle": "user@vectara.com",
      "type": "USER_TYPE__FEDERATED_USER",
      "comment": "Account owner.",
      "tsCreate": "1685481912",
      "idCreate": 0,
      "tsUpdate": "0",
      "idUpdate": 0,
      "email": "",
      "userStatus": "USER_STATUS__NONE",
      "role": []
    },
    {
      "id": 2,
      "sub": "abcde.....",
      "handle": "NHL",
      "type": "USER_TYPE__APP_CLIENT",
      "comment": "OAuth for the Docs corpus",
      "tsCreate": "1694584030",
      "idCreate": 0,
      "tsUpdate": "0",
      "idUpdate": 0,
      "email": "",
      "userStatus": "USER_STATUS__NONE",
      "role": []
    },
  ],
  "pageKey": "",
  "status": {
    "code": "OK",
    "statusDetail": "",
    "cause": null
  }
}
```