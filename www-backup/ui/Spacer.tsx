import React from "react";
import classNames from "classnames";
import "./spacer.scss";

const SPACER_SIZE = ["xxxs", "xxs", "xs", "s", "m", "l", "xl", "xxl"] as const;

interface Props {
  size: (typeof SPACER_SIZE)[number];
}

export const Spacer = ({ size = "m" }: Props) => {
  const classes = classNames("spacer", { [`spacer--${size}`]: size });
  return <div className={classes} />;
};
