---
id: api-keys
title: API Keys
sidebar_label: Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from './definitions.md';
import {vars} from '@site/static/variables.json';

## Introduction

API keys provide controlled unauthenticated access to your corpora in the <Config v="names.product"/> platform. Rapidly build prototypes by embedding API keys in clients such as web pages and mobile apps. 

API keys can either support [querying](search-apis/search.md) or both querying and [indexing](indexing-apis/indexing.md) APIs access to your corpora based on your usage needs. [Administrative actions](admin-apis/admin.md) APIs are not currently available through an API key.  

You can explore the <Config v="names.product"/> platform's APIs further as well through our [API Playground](rest-api/). 

## When to use an API key vs. OAuth

The <Config v="names.product"/> platform supports both API Keys and [OAuth](authentication.md) to access our APIs. The following are our recommendations and best practices on when to use which method based on your usage and environment needs:

- API keys are great for getting started and prototyping with the <Config v="names.product"/> platform. Creating a key with both querying & indexing capabilities may facilitate this. 
- When creating an API key, if just the query functionality will suffice, provide just query access to the key to not risk additional exposure to your corpora in the platform. 
- If you must provide public client access in an unsecured environment and must use an API key, then you should limit the key to just the [query API](search-apis/search.md).
- Don't use API keys to provide public client access to corpora with sensitive data. Configure [OAuth API authentication](authentication.md) instead to provide such access.
  - The potential risk is that if an API key with querying & indexing access is in a client in an unsecure environment (e.g. a web page), an attacker could then use that key to index or delete information from corpora. 
- In general, we recommend to use [OAuth API authentication](authentication.md) whenever possible.
- Using API keys for private client access in secure environments should be OK but please adhere to your organization's security practices & standards.  

:::important 

Account owners are responsible for charges incurred through anonymous access to
your account with an API key.

:::

## API Key Management

The platform provides full management of API keys - including creation and deletion - so should a key ever become compromised, it can be revoked in minutes, and a new key issued. Existing API keys can also be disabled and re-enabled. 


![API Keys](/img/api_keys-manage.png)


### Creating an API Key
Before creating a new API key, we **recommend to review** our **[API key vs. OAuth usage recommendations.](#when-to-use-an-api-key-vs-oauth)**

1. Navigate to the **API keys page**. Click on **API keys** menu item in the sidebar navigation. 

2. Click on **Create API key** button and a dialog will display to create an API key.  

<img src={'/img/api_keys-create.png'} style={{height: 500}} />  

3. Enter a name for the API key to distinguish it from other keys.
4. Select the API(s) to give the key access to:
- **QueryService.** Provides key access to the [query/search API](search-apis/search.md) for running queries and outputting search results from corpora. Best to use when just query capabilities are needed. Try out [QueryService in the API playground](rest-api/query.api.mdx).
- **QueryService & IndexService** provides key access to both query/search API & [index API](indexing-apis/indexing.md). Index APIs support indexing & deleting data into corpora. As per best practices, this type of key should **never be used in public facing clients.** Try out [IndexService in the API playground](rest-api/index.api.mdx).
5. Enter or select one or more corpora for to provide API access to based on the selected API(s). 
6. Click **Create** button to create the new key. 

You and your organization can now start using the API key to develop powerful applications with your corpora on the <Config v="names.product"/> platform!

### Using an API Key

To use an API key, pass it using the `x-api-key` header request, in lieu of the
standard JWT token over bearer authentication method covered in
[authentication](authentication.md).

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
    { label: 'cURL', value: 'curl', },
  ]
}>
<TabItem value="py">
<pre>
{`
api_key_header = {
    "customer-id": CUSTOMER_ID,
    "x-api-key": API_KEY
}
 
data_dict = {
    "query": [
        {
            "query": "What is the meaning of life?",
            "num_results": 10,
            "corpus_key": [
                {
                    "customer_id": CUSTOMER_ID,
                    "corpus_id": CORPUS_ID
                }
            ]
        }
    ]
}
payload = json.dumps(data_dict)
response = requests.post(
    "https://${vars['domains.rest.serving']}/v1/query",
    data=payload,
    verify=True,
    headers=api_key_header)
`}
</pre>

</TabItem>
<TabItem value="js">

<pre>
{`
fetch("https://${vars['domains.rest.serving']}:443/v1/query", {
  headers: {
    "Content-Type": "application/json",
    "x-api-key": api_key,
    "customer-id": customer_id,
  },
  body: JSON.stringify({
    query: [
      {
        query: "What is the meaning of life?",
        num_results: 10,
        corpus_key: [{ customer_id: customer_id, corpus_id: corpus_id }],
      },
    ],
  }),
  method: "post",
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
`}
</pre>
</TabItem>
<TabItem value="curl">
<pre>
{`
curl -X POST \\
  -H "x-api-key: \${API_KEY}" \\
  -H "customer-id: \${CUSTOMER_ID}" \\
  https://${vars['domains.rest.serving']}:443/v1/query \\
  -d @- <<END;
  {
    "query": [
      { "query": "What is the meaning of life?",
        "num_results": 10,
        "corpus_key": [{"customer_id": \${CUSTOMER_ID}, "corpus_id": \${CORPUS_ID}}]
      }
    ]
  }
END
`}
</pre>

</TabItem>
</Tabs>

### Disable and Enable an API Key

API keys can have their access temporarily blocked or fully restored by respectively disabling or enabling a key. 

To disable an API key from the API keys management screen:
1. Find the table row for the API key you want to disable.
2. Open the **actions menu** (...) for the key.
3. Select **Disable** menu item from the actions menu.

It will take approximately 1 minute for query and/or index requests using this key to be blocked.

Once an API key is disabled, a key can be reenabled through the **Enable** menu item in the actions menu. It will take approximately 1-2 minutes before an API key can serve query and/or index traffic again.

### Delete an API Key

An API key may be permanently deleted from the <Config v="names.product"/> platform. 

:::caution

Once an API key is deleted, it is permanently deleted from the platform and cannot be recovered.  
All clients that currently use the key will be blocked.

:::

To delete an API key from the API keys management screen:
1. Find the table row for the API key you want to delete.
2. Open the **actions menu** (...) for the key.
3. Select **Delete** menu item from the actions menu.

