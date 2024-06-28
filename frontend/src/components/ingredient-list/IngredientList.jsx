import React from "react";
import "./IngredientList.css";

const IngredientList = ({ ingredients }) => {
  return (
    <>
      <h1 className="ingredient-header">Ingredients</h1>
      <ul className="ingredient-list">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </>
  );
};

export default IngredientList;
