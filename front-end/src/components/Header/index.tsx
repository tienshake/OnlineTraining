import React from "react";
import { TextField } from "@mui/material";
import styles from "./Header.module.scss";
import Button from "../Button";
import { Link, NavLink } from "react-router-dom";
import { IMG_URL, navList } from "../../constants/constants";

const Header = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.logoItem}>
          <Link to="/">
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
              <NavLink
                key={i}
                to={item.patch}
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                {item.title}
              </NavLink>
            ))}
        </li>
        <li className={styles.controlItem}>
          <Button variant="outlined" title="Login" path="/login" circle />
          <Button variant="outlined" title="Register" path="/register" circle />
        </li>
      </ul>
    </div>
  );
};

export default Header;
