import React from "react";
import axios from "axios";
import style from "./Login.module.scss";
import logologin from "../../assets/images/login-img.png";
import dream from "../../assets/images/so-do.jpg";
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
import LoadingModal from "../../components/LoadingModal";

const Login = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
        setIsLoading(true);
        const response = await axios.post(
          "https://nodejs-deploy-n9mo.onrender.com/user/login",
          {
            email: values.email,
            password: values.password,
          }
        );
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
          setIsLoading(false);
        }
      } catch (error: any) {
        console.log(error);
        setIsLoading(false);
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

  const handleClickRegisterOption = (role: number) => {
    navigate("/register", { state: { roleId: role } });
  };

  return (
    <div className={style.body}>
      <LoadingModal isLoading={isLoading} />
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
          <div className={style.icon}>
            <div onClick={() => handleClickRegisterOption(3)}>
              <img
                src={
                  "https://thumbs.dreamstime.com/b/teacher-logo-white-background-vector-illustration-182250708.jpg"
                }
                alt="logo"
              />
              Register Teacher
            </div>
            <div onClick={() => handleClickRegisterOption(2)}>
              <img
                src={
                  "https://www.vhv.rs/dpng/d/156-1566120_png-logo-for-student-transparent-png.png"
                }
                alt="logo"
              />
              Register student
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
