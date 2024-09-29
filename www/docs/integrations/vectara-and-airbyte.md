---
id: vectara-and-airbyte
title: Vectara and Airbyte
sidebar_label: Vectara and Airbyte
---

import {Config} from '@site/docs/definitions.md';

Vectara is now a destination connector in Airbyte. Using Airbyte’s support for 
350+ source connectors to various data sources, you can now quickly and easily 
build a data movement and ingestion pipeline by connecting any source 
connector to the Vectara destination connector. The result is a robust and 
efficient data ingestion pipeline that can be deployed in your own environment 
with the open source version of Airbyte or using Airbyte cloud.

A different way to use Airbyte with vectara is via the PyAirbyte package, 
whereby you can write code in Python to read data (using Airbyte) from any 
data source, perform any number of transformation to the data in the Python 
environment, and then ingest it directly to Vectara using Vectara’s API. This 
added flexibility to transform data is what makes PyAirbyte attractive for 
some use-cases where this capability for data transformation is required.

This [example notebook](https://github.com/vectara/example-notebooks/blob/main/notebooks/pyairbyte-demo.ipynb) demonstrates how to use PyAirbyte with Vectara.
