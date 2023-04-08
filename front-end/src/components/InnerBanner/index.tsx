import React, { useEffect, useState } from "react";
import styles from "./InnerBanner.module.scss";
import StarIcon from "@mui/icons-material/Star";
import { Link, useParams } from "react-router-dom";
import checkDataApi from "../../utils/checkDataApi";
import courseServices from "../../services/course";
import covertB64 from "../../utils/covertB64";

const InnerBanner = () => {
  const [dataCourse, setDataCourse] = useState<any>();
  let { id } = useParams();

  useEffect(() => {
    const fetch = async () => {
      const data = await courseServices.getCourseApi({
        id: id,
      });
      const result = checkDataApi(data);
      if (result) {
        setDataCourse(result.data);
      }
    };
    fetch();
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
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <span className={styles.averageRating}>
                  <span>4.5</span> (15)
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
