import React from "react";
import styles from "./Profile.module.scss";
import { Box } from "@mui/material";
import { ButtonBack } from "../../components/Button";
import { NavLink, Outlet } from "react-router-dom";
import { MENU_PROFILE } from "../../constants/constants";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store/store";
import decodedToken from "../../utils/decodedToken";

const Profile = () => {
  // const user = useSelector((state: RootState) => state.auth.user);
  const user: any = decodedToken();

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
            {user?.role === "teacher" && (
              <ButtonBack
                title="Create New Course"
                path="/teacher/create-course"
              />
            )}
          </Box>
        </Box>
        <Box className={styles.menu}>
          <Box className={styles.menuHeader}>DASHBOARD</Box>
          <ul className={styles.listMenu}>
            {MENU_PROFILE?.map((menu, index) => (
              <li key={index} className={styles.listItem}>
                <NavLink
                  to={menu.patch}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  {menu.title}
                </NavLink>
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
