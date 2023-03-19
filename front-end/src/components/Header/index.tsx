import React from "react";
import { TextField, Button } from "@mui/material";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.logoItem}>
          <img
            src="https://tudienwiki.com/wp-content/uploads/2017/07/lien-minh-huyen-thoai.png"
            alt="logo"
          />
        </li>
        <li className={styles.inputItem}>
          <TextField
            hiddenLabel
            variant="outlined"
            size="small"
            className={styles.textField}
            placeholder="Search..."
          />
        </li>
        <li className={styles.listItem}>
          <div>Course</div>
          <div>Blog</div>
          <div>My Course</div>
        </li>
        <li className={styles.controlItem}>
          <Button variant="outlined">Login</Button>
          <Button variant="outlined">Register</Button>
        </li>
      </ul>
    </div>
  );
};

export default Header;
