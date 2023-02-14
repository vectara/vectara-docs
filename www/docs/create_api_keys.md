---
id: api-keys
title: API Keys
sidebar_label: Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from './definitions.md';
import {vars} from '@site/static/variables.json';

API keys provide controlled unauthenticated access to your corpora in the <Config v="names.product"/> platform. Rapidly build prototypes by embedding API keys in clients such as web pages and mobile apps. 

API keys can either support [querying](search-apis/search.md) or both querying and [indexing](indexing-apis/indexing.md) APIs access to your corpora based on your usage needs. [Administrative actions](admin-apis/admin.md) APIs are not currently available through an API key.  

You can explore the <Config v="names.product"/> platform's APIs further as well through our [API Playground](rest-api/). 

:::important

Don't use API keys to provide public client access to corpora with sensitive data. Configure [OAuth API authentication](authentication.md) instead to securely provide access for such public usage.

Account owners are responsible for charges incurred through anonymous access to
your account with an API key.

:::

## API Key Management

The platform provides full management - including creation and deletion - of API keys so should a key ever become compromised, it can be revoked in minutes, and a new key issued. Existing API keys can also be disabled and re-enabled. 


SHOW IMAGE
<!--
![API Keys](/img/api_key-empty.png)
-->

### Creating an API Key

1. Navigate to the API keys page. Click on **API Keys** menu item in the sidebar navigation. 

2. Click on **Create Key** button and a dialog will display to create an API key.

SHOW IMAGE
![Create an API Key](/img/api_key_new.png)

3. Enter a name for the API key to distinguish it from other keys.
4. Select the API(s) to give the key access to. 

Select QueryService -TODO

Select QueryService & IndexService -TODO

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

API keys can have their access temporarily blocked or fully restored by disabling or enabling functionality. 

To disable an API key from the API keys management screen:
1. Find the table row for the API key you want to disable.
2. **Open the actions menu** ([meatballs menu](https://uxpickle.com/significance-of-the-three-dots-or-ellipses-in-ui-design/)) for the key.
3. **Select Disable** menu item from the actions menu.

It will take approximately 1 minute for query requests using this key to be blocked.

Once an API key is disabled, a key can be reenabled through the **Enable** menu item in the actions menu. It will take approximately 1-2 minutes before an API key can serve query traffic again.

### Delete an API Key

An API key may be permanently deleted from the <Config v="names.product"/> platform. 

:::caution

Once an API key is deleted, it is permanently deleted from the platform and cannot be recovered. 
All clients that use the key will be blocked.

:::

To delete an API key from the API keys management screen:
1. Find the table row for the API key you want to delete.
2. **Open the actions menu** ([meatballs menu](https://uxpickle.com/significance-of-the-three-dots-or-ellipses-in-ui-design/)) for the key.
3. **Select Delete** menu item from the actions menu.

