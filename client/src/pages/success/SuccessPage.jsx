import React from "react";
import "./success.css";

import { useNavigate } from "react-router-dom";
import { ArrowFatLinesLeft, CheckCircle } from "phosphor-react";

const SuccessPage = () => {
  const navigate = useNavigate();
  return (
    <div className="success-wrapper">
      <div className="succ-cont">
        <CheckCircle size={50} color="seagreen" />

        <h3>Thank You for Shopping with Us.</h3>

        <button onClick={() => navigate("/")}>
          {" "}
          <ArrowFatLinesLeft /> Go to Homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;
