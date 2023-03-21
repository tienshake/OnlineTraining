
import React from "react";
import style from "./Register.module.scss";

const Register = () => {
  return (
    <div className={style.body}>
      <div className={style.left}>
        <img src="../../assets/images/so-do.png" alt="" />
        <h2>Chào mừng bạn đã đến với khoá học</h2>
      </div>
      <div className={style.right}>
        <h1>Sign up</h1>
        <form action="">
          <label htmlFor="Full Name">FullName</label>
          <input type="text" placeholder="Enter you Full Name"/>
          <label htmlFor="Full Name">Emaill</label>
          <input type="text" placeholder="Enter you email address"/>
          <label htmlFor="Full Name">Password</label>
          <input type="text" placeholder="Enter you password"/>
        </form>
      </div>
    </div>
  );
};

export default Register;