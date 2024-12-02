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
4. Select the kind of app that you want to build or select **Decide later**.
5. Enter the **Name** of the corpus.
6. Enter the **Key** of the corpus which will be used to uniquely identify the corpus
7. (Optional) Enter a Description about the corpus.
8. Select an Embedding model, such as Boomerang.
9. Click the Filter attributes drop-down, click Add filter attribute, and 
   configure attributes at the document or part levels.
10. Click Add to return to the previous page.
11. (Optional) Click **Show API Request** and the request inspector appears. You can now 
   optionally create this corpus by copying and pasting the application code 
   in NodeJS, JavaScript, Linux, or Windows.
     ![Create Corpus Request Inspector](/img/create-corpus-api-request.png)
8. Click **Create**.
  ![Create Corpus](/img/create_corpus.png)

The corpus is created and a confirmation message appears. It is now ready to 
receive your data.

## View the Corpus Key

Vectara API requests against a corpus require the Corpus Key. To view Corpus 
Key and other information about the corpus, select the corpus name from the 
top-menu:

![View Corpus Key](/img/corpus_dropdown.png)

If you select Manage, the following options appear:

### Settings

The Settings tab displays the current embedding model, indexing semantics, 
filter attributes and custom dimensions (Pro and Enterprise only). This page 
also has a _Dangerous actions_ section that lets you disable the corpus, clear 
corpus data, or delete the corpus.

### Access Control

The Access control tab defines the users and roles that have access to the 
corpus. You can also [create new user roles](/docs/learn/authentication/role-based-access-control), 
a default role, and [API keys](/docs/console-ui/api-access-overview) associated with this corpus.

### Analytics

The Analytics tab provides usage statistics about the corpus and you can 
download this data in `.SVG`, `.PNG`, or `.CSV` format.

### Data

The Data tab lets you **Load data into corpus**. It is the quickest way 
to ingest your data to ask some questions. 

## Query the corpus

The corpus name drop-down has a [Query option](/docs/console-ui/configure-queries) that 
lets you ask questions about your data. It provides Chat, Summary, and 
Semantic search interface types, each with their own configuration.

### Configure the corpus

The Configuration tab lets you set options for the Chat, Summary, and Semantic 
search user interface types.

### Browse data

The Browse data tab shows the documents in your corpus.

### Filters

The Filters tab lets you view the filter attributes for the corpus and some 
syntax examples.

