---
id: transport-layer-security
title: "Transport Layer Security (TLS)"
sidebar_label: "Transport Layer Security (TLS)"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import vars from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


All communication to and from the API endpoints take place using an encrypted
communication channel (TLS). gRPC handles configuration of the TLS channel
using [channel credentials](https://grpc.io/docs/guides/auth/#credential-types),
and you should refer to their documentation.

## Configure channel credentials

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

<CodePanel snippets={[{language: "php", code: `\$channel_creds = Grpc\\ChannelCredentials::createSsl();`}]} title="Code Example" layout="stacked" />

</TabItem>
<TabItem value="py">
<CodePanel snippets={[{language: "text", code: `{\`# Allow the gRPC runtime to load root certificates from the default location.
# This is sufficient for most cases.
channel_creds = grpc.ssl_channel_credentials()
grpc.secure_channel("\${vars['domains.grpc.serving']}:443", channel_creds)
\`}`}]} title="Code Example" layout="stacked" />

</TabItem>
<TabItem value="java">

<CodePanel snippets={[{language: "text", code: `{\`NettyChannelBuilder
    .forAddress("\${vars['domains.grpc.serving']}", 443)
    .sslContext(GrpcSslContexts.forClient()
        .trustManager(null)  // load root certificates from the default location
        .build())
    .build();
\`}`}]} title="Code Example" layout="stacked" />

</TabItem>
</Tabs>
