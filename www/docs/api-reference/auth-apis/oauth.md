---
id: oauth-2
title: OAuth 2.0
sidebar_label: OAuth 2.0
---

Vectara supports OAuth 2.0 via the
[client credentials grant](https://oauth.net/2/grant-types/client-credentials/).
This looks a lot like an API key or username/password authentication if you've
never used this before, but there's a lot more to it.

Fundamentally, you provide an OAuth 2.0 authentication provider with a
"client ID" which is *like* a username and a "client secret" which is *like*
a password, and a successful authentication returns a
[JWT token](https://jwt.io/), which you can then pass into subsequent requests
as an authenticated application.

OAuth 2.0 has several advantages over API keys or simple usernames/passwords:
- OAuth 2.0 has built in revocation flows in case a key is compromised
- OAuth 2.0 doesn't suffer from information leakage e.g. of the username that created the client
- OAuth 2.0 has built-in token expiry, so if a JWT token ever does get posted to a public place, it's less likely to be valid by the time an attacker discovers it
- OAuth 2.0 is inherently more tightly scoped than API keys
- JWT tokens are detected by many security scanning tools, allowing them to more easily be flagged in the case of accidental publication

:::warning

:lock: Always keep your OAuth tokens private. Do not share them through email, Slack, Discord, forums, or other public channels because it can lead to unauthorized access. Treat these tokens with the same confidentiality as your personal credentials. 

:::

# Creating an application client
Go to [https://console.vectara.com/console/authentication/app-client](https://console.vectara.com/console/authentication/app-client)
to create a new application client.  Most applications will want to use the
`Client Credentials` grant.

# Obtain a JWT Token
Before continuing, you'll need the OAuth 2.0 token endpoint.  You can obtain that
by navigating to the [Authentication page](https://console.vectara.com/authentication)
and then selecting the App Client tab.  Append `/oauth2/token` to this URL and
your account's authentication URL will typically look like:
`https://vectara-prod-YOUR_VECTARA_CUSTOMER_ID.auth.us-west-2.amazoncognito.com/oauth2/token`
where `YOUR_VECTARA_CUSTOMER_ID` is your customer ID.

![Authentication Domain](/img/auth_domain.png)

Nearly every modern high-level programming language has libraries to obtain a
JWT token from an OAuth 2.0 server via the `client_credentials` grant type.

The **client ID** is the `app_id`, and the **redirect URI**
must match the redirect URL configured for the client. Note the peculiarities
of the HTTP authorization header: this is per the OAuth 2.0 standard.

The **grant type** should be `client_credentials` for App Clients. This auth
flow is commonly used for servers that must communicate with the platform. It
should be `authorization_code` for authentication from apps installed on a
device, such as web browsers. Finally, `refresh_token` is used to referesh
an expired token.