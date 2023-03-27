import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./DefaultLayout.module.scss";

type Props = {
  children: React.ReactNode;
  onlyHome?: boolean;
  onlyNotFound?: boolean;
};

const DefaultLayout = ({ children, onlyHome = false, onlyNotFound }: Props) => {
  const styleHome =
    onlyNotFound || onlyHome ? { maxWidth: "100%", background: "#fff" } : {};

  return (
    <>
      <Header />
      <div className={styles.content} style={styleHome}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
