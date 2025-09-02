---
id: tools
title: Tool
sidebar_label: Tool
---

import CodePanel from '@site/src/theme/CodePanel';

Tools represent external or internal capabilities that agents can invoke 
dynamically. They are defined by:

* A unique ID (`tol_abcd`)and name.
* A description of their function
* An input schema describing accepted parameters (in JSON Schema format)
* Metadata for categorization
* Runtime availability (enabled/disabled)

## Available tools

The tech preview of Vectara Agents provides the following tools:
* **corpora_search:** Retrieves results from a Vectara corpus or corpora using Retrieval 
  Augmented Generation (RAG). This tool provides summary and relevant search results using 
  the same default parameters as the Multiple Corpora Query.
* **web_search:** Retrieves results from the public web.


## Tool configurations

Tool configurations are reusable settings for tools. They enable you to define 
argument bindings and other settings for a tool once, and then reuse that 
configuration across multiple agents. This simplifies agent creation and 
management.

There are two types of tool configurations:
* **ReferenceToolConfiguration:** A tool configuration specified by reference to an 
  existing tool configuration.
* **InlineToolConfiguration:** A tool configuration defined inline in the agent.

## Tool permissions and security

Tools follow the same permission model as the rest of Vectara:

1. **API keys**: Tools can only access corpora if the API key has access to the 
   corpora.
2. **Metadata filtering**: Additional security through metadata filters
3. **Result limiting**: Control how much data tools can retrieve
