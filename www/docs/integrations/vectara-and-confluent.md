---
id: vectara-and-confluent
title: Vectara and Confluent
sidebar_label: Vectara and Confluent
---

import {Config} from '@site/docs/definitions.md';

# Vectara Kafka Connect Plugin Documentation

The **Vectara Kafka Connect Plugin** is a powerful tool designed to seamlessly integrate [Confluent Cloud](https://confluent.cloud/) with the Vectara
Vector Store. This plugin enables real-time processing of data, allowing you to efficiently move data streams from Confluent directly into Vectara's
high-performance vector database.

## Key Features
- **Real-Time Data Ingestion**: Automatically ingest and index data streams into Vectara for real-time search and retrieval.
- **Customizable Metadata Extraction**: Configure the connector to look at fields in the data to import documents with the proper metadata attached.
- **Scalable and Reliable**: Built on [Kafka Connect’s](https://docs.confluent.io/platform/current/connect/index.html) robust framework, ensuring reliable and scalable data pipelines.
- **Schema-Aware Processing**: Supports Avro, JSON, Protobuf, and other common schema formats to simplify integration with your existing Kafka setup.
- **Optimized for Vector Search**: Automatically converts raw data into vector embeddings, preparing your data for state-of-the-art search and retrieval capabilities in Vectara.

## Use Cases
- **Enterprise Search**: Synchronize unstructured or structured data from Kafka topics to Vectara, enabling high-speed, intelligent search across massive datasets.

## Benefits
This plugin simplifies the ingestion process, ensuring that your data pipelines remain fast, reliable, and optimized for vector-based search and retrieval workflows.
Whether you are building real-time recommendation engines or high-performance search platforms, the **Vectara Kafka Connect Plugin** is your gateway to unlocking the
full potential of vector search with Vectara.

# Getting started with Confluent Cloud

## Add the plugin to Confluent Cloud
1. Download the [Vectara Sink Connector](https://www.confluent.io/hub/vectara/kafka-connect-vectara) from the Confluent Hub.
1. Login to [Confluent Cloud](https://www.confluent.io/confluent-cloud/tryfree/?utm_campaign=tm.pmm_cd.cwc_partner_vectara_tryfree&utm_source=vectara&utm_medium=partnerref)
1. Find the Environment and Cluster you will be working with.
1. Click connectors and then Add Connector
1. Click add plugin. *Custom Plugin Name* = `kafka-connect-vectara-<version>` *Custom Plugin Description* = `Plugin to integrate Confluent Cloud with Vectara` *Connector Class* = `com.vectara.kafka.connect.VectaraUploadDocumentSinkConnector`. Click *Source* for the connector type. Select the archive you downloaded in the first step. Add `api.key` as a sensitive property.

## Launching a connector
1. From the connector plugins select the kafka-connect-vectara plugin that you just uploaded.
1. Configure the Confluent API key by creating one or using an existing one.
1. Configure the networking endpoint. This will be based on your `api.url` setting with the default being `api.vectara.io:443`
1. Configure the connector sizing.
1. Launch the connector.

```json
{
    "connector.class": "com.vectara.kafka.connect.VectaraUploadDocumentSinkConnector",
    "tasks.max": "1",
    "key.converter": "io.confluent.connect.avro.AvroConverter",
    "value.converter": "io.confluent.connect.avro.AvroConverter",
    "api.key": "<Your Vectara API Key>",
    "customer.id": "<Your Vectara Customer ID>",
    "topics": "<Your Confluent Topics>",
    "corpus.id": "<Your Vectara Corpus>",
    "document.metadata.fields": "Id,OwnerUserId",
    "transforms": "Cast",
    "transforms.Cast.spec": "string",
    "transforms.Cast.type": "org.apache.kafka.connect.transforms.Cast$Key"
}
```

This example is consuming data from a topic and converts the key of the message to a string. Kafka-Connect-Vectara uses the key of the topic as the key in the Vectara corpus.

# Sink Connectors


Sink Connector used to import data into the Vectara Vector store utilizing the [upload_file](https://docs.vectara.com/docs/rest-api/upload-file) api call. The connector works by generating a text document based on the supplied incoming records from Kafka. Each of these text documents are uploaded to a document in the specified corpus based on the key of the record. The record of the key must be a string.

Class Name: `com.vectara.kafka.connect.VectaraUploadDocumentSinkConnector`

## Configuration


### Authentication

`api.key`

The API key used to authenticate and establish a secure connection with the Vectara service. This key is a unique identifier issued by Vectara to ensure only authorized clients can access the API.
* Type: PASSWORD
* Importance: HIGH


### Host

`api.url`

Specifies the base URL of the Vectara API endpoint that the connector will use to communicate with the Vectara service. This should be the fully qualified domain name (e.g., https://api.vectara.io) where the API is hosted.
* Type: STRING
* Default: https://api.vectara.io/
* Valid Values: Valid URL
* Importance: HIGH


### Other

`max.requests`

The maximum number of requests to process at once.
* Type: INT
* Default: 8
* Valid Values: [1,...,10]
* Importance: LOW

`callback.executor.pool.size`

The number of threads to use to handle the callbacks from service calls.
* Type: INT
* Default: 10
* Importance: LOW


### Corpus

`corpus.id.location`

Defines how the connector determines the corpus ID to use when storing data in the appropriate corpus within the Vectara service. When set to Config, the corpus ID is retrieved from the corpus.id configuration parameter. When set to Field, the corpus ID is dynamically retrieved from the field name specified in the corpus.field parameter. If the specified field is not found, an exception will be thrown.
* Type: STRING
* Default: Config
* Valid Values: Config, Field
* Importance: HIGH

`corpus.id`

The ID of the corpus to write to.
* Type: STRING
* Default:
* Importance: MEDIUM

`corpus.field`

Specifies the field within the value of the record from which the connector will retrieve the corpus ID when &#x60;corpus.id.location&#x60; is set to Field. This field name indicates where the corpus key is located in the incoming data. If the field is not present in the value, an exception will be thrown to ensure proper configuration and data routing.
* Type: STRING
* Default:
* Importance: MEDIUM


### Document

`document.metadata.fields`

Fields in the value that will be copied to the document metadata.
* Type: LIST
* Default: []
* Importance: HIGH

`document.batch.timeout.seconds`

The number of seconds to wait for each batch to finish.
* Type: LONG
* Default: 60
* Importance: LOW


### Customer

`customer.id`

The unique identifier associated with the customer instance within the Vectara platform. This parameter is used to route requests to the appropriate customer account and ensure data is accessed and managed within the correct context.
* Type: LONG
* Importance: HIGH
        
    
