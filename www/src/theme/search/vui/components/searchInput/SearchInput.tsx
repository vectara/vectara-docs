import { ChangeEventHandler, FormEventHandler, KeyboardEventHandler } from "react";
import classNames from "classnames";
import { BiChat } from "react-icons/bi";

const SIZE = ["m", "l"] as const;

type Props = {
  className?: string;
  value?: string;
  size?: (typeof SIZE)[number];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  autoFocus?: boolean;
  onSubmit?: FormEventHandler;
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>;
};

export const VuiSearchInput = ({
  className,
  size = "m",
  value,
  onChange,
  placeholder,
  autoFocus,
  onSubmit,
  ...rest
}: Props) => {
  const classes = classNames("vuiSearchInput", `vuiSearchInput--${size}`, className);
  return (
    <form onSubmit={onSubmit}>
      <div className={classes}>
        <input
          className="vuiSearchInput__input"
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

        <button className="vuiSearchInput__submitButton" onClick={onSubmit}>
          <BiChat size="20px" />
        </button>
      </div>
    </form>
  );
};
