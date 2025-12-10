---
id: lambda-tools
title: Lambda tools
sidebar_label: Lambda tools
---

import CodePanel from '@site/src/theme/CodePanel';

As your AI agents take on more complex workflows, they might need to perform
actions that go beyond what built-in tools can handle. For example, applying
custom business logic or transforming data.

Lambda Tools enable you to create your own tools that your agents can
run during conversations. Think of them as custom skills that teach your agent
how to handle specialized tasks. These user-defined functions run in secure,
sandboxed environments, allowing you to extend agent capabilities with custom
business logic, data processing, or integrations. Check out our tutorial on 
[building a financial research agent](/docs/tutorials/build-a-financial-research-agent).

Lambda Tools are user-defined functions that:

- Execute in a **sandboxed Python 3.12 environment** with gVisor isolation.
- Have **automatic schema discovery** from function type annotations.
- Support a **curated set of libraries**: `json`, `math`, `datetime`, `collections`,
  `itertools`, `functools`, `re`, `time`, `typing`.
- Include **resource limits**: 100MB memory (up to 1GB), 30-second timeout
  (up to 300 seconds).
- Provide **complete audit trails** of execution history.

:::tip Note
Lambda Tools run **without** network access. You have secure sandboxed environment, and
you **cannot** install custom packages. This ensures secure execution in multi-tenant
environments.
:::

## Create a lambda tool (UI)

In this example, we'll create a simple Python function that does the following:
* Takes one string parameter called `name`.
* Creates and returns a dictionary with a single key "result".
* The value associated with that key is a greeting string `"Hello, " + name + "!"`

1. Navigate to **Agents** in the [Vectara Console](https://console.vectara.com/console/agents/).
2. Select the **Lambda tools** tab.
3. Click **Create lambda tool**.  
   ![Lanbda tools](/img/lambda-tools.png)
4. Add a **Name** `Lambda Tool`, **Title** `My function` and **Description** `A simple Python function.`
5. Add this function to the **Code** field:  
   ```python
   def process(name: str):
    return {"result": "Hello, " + name + "!"}
   ```
   ![Lambda tool](/img/create-lambda-tool.png)
6.  Before you create this tool, you can click **Test function** to verify that 
  it works.  
  ![Lambda tool 2](/img/test-lambda-function.png)
7.  If the tool works successfully, click **Create lambda tool**.

To learn about creating this tool and using it with the API, see 
[Create a lambda tool](/docs/agents/create-a-lambda-tool).
