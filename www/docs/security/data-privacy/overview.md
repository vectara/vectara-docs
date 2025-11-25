---
id: privacy-overview
title: Security and data privacy
sidebar_label: Security and data privacy
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import CodePanel from '@site/src/theme/CodePanel';


At <Config v="names.company"/>, we treat your data with the utmost privacy:
* We do not use your data or searches to train our models.
* We isolate all customer instances from each other.
* We build <Config v="names.product"/> to protect and encrypt each corpus with 
  distinct symmetric keys. If any individual corpus is compromised, the rest 
  remain safe.
* We encrypt your data in-flight using Transport Layer Security (TLS).
* We encrypt your data on disk. [Users](https://vectara.com/pricing/) can even 
  create and manage their own encryption keys.

To learn more about how we approach security at <Config v="names.company"/>, read https://vectara.com/legal/security-at-vectara/.

## Transport Layer Security (TLS)

All communication to and from the API endpoints take place using an encrypted
communication channel (TLS). gRPC handles configuration of the TLS channel
using [channel credentials](https://grpc.io/docs/guides/auth/#credential-types),
and you should refer to their documentation.

### Configure channel credentials

The following code snippets show how to configure channel credentials using the
default set of root certificates installed on your system, which is usually
sufficient.

<Tabs
  defaultValue="java"
  values={[
    { label: 'Java', value: 'java', },
    { label: 'Python', value: 'py', },
    { label: 'PHP', value: 'php', },
  ]
}>
<TabItem value="php">

<CodePanel snippets={[{language: "php", code: `\$channel_creds = Grpc\\ChannelCredentials::createSsl();`}]} title="Code Example" layout="stacked" />

</TabItem>
<TabItem value="py">
<CodePanel snippets={[{language: "text", code: `{\`# Allow the gRPC runtime to load root certificates from the default location.
# This is sufficient for most cases.
channel_creds = grpc.ssl_channel_credentials()
grpc.secure_channel("\${vars['domains.grpc.serving']}:443", channel_creds)
\`}`}]} title="Code Example" layout="stacked" />

</TabItem>
<TabItem value="java">

<CodePanel snippets={[{language: "text", code: `{\`NettyChannelBuilder
    .forAddress("\${vars['domains.grpc.serving']}", 443)
    .sslContext(GrpcSslContexts.forClient()
        .trustManager(null)  // load root certificates from the default location
        .build())
    .build();
\`}`}]} title="Code Example" layout="stacked" />

</TabItem>
</Tabs>

## Data encryption

When you send documents to the index API or file upload API, <Config v="names.product"/> 
indexes both the document text and metadata.

:::note

For the safety of your data, <Config v="names.product"/> always stores your text 
and metadata (except filterable metadata fields) in an encrypted format. By default this encryption uses <Config v="names.product"/>'s 
own encryption key to encrypt your data (text and/or metadata).

:::

Use your own AWS KMS encryption key so that you have full
control over how your data is encrypted. If you would like to do so, follow
the instructions below.

:::caution

If you use your own key and at some point disable your AWS KMS key, there is no
way to encrypt or decrypt your data so your corpus will not be queryable by
anyone until you enable the key back. 

You can disable and enable your KMS key
to resume service but you should be very careful when removing your AWS KMS key
as this is a permanently destructive action. If you remove the AWS KMS key
entirely, neither you nor <Config v="names.company"/> will be able to recover
that encryption key, which also means any <Config v="names.product"/> corpora
depending on that key will be inaccessible forever.

:::

### Create your AWS KMS key

If you need help with setting up your customer-managed key, 
[reach out to support](https://vectara.com/contact-us/).

To create an AWS KMS key:
1. Go to KMS on the AWS Console
2. Select **Customer Managed Keys**
3. Select **Create key**.
4. Set **Key Type** to "Symmetric" and **Key Usage** to "Encrypt and decrypt".
5. In the **Advanced options**:
    1. Ensure that "KMS" is selected for the **Key material origin**.
    2. For the regionality:
        1. Both "Single-Region key" and "Multi-Region key" are ok if the key
        is created in the `us-west-2` region.
        2. If the key is not created in `us-west-2`, it needs to be created as
        a "Multi-Region key."  Then, after creating the key, go to the
        **Regionality** tab and create a replica key in `us-west-2` by clicking
        **Create new replica keys**.
    3. Eventually, the created key's ARN should start with `arn:aws:kms:us-west-2`
6. On the "Define key usage permissions" step of the key creation wizard, you
should see the "Other AWS Accounts" section at the bottom. Enter `941566284283`
as the AWS ID (this is <Config v="names.product"/>'s production AWS account ID).
You are giving permission to <Config v="names.product"/> to use your key to
encrypt and decrypt your indexed documents.
1. On the last "Review" step, update the following section and
update the ARN from `arn:aws:iam::941566284283:root`
to `arn:aws:iam::941566284283:role/prod-eks2021021409582096910000000b`

The key should look like the following:
<CodePanel snippets={[{language: "json", code: `{
    "Sid": "Allow use of the key",
    "Effect": "Allow",
    "Principal": {
        "AWS": "arn:aws:iam::941566284283:role/prod-eks2021021409582096910000000b"
    },
    "Action": [
        "kms:Encrypt",
        "kms:Decrypt",
        "kms:ReEncrypt*",
        "kms:GenerateDataKey*",
        "kms:DescribeKey"
    ],
    "Resource": "*"
}`}]} title="Code Example" layout="stacked" />

The final step to creating the AWS KMS key to finish the key creation.

### Attach your AWS KMS key to your account

In order to get <Config v="names.product"/> to use your key, you must
contact <Config v="names.company"/> Support. Send us the ARN for the KMS key
you created (starting with `arn:aws:kms:us-west-2`).

The <Config v="names.company"/> team will set up the configuration for you. In
the future, you will be able to set the ARN on the <Config v="names.product"/>
Console and these instructions will be updated.

### How the encryption key works

Once your AWS KMS key is configured in the platform, when encrypting your
document text or metadata, <Config v="names.product"/> connects to your KMS
service to generate an encryption key. The encryption key provided by the KMS
is stored in-memory and used to encrypt and decrypt your data. The in-memory 
key expires every hour. In turn, every hour <Config v="names.product"/>  
asks your AWS KMS to generate that encryption key again.

## Data egress

This section provides a high-level overview of how to export and retrieve 
data from Vectara using the available API capabilities.

Vectara provides programmatic access to retrieve your data through REST APIs. 
While the platform is optimized for search and retrieval operations, it offers 
comprehensive methods to access your documents, configurations, and usage 
data. Data export requires iterating through individual resources as bulk export operations are not currently available.

### What can be exported

- **Individual documents** with metadata
- **Document lists** for corpus inventory
- **Document parts** (text chunks) with positioning metadata
- **Tables and images** extracted during processing
- **Custom metadata** associated with documents

### What cannot be exported
- Original uploaded files (PDFs, Word docs, and so on.)
- Raw embeddings/vectors
- System-generated indexes
- Deleted content (permanently removed)

### Data export best practices

#### API-based retrieval

The primary method for data export is through Vectara's REST API. The process 
involves the following steps:
1. [List corpora](/docs/rest-api/list-corpora).
2. [List documents in each corpora](/docs/rest-api/list-corpus-documents).
3. [Download documents from each corpora](/docs/rest-api/get-corpus-document).

### Implementation Overview

The above three API calls can be used to systematically download all your 
indexed documents. Here's the general approach:

```pseudocode
// Step 1: Get all corpora
  corpora := GET /v2/corpora

// Step 2 & 3: Iterate through each corpus and download documents
  for each corpus in corpora:
      documents := GET /v2/corpora/{corpus.key}/documents

      for each document in documents:
          document_content := GET /v2/corpora/{corpus.key}/documents/{document.id}
          // Save document_content locally
```

