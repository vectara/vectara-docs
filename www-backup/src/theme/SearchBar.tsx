import React from "react";
import BrowserOnly from "@docusaurus/BrowserOnly";

const CUSTOMER_ID = "1526022105";
const CORPUS_ID = "232";
const API_KEY = "zqt_WvU_2ewh7ZGRwq8LdL2SV8B9RJmVGyUm1VAuOw";

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
            rerankingConfiguration={{ rerankerId: 272725719 }}
          />
        );
      }}
    </BrowserOnly>
  );
}
