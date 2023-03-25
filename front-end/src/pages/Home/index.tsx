import { AiFillStar } from 'react-icons/ai';
import styles from "./Home.module.scss";
import './Home.css'
import CardBasicIntroduce from '../../components/Card/CardBasicIntroduce';


const Home = () => {
  const items1 = [
    {
      img: "https://dreamslms.dreamguystech.com/html/assets/img/pencil-icon.svg",
      title: "0K",
      content: "Online Courses",

    },
    {
      img: "https://dreamslms.dreamguystech.com/html/assets/img/cources-icon.svg",
      title: "0+",
      content: "Expert Tutors",
    },
    {
      img: "https://dreamslms.dreamguystech.com/html/assets/img/certificate-icon.svg",
      title: "0K+",
      content: "Ceritified Courses",
    },
    {
      img: "https://dreamslms.dreamguystech.com/html/assets/img/gratuate-icon.svg",
      title: "0K +",
      content: "Online Students",
    }
  ];

  return (
    <div className={styles.container}>
      <div className="wrapp_header_home">
        <img className='bg_main_img' src="https://dreamslms.dreamguystech.com/html/assets/img/banner.png" alt="" />

        <div className="box_content_header">
          <div className="left_content">
            <p>The Leader in Online Learning</p>
            <h1>Engaging & <br /> Accessible Online <br /> Courses For All</h1>
            <p>Own your future learning new skills online</p>
            <p>Trusted by over 15K Users <br />
              worldwide since 2022</p>

            <ul>
              <li><b>225+</b></li>
              <li><b>4.4</b> <AiFillStar className='star_icon' /> <AiFillStar className='star_icon' /> <AiFillStar className='star_icon' /> <AiFillStar className='star_icon' />  </li>
            </ul>
          </div>

          <div className='right_content' style={{ width: '40%' }}>
            <img style={{ width: '100%' }} src="https://dreamslms.dreamguystech.com/html/assets/img/object.png" alt="" />
          </div>

        </div>

        <ul className='groud_cardIntro-header'>
          {
            items1.map((items1, index) => (
              <>
                <li key={index}><CardBasicIntroduce imgItem={items1.img} titleItem={items1.title} contentItem={items1.content} /></li>
              </>
            ))
          }
        </ul>
      </div>


      <div>body</div>
    </div>
  );
};

export default Home;
