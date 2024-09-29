---
id: async-generative
title: Asynchronous Grounded Generation
---

Generating summaries is an operation which is heavily time-consuming: often
taking on the order of a few seconds.  In many applications, it can be
advantageous to return the result list first while waiting for the summary to
be completed.

In order to support fast response times for the initial result list in addition
to the slower generative summary, <Config v="names.product"/> supports an
asynchronous interface for requesting the summary.  Today, this interface is
*only* available in gRPC requests.  In the future, we plan on releasing a
similar feature for REST users via an alternative mechanism.

To use asynchronous summarization over gRPC, you can use <Config v="names.product"/>'s
`future_id`s.  When you first send a request that includes a generative summary,
the immediate response will include a `future_id`.  You can then look for a future
`QueryResponsePart` for associated messages of the given `future_id` to look for
`Summary` response parts that matched the given query.