import React from "react";
import axios from "axios";
import style from "./Register.module.scss";
import logologin from "../../assets/images/login-img.png";
import dream from "../../assets/images/so-do.jpg";
import { Link } from "react-router-dom";
import checkDataApi from "../../utils/checkDataApi";
import { useNavigate } from "react-router-dom";
// import { Buffer } from "buffer";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";
import { useLocation } from "react-router-dom";
import LoadingModal from "../../components/LoadingModal";

const Register = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  let navigate = useNavigate();
  const location = useLocation();
  const roleId = location?.state?.roleId;

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z ]*$/, "Please enter valid name")
      .max(40)
      .required(),
    email: Yup.string().email().required("Please Enter your Email"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
    confirm_password: Yup.string().oneOf(
      [Yup.ref("password"), undefined],
      "Passwords must match"
    ),
  });

  const formik = useFormik({
    initialValues: {
      name: "", // add name to the initial values
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values: any, { setSubmitting, setErrors }) => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://nodejs-deploy-n9mo.onrender.com/user/register",
          {
            role_id: roleId,
            name: values.name,
            email: values.email,
            password: values.password,
          }
        );
        const result = checkDataApi(response);
        if (result) {
          navigate("/login");
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        console.log("error", error);
        if (error.response) {
          console.log(error.response.data);
          const errorType = error.response.data.message;
          if (errorType === "Email already exists") {
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
  console.log("roleId", roleId);
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
          <Link to="/" className={style.texthover}>
            back to home
          </Link>
        </div>
        <h2>Register Account</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="name">Name</label>
          <Input
            placeholder="Enter Your name"
            type="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={
              formik.touched.name && typeof formik.errors.name === "string"
                ? formik.errors.name
                : null
            }
          />
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
          <label htmlFor="password">Confirm Password</label>
          <Input
            placeholder="Enter Your password"
            type="password"
            name="confirm_password"
            value={formik.values.confirm_password}
            onChange={formik.handleChange}
            error={
              formik.touched.confirm_password &&
              Boolean(formik.errors.confirm_password)
            }
            helperText={
              formik.touched.confirm_password &&
              typeof formik.errors.confirm_password === "string"
                ? formik.errors.confirm_password
                : null
            }
          />
          <label className={style.forgot} htmlFor="">
            Forgot Password ?
          </label>
          <button className={style.button}>Register</button>
        </form>
        <div className={style.botteam}>
          <Link to="/login" className={style.texthover}>
            Login with account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
