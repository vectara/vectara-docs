---
id: prepare-your-data
title: Prepare Your Data for Ingestion
sidebar_label: Prepare Your Data
---

import {Config} from './definitions.md';

Before you start ingesting data with <Config v="names.product"/>, we recommend that you 
clean and prepare the data proactively. This cleaning and 
preparing process involves normalizing and standardizing datasets, and we 
provide you with best practices to help you on that journey.

Normalization involves transforming your data into a common format. 
Standardization goes a step further by making sure the data follows a 
particular set of criteria. For example, if you ingest data about product 
reviews, you want to ensure that a 5-star rating means the same thing 
across different platforms.

Clean data ensures that you have consistency and accuracy. Without clean data, 
insights or actions derived from the data may be incorrect or misleading. 
Taking the time to prepare your data provides a reliable and consistent 
dataset for ingestion, optimized for seamless ingestion. Throughout the data 
preparation process, collaborating with your data scientists, business 
analysts, and other stakeholders becomes essential to ensure transparency and 
that the data meets everyone's needs.

## Best practices for data preparation

Become familiar with the following data preparation best practices that can 
help guide your data cleaning and preparation efforts. These methods help 
enable you to become proactive and minimize data analysis issues in 
the long term. 

* **Data Profiling** helps you understand the structure, content, and 
  relationships with your data. Profiling your data early helps identify 
  anomalies and outliers that may require special attention during the 
  cleaning process. Think of it like a "health check" of your data.
* **Documentation** enables you to keep accurate records during the data 
  preparation process in case you have to trace back your steps. It also lets 
  you capture the rationale behind each decision since multiple team members 
  are typically involved in this effort. This knowledge base becomes crucial for 
  accountability and helps your organization with future audits.
* **Automation** lets you reduce the amount of time for data preparation 
  because you can take advantage of tools that extract, transform, and load (ETL) 
  data. Not only does automation speed up the process, but it minimizes the risk 
  of human error.
* **Test, Test, and Test Again** so that you catch any errors or inconsistencies 
  that may have been overlooked. Frequent testing helps ensure that you ingest 
  the highest quality data.
* **Stay Agile** because like any effort involving large amounts of data, things 
  happen, and you want to be able to adapt to these pivots and remain aligned 
  with your team and business objectives.


## Identify and correct errors in your data

Cleaning your data includes identifying and correcting errors to prevent 
them from significantly distorting outcomes. and analysis Before you begin 
ingesting any data, you should rectify issues so that you have an accurate 
dataset. Let's look at several ways to begin cleaning your data, including 
standardizing date formats, correcting typos, or substituting 
missing values with suitable placeholders.

1. **Remove duplicate records**

    Duplicate records distort analysis and lead to incorrect insights. For example, 
    duplicate entries may contradict each other because of conflicting information. 
    Discover your redundant and duplicate data and then remove it.
2. **Populate missing values**

    Missing values can occur due to entry errors, system issues, or when some data 
    simply was never collected. For example, you might replace missing values with 
    placeholder values, or you can exclude records with missing values from your 
    data analysis. You want to ensure that missing values do not introduce 
    inconsistencies or bias.

3. **Correct inconsistent formatting** 
   
    Data can come from multiple sources and entered in different ways. This leads 
    to inconsistencies in dates, phone numbers, product IDs because of 
    different uses of dashes, periods, and punctuation. If you correct these 
    inconsistencies by standardizing into a consistent format, the data 
    becomes easier to work with and helps ensure accurate results.
4. **Remove irrelevant or unnecessary data**

    Not all data that you collected is relevant or necessary. It might contain 
    personal information that must be removed for privacy reasons, or it has
    information that will not be useful. Removing irrelevant or unnecessary 
    data helps reduce the size of the dataset which improves processing 
    times. It also helps focus the analysis on the most relevant information.

5. **Verify data integrity**

   Data integrity is vital for accurate analysis. Verifying this data involves 
   validating data types, ranges, and relationships within the dataset. For
   example, confirm that numerical values fall within the expected ranges. If 
   you standardize categories and labels across the dataset, you help 
   ensure consistency with the data and ingestion results.
   

## Model your data and get granular

You get the best results if you convert the data to formats optimized for <Config v="names.product"/> 
to ingest. Typically, this means you convert data into a structured JSON 
format. If you have data in a CSV file, use a tool to convert the rows into to 
JSON strings. For example, if you want to index research articles, you might 
have primary fields such as `title`, `category`, `year`, `authors`, and `abstract` 
to help <Config v="names.product"/> understand the context.

You can add even more granular metadata to your data to enhance search 
capabilities. Increased granularity is important for using data already 
structured in a CSV, XLS, or JSON database. 

It might mean adding new fields to your JSON objects such as:
- `category`
- `language`
- `location`
- `source`
- `references`
- `volume`
- `journal`
- `issue`
- `access level`
- `version`

### Basic Example JSON Format

This first example shows a book with basic metadata including `title`, `category`, `year`, `author`, `abstract`, 
and `keywords`.


```json
{
  "title": "Quantum Supremacy Using Superconducting Circuits",
  "category": "Physics",
  "year": "2023",
  "authors": [
    {
      "name": "John Doe",
      "affiliation": "California Institute of Technology"
    }
  ],
  "abstract": "We propose a path towards quantum supremacy based on superconducting circuits coupled to microwave resonators. By utilizing the high fidelity and low noise characteristics of these devices, we demonstrate that it will soon be possible to execute particular computations quicker on a quantum system compared to a traditional classical computer.",
  "keywords": [
    "quantum mechanics",
    "superconduction",
    "microwaves",
    "resonances"
  ],
}
```

### Advanced Example JSON Format


This second example shows a more complex JSON format with additional 
 `references` metadata including `journal`, `volume`, `issue`, `issn`, `doi`, and so on.

```json
{
  "title": "Quantum Supremacy Using Superconducting Circuits",
  "category": "Physics",
  "year": "2023",
  "authors": [
    {
      "name": "John Doe",
      "affiliation": "California Institute of Technology"
    }
  ],
  "abstract": "We propose a path towards quantum supremacy based on superconducting circuits coupled to microwave resonators. By utilizing the high fidelity and low noise characteristics of these devices, we demonstrate that it will soon be possible to execute particular computations quicker on a quantum system compared to a traditional classical computer.",
  "keywords": [
    "quantum mechanics",
    "superconduction",
    "microwaves",
    "resonances"
  ],
  "references": [
    {
      "title": "Superconductivity",
      "journal": "Scientific American",
      "volume": "202",
      "issue": "6",
      "pages": "92-99",
      "issn": "0036-8733",
      "doi": "10.1038/scientificamerican0620-92a"
    },
    {
      "title": "Cooper Pairs in Superconductors",
      "journal": "Revista de la Sociedad Chilena de Fisica",
      "volume": "44",
      "issue": "2",
      "pages": "107-125",
      "issn": "0375-843X",
      "doi": "10.1016/j.rsf.2001.10.001"
    }
  ],
  "doi": "10.1103/PhysRevLett.123.050501",
  "journal": "Physical Review Letters",
  "volume": "123",
  "issue": "5",
  "
}
```
The additional metadata provides more nuanced information about the references 
in a document which improves the contextual relevance. 

### More granular metadata examples

Think of other metadata fields that could further improve the relevance of 
your data for different types of documents. The following list shows possible 
metadata fields in financial and legal documents:

* `document_type`
* `fiscal_year`
* `quarter`
* `currency`
* `industry_sector`
* `confidentiality_level`
* `approval_status`
* `revenue_streams`
* `investment_type`
* `risk_level`
* `case_number`
* `attorney_name`
* `filing_date`
* `legal_topic`
* `clause_types`
* `dispute_resolution`
* `damages`
* `sanctions`
* `exhibits`

Now imagine the kinds of answers users can get when asking nuanced questions 
that include these kinds of granular fields.

#### Example metadata for a financial document

This example shows granular metadata for a financial document:

```js
{
  "document_id": "FIN-2023-XYZ123",
  "metadata": {
    "title": "Annual Financial Report",
    "document_type": "Financial Report",
    "fiscal_year": 2023,
    "quarter": "Q4",
    "currency": "USD",
    "industry_sector": "Technology",
    "summary": "This annual financial report provides a comprehensive overview of the company's financial performance for the fiscal year 2023.",
    "keywords": [
      "revenue",
      "expenses",
      "profit",
      "loss",
      "assets",
      "liabilities"
    ],
    "authors": [
      {
        "name": "John Doe",
        "role": "Chief Financial Officer",
        "affiliation": "TechCorp Inc."
      }
    ],
    "publish_date": "2024-01-15",
    "file_link": "https://example.com/financial_reports/FIN-2023-XYZ123.pdf",
    "additional_metadata": {
      "auditor": "Auditing Services Corporation",
      "tax_id": "123-456-789",
      "stock_ticker": "TCI",
      "market_cap": "50 Billion USD",
      "revenue": "10 Billion USD",
      "net_profit": "2 Billion USD"
    }
  }
}

```

Now let's look at another example.

#### Example metadata from a legal document

This examples shows granular metadata for a legal document: 

```js
{
  "document_id": "LEGAL-2023-ABC789",
  "metadata": {
    "title": "Contract Dispute Settlement",
    "document_type": "Legal Agreement",
    "case_number": "CA123456",
    "filing_date": "2023-06-15",
    "attorney_name": "John Q. Legal",
    "legal_topic": "Contract Law",
    "clause_types": [
      "Non-Disclosure",
      "Termination",
      "Indemnification"
    ],
    "damages": "500,000 USD",
    "sanctions": "None",
    "exhibits": [
      "Exhibit A: Original Contract",
      "Exhibit B: Email Correspondence",
      "Exhibit C: Financial Statements"
    ],
    "dispute_resolution": "Arbitration",
    "summary": "This document outlines the settlement agreement for a contract dispute between Party A and Party B.",
    "keywords": [
      "contract",
      "dispute",
      "settlement",
      "arbitration",
      "damages"
    ],
    "authors": [
      {
        "name": "John Q. Legal",
        "role": "Attorney",
        "affiliation": "LegalFirm LLP"
      }
    ],
    "publish_date": "2023-07-01",
    "file_link": "https://example.com/legal_documents/LEGAL-2023-ABC789.pdf",
    "additional_metadata": {
      "jurisdiction": "California, USA",
      "court_name": "Superior Court of California",
      "plaintiff": "Party A",
      "defendant": "Party B",
      "settlement_amount": "200,000 USD",
      "arbitrator": "Jane Arbitrator",
      "confidentiality": "Full",
      "enforceability": "State and Federal Laws"
    }
  }
}

```
Now that you understand what it means to have cleaned and prepared your data, 
you can start ingesting this data into <Config v="names.product"/>. Create an index 
and get answers to your questions from your data. Always consider the needs of 
your users and the type of searches that they will be performing when deciding how to structure your data.
