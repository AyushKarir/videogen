import React from "react";

type Props = {
  children: React.ReactNode;
};

const SidebarWrapper = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default SidebarWrapper;
