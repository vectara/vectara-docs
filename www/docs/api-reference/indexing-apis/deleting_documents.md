---
id: deleting-documents
title: Deleting Documents
sidebar_label: Deleting Documents
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

## Endpoint Address

<Config v="names.product"/> exposes a REST endpoint at the following URL
to delete content from a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/delete-doc</code>
This page describes the details of interacting with this endpoint.

A request to delete a document from a corpus consists of three key pieces of information:
the customer ID, the corpus ID, and the document ID.

```protobuf
// Request to delete a document from an index.
message DeleteDocumentRequest {
  // The Customer ID to issue the request for.
  int64 customer_id = 1;
  // The Corpus ID that contains the document.
  int64 corpus_id = 2;
  // The Document ID to be deleted.
  string document_id = 3;
}
```

The reply from the server consists of nothing yet. Note that while the operation is
not completely synchronous (the document may still be returned in query results),
the platform typically removes the document within a few seconds, though it may
take longer for Growth accounts.

The server returns [gRPC status codes](https://grpc.github.io/grpc/core/md_doc_statuscodes.html).
For example:

- `INTERNAL`: An internal error code indicates a failure inside the platform, and an immediate
retry may not succeed.
- `UNAVAILABLE`: The service is temporarily unavailable, and the operation should be retried,
preferably with a backoff. Note that the deletion operation is idempotent, so it is fine to re-apply.

### Example

The code snippet below illustrates how to delete a document from a corpus. For information
on how to get the call credentials and metadata, please consult
[The OAuth 2.0 documentation](authentication.md).

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