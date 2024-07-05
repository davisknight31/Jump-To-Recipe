import React, { useState } from "react";
import "./IngredientList.css";

const IngredientList = ({ ingredientHeaders = [], ingredientLists = [] }) => {
  console.log("Headers:", ingredientHeaders);
  console.log("Ingredients:", ingredientLists); // Debugging statement
  // const [hasMultipleLists, setHasMultipleLists] = useState(false);

  return (
    <>
      <h1 className="ingredient-header">Ingredients</h1>
      {ingredientLists.map((ingredientList, index) => (
        <ul className="ingredient-list" key={index}>
          <div className="section-header">{ingredientHeaders[index]}</div>
          {ingredientList.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      ))}
      {/* <ul className="ingredient-list">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul> */}
    </>
  );
};

export default IngredientList;
