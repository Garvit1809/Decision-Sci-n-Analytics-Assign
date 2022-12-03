import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios'
import { LOCALSTORAGE_USER } from "../utils/GlobalConstants";
import { BASE_URL, EventEnd, UserEnd } from "../utils/APIRoutes";

const Section = styled.div`
  width: 100vw;
  height: 100vh;

  form{ 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const Signup = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem(LOCALSTORAGE_USER)) {
      navigate('/');
    }
  }, [navigate]);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${BASE_URL}${UserEnd}/signup`, values)
    data.user.token = data.token
    console.log(data);
    localStorage.setItem(LOCALSTORAGE_USER, JSON.stringify(data.user));
    navigate('/')
  };

  return (
    <Section>
      <h2>ASSIGNMENT</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Username"
          onChange={(e) => handleChange(e)}
        />
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
        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Create User</button>
        <span>
          Already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </Section>
  );
};

export default Signup;
