---
id: auth-overview
title: Authentication Overview
sidebar_label: Authentication Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

In <Config v="names.product"/>, we have robust authentication and authorization 
methods in place to secure your data and operations. All <Config v="names.product"/> APIs 
are authenticated. Indexing and Search APIs can be authenticated via [API Keys](/docs/learn/authentication/api-key-management) however, Admin actions (creating/deleting corpora) must be done via
[OAuth 2.0](/docs/learn/authentication/oauth-2).

### Choose between API keys or OAuth 2.0

When it comes to securing your application and managing access, you have a 
choice between API Keys and OAuth. API Keys can be scoped either to be 
query-only or both query and index. We recommend that you choose the most 
limited scope you can for your application: it's "cheap" to create multiple 
API keys, but having an accidental publication of an over-privileged API key 
is often organizationally "expensive." 

In general, we recommend that you use OAuth 2.0 if and where possible for 
production applications. OAuth can ensure a higher level of security and 
better protect your sensitive data.

## Authorization

Authorizations in <Config v="names.product"/> include roles at the account and 
corpus levels. Account features also differ from roles and are generally tied 
to the account tier. For more details about <Config v="names.product"/>'s authorization/permissions 
model, see the [RBAC authorization](/docs/learn/authentication/role-based-access-control) page.

## Transport Layer Security (TLS)

All communication to and from the API endpoints take place using an encrypted
communication channel (TLS). gRPC handles configuration of the TLS channel
using [channel credentials](https://grpc.io/docs/guides/auth/#credential-types),
and you should refer to their documentation.

### Configure channel credentials

The following code snippets show how to configure channel credentials using the
default set of root certificates installed on your system, which is usually
sufficient.

<Tabs
  defaultValue="java"
  values={[
    { label: 'Java', value: 'java', },
    { label: 'Python', value: 'py', },
    { label: 'PHP', value: 'php', },
  ]
}>
<TabItem value="php">

```php
$channel_creds = Grpc\ChannelCredentials::createSsl();
```

</TabItem>
<TabItem value="py">
<pre>
{`# Allow the gRPC runtime to load root certificates from the default location.
# This is sufficient for most cases.
channel_creds = grpc.ssl_channel_credentials()
grpc.secure_channel("${vars['domains.grpc.serving']}:443", channel_creds)
`}
</pre>

</TabItem>
<TabItem value="java">

<pre>
{`NettyChannelBuilder
    .forAddress("${vars['domains.grpc.serving']}", 443)
    .sslContext(GrpcSslContexts.forClient()
        .trustManager(null)  // load root certificates from the default location
        .build())
    .build();
`}
</pre>

</TabItem>
</Tabs>
