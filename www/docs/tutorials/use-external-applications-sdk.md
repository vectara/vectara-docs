---
id: use-external-applications-sdk
title: Use Direct HTTPS or the OpenAI SDK with External Applications
sidebar_label: Use Direct HTTPS or the OpenAI SDK with External Applications
---

import CodePanel from '@site/src/theme/CodePanel';

To integrate with external applications, you can use either the direct HTTP
requests approach or the OpenAI SDK.

## OpenAI SDK Integration Example

<CodePanel
  title="OpenAI SDK Integration"
  snippets={[{
    language: 'python',
    code: `from openai import OpenAI

# Initialize the client
client = OpenAI(
    api_key="your-vectara-api-key",
    base_url="https://api.vectara.io/v2/llms"
)

# Make a chat completion request
completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is Vectara?"}
    ]
)

print(completion.choices[0].message.content)`
  }]}
  layout="stacked"
/>

## Direct HTTP Requests Example

<CodePanel
  title="Direct HTTP Requests"
  snippets={[{
    language: 'python',
    code: `import requests

url = "https://api.vectara.io/v2/llms/chat/completions"
headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer your-vectara-api-key"  # Or use "x-api-key" header
}
payload = {
    "model": "gpt-4o-mini",
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "What is Vectara?"}
    ]
}

response = requests.post(url, json=payload, headers=headers)
print(response.json()["choices"][0]["message"]["content"])`
  }]}
  layout="stacked"
/>

This demonstrates how to use the Vectara Chat Completions API, both
directly and with the OpenAI SDK. You can use this API to add powerful
generative AI capabilities to your applications with OpenAI-compatible
interfaces.
