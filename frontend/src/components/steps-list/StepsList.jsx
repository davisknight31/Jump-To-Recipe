import React from "react";
import "./StepsList.css";

const StepsList = ({ steps = [] }) => {
  return (
    <>
      <div className="step-component-wrapper">
        <ul className="steps-list">
          {steps.map((step, index) => (
            <li className="step-list-item" key={index}>
              <span className="number">{index + 1}. &nbsp;</span>
              {step}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default StepsList;
