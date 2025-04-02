---
id: tls
title: Transport Layer Security (TLS)
sidebar_label: Transport Layer Security (TLS)
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import vars from '@site/static/variables.json';

All communication to and from the API endpoints take place using an encrypted
communication channel (TLS). gRPC handles configuration of the TLS channel
using [channel credentials](https://grpc.io/docs/guides/auth/#credential-types),
and you should refer to their documentation.

The code snippets below show how to configure channel credentials using the
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
