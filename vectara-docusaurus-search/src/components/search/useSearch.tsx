import { useCallback, useMemo, useState } from "react";
import { DeserializedSearchResult, DocMetadata, SearchResponse } from "./types";

const DEFAULT_QUERY_API_URL = "https://api.vectara.io/v1/query";

export const useSearch = (
  customerId: string,
  corpusId: string,
  apiKey: string,
  apiUrl: string = DEFAULT_QUERY_API_URL
) => {
  const [isLoading, setIsLoading] = useState(false);

  const headers = useMemo(() => {
    const headersInstance = new Headers();
    headersInstance.append("customer-id", customerId);
    headersInstance.append("x-api-key", apiKey);
    headersInstance.append("content-type", "application/json");

    return headersInstance;
  }, [customerId, apiKey]);

  const generateRequestBody = useCallback(
    (query: string) => {
      return JSON.stringify({
        query: [
          {
            query,
            start: 0,
            numResults: 10,
            corpusKey: [
              {
                corpusId,
              },
            ],
          },
        ],
      });
    },
    [corpusId]
  );

  const fetchSearchResults = async (
    query: string
  ): Promise<DeserializedSearchResult[]> => {
    setIsLoading(true);
    const requestBody = generateRequestBody(query);
    const response = await fetch(apiUrl, {
      headers,
      body: requestBody,
      method: "POST",
    });
    const responseJson = await response.json();
    setIsLoading(false);
    return deserializeSearchResponse(responseJson.responseSet?.[0]) ?? [];
  };

  return { fetchSearchResults, isLoading };
};

const convertMetadataToObject = (metadata: DocMetadata[]) => {
  const obj: Record<string, string> = {};
  metadata.forEach((item) => {
    obj[item.name] = item.value;
  });
  return obj;
};

const parseMetadata = (rawMetadata: DocMetadata[]) => {
  const metadata = convertMetadataToObject(rawMetadata);
  return {
    source: metadata.source as string,
    url: metadata.url,
    title: metadata.title || "Untitled",
    metadata,
  };
};

const deserializeSearchResponse = (
  searchResponse?: SearchResponse
): Array<DeserializedSearchResult> | undefined => {
  if (!searchResponse) return undefined;

  const results: Array<DeserializedSearchResult> = [];
  const { response: responses, document: documents } = searchResponse;

  responses.forEach((response) => {
    const { documentIndex, text: rawText } = response;
    const { pre, post, text } = parseSnippet(rawText);
    const document = documents[Number(documentIndex)];
    const { id, metadata: rawMetadata } = document;
    const { source, url, title, metadata } = parseMetadata(rawMetadata);

    results.push({
      id,
      snippet: {
        pre,
        text,
        post,
      },
      source,
      url,
      title,
      metadata,
    });
  });

  return results;
};

export const START_TAG = "%START_SNIPPET%";
export const END_TAG = "%END_SNIPPET%";

export const parseSnippet = (source: string) => {
  const [pre, textAndPost] =
    source.indexOf(START_TAG) !== -1 ? source.split(START_TAG) : ["", source];
  const [text, post] =
    textAndPost.indexOf(END_TAG) !== -1
      ? textAndPost.split(END_TAG)
      : [textAndPost, ""];
  return { pre, post, text };
};
