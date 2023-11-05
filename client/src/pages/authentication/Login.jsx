import React, { useContext, useState } from "react";
import "./auth.css";
import Auth from "./Auth";
import axios from "axios";
import { storeContext } from "../../context/StoreProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setCookie, setIsHover, isUserRedirected } =
    useContext(storeContext);

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRedirection = () => {
    if (isUserRedirected) {
      return navigate("/cart");
    } else {
      return navigate("/");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username !== "" && password !== "") {
      try {
        setLoading(true);
        const response = await axios.post(process.env.REACT_APP_LOGIN_ROUTE, {
          username,
          password,
        });

        const { action, message, userId, token } = response.data;
        alert(message);
        if (action === "success") {
          setCookie("auth_token", token, { path: "/", maxAge: 43200 });
          window.localStorage.setItem("userId", userId);
          handleRedirection();
          setLoading(false);
          setIsHover(false);
        }
      } catch (error) {
        setLoading(false);
        console.log("error at:login(client)");
      }
    } else {
      alert("Fill all required fields");
    }
  };

  return (
    <>
      <Auth
        loading={loading}
        name="Login"
        btnName="Login"
        u={username}
        p={password}
        su={setUsername}
        sp={setPassword}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Login;
