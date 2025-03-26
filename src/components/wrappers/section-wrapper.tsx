import React from "react";

type Props = {
  children: React.ReactNode;
};

const SectionWrapper = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default SectionWrapper;
