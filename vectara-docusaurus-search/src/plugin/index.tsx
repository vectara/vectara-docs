import { createRoot } from "react-dom/client";
import { Search } from "../components/search/Search";

(function appendWidget() {
  // When the search container has been added to the DOM,
  // add the search component to it.
  var observer = new MutationObserver(() => {
    const searchConfig = (window as any).vectara?.plugins?.search;
    if (!searchConfig) {
      return;
    }

    const {
      containerId: widgetContainerId,
      customerId,
      apiKey,
      corpusId,
    } = searchConfig;

    if (!customerId || !apiKey || !corpusId) {
      console.warn(
        "Vectara Search: Customer ID, API key, and Corpus ID are required."
      );
      return;
    }

    const searchContainer = document.getElementById(
      widgetContainerId ?? "search"
    );

    if (searchContainer) {
      const root = createRoot(searchContainer);
      root.render(
        <Search customerId={customerId} apiKey={apiKey} corpusId={corpusId} />
      );
      observer.disconnect();
    }
  });

  observer.observe(document, {
    attributes: false,
    childList: true,
    characterData: false,
    subtree: true,
  });
})();
