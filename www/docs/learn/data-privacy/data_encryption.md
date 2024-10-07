---
id: encryption
title: Data Encryption
sidebar_label: Data Encryption
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

When you send documents to the
[index API](/docs/api-reference/indexing-apis/indexing) or
[file upload API](/docs/api-reference/indexing-apis/file-upload/file-upload), <Config v="names.product"/> 
indexes both the document text and metadata.

:::note

For the safety of your data, <Config v="names.product"/> always stores your text 
and metadata in an encrypted format. By default this encryption uses <Config v="names.product"/>'s 
own encryption key to encrypt your data (text and/or metadata).

:::

[Pro and Enterprise accounts](https://vectara.com/pricing/) <Config v="names.product"/>
can use your own AWS KMS encryption key so that you have full
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

## Create your AWS KMS key
KMS keys are only available to Pro and Enterprise plan accounts. If you need 
help with setting up your customer-managed key, [reach out to support](https://vectara.com/contact-us/).

To create an AWS KMS key:
1. Go to KMS on the AWS Console
2. Select **Customer Managed Keys**
3. Select **Create key**.
4. Set **Key Type** to "Symmetric" and **Key Usage** to “Encrypt and decrypt”.
5. In the **Advanced options**:
    1. Ensure that "KMS" is selected for the **Key material origin**.
    2. For the regionality:
        1. Both “Single-Region key” and “Multi-Region key” are ok if the key
        is created in the `us-west-2` region.
        2. If the key is not created in `us-west-2`, it needs to be created as
        a "Multi-Region key."  Then, after creating the key, go to the
        **Regionality** tab and create a replica key in `us-west-2` by clicking
        **Create new replica keys**.
    3. Eventually, the created key’s ARN should start with `arn:aws:kms:us-west-2`
6. On the “Define key usage permissions” step of the key creation wizard, you
should see the “Other AWS Accounts” section at the bottom. Enter `941566284283`
as the AWS ID (this is <Config v="names.product"/>'s production AWS account ID).
You are giving permission to <Config v="names.product"/> to use your key to
encrypt and decrypt your indexed documents.
1. On the last “Review” step, update the following section and
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

## Attach your AWS KMS key to your account

In order to get <Config v="names.product"/> to use your key, you must
contact <Config v="names.company"/> Support. Send us the ARN for the KMS key
you created (starting with `arn:aws:kms:us-west-2`).

The <Config v="names.company"/> team will set up the configuration for you. In
the future, you will be able to set the ARN on the <Config v="names.product"/>
Console and these instructions will be updated.

## How the encryption key works

Once your AWS KMS key is configured in the platform, when encrypting your
document text or metadata, <Config v="names.product"/> connects to your KMS
service to generate an encryption key. The encryption key provided by the KMS
is stored in-memory and used to encrypt and decrypt your data. The in-memory 
key expires every hour. In turn, every hour <Config v="names.product"/>  
asks your AWS KMS to generate that encryption key again.
