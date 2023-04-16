import { Stack } from "@mui/material";
import Range from "../Range/Range";
import { FiBookOpen } from "react-icons/fi";
import { AiOutlineFieldTime } from "react-icons/ai";
import "./Card.css";
import { Link } from "react-router-dom";

export default function CardMyCourse() {
  return (
    <div className="wrapp_cardMyCourse">
      <img
        src="https://dreamslms.dreamguystech.com/html/assets/img/course/course-12.jpg"
        alt=""
      />

      <ul className="box_content">
        <h4>Information About UI/UX Design Degree</h4>
        <li className="group_ifo">
          {" "}
          <Stack alignItems={"center"} gap={"5px"} direction={"row"}>
            <FiBookOpen /> 10 + Lesson
          </Stack>{" "}
          <Stack alignItems={"center"} gap={"5px"} direction={"row"}>
            <AiOutlineFieldTime /> 7hr 20min
          </Stack>
        </li>
        <Range />
      </ul>

      <p className="box_amountStu-status">3200</p>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        gap={1}
        alignItems={"center"}
      >
        <div className="box_amountStu-status">
          <Link to={`/teacher/edit-course/7`}>
            <button>Edit</button>
          </Link>
        </div>
        <div className="box_amountStu-status">
          <Link to={`/teacher/edit-course/7`}>
            <button style={{ background: "#FF5E00" }}>Delete</button>
          </Link>
        </div>
      </Stack>
    </div>
  );
}
