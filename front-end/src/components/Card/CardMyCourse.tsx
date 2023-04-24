import { Stack } from "@mui/material";
// import Range from "../Range/Range";
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
import { STUDENT_ROUTE } from "../../constants/constants";
import StarGroup from "../IconGroup/StarGroup";
import convertSecondsToMinutes from "../../utils/convertSecondsToMinutes";

export default function CardMyCourse({
  course,
  getCourseMyData,
  userDecoded,
  handleClick,
}: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleConfirmDelete = async (id: any) => {
    setIsLoading(true);
    let data = null;
    let result = null;
    if (userDecoded?.role === STUDENT_ROUTE) {
      data = await courseServices.deleteEnrollmentCourseApi({
        course_id: course.id,
        user_id: userDecoded.id,
      });
      result = await checkDataApi(data);
    } else {
      data = await courseServices.deleteCourseApi(course.id);
      result = await checkDataApi(data);
    }
    if (result) {
      setIsLoading(false);
      getCourseMyData();
      toast.success("Delete Success");
    }
  };

  const handleDeleteCourse = (event: any, id: any) => {
    event.stopPropagation();
    confirmAlert({
      title: "Confirm deletion",
      message: "Are you sure you want to delete this category?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleConfirmDelete(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleLinkClick = (event: any) => {
    event.stopPropagation();
  };

  return (
    <div className="wrapp_cardMyCourse" onClick={() => handleClick(course.id)}>
      <LoadingModal isLoading={isLoading} />
      <img src={covertB64(course?.thumbnail)} alt="thumbnail" />

      <ul className="box_content">
        <h4>{course?.title}</h4>
        <li className="group_ifo">
          <Stack alignItems={"center"} gap={"5px"} direction={"row"}>
            <StarGroup rating={course && +course?.rating} />
          </Stack>
          <Stack alignItems={"center"} gap={"5px"} direction={"row"}>
            <AiOutlineFieldTime /> {convertSecondsToMinutes(course?.totalTime)}
          </Stack>
        </li>
      </ul>

      <p className="box_amountStu-status">{course?.enrollment_count} student</p>
      <Stack
        direction={"column"}
        justifyContent={"center"}
        gap={1}
        alignItems={"center"}
      >
        {userDecoded?.role !== STUDENT_ROUTE ? (
          <div className="box_amountStu-status">
            <Link
              to={`/teacher/edit-course/${course?.id}`}
              onClick={handleLinkClick}
            >
              <button>Edit</button>
            </Link>
          </div>
        ) : (
          <div className="box_amountStu-status">
            <Link to={`/learning/${course?.id}`} onClick={handleLinkClick}>
              <button>Learn now</button>
            </Link>
          </div>
        )}

        <div className="box_amountStu-status">
          {/* <Link to={`/teacher/edit-course/7`}> */}
          <button
            style={{ background: "#FF5E00" }}
            onClick={(e: any) => handleDeleteCourse(e, course?.id)}
          >
            Delete
          </button>
          {/* </Link> */}
        </div>
      </Stack>
    </div>
  );
}
