---
id: quickstart
title: Quick Start
sidebar_label: Quick Start
---

import {Config} from '@site/docs/definitions.md';

Welcome to <Config v="names.product"/>'s Quick Start tutorial. In just a couple minutes, 
you'll upload this [employee handbook](/img/vectara_employee_handbook.pdf) and begin exploring our 
company's unique pet policy. Have you ever wondered if you can bring a velociraptor 
to work? Why certain birds are allowed for the most random reason? We have part of a 
unique employee handbook ready for you to upload into a <Config v="names.product"/> index, 
and we'll guide you through the ingestion and question answering process step by step.

## Create a Vectara Account

To get started with <Config v="names.product"/>, register an account with us.
1. Go to https://console.vectara.com/signup or click **Get Started Free** 
   at vectara.com
2. Sign up with Google or by filling out the form.
3. Agree to the terms of service and privacy policy.
4. Click **Start Free**.

## View your Customer ID

After you create an account, the <Config v="names.product"/> Console UI appears after 
login. 

![Reveal the Customer ID](/img/view_customer_id.gif)

You can click your name in the top, upper-right corner to reveal 
the Customer ID. The pop-up also has some other options.

:::note
 You need the `customer_id` to use the API later. <Config v="names.product"/> also sent 
 you a welcome email with this ID after you created the account.
:::

Now that you have an account, you can create your first index and upload 
your first document!

## Create your first index

Before you can ask the data about bringing your velociraptor to the 
office, you first need to create an index. Think of an index as a container 
that includes your uploaded data, and you really want to extract meaningful 
information from this data through queries. In this case, we upload a [PDF file](/img/vectara_employee_handbook.pdf) file 
that contains the pet policy information. After you upload this file, <Config v="names.product"/> ingests
 your data and lets you ask the burning question on everyone's mind!

1. Click **Create index**.
2. Enter a **Name** and **Description** such as _Employee Handbook_ and _Pet Policy_.
   
      Don't worry about the Filter Attributes for now. You can read about [filter expressions](/docs/common-use-cases/filtering-by-metadata/filter-overview) later.
3. Click **Create**. 

   The **Index ID** displays next to the index title **Employee Handbook** in the 
    console. If you use the API later, you need to configure `corpus_id` fields 
    with this value.
   
## Upload your first document  
   
The hard part is over. Now you can get answers about your uploaded data! 
Think about the kind of queries that you or other users could ask about 
the company's pet policies. The main question on everyone's mind is still
_"Can I bring a velociraptor to the office?"_

Now that you created the index, you can upload the PDF document 
that contains the pet policy. When you create additional indices in the 
future, the left menu lets you come back to any index for data 
ingestion and search.

1. Click **Employuee Handbook** from the left menu, if you decided to explore the UI
   after the previous step.
2. Click the **Data Ingestion** tab.

   This section lets you upload documents to the index so that <Config v="names.product"/> can 
   ingest them. We support `.md`, `.pdf`, `.doc`, `.docx`, `.ppt`, `.pptx`, `.txt`, 
   `.html`, `.rtf`, `.epub` and more.

3. Select or drag and drop the pet policy document `PDF` into the index.

That's it! <Config v="names.product"/> has just ingested this important document!

## Get answers from your uploaded content

Let's take a closer look at the employee handbook you just uploaded. Since <Config v="names.product"/> has 
now ingested the data, you can ask all sorts of questions and receive 
meaningful and relevant results.

1. Select the **Employee Handbook** from list in the left menu.
2. Click the **Search** tab.
3. Ask a question and view a summary of the answer along witih additional 
   search results.

   For example, you ask, _"Can I bring a velociraptor to the office?"_ 
   
4. You get a detailed summary that contains citations from the data.

   You also get additional search results that answer your question with 
   additional metadata.

![Reveal the Customer ID](/img/ask_a_question.png)

Now you know our policy on bringing velocirators to the office. What else do 
you want to ask?

Think about other queries that would be helpful for a user in this policy 
document. Ask about bringing an alligator into the office. What about a 
bear? What about a bird? We have special rules for birtds. Imagine
the amount of time saved because you get quick answers with precise summaries!

Now you have an understanding of how to upload data into an index, ask 
questions, and get meaningful answers from <Config v="names.product"/>. Continue
continue getting more answers and insights from your data, or ingest more data.