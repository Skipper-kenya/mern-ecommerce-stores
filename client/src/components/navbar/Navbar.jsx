import React, { useContext, useRef, useState } from "react";
import "./navbar.css";

import { NavLink } from "react-router-dom";
import { User, ShoppingCart, House, SignOut } from "phosphor-react";
import { storeContext } from "../../context/StoreProvider";

const Navbar = () => {
  const { ready, cart, cookie, setCookie, isHover, setIsHover } =
    useContext(storeContext);

  const handleHover = () => {
    setIsHover(true);
  };
  const handleRemoveHover = () => {
    setIsHover(false);
  };

  const handleLogout = () => {
    setCookie("auth_token", "");
    window.localStorage.removeItem("userId");
  };

  const cartNo = useRef(null);



  if (ready) {
    const cartArr = Object.values(cart);

    const selectedItems = cartArr.reduce((results, item) => {
      if (item > 0) {
        results.push(item);
      }
      return results;
    }, []);

    cartNo.current = selectedItems.length;
  }

  return (
    <nav>
      <div className="top-left">
        <NavLink to={"/"}>rastaTech</NavLink>{" "}
      </div>
      <div className="top-right">
        <div className="home">
          <NavLink activeclassname="active" to={"./"} className="home">
            <House size={20} /> Home
          </NavLink>
        </div>
        <div className="cart">
          <NavLink activeclassname="active" to={"/cart"} className="cart">
            <ShoppingCart size={20} /> Cart
            <div className="cartNo">
              {cartNo.current > 0 ? cartNo.current : ""}
            </div>
          </NavLink>
        </div>

        {cookie.auth_token ? (
          <div className="logout">
            <small style={{ display: isHover ? "block" : "none" }}>
              Logout
            </small>
            <button
              onMouseEnter={handleHover}
              onMouseLeave={handleRemoveHover}
              onClick={handleLogout}
            >
              <SignOut size={20} />
            </button>
          </div>
        ) : (
          <div className="login">
            <NavLink activeclassname="active" to={"/login"} className="login">
              <User size={20} /> Login
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
