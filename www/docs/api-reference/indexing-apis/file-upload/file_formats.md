---
id: format-for-upload
title: Format JSON and Pbtext Files
---

When uploading files using the [File Upload Service](/docs/api-reference/indexing-apis/file-upload/file-upload), you may
send any of the predefined formats like markdown, PDF, and MS Word.

Alternatively, you may perform the text extraction yourself, and save the result
as a JSON or text serialized [Document proto](/docs/api-reference/indexing-apis/indexing#document). The benefit
of this approach is that you can attach your own metadata to the document, or
to individual sections within it.

Below is a sample document in each format.

## Sample JSON Document

```json
{
  "documentId": "selected-works-of-shakespeare",
  "title": "William Shakespeare, Greatest Hits",
  "metadataJson": "{\"timespan\":\"26 April 1564---23 April 1616\",\"stars\":5,\"author\":\"William Shakespeare\"}",
  "section": [
    {
      "title": "King Lear",
      "section": [
        {
          "title": "Act I",
          "text": "KENT: I thought the king had more affected the Duke of Albany than Cornwall.\nGLOUCESTER: It did always seem so to us...",
          "metadataJson": "{\"stage-instructions\":\"Enter KENT, GLOUCESTER, and EDMUND\"}"
        },
        {
          "title": "Act II",
          "text": "EDMUND: Save thee, Curan. ...",
          "metadataJson": "{\"stage-instructions\":\"Enter EDMUND, and CURAN meets him\"}"
        }
      ]
    },
    {
      "title": "Antony and Cleopatra",
      "text": "PHILO: Nay, but this dotage of our general's\nO'erflows the measure: those his goodly eyes, ..."
    }
  ]
}
```

## Sample Pbtxt Document

```
document_id: "selected-works-of-shakespeare"
title: "William Shakespeare, Greatest Hits"
metadata_json: "{\"timespan\":\"26 April 1564---23 April 1616\",\"stars\":5,\"author\":\"William Shakespeare\"}"
section {
  title: "King Lear"
  section {
    title: "Act I"
    text: "KENT: I thought the king had more affected the Duke of Albany than Cornwall.\nGLOUCESTER: It did always seem so to us..."
    metadata_json: "{\"stage-instructions\":\"Enter KENT, GLOUCESTER, and EDMUND\"}"
  }
  section {
    title: "Act II"
    text: "EDMUND: Save thee, Curan. ..."
    metadata_json: "{\"stage-instructions\":\"Enter EDMUND, and CURAN meets him\"}"
  }
}
section {
  title: "Antony and Cleopatra"
  text: "PHILO: Nay, but this dotage of our general\'s\nO\'erflows the measure: those his goodly eyes, ..."
}
```

## Sample Python Document

For reference, these documents were output by the following Python program:

```py
"""Illustrate pbtxt and JSON output formats."""

import json
from google.protobuf.json_format import MessageToJson
from google.protobuf.text_format import MessageToString

import indexing_pb2

def main():
  doc = indexing_pb2.Document()
  doc.document_id = 'selected-works-of-shakespeare'
  doc.title = 'William Shakespeare, Greatest Hits'
  metadata = {
    'timespan': '26 April 1564---23 April 1616',
    'stars': 5,
    'author': 'William Shakespeare'
  }
  doc.metadata_json = json.dumps(metadata, separators=(',', ':'))
  section = doc.section.add()
  section.title = 'King Lear'
  act1 = section.section.add()
  act1.title = 'Act I'
  act1.metadata_json = json.dumps({
    'stage-instructions': 'Enter KENT, GLOUCESTER, and EDMUND'
  }, separators=(',', ':'))
  act1.text = 'KENT: I thought the king had more affected the Duke of Albany than Cornwall.\nGLOUCESTER: It did always seem so to us...'

  act2 = section.section.add()
  act2.title = 'Act II'
  act2.metadata_json = json.dumps({
    'stage-instructions': 'Enter EDMUND, and CURAN meets him'
  }, separators=(',', ':'))
  act2.text = 'EDMUND: Save thee, Curan. ...'

  section = doc.section.add()
  section.title = 'Antony and Cleopatra'
  section.text = 'PHILO: Nay, but this dotage of our general\'s\nO\'erflows the measure: those his goodly eyes, ...'

  print(MessageToJson(doc))
  print()
  print(MessageToString(doc))


if __name__ == "__main__":
    main()

```