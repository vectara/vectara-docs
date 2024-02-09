---
id: personal-api-key
title: Personal API Keys
sidebar_label: Personal API Key
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

A Personal API Key provides a broad range of functionality related to user and 
corpus administration, including creating and listing corpora, reading usage 
data, executing queries, indexing, and more. The Authorization page lets you 
view the Personal API key that was automatically generated with your new 
Vectara account. This page also allows you to disable and regenerate a new 
Personal API key.

![View the Personal API Key](/img/view_personal_api_key.png)

1. Select the **Personal API Key** tab.
2. Click the copy icon.
3. Paste your Personal API key in a secure location. It is as private and 
sensitive as a password.

## Disable or Regenerate a Personal API Key

The Actions menu lets you disable or regenerate the Personal API key.

![View the Personal API Key](/img/personal_api_key_actions.png)

## Personal API Key Limitations

While Personal API Keys offer a wide range of functionality, they have some 
limitations and **do not** let you perform the following tasks:
* Delete a Vectara account
* Validate a Vectara account registration
* Transfer account ownership
* Read or set any sensitive billing data such as payment method and addresses
* Create and delete users*

OAuth 2.0 remains the required method for these operations due to its advanced 
security features. This distinction ensures that more sensitive actions are 
safeguarded by a higher level of authentication and authorization.

