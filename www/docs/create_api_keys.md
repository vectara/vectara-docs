---
id: api-keys
title: API Keys
sidebar_label: Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from './definitions.md';
import {vars} from '@site/static/variables.json';

API Keys allow controlled, anonymous access to running semantic searches on your
corpora. This greatly simplifies integration from public-facing systems such as
websites, by allowing them to embed the API key and directly pass it
to <Config v="names.product"/> when issuing requests. Should a key be compromised,
it can be revoked in minutes, and a new key issued.

:::important

Account owners are responsible for charges incurred through anonymous access to
your account with an API key.

:::

Administrative actions cannot be performed through these keys.

The remainder of this guide walks you through managing and using the API Keys.

## Creating a Key

If you have the necessary permissions you'll see the `API Keys` in the sidebar.
Click on it and you'll see the following page

![API Keys](/img/api_key_create.png)

Click the **Create Key** button to create a new key, the following dialog will
display:

![New API Keys](/img/api_key_new.png)

Enter the name of the key and select the corpora you want to be able to query
using the it. Then, click **Create**.

![API Key corpus](/img/api_key_corpus_associate.png)

You can now start using the key.

## Using a Key

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

## Management

### Disable and Enable

To temporarily disable access to an API key, begin by visiting the API Keys
screen. Select disable by clicking on the action menu (three dots) of the key
you want to disable.

![API Key Disable](/img/api_key_disable.png)

It will take around a minute for query requests using this key to be blocked.

Once disabled, a key can be reenabled through the action menu. It will take a
minute or two before it can serve query traffic again.

### Delete

A key may be permanently deleted through its action menu. Proceed with caution,
once deleted, there is no way to undelete it, and all external systems that
issue queries using the key will be blocked.
