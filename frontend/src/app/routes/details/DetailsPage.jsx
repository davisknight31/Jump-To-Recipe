import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getRecipeDetails } from "../../../services/api";
import Card from "../../../components/card/Card";
import GeneralRecipeDetails from "../../../components/general-recipe-details/GeneralRecipeDetails";
import IngredientList from "../../../components/ingredient-list/IngredientList";
import StepsList from "../../../components/steps-list/StepsList";
import NutritionInfo from "../../../components/nutrition-info/NutritionInfo";
import Spinner from "../../../components/spinner/Spinner";
import "./DetailsPage.css";

const DetailsPage = () => {
  const { recipe_title } = useParams();
  const [details, setDetails] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  const location = useLocation();
  //   const { recipe_link, star_rating } = location.state || {};
  const queryParams = new URLSearchParams(location.search);
  const recipeLink = queryParams.get("recipe_link");
  const recipeOrigin = queryParams.get("origin");
  const recipeTitle = recipe_title;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await getRecipeDetails(recipeLink, recipeOrigin);
        console.log("response data", response.data);
        setDetails(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchRecipeDetails();
  }, [recipe_title]);

  if (isFetching) {
    return (
      <div className="details-spinner-container">
        <Spinner />
      </div>
    );
  }

  console.log("Rendering details:", details.data);
  return (
    <>
      <div className="details-wrapper">
        <Card label={recipeTitle}>
          <GeneralRecipeDetails
            author={details.author}
            recipeLink={recipeLink}
            prepTime={details.prep_time}
            cookTime={details.cook_time}
            totalTime={details.total_time}
            servings={details.servings}
            yield_={details.total_yield}
            image={details.recipe_image}
          ></GeneralRecipeDetails>
          <IngredientList
            ingredientHeaders={details.ingredient_headers}
            ingredientLists={details.ingredients}
          ></IngredientList>
          <StepsList steps={details.steps}></StepsList>
          <NutritionInfo nutritionInfo={details.nutrition_info}></NutritionInfo>
        </Card>
      </div>
    </>
  );
};

export default DetailsPage;
