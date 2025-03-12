---
id: privacy-overview
title: Keeping Your Data Private
sidebar_label: Keeping Your Data Private
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';

At <Config v="names.company"/>, we treat your data with the utmost privacy:
* We do not use your data or searches to train our models.
* We isolate all customer instances from each other.
* We build <Config v="names.product"/> to protect and encrypt each corpus with 
  distinct symmetric keys. If any individual corpus is compromised, the rest 
  remain safe.
* We encrypt your data in-flight using [Transport Layer Security (TLS)](/docs/learn/authentication/auth-overview#transport-layer-security-tls).
* We encrypt your data on disk. [Scale plan users](https://vectara.com/pricing/) can even [create and manage their own encryption keys](encryption).

To learn more about how we approach security at <Config v="names.company"/>, read https://vectara.com/legal/security-at-vectara/.
