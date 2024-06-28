import React from "react";
import "./NutritionInfo.css";

const NutritionInfo = ({ nutritionInfo }) => {
  return (
    <>
      <h1 className="nutrition-info-header">Nutrition Info</h1>
      <div className="nutrition-info">
        {nutritionInfo.map((item, index) => (
          <div className="nutrition-info-item">
            <span className="nutrition-label">{item.label}: </span>
            {item.value}
          </div>
        ))}
      </div>
    </>
  );
};

export default NutritionInfo;
