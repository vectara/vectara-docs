---
id: semantic-search-overview
title: Semantic Search Overview
sidebar_label: Overview
---

import {Config} from '@site/docs/definitions.md';

A common use case in <Config v="names.product"/> is to build a semantic,
LLM-powered search application. This page outlines what <Config v="names.product"/>
can do for this use case as well as why and how to employ these features for the
best overall end-user experience.

## Large Language Models (LLMs)

[LLMs](https://en.wikipedia.org/wiki/Large_language_model) are deep neural nets
that are built with the task of specifically understanding human language. These
models can be a great asset to many different use cases, including search and
language generation.

These generally work by reading immense amounts of text to build a model and
then using that model to convert text into vectors, both at index and at query
time. For many use cases, this obviates the need for many language rules of
traditional keyword systems like synonym management, stemming, and phrase parsing
because the LLM can inherently understand what the user is asking.

The team behind <Config v="names.product"/> has built LLMs that work across a
wide variety of languages and verticals. When you index data into <Config v="names.product"/>
or perform a search, the text is converted to one or more vectors via a LLM
and then used to answer questions that your users have.

## Zero-shot models

[Zero-shot](https://en.wikipedia.org/wiki/Zero-shot_learning) models are models
which have an excellent understanding of language in general. They can understand
and respond to the semantic meaning of questions without any additional tuning.
This obviates much of the need for fine-tuning/specialized training on a
particular dataset or in a particular vertical.

The <Config v="names.product"/> product makes extensive use of zero-shot models
that have been developed by the team to allow your end users to query using
the language and verbiage of their choosing and find the right documents,
regardless of the domain your documents are in.

## Hybrid search

While zero-shot LLMs work very well in the vast majority of search use cases,
there are some occasions where they suffer. In particular, many zero-shot LLMs
don't work as well when users perform queries for things which have little
semantic meaning. For example, a UPC code, barcode number, or particular named
configuration setting has little/no semantic meaning, and if you expect your
users to perform this type of search, it's best to look into our
[hybrid search](/docs/api-reference/search-apis/lexical-matching) documentation.
