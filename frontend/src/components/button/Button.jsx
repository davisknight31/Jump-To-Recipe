import React from "react";
import "./Button.css";

const Button = ({ label = "", reset, onClick }) => {
  let buttonClass = "button";
  let buttonType = "submit";
  if (reset) {
    buttonType = "reset";
  }

  return (
    <>
      <button className={buttonType + " " + buttonClass} onClick={onClick}>
        {label}
      </button>
    </>
  );
};

export default Button;
