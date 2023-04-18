import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import "./MenuIcons.css";
import { Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import { removeProduct } from "../../redux/features/coursesFavorite/coursesFavoriteSlice";
import { useDispatch } from "react-redux";
import { removeCart } from "../../redux/features/cart/cartSlice";
import { Link } from "react-router-dom";

interface MyPropsMenuIcons {
  iconMenu: React.ReactNode;
  typeContent: string;
}

export default function MenuIcons(props: MyPropsMenuIcons) {
  /* store */
  const listFavoriteCourse = useSelector(
    (state: RootState) => state.favoriteCoures.listCoursesFavorite
  );
  const listItemsCart = useSelector(
    (state: RootState) => state.cart.listItemsCarts
  );
  const đispatch = useDispatch();

  /*  */
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* remove favorite  */
  const handleRemoveFavorite = (id: number) => {
    đispatch(removeProduct(id));
  };

  /* remove cart  */
  const handleRemoveCart = (id: number) => {
    đispatch(removeCart(id));
  };

  const caculatePriceTotal = () => {
    let total = 0;

    for (let i = 0; i < listItemsCart.length; i++) {
      total += listItemsCart[i].promotion_price;
    }

    return total;
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            {props.iconMenu}
          </IconButton>
        </Tooltip>
      </Box>

      <Menu
        disableScrollLock={true}
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            maxHeight: "400px",
            width: "29%",
            p: 1,
            overflowY: "scroll",
            paddingTop: "0px",
            // overflow: 'auto',
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
            /* srcoll */
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "rgba(0,0,0,0.1)",
              borderRadius: "999px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: "999px",
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* check type */}
        {props.typeContent === "notification" ? (
          <div>Notificate</div>
        ) : props.typeContent === "cart" ? (
          <div>
            {listItemsCart.length > 0 ? (
              <>
                <Stack
                  className="header_modal-menuIcon"
                  direction="row"
                  justifyContent={"space-between"}
                  spacing={1}
                  mr={1}
                >
                  <p>View Cart</p>
                  <p>Checkout</p>
                </Stack>

                {listItemsCart.map(
                  (data: {
                    idCourse: number;
                    titleItem?: string;
                    imageItem?: string;
                    price?: number;
                    promotion_price?: number;
                  }) => (
                      <Stack
                        key={data.idCourse}
                        className="wrapp_item_boxModal"
                        direction="row"
                        justifyContent={"space-between"}
                        spacing={1}
                        mt={2}
                        mr={1}
                      >
                        <Link to={`/course-details/${data.idCourse}`}>
                          <Stack
                            direction="row"
                            justifyContent={"space-between"}
                            spacing={1}
                          >
                            <p className="imgItemCart">
                              <img src={`${data.imageItem}`} alt="" />
                            </p>

                            <div className="content_ItemCart">
                              <h1>{data.titleItem}</h1>
                              <p>By Dave Franco</p>
                              <p>
                                <b style={{ color: "red" }}>
                                  ${data.promotion_price}
                                </b>
                                ${data.price}
                              </p>
                            </div>
                          </Stack>
                        </Link>
                        <button
                          onClick={() => handleRemoveCart(data.idCourse)}
                          className="btn-remove-cart"
                        >
                          Remove
                        </button>
                      </Stack>
                  )
                )}

                <Stack direction="row" justifyContent={"space-between"}>
                  <p style={{ fontSize: "13px", marginTop: "6px" }}>
                    Total Amout: <b>{listItemsCart.length}</b>
                  </p>
                  <p style={{ fontSize: "13px", marginTop: "6px" }}>
                    Total Price: <b>{caculatePriceTotal()}</b>
                  </p>
                </Stack>
              </>
            ) : (
              <>Cart is empty!</>
            )}
          </div>
        ) : props.typeContent === "loveProduct" ? (
          <div>
            {listFavoriteCourse.length > 0 ? (
              <>
                {/* <Stack className='header_modal-menuIcon' direction="row" justifyContent={'space-between'} spacing={1} mr={1}>
                                                <p>View Cart</p>
                                                <p>Checkout</p>
                                            </Stack> */}
                {listFavoriteCourse.map(
                  (data: {
                    idCourse: number;
                    titleItem?: string;
                    imageItem?: string;
                    price?: number;
                    promotion_price?: number;
                  }) => (
                      <Stack
                        key={data.idCourse}
                        className="wrapp_item_boxModal"
                        direction="row"
                        justifyContent={"space-between"}
                        spacing={1}
                        mt={2}
                        mr={1}
                      >
                        <Link to={`/course-details/${data.idCourse}`}>
                          <Stack
                            direction="row"
                            justifyContent={"space-between"}
                            spacing={1}
                          >
                            <p className="imgItemCart">
                              <img src={`${data.imageItem}`} alt="" />
                            </p>

                            <div className="content_ItemCart">
                              <h1>{data.titleItem}</h1>
                              <p>By Dave Franco</p>
                              <p>
                                <b style={{ color: "red" }}>
                                  ${data.promotion_price}
                                </b>
                                ${data.price}
                              </p>
                            </div>
                          </Stack>
                        </Link>
                        <button
                          onClick={() => handleRemoveFavorite(data.idCourse)}
                          className="btn-remove-cart"
                        >
                          Remove
                        </button>
                      </Stack>
                  )
                )}
                <Stack direction="row" justifyContent={"space-between"}>
                  <p style={{ fontSize: "13px", marginTop: "6px" }}>
                    Total Amout: <b>{listFavoriteCourse.length}</b>
                  </p>
                </Stack>
              </>
            ) : (
              <>Favorites list is empty!</>
            )}
          </div>
        ) : props.typeContent === "chat" ? (
          <div>chat</div>
        ) : (
          <div>notification</div>
        )}
      </Menu>
    </>
  );
}
