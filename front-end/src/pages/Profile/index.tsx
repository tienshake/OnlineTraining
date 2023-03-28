import React from "react";
import styles from "./Profile.module.scss";
import { Box } from "@mui/material";
import { ButtonBack } from "../../components/Button";
import { Link, Outlet } from "react-router-dom";
import { MENU_PROFILE } from "../../constants/constants";

const Profile = () => {
  return (
    <Box className={styles.container}>
      <Box className={styles.contentLeft}>
        <Box className={styles.info}>
          <Box className={styles.infoHeader}>
            <h5>Beginner</h5>
            <img
              className={styles.avatar}
              src="https://dreamslms.dreamguystech.com/html/assets/img/user/user15.jpg"
              alt="info"
            />
          </Box>
          <Box className={styles.infoContent}>
            <Box className={styles.infoName}>
              <h4>Jenny Wilson</h4>
              <p>Instructor</p>
            </Box>
            <ButtonBack title="Create New Course" />
          </Box>
        </Box>
        <Box className={styles.menu}>
          <Box className={styles.menuHeader}>DASHBOARD</Box>
          <ul className={styles.listMenu}>
            {MENU_PROFILE?.map((menu, index) => (
              <li key={index} className={styles.listItem}>
                <Link to={menu.patch}>{menu.title}</Link>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
      <Box className={styles.contentRight}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Profile;
