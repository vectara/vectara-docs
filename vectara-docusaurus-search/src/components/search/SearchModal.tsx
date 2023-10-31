import {
  forwardRef,
  ForwardedRef,
  useEffect,
  useRef,
  ChangeEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { SearchInput } from "./SearchInput";
import {
  VuiLinkInternal,
  VuiPortal,
  VuiScreenBlock,
  VuiSpacer,
  VuiText,
  VuiTextColor,
} from "../../../vui";
import { FocusOn } from "react-focus-on";

type Props = {
  isLoading: boolean;
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (evt: ReactKeyboardEvent) => void;
  onClose: () => void;
  resultsList: React.ReactNode;
  isOpen?: boolean;
};

export const SearchModal = forwardRef(
  (
    { isLoading, onChange, onKeyDown, onClose, isOpen, resultsList }: Props,
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
                  <SearchInput
                    isLoading={isLoading}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    placeholder="Search docs"
                  />

                  {resultsList && (
                    <div className="searchModalResults">{resultsList}</div>
                  )}

                  <div className="searchModalSection searchModalFooter">
                    <VuiSpacer size="xs" />

                    <VuiText size="s" align="right">
                      <p>
                        <VuiTextColor color="subdued">Built with</VuiTextColor>{" "}
                        <VuiLinkInternal
                          href="https://vectara.com"
                          target="_blank"
                        >
                          Vectara
                        </VuiLinkInternal>
                      </p>
                    </VuiText>

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
