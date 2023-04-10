import StarRatings from "react-star-ratings";
import styles from "./StarGroup.module.scss";

export default function StarGroup() {
  return (
    <div className={styles.container}>
      <StarRatings rating={2.403} />
      <p style={{ fontSize: "13px", marginLeft: "5px" }}>5.0 (15) </p>
    </div>
  );
}
