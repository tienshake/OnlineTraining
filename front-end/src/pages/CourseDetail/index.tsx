import React, { useEffect, useState } from "react";
import styles from "./CourseDetail.module.scss";
import { Box } from "@mui/material";
import Button, { ButtonNext, ButtonSave } from "../../components/Button";
import AccordionSection from "../../components/AccordionSection";
import courseServices from "../../services/course";
import checkDataApi from "../../utils/checkDataApi";
import { useParams } from "react-router-dom";
import covertB64 from "../../utils/covertB64";
import Comment from "../../components/Comment";
import CommentViews from "../../components/CommentViews";
import ratingServices from "../../services/rating";
import { RootState } from "../../redux/store/store";
import { useSelector } from "react-redux";
import convertSecondsToMinutes from "../../utils/convertSecondsToMinutes";

const CourseDetail = () => {
  const [dataCourse, setDataCourse] = useState<any>();
  const [dataComment, setDataComment] = useState<any>();
  const [dataSection, setDataSection] = useState<any>([]);
  const [totalTime, setTotalTime] = useState<any>(0);
  const [isEnroll, setIsEnroll] = useState<any>(false);

  let { id } = useParams();
  const user = useSelector((state: RootState) => state.auth.user);

  const getRatingData = async () => {
    const data: any = await ratingServices.getRatingApi(id);
    const result = checkDataApi(data);
    if (result) {
      setDataComment(result.data);
    }
  };

  useEffect(() => {
    const getCourseData = async () => {
      const data = await courseServices.getCourseApi({
        id,
      });
      const result = checkDataApi(data);
      if (result) {
        setDataCourse(result.data);
      }
    };

    const getCourseSectionData = async () => {
      const data = await courseServices.getCourseSectionApi({
        courseId: id,
        userId: user && user.id,
      });

      const result = checkDataApi(data);
      if (result) {
        setTotalTime(data.data.totalTime);
        setDataSection(result.data?.course_sections.reverse());
        if (result.data.Enrollments && result.data.Enrollments[0]?.id) {
          setIsEnroll(true);
        }
      }
    };

    getCourseData();
    getRatingData();
    getCourseSectionData();
  }, [id, user]);
  // console.log("dataSection", dataSection);
  return (
    <Box className={styles.container}>
      <Box className={styles.contentLeft}>
        <Box className={styles.overviewSec}>
          <Box className={styles.body}>
            <h5 className={styles.subsTitle}>Overview</h5>
            <div
              dangerouslySetInnerHTML={{
                __html: dataCourse?.course_detail?.descriptionMarkdown,
              }}
            />
          </Box>
        </Box>
        <Box className={styles.courseContent}>
          <Box className={styles.contentHeader}>
            <h4>Course Content</h4>
            <div>
              <span>{dataSection && dataSection.length} Lectures</span>{" "}
              <span>{totalTime && convertSecondsToMinutes(totalTime)}</span>
            </div>
          </Box>
          <Box className={styles.body}>
            {/* <AccordionSection /> */}
            {dataSection &&
              dataSection.length > 0 &&
              dataSection.map((section: any, index: number) => {
                return <AccordionSection key={index} section={section} />;
              })}
          </Box>
        </Box>
        <Box className={styles.comment}>
          <Comment getRatingData={getRatingData} />
        </Box>

        <Box className={styles.commentViews}>
          <h4>Reviews</h4>
          {dataComment?.map((item: any, i: number) => {
            return <CommentViews key={i} comment={item} />;
          })}
        </Box>
      </Box>
      <Box className={styles.contentRight}>
        <Box className={styles.sideBar}>
          <div className={styles.train}>
            <img
              className={styles.image}
              src={covertB64(dataCourse?.thumbnail)}
              alt="sdsad"
            />
            <div className={styles.courseFee}>
              <h2>${dataCourse?.promotion_price}</h2>
              <p>
                <span>${dataCourse?.price}</span> 50% off
              </p>
            </div>
            <div className={styles.control}>
              <Button circle title="Add to Wishlist" />
              <Button circle title="Share" />
            </div>
            <div className={styles.enroll}>
              {isEnroll ? (
                <ButtonNext circle title="Learn Now" path={`/learning/${id}`} />
              ) : (
                <ButtonSave
                  circle
                  title="Enroll now"
                  path={`/checkout/${id}`}
                />
              )}
            </div>
          </div>
        </Box>

        <ul className={styles.includes}>
          <li>
            <h4>Includes</h4>
          </li>
          <li>
            <img
              src="	https://dreamslms.dreamguystech.com/html/assets/img/icon/users.svg"
              alt="icon"
            />
            Enrolled:
            <span>
              {dataCourse?.Enrollments &&
                dataCourse?.Enrollments.enrollment_count}{" "}
              students
            </span>
          </li>
          <li>
            <img
              src="	https://dreamslms.dreamguystech.com/html/assets/img/icon/timer.svg"
              alt="icon"
            />
            Duration:
            <span>{totalTime && convertSecondsToMinutes(totalTime)}</span>
          </li>
          <li>
            <img
              src="https://dreamslms.dreamguystech.com/html/assets/img/icon/chapter.svg"
              alt="icon"
            />
            Sections: <span>{dataSection && dataSection.length}</span>
          </li>
          <li>
            <img
              src="https://dreamslms.dreamguystech.com/html/assets/img/icon/video.svg"
              alt="icon"
            />
            Video: <span>12 hours</span>
          </li>
          <li>
            <img
              src="	https://dreamslms.dreamguystech.com/html/assets/img/icon/chart.svg"
              alt="icon"
            />
            Level: <span>Beginner</span>
          </li>
        </ul>
      </Box>
    </Box>
  );
};

export default CourseDetail;
