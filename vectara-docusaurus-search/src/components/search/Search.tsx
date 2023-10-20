import { ChangeEvent, FC, useCallback, useState, KeyboardEvent } from 'react';
import debounce from 'lodash.debounce';
import { VuiSearchInput, VuiSearchResult } from "../../../vui";
import { BrowserRouter } from 'react-router-dom'
import { DeserializedSearchResult } from './types';
import { useSearch } from './useSearch';

import '../../../vui/_index.scss';
import './_index.scss';

interface Props {
  customerId: string;
  apiKey: string;
  corpusId: string;
  apiUrl?: string;
}

/**
 * A client-side search component that queries a specific corpus with a user-provided string.
 */
export const Search: FC<Props> = ({
  customerId,
  apiKey,
  corpusId,
  apiUrl
}) => {
  const [searchResults, setSearchResults] = useState<DeserializedSearchResult[]>([]);
  const [selectedResultIndex, setSelectedResultIndex] = useState<number | null>(null);

  const { fetchSearchResults } = useSearch(
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

  const onKeyDown = useCallback((evt: KeyboardEvent) => {
    const key = evt.key;

    if (searchResults.length === 0) {
      return;
    }

    if (key === "ArrowDown") {
      setSelectedResultIndex((prevValue) => {
        return prevValue === null || prevValue === searchResults.length - 1 ?
          0 : prevValue + 1;
      });
    }

    if (key === "ArrowUp") { }

  }, [searchResults]);

  const resultsList = searchResults.length === 0 ? null : searchResults.map((searchResult, index) => {
    return (
      <li className={`searchResultItem ${index === selectedResultIndex ? 'selected' : null}`}>
        <VuiSearchResult key={searchResult.title} result={searchResult} position={index} />
      </li>
    )
  });
  
  return (
    <div style={{position: 'relative'}}>
      <BrowserRouter>
        <VuiSearchInput 
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        {
          resultsList ? 
          (
            <div className='searchResultsWrapper'>
              {resultsList}
            </div>
          ) : null
        }
      </BrowserRouter>
    </div>
  )
};
