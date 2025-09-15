---
id: list-app-clients
title: List App Clients API Definition
sidebar_label: List App Clients
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The List App Clients API lets you list an Application Client for OAuth 2.0
authentication with Vectara's APIs.

:::note

For more information about using OAuth 2.0 with Vectara, see
[**OAuth 2.0 Tokens**](/docs/learn/authentication/oauth-2).

:::

To list the App Client, send a POST request to `/v2/app_clients` with the
following properties:

- `name` - (Required) Specifies the name of the client credentials.
- `description` - Describes the client credentials.
- `types` - (Requires) Indicates the type as `client_credentials`.
- `api_roles` - Specifies the API roles associated with the client credentials
  as `owner`, `administrator`, `billing_administrator`, or `corpus_administrator`.

The response includes the assigned App Client ID, name, description, client ID 
used within the OAuth flow, clientsecret, API roles, and API policy.

## REST 2.0 API URL

### List App Client Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to list app clients:
<code>https://<Config v="domains.rest.indexing"/>/v2/api_keys</code>

The API Reference shows the full [List App Client](/docs/rest-api/list-app-client) REST definition.
