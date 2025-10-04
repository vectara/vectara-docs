---
id: reset-corpus
title: Reset Corpus API Definition
sidebar_label: Reset Corpus
---

import {vars} from '@site/static/variables.json';

import CodePanel from '@site/src/theme/CodePanel';


The Reset Corpus API lets you reset a corpus, which deletes the
contents of a corpus, but it does not delete the corpus itself.

To reset a corpus, send a POST request to `/v2/corpora/:corpus_key/reset`,
where `corpus_key` is the unique identifier for the corpus. The `corpus_key`
is string that was provided during the corpus creation.

Upon successful completion, space quota consumed by the corpus will be freed.

:::tip

Check out our [**API Reference**](/docs/rest-api/reset-corpus) that lets you experiment with this REST endpoint
to reset corpora.

:::

## REST 2.0 URL

### Reset Corpus REST Endpoint

<Config v="names.product"/> exposes a REST endpoint at the following URL
to reset a corpus:
<code>https://<Config v="domains.rest.admin"/>/v2/corpora/:corpus_key/reset</code>

The API Reference shows the full [Reset Corpus](/docs/rest-api/reset-corpus) REST definition.

## gRPC Example

You can find the full Reset Corpus gRPC definition at [admin.proto](https://github.com/vectara/protos/blob/main/admin.proto).
