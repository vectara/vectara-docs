---
id: file-upload
title: File Upload API Definition
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import {vars} from '@site/static/variables.json';
import {Config} from '@site/docs/definitions.md';

The File Upload API enables you to extract text from unstructured documents in 
common file types like PDFs, Microsoft Word, Text, HTML, and Markdown. It also 
supports extracting table data from PDFs, allowing for improved analysis and 
querying of structured tabular data. Each file you upload can be up to 10 MB 
in size.

We recommend the File Upload API when you have not already written your own
extraction logic. You can attach user-defined metadata at the document level
for optimizing searches made against your data by
[formatting your data as JSON](/docs/api-reference/indexing-apis/file-upload/format-for-upload).

:::tip

- Check out our [**interactive API Reference**](/docs/rest-api/upload-file) that enables you
  to experiment with this REST endpoint. You can upload a file to a corpus
  directly from your browser or copy the curl for your command line.
- Review the [**Supported File Types**](/docs/api-reference/indexing-apis/file-upload/file-upload-filetypes)
  for the most up-to-date list.

:::

## File Upload REST Endpoint

<Config v="names.product"/> exposes an HTTP endpoint at the following URL
to upload and index documents into a corpus:
<code>https://<Config v="domains.rest.indexing"/>/v2/corpora/:corpus_key/upload_file</code>


:::caution

As part of the [**Vectara REST API 1.0 to 2.0 migration**](/docs/migration-guide-api-v2), every existing `corpus_id` 
has been converted with an appended ID to create the `corpus_key`. This 
`corpus_key` is now the main identifier for each corpus. When you create a new 
corpus, you specify a custom `corpus_key`.

:::

## File Upload Request Details

To upload a file, send a POST request to `/v2/corpora/:corpus_key/upload_file`, 
where `corpus_key` is the unique identifier for the corpus. The File Upload
endpoint request expects a `multipart/form-data` request containing the
following parts:

- `metadata` - (Optional) Specifies a JSON object representing any additional
  metadata to be associated with the extracted document.
- `chunking_strategy` (Optional) Specifies whether to split the document into 
  chunks during ingestion. If not set, the platform defaults to sentence-based 
  chunking, where each chunk contains typically one full sentence. Set the `type` 
  as `max_chars_chunking_strategy` and then specify the `max_chars_per_chunk` to 
  the number of characters per chunk like `512` or `1024`. Smaller chunks may improve granularity 
  but can lead to excessive latency, especially in applications with high 
  document volumes or large corpora.
  Example: `'chunking_strategy={"type":"max_chars_chunking_strategy","max_chars_per_chunk":1024};type=application/json'`
- `table_extraction_config` (Optional): A JSON object specifying whether to extract 
  tables from the PDF. By default, tables are not extracted.
  Example: `'table_extraction_config={"extract_tables":true};type=application/json'`
- `file` - Specifies the file that you want to upload.
- `filename` - Specified as part of the `file` field with the file name that you 
  want to associate with the uploaded file.

Vectara processes the uploaded file, and the extracted text and metadata are
used to create a new document within the corpus. Only one document can be
uploaded per request.

Apart from these parameters, the servers expect a valid JWT Token in the HTTP
headers.

```json
curl -L -X POST 'https://api.vectara.io/v2/corpora/:corpus_key/upload_file' \
-H 'Content-Type: multipart/form-data' \
-H 'Accept: application/json' \
-H 'x-api-key: zwt_123456' \
-F 'metadata={"key": "value"};type=application/json' \
-F 'file=@/path/to/file/file.pdf;filename=desired_filename.pdf'
```

### Filenames with Non-ASCII Characters

When uploading files with non-ASCII (non-English) characters, such as Russian 
or Chinese, ensure that the filename is URL encoded. API v2 follows web 
standards which require URL-encoded file names.

### Set the Document ID

The `Content-Disposition` header lets you specify the Document ID of a file
when you use the following format:

`Content-Disposition: form-data; name="*file*"; filename="*your_document_id*"`

where `file` is the name of the file, and `filename` is the Document ID that  
you want. The primary purpose of this header is to specify the
`form-data`, so using `filename` as the Document ID is specific to our
platform. For more information about Content-Disposition, see
the [Mozilla documentation on headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition).

### Uploading PDFs with Tables

Set the `table_extraction_config` field to `true` to extract table data from a 
PDF. This feature is particularly useful for financial reports like 10-Q, 
10-K, and S1 filings. With table extraction enabled, you can query specific 
table cells using the Query API.

:::caution
This feature does not support extracting data from scanned-in images of tables.
:::


### Attach Additional Metadata

You can attach additional metadata to the file by specifying a `metadata`
form field, which can contain a JSON string:

```json
metadata='{ "filesize": 1234 }'
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

- `201`: The extracted document has been parsed and added to the corpus.
- `400`: Upload files request was malformed.

- `403`: Permissions do not allow uploading a file to the corpus.
- `404`: Corpus not found.

- `409`: A document already exists in the corpus with the same document ID,
  yet the contents of the indexed document are different than the file being
  uploaded. Since the indexer is idempotent, the same document (identified by
  the document ID) can be uploaded multiple times.

The indexer **does not** support updates yet, so an error is returned when a
different document is uploaded for the same document ID. Note that when you
upload a raw file, the file name is used as the document ID.

- `507`: There is no more indexing quota left for the corpus or customer to
  index more documents.
