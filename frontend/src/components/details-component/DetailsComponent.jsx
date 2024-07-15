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

const DetailsComponent = ({ layoutId, recipe, recipeTitle, handleSwap }) => {
  const [wrapperClassName, setWrapperClassName] = useState("");
  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const closeDetails = () => {
    setWrapperClassName(" hidden");
    handleSwap();
  };
  useEffect(() => {
    console.log(recipe.recipe_link, recipe.origin);
    const fetchRecipeDetails = async () => {
      try {
        const response = await getRecipeDetails(
          recipe.recipe_link,
          recipe.origin
        );
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
      //   transition={{ duration: 2 }}
    >
      {isFetching && (
        <>
          <div className="details-spinner-container">
            <Spinner></Spinner>
          </div>
        </>
      )}
      {!isFetching && (
        <>
          <div>
            <GeneralRecipeDetails
              title={recipeTitle}
              author={details.author}
              prepTime={details.prep_time}
              cookTime={details.cook_time}
              totalTime={details.total_time}
              servings={details.servings}
              yield_={details.total_yield}
              image={details.recipe_image}
              recipeLink={recipe.recipe_link}
            ></GeneralRecipeDetails>
            <div className="ingredients-and-steps">
              <IngredientList
                ingredientHeaders={details.ingredient_headers}
                ingredientLists={details.ingredients}
              ></IngredientList>
              <StepsList steps={details.steps}></StepsList>
            </div>
            <div className="nutrition-info-wrapper">
              <NutritionInfo
                nutritionInfo={details.nutrition_info}
              ></NutritionInfo>
            </div>
            <div className="button-wrapper">
              <Button
                label="Exit"
                reset={false}
                exit={true}
                onClick={closeDetails}
              ></Button>
            </div>
            {/* <button onClick={closeDetails}>BACK</button> */}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default DetailsComponent;
