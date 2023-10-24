import { ChangeEvent, FC, useCallback, useState, KeyboardEvent } from "react";
import { BrowserRouter } from "react-router-dom";
import debounce from "lodash.debounce";
import { DeserializedSearchResult } from "./types";
import { useSearch } from "./useSearch";
import { SearchInput } from "./SearchInput";
import { SearchResult } from "./SearchResult";

import "./_index.scss";

interface Props {
  customerId: string;
  apiKey: string;
  corpusId: string;
  apiUrl?: string;
}

/**
 * A client-side search component that queries a specific corpus with a user-provided string.
 */
export const Search: FC<Props> = ({ customerId, apiKey, corpusId, apiUrl }) => {
  const [searchResults, setSearchResults] = useState<
    DeserializedSearchResult[]
  >([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState<number | null>(
    null
  );

  const { fetchSearchResults, isLoading } = useSearch(
    customerId,
    corpusId,
    apiKey,
    apiUrl
  );

  const onChange = debounce(async (evt: ChangeEvent<HTMLInputElement>) => {
    const query = evt.target.value;

    setSearchResults([]);
    setSelectedResultIndex(null);

    if (query.length < 3) {
      return;
    }

    const results = await fetchSearchResults(query);
    setSearchResults(results);
  }, 500);

  const onKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      const key = evt.key;

      if (searchResults.length === 0) {
        return;
      }

      if (key === "ArrowDown") {
        setSelectedResultIndex((prevValue) => {
          return prevValue === null || prevValue === searchResults.length - 1
            ? 0
            : prevValue + 1;
        });
      }

      if (key === "ArrowUp") {
      }
    },
    [searchResults]
  );

  const resultsList =
    searchResults.length === 0 ? null : (
      <div className="searchResults">
        {searchResults.map((searchResult, index) => {
          const {
            snippet: { pre, text, post },
          } = searchResult;

          return (
            <SearchResult
              key={`${pre}${text}${post}`}
              searchResult={searchResult}
            />
          );
        })}
      </div>
    );

  return (
    <div style={{ position: "relative" }}>
      <BrowserRouter>
        <SearchInput
          isLoading={isLoading}
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {resultsList}
      </BrowserRouter>
    </div>
  );
};
