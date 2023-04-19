import { Stack } from "@mui/material";
// import Range from "../Range/Range";
import { FiBookOpen } from "react-icons/fi";
import { AiOutlineFieldTime } from "react-icons/ai";
import "./Card.css";
import { Link } from "react-router-dom";
import covertB64 from "../../utils/covertB64";
import courseServices from "../../services/course";
import { confirmAlert } from "react-confirm-alert";
import checkDataApi from "../../utils/checkDataApi";
import { toast } from "react-toastify";
import LoadingModal from "../LoadingModal";
import { useState } from "react";

export default function CardMyCourse({ course, getCourseMyData }: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleDeleteCourse = async (id: any) => {
    confirmAlert({
      title: "Confirm deletion",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setIsLoading(true);
            const data = await courseServices.deleteCourseApi(id);
            const result = await checkDataApi(data);
            if (result) {
              setIsLoading(false);
              getCourseMyData();
              toast.success("Delete Success");
            }
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="wrapp_cardMyCourse">
      <LoadingModal isLoading={isLoading} />
      <img src={covertB64(course?.thumbnail)} alt="thumbnail" />

      <ul className="box_content">
        <h4>{course?.title}</h4>
        <li className="group_ifo">
          <Stack alignItems={"center"} gap={"5px"} direction={"row"}>
            <FiBookOpen /> 10 + Lesson
          </Stack>
          <Stack alignItems={"center"} gap={"5px"} direction={"row"}>
            <AiOutlineFieldTime /> 7hr 20min
          </Stack>
        </li>
      </ul>

      <p className="box_amountStu-status">3200</p>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        gap={1}
        alignItems={"center"}
      >
        <div className="box_amountStu-status">
          <Link to={`/teacher/edit-course/${course?.id}`}>
            <button>Edit</button>
          </Link>
        </div>
        <div className="box_amountStu-status">
          {/* <Link to={`/teacher/edit-course/7`}> */}
          <button
            style={{ background: "#FF5E00" }}
            onClick={() => handleDeleteCourse(course?.id)}
          >
            Delete
          </button>
          {/* </Link> */}
        </div>
      </Stack>
    </div>
  );
}
