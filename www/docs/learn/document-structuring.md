---
id: document-data-structuring
title: Document Data Structuring
sidebar_label: Document Data Structuring
---

import {Config} from '@site/docs/definitions.md';

Munging files into a structured data format helps preserve relationships 
between bits of data, retains special meaning of specific data types, and 
enables users to query the data with filters.

Let's use this National Institute of Health PDF as an example:

[www.techtransfer.nih.gov_tech_tab-3843.pdf](/img/www.techtransfer.nih.gov_tech_tab-3843.pdf)

Vectara offers a structured data format where users can convert PDFs to a 
format like the following structure:

```json
{
  "documentId": "TAB‑3843",
  "title": "Engineered Cell‑Penetrating Monoclonal Antibody for Universal Inuenza Immunotherapy",
  "description": "Home » Tech » Engineered Cell‑Penetrating Monoclonal Antibody for Universal Inuenza Immunotherapy",
  "metadataJson": "{\"developmentStatus\":\"Pre‑Clinical\",\"isAntibodiesProduct\":true,\"date\":\"2023‑05‑17\",\"patentSeriesCode\":63,\"patentApplicationNumber\":365841}",
  "section": [{
    "title": "body",
    "text": "Influenza remains a burden on public health..."
  }, {
    "title": "Clinical treatment",
    "text": "Clinical Treatment꞉ CPP‑mAbs against influenza NP may...",
    "metadataJson": "{\"clinicalTreatment\"꞉\"CPP‑mAbs against influenza NP may...\"}",
  }, {
    "text": "Current vaccines remain effective for a short time period..."
  }]
}
```

This data structure is built upon three core concepts:
* Document
* Metadata
* Sections

## Document

The document format provides high-level information that gets encoded into 
Vectara and allows users to retrieve this information using semantic search, 
keyword-based search, and hybrid search:

```json
"documentId": "TAB‑3843",
  "title": "Engineered Cell‑Penetrating Monoclonal Antibody for Universal Inuenza Immunotherapy",
  "description": "Home » Tech » Engineered Cell‑Penetrating Monoclonal Antibody for Universal Inuenza Immunotherapy",
```

* `documentId` specifies a unique identifier for the document.
* `title` specifies the heading of the document.
* `description` provides additional context about the document.

## Metadata

The document has **metadata** attached to it with the `metadataJson` property. 
This property expects to be assigned a stringified JSON object that consists 
of arbitrary key-value pairs which accept text, numeric, and boolean values.

In our example document, we selected different properties from the original PDF 
that are useful for the following scenarios:
* Filtering through different documents
* Cross-referencing a document with other data sources
* Comparing and grouping results

Defining metadata properties on the document level instead of the section 
level helps you retrieve the entire document rather than just a part of it. 
Let's look at these metadata properties in more detail.

### Example Metadata Properties

```json
"metadataJson": "{\"developmentStatus\":\"Pre‑Clinical\",\"isAntibodiesProduct\":true,\"date\":\"2023‑05‑17\",\"patentSeriesCode\":63,\"patentApplicationNumber\":365841}",
```

* `developmentStatus` specifies status of the patent, such as pre-clinical.
* `isAntibodiesProduct` indicates whether the patent applies to "antibodies-related" 
  products, which is the domain we care about in this contrived example.
* `date` specifies the date this document was created.
* `patentSeriesCode` specifies the patent series code number.
* `patentApplicationNumber` specifies the patent application number.



Metadata can also be attached to sections, which are an organization unit 
for grouping related bodies of text.

## Sections

When Vectara ingests a document, it splits the text in these sections into 
chunks and encodes them in vectors. This enables queries to retrieve 
them based on semantic similarity.

```json
"section": [{
    "title": "body",
    "text": "Influenza remains a burden on public health..."
  }, {
    "title": "Clinical treatment",
    "text": "Clinical Treatment꞉ CPP‑mAbs against influenza NP may...",
    "metadataJson": "{\"clinicalTreatment\"꞉\"CPP‑mAbs against influenza NP may...\"}",
  }, {
    "text": "Current vaccines remain effective for a short time period..."
  }]
  ```

* `text` specifies the body of text.
* `title` specifies an optional name for identifying the body of text. 
  This is like a heading in a document.
* `metadataJson` specifies an optional stringified JSON object, which can be 
  configured as flexibly as the root-level document metadata.
* `sections` specifies an optional array of child sections. Those sections 
  can also have their own child sections.

### Nested Sections

Nested sections can have their own titles, text, and metadata, just like 
their parent sections. In the following example, we took data from our PDF to 
create sections for `Overview`, `Licensing`, and `Patent and Collaboration 
Information`.

Under the `Licensing` section, we nested two child sections named `Commercial 
Applications` and `Competitive Advantage`. Within Competitive Advantage, we then 
nested two additional child sections named `Advantages Over Alternatives` and 
`In Vivo Efficacy`.

```json
{
   "documentId":"TAB-3843",
   "title":"Engineered Cell-Penetrating Monoclonal Antibody for Universal Influenza Immunotherapy",
   "description":"Home » Tech » Engineered Cell-Penetrating Monoclonal Antibody for Universal Influenza Immunotherapy",
   "metadataJson":"{\"developmentStatus\":\"Pre-Clinical\",\"isAntibodiesProduct\":true,\"date\":\"2023-05-17\",\"patentSeriesCode\":63,\"patentApplicationNumber\":365841}",
   "section":[
      {
         "title":"Overview",
         "text":"Influenza remains a burden on public health, as current treatments of viral infections remain ineffective due to frequent virus mutations...",
         "metadataJson":"{\"sectionType\":\"Introduction\"}",
         "sections":[
            {
               "title":"Invention",
               "metadataJson":"{\"sectionType\":\"Invention\",\"inventionType\":\"Antibody\",\"inventionTarget\":\"Nucleoprotein\"}",
               "text":"To circumvent the challenge of targeting NP, scientists at NIAID have developed an antibody genetically fused with a cell penetrating peptide (CPP-mAb)..."
            }
         ]
      },
      {
         "title":"Licensing",
         "text":"This technology is available for licensing for commercial development in accordance with 35 U.S.C. § 209 and 37 CFR Part 404, as well as...",
         "metadataJson":"{\"sectionType\":\"Licensing\"}",
         "sections":[
            {
               "title":"Commercial Applications",
               "text":"CPP-mAbs against influenza NP may be a reliable and effective method to treat patients infected with varying subtypes of influenza, by targeting a functionally conserved protein...",
               "metadataJson":"{\"sectionType\":\"Applications\",\"applicationType\":\"Clinical Treatment\"}"
            },
            {
               "title":"Competitive Advantages",
               "text":"Current vaccines remain effective for a short time period, due to the ever-changing nature of the viral surface glycoproteins..,",
               "metadataJson":"{\"sectionType\":\"Advantages\"}",
               "sections":[
                  {
                     "title":"Advantages Over Alternatives",
                     "text":"Other attempts to produce vaccines against conserved portions of the surface viral glycoproteins have failed to produce a robust and reliable vaccine...",
                     "metadataJson":"{\"sectionType\":\"Applications\",\"applicationType\":\"Clinical Treatment\"}"
                  },
                  {
                     "title":"In Vivo Efficacy",
                     "text":"CPP-mAbs against NP increase survivorship in mice infected with mouse Influenza A virus, demonstrating therapeutic protection.",
                     "metadataJson":"{\"animalType\":\"Mice\",\"virusStrain\":\"Influenza A\"}"
                  }
               ]
            }
         ]
      },
      {
         "title":"Patent and Collaboration Information",
         "sections":[
            {
               "title":"Patents",
               "text":"US Application 63/365,841, Filed on 2022-06-03",
               "metadataJson":"{\"sectionType\":\"Patents\"}"
            },
            {
               "title":"Collaborations",
               "text":"The National Institute of Allergy and Infectious Diseases is seeking statements of capability or interest from parties interested in collaborative research to further develop, evaluate or commercialize this invention. For collaboration opportunities, please contact Benjamin Hurley; 240-nnn-nnnn, benjamin.hurley@nnn.nnn.",
               "metadataJson":"{\"sectionType\":\"Collaborations\",\"contactPerson\":\"Benjamin Hurley\",\"contactEmail\":\"benjamin.hurley@nnn.nnn\",\"contactPhone\":\"+1 240 nnn nnnn\"}"
            }
         ]
      }
   ]
}
```

## Special Document Metadata

Vectara Console recognizes special metadata which have proven useful across 
many use cases.

### `date`
If you define `date` in the document's metadata, it appears in the Console 
Corpus Search interface. This can be useful for tracking the recency of a 
document, since older docs can lose relevance in some scenarios.

### `url`
If you define `url` in the document's metadata, it appears in the Console Corpus 
Search interface as a clickable link. This can be useful for enabling users to 
click through to the document's original resource, such a web page or
downloadable artifact.

### `ts_create`
If you define `ts_create` and define a creation date in epoch seconds, it 
appears in the Console Corpus Search interface as the document's date of 
creation.

### `author`
If you define `author` and then define either a string or an array of 
strings, these values appear in the Console Corpus Search interface 
as the document's author(s).
