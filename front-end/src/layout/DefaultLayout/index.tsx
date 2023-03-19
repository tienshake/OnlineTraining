import React from "react";
import Header from "../../components/Header";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
      sdsadsadsads
    </div>
  );
};

export default DefaultLayout;
