import React from "react";

const Login = () => {
  return (
    <div>
      <h1>Login Form</h1>
      <input type="email" />
      <input type="password" />
      <>{console.log("re-render")}</>
    </div>
  );
};

export default Login;
