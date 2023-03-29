import React from "react";
import { TextField } from "@mui/material";
import styles from "./Header.module.scss";
import Button from "../Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IMG_URL, NAV_LIST } from "../../constants/constants";
//Material UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { RootState } from "../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../redux/features/auth";
import { removeUserToken } from "../../utils/userToken";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
  const isLogged = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  let navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: any) => {
    if (setting === "Logout") {
      removeUserToken();
      dispatch(logoutSuccess());
      navigate("/login");
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container className={styles.container}>
        <Toolbar disableGutters className={styles.list}>
          <Box
            className={styles.logoItem}
            sx={{
              display: { xs: "none", md: "flex" },
              paddingRight: 5,
            }}
          >
            <Link to="/">
              <img src={IMG_URL} alt="logo" />
            </Link>
          </Box>
          <Box
            className={styles.inputItem}
            sx={{
              display: { xs: "none", md: "flex" },
              paddingRight: 5,
            }}
          >
            <TextField
              hiddenLabel
              variant="outlined"
              size="small"
              className={styles.textField}
              placeholder="Search..."
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon className={styles.menuIcon} />
            </IconButton>
            <Menu
              disableScrollLock={true}
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
              className={styles.listItem}
            >
              {NAV_LIST.map((page, i) => (
                <MenuItem
                  key={i}
                  onClick={handleCloseNavMenu}
                  style={{ display: "fixed" }}
                >
                  <NavLink
                    key={i}
                    to={page.patch}
                    className={({ isActive }) =>
                      isActive ? styles.active : ""
                    }
                  >
                    {page.title}
                  </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <Link to="/" className={styles.logoItem}>
              <img src={IMG_URL} alt="logo" />
            </Link>
          </Box>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            className={styles.listItem}
          >
            {NAV_LIST &&
              NAV_LIST?.map((item, i) => (
                <NavLink
                  key={i}
                  to={item.patch}
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  {item.title}
                </NavLink>
              ))}
          </Box>

          {isLogged ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={
                      user.avatar && `data:image/jpeg;base64,${user?.avatar}`
                    }
                    style={{
                      border: "1px solid black",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                disableScrollLock={true}
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    {setting}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box className={styles.controlItem}>
              <Button variant="outlined" title="Login" path="/login" circle />
              <Button
                variant="outlined"
                title="Register"
                path="/register"
                circle
              />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

// <div className={styles.container} style={{ display: "none" }}>
//       <ul className={styles.list}>
//         <li className={styles.logoItem}>
//           <Link to="/">
//             <img src={IMG_URL} alt="logo" />
//           </Link>
//         </li>
//         <li className={styles.inputItem}>
//           <TextField
//             hiddenLabel
//             variant="outlined"
//             size="small"
//             className={styles.textField}
//             placeholder="Search..."
//           />
//         </li>
//         <li className={styles.listItem}>
//           {NAV_LIST &&
//             NAV_LIST?.map((item, i) => (
//               <NavLink
//                 key={i}
//                 to={item.patch}
//                 className={({ isActive }) => (isActive ? styles.active : "")}
//               >
//                 {item.title}
//               </NavLink>
//             ))}
//         </li>
//         <li className={styles.controlItem}>
//           <Button variant="outlined" title="Login" path="/login" circle />
//           <Button
//             variant="outlined"
//             title="Register"
//             path="/register"
//             circle
//           />
//         </li>
//       </ul>
//     </div>
