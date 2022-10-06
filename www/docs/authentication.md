---
id: authentication
title: OAuth 2.0
sidebar_label: Client Credentials Grant
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from './definitions.md';
import {vars} from '@site/static/variables.json';

[OAuth 2.0](https://oauth.net/2/) forms the basis for authentication on the
platform. This section provides practical guidance for authenticating requests.

For examples of how to perform authenitcation in a variety of programming
languages, see the Client Credentials Grant Examples in the sidebar.

## Client Credentials Grant

The most straightforward scenario is machine-to-machine authentication, which is
handled with a [client credentials
grant](https://tools.ietf.org/html/rfc6749#section-4.4). In this scenario, a
trusted, confidential server uses its own credentials, generally referred to as
an `app-id` and `app-secret` tuple, to authenticate requests. The server,
not <Config v="names.product"/>, is responsible for managing authentication and authorization
of individual users.

The server behind a publicly-accessible semantic search engine such as [Quanta
Search](https://quantasearch.club/) should use this strategy.

:::important

If you are using Java, please contact us for convenient helper libraries that
encapsulate the steps below.

:::

### Obtain the JWT Token

In the code snippet below, the **token endpoint** is `<AUTH_URL>/oauth2/token`
where AUTH_URL is the location of your account's authentication domain.
To determine its value, navigate to the [Authentication page](
https://console.vectara.com/authentication) of the console and select the
App Client tab.

![Authentication Domain](/img/auth_domain.png)

The **client ID** is the `app_id`, and the **redirect URI**
must match the redirect URL configured for the client. Note the peculiarities
of the HTTP authorization header: this is per the OAuth 2.0 standard.

The **grant type** should be `client_credentials` for App Clients. This auth
flow is commonly used for servers that must communicate with the platform. It
should be `authorization_code` for authentication from apps installed on a
device, such as web browsers. Finally, `refresh_token` is used to referesh
an expired token.
