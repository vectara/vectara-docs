/**
 * This is temporary code to get the Search component running in a test page.
 * It will be deleted in favor of having the Docusaurus plugin render the component.
 */

import { Search } from "./components/search/Search";
import ReactDOM from 'react-dom/client';

function renderComponent() {
  const searchDiv = document.getElementById('search');

  if (searchDiv) {
    const root = ReactDOM.createRoot(searchDiv);
    const element = <Search
      customerId="129198459"
      apiKey="zwt_B7Npe-3FhMTcRqOLEgAOfvKS6bqQ1IhTP1QR3w"
      corpusId="3"
    />;
    root.render(element);
  }
};

renderComponent();
