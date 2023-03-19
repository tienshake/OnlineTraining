import React from "react";
import styles from "./Home.module.scss";

const Home = () => {
  const arr = new Array(50).fill(0);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {arr.map((item, index) => (
          <div key={index} className={styles.item}>
            {index + 1}
            Note that the development build is not optimized. To create a
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
