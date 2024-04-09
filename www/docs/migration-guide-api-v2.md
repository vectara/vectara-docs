---
id: migration-guide-api-v2
title: REST API 1.0 to 2.0 Migration
sidebar_label: Migration Guide from REST API 1.0 to 2.0
---
import {Config} from '@site/docs/definitions.md';

This guide provides information about migrating from the Vectara 1.0.0 REST 
API to 2.0.0. You will need to consider the changes to the base URL, 
authentication, endpoints, as well as changes to requests and responses.

:::note

These changes do not affect gRPC.

:::

## Base URL Changes

* REST API v1: https://api.vectara.io
* REST API v2: https://api.vectara.com/v2

**Action item:** pdate all API requests to use the new base URL for v2.
