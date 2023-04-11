import { AiOutlineHeart } from "react-icons/ai";
import StarGroup from "../IconGroup/StarGroup";
import { CardMainProductProps } from "../../constants/constants";
import { Link } from "react-router-dom";
import Button from "../Button";
import styles from "../Header/Header.module.scss";
import { Box } from "@material-ui/core";
import { useState } from "react";
import "./Card.css";

export default function CardMainProduct(props: CardMainProductProps) {
  const [textStateBtn, setTextStateBtn] = useState(false);

  const handleHoverCardChangeTextBtn = () => {
    setTextStateBtn(true);
  };

  const handleRemoveHoverCardChangeTextBtn = () => {
    setTextStateBtn(false);
  };

  const handleClickLike = (e: any) => {
    e.preventdefault();
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
              <img
                src="https://dreamslms.dreamguystech.com/html/assets/img/user/user1.jpg"
                alt=""
              />
            </li>
            <li className="between-item">
              <b>Nicole Brown</b> <br />{" "}
              <p style={{ fontSize: "13px" }}>Instructor</p>{" "}
            </li>

            <Link to={`${props.preventPath}`}>
              <li>
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
            <>{console.log("Ratings", props)}</>
            <StarGroup rating={props.rating} />
          </div>

          <div style={{ marginTop: "10px" }}>
            <Box className={styles.controlItem}>
              <Button
                hoverCardChangeTextColor={textStateBtn}
                variant="outlined"
                title="BUY NOW"
                path={`/cart/${props.idCourse}`}
                circle
              />
            </Box>
          </div>
        </div>
      </div>
    </Link>
  );
}
