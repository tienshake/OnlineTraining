import Range from "../Range/Range"
import "./Card.css"

export default function CardMyCourse() {
    return (
        <div className="wrapp_cardMyCourse">
            <img src="https://dreamslms.dreamguystech.com/html/assets/img/course/course-12.jpg" alt="" />

            <ul className="box_content">
                <li>Information About UI/UX Design Degree</li>
                <li className="group_ifo">
                    <p>ss 10 + Lesson</p>
                    <p>ss 7hr 20min</p>
                </li>
                <Range />
            </ul>

            <p className="box_amountStu-status">3200</p>
            <p className="box_amountStu-status"><button>Live</button></p>
        </div>
    )
}
