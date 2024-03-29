import classNames from "classnames";

type Props = {
  children?: React.ReactNode;
  footer?: React.ReactNode;
  align?: "center" | "left" | "right";
  className?: string;
  interactive?: boolean;
  padding?: "s" | "m" | "l";
};

export const VuiCard = ({
  children,
  footer,
  align = "left",
  interactive,
  className,
  padding = "s",
  ...rest
}: Props) => {
  const classes = classNames(
    "vuiCard",
    `vuiCard--${align}`,
    `vuiCard--${padding}`,
    {
      "vuiCard--interactive": interactive
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children && <div className="vuiCard__content">{children}</div>}
      {footer && <div className="vuiCard__footer">{footer}</div>}
    </div>
  );
};
