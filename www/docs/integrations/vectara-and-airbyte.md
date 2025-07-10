---
id: vectara-and-airbyte
title: Vectara and Airbyte
sidebar_label: Vectara and Airbyte
---


import CodePanel from '@site/src/theme/CodePanel';


Vectara now functions as a [destination connector in Airbyte](https://docs.airbyte.com/integrations/destinations/vectara). Leveraging Airbyte’s support for 
400+ source connectors to various data sources, you can now quickly and easily 
build a data movement and ingestion pipeline by connecting any source 
connector to the Vectara destination connector. This integration results in a 
robust and efficient data ingestion pipeline, deployable in your own 
environment with the open-source version of Airbyte or using Airbyte cloud.

An alternative method for utilizing Airbyte with Vectara is through the 
[PyAirbyte package](https://vectara.com/blog/ingesting-data-into-vectara-using-pyairbyte/). This approach allows developers to write Python code to 
read data from any source using Airbyte, perform multiple transformations 
within the Python environment, and then directly ingest the data into Vectara 
using its API. This added flexibility to transform data is what makes 
PyAirbyte attractive for some use-cases where this capability for data 
transformation is required.

## Integration benefits

* Enables quick and easy building of data movement and ingestion pipelines
* Supports both open-source Airbyte and Airbyte cloud deployments
* Offers flexibility for data transformation using PyAirbyte package

This [example notebook](https://github.com/vectara/example-notebooks/blob/main/notebooks/pyairbyte-demo.ipynb) demonstrates how to use PyAirbyte with Vectara.
