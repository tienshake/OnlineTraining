import React, { useEffect, useState } from "react";
import styles from "./Learning.module.scss";
import Sidebar from "./components/Sidebar";
import VideoPlayer from "./components/VideoPlayer";
import checkDataApi from "../../utils/checkDataApi";
import courseServices from "../../services/course";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store/store";
import Button from "../../components/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const courses = [
  { id: 1, title: "ReactJS Tutorial" },
  { id: 2, title: "NodeJS Tutorial" },
  { id: 3, title: "JavaScript Tutorial" },
];

const Learning = () => {
  const [dataSection, setDataSection] = useState<any>([]);
  const [sectionData, setSectionData] = useState("");

  let { id } = useParams();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const getCourseSectionData = async () => {
      const data = await courseServices.getCourseSectionApi({
        courseId: id,
        userId: user.id,
      });
      const result = checkDataApi(data);
      if (result) {
        setDataSection(result.data?.course_sections);
      }
    };

    getCourseSectionData();
  }, []);

  const handleClickLecture = (lecture: any) => {
    setSectionData(lecture);
    console.log("lecture", lecture);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.back}>
          <ArrowBackIosIcon />
          <Link to={`/course-details/${id}`}>Back to course</Link>
        </div>
      </div>

      <div className={styles.content}>
        <VideoPlayer className={styles.videoPlayer} sectionData={sectionData} />
        <Sidebar
          className={styles.sidebar}
          dataSection={dataSection}
          handleClickLecture={handleClickLecture}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.control}>
          <Button title="Previous lesson" />
          <Button title="Next lesson" />
        </div>
      </div>
    </div>
  );
};

export default Learning;
