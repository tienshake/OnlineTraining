import React from "react";
import styles from "./Profile.module.scss";
import { Box } from "@mui/material";
import { ButtonBack } from "../../components/Button";

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
            <li className={styles.listItem}>My Course</li>
            <li className={styles.listItem}>Reviews</li>
            <li className={styles.listItem}>Student</li>
            <li className={styles.listItem}>Edit Profile</li>
            <li className={styles.listItem}>Delete Profile</li>
            <li className={styles.listItem}>Sign Out</li>
          </ul>
        </Box>
      </Box>
      <Box className={styles.contentRight}>Profile</Box>
    </Box>
  );
};

export default Profile;
