---
id: oauth-2
title: Use OAuth 2.0
sidebar_label: Use OAuth 2.0
---

import {Config} from '@site/docs/definitions.md';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Personal API keys enable rapid application development in a testing 
environment, but they are a security risk when moving to production. OAuth 2.0 
fixes this by letting your applications authenticate securely without exposing 
long-lived credentials.

Vectara uses "application clients" to support authentication with OAuth 2.0.
These application clients enable you to generate JWT tokens which are used by
Vectara to authenticate API requests. If you are not familiar with OAuth,
think of it as a more secure way to send API calls, similar to
an API key or username/password combination but with enhanced features. The
[client credentials grant](https://oauth.net/2/grant-types/client-credentials/) is the OAuth flow that Vectara supports at this time.

Here is how it works. You provide the OAuth 2.0 authentication provider with a
`client_id` (similar to a username) and a `client_secret` (similar to a
password). A successful authentication returns a [JWT token](https://jwt.io/), which
you can then pass into subsequent requests as an authenticated application.

## OAuth 2.0 best practices

- ✅ Use OAuth in production environments
- ✅ Store `client_id` and `client_secret` securely (e.g., in secrets manager)
- ✅ Automatically refresh tokens in your app
- ❌ Never expose `client_secret` or JWT tokens in public code
- 🔄 Rotate app clients periodically and revoke unused clients

## Prerequisites

- Admin access to [Vectara Console](https://console.vectara.com/)
- Your backend system can make HTTP POST requests
- Secrets manager or vault system to store credentials

## Why use OAuth 2.0 instead of API keys?

If you build backend services, third-party integrations, or require role-based 
access with tighter control, we recommend the OAuth 2.0 method.

| **Factor**                 | **OAuth 2.0**                              | **API Keys**                             |
|----------------------------|--------------------------------------------|------------------------------------------|
| Expiration                 | ✅ Yes (e.g., 30 minutes)                  | ❌ No (manually rotated)                  |
| Revocation support         | ✅ Built-in                                | ⚠️ Manual deletion                        |
| Token scoping              | ✅ Role-based at client creation           | ⚠️ Corpus-scoped, not user-based         |
| Secure for production use  | ✅ Yes                                     | ⚠️ Risky if exposed                      |
| Good for CI/CD workflows   | ✅ Yes                                     | ⚠️ Requires manual rotation              |

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

## :star2: Ready to dive in? Check out our API reference! :star2:

If already have familiarity about how JWT tokens work and you're ready to dive
into our APIs, make your way to our [**API Reference**](/docs/rest-api/vectara-rest-api-v-2)!
This interactive environment allows you to experiment with <Config v="names.product"/>'s REST
APIs directly from your browser! Tailored for developers, the API Reference
offers a hands-on experience to understand and demonstrate our capabilities.

:::caution

:lock: Always keep your JWT tokens private. Do not share them through email,
Slack, Discord, forums, or other public channels because it can lead to
unauthorized access. Treat these tokens with the same confidentiality as your
personal credentials.

:::

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

The URL has the following format:

`https://auth.vectara.com/oauth2/token`

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

### Generate a JWT token

Use the information from the previous step to send a request to generate a JWT
token. The client credentials grant is OAuth flow that Vectara supports at
this time. When you create your client credentials grant request, you need
the OAuth 2.0 Authentication URL, `client_id`, and `client_secret` values to
generate the token correctly.

Here's how you can generate a JWT token in JavaScript which is how you
authenticate Vectara API requests in a JavaScript application:

```js title="JavaScript Example"
const {
  data: { access_token: jwt },
} = await axios({
  method: "POST",
  headers: { "content-type": "application/x-www-form-urlencoded" },
  data: qs.stringify({
    grant_type: "client_credentials",
    client_id: "<your client ID goes here>",
    client_secret: "<your client secret goes here>",
  }),
  url: "https://auth.vectara.com/oauth2/token"
});
```

Here’s how you can generate a JWT token from the command line with a
cURL command:

```js title="cURL Example"
curl -XPOST -H "Content-type: application/x-www-form-urlencoded" \
    -d "grant_type=client_credentials&client_id=<your client ID goes here>&client_secret=<your client secret goes here>" \
    https://auth.vectara.com/oauth2/token
```

:::tip
This method is useful if you want to try out requests in
our [**Vectara API Reference**](/docs/rest-api/vectara-rest-api-v-2).
:::

### Use the JWT token in an API request

To use a JWT token in an API request, pass the token using the `Authorization`
header configuration.

If you're using the API Reference such as [List corpora](/docs/rest-api/list-corpora),
use the JWT token value in the **Bearer Token** field:

![API Reference Example](/img/api_playground_listcorpora.png)

Click **Send API Request** to test the API call.

## Common issues with OAuth 2.0

| **Issue**                  | **Cause**                                | **Fix**                                           |
|----------------------------|-------------------------------------------|----------------------------------------------------|
| 401 Unauthorized           | Missing or expired JWT token              | Regenerate token before expiry                    |
| Role mismatch              | App client not assigned correct role      | Edit roles in Console or recreate App Client       |
| Exposing credentials       | client_secret used in frontend app       | Never expose secrets or JWTs to end users         |

## Next steps

- [Configure Administration Permissions (RBAC)](/docs/learn/authentication/role-based-access-control)
- [Apply Metadata Filters for Attribute-Based Access Control (ABAC)](/docs/learn/authentication/attribute-based-access-control)
