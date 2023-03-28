import { AiOutlineHeart } from "react-icons/ai"
import StarGroup from "../IconGroup/StarGroup"
import "./Card.css"

export default function CardMainProduct() {
    return (
        <div className='wrapp_cardProduts-content'>
            <div className="body_content-card">
                <img src='https://dreamslms.dreamguystech.com/html/assets/img/course/course-01.jpg' alt='' />

                <ul className="box-content-user">
                    <li><img src="https://dreamslms.dreamguystech.com/html/assets/img/user/user1.jpg" alt="" /></li>
                    <li className="between-item"><b>Nicole Brown</b> <br /> <p style={{ fontSize: '13px' }}>Instructor</p> </li>
                    <li><AiOutlineHeart style={{ fontSize: '22px', color: 'red', marginTop: '5px' }} /></li>
                </ul>

                <h2>Information About UI/UX Design Degree</h2>

                <ul className="group_btn-card">
                    <li>
                        <AiOutlineHeart style={{ marginRight: '5px' }} />
                        12+ Lesson
                    </li>

                    <li>
                        <AiOutlineHeart style={{ marginRight: '5px' }} />
                        9hr Lesson
                    </li>
                </ul>

                <p className="line-style"></p>

                <div className="group_icon-card">
                    <StarGroup/>
                </div>
            </div>
        </div>
    )
}
