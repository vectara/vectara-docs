---
id: data-ingestion
title: Data Ingestion
sidebar_label: Data Ingestion
---

import {Config} from '@site/docs/definitions.md';

Vectara offers multiple data ingestion methods to accommodate different types 
of use cases. By choosing the appropriate ingestion method, users can 
efficiently index their data and leverage our advanced search capabilities.

## Vectara Ingest: Sample Data Ingestion Framework

Getting data into Vectara is simple using either our REST or gRPC APIs. We 
built a full sample ingestion framework ready to go with [Vectara Ingest](https://github.com/vectara/vectara-ingest), which 
includes preconfigured templates that enable you to pull data from many 
popular data sources such as websites and RSS feeds.

## Getting Started with Examples

View our [getting started](https://github.com/vectara/getting-started) examples of how to use our APIs 
in several common programming languages such as JavaScript and Python.


## Standard Indexing API

We recommend the [Standard Indexing](/docs/api-reference/indexing-apis/indexing) method for indexing a set of 
related documents or content into a corpus.

You can also experiment with this REST endpoint in our interactive [API Playground](/docs/rest-api/index).


## File Upload API

The [File Upload](/docs/api-reference/indexing-apis/file-upload/file-upload) method exposes an HTTP endpoint to upload and index 
files into a corpus. We recommend this option when you do not need to define 
additional user-supplied metadata beyond what is extracted by the Vectara 
platform.

Our [interactive API Playground](/docs/rest-api/file-upload) enables you
to experiment with this File Upload REST endpoint.

## Attach Metadata with JSON

You can [format your data as JSON](/docs/api-reference/indexing-apis/file-upload/format-for-upload), which enables you to attach metadata for 
optimizing searches made against your data. 
