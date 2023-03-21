import React, { useState } from "react";
import axios from "axios";
import userServices from "../../services/user";
import style from "./Login.module.scss"
import logologin from "../../assets/images/login-img.png"
import dream from "../../assets/images/so-do.jpg"
import icon1 from "../../assets/images/net-icon-01.png"
import icon2 from "../../assets/images/net-icon-02.png"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:8080/user/login", {
        email,
        password,
      });
      console.log(response);
      const token = response.data.user.token;
      console.log(token);
      localStorage.setItem("token", `Bearer ${token}`);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getUser = async (id: string) => {
    const user = await userServices.getUserApi(id);
    console.log(
      "console.log(process.env.REACT_APP_API_URL);",
      process.env.REACT_APP_API_URL
    );
    console.log("user: ", user);
  };

  return (
    <div className={style.body}>
      <div className={style.left}>
        <img src={logologin} alt="" />
        <h2>Welcome to <br />
          DreamsLMS Courses
        </h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
      </div>
      <div className={style.right}>
        <div className={style.dream}>
          <img src={dream} alt="" />
          <a href="">back to home</a>
        </div>
        <h2>Sign into Your Account</h2>
        <form action="">
          <label htmlFor="">Email</label>
          <input type="text" placeholder="Enter your email address" />
          <label htmlFor="">Password</label>
          <input type="text" placeholder="Enter you password" />
          <label className={style.forgot} htmlFor="">Forgot Password ?</label>
          <a href="Forgot Password?"></a>
          <label className={style.checkbox} htmlFor="">
            <input type="checkbox" />
           <span>Remember</span>
          </label>

          <button>Sign in</button>

        </form>
        <div className={style.botteam}>
          <a href="">Or sign in with</a>
          <div className={style.icon}>
            <a href=""><img src={icon1} alt="" /> Sign in using Google</a>
            <a href=""><img src={icon2} alt="" />  in usin Facebook</a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;