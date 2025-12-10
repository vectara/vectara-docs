---
id: corpus
title: Corpora
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

This guide covers the Vectara Python SDK for managing corpora, which are 
containers for storing documents and metadata in the Vectara platform. These 
methods support administrative tasks like creating, listing, updating, and 
deleting corpora, enabling you to organize data for search and Retrieval 
Augmented Generation (RAG) operations. This guide focuses on corpus management, 
not direct search or generation. For querying corpora (including RAG), see the 
`corpora.search` method in the [Query APIs](/docs/rest-api/queries).

:::info Prerequisites
This guide assumes you have a corpus called `my-docs`. If you haven't created a corpus yet, follow 
the [Quick Start](/docs/sdk/python/python-quickstart) guide to set up your first corpus.
:::

## Create a corpus

<CodePanel
  title="Create a corpus"
  snippets={[
    {
      language: 'python',
      code: `corpus = client.corpora.create(
    key="my-docs",
    name="My Documentation", 
    description="Contains documents for my project or organization",
    filter_attributes=[
        {
            "name": "department",
            "level": "document",
            "type": "text",
            "indexed": True
        },
        {
            "name": "year", 
            "level": "document",
            "type": "integer",
            "indexed": True
        },
        {
            "name": "doc_type",
            "level": "document",
            "type": "text",
            "indexed": True
        },
        {
            "name": "category",
            "level": "document", 
            "type": "text",
            "indexed": True
        }
    ]
)`
    }
  ]}
  annotations={{
    python: [
      { line: 2, text: "Corpus key must be unique in your account" },
      { line: 3, text: "Give your corpus a descriptive name" },
      { line: 5, text: "Define filter attributes for metadata queries" },
      { line: 8, text: "Document-level filter for department metadata" },
      { line: 14, text: "Integer filter for year-based filtering" },
      { line: 20, text: "Text filter for document type classification" }
    ]
  }}
  customWidth="50%"
/>

Set up a new corpus to serve as a centralized container for your organization's 
documents and metadata, enabling efficient search and RAG operations.

This section guides you through creating a corpus with a unique identifier and 
filter attributes, making it a foundational step for managing enterprise data.

The `corpora.create` method corresponds to the HTTP POST `/v2/corpora` endpoint. 
For more details on request and response parameters, see the 
[Create Corpus REST API](https://docs.vectara.com/docs/rest-api/create-corpus).

- `key` (string, required): Unique identifier for the corpus, such as "my-docs". Must follow 
  naming conventions (alphanumeric, underscores, hyphens).
- `name` (string, optional): Human-readable name ("My Documentation"). Defaults to key value.
- `description` (string, optional): Optional description of the corpus's purpose ("Contains 
  project documentation").
- `filter_attributes` (list, optional): List of metadata attributes for filtering queries.
  - `name`: Unique attribute name (max 64 characters)
  - `level`: "document" (document-level) or "part" (section-level)
  - `type`: "integer", "real", "text", or "boolean"
  - `indexed`: Performance optimization flag

Use descriptive `key` values to simplify querying. Filter attributes enable metadata-based 
search refinement. This method sets up the corpus structure but doesn't index documents.

:::warning Important
Filter attributes must be defined at corpus creation time and cannot be 
modified later. Plan your metadata schema carefully.
:::

**Error Handling**:
- **400 Bad Request**: Invalid `key` or request body.
- **403 Forbidden**: Insufficient permissions.
- **409 Conflict**: Corpus with the same `key` already exists.

---

## List corpora

<CodePanel
  title="List corpora"
  snippets={[
    {
      language: 'python',
      code: `corpora_list = client.corpora.list(limit=10)
for corpus in corpora_list:
    print(f"Corpus: {corpus.name} (Key: {corpus.key})")`
    }
  ]}
  annotations={{
    python: [
      { line: 1, text: "Limit results per page for better performance" },
    ]
  }}
  customWidth="50%"
/>

Efficiently manage your account's corpora by retrieving a paginated list. This section helps you 
oversee multiple corpora, ensuring you can monitor and maintain your enterprise 
data infrastructure.

The `corpora.list` method corresponds to the HTTP GET `/v2/corpora` endpoint. For 
more details on request and response parameters, see the [List Corpora REST API](https://docs.vectara.com/docs/rest-api/list-corpora).

- `limit` (integer, optional): Maximum number of corpora to return per page (default: 10).
- `page_key` (string, optional): Token for pagination, returned in previous responses.

The method returns a paginated iterator that you can loop through directly. Use the iterator 
pattern to handle large numbers of corpora efficiently.

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.

---

## Retrieve a corpus

<CodePanel
  title="Retrieve a corpus"
  snippets={[
    {
      language: 'python',
      code: `corpus = client.corpora.get(corpus_key="my-docs")
print(f"Corpus Name: {corpus.name}")
print(f"Description: {corpus.description}")
print(f"Filter Attributes: {len(corpus.filter_attributes)} defined")`
    }
  ]}
  annotations={{
    python: [
      { line: 1, text: "Get detailed metadata for a specific corpus" },
      { line: 4, text: "Access filter attributes and other configuration" }
    ]
  }}
  customWidth="50%"
/>

Access detailed metadata for a specific corpus to gain insights into its 
configuration and usage. This section supports administrative tasks like 
auditing or verifying corpus settings, critical for enterprise data 
governance.

The `corpora.get` method corresponds to the HTTP GET `/v2/corpora/{corpus_key}` 
endpoint. For more details on request and response parameters, see the 
[Get Corpus REST API](https://docs.vectara.com/docs/rest-api/get-corpus).

- `corpus_key` (string, required): Unique identifier of the corpus 
  ("my-docs").

Returns a corpus object with complete metadata, including `id`, `name`, `description`, 
`filter_attributes`, and usage statistics.

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
- **404 Not Found**: Corpus doesn't exist.

---

## Update a corpus

<CodePanel
  title="Update a corpus"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.update(
    corpus_key="my-docs",
    name="My Documentation - Updated",
    description="Updated description with enhanced metadata",
    enabled=True
)`
    }
  ]}
  annotations={{
    python: [
      { line: 3, text: "Update corpus properties" },
      { line: 5, text: "Enable or disable corpus access" }
    ]
  }}
  customWidth="50%"
/>

Modify an existing corpus's properties, such as its name or status, to adapt 
to changing business requirements. This section supports maintenance tasks 
like archiving or enabling/disabling corpora for operational flexibility.

The `corpora.update` method corresponds to the HTTP PATCH `/v2/corpora/{corpus_key}` 
endpoint. For more details on request and response parameters, see the 
[Update Corpus REST API](https://docs.vectara.com/docs/rest-api/update-corpus).

- `corpus_key` (string, required): Unique identifier of the corpus.
- `name` (string, optional): New name for the corpus.
- `description` (string, optional): New description.
- `enabled` (boolean, optional): Enable/disable the corpus for queries.

**Note:** Filter attributes cannot be modified after corpus creation. Only name, description, and enabled status can be updated.

Disabling a corpus (`enabled=False`) prevents new indexing but allows read-only queries. 
This is useful for archiving or maintenance scenarios.

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
- **404 Not Found**: Corpus doesn't exist.

---

## Delete a corpus

<CodePanel
  title="Delete a corpus"
  snippets={[
    {
      language: 'python',
      code: `client.corpora.delete(corpus_key="my-docs")`
    }
  ]}
  annotations={{
    python: [
      { line: 1, text: "Permanently delete the corpus and all its data" }
    ]
  }}
  customWidth="50%"
/>

Permanently remove a corpus and its data to manage storage and lifecycle 
effectively. This section is essential for enterprise data cleanup and 
compliance with retention policies.

The `corpora.delete` method corresponds to the HTTP DELETE 
`/v2/corpora/{corpus_key}` endpoint. For more details on request and response 
parameters, see the [Delete Corpus REST API](https://docs.vectara.com/docs/rest-api/delete-corpus).

- `corpus_key` (string, required): Unique identifier of the corpus.

**Error Handling**:
- **403 Forbidden**: Insufficient permissions.
- **404 Not Found**: Corpus doesn't exist.

:::caution
Deletion is irreversible. Ensure you have backups or consider using the `enabled=False` 
update option to disable rather than delete.
:::

---

## Differences from generation and query tasks

- **Generation tasks**: Corpus management methods are administrative and do not 
  directly support generation. For RAG or chat-based generation, use 
  `client.query()` with generation parameters.
- **Query vs. prompt confusion**: Vectara uses a retrieval-centric model with 
  natural-language queries, not prompt-based interactions like many GenAI 
  platforms. For prompt-like behavior, configure generation parameters in 
  query methods.

## Next steps

- Explore document indexing with `client.documents.create()` using the [Documents guide](/docs/sdk/python/documents).
- Learn about querying with `client.query()` for search and RAG using the [Query guide](/docs/sdk/python/query).
- Learn about metadata filtering with the [Metadata guide](/docs/sdk/python/metadata).
- Experiment with the [Vectara Console](https://console.vectara.com) 
  to test endpoints before coding.
