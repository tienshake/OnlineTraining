import { AiFillStar } from "react-icons/ai";
import styles from "./Home.module.scss";
import CardBasicIntroduce from "../../components/Card/CardBasicIntroduce";
import Slider from "react-slick";
import "../../../node_modules/slick-carousel/slick/slick.css";
import "../../../node_modules/slick-carousel/slick/slick-theme.css";
import CardCoursesCate from "../../components/Card/CardCoursesCate";
import BoxSection from "../../components/BoxSection";
import CardMainProduct from "../../components/Card/CardMainProduct";
import BoxTitle from "../../components/BoxTitle";
import CardUserStyle from "../../components/Card/CardUserStyle";
import courseServices from "../../services/course";
import { useEffect, useState } from "react";
import "./Home.css";
import ButtonLoadMore from "../../components/Button/ButtonLoadMore";
import covertB64 from "../../utils/covertB64";

const Home = () => {
  const [dataCourses, setDataCourses] = useState<any>();

  useEffect(() => {
    courseServices
      .getCourseApi({
        id: "ALL",
        limit: 8,
        page: 4,
      })
      .then((data) => setDataCourses(data.data.data.rows));
  }, []);

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
    },
  ];

  /*  */
  const data2 = [
    {
      imageItem:
        "https://dreamslms.dreamguystech.com/html/assets/img/categories-icon.png",
      titleItem: "Angular Development",
      contentItem: "40 Instructors",
    },
    {
      imageItem:
        "https://dreamslms.dreamguystech.com/html/assets/img/categories-icon-02.png",
      titleItem: "NodeJs Development",
      contentItem: "50 Instructors",
    },
    {
      imageItem:
        "https://dreamslms.dreamguystech.com/html/assets/img/categories-icon-04.png",
      titleItem: "Python Development",
      contentItem: "50 Instructors",
    },
    {
      imageItem:
        "https://dreamslms.dreamguystech.com/html/assets/img/categories-icon-03.png",
      titleItem: "SWift Development",
      contentItem: "23 Instructors",
    },
    {
      imageItem:
        "https://dreamslms.dreamguystech.com/html/assets/img/categories-icon-01.png",
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
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className="wrapp_header_home">
        <img
          className="bg_main_img"
          src="https://dreamslms.dreamguystech.com/html/assets/img/banner.png"
          alt=""
        />

        <div className="box_content_header">
          <div className="left_content">
            <p>The Leader in Online Learning</p>
            <h1>
              Engaging & <br /> Accessible Online <br /> Courses For All
            </h1>
            <p>Own your future learning new skills online</p>
            <p>
              Trusted by over 15K Users <br />
              worldwide since 2022
            </p>

            <ul>
              <li>
                <b>225+</b>
              </li>
              <li>
                <b>4.4</b> <AiFillStar className="star_icon" />{" "}
                <AiFillStar className="star_icon" />{" "}
                <AiFillStar className="star_icon" />{" "}
                <AiFillStar className="star_icon" />{" "}
              </li>
            </ul>
          </div>

          <div className="right_content" style={{ width: "40%" }}>
            <img
              style={{ width: "100%" }}
              src="https://dreamslms.dreamguystech.com/html/assets/img/object.png"
              alt=""
            />
          </div>
        </div>

        <ul className="groud_cardIntro-header">
          {items1.map((items1, index) => (
            <li key={index}>
              <CardBasicIntroduce
                imageItem={items1.img}
                titleItem={items1.title}
                contentItem={items1.content}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="wrapp_body_home">
        {/*  */}
        <BoxSection />

        {/*  */}
        <div className="box_carosel_topCate">
          <Slider {...settings}>
            {data2.map((data, index) => (
              <div
                key={index}
                style={{ width: "100%", margin: "auto" }} /* src={data.src} */
              >
                <CardCoursesCate
                  imageItem={data.imageItem}
                  titleItem={data.titleItem}
                  contentItem={data.contentItem}
                />
              </div>
            ))}
          </Slider>
        </div>

        {/*  */}
        <div
          style={{
            backgroundImage:
              'url("https://dreamslms.dreamguystech.com/html/assets/img/banner.png")',
            marginTop: "90px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="box_featured_courses"
        >
          <BoxSection />

          <div className="content-cardTopCate">
            {dataCourses ? (
              <>
                {dataCourses.map((data: any) => (
                  <div key={data.id}>
                    <CardMainProduct
                      imageItem={covertB64(data.thumbnail)}
                      promotion_price={data.promotion_price}
                      priceItem={data.price}
                      titleItem={data.title}
                      widthCard="100%"
                    />
                  </div>
                ))}
              </>
            ) : (
              <>Loading...</>
            )}
          </div>

          <div className="load_morePr-home">
            <ButtonLoadMore />
          </div>
        </div>

        <div>
          <BoxSection />
        </div>

        {/*  */}
        <div className="master_skill_content">
          <div className="left-content">
            <ul className="wrap_box">
              <li>
                <CardBasicIntroduce
                  imageItem="https://dreamslms.dreamguystech.com/html/assets/img/icon/icon-1.svg"
                  titleItem=""
                  contentItem="Keep up with in the latest in cloud"
                />
              </li>

              <li>
                <CardBasicIntroduce
                  imageItem="https://dreamslms.dreamguystech.com/html/assets/img/icon/icon-1.svg"
                  titleItem=""
                  contentItem="Keep up with in the latest in cloud"
                />
              </li>

              <li>
                <CardBasicIntroduce
                  imageItem="https://dreamslms.dreamguystech.com/html/assets/img/icon/icon-1.svg"
                  titleItem=""
                  contentItem="Keep up with in the latest in cloud"
                />
              </li>

              <li>
                <CardBasicIntroduce
                  imageItem="https://dreamslms.dreamguystech.com/html/assets/img/icon/icon-1.svg"
                  titleItem=""
                  contentItem="Keep up with in the latest in cloud"
                />
              </li>
            </ul>
          </div>
          <div className="right-content">
            <img
              src="https://dreamslms.dreamguystech.com/html/assets/img/join.png"
              alt="sadsa"
            />
          </div>
        </div>

        {/*  */}
        <div
          className="trending_courses"
          style={{
            backgroundImage:
              'url("https://dreamslms.dreamguystech.com/html/assets/img/banner.png")',
            marginTop: "90px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <BoxSection />

          <div style={{ backgroundColor: "" }} className="box_carosel_trending">
            <Slider {...settings}>
              {data2.map((data, index) => (
                <div
                  key={index}
                  style={{ width: "100%", margin: "auto" }} /* src={data.src} */
                >
                  <CardMainProduct widthCard="95%" />
                </div>
              ))}
            </Slider>

            <BoxTitle />

            <Slider {...settings}>
              {data2.map((data, index) => (
                <div
                  key={index}
                  style={{ width: "100%", margin: "auto" }} /* src={data.src} */
                >
                  <CardUserStyle
                    widthCard="95%"
                    imageItem="https://dreamslms.dreamguystech.com/html/assets/img/user/user7.jpg"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>

        <div className="banner_advertising">
          <p>Trusted By</p>
          <h1>500+ Leading Universities And Companies</h1>
        </div>

        <ul className="brand_funding">
          <li>
            <img
              src="https://dreamslms.dreamguystech.com/html/assets/img/lead-01.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://dreamslms.dreamguystech.com/html/assets/img/lead-02.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://dreamslms.dreamguystech.com/html/assets/img/lead-03.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://dreamslms.dreamguystech.com/html/assets/img/lead-04.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://dreamslms.dreamguystech.com/html/assets/img/lead-05.png"
              alt=""
            />
          </li>
          <li>
            <img
              src="https://dreamslms.dreamguystech.com/html/assets/img/lead-06.png"
              alt=""
            />
          </li>
        </ul>

        <div
          style={{
            backgroundImage:
              'url("https://dreamslms.dreamguystech.com/html/assets/img/bg-banner-02.png")',
            marginTop: "90px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "100%",
          }}
        >
          <div className="box-content-inform">
            <div>
              <img
                src="https://dreamslms.dreamguystech.com/html/assets/img/share.png"
                style={{ width: "100%" }}
                alt=""
              />
            </div>
            <div>s</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
