import { Stack } from "@mui/material"
import Range from "../Range/Range"
import { FiBookOpen } from 'react-icons/fi';
import { AiOutlineFieldTime } from 'react-icons/ai';
import "./Card.css"

export default function CardMyCourse() {
    return (
        <div className="wrapp_cardMyCourse">
            <img src="https://dreamslms.dreamguystech.com/html/assets/img/course/course-12.jpg" alt="" />

            <ul className="box_content">
                <h4>Information About UI/UX Design Degree</h4>
                <li className="group_ifo">

                    <p> <Stack alignItems={"center"} gap={"5px"} direction={"row"}><FiBookOpen /> 10 + Lesson</Stack></p>
                    <p> <Stack alignItems={"center"} gap={"5px"} direction={"row"}><AiOutlineFieldTime /> 7hr 20min</Stack></p>
                </li>
                <Range />
            </ul>

            <p className="box_amountStu-status">3200</p>
            <Stack direction={"column"} justifyContent={"center"} gap={1} alignItems={"center"}>
                <p className="box_amountStu-status"><button>Edit</button></p>
                <p className="box_amountStu-status"><button style={{ background: '#FF5E00' }}>Delete</button></p>
            </Stack>

        </div>
    )
}
