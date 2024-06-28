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
}) => {
  return (
    <>
      <div className="recipe-image-wrapper">
        <img className="recipe-image" src={image}></img>
      </div>
      <div className="general-detail-grid">
        <div className="general-detail-grid-item">
          <span className="general-detail-label">Prep Time: </span>
          {prepTime}
        </div>
        <div className="general-detail-grid-item">
          <span className="general-detail-label">Cook Time: </span>
          {cookTime}
        </div>
        <div className="general-detail-grid-item">
          <span className="general-detail-label">Total Time: </span>
          {totalTime}
        </div>
        <div className="general-detail-grid-item">
          <span className="general-detail-label">Servings: </span>
          {servings}
        </div>
        <div className="general-detail-grid-item">
          <span className="general-detail-label">Yield: </span>
          {yield_}
        </div>
      </div>
      <div className="author-and-link">
        <div className="">
          <span className="general-detail-label">Author: </span>
          {author}
        </div>
        <div className="">
          <span className="general-detail-label">Original Recipe: </span>
          <a href={recipeLink} target="_blank" className="original-link">
            {recipeLink}
          </a>
        </div>
      </div>
      {/* <div className="detail original-author">
        <span className="general-detail-label">Author: </span>
        {author}
      </div> */}
      {/* <div className="detail recipe-link">
        <span className="general-detail-label">Original Recipe: </span>
        <a href={recipeLink}>{recipeLink}</a>
      </div> */}
      {/* <div className="detail prep-time">
        <span className="general-detail-label">Preparation Time: </span>
        {prepTime}
      </div>
      <div className="detail cook-time">
        <span className="general-detail-label">Cook Time: </span>
        {cookTime}
      </div>
      <div className="detail total-time">
        <span className="general-detail-label">Total Time: </span>
        {totalTime}
      </div>
      <div className="detail servings">
        <span className="general-detail-label">Servings: </span>
        {servings}
      </div>
      <div className="detail yield">
        <span className="general-detail-label">Yield: </span>
        {yield_}
      </div> */}
    </>
  );
};

export default GeneralRecipeDetails;
