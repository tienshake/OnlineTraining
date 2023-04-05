import { AiOutlineHeart } from "react-icons/ai";
import StarGroup from "../IconGroup/StarGroup";
import { CardMainProductProps } from "../../constants/constants";
import "./Card.css";

export default function CardMainProduct(props: CardMainProductProps) {
  return (
    <div
      style={{
        width: `${props.widthCard}`,
        border: `${props.borderStyle ? "1px solid #e9ecef" : "none"}`,
        borderRadius: `${props.borderStyle ? "10px" : "none"}`,
      }}
      className="wrapp_cardProduts-content"
    >
      <div className="body_content-card">
        <img src={props.imageItem} alt="" />

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
          <li>
            <AiOutlineHeart
              style={{ fontSize: "22px", color: "red", marginTop: "5px" }}
            />
          </li>
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
          <h5 className="">{props.priceItem}$</h5>
          <p style={{ textDecoration: "line-through", color: "#99968c" }}>
            {props.promotion_price}$
          </p>
        </ul>

        <div className="group_icon-card">
          <StarGroup />
        </div>
      </div>
    </div>
  );
}
