---
id: update-corpus-enablement
title: Update Corpus Enablement API Definition
sidebar_label: Update Corpus Enablement API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';


The Update Corpus Enablement endpoint lets you enable or disable a corpus. 
This is useful to manage the availability of data within the system, such as 
when you need to take the corpus offline without having to delete the corpus. 

This capability can help you utilize automated scripts to programatically 
control the availability of corpora based on certain conditions. For example, 
quickly disable a corpus for maintenance updates or in response to security 
incidents. 

:::tip

Check out our interactive API Playground that lets you experiment with this 
REST endpoint to enable or disable corpora.

:::

## Update Corpus Enablement Request and Response

The request to enable or disable a corpus requires the following parameters:

* Customer ID
* Corpus ID


## REST Example

### Update Corpus Enablement REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to update the status of a corpus:
<code>https://<Config v="domains.rest.admin"/>/v1/update-corpus-enablement</code>

### Update Corpus Enablement Request Example

```json
{
  "corpusId": "15",
  "enable": true
}
```

### Update Corpus Enablement Response Example

```json
{
  "status": {
    "code": "OK",
    "statusDetail": "string",
  }
}
```