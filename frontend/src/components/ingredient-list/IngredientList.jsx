import React, { useState, useEffect } from "react";
import "./IngredientList.css";

const IngredientList = ({ ingredientHeaders = [], ingredientLists = [] }) => {
  console.log("Headers:", ingredientHeaders);
  console.log("Ingredients:", ingredientLists); // Debugging statement
  // const [hasMultipleLists, setHasMultipleLists] = useState(false);
  const [hasNoIngredients, setHasNoIngredients] = useState(true);

  useEffect(() => {
    if (ingredientLists.length > 0) {
      setHasNoIngredients(false);
    }
  }, [ingredientLists, hasNoIngredients]);

  return (
    <>
      <h1 className="ingredient-header">Ingredients</h1>

      {/* {ingredientLists.map((ingredientList, index) => (
        <ul className="ingredient-list" key={index}>
          <div className="section-header">{ingredientHeaders[index]}</div>
          {ingredientList.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      ))} */}

      {hasNoIngredients && (
        <div className="no-ingredients">
          Ingredients could not be found. Try checking the original link.
        </div>
      )}

      {!hasNoIngredients && (
        <>
          {ingredientLists.map((ingredientList, index) => (
            <ul className="ingredient-list" key={index}>
              <div className="section-header">{ingredientHeaders[index]}</div>
              {ingredientList.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          ))}
        </>
      )}
    </>
  );
};

export default IngredientList;
