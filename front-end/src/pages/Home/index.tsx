import { AiFillStar } from 'react-icons/ai';
import styles from "./Home.module.scss";
import CardBasicIntroduce from '../../components/Card/CardBasicIntroduce';
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import './Home.css';
import CoursesCate from '../../components/Card/CoursesCate';



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

  const data = [
    { src: "https://mamuka.rest/upload/resize_cache/iblock/572/700_9999_1/572fa86f2285617fe047a6d55c310916.jpg" },
    { src: "https://mamuka.rest/upload/resize_cache/iblock/85d/700_9999_1/85dbc36067a19873a842761cc5f3a8d7.jpg" },
    { src: "https://mamuka.rest/upload/resize_cache/iblock/dcc/700_9999_1/dcc4459f90e0ee7a9c4a462faf6c0c4b.jpg" },
    { src: "https://mamuka.rest/upload/resize_cache/iblock/572/700_9999_1/572fa86f2285617fe047a6d55c310916.jpg" },
    { src: "https://mamuka.rest/upload/resize_cache/iblock/572/700_9999_1/572fa86f2285617fe047a6d55c310916.jpg" },
    { src: "https://mamuka.rest/upload/resize_cache/iblock/572/700_9999_1/572fa86f2285617fe047a6d55c310916.jpg" },
    { src: "https://mamuka.rest/upload/resize_cache/iblock/572/700_9999_1/572fa86f2285617fe047a6d55c310916.jpg" },
  ]

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
        <div className='box_favourite_course'>
          <ul>
            <li>
              <p>Favourite Course</p>
              <p>Top Category</p>
            </li>

            <li>
              buutpn
            </li>
          </ul>

          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum <br /> gravida maecenas augue elementum et neque. Suspendisse imperdiet.</p>
        </div>

        {/*  */}
        <div className='box_carosel_topCate'>
          <Slider  {...settings}>
            {data.map((data, index) => (
              <div key={index} style={{ width: "100%", margin: 'auto'}} /* src={data.src} */>
                <CoursesCate />
              </div>
            ))}
          </Slider>
        </div>

        {/*  */}
        <div className='box_featured_courses'>
          c
        </div>
      </div>
    </div>
  );
};

export default Home;
