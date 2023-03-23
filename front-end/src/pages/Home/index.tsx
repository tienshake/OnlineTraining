import styles from "./Home.module.scss";
import "./Home.css";

const Home = () => {
  // const arr = new Array(50).fill(0);
  return (
    <div className={styles.container}>
      {/* {arr.map((item, index) => (
        <div key={index} className={styles.item}>
          {index + 1}
          Note that the development build is not optimized. To create a
        </div>
      ))} */}

      <div className="wrapp_home">
        <div className="header_home">
          Header Home
        </div>

        <div className="body_home">
          body Home
        </div>
      </div>
    </div>
  );
};

export default Home;
