import React from "react";
import classNames from "classnames";
import "./grid.scss";

export const COLUMNS = [1, 2, 3] as const;
export type Columns = (typeof COLUMNS)[number];

type Props = {
  children?: React.ReactNode;
  columns?: Columns;
};

export const Grid = ({ children, columns = 2 }: Props) => {
  const classes = classNames("gridLayout", `gridLayout--columns${columns}`);

  return (
    <div className="gridLayoutContainer">
      <div className={classes}>{children}</div>
    </div>
  );
};
