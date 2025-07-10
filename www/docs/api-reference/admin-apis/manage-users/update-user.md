---
id: update-user
title: Update User API Definition
sidebar_label: Update User API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Update User API lets you update details about a user, such as their
enabled status and assigned roles.

## Update User Request and Response

To updata a user, send a PATCH request to `/v2/users/{username}`, where
`{username}` is the User ID of the user you want to update with the
following properties:

- `enabled` - Indicates whether to enable or disable the user (`true` or `false`)
- `api_roles` - Specifies an array of role names to assigned to the user,
  including `owner`, `administrator`, `billing_administrator`, and
  `corpus_administrator`.

The response contains the updated `user` object with the modified properties.

## REST 2.0 URL

### Update User Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to update a user:
<code>https://<Config v="domains.rest.indexing"/>/v2/users:username</code>

The API Reference shows the full [Update User](/docs/rest-api/update-user) REST definition.
