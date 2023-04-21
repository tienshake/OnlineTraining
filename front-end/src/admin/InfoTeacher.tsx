import MasterLayoutAdmin from "./MasterLayoutAdmin";
import { GiTrophyCup } from "react-icons/gi";
import CardUser from "./componentsAdmin/CardUser";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import EvaluateStar from "./componentsAdmin/EvaluateStar";
import QuantityLessons from "./componentsAdmin/QuantityLessons";
import NumberTime from "./componentsAdmin/NumberTime";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import Loading from "./componentsAdmin/Loading";
import AlertError from "./componentsAdmin/AlertError";
import { getDataDetailUser } from "../redux/features/userTeacher/userTeacherSlice";
import "./admin.css";
import covertB64 from "../utils/covertB64";

export default function InfoTeacher() {
  const data2 = ["1", "2", "3", "4"];

  // get param id product
  const location = useLocation();
  const pathId = location.pathname.split("/")[3]; /* cat id  params*/

  const dataUserStore = useSelector(
    (state: RootState) => state.userTeachers.dataUserTeacher
  );
  const userStore = useSelector((state: RootState) => state.userTeachers);
  const { isLoading, error, messageError } = userStore;
  const { data } = dataUserStore;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDataDetailUser(pathId));
  }, [dispatch, pathId]);

  return (
    <div>
      <MasterLayoutAdmin>
        <div className="wrapp_teacherInfo">
          <div className="content-left">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                {error ? (
                  <AlertError messageError={messageError} />
                ) : (
                  <>
                    {data && dataUserStore ? (
                      <CardUser img={data.user_details && data.user_details.avatar.data ? covertB64(data.user_details.avatar.data) : "https://png.pngtree.com/png-vector/20190728/ourlarge/pngtree-avatar-user-profile-flat-color-icon-vector-icon-banner-png-image_1619399.jpg"} email={data.email ? data.email : ""} id={data.id} name={data.name} decription="" />

                    ) : null}
                  </>
                )}
              </>
            )}

            {/* <CardUser id={1} name="ss" decription="The purpose of lorem ipsum is to create a natural looking block of text (sentence, paragraph, page, etc.) that doesn't distract from the layout. A practice not without controversy, laying out pages with meaningless filler text can be very useful when the focus is meant to be on design, not content." /> */}

            <h3 style={{ marginTop: "50px" }}>Robert Hammer Courses</h3>

            <div className="wrapp_allCoursesOf_teacher">
              {data2.map((index) => (
                <div key={index}>
                  <Card
                    className="card_coursesOf_teacher"
                    sx={{ display: "flex", gap: "10px" }}
                  >
                    <CardMedia
                      component="img"
                      sx={{ width: 80, height: "80px", borderRadius: "7px" }}
                      image="https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/lg/avatar3.jpg"
                      alt="Live from space album cover"
                    />
                    <div className="left_content">
                      <p>Marketing</p>

                      <EvaluateStar />

                      {/* Quantity Lessons */}
                      <QuantityLessons />

                      {/* Time Number */}
                      <NumberTime />
                    </div>

                    <div className="right_content">
                      <p>$80</p>

                      <button>
                        <AiOutlineShoppingCart />
                        <p>Buy</p>
                      </button>
                    </div>
                  </Card>
                </div>
              ))}
            </div>

            <h3 style={{ marginTop: "25px" }}>Robert Hammer Courses</h3>
            <ul className="achievement">
              <li>
                <p className="icon">
                  <GiTrophyCup />
                </p>
                <p className="content">
                  Successfully placed all students graduating between 2019 and
                  2020 into international organizations, through appropriate and
                  well-placed career counseling
                </p>
              </li>

              <li>
                <p className="icon">
                  <GiTrophyCup />
                </p>
                <p className="content">
                  Successfully implemented the International Baccalaureate
                  program, resulting in an increased representation of the
                  school on an international level.
                </p>
              </li>

              <li>
                <p className="icon">
                  <GiTrophyCup />
                </p>
                <p className="content">
                  Smart Education in Best Teachers Award Certificatesg
                </p>
              </li>
            </ul>
          </div>

          <div className="content-right">
            <p>Robert Best Skill</p>
            <img
              style={{ width: "100%" }}
              src="https://lh3.googleusercontent.com/ygi-leOc-e1VJwRHrOePjSeg7hIAdzbiuSSvPvQ94GRSsrJZaXt4lqgWQtVyF1ozXNwstjp_mW9-m0F_L3oXvoMcxH7RKbS5DGqFZevP"
              alt=""
            />
            <p>Reviews</p>
            {
              data2.map((index) => (
                <>
                  <div key={index}>
                    <div className='box_reviews_user'>
                      <img src='https://www.pixelwibes.com/template/e-learn/html/dist/assets/images/xs/avatar3.jpg' alt='' />
                      <p><b>Diane Fishe</b>r 450 Followers  <br />
                        3 hours ago @RobertHammer</p>

                      <EvaluateStar />

                      <p>Robert Hammer is Best Lectures</p>

                      <p className='decritions'>
                        "Excellent balance of lecture, live playing and recordings. Cecilia possesses a great sense of humor. So well researched, so engaging both as a lecturer and a pianist."
                      </p>
                    </div>
                  </div>
                </>
              ))
            }
          </div>
        </div>
      </MasterLayoutAdmin>
    </div>
  );
}
