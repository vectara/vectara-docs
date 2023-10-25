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
import { DeserializedSearchResult } from "./types";
import { useSearch } from "./useSearch";
import { SearchInput } from "./SearchInput";
import { SearchResult } from "./SearchResult";
import { VuiButtonSecondary, VuiIcon, VuiModal } from "../../../vui";

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
  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLDivElement | null>(null);
  const selectedResultRef = useRef<HTMLDivElement | null>(null);
  const { fetchSearchResults, isLoading } = useSearch(
    customerId,
    corpusId,
    apiKey,
    apiUrl
  );

  const onChange = debounce(async (evt: ChangeEvent<HTMLInputElement>) => {
    const query = evt.target.value;
    const results = await fetchSearchResults(query);

    setSearchResults(results);
    setSelectedResultIndex(null);
    selectedResultRef.current = null;
  }, 500);

  const onKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      const key = evt.key;

      if (key === "Escape") {
        closeModalAndResetResults();
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

      if (key === "Enter") {
        evt.preventDefault();

        if (selectedResultIndex !== null) {
          window.open(searchResults[selectedResultIndex].url, "_blank");
        }
      }
    },
    [searchResults, selectedResultIndex]
  );

  const closeModalAndResetResults = () => {
    setIsOpen(false);
    setSearchResults([]);
    setSelectedResultIndex(null);
    selectedResultRef.current = null;
  };

  const resultsList =
    searchResults.length === 0 ? null : (
      <div className="searchResults" ref={modalRef}>
        {searchResults.map((searchResult, index) => {
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
                shouldOpenInNewWindow={true}
              />
            </div>
          );
        })}
      </div>
    );

  const onBodyClick = useCallback((evt: MouseEvent) => {
    if (evt.target) {
      const didClickSearchButton = buttonRef.current?.contains(
        evt.target as Node
      );
      const didClickModal = modalRef.current?.contains(evt.target as Node);
      const didClickInput = inputRef.current?.contains(evt.target as Node);
      const shouldCloseModal =
        !didClickSearchButton && !didClickModal && !didClickInput;

      if (shouldCloseModal) {
        closeModalAndResetResults();
      }
    }
  }, []);

  useEffect(() => {
    if (selectedResultRef.current) {
      selectedResultRef.current.scrollIntoView({
        behavior: "instant",
        block: "nearest",
      });
    }
  }, [selectedResultRef.current]);

  useEffect(() => {
    document.body.addEventListener("click", onBodyClick);

    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
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
      <div ref={modalRef}>
        <VuiModal
          className="searchModal"
          title={
            <div ref={inputRef}>
              <SearchInput
                isLoading={isLoading}
                onChange={onChange}
                onKeyDown={onKeyDown}
                placeholder="Search Docs"
              />
            </div>
          }
          isOpen={isOpen}
        >
          {resultsList}
        </VuiModal>
      </div>
    </BrowserRouter>
  );
};
