---
id: deploy-a-conversational-search-ui
title: Deploy a Conversational Search Interface with Vectara Answer
sidebar_label: Deploy a Conversational Search Interface
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

Vectara Answer lets you create a conversational search experience for your 
users. This tutorial walks you through deploying a search UI and you can 
connect it to the [website crawler](/docs/discover/build-a-data-crawler) that you built earlier.


## Prerequisites
* [Complete the Vectara Ingest tutorial](/docs/discover/build-a-data-crawler) to build a data crawler
* Install the dependencies (Docker | pyyaml | npm and NodeJS)

## Step 1. Set up the environment

In this step, you clone the `vectara-answer` repository, install the 
JavaScript dependencies, and then build the front-end application:

```bash
git clone https://github.com/vectara/vectara-answer.git
cd vectara-answer
npm install && npm run build
```

## Step 2. Configure the application to communicate with your corpus

In this step, you configure the application with information from your 
Vectara account including the `corpus_id`, `customer_id`, and the URL you 
want to crawl: `sf.gov`

Locate the files you cloned for `vectara-ingest`.

1. Duplicate `secrets.example.toml` and rename the copy to `secrets.toml`.
2. Edit the `secrets.toml` file, add your **api_key** value.
3. Duplicate the `config/vectara-website-search` directory and rename the copy to `sf-search`.
4. Edit the `config/sf-search/config.yaml` file and add your `corpus_id` and `customer_id` values.
5. Modify the `app_title` to give your conversational search a title like "Ask Support."
6. Edit the `config/sf-search/queries.json` file and update the four quetsions 
   that you want to include in the user interface.


## Step 3. Deploy the search application

In this step, you deploy the configured search interface application in a 
Docker container:

1. Execute the `run.sh` script:

```bash
bash docker/run.sh config/pg-search default
```
2. Track progress with the Docker log messages: `docker logs -f vanswer`

## Step 4. Explore the search application

Now that the Docker container is set up, a browser window opens 
to `localhost:80`. You can now start searching for answers to your questions 
about the [sf.gov](https://sf.gov) website.


## Step 5. Customize the appearance of the search interface

We built Vectara Answer to be highly customizable. You can edit `config.yaml` to 
adjust the appearance of the aplication. We encourage you to experiment with 
different configurations and deploy your tailored applications to production!