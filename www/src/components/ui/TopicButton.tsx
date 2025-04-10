import React from "react";
import "./topicButton.scss";

type Props = {
  children?: React.ReactNode;
  className?: string;
  href: string;
  title?: string;
};

export const TopicButton = ({
  children,
  className,
  href,
  title,
  ...rest
}: Props) => {
  return (
    <a className="topicButton" href={href} {...rest}>
      {title && (
        <>
          <div className="topicButton__title">{title}</div>
        </>
      )}

      {children}
    </a>
  );
};
