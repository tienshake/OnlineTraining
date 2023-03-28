import { MyCoursesCateProps } from "../../constants/constants";
import "./Card.css";


export default function CardCoursesCate(props: MyCoursesCateProps) {
    return (
        <div className="coursesCate">
            <div className="content_box">
                <img src={`${props.imageItem}`} alt="" />
                <h1>{props.titleItem}</h1>
                <p>{props.contentItem}</p>
            </div>

        </div>
    )
}
