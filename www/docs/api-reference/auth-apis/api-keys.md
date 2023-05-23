---
id: api-keys
title: API Keys
sidebar_label: API Keys
---

API Keys can be used for querying and indexing operations, but cannot at this
time be used for administrative operations such as creating or deleting corpora.

# Creating an API Key
Go to [https://console.vectara.com/console/api-keys](https://console.vectara.com/console/api-keys)
to create a new API key.  API Keys can be scoped either to be query-only or
both query and index.  It's recommended that you choose the most limited scope
you can for your application: it's "cheap" to create multiple API keys, but
having an accidental publication of an over-privileged API key is often
organizationally "expensive."  In general, it's recommended that you use
[OAuth 2.0](OAuth 2.0) if/where possible for production applications.

# Use an API Key
To use an API key in a request, you need to pass in `x-api-key` as an HTTP
header.

For example, a REST request using an API key for search would typically look
like the following:
```
headers = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'customer-id': '12345678',
  'x-api-key': 'zwt_j839a9v80438nq093fn'
}

payload = { ... }

url = 'https://api.vectara.io/v1/query'
response = requests.request("POST", url, headers=headers, data=payload)
```

