import React, { useState, useEffect } from "react";
import "./NutritionInfo.css";

const NutritionInfo = ({ nutritionInfo = [] }) => {
  const [hasNoNutritionInfo, setHasNoNutritionInfo] = useState(true);

  useEffect(() => {
    if (nutritionInfo.length > 0) {
      setHasNoNutritionInfo(false);
    }
  }, [nutritionInfo, hasNoNutritionInfo]);

  return (
    <>
      <h1 className="nutrition-info-header">
        Nutrition Info &#40;Per Serving&#41;
      </h1>
      {hasNoNutritionInfo && (
        <div className="no-nutrition">
          No nutrition info is not provided or could not be found. Try checking
          the original link.
        </div>
      )}

      {!hasNoNutritionInfo && (
        <div className="nutrition-info">
          {nutritionInfo.map((item, index) => (
            <div key={index} className="nutrition-info-item">
              <span className="nutrition-label">{item.label}: </span>
              {item.value}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default NutritionInfo;
