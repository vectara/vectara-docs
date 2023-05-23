---
id: api-overview
title: Overview of APIs
sidebar_label: API Overview
---

import {Config} from '@site/docs/definitions.md';

Everything in <Config v="names.product"/> is driven by APIs.  This page serves
as an overview of the APIs and how to navigate this documentation to use those
APIs.

# gRPC and REST
Almost every API has both a [gRPC](https://en.wikipedia.org/wiki/GRPC) and a
REST(https://en.wikipedia.org/wiki/Representational_state_transfer) endpoint.
The 1 exception to this is the [File Upload](/docs/api-reference/indexing-apis/file-upload/file-upload)
API, which is only available via REST.

gRPC has several advantages over REST:
- It's lower latency than REST
- You can get strong typing out of gRPC: essentially "client libraries" for "free"

However, we include REST APIs as there's a lot of developer tooling around REST
APIs and some organizations still struggle with using HTTP/2.0 due to firewalls.

## REST
If you'd like more details about how to use our REST APIs, including details on
our OpenAPI specification and services, a good place to start is the [REST](rest)
page.

## gRPC
If you'd like more details about how to use our gRPC APIs, including details on
how to generate strongly typed clients, see our [gRPC](protobuf-definitions) page.