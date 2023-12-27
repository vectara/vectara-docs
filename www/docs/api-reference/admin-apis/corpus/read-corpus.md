---
id: read-corpus
title: Read Corpus API Definition
sidebar_label: Read Corpus API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Read Corpus endpoint lets you view detailed information about corpora 
within your account. It enables you to view different aspects about the corpus 
including basic information like the ID, name, whether it is enabled or 
disabled, and other metadata. You can also view the corpus size, associated 
API keys, custom dimensions, and filter attributes.

This capability helps you monitor the size of your corpora for optimizing 
search and storage utilization. You can also use it to understand the access 
control and how the corpus is configured for queries.

:::tip

Check out our interactive API Playground that lets you experiment with this 
REST endpoint to manage your corpus details.

:::

## Read Corpus Request and Response

The request to read corpus data requires the following parameters:

* Customer ID
* Corpus ID

## REST Example

### Read Corpus REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to ingest content into a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/read-corpus</code>

...tbd