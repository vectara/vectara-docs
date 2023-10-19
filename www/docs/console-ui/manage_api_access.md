---
id: manage-api-access
title: Manage API Access
sidebar_label: Manage API Access
---

The API access page lets you create and manage app clients and API keys. The 
Authentication and Authorization section provides more details about how 
to [manage OAuth 2.0 tokens](/docs/learn/authentication/oauth-2) and [use API Keys](/docs/learn/authentication/api-key-management). 

## Create an API Key

If you have the necessary permissions, an `API access` appears in the sidebar.

1. Click `API access` and then select the **API Keys** tab.

  ![View API Keys](/img/view_api_keys.png)
1. Click **Create API Key** and a dialog appears.
2. Enter the name of the key and select the corpora you want to be 
   able to query.

   ![Create API Key](/img/create_api_key.png)

3. Click **Create**.

You can now start [using the API key](/docs/learn/authentication/api-key-management#use-an-api-key).

## Create an App Client

Visit the **API access** page in the Console or go 
to [https://console.vectara.com/console/apiAccess/appClients](https://console.vectara.com/console/apiAccess/appClients) to 
create a new application client. Applications will use the
`client credentials` grant when they generate the JWT token. 

1. Click **Create app client**.
2. Enter a **Name** and **Description** for the app client.
3. Select the appropriate roles for the client.
4. Click **Create** and the new app client appears in the list.

This page provides three pieces of information that you will use 
to [generate a JWT token](/docs/learn/authentication/oauth-2#generate-a-jwt-token).

**Authentication URL**

Access your authentication by clicking the copy icon for the "OAuth 2.0 authentication URL."

![Copy the Authentication URL](/img/copy_authentication_url.png)

The URL has the following format:

`https://vectara-prod-<customer-id>.auth.us-west-2.amazoncognito.com/oauth2/token`

**Client ID**

Access the `client_id` by clicking the copy icon next to your app client's ID.

![Copy the Client ID](/img/copy_client_id.png)

**Client secret**

Access the `client_secret` by clicking the drop-down to the right of your app client and selecting **Copy secret.**

![Copy the Client Secret](/img/copy_client_secret.png)

Now that you have values for the authentication URL, `client_id`, and `client_secret`, 
you can [generate a JWT token](/docs/learn/authentication/oauth-2#generate-a-jwt-token) with a `client-credentials` grant.