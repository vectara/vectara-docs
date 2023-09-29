---
id: oauth-2
title: OAuth 2.0
sidebar_label: OAuth 2.0
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Vectara supports OAuth 2.0 via the
[client credentials grant](https://oauth.net/2/grant-types/client-credentials/).
This looks a lot like an API key or username/password authentication if you've
never used this before, but there's a lot more to it.

Fundamentally, you provide an OAuth 2.0 authentication provider with a
"client ID" which is *like* a username and a "client secret" which is *like*
a password, and a successful authentication returns a
[JWT token](https://jwt.io/), which you can then pass into subsequent requests
as an authenticated application. After you create an app client, you will use
the values for the authentication URL, `client_id`, and `client_secret` to 
obtain a JWT token, also known as a Bearer Token, via the 
`client-credentials` grant.

OAuth 2.0 has several advantages over API keys or simple usernames/passwords:
- OAuth 2.0 has built in revocation flows in case a key is compromised
- OAuth 2.0 doesn't suffer from information leakage e.g. of the username 
  that created the client
- OAuth 2.0 has built-in token expiry, so if a JWT token ever does get posted 
  to a public place, it's less likely to be valid by the time an attacker 
  discovers it
- OAuth 2.0 is inherently more tightly scoped than API keys
- JWT tokens are detected by many security scanning tools, allowing them to 
  more easily be flagged in the case of accidental publication

:::warning

:lock: Always keep your OAuth tokens private. Do not share them through email, 
Slack, Discord, forums, or other public channels because it can lead to 
unauthorized access. Treat these tokens with the same confidentiality as your 
personal credentials. 

:::

## Create an application client
Go to [https://console.vectara.com/console/apiAccess/appClients](https://console.vectara.com/console/apiAccess/appClients)
to create a new application client.  Most applications will want to use the
`client credentials` grant. When you create the app client, you can then copy the 
client_id and secret that you need for the credentials grant.

1. Click **Create app client**.
2. Enter a **Name** and **Description** for the app client.
3. Select the appropriate roles for the client from **Account Admin**, 
   **Corpus Admin**, and **Billing Admin**.
4. Click **Create**.
   The new app client appears in the list.

   ![Copy the Client ID and Secret](/img/copy_client_id_and_secret.png)
5. Click the **Copy** icon to copy the `client_id` and then save this value.
6. Select the drop-down menu, click **Copy Secret** and save the `client_secret` value.
7. Click the **Copy** icon to the right of the _OAuth 2.0 authentication URL_ and save the value.

When you create your client credentials request, you need 
the OAuth 2.0 Authentication URL, `client_id`, and `client_secret` values to
generate the token correctly.

## How to obtain a JWT Token

Before continuing, you'll need the OAuth 2.0 token endpoint which is the OAuth 
2.0 authentication URL. You can copy the URL from the [API access](https://console.vectara.com/console/apiAccess/appClients)
page and then selecting the App Client tab. Your account's authentication URL will typically look like:
`https://vectara-prod-YOUR_VECTARA_CUSTOMER_ID.auth.us-west-2.amazoncognito.com/oauth2/token`
where `YOUR_VECTARA_CUSTOMER_ID` is your customer ID.

Nearly every modern high-level programming language has libraries to obtain a
JWT token from an OAuth 2.0 server via the `client_credentials` grant type.

The **client ID** is the `app_id`, and the **redirect URI**
must match the redirect URL configured for the client. Note the peculiarities
of the HTTP authorization header: this is per the OAuth 2.0 standard.

The **grant type** should be `client_credentials` for App Clients. This auth
flow is commonly used for servers that must communicate with the platform. It
should be `authorization_code` for authentication from apps installed on a
device, such as web browsers. Finally, `refresh_token` is used to refresh
an expired token.

### Generate the JWT token

Now that you have the OAuth 2.0 authentication URL, 
`client_id`, and `client_secret`, you can generate the JWT token with 
a `client_credentials` grant. You can then use the resulting value in 
the [API Playground](/docs/rest-api/) to test your API calls.

The following examples show how to generate the JWT token. Make sure to 
substitute your values for the `customer_id` in the URL, `client_id`, and `client_secret`.

<Tabs>
<TabItem value="nodejs-example" label="NodeJS">

```js
const { access_token } = await axios.post(
  "https://vectara-prod-123456789.auth.us-west-2.amazoncognito.com/oauth2/token",
  {
    grant_type: "client_credentials",
    client_id: "...nft9ga72pf",
    client_secret: "abcdefghijklmnop1234567890"
  }
 );
```
</TabItem>
<TabItem value="curl-example" label="cURL" default>

```js
curl -XPOST -H "Content-type: application/x-www-form-urlencoded" -d 
"grant_type=client_credentials&client_id=...nft9ga72pf&client_secret=abcdefghijklmnop1234567890" 
https://vectara-prod-123456789.auth.us-west-2.amazoncognito.com/oauth2/token | jq -r ".access_token"

```
</TabItem>

</Tabs>

After you generate the token and copy the value, go to a section of the API 
Playground such as [ListCorpora](/docs/rest-api/list-corpora) and paste the 
the resulting value into the **Bearer Token** field along with other required 
fields such as `customer_id`:

![API Playground Example](/img/api_playground_listcorpora.png)

Finally, click **Send API Request** to test the API call.