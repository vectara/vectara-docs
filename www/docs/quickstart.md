---
id: quickstart
title: Quick Start
sidebar_label: Quick Start
---

import {Config} from '@site/docs/definitions.md';

Let's get you started with <Config v="names.product"/> so that you upload some data 
and get answers to your questions! In this quick start tutorial, you will 
create an account, learn about the UI, create an index, upload your first 
document, and get precise answers!

## Create a Vectara Account

To get started with <Config v="names.product"/>, register an account with us.

1. Go to https://console.vectara.com/signup or click **Get Started Free** 
   at vectara.com
2. Sign up with Google or by filling out the form.
3. Agree to the terms of service and privacy policy.
4. Click **Start Free**.

Now that you created a account, you can begin to explore the product. Let's 
start out with the basics.

## View your Customer ID

After you create an account, the <Config v="names.product"/> Console UI appears after 
login. You can click your name in the top, upper-right corner to reveal 
the Customer ID.

![Hover for the Account ID](/img/vectara_account_id.gif)

:::caution
 You need the `customer_id` to use the API later. <Config v="names.product"/> also sent 
 you a welcome email with this ID after you created the account.
:::

## Explore the Vectara Console

Let's a take a look at the main menu on the left side. This menu helps you 
navigate details about your account and uploaded data.

:::note

<Config v="names.product"/> releases new features frequently, so this screenshot might 
have slight differences to the live product such as labels.

:::

![Vectara Console UI](/img/console_home.png)

This menu has a few sections:

### Overview

* Displays a Welcome message
* Provides links to this documentation site and the community forum.

### Corpora

* Lists your corpora (also known as indices, which are containers for your 
  data). 
* This list is empty since you just created an account. Once you create additional
corpora, you can easily access them from this list.
* Searches existing index names and descriptions once you begin creating them
* Click **Take a tour** in the upper-right corner to view an interactive 
  demo of the UI.
* Click **Create index** in the upper-right corner to get started with index creation.

### Authentication

The Authentication menu contains tabs for **User** and **App Client**.

* Displays your user information
* Creates additional users for your account
* Sets these new users as Account Admin, Index Admin, or Billing Admin
* Creates an app client
* Configures OAuth API authentication.

### API Keys

* Displays your API keys
* Creates API keys to rapidly build prototypes.

### Billing

The Billing tab contains tabs for **Current Usage**, **Choose Your Plan**, and **Overview**.

* Displays your current product usage
* Describes the pricing plans and features for Growth and Scale
* Displays billing overview information
* Provides the option to delete your account.

## Create your first index

Before you can ask questions about your data, you need to ingest your data into 
Vectara. Your first step is to create a place for storing the data, called an 
index. Think of an index as a container that includes your uploaded data, 
and you really want to extract meaningful information from this data through 
queries. Now you decide what kind of documents you want to ingest into an 
index. 

Here are some ideas to let you see <Config v="names.product"/> in action:

* Employee handbook
* Product manuals
* Legal contracts
* Research papers
* Training materials
* Financial reports
* Government regulations.

These types of documents contain very nuanced information where semantic search 
really shines! Think about what information takes a long time
for a user to locate manually in a large volume. Unless you know exact keywords
and section titles, you might struggle to find the exact information you need 
for your new job, a complex machine repair, conducting research, and so on.

In this example, you decided to upload an employee handbook because it contains
lots of nuanced information about employee benefits. 

![Create Corpus](/img/create_corpus.gif)

1. Click **Create index**.
2. Enter a **Name** and **Description** such as _Employee Handbook_ and _The employee 
   handbook from HR_.
3. (Optional) Add Filter Attributes to the index.
   
   Learn about [filter expressions](/docs/common-use-cases/filtering-by-metadata/filter-overview) if you want to use them in the future.
4. Click **Create**. 

   The **Corpus ID** displays next to the index title **Employee Handbook** in the 
    console. You need the `corpus_id` if you want to use the API later.
   
   The **Data Ingestion** tab lets you upload documents to the index so that <Config v="names.product"/> can 
   ingest them. We support `.md`, `.pdf`, `.doc`, `.docx`, `.ppt`, `.pptx`, `.txt`, 
   `.html`, `.rtf`, `.epub` and more.

   :::note
   
   Review the [**supported file type list**](https://docs.vectara.com/docs/api-reference/indexing-apis/file-upload/file-upload-filetypes) as we continue 
   to add supported raw document formats.

   :::

5. Select or drag and drop files to upload them to the index.

Now you can get some answers about your data! Think about the kind of queries 
that you or other users could ask about a particular document type.

## Get answers from your uploaded content

Let's take a closer look at the employee handbook you just uploaded. Since <Config v="names.product"/> has 
now also indexed the data, you can ask all sorts of questions and receive 
meaningful and relevant results.

![Ask a Question](/img/ask_a_question.gif)

1. Select the **Employee Handbook** from list in the left menu.
2. Click the **Search** tab.
3. Ask a question and view a summary of the answer along witih additional 
   search results.

   For example, you ask, _"What are my health insurance options?"_ 
   
4. You get a detailed a Summary that contains citations along with search results 
   that answer your question with additional metadata.

Think about other queries that would be helpful for a user and imagine
the amount of time saved because you get quick answers with precise summaries!

Now that you have an understanding of how to upload data into an index, ask 
questions, and get meaningful answers from <Config v="names.product"/>, continue getting 
more answers and insights from your data.