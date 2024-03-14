---
id: deleting-documents
title: Delete Documents API Definition
sidebar_label: Delete Documents API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

The Delete Documents API lets you delete a document from a corpus. To verify 
that the document no longer exists in the corpus, use the List Documents endpoint.

:::tip

Check out our [**interactive API Playground**](/docs/rest-api/delete) that enables you
to experiment with this REST endpoint. You can delete a file from a corpus
directly from your browser or copy the curl for your command line.

:::

### Delete Document Request and Response

A request to delete a document from a corpus consists of three key pieces of 
information:
* `customer_id`
* `corpus_id`
* `document_id`

The reply on successful deletion is `{}`. 


## REST Example

### Delete Documents Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to delete content from a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/delete-doc</code>

The API Playground shows the full [Delete Documents REST definition](/docs/rest-api/delete).

## gRPC Example

You can find the Delete Document gRPC definition at [common.proto](https://github.com/vectara/protos/blob/main/common.proto).

The reply from the server consists of nothing yet. Note that while the 
operation is not completely synchronous (the document may still be returned 
in query results), the platform typically removes the document within a few 
seconds, though it may take longer for Growth accounts.

### Java and Python Examples

The code snippet belows illustrates how to delete a document from a corpus in Java or Python. For information
on how to get the call credentials and metadata, please consult
[The OAuth 2.0 documentation](/docs/learn/authentication/oauth-2).

<Tabs
  defaultValue="java"
  values={[
    { label: 'Java', value: 'java', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="py">

<pre>
{`# Create the document deletion request.
request = common_pb2.DeleteDocumentRequest()
request.customer_id = customer_id
request.corpus_id = _CORPUS_ID
request.document_id = "en.wikipedia.org/wiki/California"

# Create the gRPC stub.
stub = services_pb2_grpc.IndexServiceStub(
  grpc.secure_channel("${vars['domains.grpc.indexing']}:443", grpc.ssl_channel_credentials()))

# Send the request to the server.
response = stub.Delete(request,
                       credentials=call_credentials,
                       metadata=[('customer-id-bin', packed_customer_id)])
`}
</pre>

</TabItem>
<TabItem value="java">

```java
indexingStub.withCallCredentials(credentials(tokenSupplier.get().getOrDie()))
    .withDeadlineAfter(30, TimeUnit.SECONDS)    // Always set a deadline.
    .delete(
        DeleteDocumentRequest
            .newBuilder()
            .setCustomerId(customerId)
            .setCorpusId(corpusId)
            .setDocumentId("en.wikipedia.org/wiki/California")
            .build());
```

</TabItem>
</Tabs>

### gRPC Status Codes

The server returns the following [gRPC status codes](https://grpc.github.io/grpc/core/md_doc_statuscodes.html):

- `INTERNAL`: An internal error code indicates a failure inside the platform, 
  and an immediate retry may not succeed.
- `UNAVAILABLE`: The service is temporarily unavailable, and the operation should be 
  retried, preferably with a backoff. 
  
  :::note
  The deletion operation is idempotent, so it is fine to re-apply.
  :::
