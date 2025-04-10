---
id: app-clients
title: App Clients for OAuth
sidebar_label: App Clients for OAuth
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

App clients provide the necessary pieces of information to [generate a JWT token](/docs/learn/authentication/oauth-2#generate-a-jwt-token) 
that developers need for OAuth 2.0 authentication. These pieces include the 
authorization URL, Client ID, and Client Secret.

## Create an App Client

Visit the **API access** page in the Console or go 
to [https://console.vectara.com/console/apiAccess/appClients](https://console.vectara.com/console/apiAccess/appClients) to 
create a new application client. Applications will use the
`client credentials` grant when they generate the JWT token. 

1. Click **Create app client**.
2. Enter a **Name** and **Description** for the app client.
3. Select the appropriate roles for the client.
4. Click **Create** and the new app client appears in the list.

**Authentication URL**

Access your authentication by clicking the copy icon for the "OAuth 2.0 
authentication URL."

The URL has the following format:

`https://auth.vectara.dev/oauth2/token`

**Client ID**

Access the `client_id` by clicking the copy icon next to your app client's ID.

![Copy the Client ID](/img/copy_client_id.png)

**Client secret**

Access the `client_secret` by clicking the drop-down to the right of your app 
client and selecting **Copy secret.**

![Copy the Client Secret](/img/copy_client_secret.png)

Now that you have values for the authentication URL, `client_id`, and `client_secret`, 
you can [generate a JWT token](/docs/learn/authentication/oauth-2#generate-a-jwt-token) with a `client-credentials` grant.
