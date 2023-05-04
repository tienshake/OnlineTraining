import DefaultLayoutEdit from "../DefaultayoutEdit";
import { Stack } from "@mui/material";
import "./myCourse.css";
// import CardMainProduct from "../Card/CardMainProduct";
import CardMyCourse from "../Card/CardMyCourse";
import { useEffect, useState } from "react";
import courseServices from "../../services/course";
import checkDataApi from "../../utils/checkDataApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import decodedToken from "../../utils/decodedToken";
import { useNavigate } from "react-router-dom";
import LoadingModal from "../LoadingModal";

export default function MyCourse() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userDecoded: any = decodedToken();
  const [dataMyCourse, setDataMyCourse] = useState([]);
  const user = useSelector((state: RootState) => state.auth.user);
  let navigate = useNavigate();

  const getCourseMyData = async () => {
    setIsLoading(true);
    const data = await courseServices.getMyCourseApi(user.id);
    const result = checkDataApi(data);
    if (result) {
      setDataMyCourse(result.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.id) {
      getCourseMyData();
    }
  }, [user]);

  const handleClickCardCourse = (id: any) => {
    console.log("id", id);
    navigate("/course-details/" + id);
  };

  return (
    <DefaultLayoutEdit
      titleHeader="My Course"
      textHeader="Manage your courses and its update like live, draft and insight"
    >
      <LoadingModal isLoading={isLoading} />
      <div className="wrapper_mycourse">
        <div className="header_myCourse">
          <ul></ul>

          <Stack
            className="title_header-myCourse"
            direction="row"
            justifyContent={"space-between"}
            spacing={1}
            bgcolor={"#F0F0F0"}
          >
            <p>COURSES</p>
          </Stack>
        </div>

        <div className="body-myCourse">
          {dataMyCourse &&
            dataMyCourse.length > 0 &&
            dataMyCourse.map((course, index) => (
              <CardMyCourse
                course={course}
                key={index}
                getCourseMyData={getCourseMyData}
                userDecoded={userDecoded}
                handleClick={handleClickCardCourse}
              />
            ))}
        </div>
      </div>
    </DefaultLayoutEdit>
  );
}
