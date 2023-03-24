import { AiFillStar } from 'react-icons/ai';
import styles from "./Home.module.scss";
import './Home.css'


const Home = () => {
  const arr = new Array(50).fill(0);
  return (
    <div className={styles.container}>
      <div className="wrapp_header_home">
        <img src="https://dreamslms.dreamguystech.com/html/assets/img/banner.png" alt="" />

        <div className="box_content_header">
          <div className="right_content">
            <p>The Leader in Online Learning</p>
            <h1>Engaging & <br /> Accessible Online <br /> Courses For All</h1>
            <p>Own your future learning new skills online</p>
            <p>Trusted by over 15K Users <br />
              worldwide since 2022</p>

            <ul>
              <li><b>225+</b></li>
              <li><b>4.4</b> <AiFillStar className='star_icon'/> <AiFillStar className='star_icon'/> <AiFillStar className='star_icon'/> <AiFillStar className='star_icon'/>  </li>
            </ul>
          </div>

          <img src="https://dreamslms.dreamguystech.com/html/assets/img/object.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
