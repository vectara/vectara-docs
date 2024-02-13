---
id: creating-a-corpus
title: Create a Corpus
---

To begin searching your data, you first have to create a corpus. A corpus 
is a container where you upload all your data to be ingested and grouped 
together in a single location for querying.

1. To get started, navigate to the [Console Overview](https://console.vectara.com/overview).

2. On the left sidebar, click **Corpora**. This 
   will open an overview of the corpora you have created. It will be empty 
   if this is your first time accessing the console.

3. Click **Create corpus** and a dialog box appears.
4. Enter the name and description of the corpus.
5. Select an Embedding Model, such as Boomerang.
6. Specify any Filter Attributes.
7. (Optional) Click **Inspect** and the request inspector appears. You can now 
   optionally create this corpus by copying and pasting the application code 
   in NodeJS, JavaScript, Linux, or Windows.

  ![Create Corpus Request Inspector](/img/create_corpus_request_inspector.png)

8. Click **Create**.

  ![Create Corpus](/img/create_corpus.png)

The corpus is created and a confirmation message appears. It is now ready to 
receive your data.

![Create Corpus](/img/create_corpus_success.png)

When you create a corpus, the following tabs appear:

## Overview

The Overview section provides information about the corpus including usage statistics  
and configuration information about the embedding model, indexing semantics, 
and filter attributes. Click Edit to modify the filter attributes from this page.

## Authorization

The Authorization section defines the users and role that have access to the 
corpus. You can also [create new user roles](/docs/learn/authentication/role-based-access-control) 
and [API keys](/docs/console-ui/api-access-overview) associated with this corpus.

## Data Ingestion

The Data Ingestion section lets you upload files to the corpus, including 
text, HTML, PDF, Word files, and more. It is the quickest way to ask your data 
some questions.

## Search

The Search section lets you ask questions about your data. You can also use 
Advanced options and use the Search Inspector to copy and paste queries in 
your application code and view responses