---
id: migration-guide-api-v2
title: REST API 1.0 to 2.0 Migration
sidebar_label: Migration Guide from REST API 1.0 to 2.0
---
import {Config} from '@site/docs/definitions.md';

This guide provides information about migrating from the Vectara v1 REST 
API to v2. Tis new version of our REST APIs uses the standard HTTP verbs 
POST, GET, PATCH, and DELETE for CRUD operations. The URL structure is also 
much more object-oriented to the objects that exist in Vectara.

You will need to consider the several changes to the base URL, authentication, 
specific endpoints, as well as changes to requests and responses. Review the 
[API Reference Documentation](/docs/api-reference/rest) which has information about 
each endpoint.

:::note

These changes do not affect gRPC and are specific to the REST 2.0 endpoints.

:::

## Base URL changes

* REST API v1: https://api.vectara.io/v1
* REST API v2: https://api.vectara.io/v2

**Action item:** Update all API requests to use the new base URL for v2. 

## Authentication changes

* API v1 requires the Customer ID header `customer_id` for all endpoints
* API v2 **only** requires the Customer ID header for password authentication endpoints

**Action item:** Remove the `customer_id` header from your API requests, unless 
using password authentication.

## Terminology, parameter, and property name changes

* API v1 uses `num_results` for specifying the maximum number of results
* API v2 uses `limit` for this purpose
* API v1 uses `start` to indicate the offset in query requests
* API v2 uses `offset` for this purpose

**Action items:**

* Replace `num_results` with `limit` in your list endpoint requests
* Replace `start` with `offset` in your query requests

API v2 introduces significant changes to our API endpoints. Review these 
changes carefully and the action items to use the V2 endpoints.

## Indexing endpoint changes

* API v1 has separate endpoints for indexing both structured and core 
  documents (`/v1/index` and `/v1/core/index`).
* API v2 combines both types of document indexing into a single 
  endpoint (`/v2/corpora/{corpus_key}/documents`).

**Action items:** Update your indexing requests to use the new unified endpoint, 
specifying the document `type` in the request body.

## Query endpoint changes

* API v1 supports batch querying (`/v1/query` and `/v1/stream-query`).
* API v2 **does not** support batch querying and uses a single query 
  endpoint (`/v2/query`).
* API v2 introduces a simple single-corpus query endpoint with a GET 
  request (`/v2/corpora/{corpus_key}/query`) for lightweight searches on a specific corpus.
* API v2 also provides an advanced corpus query endpoint with a POST 
  request (`/v2/corpora/{corpus_key}/query`) with more filtering and customization options.
* V2 **does not** have a stream-query endpoint like v1. Instead, set 
  `stream_response` to `true` if you want to stream query responses


**Action items:** 

* Update your query requests to use the new single query endpoint, removing 
  any batch-related parameters.
* Remove any batch-related parameters from your query requests.
* If you require streaming responses, set `stream_response` to `true` in the 
  request body.

## Summarization endpoint changes

* API v1 allows multiple summarization requests within a single query request.
* API v2 supports only a single summarization request per query.
* API v1 requires only the prompt name for summarization requests.
* API v2 requires both the summarizer (model) name and the prompt name.

**Action items:** 

* Modify your query requests to include only one summarization request.
* Modify your summarization requests to include both the model name and prompt name.

## Chat endpoint changes

* API v1 uses `/v1/list-conversations`, `/v1/read-conversations`, `/v1/delete-conversations`, 
  `/v1/delete-turns`, and `/v1/disable-turns` endpoints for managing chats and conversations.
* API v2 introduces `/v2/chats` and the `/v2/chats/{chat_id}/turns` endpoints 
  for listing, creating, retrieving, updating, and deleting chats and turns.

**Action items:** 
* Modify your chat and conversation management configurations to use the new 
  endpoints and request/response structures.

## Corpus management endpoint changes

* To create a corpus, API v1 uses `/v1/create-corpus`, API v2 uses `/v2/corpora`.
* To list corpora, API v1 uses `/v1/list-corpora`, API v2 uses `/v2/corpora`.
* To read corpus data, API v1 uses `/v1/read-corpus`, API v2 
  uses `/v2/corpora/{corpus_key}`.
* To delete a corpus, API v1 uses `/v1/delete-corpus`, API v2 
  uses `/v2/corpora/{corpus_key}`.
* To enable or disable a corpus, API v1 uses `/v1/update-corpus-enablement`, API v2 
  uses `/v2/corpora/{corpus_key}` with the PATCH method.
* To update corpus filters, API v1 uses `/v1/replace-corpus-filter-attrs`, API v2 
  uses `/v2/corpora/{corpus_key}` with the PATCH method.
* To reset a corpus, API v1 uses `/v1/reset-corpus`, API v2 
  uses `/v2/corpora/{corpus_key}/reset`.

**Action items:**

* Update your corpus creation requests to use the `/v2/corpora` endpoint with 
  a POST request.
* Modify your corpus listing requests to use the `/v2/corpora` endpoint with 
  a GET request.
* Update your corpus retrieval requests to use the `/v2/corpora/{corpus_key}` 
  endpoint with a GET request.
* Modify your corpus deletion requests to use the` /v2/corpora/{corpus_key}` 
  endpoint with a DELETE request.
* Update your corpus enablement/disablement and filter update requests to use 
  the `/v2/corpora/{corpus_key}` endpoint with a PATCH request.
* Modify your corpus reset requests to use the `/v2/corpora/{corpus_key}/reset` 
  endpoint with a POST request.


## Document management endpoint changes

* To list documents, API v1 uses /`v1/list-documents`, API v2 
  uses `/v2/corpora/{corpus_key}/documents`.
* To delete documents, API v1 uses `/v1/delete-doc`, API v2 
  uses `/v2/corpora/{corpus_key}/documents/{document_id}`.

**Action items:**

* Update your document listing requests to use the `/v2/corpora/{corpus_key}/documents` endpoint 
  with a GET request.
* Modify your document deletion requests to use the `/v2/corpora/{corpus_key}/documents/{document_id}` endpoint 
  with a DELETE request.

## Job management endpoint changes

* To list jobs, API v1 uses `/v1/list-jobs`, API v2 uses `/v2/jobs`.
* API v2 introduces `/v2/jobs/{job_id}` to retrieve jobs.

**Action items:**

* Update your job listing requests to use the `/v2/jobs` endpoint with a GET request.
* Update your job retrieval requests using the `/v2/jobs/{job_id}` endpoint with a GET request.

## User management endpoint changes

* To create a user, API v1 uses: `/v1/manage-user` with `USER_ACTION_TYPE__ADD`, 
  API v2 uses `/v2/users`.
* To list users, API v1 uses: `/v1/list-users`, API v2 uses `/v2/users`.

**Action items:**

* Modify your list users requests to use the `/v2/users` endpoint with a GET 
  request.
* Update your user creation requests to use the `/v2/users` endpoint with a 
  POST request.
* Implement user retrieval functionality using the `/v2/users/{username}` 
  endpoint with a GET request.
* Update your user update requests to use the `/v2/users/{username}` endpoint 
  with a PATCH request.
* Modify your user deletion requests to use the `/v2/users/{username}` endpoint 
  with a DELETE request.
  
### Retrieve user

* API v1 does not have an equivalent endpoint to get a user.
* API v2 uses `/v2/users/{user_id}`

**Action items:** 

* Implement user retrieval functionality using the new endpoint, providing the `user_id` path parameter.

### Update user

* API v1 has `/v1/manage-user` with various user action types
* API v2 has `/v2/users/{user_id}` with the PATCH method

**Action items:**

* Consolidate your user update requests to use the new endpoint with the 
  PATCH method, updating the request body as needed.
  
### Delete user

* API v1 has `/v1/manage-user` with `USER_ACTION_TYPE__DELETE`
* API v2 has `/v2/users/{user_id}` with the DELETE method

**Action items:**

* Update your user creation requests to use the new endpoint 
  and request body structure.


## API key and App client management endpoint changes

* API v1 uses `/v1/create-api-key`, `/v1/delete-api-key`, `/v1/enable-api-key`, 
  and `/v1/list-api-keys` endpoints for managing API keys.
* API v2 introduces `/v2/api_keys` and `/v2/app_clients` endpoints for creating, 
  retrieving, updating, and deleting API keys and app clients.

**Action items:**

* Update your API key creation requests to use the `/v2/api_keys` endpoint 
  with a POST request.
* Modify your API key listing requests to use the `/v2/api_keys` endpoint with 
  a GET request.
* Implement API key retrieval functionality using the `/v2/api_keys/{api_key_id}` 
  endpoint with a GET request.
* Update your API key update requests to use the `/v2/api_keys/{api_key_id}` 
  endpoint with a PATCH request.
* Modify your API key deletion requests to use the `/v2/api_keys/{api_key_id}` 
  endpoint with a DELETE request.
* Implement app client management functionality using the corresponding 
  `/v2/app_clients` endpoints.

