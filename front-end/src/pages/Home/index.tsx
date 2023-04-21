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
import ButtonRedirect from "../../components/Button/ButtonRedirect";
import covertB64 from "../../utils/covertB64";
import categoryServices from "../../services/category";
import cache from "memory-cache";
import Loading from "../../components/Loading/Loading";

const Home = () => {
  const [dataCourses, setDataCourses] = useState<any>();
  const [dataTopCourses, setDataTopCourses] = useState<any>();
  const [dataNewCourses, setDataNewCourses] = useState<any>();
  const courseCache = cache.get("courseCache");

  /* get courses top */
  useEffect(() => {
    courseServices.getCourseApiSortType({
      id: "ALL",
      limit: 8,
      page: 1,
      type: 'top'
    }).then((data) => {
      cache.put("courseCache", data.data.data.rows);
      setDataTopCourses(data.data.data.rows);
    });
  }, []);

  /* get courses news */
  useEffect(() => {
    courseServices.getCourseApiSortType({
      id: "ALL",
      limit: 8,
      page: 1,
      type: 'new'
    }).then((data) => {
      cache.put("courseCache", data.data.data.rows);
      setDataNewCourses(data.data.data.rows);
    });
  }, []);

  useEffect(() => {
    if (courseCache) {
      // Sử dụng dữ liệu từ cache
      setDataCourses(courseCache);
    } else {
      courseServices
        .getCourseApi({
          id: "ALL",
          limit: 8,
          page: 1,
        })
        .then((data) => {
          cache.put("courseCache", data.data.data.rows);
          setDataCourses(data.data.data.rows);
        });
    }
  }, [courseCache]);

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

  /* call api cate */
  const [dataCate, setDataCate] = useState<any>([]);

  useEffect(() => {
    categoryServices.getCategoryApi().then((data) => setDataCate(data.data.data));
  }, []);


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
  const fetchImg = (nameCate: string) => {
    return nameCate === "Reactjs"
      ? "https://dreamslms.dreamguystech.com/html/assets/img/categories-icon-05.png"
      : nameCate === "HTML/CSS"
        ? "https://dreamslms.dreamguystech.com/html/assets/img/categories-icon.png"
        : nameCate === "Nodejs" ? "https://dreamslms.dreamguystech.com/html/assets/img/categories-icon-02.png" : "https://dreamslms.dreamguystech.com/html/assets/img/categories-icon-01.png";
  };

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

          <div className="right_content">
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
        <BoxSection
          auxiliaryTitle="Favourite Course"
          mainTitle="Top Category"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum."
        />

        {/* Category  */}
        <div className="box_carosel_topCate">
          <Slider {...settings}>
            {dataCate.map((data: any) => (
              <div
                key={data.id}
                style={{ width: "100%", margin: "auto" }} /* src={data.src} */
              >
                <CardCoursesCate
                  imageItem={fetchImg(data.name_category)}
                  titleItem={data.name_category}
                  contentItem={"30 Instructor"}
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Top courses */}
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
          <BoxSection
            auxiliaryTitle="Favourite Course"
            mainTitle="Featured Courses"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum."
          />

          <div style={{ backgroundColor: "" }} className="box_carosel_trending">
            {
              dataTopCourses ? <>
                <Slider {...settings}>
                  {dataTopCourses.map((data: any) => (
                    <div key={data.id}>
                      <CardMainProduct
                        preventPath="/"
                        idCourse={data.id}
                        imageItem={covertB64(data.thumbnail)}
                        promotion_price={data.promotion_price}
                        priceItem={data.price}
                        titleItem={data.title}
                        rating={
                          data.Ratings &&
                          data.Ratings.length > 0 &&
                          +data?.Ratings[0].avg_rating_value
                        }
                        userName={data.user.name}
                        userAvatar={
                          data.user?.user_details &&
                          data.user?.user_details.length > 0 &&
                          covertB64(data.user?.user_details[0].avatar)
                        }
                        widthCard="95%"
                      />
                    </div>
                  ))}
                </Slider>
              </> : <Loading />
            }
          </div>
        </div>
        <BoxTitle />

        {/* ALL courses */}
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
          <BoxSection
            auxiliaryTitle="All Courses"
            mainTitle="ALL Courses"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum."
          />

          <div className="content-cardTopCate">
            {dataCourses ? (
              <>
                {dataCourses.map((data: any) => (
                  <div key={data.id}>
                    <CardMainProduct
                      preventPath="/"
                      idCourse={data.id}
                      imageItem={covertB64(data.thumbnail)}
                      promotion_price={data.promotion_price}
                      priceItem={data.price}
                      titleItem={data.title}
                      rating={
                        data.Ratings &&
                        data.Ratings.length > 0 &&
                        +data?.Ratings[0].avg_rating_value
                      }
                      userName={data.user.name}
                      userAvatar={
                        data.user?.user_details &&
                        data.user?.user_details.length > 0 &&
                        covertB64(data.user?.user_details[0].avatar)
                      }
                      widthCard="100%"
                    />
                  </div>
                ))}
              </>
            ) : (
              <Loading />
            )}
          </div>

          <div className="load_morePr-home">
            <ButtonRedirect path={"/course"} />
          </div>
        </div>

        <div>
          <BoxSection
            auxiliaryTitle="Favourite Course"
            mainTitle="Master the skills to drive your career"
            content="Get certified, master modern tech skills, and level up your career — whether you’re starting out or a seasoned pro. 95% of eLearning learners report our hands-on content directly helped their careers."
          />
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

        {/* News Courses */}
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
          <BoxSection
            auxiliaryTitle="What’s New"
            mainTitle="New Courses"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum."
          />

          <div style={{ backgroundColor: "" }} className="box_carosel_trending">
            {
              dataNewCourses ? <>
                <Slider {...settings}>
                  {dataNewCourses.map((data: any) => (
                    <div key={data.id}>
                      <CardMainProduct
                        preventPath="/"
                        idCourse={data.id}
                        imageItem={covertB64(data.thumbnail)}
                        promotion_price={data.promotion_price}
                        priceItem={data.price}
                        titleItem={data.title}
                        rating={
                          data.Ratings &&
                          data.Ratings.length > 0 &&
                          +data?.Ratings[0].avg_rating_value
                        }
                        userName={data.user.name}
                        userAvatar={
                          data.user?.user_details &&
                          data.user?.user_details.length > 0 &&
                          covertB64(data.user?.user_details[0].avatar)
                        }
                        widthCard="95%"
                      />
                    </div>
                  ))}
                </Slider>
              </> : <Loading />
            }


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
            {/* <div>s</div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
