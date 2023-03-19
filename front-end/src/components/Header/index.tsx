import React from "react";
import { TextField } from "@mui/material";
import styles from "./Header.module.scss";
import Button from "../Button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.logoItem}>
          <Link to={"/home"}>
            <img
              src="https://tudienwiki.com/wp-content/uploads/2017/07/lien-minh-huyen-thoai.png"
              alt="logo"
            />
          </Link>
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
          <div>Create Course</div>
        </li>
        <li className={styles.controlItem}>
          <Button variant="outlined" title="Login" path="/login" />
          <Button variant="outlined" title="Register" path="/register" />
        </li>
      </ul>
    </div>
  );
};

export default Header;
