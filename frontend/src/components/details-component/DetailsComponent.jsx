import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./DetailsComponent.css";
import Spinner from "../spinner/Spinner";
import GeneralRecipeDetails from "../general-recipe-details/GeneralRecipeDetails";
import IngredientList from "../ingredient-list/IngredientList";
import StepsList from "../steps-list/StepsList";
import NutritionInfo from "../nutrition-info/NutritionInfo";
import { getRecipeDetails } from "../../services/api";
import Button from "../button/Button";

const DetailsComponent = ({ layoutId, recipe, handleSwap }) => {
  const [wrapperClassName, setWrapperClassName] = useState("");
  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [recipeLink, setRecipeLink] = useState("");
  const [recipeImageSource, setRecipeImageSource] = useState("");
  const [recipeImageAlt, setRecipeImageAlt] = useState("");

  const closeDetails = () => {
    handleSwap();
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    console.log(recipe.recipe_link, recipe.origin);
    const fetchRecipeDetails = async () => {
      try {
        const response = await getRecipeDetails(
          recipe.recipe_link,
          recipe.origin
        );
        setRecipeLink(recipe.recipe_link);
        setRecipeImageSource(recipe.recipe_image);
        setRecipeImageAlt(recipe.recipe_image_alt);
        console.log("response data", response.data);
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchRecipeDetails();
  }, []);

  return (
    <motion.div
      className={"details-component-wrapper" + wrapperClassName}
      layoutId={layoutId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isFetching && (
        <>
          <div className="details-spinner-container default-container-details">
            <Spinner></Spinner>
          </div>
        </>
      )}
      {!isFetching && (
        <>
          <div className="details-component-container">
            <div className="nested-details">
              <GeneralRecipeDetails
                title={details.recipe_title}
                author={details.author}
                prepTime={details.prep_time}
                cookTime={details.cook_time}
                totalTime={details.total_time}
                servings={details.servings}
                yield_={details.total_yield}
                image={recipeImageSource}
                imageAlt={recipeImageAlt}
                recipeLink={recipeLink}
              ></GeneralRecipeDetails>
              <div className="ingredients-and-steps">
                <h1 className="ingredient-header">Ingredients</h1>
                <IngredientList
                  ingredientHeaders={details.ingredient_headers}
                  ingredientLists={details.ingredients}
                ></IngredientList>
                <h1 className="steps-header">Steps</h1>
                <StepsList steps={details.steps}></StepsList>
              </div>
              <div className="nutrition-info-wrapper">
                <NutritionInfo
                  nutritionInfo={details.nutrition_info}
                ></NutritionInfo>
              </div>
            </div>
            <div className="button-wrapper">
              <Button
                label="Exit"
                reset={false}
                exit={true}
                onClick={closeDetails}
              ></Button>
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default DetailsComponent;
