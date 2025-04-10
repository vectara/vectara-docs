---
id: api-access-overview
title: API Authorization Methods
sidebar_label: API Authorization Methods
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';

Vectara provides a comprehensive authorization system that accommodates a wide 
range of use cases and caters to different development environments. 
Your Generative AI journey may be in the early stages of 
exploration and prototyping, or a more advanced production deployment. Our 
authentication methods include the Personal API Key, Index API Keys, 
Query API Keys, and OAuth 2.0 Tokens.

The Authorization page lets you manage Personal, Index, and Query API Keys, and
OAuth App clients. The [Authentication Overview section](/docs/learn/authentication/auth-overview) 
provides more details about how to [manage OAuth 2.0 tokens](/docs/learn/authentication/oauth-2) and [use API Keys](/docs/learn/authentication/api-key-management). 

## Personal API Key

The Personal API Key lets you perform administrative tasks including creating, 
deleting, and listing corpora, managing API keys for accessible corpora, 
reading usage data, updating corpora filters, executing queries, and indexing.

:::note

A Personal API Key inherits the permissions of its associated user account.

:::

## Query API Keys

Query API Keys are recommended for read-only querying operations and are 
designed for embedding in code that runs in potentially insecure environments 
like web browsers or mobile apps. Query API Keys provide the least amount of 
risk because they have a limited scope and do not modify account data.

## Index API Keys

Index API Keys offer a practical solution for development and testing phases 
for when you need read and write access. Because they also provide write 
access, Index API Keys are more powerful than Query API Keys and should be 
treated like passwords and used with caution in production environments.

## OAuth 2.0 Tokens

OAuth 2.0 provides the most secure authentication method for production 
environments. Capabilities like automated token expiration provide inherent 
benefits over API Keys.

## Identify API Key by Prefixes

For ease of identification, the API Key types each have a specific prefix:

* Personal API Keys begin with `zut_`
* Query API Keys begin with `zqt_`
* Index API Keys begin with `zwt_`
