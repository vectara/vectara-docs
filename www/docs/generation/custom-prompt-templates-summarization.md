---
id: custom-prompt-templates-customization
title: Summarize Tables with Custom Prompts
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


Vectara supports table summarization using LLMs during document upload. This 
lets you define [custom prompt templates](/docs/prompts/vectara-prompt-engine) that control how the 
LLM interprets and summarizes table data during extraction. By customizing the 
`prompt_template`, you can tailor summaries for domain-specific language, 
analytical perspectives, or formatting preferences.

The summarization engine supports OpenAI-compatible models (for example, 
`gpt-4o`) and is configured through the `table_extraction_config` parameter. 
This configuration also lets you specify model parameters like temperature and 
token limits.

Prompt templates use Apache Velocity syntax and have access to structured 
table data via these built-in variables:

* `$vectaraTable`: The root object representing the extracted table.
* `$vectaraTable.title()`: The title of the table.
* `$vectaraTable.description()`: A description or summary of the table data.
* `$vectaraTable.json()`: The table contents as a JSON object.
* `$vectaraTable.markdown()`: The table contents in Markdown format.

Leverage `$vectaraTable.markdown()` for LLM-friendly formatting and 
`$vectaraTable.json()` if you want precise structured access to table contents. 
You can define role-based prompt structures (`system` and `user` roles) in JSON 
format to match OpenAI-style chat templates.

### Enable table extraction and custom summarization

To enable table extraction and custom summarization, pass the 
`table_extraction_config` in the multipart form data of your upload request.

<CodePanel snippets={[{language: "json", code: `{
   "extract_tables": true,
   "extractor": {
     "name": "gmft"
   },
   "generation": {
     "llm_name": "gpt-4o-mini",
     "prompt_template": "Adopt the perspective of a data analyst and summarize the table below:\\n\\n\$vectaraTable.markdown()",
     "model_parameters": {
       "temperature": 0.7,
       "max_tokens": 1024
     }
   }
}`
}]} title="`table_extraction_config Example" layout="stacked" />

* The `gmft` extractor extracts table data.
* The `gpt-4o-mini` model is used for summarization.
* The `prompt_template` uses Velocity to refer to the table in markdown format.
* The `model_parameters` customize the generation behavior (creativity and 
  response length).
  

## Example curl request

You can either pass the configuration inline or via a JSON file. Inline JSON is 
a cleaner option for single-use or dynamic configs. Using a config file for 
`table_extraction_config` can be helpful if you plan to 
upload multiple files using the same config. You must include the 
`type=application/json` suffix when setting the `-F` parameter—otherwise, the 
content may not parse correctly.

### Inline JSON example

Inline JSON is a cleaner option for single-use or dynamic configs.

<CodePanel snippets={[{language: "bash", code: `curl -i -L -X POST 'https://api.vectara.io/v2/corpora/<corpus_id>/upload_file' \\
-H 'Content-Type: multipart/form-data' \\
-H 'Accept: application/json' \\
-H "x-api-key: <your-api-key>" \\
-F 'file=@"/path/to/document.pdf"' \\
-F 'table_extraction_config={"extract_tables":true,"extractor":{"name":"gmft"}};type=application/json'`
}]} title="Inline JSON Example" layout="stacked" />

### Using a config file

<CodePanel snippets={[{language: "bash", code: `curl -i -L -X POST 'https://api.vectara.io/v2/corpora/<corpus_id>/upload_file' \\
-H 'Content-Type: multipart/form-data' \\
-H 'Accept: application/json' \\
-H "x-api-key: <your-api-key>" \\
-F 'file=@"/path/to/document.pdf"' \\
-F 'table_extraction_config=@"/path/to/config-extractor.json";type=application/json'`
}]} title="Config File Example" layout="stacked" />

Where `config-extractor.json` contains:

<CodePanel snippets={[{language: "json", code: `{
   "extract_tables": true,
   "extractor": {
     "name": "gmft"
   }
}`
}]} title="config-extractor.json Example" layout="stacked" />
