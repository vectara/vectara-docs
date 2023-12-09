import React from "react";
import { Search } from "./search/Search";

export default function SearchBar() {
  const searchConfig = (window as any).vectara?.plugins?.search;

  if (!searchConfig) {
    return;
  }

  const { customerId, apiKey, corpusId } = searchConfig;

  if (!customerId || !apiKey || !corpusId) {
    console.warn(
      "Vectara Search: Customer ID, API key, and Corpus ID are required."
    );
    return;
  }

  return (
    <Search
      key={customerId}
      customerId={customerId}
      apiKey={apiKey}
      corpusId={corpusId}
    />
  );
}
