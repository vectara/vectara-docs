---
id: grounded-generation-response-languages
title: Response Languages
---


The `response_language` field in <Config v="names.product"/> allows control of the language
for sumarization requests. You *can* ask <Config v="names.product"/> to attempt
to guess the language of the query and respond in that guessed language by
setting `response_language` to `auto`.  However, this guessing is not perfect: 
many languages have many borrowed words and phrases which makes
guessing the language difficult to impossible at times. For that reason, it's
recommended that you send the user's preferred language when you know it.

One possible way to do this is just to ask the user to configure their
preferred language or to use the localization of your application to determine
the best language to send to <Config v="names.product"/>.  Alternatively, if
your application is a web-based application, you can consider using the
[Navigator.language](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language)
and [Navigator.languages](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages)
API.

For the most up-to-date list of languages supported by <Config v="names.product"/>'s
models, see
[https://github.com/vectara/protos/blob/main/common.proto#L10](https://github.com/vectara/protos/blob/main/common.proto#L10).

Both [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and
[ISO 639-3](https://en.wikipedia.org/wiki/ISO_639-3) language codes are supported
in this API.

Some features, such as `factual_consistency_score`, may not work on all 
languages. The [Factual Consistency Score](/docs/learn/hallucination-evaluation) is supported in English, German, 
and French (`eng`,`deu`,`fra`).
