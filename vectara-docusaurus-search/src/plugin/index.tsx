import { Root, createRoot } from "react-dom/client";
import { Search } from "../components/search/Search";

(function appendWidget() {
  let root: Root;

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

    if (searchContainer && searchContainer.childNodes.length === 0) {
      root = createRoot(searchContainer);
      root.render(
        <Search
          key={customerId}
          customerId={customerId}
          apiKey={apiKey}
          corpusId={corpusId}
        />
      );
      observer.disconnect();
    }
  });

  /**
   * Whenever docusaurus changes route, the nav bar gets rerendered.
   * This means we need to re-mount search into this new navbar instance.
   * When the docusaurus route changes:
   *  1. unmount search
   *  2. wait for the search container to be rendered into new page
   */
  const waitForSearchContainer = () => {
    if (root) {
      root.unmount();
    }
    observer.observe(document, {
      attributes: false,
      childList: true,
      characterData: false,
      subtree: true,
    });
  };

  document.addEventListener("onRouteUpdated", waitForSearchContainer);
})();
