---
id: vectara-and-confluent
title: Vectara Kafka Connect Plugin
sidebar_label: Vectara and Confluent
---

import {Config} from '@site/docs/definitions.md';

The **Vectara Kafka Connect Plugin** seamlessly integrates [Confluent Cloud](https://confluent.cloud/) 
with the Vectara Vector Store. This plugin enables real-time processing of 
data, enabling you to efficiently move data streams from Confluent directly 
into Vectara's high-performance vector database.

This plugin simplifies the ingestion process, ensuring that your data 
pipelines remain fast, reliable, and optimized for vector-based search and 
retrieval workflows. Whether you are building real-time recommendation engines 
or high-performance search platforms, the **Vectara Kafka Connect Plugin** is your 
gateway to unlocking the full potential of vector search with Vectara.

## Integration benefits
- **Real-time data ingestion**: Automatically ingest and index data streams into 
  Vectara for real-time search and retrieval.
- **Customizable metadata extraction**: Configure the connector to look at fields 
  in the data to import documents with the proper metadata attached.
- **Scalable and reliable**: Built on [Kafka Connect’s](https://docs.confluent.io/platform/current/connect/index.html) robust framework, 
  ensuring reliable and scalable data pipelines.
- **Schema-aware processing**: Supports Avro, JSON, Protobuf, and other common schema 
  formats to simplify integration with your existing Kafka setup.
- **Optimized for vector search**: Automatically converts raw data into vector 
  embeddings, preparing your data for state-of-the-art search and retrieval capabilities in Vectara.

## Use cases
- **Enterprise search**: Synchronize unstructured or structured data from Kafka 
  topics to Vectara, enabling high-speed, intelligent search across massive 
  datasets.

## Getting started with Confluent Cloud

To get started with Confluent Cloud, you add the Vectara plugin and launch the 
connector.

### Add the plugin to Confluent Cloud
1. Download the [Vectara Sink Connector](https://www.confluent.io/hub/vectara/kafka-connect-vectara) from the Confluent Hub.
2. Login to [Confluent Cloud](https://www.confluent.io/confluent-cloud/tryfree/?utm_campaign=tm.pmm_cd.cwc_partner_vectara_tryfree&utm_source=vectara&utm_medium=partnerref).
3. Navigate to your Environment and Cluster.
4. Click **Connector**, **Add Connector**.
5. Click **Add Plugin** and enter the following values: 
   - **Custom Plugin Name** = `kafka-connect-vectara-<version>`
   - **Custom Plugin Description** = `Plugin to integrate Confluent Cloud with Vectara`
   - **Connector Class** = `com.vectara.kafka.connect.VectaraUploadDocumentSinkConnector`. 
   - Select **Source** as the connector type.
   - Select the archive you downloaded in the first step.
   - Add `api.key` as a sensitive property.

### Launching a connector
1. From Connector Plugins, select the `kafka-connect-vectara` plugin that 
   you just uploaded.
2. Configure the **Confluent API key** (create a new one or use an existing key).
3. Configure the networking endpoint, which is based on your `api.url` setting 
   with `api.vectara.io:443` by default.
4. Configure the connector sizing.
5. Launch the connector.

### Example configuration

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

This example consumes data from a topic and converts the key of the message 
to a string. Kafka-Connect-Vectara uses the key of the topic as the key in the 
Vectara corpus.

## Sink connector

The Sink Connector imports data into the Vectara Vector store through the 
[Upload File](https://docs.vectara.com/docs/rest-api/upload-file) API. The connector generates a 
text document based on the supplied incoming records from Kafka. Each of these 
text documents are uploaded to a document in the specified corpus based on the 
key of the record. The record of the key must be a string.

Class Name: `com.vectara.kafka.connect.VectaraUploadDocumentSinkConnector`

## Sink connector configuration

### Authentication

`api.key`: The API key for authenticating with Vectara. This key is a unique 
identifier issued by Vectara to ensure only authorized clients can access the 
API.
* **Type:** PASSWORD
* **Importance:** HIGH

### Host

`api.url`: The base URL of the Vectara API endpoint that the 
connector uses to communicate with the Vectara service. This should be the 
fully qualified domain name (`https://api.vectara.io`) where the API is 
hosted.
* **Type:** STRING
* **Default:** https://api.vectara.io/
* **Valid Values:** Valid URL
* **Importance:** HIGH

### Performance settings

`max.requests`: The maximum number of requests to process at once.
* **Type:** INT
* **Default:** 8
* **Valid Values:** [1,...,10]
* **Importance:** LOW

`callback.executor.pool.size`: The number of threads to use to handle the 
callbacks from service calls.
* **Type:** INT
* **Default:** 10
* **Importance:** LOW

### Corpus settings

`corpus.id.location`: Defines how the connector determines the corpus ID to use 
when storing data in the appropriate corpus within the Vectara service. When 
set to Config, the corpus ID is retrieved from the `corpus.id` configuration 
parameter. When set to Field, the corpus ID is dynamically retrieved from the 
field name specified in the `corpus.field` parameter. If the specified field is 
not found, an exception is thrown.
* **Type:** STRING
* **Default:** Config
* **Valid Values:** Config, Field
* **Importance:** HIGH

`corpus.id`: The ID of the corpus where data is stored.
* **Type:** STRING
* **Default:**
* **Importance:** MEDIUM

`corpus.field`: Specifies the field within the value of the record from which 
the connector retrieves the corpus ID when `corpus.id.location` is set to 
Field. This field name indicates where the corpus key is located in the 
incoming data. If the field is not present in the value, an exception is 
thrown to ensure proper configuration and data routing.
* **Type:** STRING
* **Default:**
* **Importance:** MEDIUM

### Document settings

`document.metadata.fields`: Fields in the value that are copied to the document 
metadata.
* **Type:** LIST
* **Default:** []
* Importance: HIGH

`document.batch.timeout.seconds`: The number of seconds to wait for each batch 
to finish.
* **Type:** LONG
* **Default:** 60
* **Importance:** LOW

### Customer settings

`customer.id`: The unique identifier associated with the customer instance 
within the Vectara platform. This parameter is used to route requests to the 
appropriate customer account and ensure data is accessed and managed within the 
correct context.
* **Type:** LONG
* **Importance:** HIGH
        
