---
id: list-generation-presets
title: List Generation Presets API Definition
sidebar_label: List Generation Presets
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';
import CodePanel from '@site/src/theme/CodePanel';

Organizations often struggle to fine-tune query responses and maintain 
consistency across different use cases. Vectara creates and maintains 
predefined generation presets for our users which provides a flexible and 
powerful way to utilize generation parameters. Each preset includes a 
complete Velocity template for the prompt along with other generation 
parameters. Presets are typically associated with a single LLM.

The List Generation Presets API lets you view the generation presets used for 
[query](/docs/rest-api/queries) requests. Generation presets group 
several properties that configure generation for a request. These presets 
provide more flexibility in how generation parameters are configured, enabling 
more fine-tuned control over query responses. This includes the `prompt_template`, 
the Large Language Model (LLM), and other generation settings like `max_tokens` 
and `temperature`. Users specify a generation preset in their query or chat 
requests using the `generation_preset_name` field.

:::note

The `generation_preset_name` field replaces the `prompt_name` field that was in the 
`generation` object of a `query`. Existing queries using the previous 
`prompt_name` field is now deprecated but still supported for backward 
compatibility. 

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

### Example generation presets response

<CodePanel snippets={[{language: "json", code: `{
  "generation_presets": [
    {
      "name": "vectara-summary-ext-24-05-med-omni",
      "description": "Generate summary with controllable citations, Uses GPT-4o with 2,048 max tokens",
      "llm_name": "gpt-4o",
      "prompt_template": "[\n    {\"role\": \"system\", \"content\": \"Follow these detailed step-by-step",
      "max_used_search_results": 25,
      "max_tokens": 2048,
      "temperature": 0,
      "frequency_penalty": 0,
      "presence_penalty": 0,
      "enabled": true,
      "default": false
    },
    // More presets appear here
}`
}]} title="Metadata Example" layout="stacked" />

## REST 2.0 URL

### List Generation Presets REST Endpoint Address

Vectara exposes a REST endpoint at the following URL to list generation 
presets in the account:

```
https://api.vectara.io/v2/generation_preset
```

The API Reference shows the full [List Generation Presets](/docs/rest-api/list-generation-presets) REST definition.
