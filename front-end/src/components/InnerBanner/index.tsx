import React from "react";
import styles from "./InnerBanner.module.scss";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

const InnerBanner = () => {
  return (
    <div className={styles.innerBanner}>
      <div className={styles.contentBanner}>
        <div className={styles.contentBannerLeft}>
          <div className={styles.aboutInstructor}>
            <div className={styles.aboutContent}>
              <div className={styles.abtInstructorImg}>
                <Link to="">
                  <img
                    src="https://dreamslms.dreamguystech.com/html/assets/img/user/user1.jpg"
                    alt="img"
                    className={styles.imgFluid}
                  />
                </Link>
              </div>
              <div className={styles.instructorDetail}>
                <h5>
                  <Link to="">Nicole Brown</Link>
                </h5>
                <p>UX/UI Designer</p>
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
          <h2 className={styles.titleCourse}>
            The Complete Web Developer Course 2.0
          </h2>
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
