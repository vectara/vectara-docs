---
id: quickstart
title: Quick Start
sidebar_label: Quick Start
---

import {Config} from '@site/docs/definitions.md';

New users often find it challenging to get started with a new product and
fully understand its capabilities. With <Config v="names.product"/>, we've made it simple with our
Quick Start tutorial. In just a couple minutes, you'll be issuing queries and
getting answers about your data.

## Step 1. Create a Vectara account

To get started <Config v="names.product"/>'s 30-day free trial, go to https://console.vectara.com/signup or
click **Get started** at vectara.com. After you make an account, sign in!

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
4. Select the query _What's insides a black hole?_ and view the results:
   ![Black holes sample corpus](/img/black_holes_query_results.png)
5. Open the **Inspector panel** and select **Request** view the API request,
6. specifically the `query` and `search` details.:

![Inspector panel API request](/img/black_holes_api_request.png)

7. Select the **Response** tab and view the `search_results` array:

![Inspector panel API response](/img/black_holes_api_response.png)

This information is helpful for debugging purposes.

So what's next? Keep asking questions, or upload your own data into a corpus.

:::tip
If you want to start using our [**API Recipes**](/docs/api-recipes), you need
the `customer_id` and `corpus_key` values. <Config v="names.product"/> sent
you a welcome email with the Customer ID after you created the account. You
set the Corpus Key when creating a corpus, but you can also view it in the UI.
:::

### View your Customer ID

After you create an account, you can click your name in the upper-right corner
to view your Customer ID, email, account size, and more. You need the
Customer ID for many API requests.

You can click your name in the top, upper-right corner to reveal
the `customer_id`.

### View the Corpus Key

Next to the Corpora label in the upper left corner, click
**black-holes-sample-data** to reveal the `corpus_key`, `corpus_id`, and other
information about the corpus.

![Black holes corpus info](/img/black_holes_corpus_info.png)
