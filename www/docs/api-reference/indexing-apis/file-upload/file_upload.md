---
id: file-upload
title: File Upload API Definition
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

## File Upload REST Endpoint

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to upload and index documents into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v1/upload</code>

This page describes the details of interacting with this endpoint.

## File Upload Request Details

The File Upload endpoint expects an `multipart/form-data` `POST` request that includes the
following HTTP parameters:

1.  `c` [required]: `customer_id`.

2.  `o` [required]: `corpus_id` into which the document should be indexed.

3.  `d` [optional]: If set to `true`, the server returns the extracted
document that was indexed. 

  Use this parameter when uploading a raw file (pdf, docx) instead of a file 
  that contains a `Document` proto message (pbtxt, pb, json). The caller can 
  inspect the returned extracted `Document` proto message from the raw file.

Apart from these parameters, the servers expect a valid JWT Token in the HTTP
headers.

### Maximum File Upload Size

The maximum file size supported by the server is 10 MB.

### Attach Additional Metadata

You can attach additional metadata to the file by specifying an additional
`doc_metadata` form field, which can contain a JSON string:

```json
doc_metadata='{ "filesize": 1234 }'
```

## Response Codes

The server responds with `200` when the file was uploaded and indexed
successfully. Note that it may still take a few minutes (typically 5-10 mins)
before the document is served.

Some error codes returned by the server are:

-  `400`: An invalid request was sent. For example, one of the required parameters
was missing, or the corpus ID does not exist.

-  `401`: The caller is not authenticated.

-  `403`: The caller is not authorized to add documents to the corpus.

-  `409`: A document already exists in the corpus with the same document ID,
yet the contents of the indexed document are different than the file being
uploaded. Since the indexer is idempotent, the same document (identified by
the document ID) can be uploaded multiple times.
  
  The indexer **does not** support updates yet, so an error is returned when a 
  different document is uploaded for the same document ID. Note that when you 
  upload a raw file, the file name is used as the document ID.

-  `507`: There is no more indexing quota left for the corpus or customer to
index more documents.

## Upload a File with the Command Line

The following command shows how to upload a file `/tmp/instructions.pdf` to
corpus `151` in customer `123456` using `curl`.
<pre>
{`$ jwt=eyJraWQ...
$ curl -H "Authorization: Bearer $jwt" -F file=@/tmp/instructions.pdf \\
    -F doc_metadata='{ "filesize\": 1234 }' \\
    'https://${vars['domains.rest.indexing']}:443/v1/upload?c=123456\&o=151'
`}
</pre>

## Add a Timeout to the File Upload

Adding `grpc-timeout` to the header of your REST call lets you specify how 
long to wait for queries that have the potential to take longer to process. We 
recommend a timeout value of 30 seconds `30S` as typically long enough to 
allow the call to complete successfully.

You can pass this parameter in header as follows:

<pre>
{`$ jwt=eyJraWQ...
$ curl -H "Authorization: Bearer $jwt" -H "grpc-timeout: 30S"  -F file=@/tmp/instructions.pdf \\
    -F doc_metadata='{ "filesize\": 1234 }' \\
    'https://${vars['domains.rest.indexing']}:443/v1/upload?c=123456\&o=151'
`}
<pre>