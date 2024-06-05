---
id: reset-user-password
title: Reset User Password API Definition
sidebar_label: Reset User Password API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Reset User Password API lets you send a password reset email to the user.

## Reset User Password Request and Response

To reset a password for a user, send a POST request to `/v2/users/{username}/reset_password`, 
where `{username}` is the User ID of the user who needs a password reset.

The response contains the `204` status code that indicates a password reset 
email was sent to the user.

## REST 2.0 URL

### Reset User Password Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to reset a user's password:
<code>https://<Config v="domains.rest.indexing"/>/v2/users:username/reset_password</code>

The API Playground shows the full [Reset User Password](/docs/rest-api/reset-user-password) REST definition.

