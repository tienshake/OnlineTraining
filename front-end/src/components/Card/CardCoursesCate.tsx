import "./Card.css";

interface MyCoursesCateProps {
    imageItem: String,
    titleItem: String,
    contentItem: String
}

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
