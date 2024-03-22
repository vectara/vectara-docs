---
id: admin
title: Corpus Administration
sidebar_label: Corpus Administration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Vectara Console is a good way for you to get started with <Config v="names.product"/>. Once
you're ready to integrate the platform more deeply into your application, the 
Corpus Admin APIs allow you to programmatically manipulate corpora and perform 
many other operations within the system. These APIs enable new workflows for 
organizations, like managing corpora and tracking usage of accounts 
and corpora. Check out this [blog post about managing multi-tenancy](https://vectara.com/blog/managing-multi-tenancy-with-vectaras-new-management-apis/) for more details.

:::tip

The [**interactive API Playground**](/docs/rest-api/admin-service) lets you experiment with these API endpoints.

:::

## Create, Delete, and Reset Corpus API Definitions

The full definitions of the Create, Reset, and Delete gRPC APIs are covered
in [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto). 

* The **Create Corpus API** allows corpora to be created programmatically, up to the
limit defined for the account. 
* The **Reset Corpus API** deletes all data from a corpus, without
deleting its definition.
* The **Delete Corpus API** expunges both the data in the corpus and 
its definition.


## Corpus Management API Definitions

The Corpus Management API definitions enable administrators to track usage of 
their accounts and corpora.

* The **Compute Corpus Size API** allows you to understand how much a corpus has consumed.
* The **Read Corpus Details API** enables you to read many aspects of a corpus, including the last 
  computed size, associated API keys, and filter attributes.
* The **Enable/Disable Corpus API** enables administrators to enable or disable a corpus, such as 
  when you need to take a corpus offline without deleting the corpus.

The REST APIs are programmatically derived from these gRPC definitions. See
[REST APIs](/docs/api-reference/rest) for more information on endpoints or expand the 
specific API in the left navigation sidebar to find REST examples in various
programming languages. 

:::note


For more information on the programmatic conversion,
see [**gRPC with REST and Open APIs**](https://grpc.io/blog/coreos/). It 
goes into detail about how gRPC services were made available in both gRPC and 
HTTP REST formats to provide flexibility to users and create a versatile API 
framework.

:::