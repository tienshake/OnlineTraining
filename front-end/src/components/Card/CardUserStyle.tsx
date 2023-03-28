import { FaUserFriends } from "react-icons/fa";
import { CardUserStyleProps } from "../../constants/constants";
import "./Card.css"

export default function CardUserStyle(props: CardUserStyleProps) {
    return (
        <div className="cardUser_Style" style={{ width: `${props.widthCard}` }}>
            <img src={`${props.imageItem}`} alt="" />

            <h2>Skyler Trường</h2>
            <p>UI Desiger</p>
            <p> <FaUserFriends /> 30 Student</p>
        </div>
    )
}
