---
id: build-a-data-crawler
title: Build a Data Crawler with Vectara Ingest
sidebar_label: Build a Data Crawler
---

import {Config} from '@site/docs/definitions.md';
import {vars} from '@site/static/variables.json';

Vectara Ingest lets you crawl data sources and index the extracted content 
into a Vectara data store. In just a few short steps, our data crawler enables 
you to extract data from various sources so you can then go on to build 
conversational search applications and other LLM solutions.

This tutorial guides you through the process of 
building a data crawler that indexes the content of [sf.gov](https://sf.gov) which 
is the website for the city and county of San Francisco.

## Prerequisites

* Vectara account
* Familiarity with our [Quick Start guide](/docs/quickstart.md).
* Install the dependencies (python >= 3.8 | pyyaml | Docker)

## Step 1. Set up your environment

Make sure you have a Vectara account. You can also become familiar 
1. Read about the [vectara-ingest Open Source project on GitHub](https://github.com/vectara/vectara-ingest).
2. Clone the `vectara-ingest` repository: 
   
   ```bash
   git clone https://github.com/vectara/vectara-ingest.git
   cd vectara-ingest
   ```

## Step 2. Configure the corpus

In this step, you create a corpus from the Vectara Console, create an API key, 
and then you associate the API key with the new corpus for the website crawl 
job.
1. Select the **Data** tab.
2. Create a corpus with the name **sf** 
3. Add a description like **city and county of SF**.
4. Take note of the corpus ID, such as **ID: 1**.
5. Create an API key for indexing and searching with this `sf (ID: 1)` corpus.
6. Copy the API key for use in Step 3.

## Step 3. Configure the data crawler

In this step, you configure the data crawler with information from your 
Vectara account including the `corpus_id`, `customer_id`, and the URL you 
want to crawl: `sf.gov`

Locate the files you cloned for `vectara-ingest`.

1. Duplicate `secrets.example.toml` and rename the copy to `secrets.toml`.
2. Edit the `secrets.toml` file, add your **api_key** value.
3. Open the `config` directory.
4. Edit the `sf.yaml` file and add your `corpus_id` and `customer_id` values.
   
   ```yaml
  vectara:
    corpus_id: 1
    customer_id: 123456789
    reindex: false

  crawling:
    crawler_type: website

  website_crawler:
    urls: [https://sf.gov]
    delay: 1
    url_regex: [".*sf.gov.*"]
    pages_source: sitemap # options are: (1) 'sitemap' automatically retreived from 
    website (2) 'crawl' for recursive crawling
    extraction: playwright # pdf or playwright
   ```

## Step 4. Run the crawl job

In this step, you run the crawl job which creates the Docker image which then 
runs the container with the `sf.yaml` file.

1. Execute the `run.sh` script:
  ```bash
  bash run.sh config/sf.yaml sf
  ```
2. Track progress with the Docker log messages:
  `docker logs -f vingest`

## Step 5. Verify and explore the data

After the job finishes, go back to the Vectara console and try out some 
search queries!

By following this tutorial, you built a data crawler capable of ingesting 
content into a Vectara data store. If you want to crawl other data sources 
later, create a different corpus and [check out our list of data crawlers](https://github.com/vectara/vectara-ingest/blob/main/crawlers/CRAWLERS.md).