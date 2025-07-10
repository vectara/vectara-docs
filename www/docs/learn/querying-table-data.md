---
id: querying-table-data
title: Querying Table Data
sidebar_label: Querying Table Data
---


import CodePanel from '@site/src/theme/CodePanel';

Tables in PDFs are hard to query, because their structure is unpredictable and 
often complex. This can prevent researchers and analysts from extracting 
specific data points. Our tabular data extraction capability enables users to 
query and extract valuable information from structured tabular data embedded 
in PDFs, enhancing the overall data retrieval and analysis process.

Users can query specific table cells, entire rows, or even whole tables to 
access actionable insights from structured data in PDFs. Querying tables 
provides enhanced context by displaying relevant tables, titles, and row-level 
details. In addition to querying raw table data, Vectara supports [table 
summarization using custom prompt templates](/docs/generation/custom-prompt-templates-customization). 

This tabular data extraction capability is especially beneficial for 
organizations working with financial reports like 10-Q, 10-K, and S1 filings. 
By streamlining the extraction process and improving querying accuracy, users 
can derive actionable insights more effectively.

* Streamline report analysis across various fields
* Improve accuracy in data extraction from PDF tables
* Enable more efficient querying of specific data in cells 


## Extraction capabilities

* Extract tabular data from PDF documents
* Query specific cell values within tables
* Semantic comparison between cell contents
* Duplicate table references are removed before reaching the user

## Supported table formats

* Clear, single-row headers
* Consistent data types within columns
* Column merged cells
* Simple row-column structure without merged cells

## Limitations

* English only
* Cannot perform complex mathematical comparisons or computations across 
  multiple cell values
* Merged rows may be detected as empty cells
* Does not support extracting data from scanned-in images of tables

## Enable table data extraction

You can ingest PDF table data with the [Vectara Console](/docs/console-ui/manage-documents), [File Upload API](/docs/api-reference/indexing-apis/file-upload/file-upload), 
or [Indexing API](/docs/api-reference/indexing-apis/indexing). 

### Vectara Console

To enable table data extraction in the UI:

1. Open a corpus and select the **Data** tab.
2. Click **Load data into the corpus**.
3. Click **Upload files**.
4. Enable the **Extract tabular data from PDFs** option.
5. Upload your PDFs that contain table data.

![Extract table data from PDFs toggle](/img/extract_table_data_from_pdfs_toggle.png)

### File Upload API

To extract tables during document ingestion, set the `extract_tables` option in 
the `table_extraction_config` parameter of the file upload request to `true` 
in the `multipart/form-data` payload. For example, `table_extraction_config={"extract_tables":true};type=application/json`.
By default, this parameter is set to `false`.

### Indexing API

The Indexing API also supports table extraction when creating or updating 
documents directly.

#### Core documents

For core documents, you define tables explicitly within the document. Use this 
schema when you need precise control over how document parts and tables are 
structured.
1. Set the document type to `core`.
2. Add your tables to the `tables` object as an array. 
3. Define each table with its `id`, `title`, and `data`. The `data` object 
   contains the `headers` and `rows` of the table.
4. Link each document part to its relevant table using the `table_id` field in 
   `document_parts`.

#### Structured documents

For structured documents, you organize tables within sections. Use this schema 
to simplify document ingestion while allowing Vectara to process sections and 
tables automatically.

1. Set the document `type` to `structured`.
2. Within the `sections` object, add your tables to the `tables` object as an 
   array. 
3. Define each table with its `id`, `title`, and `data`. The `data` object contains 
   the `headers` and `rows` of the table.

## View extracted tables in search results

If a corpus contains data extracted from tables, search results can contain 
table rows, table titles, or whole tables. In each of these cases, the entire 
table from which this data was extracted is provided to the generative 
LLM, if one is configured as part of the query.

When an application consumes these table-based search results, it can key off 
table-specific metadata that’s shaped like this:

<CodePanel snippets={[{language: "json", code: `{
  vectara: {
    table_id: string,
    is_table_summary: boolean (optional),
    is_table_title: boolean (optional),
    row_num: integer (optional)
  }
}`}]} title="Code Example" layout="stacked" />
* **table_id:** The ID that identifies the table. You can use it to retrieve 
  the entire table with the Documents API.
* **is_table_summary:** This value is “true” if the search result is for the 
  whole table. It’s called a “table summary” because we match against a 
  summary of the table, rather than the entire original table.
* **is_table_title:** This value is “true” if the search result is for the title 
  of the table.
* **row_num:** This value is a number if the search result is for a specific row 
  of the table.

When you open a corpus in the UI and select the **Data** tab, you can click on 
**each uploaded document** and select the **Tables** tab to view the ingested table 
data as well as view the rendered table. For more details, see [Manage Documents](/docs/console-ui/manage-documents).

## Table examples

This section contains some table examples.

### Quarterly financial statements

This table summarizes the financial performance for Q1, Q2, and Q3 of 2024, 
detailing revenue, expenses, net income, and earnings per share (EPS).

| Quarter   | Revenue    | Expenses   | Net Income | Earnings per Share (EPS) |
|-----------|------------|------------|------------|---------------------------|
| Q1 2024   | $5,000,000 | $3,000,000 | $2,000,000 | $1.50                     |
| Q2 2024   | $6,000,000 | $3,500,000 | $2,500,000 | $1.75                     |
| Q3 2024   | $6,500,000 | $4,000,000 | $2,500,000 | $1.80                     |

### Bill of materials (BOM)

This table lists the bill of materials (BOM) for Laptop X, outlining its 
component hierarchy, quantities, and suppliers.

| BOM ID   | Product   | Component Level | Component Name | Quantity | Unit  | Supplier            |
|----------|-----------|-----------------|----------------|----------|-------|---------------------|
| BOM001   | Laptop X  | 0               | Laptop X       | 1        | piece | In-house            |
| BOM001   | Laptop X  | 1               | Motherboard    | 1        | piece | TechComp Inc        |
| BOM001   | Laptop X  | 1               | CPU            | 1        | piece | ProcessorTech       |
| BOM001   | Laptop X  | 1               | RAM            | 2        | piece | Memory Supplier Co  |
| BOM001   | Laptop X  | 1               | SSD            | 1        | piece | StorageSolutions Inc|
| BOM001   | Laptop X  | 1               | Display        | 1        | piece | ScreenMakers        |
| BOM001   | Laptop X  | 1               | Battery        | 1        | piece | PowerCells Ltd      |

### Clinical trial results

This table presents the results of a clinical trial, showing patient 
demographics, baseline and follow-up scores, and any reported side effects.

| Patient ID | Treatment Group | Age | Gender | Location      | Baseline Score | Week 4 Score | Week 8 Score | Side Effects     |
|------------|-----------------|-----|--------|---------------|----------------|--------------|--------------|------------------|
| PAT001     | Drug A          | 45  | F      | New York      | 7.5            | 6.2          | 4.8          | Mild nausea      |
| PAT002     | Placebo         | 52  | M      | Chicago       | 7.8            | 7.5          | 7.2          | None             |
| PAT003     | Drug A          | 39  | M      | Los Angeles   | 8.1            | 5.9          | 3.7          | Headache         |
| PAT004     | Drug A          | 61  | F      | Miami         | 7.3            | 5.6          | 4.1          | Dizziness        |
| PAT005     | Placebo         | 57  | F      | Boston        | 7.9            | 7.7          | 7.5          | Fatigue          |
| PAT006     | Drug A          | 48  | M      | Seattle       | 8.3            | 6.5          | 4.4          | Mild rash        |
| PAT007     | Placebo         | 55  | F      | Denver        | 7.6            | 7.4          | 7.1          | None             |


