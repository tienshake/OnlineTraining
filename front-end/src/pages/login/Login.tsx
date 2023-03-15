import React, { useState } from "react";
import axios from "axios";
import axiosClient from "../../api/axiosClient";

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
    try {
      const response = await axiosClient.get(
        `http://localhost:8080/user/get?id=${id}`
      );
      console.log(response);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <div>
      <h1>Login Form</h1>
      <input type="email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => login(email, password)}>Login</button>
      <button onClick={() => getUser("ALL")}>Get user</button>

      <>{console.log("re-render")}</>
    </div>
  );
};

export default Login;
