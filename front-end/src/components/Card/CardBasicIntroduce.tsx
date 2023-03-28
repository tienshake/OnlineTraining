import { MyCardBasicIntroduceProps } from "../../constants/constants";
import "./Card.css";


export default function CardBasicIntroduce(props:MyCardBasicIntroduceProps) {
    return (
        <div className='card_basic-intro'>
            <p className="content-left">
                <img src={`${props.imageItem}`} alt="" />
            </p>

            <ul>
                <h1 className="title-card">{props.titleItem}</h1>
                <p>{props.contentItem}</p>
            </ul>
        </div>
    )
}
