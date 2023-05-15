---
id: protobuf-definitions
title: Protocol Buffer Definitions
sidebar_label: Protocol Buffers
---

import {Config} from './definitions.md';

<Config v="names.product"/> implements a <a href="https://grpc.io/">gRPC API</a> to all its core
services. You can download the proto files directly below.

| Protobuf | Description |
| :--- | :--- |
| [services.proto](https://github.com/vectara/protos/blob/main/services.proto) | Defines the core services within the platform. |
| [serving.proto](https://github.com/vectara/protos/blob/main/serving.proto) | Message definitions for running queries. |
| [custom_dim.proto](https://github.com/vectara/protos/blob/main/custom_dim.proto) | Message definitions for custom dimensions. |
| [indexing.proto](https://github.com/vectara/protos/blob/main/indexing.proto) | Message definitions for indexing content. |
| [core_services.proto](https://github.com/vectara/protos/blob/main/core_services.proto) | Defines the low-level indexing services. |
| [indexing_core.proto](https://github.com/vectara/protos/blob/main/indexing_core.proto) | Message definitions for low-level indexing. |
| [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto) | Message definitions for performing administrative tasks. |
| [status.proto](https://github.com/vectara/protos/blob/main/status.proto) | Status return codes. |
| [common.proto](https://github.com/vectara/protos/blob/main/common.proto) | Common message definitions. |

These are all available on Vectara's [Public Protobuf Definition GitHub Repo](https://github.com/vectara/protos/) which
you can download or fetch locally.

## Auxiliary Protocol Buffers

The gRPC services also use Google's
[annotations.proto](https://github.com/googleapis/googleapis/blob/master/google/api/annotations.proto)
and [http.proto](https://github.com/googleapis/googleapis/blob/master/google/api/http.proto).
The curl commands below will download these files into the `ext` subdirectory.
You can then reference them in the `protoc` path using `-I ext`.

```bash
protos $ ls
LICENSE             admin.proto         core_services.proto indexing.proto      services.proto      status.proto
README.md           common.proto        custom_dim.proto    indexing_core.proto serving.proto
protos $ mkdir ext
protos $ curl -s -o ext/google/api/annotations.proto --create-dirs \
             https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/annotations.proto
protos $ curl -s -o ext/google/api/http.proto --create-dirs \
             https://raw.githubusercontent.com/googleapis/googleapis/master/google/api/http.proto
```

## Examples

The [Quickstart Examples](https://github.com/vectara/getting-started) GitHub
repository has examples of connecting via gRPC in a variety of languages.
