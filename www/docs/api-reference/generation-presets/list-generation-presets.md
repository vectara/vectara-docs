---
id: list-generation-presets
title: List Generation Presets API Definition
sidebar_label: List Generation Presets API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

Managing a growing collection of prompt templates and generation settings can become overwhelming

The List Generation Presets API lets you view the generation presets used for 
[query](/docs/api-reference/search-apis/search) or [chat](/docs/api-reference/chat-apis/create-chat) requests. Generation presets bundle several properties that  
configure generation for a request. These presets provide more flexibility in 
how generation parameters are configured, enabling more fine-tuned control 
over query responses. This includes the `prompt_template`, the Large Language 
Model (LLM), and other generation settings like `max_tokens` and `temperature`. 
Users specify a generation preset in their query or chat requests using the 
`generation-preset-name` field.

Vectara creates and maintains predefined generation presets for our users. Each 
preset includes a complete Velocity template for the prompt along with other 
generation parameters. Presets are typically associated with specific LLMs, 
though some may be compatible across model families, such as GPT variants.

:::note

The `generation-preset-name` field replaces the `prompt_name` field that was in the 
`generation` object of a `query`. Existing queries using the previous 
`prompt_name` field is now deprecated but still supported for backward 
compatibility. 
work

:::

## List Generation Preset Request and Response

To list generation presets, send a GET request to `/v2/generation_presets` which 
lists the available generation presets for query and chat requests. The 
response is an array of `generation_presets` objects.

## Generation Presets object

The `generation_presets` object contains the `name`, `description`, `llm_name`, 
`prompt_template`, and other fields make up the preset.

If your account has access to a preset, then `enabled` is set to `true`. A preset 
can also be set as a `default`.

```json
{
  "generation_presets": [
    {
      "name": "vectara-summary-ext-v1.2.0",
      "description": "Better than base. Generate a summary with references.",
      "llm_name": "gpt-3.5-turbo",
      "prompt_template": "{\"type\": \"VELOCITY\", \"text\": ...",
      "max_used_search_results": 25,
      "max_tokens": 1024,
      "temperature": 0.7,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "enabled": true,
      "default": true
    },
    {
      "name": "vectara-summary-ext-v1.3.0",
      "description": "Slower but better than vectara-summary-ext-v1.2.x. Generate a summary with references.",
      "llm_name": "gpt-4",
      "prompt_template": "{\"type\": \"VELOCITY\", \"text\": ...",
      "max_used_search_results": 25,
      "max_tokens": 1024,
      "temperature": 0.7,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "enabled": true,
      "default": false
    },
    // ... 
  ],
  "metadata": {}
}
```

## REST 2.0 URL

### List Generation Presets REST Endpoint Address

Vectara exposes a REST endpoint at the following URL to list generation 
presets in the account:

```
https://api.vectara.io/v2/generation_preset
```

The API Reference shows the full [List Generation Presets](/docs/rest-api/list-generation-presets) REST definition.
