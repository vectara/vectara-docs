---
id: admin
title: Admin APIs
sidebar_label: Corpus Administration
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '../definitions.md';
import {vars} from '@site/static/variables.json';

The admin console is a good way to get started with <Config v="names.product"/>. Once
you're ready to integrate the platform more deeply into your application, the
Admin APIs allow you to programatically manipulate corpora and perform many
other operations within the system.

:::important

These instructions require a customer account on <Config v="names.product"/>.

:::

## Full Definition

### Service

The full definitions of the Create, Reset, and Delete gRPC APIs are covered
below. The Create API allows corpora to be programatically created, up to the
limit defined for the account. Reset deletes all data from a corpus, without
deleting its definition, while Delete expunges both the data in the corpus and
its definition.

The REST APIs are programatically derived from these definitions: see
[gRPC with REST and Open APIs](https://grpc.io/blog/coreos/) or
[REST APIs](/docs/rest) for more information.

<pre>{`protobuf
service AdminService {
  rpc CreateCorpus(${vars['package.protobuf']}.admin.CreateCorpusRequest)
          returns (${vars['package.protobuf']}.admin.CreateCorpusResponse) {
    option (google.api.http) = {
      post: "/v1/create-corpus"
      body: "*"
    };
  }

  rpc DeleteCorpus(${vars['package.protobuf']}.admin.DeleteCorpusRequest)
          returns (${vars['package.protobuf']}.admin.DeleteCorpusResponse) {
    option (google.api.http) = {
      post: "/v1/delete-corpus"
      body: "*"
    };
  }

  rpc ResetCorpus(${vars['package.protobuf']}.admin.ResetCorpusRequest)
          returns (${vars['package.protobuf']}.admin.ResetCorpusResponse) {
    option (google.api.http) = {
      post: "/v1/reset-corpus"
      body: "*"
    };
  }
}
`}</pre>

