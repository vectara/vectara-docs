---
id: auth-overview
title: Authentication and Authorization
sidebar_label: Authentication and Authorization
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

## Authentication

In <Config v="names.product"/>, robust authentication and authorization methods are 
in place to secure your data and operations. All <Config v="names.product"/> APIs are authenticated. 
Indexing and Search APIs can be authenticated via [API Keys](/docs/learn/authentication/api-key-management)
however, Admin actions (creating/deleting corpora) must be done via
[OAuth 2.0](/docs/learn/authentication/oauth-2).

## Authorization
For details of <Config v="names.product"/>'s authorization/permissions model,
see the [RBAC authorization](/docs/learn/authentication/role-based-access-control) page