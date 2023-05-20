---
id: privacy-overview
title: Privacy Overview
sidebar_label: Overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import {Config} from '@site/docs/definitions.md';

At <Config v="names.company"/>, we treat your data with the utmost privacy:
* The data you upload and the searches you and your users perform are not used to train <Config v="names.product"/>'s models.
* Your data is encrypted in flight using [TLS](/docs/tls)
* The <Config v="names.product"/> system is built such that each corpus is individually encrypted with a separate symmetic key, so if any individual corpus is somehow compromised, the rest remain safe
* You data is encrypted on disk and [Scale plan users](https://vectara.com/pricing/) can even [bring their own encryption keys](encryption)
* All customer instances are isolated from one another
