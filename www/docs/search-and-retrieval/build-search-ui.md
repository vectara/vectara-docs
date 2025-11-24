---
id: build-search-ui 
title: Build a search UI 
sidebar_label: Build a search UI
---

Building a custom search interface from scratch can be time-consuming. To help
you get started quickly, Vectara provides Vectara Answer, an open-source,
React-based sample application. It comes pre-configured with best practices
for conversational search, retrieval augmented generation (RAG), and citations.

In this tutorial, you will learn how to clone, configure, and run a search
application using your own Vectara data in minutes.

## Prerequisites

Before you begin, ensure you have the following:

* **Node.js and NPM**: A modern version of Node.js (v14 or higher) installed.
* **Vectara account**: A valid account with a corpus containing data.
* **API key**: An API Key with QueryService permissions.
* **Corpus ID and customer ID**: You can find these in the Vectara Console.

## Step 1: Clone the repository

Start by cloning the Vectara Answer repository from GitHub. This provides the
complete scaffolding for your application.

```bash
git clone https://github.com/vectara/vectara-answer.git
cd vectara-answer
```

## Step 2: Install dependencies

Install the necessary packages using npm or yarn.

```bash
npm install
# or
yarn install
```
## Step 3: Configure your credentials

To connect the UI to your Vectara data, you need to configure the environment
variables.

1. In the root directory, find the `.env.example` file.
2. Duplicate it and rename the copy to `.env.`
3. Open the `.env` file and populate the following variables with 
   your specific IDs:
    ```bash
    # The ID of your Vectara customer account
    VECTARA_CUSTOMER_ID="YOUR_CUSTOMER_ID"

    # The ID of the corpus you want to search
    VECTARA_CORPUS_ID="YOUR_CORPUS_ID"

    # Your API Key with Query permissions
    VECTARA_API_KEY="zqt_..."
    ```


:::tip
Ensure your API key has permissions specifically for the Corpus ID you defined.
:::

## Step 4: Run the application

1. Start the development server to see your search UI in action with `npm start`.
2. Open your browser and navigate to http://localhost:3000.  
   You should see the Vectara Answer interface. 
3. Enter a query related to your uploaded data.

## Step 5: Customization

Vectara Answer is designed to be easily customized. You can modify the application
to match your branding and specific search requirements.

### Basic configuration

Look for the `configuration.ts` file in the source code to toggle features such 
as enabling example questions on the home screen.

### Styling

The application typically uses modern CSS or Tailwind. You can modify the
color scheme (primary colors, background colors) to match your corporate identity
by editing the main CSS file or tailwind config.
