---
id: update-app-client
title: Update App Client API Definition
sidebar_label: Update App Client API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Update App Client API lets you update the description and assigned API 
roles of an App Client.

## Update App Client Key Request and Response

To update an App Client, send a PATCH request to `/v2/app_clients/{app_client_id}`, 
where `{app_client_id}` is the ID of the App Client you want to update. The 
request body should contain the following properties:

* `description` - Specifies the new description for the App Client.
* `api_roles` - Specifies the new roles to associate with the App Client, 
  including `owner`, `administrator`, `billing_administrator`, or 
  `corpus_administrator`.

The response includes an `AppClient` object that shows the modified 
description and API roles.

## REST 2.0 Example

### Update App Client Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to update an app client:
<code>https://<Config v="domains.rest.indexing"/>/v2/app_clients/:app_client_id</code>

The API Playground shows the full [Update App Client](/docs/rest-api/update-app-client) REST definition.

