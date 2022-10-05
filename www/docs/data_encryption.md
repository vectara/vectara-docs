---
id: encryption
title: Data Encryption
sidebar_label: Data Encryption
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from './definitions.md';

## Overview

When you send documents to the
[index API](/docs/indexing-apis/indexing), <Config v="names.product"/> will
receive both document text and metadata information to be indexed. If you
choose the “textless” option for
[corpus creation](/docs/admin-apis/create-corpus), then document text will be
indexed (converted into vectors) but not stored anywhere in the platform.
Metadata, however, is always stored. For the safety of your
data, <Config v="names.product"/> always stores your text and metadata in an
encrypted format. By default this encryption will
use <Config v="names.product"/>'s own encryption key to encrypt your data
(text and/or metadata).

However, <Config v="names.product"/> also allows you to
use your own AWS KMS encryption key also so that you have full control over how
your data is encrypted.  If you would like to do so, follow the instructions
below.

:::caution

If you use your own key and at some point disable your AWS KMS key, there is no
way to encrypt or decrypt your data so your corpus will not be queryable by
anyone until you enable the key back. You can disable and enable your KMS key
to resume service but you should be very careful when removing your AWS KMS key
as this is a permanently destructive action. If you remove the AWS KMS key
entirely, neither you nor <Config v="names.company"/> will be able to recover
that encryption key, which also means any <Config v="names.product"/> corpora
depending on that key will be inaccessible forever.

:::

## Create your AWS KMS key
To create an AWS KMS key:
1. Go to KMS on the AWS Console
2. Select “Customer Managed Keys”
3. Select the “Create key” button
4. Ensure “Key Type” is “Symmetric” and “Key Usage” is “Encrypt and decrypt”.
5. In the “Advanced options”:
    1. Make sure “KMS” is selected for the “Key material origin”.
    2. For the regionality:
        1. Both “Single-Region key” and “Multi-Region key” are ok if the key
        is created in the `us-west-2` region.
        2. If the key is not created in `us-west-2`, it needs to be created as
        a "Multi-Region key."  Then, after creating the key, go to the
        “Regionality” tab and create a replica key in `us-west-2` by clicking
        “Create new replica keys”.
    3. Eventually created key’s ARN should start with `arn:aws:kms:us-west-2`
6. On the “Define key usage permissions” step of the key creation wizard, you
should see the “Other AWS Accounts” section at the bottom. Enter `941566284283`
as the AWS ID (this is <Config v="names.product"/>'s production AWS account ID.
You are giving permission to <Config v="names.product"/> to use your key to
encrypt and decrypt your indexed documents.
7. On the last “Review” step, update the following section and
update the ARN from `arn:aws:iam::941566284283:root`
to `arn:aws:iam::941566284283:role/prod-eks2021021409582096910000000b`

The key should look like the following:
```json
{
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
}
```

The final step to creating the AWS KMS key to finish the key creation.

## Attach your key to your account
In order to get <Config v="names.product"/> to use your key, you must currently
contact <Config v="names.product"/> to use your key Support and send us the ARN
for the KMS key you created (starting with `arn:aws:kms:us-west-2`).
The <Config v="names.product"/> team will set it up for you. In the future, you
will be able to set the ARN on the The <Config v="names.product"/> Console and
these instructions will be updated.

## How does it work
Once your AWS KMS key is configured in the platform, when encrypting your
document text or metadata, <Config v="names.product"/> will connect to your KMS
service to generate an encryption key. The encryption key provided by the KMS
is stored in-memory and used to encrypt and decrypt your data. In-memory key
will expire every hour.  In turn, every hour <Config v="names.product"/> will
ask your AWS KMS to generate that encryption key again.

