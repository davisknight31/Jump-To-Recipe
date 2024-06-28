import React from "react";
import "./StepsList.css";

const StepsList = ({ steps }) => {
  return (
    <>
      <h1 className="steps-header">Steps</h1>
      <ul className="steps-list">
        {steps.map((step, index) => (
          <li className="step-list-item" key={index}>
            <span className="number">{index + 1}. &nbsp;</span>
            {step}
          </li>
        ))}
      </ul>
    </>
  );
};

export default StepsList;
