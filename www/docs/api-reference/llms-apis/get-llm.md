---
id: get-llm
title: Get LLM API Definition
sidebar_label: Get LLM API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Get LLM API allows users to retrieve details about a specific Large 
Language Model (LLM) that has been configured within the Vectara platform. 
This API provides metadata about the LLM, including its name, description, 
model type, API endpoint, and authentication method.

Use this API to verify model configurations, confirm connectivity details, and 
ensure that the correct LLM is being utilized within their workflows.

## Get LLM Request and Response Details

To retrieve details for a specific LLM, send a `GET` request to 
`/v2/llms/{llm_id}`. The request must include the `llm_id` parameter in the URL 
path to specify which LLM to retrieve.

The response returns details about the requested LLM.

### Authentication methods

The request requires authentication details, and you can provide them either 
as a Bearer token or custom header-based authentication.

### Error Responses

* **403 Forbidden** – The user does not have permission to retrieve details for the specified LLM.
* **404 Not Found** – The LLM ID does not exist or is not accessible.

## REST 2.0 URL

### Get LLM Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL to 
retrieve details about a created Large Language Model (LLM):
<code>https://<Config v="domains.rest.indexing"/>/v2/llms/:llm_id</code>
