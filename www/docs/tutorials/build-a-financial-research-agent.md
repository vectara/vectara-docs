---
id: build-a-financial-research-agent
title: Build a Financial Research Agent
sidebar_label: Build a financial research agent
---

import CodePanel from '@site/src/theme/CodePanel';

This tutorial demonstrates how to create custom Lambda Tools with different
return types and use them with AI agents. You'll build a Financial Research
Assistant that performs calculations, looks up stock tickers, assesses
portfolio risk, and analyzes holdings. 

## What you will learn

By the end of this tutorial, you'll know how to:

- ✅ Create Lambda tools with custom Python code.
- ✅ Work with different return types (float, string, boolean,
  dictionary).
- ✅ Use automatic schema discovery from type annotations.
- ✅ Test tools independently before deployment.
- ✅ Configure agents with multiple tools.
- ✅ Update existing tools with new functionality.
- ✅ Use tools in conversational AI workflows.

## What are Lambda Tools?

Lambda tools are user-defined Python 3.12 functions that run in a secure,
sandboxed environment:

- Execute your custom code in an isolated container.
- Support standard Python modules: `json`, `math`, `datetime`,
  `collections`, `itertools`, `functools`, `re`, `time`, `typing`.
- Have resource limits (default: 100MB memory, 30s timeout).
- Automatically generate input/output schemas from type annotations.

## Part 1. Setup and configuration

Before you begin, ensure you have:

- A Vectara account ([sign up here](https://console.vectara.com))
- An API key with tool creation permissions
- Familiarity with REST APIs

Then, set up your environment and configure API access:

<CodePanel
  title="Install Dependencies"
  layout="stacked"
  snippets={[
    {
      language: "bash",
      code: `pip install requests`
    }
  ]}
/>

<CodePanel
  title="Configure API Access"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `import requests
import json
import time
import inspect
import textwrap
from typing import Dict, Any
from getpass import getpass

# Vectara API Configuration
print("🔑 Please enter your Vectara API key")
print("   (Get your API key from: https://console.vectara.com/console/apiAccess)")
API_KEY = getpass("API Key: ")

if not API_KEY or not API_KEY.strip():
    raise ValueError("❌ API key is required to continue. Please run this cell again and provide your API key.")

BASE_URL = "https://api.vectara.io"

# Helper function for API requests
def make_request(method: str, endpoint: str, data: Dict = None) -> Dict:
    url = f"{BASE_URL}{endpoint}"
    headers = {
        "x-api-key": API_KEY,
        "Content-Type": "application/json"
    }

    if method == "GET":
        response = requests.get(url, headers=headers)
    elif method == "POST":
        response = requests.post(url, headers=headers, json=data)
    elif method == "PATCH":
        response = requests.patch(url, headers=headers, json=data)
    elif method == "DELETE":
        response = requests.delete(url, headers=headers)

    if response.status_code in [200, 201]:
        return response.json() if response.text else {}
    elif response.status_code == 204:
        return {}
    else:
        print(f"Error: {response.status_code}")
        print(response.text)
        response.raise_for_status()

# Helper function to create tools from Python functions
def create_tool_from_function(func, name: str, title: str, description: str) -> Dict:
    """Helper to create a Vectara tool from a Python function."""
    code = inspect.getsource(func)
    # Remove any leading indentation that may come from nested function definitions
    code = textwrap.dedent(code)
    return make_request("POST", "/v2/tools", {
        "type": "lambda",
        "name": name,
        "title": title,
        "description": description,
        "language": "python",
        "code": code
    })

print("✅ Setup complete!")`
    }
  ]}
/>

For example:

<CodePanel
  title="Setup Complete"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `🔑 Please enter your Vectara API key
   (Get your API key from: https://console.vectara.com/console/apiAccess)
API Key: ··········
✅ Setup complete!`
    }
  ]}
/>


## Part 2. Simple Calculator Tool (Returns Float)

Let's start with the simplest Lambda tool, a calculator that returns a
numeric value.

### Key points

- **Entry point**: Must define a `process()` function.
- **Type annotations**: Used for automatic schema discovery.
- **Return type**: This tool returns a `float`, a single numeric value.
- **Code display**: We define the function normally first (for syntax 
  highlighting), then convert it to a string.

<CodePanel
  title="Create Calculator Tool"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `# Step 1: Define the function normally - this gives us syntax highlighting!
def process(num1: float, num2: float, operation: str) -> float:
    """
    Simple calculator for basic arithmetic operations.

    Args:
        num1: First number
        num2: Second number
        operation: One of: add, subtract, multiply, divide

    Returns:
        The result of the arithmetic operation
    """
    # Normalize operation to handle variations (lowercase, trim whitespace)
    operation = operation.lower().strip()

    # Support common variations for better UX
    operation_map = {
        "add": "add",
        "addition": "add",
        "plus": "add",
        "sum": "add",
        "subtract": "subtract",
        "subtraction": "subtract",
        "minus": "minus",
        "difference": "subtract",
        "multiply": "multiply",
        "multiplication": "multiply",
        "times": "multiply",
        "product": "multiply",
        "divide": "divide",
        "division": "divide"
    }

    # Normalize to standard operation
    normalized_op = operation_map.get(operation, operation)

    operations = {
        "add": num1 + num2,
        "subtract": num1 - num2,
        "multiply": num1 * num2,
        "divide": num1 / num2 if num2 != 0 else 0.0
    }
    return operations.get(normalized_op, 0.0)

# Step 2: Extract the source code using inspect
calculator_code = inspect.getsource(process)

# Step 3: Create the tool using our helper function
# Use unique name to avoid conflicts when running notebook multiple times
calculator_tool = create_tool_from_function(
    process,
    name=f"calculator_{int(time.time())}",
    title="Simple Calculator",
    description="""Performs basic arithmetic operations (add, subtract, multiply, divide).

IMPORTANT: Call with three parameters:
- num1: first number
- num2: second number
- operation: one of "add", "subtract", "multiply", "divide" (also accepts variations like "plus", "times", "minus", etc.)

Example: {"num1": 10, "num2": 5, "operation": "multiply"}

Returns a single float value."""
)

calculator_tool_id = calculator_tool["id"]

print(f"✅ Calculator Tool Created!")
print(f"   Tool ID: {calculator_tool_id}")
print(f"   Return Type: float")
print(f"\n📊 Auto-discovered Input Schema:")
print(json.dumps(calculator_tool["input_schema"], indent=2))`
    }
  ]}
/>

For example:

<CodePanel
  title="Calculator Tool Created"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `✅ Calculator Tool Created!
   Tool ID: tol_178
   Return Type: float

📊 Auto-discovered Input Schema:
{
  "type": "object",
  "properties": {
    "num1": {
      "type": "number"
    },
    "num2": {
      "type": "number"
    },
    "operation": {
      "type": "string"
    }
  },
  "additionalProperties": false,
  "required": [
    "num1",
    "num2",
    "operation"
  ]
}`
    }
  ]}
/>

### Test the Calculator

Let's test our calculator with a simple multiplication operation.

<CodePanel
  title="Test Calculator Tool"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `# Test the calculator: 25 * 4
test_calculation = {
    "input": {
        "num1": 25,
        "num2": 4,
        "operation": "multiply"
    }
}

test_result = make_request("POST", f"/v2/tools/{calculator_tool_id}/test", test_calculation)

print("🧪 Test Results:")
print(f"   Type: {test_result['type']}")
print(f"   Execution Time: {test_result['latency_millis']}ms")
print(f"\n🔢 Result: 25 × 4 = {test_result['output']}")
print(f"   Return Type: {type(test_result['output']).__name__}")`
    }
  ]}
/>

**Expected Output:**
```
🧪 Test Results:
   Type: success
   Execution Time: 772ms

🔢 Result: 25 × 4 = {'content': '100.0'}
   Return Type: dict
```

## Part 3: Stock Ticker Formatter (Returns String)

Now let's create a tool that returns a string value for a stock 
ticket symbol formatter.

### Define the Function

<CodePanel
  title="Stock Ticker Formatter"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `# Define the ticker formatter function
def process(company_name: str) -> str:
    """
    Convert company name to stock ticker symbol.

    Args:
        company_name: Name of the company

    Returns:
        Stock ticker symbol as a string
    """
    # Simple mapping for demonstration
    tickers = {
        "apple": "AAPL",
        "microsoft": "MSFT",
        "google": "GOOGL",
        "alphabet": "GOOGL",
        "amazon": "AMZN",
        "tesla": "TSLA",
        "meta": "META",
        "facebook": "META",
        "nvidia": "NVDA"
    }

    # Try exact match first, then fallback to first 4 chars uppercase
    lookup = company_name.lower().strip()
    return tickers.get(lookup, company_name.upper()[:4])

# Create the tool with unique name
ticker_tool = create_tool_from_function(
    process,
    name=f"ticker_formatter_{int(time.time())}",
    title="Stock Ticker Formatter",
    description="""Converts company names to stock ticker symbols.

IMPORTANT: Call with a single parameter:
- company_name: name of the company (e.g., "Apple", "Microsoft")

Example: {"company_name": "Apple"}

Returns a string ticker symbol like "AAPL"."""
)

ticker_tool_id = ticker_tool["id"]

print(f"✅ Ticker Formatter Tool Created!")
print(f"   Tool ID: {ticker_tool_id}")
print(f"   Return Type: str")
print(f"\n📊 Auto-discovered Input Schema:")
print(json.dumps(ticker_tool["input_schema"], indent=2))`
    }
  ]}
/>
For example:

<CodePanel
  title="Ticker Formatter Tool Created"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `✅ Ticker Formatter Tool Created!
   Tool ID: tol_179
   Return Type: str

📊 Auto-discovered Input Schema:
{
  "type": "object",
  "properties": {
    "company_name": {
      "type": "string"
    }
  },
  "additionalProperties": false,
  "required": [
    "company_name"
  ]
}`
    }
  ]}
/>


### Test the Ticker Formatter

Let's test looking up a company's ticker symbol.

<CodePanel
  title="Test the Ticker Formatter"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `# Test the ticker formatter
test_ticker = {
    "input": {
        "company_name": "Apple"
    }
}

test_result = make_request("POST", f"/v2/tools/{ticker_tool_id}/test", test_ticker)

print("🧪 Test Results:")
print(f"   Type: {test_result['type']}")
print(f"   Execution Time: {test_result['latency_millis']}ms")
print(f"\n🏢 Result: Apple → {test_result['output']}")
print(f"   Return Type: {type(test_result['output']).__name__}")

# Test another company
test_ticker2 = {"input": {"company_name": "Tesla"}}
test_result2 = make_request("POST", f"/v2/tools/{ticker_tool_id}/test", test_ticker2)
print(f"\n🏢 Result: Tesla → {test_result2['output']}")`
    }
  ]}
/>

For example:

<CodePanel
  title="Test Results"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `🧪 Test Results:
   Type: success
   Execution Time: 468ms

🏢 Result: Apple → {'content': '"AAPL"'}
   Return Type: dict

🏢 Result: Tesla → {'content': '"TSLA"'}`
    }
  ]}
/>

## Part 4: Risk Checker (Returns Boolean)

This tool returns a bool which is perfect for yes/no decisions and 
validation.

## Key difference

- **Return type**: This tool returns `bool`, True or False.
- **Use case**: Decision making, validation, risk assessment.

<CodePanel
  title="Create Risk Checker Tool"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `# Define the risk assessment function
def process(age: int, stock_allocation_percent: float) -> bool:
    """
    Check if stock allocation is appropriate for investor's age.

    Uses the rule of thumb: stock allocation should be roughly (100 - age)%

    Args:
        age: Investor's age in years
        stock_allocation_percent: Percentage of portfolio in stocks (0-100)

    Returns:
        True if allocation is appropriate, False if too risky
    """
    # Conservative rule: stock % should not exceed (100 - age)
    recommended_max = 100 - age
    return stock_allocation_percent <= recommended_max

# Create the tool with unique name
risk_tool = create_tool_from_function(
    process,
    name=f"risk_checker_{int(time.time())}",
    title="Portfolio Risk Assessment",
    description="""Checks if stock allocation is appropriate for investor's age.

Uses the rule of thumb: stock allocation ≤ (100 - age)%

IMPORTANT: Call with two parameters:
- age: investor's age in years
- stock_allocation_percent: percentage in stocks (0-100)

Example: {"age": 35, "stock_allocation_percent": 70}

Returns True if appropriate, False if too risky."""
)

risk_tool_id = risk_tool["id"]

print(f"✅ Risk Checker Tool Created!")
print(f"   Tool ID: {risk_tool_id}")
print(f"   Return Type: bool")
print(f"\n📊 Auto-discovered Input Schema:")
print(json.dumps(risk_tool["input_schema"], indent=2))`
    }
  ]}
/>

For example:

<CodePanel
  title="Expected Output"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `✅ Risk Checker Tool Created!
   Tool ID: tol_180
   Return Type: bool

📊 Auto-discovered Input Schema:
{
  "type": "object",
  "properties": {
    "age": {
      "type": "integer"
    },
    "stock_allocation_percent": {
      "type": "number"
    }
  },
  "additionalProperties": false,
  "required": [
    "age",
    "stock_allocation_percent"
  ]
}`
    }
  ]}
/>

### Test the Risk Checker

Let's test different scenarios to see the boolean return values.

<CodePanel
  title="Test the Risk Checker"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `# Test scenario 1: Conservative 35-year-old with 60% stocks (Should be appropriate)
test_risk1 = {
    "input": {
        "age": 35,
        "stock_allocation_percent": 60
    }
}

test_result1 = make_request("POST", f"/v2/tools/{risk_tool_id}/test", test_risk1)
print("🧪 Test 1: Age 35, 60% in stocks")
print(f"   Result: {test_result1['output']}")
print(f"   ✅ Appropriate!" if test_result1['output'] else "   ⚠️  Too risky!")

# Test scenario 2: Aggressive 50-year-old with 80% stocks (Should be too risky)
test_risk2 = {
    "input": {
        "age": 50,
        "stock_allocation_percent": 80
    }
}

test_result2 = make_request("POST", f"/v2/tools/{risk_tool_id}/test", test_risk2)
print(f"\n🧪 Test 2: Age 50, 80% in stocks")
print(f"   Result: {test_result2['output']}")
print(f"   ✅ Appropriate!" if test_result2['output'] else "   ⚠️  Too risky!")

print(f"\n   Return Type: {type(test_result1['output']).__name__}")`
    }
  ]}
/>

For example:

<CodePanel
  title="Expected Output"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `🧪 Test 1: Age 35, 60% in stocks
   Result: {'content': 'true'}
   ✅ Appropriate!

🧪 Test 2: Age 50, 80% in stocks
   Result: {'content': 'false'}
   ✅ Appropriate!

   Return Type: dict`
    }
  ]}
/>

## Part 5: Portfolio Analyzer (Returns Dictionary)

Finally, let's create a more complex tool that returns structured data as a 
`dict`.

### Key difference:
- **Return type**: This tool returns `dict`, a structured data with multiple 
  fields,
- **Use case**: Complex analysis with multiple output values,

<CodePanel
  title="Create Portfolio Analyzer Tool"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `# Define the portfolio analyzer function
def process(holdings: list[dict[str, float]]) -> dict:
    """
    Analyze a portfolio of stock holdings.

    Args:
        holdings: List of holdings, each with 'quantity' and 'price' keys

    Returns:
        Dictionary with portfolio analysis including total value and metrics
    """
    if not holdings:
        return {"error": "No holdings provided"}

    # Calculate total value and positions
    total_value = 0
    position_values = []

    for holding in holdings:
        position_value = holding.get("quantity", 0) * holding.get("price", 0)
        position_values.append(position_value)
        total_value += position_value

    # Calculate metrics
    num_positions = len(holdings)
    avg_position = total_value / num_positions if num_positions > 0 else 0
    largest_position = max(position_values) if position_values else 0

    return {
        "total_value": round(total_value, 2),
        "num_positions": num_positions,
        "average_position_size": round(avg_position, 2),
        "largest_position": round(largest_position, 2),
        "is_diversified": num_positions >= 5
    }

# Create the tool with unique name
portfolio_tool = create_tool_from_function(
    process,
    name=f"portfolio_analyzer_{int(time.time())}",
    title="Portfolio Analyzer",
    description="""Analyzes a portfolio of stock holdings.

IMPORTANT: Call with a 'holdings' parameter that is an array of objects, where each has 'quantity' and 'price' keys.

Example:
{
  "holdings": [
    {"quantity": 100, "price": 150.50},
    {"quantity": 50, "price": 280.75}
  ]
}

Returns a dictionary with portfolio metrics."""
)

portfolio_tool_id = portfolio_tool["id"]

print(f"✅ Portfolio Analyzer Tool Created!")
print(f"   Tool ID: {portfolio_tool_id}")
print(f"   Return Type: dict")
print(f"\n📊 Auto-discovered Input Schema:")
print(json.dumps(portfolio_tool["input_schema"], indent=2))`
    }
  ]}
/>

For example:

<CodePanel
  title="Expected Output"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `✅ Portfolio Analyzer Tool Created!
   Tool ID: tol_181
   Return Type: dict

📊 Auto-discovered Input Schema:
{
  "type": "object",
  "properties": {
    "holdings": {
      "type": "object",
      "additionalProperties": true
    }
  },
  "additionalProperties": false,
  "required": [
    "holdings"
  ]
}`
    }
  ]}
/>

### Test the Portfolio Analyzer

Let's test analyzing a portfolio with multiple holdings.

<CodePanel
  title="Test the Portfolio Analyzer"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `# Test with a portfolio of 4 holdings
test_portfolio = {
    "input": {
        "holdings": [
            {"quantity": 100, "price": 150.50},  # $15,050
            {"quantity": 50, "price": 280.75},   # $14,037.50
            {"quantity": 200, "price": 45.25},   # $9,050
            {"quantity": 75, "price": 120.00}    # $9,000
        ]
    }
}

test_result = make_request("POST", f"/v2/tools/{portfolio_tool_id}/test", test_portfolio)

print("🧪 Test Results:")
print(f"   Type: {test_result['type']}")
print(f"   Execution Time: {test_result['latency_millis']}ms")
print(f"\n📈 Portfolio Analysis:")
print(json.dumps(test_result["output"], indent=2))
print(f"\n   Return Type: {type(test_result['output']).__name__}")`
    }
  ]}
/>

For example:

<CodePanel
  title="Expected Output"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `🧪 Test Results:
   Type: success
   Execution Time: 769ms

📈 Portfolio Analysis:
{
  "total_value": 47137.5,
  "num_positions": 4,
  "average_position_size": 11784.38,
  "largest_position": 15050.0,
  "is_diversified": false
}

   Return Type: dict`
    }
  ]}
/>

## Part 6: Update a Tool

Tools can be updated to add new functionality. Let's enhance the
calculator with a "power" operation.

<CodePanel
  title="Update Calculator with Power Operation"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `# Define the enhanced calculator with a new "power" operation
def process(num1: float, num2: float, operation: str) -> float:
    """
    Enhanced calculator with power operation.

    Args:
        num1: First number
        num2: Second number
        operation: One of: add, subtract, multiply, divide, power

    Returns:
        The result of the arithmetic operation
    """
    # Normalize operation to handle variations
    operation = operation.lower().strip()

    # Support common variations
    operation_map = {
        "add": "add",
        "addition": "add",
        "plus": "add",
        "sum": "add",
        "subtract": "subtract",
        "subtraction": "subtract",
        "minus": "subtract",
        "difference": "subtract",
        "multiply": "multiply",
        "multiplication": "multiply",
        "times": "multiply",
        "product": "multiply",
        "divide": "divide",
        "division": "divide",
        "power": "power",
        "exponentiation": "power",
        "exponent": "power",
        "pow": "power",
        "**": "power",
        "^": "power"
    }

    # Normalize to standard operation
    normalized_op = operation_map.get(operation, operation)

    operations = {
        "add": num1 + num2,
        "subtract": num1 - num2,
        "multiply": num1 * num2,
        "divide": num1 / num2 if num2 != 0 else 0.0,
        "power": num1 ** num2  # NEW OPERATION!
    }
    return operations.get(normalized_op, 0.0)

# Extract the updated code
updated_code = inspect.getsource(process)
updated_code = textwrap.dedent(updated_code)

# Update the tool
update_request = {
    "type": "lambda",
    "code": updated_code
}

updated_tool = make_request("PATCH", f"/v2/tools/{calculator_tool_id}", update_request)

print(f"✅ Calculator Tool Updated!")
print(f"   Tool ID: {calculator_tool_id}")
print(f"   New operations: add, subtract, multiply, divide, power")
print(f"   (Also accepts common variations like 'addition', 'multiplication', 'exponentiation', etc.)")

# Test the new power operation: 2^8
test_power = {
    "input": {
        "num1": 2,
        "num2": 8,
        "operation": "power"
    }
}

test_result = make_request("POST", f"/v2/tools/{calculator_tool_id}/test", test_power)
print(f"\n🧪 Testing new power operation:")
print(f"   2^8 = {test_result['output']}")`
    }
  ]}
/>

For example:

<CodePanel
  title="Expected Output"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `✅ Calculator Tool Updated!
   Tool ID: tol_178
   New operations: add, subtract, multiply, divide, power
   (Also accepts common variations like 'addition', 'multiplication', 'exponentiation', etc.)

🧪 Testing new power operation:
   2^8 = {'content': '256.0'}`
    }
  ]}
/>

## Part 7: Create an AI agent with all tools

Now let's create an AI agent that can use all four of our tools. The agent 
intelligently chooses which tool to use based on the user's question.

<CodePanel
  title="Create Financial Assistant Agent"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `# Create agent configuration with all 4 tools
import time

# Use a unique name to avoid conflicts when running the notebook multiple times
agent_name = f"Financial Assistant {int(time.time())}"

agent_config = {
    "name": agent_name,
    "description": "An AI assistant with calculation, lookup, risk assessment, and portfolio analysis capabilities",
    "tool_configurations": {
        "calculator": {
            "type": "lambda",
            "tool_id": calculator_tool_id
        },
        "ticker_lookup": {
            "type": "lambda",
            "tool_id": ticker_tool_id
        },
        "risk_assessment": {
            "type": "lambda",
            "tool_id": risk_tool_id
        },
        "portfolio_analysis": {
            "type": "lambda",
            "tool_id": portfolio_tool_id
        }
    },
    "model": {
        "name": "gpt-4o",
        "parameters": {
            "temperature": 0.1
        }
    },
    "first_step": {
        "type": "conversational",
        "instructions": [
            {
                "type": "inline",
                "name": "Assistant Instructions",
                "description": "How to use the available tools",
                "template": """You are a helpful financial assistant with access to four specialized tools:

1. **calculator**: For arithmetic calculations (addition, subtraction, multiplication, division, exponentiation)
   - Call with: {"num1": <number>, "num2": <number>, "operation": "<operation>"}

2. **ticker_lookup**: For looking up stock ticker symbols by company name
   - Call with: {"company_name": "<name>"}

3. **risk_assessment**: For evaluating if a portfolio's stock allocation is appropriate for an investor's age
   - Call with: {"age": <number>, "stock_allocation_percent": <number>"}

4. **portfolio_analysis**: For analyzing portfolio holdings and calculating metrics
   - IMPORTANT: Call with an array of holdings:
   - {"holdings": [{"quantity": 100, "price": 185.0}, {"quantity": 50, "price": 375.0}]}
   - Parse the user's portfolio information (shares and prices) into this array format

Use the appropriate tool to answer the user's question, then explain the results clearly."""
            }
        ],
        "output_parser": {
            "type": "default"
        }
    },
    "enabled": True
}

agent = make_request("POST", "/v2/agents", agent_config)
agent_key = agent["key"]

print(f"✅ Agent Created!")
print(f"   Agent Key: {agent_key}")
print(f"   Name: {agent['name']}")
print(f"   Tools Configured: {len(agent['tool_configurations'])}")
print(f"\nAvailable tools:")
for tool_name in agent['tool_configurations'].keys():
    print(f"   • {tool_name}")`
    }
  ]}
/>

For example:

<CodePanel
  title="Expected Output"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `✅ Agent Created!
   Agent Key: agt_financial_assistant_1761332618_c02b
   Name: Financial Assistant 1761332618
   Tools Configured: 4

Available tools:
   • calculator
   • portfolio_analysis
   • risk_assessment
   • ticker_lookup`
    }
  ]}
/>


## Part 8: Create a session and test different tool types

Sessions maintain conversation context. Let's create a session and test each 
type of tool.

<CodePanel
  title="Create a Session"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `# Create a session
session_config = {
    "name": "Tool Demo Session",
    "description": "Testing different tool return types"
}

session = make_request("POST", f"/v2/agents/{agent_key}/sessions", session_config)
session_key = session["key"]

print(f"✅ Session Created!")
print(f"   Session Key: {session_key}")

# Example 1: Test float return (calculator)
print("\n" + "="*80)
print("Example 1: Simple Calculation (Float Return)")
print("="*80)

message1 = {
    "type": "input_message",
    "messages": [
        {
            "type": "text",
            "content": "What's 25 times 4?"
        }
    ],
    "stream_response": False
}

response1 = make_request("POST", f"/v2/agents/{agent_key}/sessions/{session_key}/events", message1)

for event in response1["events"]:
    if event["type"] == "tool_input":
        print(f"\n🔧 Tool: {event['tool_configuration_name']}")
        print(f"   Input: {json.dumps(event['tool_input'], indent=2)}")
    elif event["type"] == "tool_output":
        print(f"\n📊 Output (type: {type(event['tool_output']).__name__}):")
        print(f"   {event['tool_output']}")
    elif event["type"] == "agent_output":
        print(f"\n💬 Agent: {event['content']}")`
    }
  ]}
/>

For example:

<CodePanel
  title="Expected Output"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `✅ Session Created!
   Session Key: ase_tool_demo_session_6add

================================================================================
Example 1: Simple Calculation (Float Return)
================================================================================

🔧 Tool: calculator
   Input: {
  "num1": 25,
  "num2": 4,
  "operation": "multiply"
}

📊 Output (type: dict):
   {'content': '100.0'}

💬 Agent: 25 times 4 equals 100.`
    }
  ]}
/>


<CodePanel
  title="Test Returns"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `# Example 2: Test string return (ticker lookup)
print("\n" + "="*80)
print("Example 2: Ticker Lookup (String Return)")
print("="*80)

message2 = {
    "type": "input_message",
    "messages": [
        {
            "type": "text",
            "content": "What's the stock ticker for Tesla?"
        }
    ],
    "stream_response": False
}

response2 = make_request("POST", f"/v2/agents/{agent_key}/sessions/{session_key}/events", message2)

for event in response2["events"]:
    if event["type"] == "tool_input":
        print(f"\n🔧 Tool: {event['tool_configuration_name']}")
        print(f"   Input: {json.dumps(event['tool_input'], indent=2)}")
    elif event["type"] == "tool_output":
        print(f"\n📊 Output (type: {type(event['tool_output']).__name__}):")
        print(f"   {event['tool_output']}")
    elif event["type"] == "agent_output":
        print(f"\n💬 Agent: {event['content']}")

# Example 3: Test boolean return (risk assessment)
print("\n" + "="*80)
print("Example 3: Risk Assessment (Boolean Return)")
print("="*80)

message3 = {
    "type": "input_message",
    "messages": [
        {
            "type": "text",
            "content": "I'm 40 years old with 75% of my portfolio in stocks. Is that appropriate?"
        }
    ],
    "stream_response": False
}

response3 = make_request("POST", f"/v2/agents/{agent_key}/sessions/{session_key}/events", message3)

for event in response3["events"]:
    if event["type"] == "tool_input":
        print(f"\n🔧 Tool: {event['tool_configuration_name']}")
        print(f"   Input: {json.dumps(event['tool_input'], indent=2)}")
    elif event["type"] == "tool_output":
        print(f"\n📊 Output (type: {type(event['tool_output']).__name__}):")
        print(f"   {event['tool_output']}")
    elif event["type"] == "agent_output":
        print(f"\n💬 Agent: {event['content']}")

# Example 4: Test dict return (portfolio analysis)
print("\n" + "="*80)
print("Example 4: Portfolio Analysis (Dictionary Return)")
print("="*80)

message4 = {
    "type": "input_message",
    "messages": [
        {
            "type": "text",
            "content": "Analyze my portfolio: 100 shares of Apple at $185, 50 shares of Microsoft at $375, and 200 shares of Tesla at $242."
        }
    ],
    "stream_response": False
}

response4 = make_request("POST", f"/v2/agents/{agent_key}/sessions/{session_key}/events", message4)

for event in response4["events"]:
    if event["type"] == "tool_input":
        print(f"\n🔧 Tool: {event['tool_configuration_name']}")
        print(f"   Input: {json.dumps(event['tool_input'], indent=2)}")
    elif event["type"] == "tool_output":
        print(f"\n📊 Output (type: {type(event['tool_output']).__name__}):")
        print(f"   {json.dumps(event['tool_output'], indent=2)}")
    elif event["type"] == "agent_output":
        print(f"\n💬 Agent: {event['content']}")`
    }
  ]}
/>

<CodePanel
  title="Expected Output"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `
================================================================================
Example 2: Ticker Lookup (String Return)
================================================================================

🔧 Tool: ticker_lookup
   Input: {
  "company_name": "Tesla"
}

📊 Output (type: dict):
   {'content': '"TSLA"'}

💬 Agent: The stock ticker for Tesla is "TSLA".

================================================================================
Example 3: Risk Assessment (Boolean Return)
================================================================================

🔧 Tool: risk_assessment
   Input: {
  "age": 40,
  "stock_allocation_percent": 75
}

📊 Output (type: dict):
   {'content': 'false'}

💬 Agent: For a 40-year-old, having 75% of your portfolio in stocks is generally considered too high according to traditional risk assessment guidelines. It's often recommended to have a stock allocation of around 60% at this age, with the rest in more conservative investments like bonds. You might want to consider adjusting your portfolio to better align with these guidelines, depending on your risk tolerance and financial goals.

================================================================================
Example 4: Portfolio Analysis (Dictionary Return)
================================================================================

🔧 Tool: portfolio_analysis
   Input: {
  "holdings": [
    {
      "quantity": 100,
      "price": 185.0
    },
    {
      "quantity": 50,
      "price": 375.0
    },
    {
      "quantity": 200,
      "price": 242.0
    }
  ]
}

📊 Output (type: dict):
   {
  "total_value": 85650.0,
  "num_positions": 3,
  "average_position_size": 28550.0,
  "largest_position": 48400.0,
  "is_diversified": false
}

💬 Agent: Here's the analysis of your portfolio:

- **Total Portfolio Value**: $85,650
- **Average Position Size**: $28,550
- **Largest Position**: $48,400 (Tesla)
- **Number of Positions**: 3
- **Diversification**: Your portfolio is not considered diversified, as it consists of only three stocks.

To improve diversification, you might consider adding more stocks from different sectors or asset classes to reduce risk.`
    }
  ]}
/>

## Part 9: Comprehensive resource cleanup

When you finish experimenting, you can clean up the resources. This section 
shows multiple ways to delete your tools and agent.

<CodePanel
  title="Part 1: List all Resources"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `# Part 1: List all your resources
print("📋 Your Current Resources")
print("="*60)

all_tools = make_request("GET", "/v2/tools")
user_tools = [t for t in all_tools['tools'] if t['type'] == 'lambda']

print(f"\n🔧 Lambda Tools ({len(user_tools)}):")
for tool in user_tools:
    print(f"   • {tool['name']} ({tool['id']})")

all_agents = make_request("GET", "/v2/agents")
print(f"\n🤖 Agents ({len(all_agents['agents'])}):")
for agent in all_agents['agents']:
    print(f"   • {agent['name']} ({agent['key']})")

print("\n" + "="*60)`
    }
  ]}
/>

For example:

<CodePanel
  title="Expected Output"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `📋 Your Current Resources
============================================================

🔧 Lambda Tools (4):
   • calculator_1761332604 (tol_178)
   • ticker_formatter_1761332606 (tol_179)
   • risk_checker_1761332609 (tol_180)
   • portfolio_analyzer_1761332613 (tol_181)

🤖 Agents (1):
   • Financial Assistant 1761332618 (agt_financial_assistant_1761332618_c02b)

============================================================`
    }
  ]}
/>

<CodePanel
  title="Interactive Cleanup"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `# Part 2: Interactive cleanup
print("\n🧹 Cleanup Options")
print("="*60)
print(f"Resources created in this notebook:")
print(f"  • Agent: {agent_key}")
print(f"  • Calculator Tool: {calculator_tool_id}")
print(f"  • Ticker Formatter Tool: {ticker_tool_id}")
print(f"  • Risk Checker Tool: {risk_tool_id}")
print(f"  • Portfolio Analyzer Tool: {portfolio_tool_id}")
print("="*60)
print()

cleanup_choice = input("Do you want to delete these resources? (yes/no): ").strip().lower()

if cleanup_choice in ['yes', 'y']:
    print("\n🗑️  Deleting resources...")

    # Delete agent
    try:
        make_request("DELETE", f"/v2/agents/{agent_key}")
        print(f"   ✅ Deleted agent: {agent_key}")
    except Exception as e:
        print(f"   ⚠️  Error deleting agent: {e}")

    # Delete tools
    tool_ids = [
        (calculator_tool_id, "Calculator"),
        (ticker_tool_id, "Ticker Formatter"),
        (risk_tool_id, "Risk Checker"),
        (portfolio_tool_id, "Portfolio Analyzer")
    ]

    for tool_id, tool_name in tool_ids:
        try:
            make_request("DELETE", f"/v2/tools/{tool_id}")
            print(f"   ✅ Deleted {tool_name}: {tool_id}")
        except Exception as e:
            print(f"   ⚠️  Error deleting {tool_name}: {e}")

    print("\n✅ Cleanup complete!")
else:
    print("\n💾 Resources kept. You can access them at:")
    print("   • Tools: https://console.vectara.com/console/tools")
    print("   • Agents: https://console.vectara.com/console/agents")`
    }
  ]}
/>

For example:

<CodePanel
  title="Expected Output"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `🧹 Cleanup Options
============================================================
Resources created in this notebook:
  • Agent: agt_financial_assistant_1761332618_c02b
  • Calculator Tool: tol_178
  • Ticker Formatter Tool: tol_179
  • Risk Checker Tool: tol_180
  • Portfolio Analyzer Tool: tol_181
============================================================

Do you want to delete these resources? (yes/no): yes

🗑️  Deleting resources...
   ✅ Deleted agent: agt_financial_assistant_1761332618_c02b
   ✅ Deleted Calculator: tol_178
   ✅ Deleted Ticker Formatter: tol_179
   ✅ Deleted Risk Checker: tol_180
   ✅ Deleted Portfolio Analyzer: tol_181

✅ Cleanup complete!`
    }
  ]}
/>

## Manual cleanup alternative

If you prefer to delete resources manually or need to clean up later, here are the curl commands:


<CodePanel
  title="Manual Cleanup Commands"
  layout="stacked"
  snippets={[
    {
      language: "curl",
      code: `# Part 3: Manual cleanup instructions with curl commands
print("📖 Manual Cleanup Commands")
print("="*60)
print("\nTo delete resources manually using curl:\n")

print("1. Delete the agent:")
print(f"   curl -X DELETE {BASE_URL}/v2/agents/{agent_key} \\")
print(f"        -H 'x-api-key: YOUR_API_KEY'\n")

print("2. Delete the calculator tool:")
print(f"   curl -X DELETE {BASE_URL}/v2/tools/{calculator_tool_id} \\")
print(f"        -H 'x-api-key: YOUR_API_KEY'\n")

print("3. Delete the ticker formatter tool:")
print(f"   curl -X DELETE {BASE_URL}/v2/tools/{ticker_tool_id} \\")
print(f"        -H 'x-api-key: YOUR_API_KEY'\n")

print("4. Delete the risk checker tool:")
print(f"   curl -X DELETE {BASE_URL}/v2/tools/{risk_tool_id} \\")
print(f"        -H 'x-api-key: YOUR_API_KEY'\n")

print("5. Delete the portfolio analyzer tool:")
print(f"   curl -X DELETE {BASE_URL}/v2/tools/{portfolio_tool_id} \\")
print(f"        -H 'x-api-key: YOUR_API_KEY'\n")

print("="*60)
print("\n💡 Or manage resources in the Vectara Console:")
print("   • Agents: https://console.vectara.com/console/agents")
print("   • Tools: https://console.vectara.com/console/tools")`
    }
  ]}
/>

For example:

<CodePanel
  title="Expected Output"
  layout="stacked"
  snippets={[
    {
      language: "python",
      code: `📖 Manual Cleanup Commands
============================================================

To delete resources manually using curl:

1. Delete the agent:
   curl -X DELETE https://api.vectara.io/v2/agents/agt_financial_assistant_1761332618_c02b \
        -H 'x-api-key: YOUR_API_KEY'

2. Delete the calculator tool:
   curl -X DELETE https://api.vectara.io/v2/tools/tol_178 \
        -H 'x-api-key: YOUR_API_KEY'

3. Delete the ticker formatter tool:
   curl -X DELETE https://api.vectara.io/v2/tools/tol_179 \
        -H 'x-api-key: YOUR_API_KEY'

4. Delete the risk checker tool:
   curl -X DELETE https://api.vectara.io/v2/tools/tol_180 \
        -H 'x-api-key: YOUR_API_KEY'

5. Delete the portfolio analyzer tool:
   curl -X DELETE https://api.vectara.io/v2/tools/tol_181 \
        -H 'x-api-key: YOUR_API_KEY'

============================================================

💡 Or manage resources in the Vectara Console:
   • Agents: https://console.vectara.com/console/agents
   • Tools: https://console.vectara.com/console/tools`
    }
  ]}
/>


# Key Takeaways

### Lambda Tools with Different Return Types

`float` - Calculator tool for simple numeric results.
`str` - Ticker formatter for text outputs.
`bool` - Risk checker for yes/no decisions.
`dict` - Portfolio analyzer for structured data.

### Code organization

- Define functions normally (with syntax highlighting!)
- Use inspect.getsource() to convert to strings
- Helper function create_tool_from_function() simplifies creation

### Tool lifecycle

1. **Create**: POST to `/v2/tools` with your Python code
2. **Test**: POST to `/v2/tools/{id}/test` with sample inputs
3. **Update**: PATCH to `/v2/tools/{id}` with new code
4. **Delete**: DELETE to `/v2/tools/{id}`

### Agents

- Configure multiple tools per agent
- Agent intelligently chooses the right tool
- Instructions guide tool usage
- Sessions maintain conversation context

### Resource Management

- List resources with GET requests
- Interactive or manual cleanup options
- Console UI for visual management

## Next Steps

Now that you've mastered Lambda Tools, explore:

- **Combine with corpora search**: Add document search capabilities
- **Create more tools**: Data analysis, API calls, custom calculations
- **Build applications**: Integrate into your apps
- **Explore streaming**: Real-time responses for better UX
- **Try MCP tools**: Connect to Model Context Protocol servers

## Additional Resources

- [Lambda Tools Documentation](/docs/agents/lambda-tools)
- [API Reference](https://docs.vectara.com/docs/rest-api/)
- [Vectara Console](https://console.vectara.com)
- [GitHub Examples](https://github.com/vectara/examples)
