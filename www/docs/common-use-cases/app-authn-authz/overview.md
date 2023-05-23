---
id: auth-overview
title: Authentication Overview
sidebar_label: Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

## Authentication

All <Config v="names.product"/> APIs are authenticated.  Indexing and Search
APIs can be authenticated via [API Keys](/docs/common-use-cases/app-authn-authz/api-keys)
however, Admin actions (creating/deleting corpora) must be done via
[OAuth 2.0](/docs/api-reference/auth-apis/oauth-2).

## Authorization
For details of <Config v="names.product"/>'s authorization/permissions model,
see the [authorization](authorization) page