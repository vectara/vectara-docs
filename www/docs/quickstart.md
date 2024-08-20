---
id: quickstart
title: Quick Start
sidebar_label: Quick Start
---

import {Config} from '@site/docs/definitions.md';

New users often find it challenging to get started with a new product and 
fully understand its capabilities. With <Config v="names.product"/>, we've made it simple with our 
Quick Start tutorial. In just a couple minutes, you'll be up and running.

## Step 1. Create a Vectara account

To get started with <Config v="names.product"/>, go to https://console.vectara.com/signup or
click **Get Started Free** at vectara.com. After you make an account, sign in!

You are greeted with this page which lets you try out a sample corpus with 
pre-filled data, or you can create your own corpus and upload data.

![Vectara onboarding homepage](/img/vectara_onboarding_home.png)

## Step 2. Try a sample corpus

Let's use the sample corpus that contains pre-filled data to learn about black 
holes! 

1. Select **Try out a sample corpus**.
2. Vectara creates a sample corpus named `black-holes-sample-data` and adds 
   data to this corpus.
3. The sample corpus appears with queries that you can select and information 
   about the corpus configuration, allowing you to select the **Preview type** 
   and how to open the **Inspector panel**.
 ![Black holes sample corpus](/img/black_holes_sample_corpus.png)
4. Select a query like *What's insides a black hole?* or ask your own question.


## Next steps

Keep asking questions, or upload your own data into a corpus. If you want to 
start using our [API Recipes](/docs/api-recipes), you need
the `customer_id` and `corpus_key` values. <Config v="names.product"/> also sent
you a welcome email with this ID after you created the account.


### View the Corpus Key

In the upper left corner next to the Corpora label, click 
**black-holes-sample-data** to reveal the `corpus_key`, `corpus_id`, and other 
information about the corpus.

![Black holes corpus info](/img/black_holes_corpus_info.png)

### View your Customer ID

After you create an account, you can click your name in the upper-right corner 
to view your Customer ID, email, account size, and more. You need the
Customer ID for many API requests.

![Reveal the Customer ID](/img/view_customer_id.png)

You can click your name in the top, upper-right corner to reveal
the `customer_id`.
