import {
  ChangeEvent,
  FC,
  useCallback,
  useState,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react";
import { BrowserRouter } from "react-router-dom";
import debounce from "lodash.debounce";
import { BiSearch } from "react-icons/bi";
import { VuiButtonSecondary, VuiIcon } from "../../../vui";
import { DeserializedSearchResult } from "./types";
import { useSearch } from "./useSearch";
import { SearchResult } from "./SearchResult";
import { SearchModal } from "./SearchModal";

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

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const buttonRef = useRef<HTMLDivElement | null>(null);
  const selectedResultRef = useRef<HTMLDivElement | null>(null);
  const queryRef = useRef<string>("");
  const searchCount = useRef<number>(0);
  const { fetchSearchResults, isLoading } = useSearch(
    customerId,
    corpusId,
    apiKey,
    apiUrl
  );

  const sendSearchQuery = async (query: string) => {
    if (query.length === 0) {
      return;
    }

    const searchId = ++searchCount.current;
    const results = await fetchSearchResults(query);

    if (searchId === searchCount.current) {
      setSearchResults(results);
      setSelectedResultIndex(null);
      selectedResultRef.current = null;
    }
  };

  // A debounced version of the above, for integration into key handling.
  const debouncedSendSearchQuery = debounce(
    (query: string) => sendSearchQuery(query),
    500
  );

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const currentQuery = evt.target.value;
    queryRef.current = currentQuery;

    if (currentQuery.length === 0) {
      resetResults();
    }

    debouncedSendSearchQuery(currentQuery);
  };

  const onKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      const key = evt.key;

      if (key === "Enter") {
        evt.preventDefault();

        if (selectedResultIndex !== null) {
          window.open(searchResults[selectedResultIndex].url, "_self");
        } else {
          sendSearchQuery(queryRef.current);
        }
      }

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
        setSelectedResultIndex((prevValue) => {
          return prevValue === null || prevValue === 0
            ? searchResults.length - 1
            : prevValue - 1;
        });
      }
    },
    [searchResults, selectedResultIndex]
  );

  const resetResults = () => {
    setSearchResults([]);
    setSelectedResultIndex(null);
    selectedResultRef.current = null;
  };

  const closeModalAndResetResults = () => {
    setIsOpen(false);
    resetResults();
  };

  const resultsList =
    searchResults.length === 0
      ? null
      : searchResults.map((searchResult, index) => {
          const {
            snippet: { pre, text, post },
          } = searchResult;

          return (
            <div
              ref={
                selectedResultIndex === index ? selectedResultRef : undefined
              }
              key={`${pre}${text}${post}`}
            >
              <SearchResult
                searchResult={searchResult}
                isSelected={selectedResultIndex === index}
              />
            </div>
          );
        });

  useEffect(() => {
    if (selectedResultRef.current) {
      selectedResultRef.current.scrollIntoView({
        behavior: "instant",
        block: "nearest",
      });
    }
  }, [selectedResultRef.current]);

  return (
    <BrowserRouter>
      <div ref={buttonRef}>
        <VuiButtonSecondary
          color="neutral"
          onClick={() => setIsOpen(true)}
          icon={
            <VuiIcon>
              <BiSearch />
            </VuiIcon>
          }
        >
          Search
        </VuiButtonSecondary>
      </div>

      <SearchModal
        isLoading={isLoading}
        onChange={onChange}
        onKeyDown={onKeyDown}
        isOpen={isOpen}
        resultsList={resultsList}
        onClose={closeModalAndResetResults}
      />
    </BrowserRouter>
  );
};
