---
id: delete-llm
title: Delete LLM API Definition
sidebar_label: Delete LLM API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Delete LLM API allows users to remove a previously configured custom Large 
Language Model (LLM) from their Vectara account. This functionality is 
essential for managing active LLM configurations and ensuring that only 
relevant models are available for use. Built-in LLMs cannot be deleted, 
ensuring that core system models remain accessible.

By providing an LLM identifier, users can permanently delete a model 
configuration, freeing up resources and maintaining an organized list of 
available LLMs.

## Delete LLM Request and Response Details

To delete a custom LLM, send a `DELETE` request to `/v2/llms/{llm_id}`. The 
request must include the `llm_id` parameter in the URL path to specify which 
LLM to delete.

If successful, the API responds with `HTTP 204 No Content` status, confirming 
the LLM deletion.

## Error responses
* **403 Forbidden** – The user does not have permission to delete the specified LLM.
* **404 Not Found** – The LLM ID does not exist or has already been deleted.

## REST 2.0 URL

### Delete LLM Endpoint Address

<Config v="names.product"/> exposes an HTTP endpoint at the following URL to 
deleted a created Large Language Model (LLM):
<code>https://<Config v="domains.rest.indexing"/>/v2/llms/:llm_id</code>
