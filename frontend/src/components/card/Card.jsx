import React from "react";
import "./Card.css";

const Card = ({ label = "", children }) => {
  return (
    <>
      <div className="card">
        <h1 className="card-header">{label}</h1>
        {children}
      </div>
    </>
  );
};

export default Card;
