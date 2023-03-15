import React from "react";

const Register = () => {
  return (
    <div>
      <h1>Register Form</h1>
      <input type="name" />
      <input type="email" />
      <input type="password" />
      <>{console.log("re-render")}</>
    </div>
  );
};

export default Register;
