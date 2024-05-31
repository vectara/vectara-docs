---
id: delete-user
title: Delete User API Definition
sidebar_label: Delete User API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Delete User API lets you delete a user from the account.

## Delete User Request and Response

To delete a user, send a DELETE request to `/v2/users/{username}`, where `{username}` 
is the User ID of the user you want to delete.

The response contains the `204` status code that indicates the user has been 
successfully deleted.

## REST 2.0 Example

### Delete User Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to delete a user:
<code>https://<Config v="domains.rest.indexing"/>/v2/users:username</code>

The API Playground shows the full [Delete User](/docs/rest-api/delete-user) REST definition.

