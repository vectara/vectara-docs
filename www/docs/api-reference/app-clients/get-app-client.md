---
id: get-app-client
title: Get App Client API Definition
sidebar_label: Get App Client API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Get App Client API retrieves details about a specific App Client.

## Get App Client Key Request and Response

To get an App Client, send a GET request to `/v2/api_keys/{app_client_id}`, where
`{app_client_id}` is the ID of the App Client you want to retrieve.

The response includes the App Client name, description, client ID, API roles, 
and API Policy.

## REST 2.0 URL

### Get App Client Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to get an App Client:
<code>https://<Config v="domains.rest.indexing"/>/v2/app_clients/:app_client_id</code>

The API Reference shows the full [Get App Client](/docs/rest-api/get-app-client) REST definition.
