---
id: rest
title: REST APIs
sidebar_label: REST APIs
---

import {Config} from '@site/docs/definitions.md';

While gRPC provides low latency and excellent scalability, in some scenarios
it may be simpler to integrate using REST APIs.

# API Formatting Guidelines
All of the APIs can be found at https://<Config v="domains.rest.admin"/>/&lt;version&gt;/&lt;api-endpoint&gt;

The API endpoints are outlined in the various subsections of this API Reference
section.  These are automatically derived from the [protobuf definitions](https://github.com/vectara/protos)
and take the same parameters.  At a high level, the `api-endpoint`s are derived from
[services.proto](https://github.com/vectara/protos/blob/main/services.proto)
specifically, and the API parameters are in other `.proto` files.  The translation
from the protobuf definitions to REST is:
- The only `version` currently available is `v1`
- `api-endpoint` is lowercase and has hyphens.  For example, the gRPC call `CreateCorpus` in services.proto is `/create-corpus`
- API parameters can be sent in either `camelCase` or lowercase with `underscores`.  For example, you could submit either `numResults` or `num_results` in the Search API
- JSON responses are always returned in `camelCase` form

# Authentication
All <Config v="names.product"/> APIs are authenticated.  Indexing and Search
APIs can be authenticated via [API Keys](/docs/common-use-cases/app-authn-authz/api-keys)
however, Admin actions (creating/deleting corpora) must be done via
[OAuth 2.0](/docs/common-use-cases/app-authn-authz/authentication).

# API Playground and OpenAPI Specifications
You can find up-to-date OpenAPI specifications at
[https://docs.vectara.com/vectara-oas.yaml](https://docs.vectara.com/vectara-oas.yaml).
These are automatically derived from the gRPC protobuf definitions as well.

You can use these with tools of your choosing like [Insomnia](https://insomnia.rest/)
or [Postman](https://www.postman.com/)

If you'd like to try out the REST APIs live in your browser, you can do so in
our [API Playground](/docs/rest-api/vectara-rest-api), which also make use of.
