import React, { useState } from "react";
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email,
        password,
      });
      const result = checkDataApi(response);
      if (result) {
        const token = result?.data.token;
        localStorage.setItem("token", `Bearer ${token}`);
        console.log("result", result);
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.body}>
      <div className={style.left}>
        <img src={logologin} alt="" />
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
          <img src={dream} alt="" />
          <Link to="/">back to home</Link>
        </div>
        <h2>Sign into Your Account</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="">Email</label>
          <input
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            type="text"
            placeholder="Enter your email address"
          />
          <label htmlFor="">Password</label>
          <input
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            type="text"
            placeholder="Enter you password"
          />
          <label className={style.forgot} htmlFor="">
            Forgot Password ?
          </label>
          {/* <a href="Forgot Password?">Forgot Password?</a> */}
          <label className={style.checkbox} htmlFor="">
            <input type="checkbox" />
            <span>Remember</span>
          </label>

          <button>Sign in</button>
        </form>
        <div className={style.botteam}>
          <Link to="/">Or sign in with</Link>
          <div className={style.icon}>
            <Link to="">
              <img src={icon1} alt="" /> Sign in using Google
            </Link>
            <Link to="">
              <img src={icon2} alt="" /> in usin Facebook
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
