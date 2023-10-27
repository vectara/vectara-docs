---
id: admin
title: Corpus Administration APIs
sidebar_label: Corpus Administration APIs
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Vectara Console is a good way for you to get started with <Config v="names.product"/>. Once
you're ready to integrate the platform more deeply into your application, the 
Corpus Admin APIs allow you to programatically manipulate corpora and perform 
many other operations within the system.

## Create, Delete, and Reset API Definitions

The full definitions of the Create, Reset, and Delete gRPC APIs are covered
below. 

* The **Create API** allows corpora to be created programatically, up to the
limit defined for the account. 
* The **Reset API** deletes all data from a corpus, without
deleting its definition
* The **Delete API** expunges both the data in the corpus and 
its definition.


The REST APIs are programatically derived from these gRPC definitions. See
[REST APIs](/docs/api-reference/rest) for more information on endpoints or expand the 
specific API in the left navigation sidebar to find REST examples in various
programming languages. 


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

:::note


For more information on the programmatic conversion,
see [**gRPC with REST and Open APIs**](https://grpc.io/blog/coreos/). It 
goes into detail about how gRPC services were made available in both gRPC and 
HTTP REST formats to provide flexibility to users and create a versatile API 
framework.

:::