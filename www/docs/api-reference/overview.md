---
id: api-overview
title: Overview of Vectara's APIs
sidebar_label: API Overview
---

import {Config} from '@site/docs/definitions.md';

Everything in <Config v="names.product"/> is driven by APIs. This page serves 
as an overview of the APIs and how to navigate this documentation to use those
APIs. Before you dive into othis topic, we recommend that you have a basic 
understanding of the following information:

## API Concepts

Familiarize yourself with the fundamentals of Application Programming 
Interfaces (APIs) including what APIs are, how they work, common use cases, 
and other key concepts:

* **gRPC APIs:** Understand the basics of gRPC (Remote Procedure Call) such as 
  the advantages with performance, code generation, and how it uses Protocol 
  Buffers for schema defnitions.
* **RESTful APIs:** Understand the principles of Representational State Transfer 
  (REST) and why it's commonly used in web services. Make sure to also 
  understand how it differs from gRPC.
* **HTTP Methods:** Become familar with HTTP methods like GET, POST, PUT, and DELETE.
* **gRPC Methods:** Become familar with gRPC methods like server streaming, client
  streaming, and bidirectional streaming.
* **Authentication:** Become aware of common authentication methods that can be 
  implemented in both gRPC and REST APIs including API Keys and OAuth 2.0 and 
  JWT tokens.

## gRPC and REST APIs
Almost every API has both a [gRPC](https://en.wikipedia.org/wiki/GRPC) and a
REST(https://en.wikipedia.org/wiki/Representational_state_transfer) endpoint.
The only exception at this time is the [File Upload](/docs/api-reference/indexing-apis/file-upload/file-upload)
API, which is only available via REST.

gRPC has several advantages over REST:
- It's lower latency than REST
- You can get strong typing out of gRPC: essentially "client libraries" for "free"

However, we include REST APIs as there's a lot of developer tooling around REST
APIs and some organizations still struggle with using HTTP/2.0 due to firewalls.

### REST API
If you'd like more details about how to use our REST APIs, including details on
our OpenAPI specification and services, a good place to start is the [REST](rest)
page.

### gRPC API
If you'd like more details about how to use our gRPC APIs, including details on
how to generate strongly typed clients, see our [gRPC](protobuf-definitions) page.