import React from "react";
import styles from "./Profile.module.scss";
import { Box } from "@mui/material";
import { ButtonBack } from "../../components/Button";
import { NavLink, Outlet } from "react-router-dom";
import { MENU_PROFILE, TEACHER_ROUTE } from "../../constants/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import decodedToken from "../../utils/decodedToken";

const Profile = () => {
  const userRedux = useSelector((state: RootState) => state.auth.user);
  const user: any = decodedToken();

  const visibleMenu = MENU_PROFILE?.filter((menu) => {
    if (!menu.role) {
      return true; // always show menus with null role
    } else if (user?.role === TEACHER_ROUTE) {
      return true; // show all menus if user is a teacher
    }
    return menu.role === user?.role; // only show menus that match the user's role
  });

  return (
    <Box className={styles.container}>
      <Box className={styles.contentLeft}>
        <Box className={styles.info}>
          <Box className={styles.infoHeader}>
            <h5>Beginner</h5>
            <img
              className={styles.avatar}
              src={
                userRedux.avatar
                  ? `${userRedux?.avatar}`
                  : "https://img.freepik.com/free-icon/user_318-159711.jpg"
              }
              alt="Avatar"
            />
          </Box>
          <Box className={styles.infoContent}>
            <Box className={styles.infoName}>
              <h4>{userRedux.name}</h4>
              <p>{user.role}</p>
            </Box>
            {user?.role === TEACHER_ROUTE && (
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
            {visibleMenu?.map((menu, index) => (
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
