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

The [**interactive API Reference**](/docs/rest-api/vectara-rest-api-v-2) lets you experiment with these API endpoints.

:::

## Create, Delete, and Reset Corpus API Definitions

The full definitions of the Create, Reset, and Delete gRPC APIs are covered
in [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).

- The **Create Corpus API** allows corpora to be created programmatically, up to the
  limit defined for the account.
- The **Reset Corpus API** deletes all data from a corpus, without
  deleting its definition.
- The **Delete Corpus API** expunges both the data in the corpus and
  its definition.

## Corpus Management API Definitions

The Corpus Management API definitions enable administrators to track usage of
their accounts and corpora.

- The **Get Corpus API** enables you to retrieve metadata about a specific
  corpus, including its limits and usage information.
- The **List Corpora API** enables you to list all corpora in your account,
  with pagination support.
- The **Update Corpus API** enables you to modify corpus settings, such as
  enabling/disabling the corpus or updating its filter attributes..
- The **Replace Corpus Filter Attributes API** enables you to replace the filter
  attributes of a corpus asynchronously.

The REST APIs are designed to be intuitive and follow RESTful principles. They
use standard HTTP methods (GET, POST, PATCH, DELETE) for CRUD operations and
