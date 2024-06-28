import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getRecipeDetails } from "../../../services/api";
import Card from "../../../components/card/Card";
import GeneralRecipeDetails from "../../../components/general-recipe-details/GeneralRecipeDetails";
import IngredientList from "../../../components/ingredient-list/IngredientList";
import StepsList from "../../../components/steps-list/StepsList";
import NutritionInfo from "../../../components/nutrition-info/NutritionInfo";

const DetailsPage = () => {
  const { recipe_title } = useParams();
  const location = useLocation();
  //   const { recipe_link, star_rating } = location.state || {};
  const queryParams = new URLSearchParams(location.search);
  const recipeLink = queryParams.get("recipe_link");
  const recipeOrigin = queryParams.get("origin");
  const recipeTitle = recipe_title;

  //   const star_rating = queryParams.get("star_rating");

  const testRecipeData = {
    author: "KATHY",
    cook_time: "10 mins",
    ingredients: [
      "1 ½ cups white sugar",
      "1 cup butter, softened",
      "2 eggs",
      "2 teaspoons vanilla extract",
      "2 cups all-purpose flour",
      "⅔ cup cocoa powder",
      "¾ teaspoon baking soda",
      "¼ teaspoon salt",
      "2 cups semisweet chocolate chips",
      "½ cup chopped walnuts (Optional)",
    ],
    nutrition_info: [
      {
        label: "Calories",
        value: "125",
      },
      {
        label: "Fat",
        value: "7g",
      },
      {
        label: "Carbs",
        value: "16g",
      },
      {
        label: "Protein",
        value: "2g",
      },
    ],
    prep_time: "15 mins",
    servings: "48",
    steps: [
      "Preheat the oven to 350 degrees F (175 degrees C).",
      "Beat sugar, butter, eggs, and vanilla in a large bowl until light and fluffy.",
      "Combine flour, cocoa powder, baking soda, and salt in another bowl; stir into butter mixture until well blended. Mix in chocolate chips and walnuts. Drop spoonfuls of dough 2 inches apart onto ungreased cookie sheets.",
      "Bake in the preheated oven just until set, 8 to 10 minutes. Cool slightly on the cookie sheets before transferring to wire racks to cool completely.",
    ],
    total_time: "25 mins",
    total_yield: "4 dozen",
  };

  useEffect(() => {
    async function fetchRecipeDetails() {
      try {
        const response = await getRecipeDetails(recipeLink, recipeOrigin);
      } catch (error) {
        console.error("Error fetching in recipe list component:", error);
      }
    }
    fetchRecipeDetails();
  }, []);

  return (
    <>
      <Card label={recipeTitle}>
        <GeneralRecipeDetails
          author={testRecipeData.author}
          recipeLink={recipeLink}
          prepTime={testRecipeData.prep_time}
          cookTime={testRecipeData.cook_time}
          totalTime={testRecipeData.total_time}
          servings={testRecipeData.servings}
          yield_={testRecipeData.total_yield}
          image="https://www.allrecipes.com/thmb/vVuPAECHLm122XSAlTmyVVg-s0k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/15806chemical-apple-pie-no-apple-apple-piefabeveryday4x3-7726f6962e5f43d49066a6927f065a92.jpg"
        ></GeneralRecipeDetails>
        <IngredientList
          ingredients={testRecipeData.ingredients}
        ></IngredientList>
        <StepsList steps={testRecipeData.steps}></StepsList>
        <NutritionInfo
          nutritionInfo={testRecipeData.nutrition_info}
        ></NutritionInfo>
      </Card>
    </>
  );
};

export default DetailsPage;
