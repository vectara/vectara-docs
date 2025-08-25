---
id: data-egress
title: Vectara Data Egress Overview
sidebar_label: Data Egress
---

import CodePanel from '@site/src/theme/CodePanel';

This document provides a high-level overview of how to export and retrieve 
data from Vectara using the available API capabilities.

Vectara provides programmatic access to retrieve your data through REST APIs. 
While the platform is optimized for search and retrieval operations, it offers 
comprehensive methods to access your documents, configurations, and usage 
data. Data export requires iterating through individual resources as bulk export operations are not currently available.


## What can be exported

- **Individual documents** with metadata
- **Document lists** for corpus inventory
- **Document parts** (text chunks) with positioning metadata
- **Tables and images** extracted during processing
- **Custom metadata** associated with documents

## What cannot be exported
- Original uploaded files (PDFs, Word docs, and so on.)
- Raw embeddings/vectors
- System-generated indexes
- Deleted content (permanently removed)

## Data export best practices

### API-based retrieval

The primary method for data export is through Vectara's REST API. The process 
involves the following steps:
1. [List corpora](/docs/rest-api/list-corpora).
2. [List documents in each corpora](/docs/rest-api/list-corpus-documents).
3. [Download documents from each corpora](/docs/rest-api/get-corpus-document).
