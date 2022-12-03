import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL, UserEnd } from "../utils/APIRoutes";
import { LOCALSTORAGE_USER } from "../utils/GlobalConstants";
import axios from 'axios'

const Section = styled.div`
  width: 100vw;
  height: 100vh;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Login = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (localStorage.getItem(LOCALSTORAGE_USER)) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${BASE_URL}${UserEnd}/login`, values)
    console.log(data);
    data.user.token = data.token;
    localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(data.user));
    navigate('/')
  };

  return (
    <Section>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} >
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={(e) => handleChange(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit" >Login</button>
        <span>Don't have an account? <Link to="/register">Register</Link></span>
      </form>
    </Section>
  );
};

export default Login;
