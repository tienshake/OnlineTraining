import React, { useEffect, useState } from "react";
import styles from "./InnerBanner.module.scss";
import StarIcon from "@mui/icons-material/Star";
import { Link, useParams } from "react-router-dom";
import checkDataApi from "../../utils/checkDataApi";
import courseServices from "../../services/course";
import covertB64 from "../../utils/covertB64";
import StarGroup from "../IconGroup/StarGroup";
import ratingServices from "../../services/rating";

const InnerBanner = () => {
  const [dataCourse, setDataCourse] = useState<any>();
  const [dataRatingAVG, setDataRatingAVG] = useState<any>();
  let { id } = useParams();

  useEffect(() => {
    const getDataCourse = async () => {
      const data = await courseServices.getCourseApi({
        id: id,
      });
      const result = checkDataApi(data);
      if (result) {
        setDataCourse(result.data);
      }
    };
    getDataCourse();

    const getDataRating = async () => {
      const data = await ratingServices.getRatingValueAVGApi(id);
      if (data && data.status === 200) {
        setDataRatingAVG(data?.data.total_rating_value);
      }
    };
    getDataCourse();
    getDataRating();
  }, [id]);

  return (
    <div className={styles.innerBanner}>
      <div className={styles.contentBanner}>
        <div className={styles.contentBannerLeft}>
          <div className={styles.aboutInstructor}>
            <div className={styles.aboutContent}>
              <div className={styles.abtInstructorImg}>
                <Link to="">
                  <img
                    src={covertB64(dataCourse?.user?.user_details.avatar)}
                    alt="img"
                    className={styles.imgFluid}
                  />
                </Link>
              </div>
              <div className={styles.instructorDetail}>
                <h5>
                  <Link to="">{dataCourse?.user.name}</Link>
                </h5>
                <p>{dataCourse?.user?.user_details.experience}</p>
              </div>
              <div className={styles.rating}>
                <StarGroup rating={dataRatingAVG} />
                <span className={styles.averageRating}>
                  <span>{dataRatingAVG && dataRatingAVG.toFixed(1)}</span> (15)
                </span>
              </div>
            </div>
            <span className={styles.webBadge}>WEB DEVELPMENT</span>
          </div>
          <h2 className={styles.titleCourse}>{dataCourse?.title}</h2>
          <p className={styles.description}>
            Learn Web Development by building 25 websites and mobile apps using
            HTML, CSS, Javascript, PHP, Python, MySQL &amp; more!
          </p>
        </div>
      </div>
    </div>
  );
};

export default InnerBanner;
