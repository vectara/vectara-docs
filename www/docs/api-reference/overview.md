---
id: api-overview
title: Vectara APIs Overview
sidebar_label: Vectara APIs Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

Everything in <Config v="names.product"/> is driven by APIs. This section serves 
as a roadmap to understanding and using our [gRPC APIs](/docs/api-reference/protobuf-definitions) and 
[REST APIs](/docs/api-reference/rest) for [indexing](/docs/learn/select-ideal-indexing-api), [querying](/docs/api-reference/search-apis/search), and administrative tasks 
such as [managing user access](/docs/api-reference/admin-apis/manage-users/manage-user) and [corpora](/docs/api-reference/admin-apis/admin). Before getting into more 
details, we recommend that you have a basic understanding of API concepts.

## :star2: Ready to Dive In? Check Out Our API Playground! :star2:

If you're ready to dive into our APIs, make your way to our [**API Playground**](/docs/rest-api/vectara-rest-api)! 
This interactive environment allows you to experiment with <Config v="names.product"/>'s REST APIs 
directly from your browser! Tailored for developers, the API Playground 
offers a hands-on experience to understand and demonstrate our capabilities.

## Fundamental API Concepts

Familiarize yourself with the fundamentals of Application Programming 
Interfaces (APIs) including what APIs are, how they work, common use cases, 
and other key concepts:

* **gRPC APIs:** Understand the basics of gRPC (Remote Procedure Call) such as 
  the advantages with performance, code generation, and how it uses Protocol 
  Buffers (**.proto** files) for schema defnitions. You can [download the `.proto` files](https://github.com/vectara/protos/tree/main) directly 
  from Github. For example, [`serving.proto`](https://github.com/vectara/protos/blob/main/serving.proto) 
provides the message definitions for running queries.
* **RESTful APIs:** Understand the principles of Representational State Transfer 
  (REST) and why it's commonly used in web services. Make sure to also 
  understand how it differs from gRPC. For example, review the [Java example](/docs/getting-started-samples/RestIndex.java) for our 
  Standard Indexing API. 
* **HTTP Methods:** Become familar with HTTP methods like GET, POST, PUT, and DELETE.
* **gRPC Methods:** Become familar with gRPC methods like server streaming, client
  streaming, and bidirectional streaming.
* **Authentication:** Become aware of common authentication methods that can be 
  implemented in both gRPC and REST APIs including API Keys and OAuth 2.0 and 
  JWT tokens.

## Choosing gRPC or REST APIs
Almost every API has both a [gRPC](https://en.wikipedia.org/wiki/GRPC) and a 
[REST](https://en.wikipedia.org/wiki/Representational_state_transfer) endpoint.
The only exception at this time is the [File Upload API](/docs/api-reference/indexing-apis/file-upload/file-upload),
which is only available via REST.

gRPC has several advantages over REST:
- It's lower latency than REST
- You can get strong typing out of gRPC: essentially "client libraries" for "free"

However, we include REST APIs as there's a lot of developer tooling around REST
APIs and some organizations still struggle with using HTTP/2.0 due to firewalls.

### REST API
If you'd like more details about how to use our REST APIs, including details on
our OpenAPI specification and services, a good place to start is the [REST APIs](rest)
page.

### gRPC API
If you'd like more details about how to use our gRPC APIs, including details on
how to generate strongly typed clients, see our [gRPC APIs](protobuf-definitions) page.