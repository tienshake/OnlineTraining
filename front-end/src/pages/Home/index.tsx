import styles from "./Home.module.scss";
import './Home.css'
import { Container } from "@mui/system";

const Home = () => {
  const arr = new Array(50).fill(0);
  return (
    <div className={styles.container}>
      <div className="wrapp_header_home">
        <img src="https://dreamslms.dreamguystech.com/html/assets/img/banner.png" alt="" />

        {/* <Container > */}
          <div className="box_content_header">sssssssssssssssssssssss</div>
        {/* </Container> */}
      </div>
    </div>
  );
};

export default Home;
