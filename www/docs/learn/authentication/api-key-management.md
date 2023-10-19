---
id: api-key-management
title: API Key Management
sidebar_label: API Key Management
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

API Keys allow controlled, anonymous access to running semantic searches on your
corpora. This greatly simplifies integration from public-facing systems like
websites. You can easily [create an API key](/docs/console-ui/manage-api-access#create-an-api-key) and then simp embed the API key and 
directly pass it to <Config v="names.product"/> when issuing requests. If a key 
is compromised, you can quickly revoke the key and 
replace it in minutes.

:::important

Account owners are responsible for charges incurred through anonymous access to
your account with an API key.

:::

You can use API keys for querying and indexing operations, but not at this 
time for administrative operations such as creating or deleting corpora.

:::warning

:lock: Always keep your API Keys and OAuth tokens private. Do not share them 
through email, Slack, Discord, forums, or other public channels because it 
can lead to unauthorized access. Treat these keys with the same 
confidentiality as your personal credentials. 

:::

## Use an API Key

To use an API key, pass it using the `x-api-key` header request.

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

## Disable and Enable API Keys

To temporarily disable access to an API key, begin by visiting the API Keys
screen. Select disable by clicking on the action menu (three dots) of the key
you want to disable.

![API Key Disable](/img/api_key_disable.png)

It will take around a minute for query requests using this key to be blocked.

Once disabled, a key can be reenabled through the action menu. It will take a
minute or two before it can serve query traffic again.

## Delete API Keys

A key may be permanently deleted through its action menu. 

:::caution

Once deleted, there is no way to undelete it, and all external systems that
issue queries using the key will be blocked.

:::