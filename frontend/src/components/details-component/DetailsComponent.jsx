import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./DetailsComponent.css";
import Spinner from "../spinner/Spinner";
import GeneralRecipeDetails from "../general-recipe-details/GeneralRecipeDetails";
import { getRecipeDetails } from "../../services/api";

const DetailsComponent = ({ layoutId, recipe, handleSwap }) => {
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
      // transition={{ duration: 2 }}
    >
      {isFetching && (
        <>
          <Spinner></Spinner>
        </>
      )}
      {!isFetching && (
        <>
          <div>
            <button onClick={closeDetails}>BACK</button>
            <GeneralRecipeDetails
              author={details.author}
              recipeLink={recipe}
              prepTime={details.prep_time}
              cookTime={details.cook_time}
              totalTime={details.total_time}
              servings={details.servings}
              yield_={details.total_yield}
              image={details.recipe_image}
            ></GeneralRecipeDetails>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default DetailsComponent;
