---
id: delete-app-client
title: Delete App Client API Definition
sidebar_label: Delete App Client API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Delete App Client API lets you delete one or more existing App Clients.

## Delete App Client Request and Response

To delete an API key, send a DELETE request to `/v2/app_clients/{app_client_id}`, 
where `{app_client_id}` is the ID of the App Client you want to delete.

<Config v="names.product"/> exposes a REST endpoint at the following URL
to delete app clients:
<code>https://<Config v="domains.rest.indexing"/>/v2/delete-api-key</code>

The API Playground shows the full [Delete App Client](/docs/rest-api/delete-app-client) REST definition.
