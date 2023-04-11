import StarRatings from "react-star-ratings";
import styles from "./StarGroup.module.scss";

export default function StarGroup({ rating }: any) {
  return (
    <div className={styles.container}>
      <StarRatings starRatedColor="#ffb800" rating={rating ? rating : 0} />
      <p style={{ fontSize: "13px", marginLeft: "5px" }}>5.0 (15) </p>
    </div>
  );
}
