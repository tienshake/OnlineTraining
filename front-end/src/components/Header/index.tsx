import React, { useState } from "react";
import { Stack, TextField, IconButton, InputAdornment } from "@mui/material";
import styles from "./Header.module.scss";
import Button from "../Button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { NAV_LIST } from "../../constants/constants";
import Logo from "../../assets/images/logo.png";
//Material UI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
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
import MenuIcons from "../MenuIcons/MenuIcons";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsChatDots } from "react-icons/bs";
import { FcLike } from "react-icons/fc";
import { RiShoppingCartLine } from "react-icons/ri";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete } from "@mui/lab";
import checkDataApi from "../../utils/checkDataApi";
import covertB64 from "../../utils/covertB64";

const settings = ["Profile", "Logout"];

const Header = () => {
  const [keyword, setKeyword] = useState("");
  const [courses, setCourses] = useState<any>([]);
  const [showSearchList, setShowSearchList] = useState<any>(false);

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
    if (setting === "Profile") {
      navigate("/profile");
    }
    setAnchorElUser(null);
  };

  const handleSearch = async () => {
    setShowSearchList(true);
    try {
      const response = await axios.get(
        `https://nodejs-deploy-n9mo.onrender.com/courses/search?keyword=${keyword}`
      );
      const result = checkDataApi(response);
      console.log("result", result);
      if (result) {
        setCourses(result.data);
      }
    } catch (error) {
      console.error(error);
    }
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
              <img src={Logo} alt="logo" />
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
              value={keyword}
              onChange={(e: any) => {
                setKeyword(e.target.value);
                if (!e.target.value) {
                  setShowSearchList(false);
                }
              }}
              onKeyDown={(e: any) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {showSearchList && (
              <div className={styles.listOptionSearch}>
                {courses &&
                  courses.length > 0 &&
                  courses.map((course: any) => (
                    <Link
                      onClick={() => {
                        setShowSearchList(false);
                        setKeyword("");
                      }}
                      to={`/course-details/${course.id}`}
                      key={course.id}
                      className={styles.listSearch}
                    >
                      <img
                        src={covertB64(course.thumbnail)}
                        alt={course.title}
                      />
                      <h3>{course.title}</h3>
                    </Link>
                  ))}
                <Link
                  className={styles.moreCourse}
                  to="/course"
                  onClick={() => setShowSearchList(false)}
                >
                  Views More
                </Link>
              </div>
            )}
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

          {/* menu icons */}
          <Stack direction="row" spacing={1} mr={1}>
            <li>
              <MenuIcons
                typeContent="chat"
                iconMenu={<BsChatDots style={{ fontSize: "20px" }} />}
              />
            </li>
            <li>
              <MenuIcons
                typeContent="cart"
                iconMenu={<RiShoppingCartLine style={{ fontSize: "21px" }} />}
              />
            </li>
            <li>
              {" "}
              <MenuIcons
                typeContent="loveProduct"
                iconMenu={<FcLike style={{ fontSize: "23px" }} />}
              />
            </li>
            <li>
              {" "}
              <MenuIcons
                typeContent="notification"
                iconMenu={
                  <IoMdNotificationsOutline style={{ fontSize: "26px" }} />
                }
              />
            </li>
          </Stack>

          {isLogged ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={user.avatar && `${user?.avatar}`}
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
