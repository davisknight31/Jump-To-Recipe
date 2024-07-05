import React from "react";
import "./Input.css";

const Input = ({
  value,
  onChange,
  handleKeyPress,
  label = "",
  placeholderText = "",
}) => {
  const handleKeyDown = (event) => {
    handleKeyPress(event.key);
  };

  return (
    <div>
      {/* <label className="input-label">{placeholderText}</label> */}
      <input
        type="text"
        id="input"
        name="input"
        className="input-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyUp={handleKeyDown}
        placeholder={placeholderText}
      />
    </div>
  );
};

export default Input;
