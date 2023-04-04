import React from "react";
import axios from "axios";
import style from "./Login.module.scss";
import logologin from "../../assets/images/login-img.png";
import dream from "../../assets/images/so-do.jpg";
import icon1 from "../../assets/images/net-icon-01.png";
import icon2 from "../../assets/images/net-icon-02.png";
import { Link } from "react-router-dom";
import { loginSuccess } from "../../redux/features/auth";
import { useDispatch } from "react-redux";
import checkDataApi from "../../utils/checkDataApi";
import { useNavigate } from "react-router-dom";
// import { Buffer } from "buffer";
import covertB64 from "../../utils/covertB64";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email().required("Please Enter your Email"),
    password: Yup.string().required("Please Enter your password"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post("http://localhost:8080/user/login", {
          email: values.email,
          password: values.password,
        });
        const result = checkDataApi(response);
        if (result) {
          const token = result?.data.token;
          localStorage.setItem("token", `Bearer ${token}`);
          dispatch(
            loginSuccess({
              // token: result?.data.token,
              user: {
                name: result?.data.name,
                email: result?.data.email,
                id: result?.data.id,
                avatar: covertB64(result?.data?.user_details.avatar),
                userDetails: result?.data?.user_details,
              },
            })
          );
          navigate("/");
        }
      } catch (error: any) {
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          const errorType = error.response.data.message;
          if (
            errorType ===
            "Your's email isn't exist in your system. Please try other email"
          ) {
            setErrors({
              email: errorType,
            });
          } else if (errorType === "Wrong password") {
            setErrors({ password: errorType });
          }
        }
      }
    },
  });

  return (
    <div className={style.body}>
      <div className={style.left}>
        <img src={logologin} alt="logo" />
        <h2>
          Welcome to <br />
          Panda Night Course
        </h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
      </div>
      <div className={style.right}>
        <div className={style.dream}>
          <img src={dream} alt="logo" />
          <Link to="/">back to home</Link>
        </div>
        <h2>Sign into Your Account</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email">Email</label>
          <Input
            placeholder="Enter Your email"
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={
              formik.touched.email && typeof formik.errors.email === "string"
                ? formik.errors.email
                : null
            }
          />
          <label htmlFor="password">Password</label>
          <Input
            placeholder="Enter Your password"
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={
              formik.touched.password &&
              typeof formik.errors.password === "string"
                ? formik.errors.password
                : null
            }
          />
          <label className={style.forgot} htmlFor="">
            Forgot Password ?
          </label>
          <button className={style.button}>Sign in</button>
        </form>
        <div className={style.botteam}>
          <Link to="/">Or sign in with</Link>
          <div className={style.icon}>
            <Link to="">
              <img src={icon1} alt="logo" /> Sign in using Google
            </Link>
            <Link to="">
              <img src={icon2} alt="logo" /> in usin Facebook
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
