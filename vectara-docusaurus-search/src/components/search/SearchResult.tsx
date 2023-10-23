import { DeserializedSearchResult } from "./types";

type Props = {
  searchResult: DeserializedSearchResult;
};

export const SearchResult = ({ searchResult }: Props) => {
  const {
    title,
    url,
    snippet: { text },
  } = searchResult;

  return (
    <a className="searchResult" href={url}>
      <p className="searchResultTitle">{title}</p>
      <p className="searchResultSnippet">{text}</p>
    </a>
  );
};
