// By default, the classic theme does not provide any SearchBar implementation
// If you swizzled this, it is your responsibility to provide an implementation
// Tip: swizzle the SearchBar from the Algolia theme for inspiration:
// npm run swizzle @docusaurus/theme-search-algolia SearchBar

import { IconNames } from "@blueprintjs/icons";
import React, { useEffect, useRef, useState } from "react";
import { Button, Classes, Code, H3, H5, Intent, Dialog, Switch } from "@blueprintjs/core";

import './SearchBar.css';

function VectaraSearch() {
  const [isOpen, setIsOpen] = useState(false);

  var handleOpen = () => setIsOpen(true);
  var handleClose = () => setIsOpen(false);

  return (
    <div>
      <Button text="Search with Vectara" onClick={handleOpen} />
      <Dialog
        onClose={handleClose}
        isOpen={isOpen}
        icon={IconNames.SEARCH}
        title={"Search documentation and more"}
        includeFooter={false}
        transitionDuration={50}
      >
        <div>
          <div className="search-header">
            <div className="zirSearch">
              <input autoFocus placeholder="Enter your query" />
              <button alt="Search">
                <img
                  width="26"
                  height="26"
                  alt="Vectara Logo"
                  src="/img/vectara-colored-logo.png"
                />
              </button>
            </div>
          </div>
          <div className="search-body"></div>
          <div className="search-footer">
            <div class="DocSearch-Logo">
              <a
                href="https://www.vectara.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span class="DocSearch-Label">Search by</span>
                <img height="15" src="/img/vectara_wordmark.png"></img>
              </a>
            </div>
            <ul class="DocSearch-Commands">
              <li>
                <span class="DocSearch-Commands-Key">
                  <svg width="15" height="15">
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.2"
                    >
                      <path d="M12 3.53088v3c0 1-1 2-2 2H4M7 11.53088l-3-3 3-3"></path>
                    </g>
                  </svg>
                </span>
                <span class="DocSearch-Label">to select</span>
              </li>
              <li>
                <span class="DocSearch-Commands-Key">
                  <svg width="15" height="15">
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.2"
                    >
                      <path d="M7.5 3.5v8M10.5 8.5l-3 3-3-3"></path>
                    </g>
                  </svg>
                </span>
                <span class="DocSearch-Commands-Key">
                  <svg width="15" height="15">
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.2"
                    >
                      <path d="M7.5 11.5v-8M10.5 6.5l-3-3-3 3"></path>
                    </g>
                  </svg>
                </span>
                <span class="DocSearch-Label">to navigate</span>
              </li>
              <li>
                <span class="DocSearch-Commands-Key">
                  <svg width="15" height="15">
                    <g
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.2"
                    >
                      <path d="M13.6167 8.936c-.1065.3583-.6883.962-1.4875.962-.7993 0-1.653-.9165-1.653-2.1258v-.5678c0-1.2548.7896-2.1016 1.653-2.1016.8634 0 1.3601.4778 1.4875 1.0724M9 6c-.1352-.4735-.7506-.9219-1.46-.8972-.7092.0246-1.344.57-1.344 1.2166s.4198.8812 1.3445.9805C8.465 7.3992 8.968 7.9337 9 8.5c.032.5663-.454 1.398-1.4595 1.398C6.6593 9.898 6 9 5.963 8.4851m-1.4748.5368c-.2635.5941-.8099.876-1.5443.876s-1.7073-.6248-1.7073-2.204v-.4603c0-1.0416.721-2.131 1.7073-2.131.9864 0 1.6425 1.031 1.5443 2.2492h-2.956"></path>
                    </g>
                  </svg>
                </span>
                <span class="DocSearch-Label">to close</span>
              </li>
            </ul>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default VectaraSearch;

