import React, { useEffect, useState } from "react";
import styles from "./CourseDetail.module.scss";
import { Box } from "@mui/material";
import Button, { ButtonSave } from "../../components/Button";
import AccordionSection from "../../components/AccordionSection";
import courseServices from "../../services/course";
import checkDataApi from "../../utils/checkDataApi";
import { useParams } from "react-router-dom";
import covertB64 from "../../utils/covertB64";
import Comment from "../../components/Comment";
import CommentViews from "../../components/CommentViews";
import ratingServices from "../../services/rating";

const CourseDetail = () => {
  const [dataCourse, setDataCourse] = useState<any>();
  const [dataComment, setDataComment] = useState<any>();
  let { id } = useParams();

  useEffect(() => {
    const fetchCreateRating = async () => {
      const data = await courseServices.getCourseApi({
        id: id,
      });
      const result = checkDataApi(data);
      if (result) {
        setDataCourse(result.data);
      }
    };

    const fetchGetRating = async () => {
      const data: any = await ratingServices.getRatingApi(id);
      const result = checkDataApi(data);
      if (result) {
        setDataComment(result.data);
      }
    };
    fetchCreateRating();
    fetchGetRating();
  }, [id]);

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
              <span>92 Lectures</span> <span>10:56:11</span>
            </div>
          </Box>
          <Box className={styles.body}>
            <AccordionSection />
            <AccordionSection />
            <AccordionSection />
            <AccordionSection />
          </Box>
        </Box>
        <Box className={styles.comment}>
          <Comment />
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
              <ButtonSave circle title="Enroll now" />
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
            Enrolled: <span>32 students</span>
          </li>
          <li>
            <img
              src="	https://dreamslms.dreamguystech.com/html/assets/img/icon/timer.svg"
              alt="icon"
            />
            Duration: <span>20 hours</span>
          </li>
          <li>
            <img
              src="https://dreamslms.dreamguystech.com/html/assets/img/icon/chapter.svg"
              alt="icon"
            />
            Chapters: <span>15</span>
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
