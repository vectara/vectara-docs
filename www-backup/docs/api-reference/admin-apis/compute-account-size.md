---
id: compute-account-size
title: Compute Account Size API Definition
sidebar_label: Compute Account Size API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Compute Account Size API lets you view how much quota you consumed
across the entire account. This capability is useful for administrators who
want to track and monitor usage of multiple accounts. For example, you manage
multiple tenants and notice that your account usage is higher than expected.

You use the [Compute Corpus Size API](/docs/1.0/api-reference/admin-apis/corpus/compute-corpus-size) to determine
that a tenant is over their quota. You decide to revoke the ability for
the tenant to add more data to the corpus or perform more searches by
disabling API keys.

:::tip

Check out our [**interactive API Reference**](/docs/1.0/rest-api/compute-account-size) that lets you experiment with this
endpoint to view the account size.

:::
:::note

The request to compute the account size is an expensive operation.

:::

This request requires the Customer ID parameter and the response includes a
`size` object which is the sum of the number of characters and metadata
characters.

## REST Example

### Compute Account Size REST Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to compute the account size:
<code>https://<Config v="domains.rest.admin"/>/v1/compute-account-size</code>

The API Reference shows the full [Compute Account Size](/docs/1.0/rest-api/compute-account-size) REST definition.

## gRPC Example

You can find the full Compute Account Size gRPC definition at [admin_account.proto](https://github.com/vectara/protos/blob/main/admin_account.proto).
