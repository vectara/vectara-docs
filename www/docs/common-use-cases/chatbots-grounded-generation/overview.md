---
id: grounded-generation-overview
title: Grounded Generation Overview
sidebar_label: Overview
---

In addition to "just" returning search results, <Config v="names.product"/> can
summarize those results in a way that answers the user's question directly.
This can be useful to provide a chatbot-like experience to your users while
avoiding some of the problems that many generative AI systems have, such as
[hallucinations](https://vectara.com/avoiding-hallucinations-in-llm-powered-applications/).

To enable this behavior, send a `summary` request with your `query`.  For example:

```
{
  "query": [
    {
      "query": "Who's the English monarch?",
      "start": 0,
      "numResults": 10,
      "corpusKey": [
        {
          "customerId": 12345678,
          "corpusId": 1,
        }
      ],
      "summary": [
        {
            "responseLang": "en"
        }
      ]
    }
  ]
}
```

# Available summarizers


# Response language
By default, if you don't send a `responseLang`, <Config v="names.product"/>
will attempt to guess the language of the query and respond in that language.
You can explicitly ask for this behavior if desired by setting `responseLang`
to `auto` (which is the default).  However, note that this guessing is not
perfect: many languages have many borrowed words and phrases which makes
guessing the language difficult to impossible at times.  For that reason, it's
recommended that you send the user's preferred language when you know it.

One possible way to do this is just to ask the user to configure their
preferred language or to use the localization of your application to determine
the best language to send to <Config v="names.product"/>.  Alternatively, if
your application is a web-based application, you can consider using the
[Navigator.language](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language)
API.

For the most up-to-date list of languages supported by <Config v="names.product"/>'s
models, see
[https://github.com/vectara/protos/blob/main/common.proto#L10](https://github.com/vectara/protos/blob/main/common.proto#L10).

Both [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and
[ISO 639-3](https://en.wikipedia.org/wiki/ISO_639-3) language codes are supported
in this API.

