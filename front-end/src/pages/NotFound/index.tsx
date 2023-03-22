import React from "react";
import styles from "./NotFound.module.scss";
import { Link } from "react-router-dom";
import icon1 from "../../assets/images/net-icon-01.png";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainWrapper}>
        <div className={styles.errorBox}>
          <div className={styles.errorLogo}>
            <Link to="/">
              <img src={icon1} className={styles.imgFluid} alt="Logo" />
            </Link>
          </div>
          <div className={styles.errorBoxImg}>
            <img
              src="https://dreamslms.dreamguystech.com/html/assets/img/error-01.png"
              alt=""
              className={styles.imgFluid}
            />
          </div>
          <h3 className={styles.h3}> Oh No! Error 404</h3>
          <p className={styles.p}>
            This page you requested counld not found. May the force be with you!
          </p>
          <Link to="/" className={styles.bnt}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
