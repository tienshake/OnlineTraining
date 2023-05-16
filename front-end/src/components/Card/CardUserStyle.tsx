import { FaUserFriends } from "react-icons/fa";
import { CardUserStyleProps } from "../../constants/constants";
import "./Card.css";
import covertB64 from "../../utils/covertB64";

export default function CardUserStyle(props: any) {
  return (
    <div className="cardUser_Style" style={{ width: `${props.widthCard}` }}>
      <img src={`${covertB64(props.data?.user_details.avatar)}`} alt="" />

      <h2>{props.data?.name}</h2>
      <p>UI Desiger</p>
      <p>
        {" "}
        <FaUserFriends /> 30 Student
      </p>
    </div>
  );
}
