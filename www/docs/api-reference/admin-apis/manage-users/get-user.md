---
id: get-user
title: Get User API Definition
sidebar_label: Get User
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Get User API lets you retrieve information about a specific user on the
account.

## Get User Request and Response

To get a user, send a GET request to `/v2/users/{username}`, where `{username}`
is the User ID of the user you want to retrieve.

The response contains the user ID, email, username, enabled status,
description, creation and update timestamps, and assigned API roles.

## REST 2.0 URL

### Get User Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to get a user:
<code>https://<Config v="domains.rest.indexing"/>/v2/users:username</code>

The API Reference shows the full [Get User](/docs/rest-api/get-user) REST definition.
