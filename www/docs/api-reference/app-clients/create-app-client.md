---
id: create-app-client
title: Create App Client API Definition
sidebar_label: Create App Client API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Create App Client API lets you create an Application Client for OAuth 2.0 
authentication with Vectara's APIs.

:::note

For more information about using OAuth 2.0 with Vectara, see 
[**OAuth 2.0 Tokens**](/docs/learn/authentication/oauth-2).

:::

To create an App Client, send a POST request to `/v2/app_clients` with the 
following properties:

* `name` - (Required) Specifies the name of the client credentials.
* `description` - Describes the client credentials.
* `types` - (Requires) Indicates the type as `client_credentials`.
* `api_roles` - Specifies the API roles associated with the client credentials 
  as `owner`, `administrator`, `billing_administrator`, or `corpus_administrator`.

The response includes the `AppClient` object that contains the assigned App 
Client ID, name, description, client ID used within the OAuth flow, client 
secret, API roles, and API policy.

## REST 2.0 API URL

### Create App Client Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to create an app client:
<code>https://<Config v="domains.rest.indexing"/>/v2/api_keys</code>

The API Playground shows the full [Create App Client](/docs/rest-api/create-app-client) REST definition.
