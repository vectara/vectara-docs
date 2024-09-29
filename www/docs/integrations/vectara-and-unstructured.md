---
id: vectara-and-unstructured
title: Vectara and Unstructured.io
sidebar_label: Vectara and Unstructured.io
---

import {Config} from '@site/docs/definitions.md';

Unstructured is a well known Python package for parsing and dealing with 
unstructured data. Vectara is integrated into [Unstructured’s ingest library](https://unstructured-io.github.io/unstructured/ingest/index.html), 
allowing developers to quickly and easily build data ingestion into Vectara 
that involves complex parsing of input documents such as PDFs, PPT, DOC and 
many other document types.

Although Vectara itself supports direct import of many documents via our File 
Upload API, the ingest service from Unstructured.IO provides additional 
capabilities, where needed, such as table processing, image extraction and 
more.

This blog post demonstrates how to use [Unstructured’s Ingest](https://unstructured-io.github.io/unstructured/ingest/index.html) capability with 
Vectara.
