import React from "react";
import styles from "./Home.module.scss";

const Home = () => {
  const arr = new Array(6).fill(0);
  return (
    <div className={styles.container}>
      <header className={styles.header}>tao la header</header>
      <div className={styles.sidebar}>tao la side bar</div>
      <div className={styles.content}>
        {" "}
        {arr.map((item, index) => (
          <div key={index} className={styles.item}>
            {index + 1}
            Note that the development build is not optimized. To create a
          </div>
        ))}
      </div>
      <footer className={styles.footer}>tao la footer</footer>
    </div>
  );
};

export default Home;
