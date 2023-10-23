import {
  ChangeEventHandler,
  FormEventHandler,
  KeyboardEventHandler,
} from "react";
import classNames from "classnames";
import { BiSearch } from "react-icons/bi";
import { VuiSpinner } from "../../../vui";

const SIZE = ["m", "l"] as const;

type Props = {
  value?: string;
  size?: (typeof SIZE)[number];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  autoFocus?: boolean;
  onSubmit?: FormEventHandler;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
  isLoading?: boolean;
};

export const SearchInput = ({
  size = "m",
  value,
  onChange,
  placeholder,
  autoFocus,
  onSubmit,
  isLoading,
  ...rest
}: Props) => {
  const classes = classNames("searchInput", `searchInput--${size}`);

  return (
    <form onSubmit={onSubmit}>
      <div className={classes}>
        <input
          className="searchInput__input"
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          autoFocus={autoFocus}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...rest}
        />

        {isLoading ? (
          <div className="searchInput__submitButton">
            <VuiSpinner size="xs" />
          </div>
        ) : (
          <button className="searchInput__submitButton" onClick={onSubmit}>
            <BiSearch size="20px" />
          </button>
        )}
      </div>
    </form>
  );
};
