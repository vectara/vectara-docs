import React, {
  forwardRef,
  ForwardedRef,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { SearchInput } from "./SearchInput";
import {
  VuiFlexContainer,
  VuiFlexItem,
  VuiPortal,
  VuiScreenBlock,
  VuiSpacer,
  VuiText,
  VuiTextColor,
  VuiSpinner,
} from "./vui";
import { BiSearch } from "react-icons/bi";
import { FocusOn } from "react-focus-on";
import Link from "@docusaurus/Link";

type Props = {
  isLoading: boolean;
  searchValue?: string;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (evt: ReactKeyboardEvent) => void;
  sendSearch: () => void;
  onClose: () => void;
  resultsList: React.ReactNode;
  isOpen?: boolean;
};

export const SearchModal = forwardRef(
  (
    {
      isLoading,
      searchValue,
      onChange,
      onKeyDown,
      sendSearch,
      onClose,
      isOpen,
      resultsList,
    }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const returnFocusElRef = useRef<HTMLElement | null>(null);

    // Return focus on unmount.
    useEffect(() => {
      if (isOpen) {
        returnFocusElRef.current = document.activeElement as HTMLElement;
      } else {
        returnFocusElRef.current?.focus();
        returnFocusElRef.current = null;
      }
    }, [isOpen]);

    // Allow contents to respond to blur events before unmounting.
    const onCloseDelayed = () => {
      window.setTimeout(() => {
        onClose();
      }, 0);
    };

    return (
      <VuiPortal>
        {isOpen && (
          <VuiScreenBlock>
            <FocusOn
              onEscapeKey={onCloseDelayed}
              onClickOutside={onCloseDelayed}
              // Enable manual focus return to work.
              returnFocus={false}
              // Enable focus on contents when it's open,
              // but enable manual focus return to work when it's closed.
              autoFocus={isOpen}
            >
              <div className="searchModalContainer">
                <div ref={ref} className="searchModal">
                  <form>
                    <div className="searchForm">
                      <SearchInput
                        isLoading={isLoading}
                        value={searchValue}
                        onChange={onChange}
                        onKeyDown={onKeyDown}
                        placeholder="Search docs"
                      />
                      {isLoading ? (
                        <div className="submitSpinner">
                          <VuiSpinner size="xs" />
                        </div>
                      ) : (
                        <button
                          className="submitButton"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            sendSearch();
                          }}
                        >
                          <BiSearch size="20px" />
                        </button>
                      )}
                    </div>
                  </form>

                  {resultsList && (
                    <div className="searchModalResults">{resultsList}</div>
                  )}

                  <div className="searchModalFooter">
                    <VuiSpacer size="xs" />

                    <VuiFlexContainer
                      alignItems="center"
                      justifyContent="spaceBetween"
                    >
                      <VuiFlexItem>
                        <VuiText size="s" align="right">
                          <p>
                            <strong>
                              <VuiTextColor color="subdued">
                                Built with
                              </VuiTextColor>{" "}
                              <Link to="https://vectara.com">Vectara</Link>
                            </strong>
                          </p>
                        </VuiText>
                      </VuiFlexItem>

                      <VuiFlexItem>
                        <VuiText>
                          <p>
                            <VuiTextColor color="subdued">Ctrl+K</VuiTextColor>
                          </p>
                        </VuiText>
                      </VuiFlexItem>
                    </VuiFlexContainer>

                    <VuiSpacer size="xs" />
                  </div>
                </div>
              </div>
            </FocusOn>
          </VuiScreenBlock>
        )}
      </VuiPortal>
    );
  }
);
