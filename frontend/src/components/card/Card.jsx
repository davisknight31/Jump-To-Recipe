import React from "react";
import "./Card.css";

const Card = ({ label = "", children }) => {
  return (
    <>
      <div className="card">
        <h1 className="card-header">{label}</h1>
        {/* <div className="border"></div> */}
        {children}
      </div>
    </>
  );
};

export default Card;
