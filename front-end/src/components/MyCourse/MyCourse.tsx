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

export default function MyCourse() {
  const [dataMyCourse, setDataMyCourse] = useState([]);
  const user = useSelector((state: RootState) => state.auth.user);

  const getCourseMyData = async () => {
    const data = await courseServices.getMyCourseApi(user.id);
    const result = checkDataApi(data);
    if (result) {
      setDataMyCourse(result.data);
    }
  };

  useEffect(() => {
    if (user.id) {
      getCourseMyData();
    }
  }, []);

  return (
    <DefaultLayoutEdit>
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
              />
            ))}
        </div>
      </div>
    </DefaultLayoutEdit>
  );
}
