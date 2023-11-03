import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Cart from "./pages/cart/Cart";
import Login from "./pages/authentication/Login";
import SuccessPage from "./pages/success/SuccessPage";
import StoreProvider from "./context/StoreProvider";
import Register from "./pages/authentication/Register";

function App() {
  return (
    <>
      <StoreProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/success_pay" element={<SuccessPage />} />
          </Routes>
        </Router>
      </StoreProvider>
    </>
  );
}

export default App;
