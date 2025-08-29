---
id: manage-usage
title: Manage Usage
sidebar_label: Manage Usage
---

import CodePanel from '@site/src/theme/CodePanel';

The Usage page provides a single place to track plan quotas, current 
consumption, and any charges for the selected period. Use it to understand 
how close you are to plan limits and to plan capacity before workloads are 
impacted. For the latest information on Vectara plans, such as comparisons and 
FAQs, see our [Pricing](https://www.vectara.com/pricing) page.

1. Access the [Vectara Console](https://console.vectara.com/console).
2. Select the [**Usage**](https://console.vectara.dev/console/usage/resource-usage) tab.

At the top of the page you’ll see the reporting window, for example:

**Period from 05‑Aug‑2025 to 31‑Aug‑2025**

Usage numbers reflect activity within this window. Resource usage numbers 
might be delayed by up to four hours.

## Resource usage

The table summarizes each tracked resource with its current usage, plan base 
quota, and percentage consumed:

### Data storage
Shows used storage out of your plan base quota (like 119.2 of 100 MB).

### GPT‑4 generative requests
Counts generative API calls against the plan base quota (like 12,853 of 
20,000 requests). The percentage used appears beneath the count.

### Corpora
Tracks how many corpora are provisioned with a percentage used.

### Users
Tracks the number of users provisioned in your tenant with a percentage used.

:::tip
When a metric approaches its limit, consider archiving unused data, reducing 
request volume, or working with your admin to adjust plan capacity.
:::