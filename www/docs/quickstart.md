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
unique employee handbook ready for you to upload into a <Config v="names.product"/> corpus, 
and we'll guide you through the ingestion and question answering process step by step.

## Create a Vectara account

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

You can click your name in the upper-right corner to reveal and copy
the Customer ID.

:::note
 You need the `customer_id` to use the API later. <Config v="names.product"/> also sent 
 you a welcome email with this ID after you created the account.
:::

Now that you have an account, you can create your first corpus and upload 
your first document!

## Create your first corpus

Before you can ask the data about bringing your velociraptor to the 
office, you first need to create a corpus. Think of a corpus as a container 
that includes your uploaded data, and you really want to extract meaningful 
information from this data through queries. In this case, we upload a [PDF file](/img/vectara_employee_handbook.pdf) file 
that contains the pet policy information. After you upload this 
file, <Config v="names.product"/> ingests your data and lets you ask the burning 
question on everyone's mind!

1. Click **Create corpus**.
2. Enter a **Name** and **Description** such as _Employee Handbook_ and _Pet Policy_.
   
      Don't worry about the Filter Attributes for now. You can read 
      about [filter expressions](/docs/common-use-cases/filtering-by-metadata/filter-overview) and 
      edit them later.
3. Click **Create**. 

   The **Corpus ID** displays next to the corpus title **Employee Handbook** in the 
    console. If you use the API later, you need to configure `corpus_id` fields 
    with this value.
   
## Upload your first document  
   
The hard part is over. Now you can get answers about your uploaded data! 
Think about the kind of queries that you or other users could ask about 
the company's pet policies. The main question on everyone's mind is still
_"Can I bring a velociraptor to the office?"_

Now that you created the corpus, you can upload the PDF document 
that contains the pet policy. When you create additional corpora in the 
future, the left menu lets you come back to any corpus for data 
ingestion and search.

1. Click **Employee Handbook** from the left menu, if you decided to explore the UI
   after the previous step.
2. Click the **Data Ingestion** tab.

   We support `.md`, `.pdf`, `.doc`, `.docx`, `.ppt`, `.pptx`, `.txt`, 
   `.html`, `.rtf`, and `.epub` files. Review [supported file types](/docs/api-reference/indexing-apis/file-upload/file-upload-filetypes) for 
   a full list.

3. Select or drag and drop the pet policy document `PDF` into the corpus.

That's it! <Config v="names.product"/> has just ingested this important document!

## Get answers from your uploaded content

Let's take a closer look at the employee handbook you just uploaded. Since <Config v="names.product"/> has 
now ingested the data, you can ask all sorts of questions and receive 
meaningful and relevant results.

1. Select the **Employee Handbook** from list in the left menu.
2. Click the **Search** tab.
3. Ask a question and view a summary of the answer along with additional 
   search results.

   For example, you ask, _"Can I bring a velociraptor to the office?"_ 
   
4. You get a detailed summary that contains citations from the data.

   You also get additional search results that answer your question with 
   additional metadata.

![Ask a Question](/img/ask_a_question.png)

Now you know our policy on bringing velociraptors to the office!

## More questions for you to try

Here are more questions that you can copy and paste into the console to learn 
more about the pet policies:

- How does the company ensure the well-being of alligators in a shared workspace?
- Are there any specific breeds of birds that are prohibited in the office?
- Are there any restrictions on the size or number of bears an employee 
  can bring?
- How does the company handle potential conflicts between different species, 
  such as birds and alligators?

Now you have an understanding of how to upload data into an corpus, ask 
questions, and get meaningful answers from <Config v="names.product"/>. Continue 
gaining more answers and insights from your data, and ingest more data. 
Imagine the amount of time saved because you get quick answers with precise 
summaries!