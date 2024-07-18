import React from "react";
import "./GeneralRecipeDetails.css";

const GeneralRecipeDetails = ({
  author,
  recipeLink,
  prepTime,
  cookTime,
  totalTime,
  servings,
  yield_,
  image,
  imageAlt,
  title,
}) => {
  return (
    <div className="general-details-wrapper">
      <h1 className="recipe-title">{title}</h1>
      <div className="image-and-list">
        <img className="recipe-image" src={image} alt={imageAlt}></img>
        <div className="general-details-list">
          <div className="general-details-list-item">
            <span className="general-details-label">Prep Time: </span>
            {prepTime}
          </div>
          <div className="general-details-list-item">
            <span className="general-details-label">Cook Time: </span>
            {cookTime}
          </div>
          <div className="general-details-list-item">
            <span className="general-details-label">Total Time: </span>
            {totalTime}
          </div>
          <div className="general-details-list-item">
            <span className="general-details-label">Servings: </span>
            {servings}
          </div>
          <div className="general-details-list-item">
            <span className="general-details-label">Yield: </span>
            {yield_}
          </div>
          <div className="general-details-list-item">
            <span className="general-details-label">Author: </span>
            {author}
          </div>
          <div className="general-details-list-item">
            <a href={recipeLink} target="_blank" className="original-link">
              Original Recipe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralRecipeDetails;
