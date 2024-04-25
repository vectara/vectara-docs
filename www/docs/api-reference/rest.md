---
id: rest
title: REST APIs
sidebar_label: REST APIs
---

import {Config} from '@site/docs/definitions.md';

While gRPC provides low latency and excellent scalability, REST APISs provide 
a more traditional and sometimes simpler integration path. REST is often the 
choice for web-based applications that do not require real-time communication.

## API Formatting Guidelines

You can find all of our APIs at https://<Config v="domains.rest.admin"/>/&lt;version&gt;/&lt;api-endpoint&gt;

The API endpoints are outlined in the various subsections of this API Reference
section. These endpoints are automatically derived from the [protobuf definitions](https://github.com/vectara/protos)
and take the same parameters. At a high level, the `api-endpoint` derives from
[services.proto](https://github.com/vectara/protos/blob/main/services.proto)
specifically, and the API parameters are in other `.proto` files. 

The translation from the protobuf definitions to REST is:
- The only `version` currently available is `v1`.
- `api-endpoint` is lowercase and has hyphens. For example, the gRPC 
  call `CreateCorpus` in services.proto is `/create-corpus`.
- API parameters can be sent in either `camelCase` or lowercase with `underscores`.  
  For example, you could submit either `numResults` or `num_results` in the Search API.
- JSON responses are always returned in `camelCase` form.

## API Authentication

All <Config v="names.product"/> APIs are authenticated. Indexing and Search
APIs can be authenticated via [API Keys](/docs/learn/authentication/api-key-management).
The Personal API Key enables most Admin actions for creating and deleting 
corpora, but for deleting accounts and accessing billing data, you need to use 
[OAuth 2.0](/docs/learn/authentication/oauth-2).

## API Playground and OpenAPI Specifications

You can find up-to-date OpenAPI specifications at
[https://docs.vectara.com/vectara-oas.yaml](https://docs.vectara.com/vectara-oas.yaml).
These REST API specifications are automatically derived from the gRPC protobuf 
definitions as well.

You can use these with tools of your choosing like [Insomnia](https://insomnia.rest/)
or [Postman](https://www.postman.com/).

1. Download the OpenAPI YAML file.
2. Import the file into Insomonia or Postman.
3. Start making API calls directly from the tool.

Want to try the REST APIs live in your browser? Head over to our
our [API Playground](/docs/rest-api/vectara-rest-api) and make
real-time API calls from your browser.

## List of Vectara REST APIs

Vectara provides the following REST APIs:

### Account Admin APIs

The [Compute Account Size API](/docs/api-reference/admin-apis/compute-account-size) lets you view how much quota you consumed across 
the entire account.

### Authentication APIs

The Authentication APIs let you manage users and the API keys in your system. 
The User Admin APIs display corpus access and customer-level authorizations, 
and also let you perform different user and team management activities:

* [List Users API](/docs/api-reference/admin-apis/manage-users/list-users)
* [Manage Users API](/docs/api-reference/admin-apis/manage-users/manage-user)

The API Key Admin APIs help you manage the lifecycle and security of API keys:

* [Create API Key API](/docs/api-reference/api-keys/create-api-key)
* [Delete API Key API](/docs/api-reference/api-keys/delete-api-key)
* [List API Keys API](/docs/api-reference/api-keys/list-api-keys)
* [Enable API Key API](/docs/api-reference/api-keys/enable-api-key)

### Corpus Admin APIs

The Corpus Admin APIs enable you to programmatically manipulate corpora and 
perform many operations such as viewing corpus consumption, size, associated 
API keys, and more:

* [Create Corpus API](/docs/api-reference/admin-apis/create-corpus)
* [Delete Corpus API](/docs/api-reference/admin-apis/delete-corpus)
* [Reset Corpus API](/docs/api-reference/admin-apis/reset-corpus)
* [Update Corpus Enablement API](/docs/api-reference/admin-apis/corpus/update-corpus-enablement)
* [Read Corpus API](/docs/api-reference/admin-apis/corpus/read-corpus)
* [Compute Corpus Size API](/docs/api-reference/admin-apis/corpus/compute-corpus-size)

### Document Admin APIs

The Document Admin APIs let you view Document IDs, metadata, and delete 
documents from corpora:

* [List Documents API](/docs/api-reference/admin-apis/corpus/list-documents)
* [Delete Documents API](/docs/api-reference/indexing-apis/deleting-documents)

### Indexing APIs

Selecting the ideal Indexing API for your application can significantly impact 
the effectiveness of integrating Vectara’s search functionalities into your 
application. Vectara provides the following indexing APIs for different 
scenarios:

* [Standard Indexing API](/docs/api-reference/indexing-apis/indexing)
* [Low-level API](/docs/api-reference/indexing-apis/core_indexing)
* [File Upload API](/docs/api-reference/indexing-apis/file-upload/file-upload)

### Query APIs

The Query APIs let you define parametres and perform queries against your data:

* [Standard Query API](/docs/api-reference/search-apis/search)
* [Stream Query API](/docs/api-reference/search-apis/search)

### Chat APIs

The Chat APIs provide a streamlined solution for integrating chatbot 
functionalities into domain-specific applications and websites using 
Retrieval Augmented Generation (RAG):

* [List Conversations API](/docs/api-reference/chat-apis/list-conversations)
* [Read Conversations API](/docs/api-reference/chat-apis/read-conversations)
* [Delete Conversations API](/docs/api-reference/chat-apis/delete-conversations)
* [Delete Turns API](/docs/api-reference/chat-apis/delete-turns)
* [Disable Turns API](/docs/api-reference/chat-apis/disable-turns)

:::note

Not all REST API endpoints have long-form documentation in this API Reference. 
For example, information about [**Get Usage Metrics**](/docs/rest-api/get-usage-metrics) is in the 
API Playground.

:::
