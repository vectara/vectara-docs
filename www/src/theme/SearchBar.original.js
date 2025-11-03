"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchBar;
var react_1 = require("react");
var BrowserOnly_1 = require("@docusaurus/BrowserOnly");
var CUSTOMER_ID = "1526022105";
var CORPUS_ID = "232";
var API_KEY = "zqt_WvU_2ewh7ZGRwq8LdL2SV8B9RJmVGyUm1VAuOw";
function SearchBar() {
    return (<BrowserOnly_1.default>
      {function () {
            var ReactSearch = require("@vectara/react-search").ReactSearch;
            var persistToggleSummaryState = function (isSummaryVisible) {
                localStorage.setItem("isSummaryVisible", isSummaryVisible ? "true" : "false");
            };
            var isSummaryToggleInitiallyEnabled = localStorage.getItem("isSummaryVisible");
            return (<ReactSearch key={CUSTOMER_ID} customerId={CUSTOMER_ID} corpusId={CORPUS_ID} apiKey={API_KEY} onToggleSummary={function (isSummaryVisible) {
                    return persistToggleSummaryState(isSummaryVisible);
                }} isSummaryToggleVisible={true} isSummaryToggleInitiallyEnabled={isSummaryToggleInitiallyEnabled === "true"} rerankingConfiguration={{ rerankerId: 272725719 }}/>);
        }}
    </BrowserOnly_1.default>);
}
