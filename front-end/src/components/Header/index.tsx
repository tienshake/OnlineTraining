import React from "react";
import { TextField } from "@mui/material";
import styles from "./Header.module.scss";
import Button from "../Button";
import { Link, NavLink } from "react-router-dom";
import { IMG_URL, navList } from "../../constants/constants";
//Material UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { Button as ButtonMui } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Header = () => {
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

  const handleCloseUserMenu = () => {
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
              {navList.map((page, i) => (
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
          </Box>
          <Box className={styles.controlItem}>
            <Button variant="outlined" title="Login" path="/login" circle />
            <Button
              variant="outlined"
              title="Register"
              path="/register"
              circle
            />
          </Box>
          {true && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
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
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
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
//           {navList &&
//             navList?.map((item, i) => (
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
