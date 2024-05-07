import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

const CUSTOMER_ID = "3874164736";
const CORPUS_ID = "1";
const API_KEY = "zqt_5usQAFwTytdQHAXn17Iq31OQMA5RrIBWLI7Fwg";

export default function SearchBar() {
  return (
    <BrowserOnly>
      {() => {
        const ReactSearch = require("@vectara/react-search").ReactSearch;

        const persistToggleSummaryState = (isSummaryVisible) => {
          localStorage.setItem(
            "isSummaryVisible",
            isSummaryVisible ? "true" : "false"
          );
        };

        const isSummaryToggleInitiallyEnabled =
          localStorage.getItem("isSummaryVisible");

        return (
          <ReactSearch
            key={CUSTOMER_ID}
            customerId={CUSTOMER_ID}
            corpusId={CORPUS_ID}
            apiKey={API_KEY}
            onToggleSummary={(isSummaryVisible) =>
              persistToggleSummaryState(isSummaryVisible)
            }
            isSummaryToggleVisible={true}
            isSummaryToggleInitiallyEnabled={
              isSummaryToggleInitiallyEnabled === "true"
            }
          />
        );
      }}
    </BrowserOnly>
  );
}
