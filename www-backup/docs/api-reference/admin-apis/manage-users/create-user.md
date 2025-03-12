---
id: create-user
title: Create User API Definition
sidebar_label: Create User API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Create User API lets you create a user in the current customer account.

For example, a company wants to onboard new team members efficiently and this  
endpoint lets you streamline the onboarding process by programatically
adding new users, assigning appropriate roles, and setting up access
permissions.

## Create User Request and Response

To create a user, send a POST request to `/v2/users` with the following
properties:

- `email` - (Required) Specifies the email address for the user.
- `username` - Specifies he username for the user. If not provided, the
  `username` defaults to the email address.
- `description` - A description for the user.
- `api_roles` - An array of role names assigned to the user. The possible
  values are `owner`, `administrator`, `billing_administrator`, and
  `corpus_administrator`.

The response returns a `user` object that contain sthe assigned user ID, email,
username, enabled status, description, creation timestamp, and assigned API
roles.

## REST 2.0 URL

### Create User Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to manage users:
<code>https://<Config v="domains.rest.indexing"/>/v2/users</code>

The API Reference shows the full [Create User](/docs/rest-api/create-user) REST definition.

## gRPC Example

You can find the full Manage User gRPC definition at [admin_user.proto](https://github.com/vectara/protos/blob/main/admin_user.proto).
