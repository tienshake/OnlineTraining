import { AiFillStar } from 'react-icons/ai';
import styles from "./Home.module.scss";
import CardBasicIntroduce from '../../components/Card/CardBasicIntroduce';
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import './Home.css';
import CoursesCate from '../../components/Card/CoursesCate';
import BoxSection from '../../components/BoxSection';



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

  /*  */
  const data2 = [
    {
      imageItem: "https://dreamslms.dreamguystech.com/html/assets/img/categories-icon.png",
      titleItem: "Angular Development",
      contentItem: "40 Instructors",

    },
    {
      imageItem: "https://dreamslms.dreamguystech.com/html/assets/img/categories-icon-02.png",
      titleItem: "NodeJs Development",
      contentItem: "50 Instructors",
    },
    {
      imageItem: "https://dreamslms.dreamguystech.com/html/assets/img/categories-icon-04.png",
      titleItem: "Python Development",
      contentItem: "50 Instructors",
    },
    {
      imageItem: "https://dreamslms.dreamguystech.com/html/assets/img/categories-icon-03.png",
      titleItem: "SWift Development",
      contentItem: "23 Instructors",
    },
    {
      imageItem: "https://dreamslms.dreamguystech.com/html/assets/img/categories-icon-01.png",
      titleItem: "Docker Development",
      contentItem: "45 Instructors",
    },
  ];


  /*  */
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1124,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
    ]
  };

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
              <li key={index}><CardBasicIntroduce imgItem={items1.img} titleItem={items1.title} contentItem={items1.content} /></li>
            ))
          }
        </ul>
      </div>


      <div className='wrapp_body_home'>
        {/*  */}
        <BoxSection />

        {/*  */}
        <div className='box_carosel_topCate'>
          <Slider  {...settings}>
            {data2.map((data, index) => (
              <div key={index} style={{ width: "100%", margin: 'auto' }} /* src={data.src} */>
                <CoursesCate imageItem={data.imageItem} titleItem={data.titleItem} contentItem={data.contentItem} />
              </div>
            ))}
          </Slider>
        </div>

        {/*  */}
        <div style={{ backgroundImage: 'url("https://dreamslms.dreamguystech.com/html/assets/img/banner.png")', marginTop: '90px', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} className='box_featured_courses'>
          <BoxSection />

          <div className='wrapp_cardProduts-content'>
            <div><img src='https://dreamslms.dreamguystech.com/html/assets/img/course/course-01.jpg' alt='' /></div>

            <div>
              <img src='https://dreamslms.dreamguystech.com/html/assets/img/course/course-06.jpg' alt='' />
            </div>

            <div>
              <img src='https://dreamslms.dreamguystech.com/html/assets/img/course/course-05.jpg' alt='' />
            </div>

            <div>
              <img src='https://dreamslms.dreamguystech.com/html/assets/img/course/course-03.jpg' alt='' />
            </div>

            <div>
              <img src='https://dreamslms.dreamguystech.com/html/assets/img/course/course-02.jpg' alt='' />
            </div>

            <div>
              <img src='https://dreamslms.dreamguystech.com/html/assets/img/course/course-02.jpg' alt='' />
            </div>
          </div>
        </div>

        <div>
          <BoxSection />
        </div>
      </div>
    </div>
  );
};

export default Home;
