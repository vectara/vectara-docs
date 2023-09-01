---
id: prepare-your-data
title: Prepare Your Data
sidebar_label: Prepare Your Data
---

import {Config} from './definitions.md';

Before your start ingesting data with <Config v="names.product"/>, we recommend that you 
clean and prepare the data. This cleaning and preparing process involves 
normalizing and standardizing datasets. 

Normalization involves transforming your data into a common format. 
Standardization goes a step further by making sure the data follows a 
particular set of criteria. For example, if you ingest data about product 
reviews, you want to ensure that a 5-star rating means the same thing 
across different platforms.

Clean data ensures that you have consistency and accuracy. Without clean data, 
insights or actions derived from the data may be incorrect or misleading. 
Taking the time to prepare your data provdies a reliable and consistent 
dataset for ingestion, optimized for seamless ingestion. 

## Identify and correct errors in your data. 

Cleaning your data includes standardizing date formats, correcting typos, or 
substituting missing values with suitable placeholders.

1. **Remove duplicate records**

    Duplicate records distort analysis and lead to incorrect insights. For example, 
    duplicate entries may contradict each other because of conflicting information. 
    Discover your redundant and 
    duplicate data and then remove it.
2. **Populate missing values**

    Missing values can occur due to entry errors, system issues, or when some data 
    simply was never collected. For example, you might replace missing values with 
    placeholder values, or you can exclude records with missing values from your 
    data analysis.

    You want to ensure that missing values do not introduce inconsistencies or bias.

3. **Correct inconsistent formatting** 
   
    Data can come from multiple sources and entered in different ways. This leads 
    to inconsistencies in dates, phone numbers, product IDs because of different 
    uses of dashes, periods, and punctuation. 
    
    If you correct these inconsistencies by standardizing into a consistent format, 
    the data becomes easier to work with and helps ensure accurate results.
4. **Remove irrelevant or unncessary data**

    Not all data that you collected is relevant or necessary. It might contain 
    personal information that must be removed for privacy reasons, or it has
    information that will not be useful.

    Removing irrelevant or unnecessary data helps reduce the size of the dataset 
    which improves processing times. It also helps focus the analysis on the 
    most relevant information.

5. **Verify data integrity**

   Data integrity is vital for accurate analysis. Verifying this data involves 
   validating data types, ranges, and relationships within the dataset. For
   example, confirm that numberical values fall within the expected ranges.

   If you standardize categories and labels across the dataset, you help 
   ensure consistency with the data and ingestion results.
   

## Model your data and get granluar

You get the best results if you convert the data to formats optimized for 
Vectara to ingest. Typically, this means you convert data into a structured 
JSON format. If you have data in a CSV file, use a tool to convert it to 
JSON. For example, if you want to index research articles, you might have 
primary fields such as `title`, `category`, `year`, `authors`, and `abstract` to 
help Vectara understand the context.

Additionally, you can add even more granular metadata to your data to 
enhance search capabilities. Increased granularity is important for 
using data that is already structured in a CSV, XLS, or JSON database. 

This might mean adding new fields to your JSON objects such as:
- `category`
- `language`
- `location`
- `sSource`
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


This second example shows a more complex JSON format with additioal 
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

Now that you have cleaned and prepared your data, you can start ingesting
this data into an index and get answers to your questions. Always 
consider the needs of your users and the type of searches that 
they will be performing when deciding how to structure your data.
