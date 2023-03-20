import React from "react";
import { TextField } from "@mui/material";
import styles from "./Header.module.scss";
import Button from "../Button";
import { Link } from "react-router-dom";
import { IMG_URL, navList } from "../../constants/constants";
import { HOME_PATCH } from "../../constants/patch";

const Header = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.logoItem}>
          <Link to={HOME_PATCH}>
            <img src={IMG_URL} alt="logo" />
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
          {navList &&
            navList?.map((item, i) => (
              <Link key={i} to={item.patch}>
                {item.title}
              </Link>
            ))}
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
