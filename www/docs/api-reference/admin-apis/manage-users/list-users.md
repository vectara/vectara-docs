---
id: list-users
title: List Users API Definition
sidebar_label: List Users API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The List Users API lets you list all users on your team and also their
corpus access and customer-level authorizations.

Other activities such as adding, deleting, enabling, disabling, resetting
passwords, and editing user roles are performed by the [Manage Users](/docs/api-reference/admin-apis/manage-users/manage-user) endpoint.

## List Users Request and Response

To list users, send a GET request to `/v2/users`. You can specify optional query
parameters to control the pagination of the results.

- `limit` - Indicates the maximum number of users to return in a single
  request, with a default value of `10` and a maximum value of `100`.
- `page_key` - Retrieves the next page of results when the previous request
  has reached the limit.

The response contains an array of `user` objects with the users and metadata
about the pagination.

## REST 2.0 URL

### List Users Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to list users:
<code>https://<Config v="domains.rest.indexing"/>/v2/users</code>

The API Reference shows the full [List Users](/docs/rest-api/list-users) REST definition.

## gRPC Example

You can find the full List Users gRPC definition at [admin_user.proto](https://github.com/vectara/protos/blob/main/admin_user.proto).
