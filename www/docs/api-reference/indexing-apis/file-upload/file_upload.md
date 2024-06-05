---
id: file-upload
title: File Upload API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

The File Upload API lets you extract text from existing, unstructured 
documents in common file types like PDFs, Microsoft Word, Text, HTML, and 
Markdown. The maximum file size supported by the server is 10 MB.

We recommend the File Upload API when you have not already written your own 
extraction logic. You can attach user-defined metadata at the document level 
for optimizing searches made against your data by 
[formatting your data as JSON](/docs/api-reference/indexing-apis/file-upload/format-for-upload).

:::tip

* Check out our [**interactive API Playground**](/docs/rest-api/upload-file) that enables you
to experiment with this REST endpoint. You can upload a file to a corpus 
directly from your browser or copy the curl for your command line.
* Review the [**Supported File Types**](/docs/api-reference/indexing-apis/file-upload/file-upload-filetypes)
  for the most up-to-date list.

:::

## File Upload REST Endpoint

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to upload and index documents into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v2/corpora/:corpus_key/upload_file</code>

## File Upload Request Details

To upload a file, send a POST request to `/v2/corpora/{corpus_key}/upload_file`, 
where {corpus_key} is the unique identifier for the corpus. The File Upload 
endpoint request expects a `multipart/form-data` request containing the 
following parts:

* `metadata` - (Optional) Specifies a JSON object representing any additional 
  metadata to be associated with the extracted document.
* `file` - Specifies the file that you want to upload.

Vectara processes the uploaded file, and the extracted text and metadata are 
used to create a new document within the corpus. Only one document can be 
uploaded per request.

Apart from these parameters, the servers expect a valid JWT Token in the HTTP
headers.

```json
curl -L -X POST 'https://api.vectara.io/v1/upload?c=123456789&o=5' \
-H 'Content-Type: multipart/form-data' \
-H 'Accept: application/json' \
-H 'x-api-key: zwt_123456' \
-F 'file=@"/path/to/file"'
```
### Set the Document ID

The `Content-Disposition` header lets you specify the Document ID of a file 
when you use the following format: 
  
`Content-Disposition: form-data; name="*file*"; filename="*your_document_id*"` 
  
where `file` is the name of the file, and `filename` is the Document ID that  
you want. The primary purpose of this header is to specify the 
`form-data`, so using `filename` as the Document ID is specific to our 
platform. For more information about Content-Disposition, see 
the [Mozilla documentation on headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition).

### Attach Additional Metadata

You can attach additional metadata to the file by specifying a `doc_metadata` 
form field, which can contain a JSON string:

```json
doc_metadata='{ "filesize": 1234 }'
```

## Response Codes

The server responds with `201` when the file was uploaded and indexed 
successfully, along with a `document` object in the response body that 
contains the assigned `id`, `metadata`, and other relevant information.

:::note

It may still take a few minutes (typically 5-10 mins)
before the document is served.

:::

Some error codes returned by the server are:

-  `400`: Upload files request was malformed.

-  `403`: Permissions do not allow uploading a file to the corpus.
-  `404`: Corpus not found.

-  `409`: A document already exists in the corpus with the same document ID,
yet the contents of the indexed document are different than the file being
uploaded. Since the indexer is idempotent, the same document (identified by
the document ID) can be uploaded multiple times.
  
  The indexer **does not** support updates yet, so an error is returned when a 
  different document is uploaded for the same document ID. Note that when you 
  upload a raw file, the file name is used as the document ID.

-  `507`: There is no more indexing quota left for the corpus or customer to
index more documents.

## Add a Timeout to the File Upload

Adding `grpc-timeout` to the header of your REST call lets you specify how 
long to wait for the calls that have the potential to take longer to process. 
We recommend a timeout value of 30 seconds `30S` as typically long enough to 
allow the call to complete successfully.

You can pass this parameter in header as follows:

<pre>
{`$ jwt=eyJraWQ...
$ curl -H "Authorization: Bearer $jwt" -H "grpc-timeout: 30S"  -F file=@/tmp/instructions.pdf \\
    -F doc_metadata='{ "filesize\": 1234 }' \\
    'https://${vars['domains.rest.indexing']}:443/v1/upload?c=123456\&o=151'
`}
</pre>
