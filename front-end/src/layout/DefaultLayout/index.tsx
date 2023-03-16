import React from "react";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  return (
    <div>
      đassdad
      {children}
      sdsadsadsads
    </div>
  );
};

export default DefaultLayout;
