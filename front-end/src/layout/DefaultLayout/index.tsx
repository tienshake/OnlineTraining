import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import styles from "./DefaultLayout.module.scss";

type Props = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className={styles.content}>{children}</div>
      <Footer />
    </>
  );
};

export default DefaultLayout;
