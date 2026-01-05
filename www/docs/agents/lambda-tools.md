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
   <img
    src="/img/agents/lambda-tools.png"
    alt="Create lambda tool"
    style={{ width: '800px', maxWidth: '100%', height: 'auto' }}
    />
4. Add the following:
     * **Name** as `Lambda Tool` 
     * **Title** as `My function`
     * **Description** as 
   `Calculate a customer score based on order history and max revenue. Returns a score between 0-100, formatted as a percentage.`
5. Add this function to the **Code** field:  
   ```python
   from typing import List, Dict

   def process(orders: List[Dict[str, float]], 
              max_revenue: float = 5000.0) -> str:
      """
      Calculate a customer score based on order history and revenue.
      For example, { "orders": [{"amount": 1500.0}, {"amount": 2000.0}] }
      will return output of { "value": "35%" }
      """

      if not orders:
          return 0

      # Find average order amount and convert to percentage of max revenue.
      order_count = len(orders)
      total_revenue = sum(order.get("amount", 0.0) for order in orders)
      average_order_amount = total_revenue / order_count
      customer_score = average_order_amount / max_revenue * 100

      return f"{int(customer_score)}%"
   ```
   <img
    src="/img/agents/create-lambda-tools.png"
    alt="Create lambda tool"
    style={{ width: '700px', maxWidth: '100%', height: 'auto' }}
    />
6.  Before you create this tool, you can click **Test function** and **Run test** to verify that 
  it works.  
  <img
    src="/img/agents/run-test.png"
    alt="Create lambda tool"
    style={{ width: '600px', maxWidth: '100%', height: 'auto' }}
    />
1. After verifying that the tool executes successfully, click **Create lambda tool**.

To learn about creating this tool and using it with the API, see 
[Create a lambda tool](/docs/agents/create-a-lambda-tool).
