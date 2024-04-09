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

## View the Corpus ID

Vectara API requests against a corpus require the corpus ID. Find the corpus 
ID in the top-left corner of the corpus view, near the corpus name.

![View Corpus ID](/img/view_corpus_id.png)

When you create a corpus, the following tabs appear:

## Data

The Data tab provides a link to the API documentation and drag-and-drop file 
uploader. Click **Upload files** and then select your text, HTML, PDF, Word 
files, and more. It is the quickest way to ingest your data to ask some 
questions.

The Data tab also lets you take a Vectara test drive by loading sample 
data from an employee handbook PDF. 

## Query

The [Query tab](/docs/1.0/console-ui/corpus-query-configuration) lets you ask questions about your data. You can also use 
Advanced options and show the API request to copy and paste queries in your 
application code and view responses.

## Analytics

The Analytics tab provides usage statistics about the corpus and you can 
download this data in `.SVG`, `.PNG`, or `.CSV` format.

## Access Control

The Access control tab defines the users and roles that have access to the 
corpus. You can also [create new user roles](/docs/1.0/learn/authentication/role-based-access-control), 
a default role, and [API keys](/docs/1.0/console-ui/api-access-overview) associated with this corpus.

## Configuration

The Configuration tab lets you view the embedding model and filter attributes 
for the corpus. You can also Edit filter attributes from this page.
