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
passwords, and editing user roles are performed by the [Manage Users](/docs/1.0/api-reference/admin-apis/manage-users/manage-user) endpoint.

:::tip

Check out our [interactive API Playground](/docs/1.0/rest-api/list-users) that lets 
you experiment with this REST endpoint to manage users for your Vectara
account.

:::

## listUsersType

The `listUsersType` specifies the type of user as none, all, or only to list 
users with a customer account level. You can also pass a `page_key` to 
retrieve a specific page of results. Leave empty to retrieve first page. 

## REST Example

### List Users Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to list users:
<code>https://<Config v="domains.rest.indexing"/>/v1/list-users</code>

The API Playground shows the full [List Users](/docs/1.0/rest-api/compute-account-size) REST definition.

## gRPC Example

You can find the full List Users gRPC definition at [admin_user.proto](https://github.com/vectara/protos/blob/main/admin_user.proto).
