---
id: rest
title: REST APIs
sidebar_label: REST APIs
---

import {Config} from '@site/docs/definitions.md';

While gRPC provides low latency and excellent scalability, in some scenarios
it may be simpler to integrate using REST APIs. Currently, the following
endpoints are enabled:


| gRPC Endpoint         | REST Endpoint                 | Description    |
| :-------------------- | :---------------------------- | :------------- |
| <Config v="domains.grpc.admin"/>    | https://<Config v="domains.rest.admin"/>    | Administrative |
| <Config v="domains.grpc.indexing"/> | https://<Config v="domains.rest.indexing"/> | Indexing       |
| <Config v="domains.grpc.serving"/>  | https://<Config v="domains.rest.serving"/>  | Query serving  |

Refer to the Serving, Indexing, and Admin API guides for inline code examples
that use cURL to access the platform. For more information about how gRPC
integrates with REST, see [gRPC with REST and Open APIs](https://grpc.io/blog/coreos/).
