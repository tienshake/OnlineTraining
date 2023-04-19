import React from "react";
import styles from "./GlobalStyle.module.scss";
import { ToastContainer } from "react-toastify";

type Props = {
  children?: React.ReactNode;
};

const GlobalStyle = ({ children }: Props) => {
  return (
    <div className={styles.container}>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={100}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
};

export default GlobalStyle;
