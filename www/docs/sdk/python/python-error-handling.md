---
id: python-error-handling
title: A Quick Guide to Error Handling in the Vectara Python SDK
sidebar_label: Error Handling
hide_table_of_contents: true
---

import CodePanel from '@site/src/theme/CodePanel';
import { Spacer } from "@site/src/components/ui/Spacer";

When using the Vectara Python SDK, errors can occur at three distinct stages 
of an API call. Understanding these stages helps in writing robust code that 
can handle failures gracefully.

1. **Client-Side Validation Errors:** These happen before any request is sent to 
   Vectara's servers. They are caused by providing incorrect data types or missing 
   required information.
2. **Network and Transport Errors:** These occur if the SDK cannot communicate with 
   Vectara's API endpoints due to network problems like timeouts or connectivity issues.
3. **Vectara API Errors:** These are returned by Vectara's servers when a request is 
   successfully received but cannot be processed due to issues like an invalid API key, 
   insufficient permissions, or a malformed query.

## Client-Side validation errors (pydantic.ValidationError)

The SDK uses Pydantic to validate your inputs before sending them. If you 
provide data of the wrong type (e.g., a string instead of a number) or omit 
a required field, a ValidationError is raised.  

<CodePanel
  title="Incorrect Data Type"
  snippets={[
    {
      language: 'python',
      code: `from vectara import Vectara, SearchCorporaParameters
from pydantic import ValidationError

client = Vectara(api_key="YOUR_API_KEY")

try:
    # This will fail because 'limit' should be an integer.
    search_params = SearchCorporaParameters(
        corpora=[{"corpus_key": "my-corpus-key"}],
        limit="ten"  # Incorrect type
    )
    
    client.query(
        query="What is Vectara?",
        search=search_params
    )

except ValidationError as e:
    print("A validation error occurred:")
    # The exception contains detailed information about the failure.
    print(e.errors())`
    }
  ]}
  annotations={{
    python: [
      { line: 7, text: 'This will fail because limit should be an integer.' }
    ]
  }}
  layout="stacked"
/>

## Network and transport errors (httpx Exceptions)

The SDK uses the httpx library for network communication. Any network-level failure, such as a request timeout or a connection error, will raise an httpx exception. The most common ones to handle are  
httpx.TimeoutException and httpx.ConnectError.  

<CodePanel
  title="Handling a Request Timeout"
  snippets={[
    {
      language: 'python',
      code: `import httpx
from vectara import Vectara

# Configure a short timeout to make the exception likely
client = Vectara(api_key="YOUR_API_KEY", timeout=0.1)

try:
    client.corpora.list()

except httpx.TimeoutException as e:
    print(f"The request timed out: {e}")
    # Implement retry logic or fail gracefully here.

except httpx.ConnectError as e:
    print(f"A connection error occurred: {e}")
    # Advise checking network configuration or retrying later.`
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: 'Configure a short timeout to demonstrate the exception.' }
    ]
  }}
  layout="stacked"
/>

## Vectara API errors (vectara.ApiError)

If your request is successfully sent to Vectara but is rejected by the API for a specific reason (e.g., invalid credentials, resource not found), the SDK will raise an ApiError. This exception contains the HTTP  
status_code and the body of the error response from the server, which are crucial for debugging.

<CodePanel
  title="Handling an Invalid API Key"
  snippets={[
    {
      language: 'python',
      code: `from vectara import Vectara
from vectara.core import ApiError

# Using a deliberately invalid API key
client = Vectara(api_key="INVALID_API_KEY")

try:
    client.corpora.list()

except ApiError as e:
    print("An API Error was returned from Vectara.")
    print(f"  Status Code: {e.status_code}")
    print(f"  Response Body: {e.body}")
    
    if e.status_code == 401:
        print("\\nHint: This is an authentication failure. Please check your API key.")
    elif e.status_code == 403:
        print("\\nHint: This is a permission error. Check the key's roles or your plan.")`
    }
  ]}
  annotations={{
    python: [
      { line: 5, text: 'Using a deliberately invalid API key to trigger error.' }
    ]
  }}
  layout="stacked"
/>
