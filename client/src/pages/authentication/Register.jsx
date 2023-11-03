import React, { useState } from "react";
import Auth from "./Auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (username !== "" && password !== "") {
      try {
        const response = await axios.post(
          process.env.REACT_APP_REGISTER_ROUTE,
          {
            username,
            password,
          }
        );

        const { message, action } = response.data;

        if (action === "success") {
          setUsername("");
          setPassword("");
          navigate("/login");
        }
        setLoading(false);
        alert(message);
      } catch (error) {
        setLoading(false);
        console.log("error at register:client");
      }
    } else {
      alert("Fill all required fields");
    }
  };
  return (
    <>
      <Auth
        loading={loading}
        name="Register"
        btnName="Create Account"
        u={username}
        p={password}
        su={setUsername}
        sp={setPassword}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Register;
