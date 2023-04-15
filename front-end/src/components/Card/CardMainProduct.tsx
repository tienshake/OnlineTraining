import { AiOutlineHeart } from "react-icons/ai";
import StarGroup from "../IconGroup/StarGroup";
import { CardMainProductProps } from "../../constants/constants";
import { Link } from "react-router-dom";
import Button from "../Button";
import styles from "../Header/Header.module.scss";
import { Box } from "@material-ui/core";
import { useState } from "react";
import "./Card.css";
import { useDispatch } from "react-redux";
import { addCourseFavorite } from "../../redux/features/coursesFavorite/coursesFavoriteSlice";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { Stack } from "@mui/material";
import { BsCartPlus } from "react-icons/bs";

export default function CardMainProduct(props: CardMainProductProps) {
  /* get store redux */
  const dispatch = useDispatch();

  const [textStateBtn, setTextStateBtn] = useState(false);

  const handleHoverCardChangeTextBtn = () => {
    setTextStateBtn(true);
  };

  const handleRemoveHoverCardChangeTextBtn = () => {
    setTextStateBtn(false);
  };

  const handleClickFavoriteCourse = (e: any) => {
    e.preventDefault();
    dispatch(
      addCourseFavorite({
        idCourse: Number(props.idCourse),
        titleItem: `${props.titleItem}`,
        imageItem: `${props.imageItem}`,
        price: props.priceItem,
        promotion_price: props.promotion_price,
      })
    );
  };

  /* add to cart */
  const handleClickAddTocart = (e: any) => {
    e.preventDefault();
    dispatch(
      addToCart({
        idCourse: Number(props.idCourse),
        titleItem: `${props.titleItem}`,
        imageItem: `${props.imageItem}`,
        price: props.priceItem,
        promotion_price: props.promotion_price,
      })
    );
  };

  return (
    <Link to={`/course-details/${props.idCourse}`}>
      <div
        onMouseEnter={handleHoverCardChangeTextBtn}
        onMouseLeave={handleRemoveHoverCardChangeTextBtn}
        style={{
          width: `${props.widthCard}`,
          border: `${props.borderStyle ? "1px solid #e9ecef" : "none"}`,
          borderRadius: `${props.borderStyle ? "10px" : "none"}`,
        }}
        className="wrapp_cardProduts-content"
      >
        <div className="body_content-card">
          <img style={{ height: "180px" }} src={props.imageItem} alt="" />

          <ul className="box-content-user">
            <li>
              <img src={props.userAvatar} alt="" />
            </li>
            <li className="between-item">
              <b>{props.userName}</b> <br />{" "}
              <p style={{ fontSize: "13px" }}>Instructor</p>{" "}
            </li>

            <Link to={`${props.preventPath}`}>
              <li onClick={handleClickFavoriteCourse}>
                <AiOutlineHeart
                  style={{ fontSize: "22px", color: "red", marginTop: "5px" }}
                />
              </li>
            </Link>
          </ul>

          <h2>{props.titleItem}</h2>

          <ul className="group_btn-card">
            <li>
              <AiOutlineHeart style={{ marginRight: "5px" }} />
              12+ Lesson
            </li>

            <li>
              <AiOutlineHeart style={{ marginRight: "5px" }} />
              9hr Lesson
            </li>
          </ul>

          <p className="line-style"></p>

          <ul style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
            <h5 className="">{props.promotion_price}$</h5>
            <p style={{ textDecoration: "line-through", color: "#99968c" }}>
              {props.priceItem} $
            </p>
          </ul>

          <div className="group_icon-card">
            {/* <>{console.log("Ratings", props)}</> */}
            <StarGroup rating={props.rating} />
          </div>

          <div style={{ marginTop: "10px" }}>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Box className={styles.controlItem}>
                <Button
                  hoverCardChangeTextColor={textStateBtn}
                  variant="outlined"
                  title="BUY NOW"
                  path={`/checkout/${props.idCourse}`}
                  circle
                />
              </Box>

              <p onClick={handleClickAddTocart}>
                <BsCartPlus
                  style={{
                    fontSize: "22px",
                    color: "#ED6535",
                    marginTop: "10px",
                  }}
                />
              </p>
            </Stack>
          </div>
        </div>
      </div>
    </Link>
  );
}
