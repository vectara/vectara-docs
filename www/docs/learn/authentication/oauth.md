---
id: oauth-2
title: OAuth 2.0 Tokens
sidebar_label: OAuth 2.0 Tokens
---

import {Config} from '@site/docs/definitions.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Vectara uses "Application clients" to support authentication with OAuth 2.0. 
These application clients enable you to generate JWT tokens which are used by 

Vectara to authenticate API requests. If you are not familiar with OAuth, 
think of it as a more secure way to send API calls, similar to 
an API key or username/password combination but with enhanced features. The 
client credentials grant is the OAuth flow that Vectara supports at this time.

Here is how it works. You provide the OAuth 2.0 authentication provider with a
`client_id` (similar to a username) and a `client_secret` (similar to a 
password). A successful authentication returns a [JWT token](https://jwt.io/), which 
you can then pass into subsequent requests as an authenticated application.


## :star2: Ready to Dive In? Check Out Our API Playground! :star2:

If already have familiarity about how JWT tokens work and you're ready to dive 
into our APIs, make your way to our [**API Playground**](/docs/rest-api/vectara-rest-api)! 
This interactive environment allows you to experiment with <Config v="names.product"/>'s REST 
APIs directly from your browser! Tailored for developers, the API Playground 
offers a hands-on experience to understand and demonstrate our capabilities.

:::caution

:lock: Always keep your JWT tokens private. Do not share them through email, 
Slack, Discord, forums, or other public channels because it can lead to 
unauthorized access. Treat these tokens with the same confidentiality as your 
personal credentials. 

:::

## Advantages of OAuth 2.0 vs API Keys

OAuth 2.0 takes more work to set up but offer several advantages over API keys:

- OAuth 2.0 has built-in revocation flows in case a key is compromised.

- The JWT token expires automatically after 30 minutes, so if a JWT token ever 
  does get posted to a public place, it's less likely to be valid by the 
  time an attacker discovers it.

- OAuth 2.0 doesn't suffer from information leakage such as the username 
  that created the client.
- OAuth 2.0 is inherently more tightly scoped than API keys.
- JWT tokens are detected by many security scanning tools, allowing them to 
  more easily be flagged in the case of accidental publication.

## Authenticate with OAuth 2.0

OAuth 2.0 authentication consists of three steps:

1. Create an application client
2. Generate a JWT Token
3. Use the JWT token in an API request

### Create an application client
Visit the **API access** page in the Console or go 
to [https://console.vectara.com/console/apiAccess/appClients](https://console.vectara.com/console/apiAccess/appClients) to 
create a new application client. Applications will use the
`client credentials` grant when they generate the JWT token. 

1. Click **Create app client**.
2. Enter a **Name** and **Description** for the app client.
3. Select the appropriate roles for the client.
4. Click **Create**.
   The new app client appears in the list.

This page provides three pieces of information that you will use to generate a 
JWT token:

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
you can generate a JWT token with a `client-credentials` grant. We provide [client 
credentials grant examples](/docs/getting-started-samples/JWTFetcher.cs) in different 
programming languages.

### Generate a JWT Token

Use the information from the previous step to send a request to generate a JWT 
token. The client credentials grant is OAuth flow that Vectara supports at 
this time. When you create your client credentials grant request, you need 
the OAuth 2.0 Authentication URL, `client_id`, and `client_secret` values to
generate the token correctly.

Here's how you can generate a JWT token in JavaScript which is how you 
authenticate Vectara API requests in a JavaScript application:

```js title="JavaScript Example"
const {
  data: { access_token: jwt }
} = await axios({
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: qs.stringify({
    grant_type: "client_credentials",
    client_id: "<your client ID goes here>",
    client_secret: "<your client secret goes here>"
  }),
  url: "<your authentication URL goes here>"
});
```
Here’s how you can generate a JWT token from the command line with a 
cURL command: 

```js title="cURL Example"
curl -XPOST -H "Content-type: application/x-www-form-urlencoded" -d 
"grant_type=client_credentials&client_id=<your client ID goes 
here>&client_secret=<your client secret goes here> <your authentication 
URL goes here> 
```

:::note

This method is useful if you want to try out requests in 
our [**Vectara API Playground**](/docs/rest-api/vectara-rest-api).

:::

### Use the JWT token in an API request

To use a JWT token in an API request, pass the token using the `Authorization` 
header configuration.

If you're using the API Playground such as [ListCorpora](/docs/rest-api/list-corpora), 
use the JWT token value in the **Bearer Token** field:

![API Playground Example](/img/api_playground_listcorpora.png)

Click **Send API Request** to test the API call.