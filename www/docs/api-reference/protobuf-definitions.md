---
id: protobuf-definitions
title: Protocol Buffer Definitions
sidebar_label: Protocol Buffers
---

import {Config} from '@site/docs/definitions.md';

<Config v="names.product"/> implements a <a href="https://grpc.io/">gRPC API</a> to all its core
services. You can download the proto files directly below.

| Protobuf | Description |
| :--- | :--- |
| [services.proto](https://github.com/vectara/protos/blob/main/services.proto) | Defines the core services within the platform. |
| [serving.proto](https://github.com/vectara/protos/blob/main/serving.proto) | Message definitions for running queries. |
| [custom_dim.proto](https://github.com/vectara/protos/blob/main/custom_dim.proto) | Message definitions for custom dimensions. |
| [indexing.proto](https://github.com/vectara/protos/blob/main/indexing.proto) | Message definitions for indexing content. |
| [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto) | Message definitions for performing administrative tasks. |
| [status.proto](https://github.com/vectara/protos/blob/main/status.proto) | Status return codes. |
| [common.proto](https://github.com/vectara/protos/blob/main/common.proto) | Common message definitions. |

## Auxiliary Protocol Buffers

The gRPC services also use Google's
[annotations.proto](https://github.com/googleapis/googleapis/blob/master/google/api/annotations.proto)
and [http.proto](https://github.com/googleapis/googleapis/blob/master/google/api/http.proto).
The curl commands below will download these files into the `ext` subdirectory.
You can then reference them in the `protoc` path using `-I ext`.

```bash
proto $ ls
admin.proto  common.proto indexing.proto  services.proto  serving.proto  status.proto
proto $ mkdir ext
proto $ curl -s -o ext/google/api/annotations.proto --create-dirs \
             https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/annotations.proto
proto $ curl -s -o ext/google/api/http.proto --create-dirs \
             https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/http.proto
```

## Example Protocol Buffers

The [Quickstart Examples](https://github.com/vectara/getting-started) GitHub
repository has examples of connecting via gRPC in a variety of languages.

## Generating Strongly Typed Clients
One of the advantages of using gRPC is that there is some tooling for generating
strongly-typed clients/bindings in many programming languages.  These work by
converting the protobuf definitions to code.

The most up-to-date documentation on how to do this is in the "quick start"
sections of [https://grpc.io/docs/languages/](https://grpc.io/docs/languages/)
following the "Generate gRPC code" section in the language of your choosing.
