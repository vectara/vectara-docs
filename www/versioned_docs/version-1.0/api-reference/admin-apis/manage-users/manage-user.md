---
id: manage-user
title: Manage User API Definition
sidebar_label: Manage User API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Manage User API lets you perform different user and team management 
activities such as adding, deleting, enabling, disabling, and editing user 
roles. This capability is useful in scenarios that require dynamic team 
management.

For example, a company wants to onboard new team members efficiently and this  
endpoint lets you streamline the onboarding process by programatically 
adding new users, assigning appropriate roles, and setting up access 
permissions.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/manage-user) that lets 
you experiment with this REST endpoint to manage users for your Vectara
account.

:::

## userActionType Object

The `userActionType` object contains the `user` object, which specifies the 
`id`, `handle`, `userStatus`, `role`, and other information about the user.

## REST Example

### Manage User Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to manage users:
<code>https://<Config v="domains.rest.indexing"/>/v1/manage-user</code>

The API Playground shows the full [Manage User](/docs/rest-api/manage-user) REST definition.

## gRPC Example

You can find the full Manage User gRPC definition at [admin_user.proto](https://github.com/vectara/protos/blob/main/admin_user.proto).