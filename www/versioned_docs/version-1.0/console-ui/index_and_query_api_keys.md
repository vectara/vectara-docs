---
id: index-and-query-api-keys
title: Index and Query API Keys
sidebar_label: Index and Query API Keys
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

Index API Keys and Query API Keys enable user-facing applications to either 
index and query or only query data. The Authorization page lets you view and 
manage the Index API Keys and Query API keys associated with your account.

## Query API Keys

Use Query API Keys for read-only querying operations in potentially insecure 
environments like web browsers or mobile apps. Query API Keys provide the 
least amount of risk because they have a limited scope and do not modify 
account data.

## Index API Keys

Use Index API Keys when you need both read and write access. Because they also 
provide write access, Index API Keys are more powerful than Query API Keys 
and you should treat Index API Keys like passwords and use them with caution 
in production environments.

screenshot of key list

## Create an Index or Query API Key

If you have the necessary permissions, an `Authorization` option appears in 
the sidebar.

1. Click `Authorization` and then select the **Index and Query API Keys** tab.

  ![View API Keys](/img/view_api_keys.png)
1. Click **Create Index and Query API Key** and a dialog appears.
2. Enter the name of the key and select the corpora you want to be 
   able to query.

   ![Create API Key](/img/create_api_key.png)

3. Click **Create**.

You can now start [using the API key](/docs/1.0/learn/authentication/api-key-management#use-an-api-key) 
for your Index or Query operations.