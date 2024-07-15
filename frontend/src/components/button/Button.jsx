import React from "react";
import "./Button.css";

const Button = ({ label = "", reset, exit, onClick }) => {
  let buttonClass = "button";
  let buttonType = "submit";
  if (reset) {
    buttonType = "reset";
  }

  if (exit) {
    buttonType = "submit exit";
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
