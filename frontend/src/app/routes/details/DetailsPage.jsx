import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getRecipeDetails } from "../../../services/api";

const DetailsPage = () => {
  const { recipe_title } = useParams();
  const location = useLocation();
  //   const { recipe_link, star_rating } = location.state || {};
  const queryParams = new URLSearchParams(location.search);
  const recipeLink = queryParams.get("recipe_link");
  const recipeOrigin = queryParams.get("origin");

  //   const star_rating = queryParams.get("star_rating");

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
      <div>{recipe_title}</div>
      <div>{recipeLink}</div>
      {/* <div className="cards">
        <Card label="Jump to Recipe">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholderText="Enter a recipe!"
          ></Input>
          <div className="button-group">
            <Button
              label="Search"
              reset={false}
              onClick={handleSearchClick}
            ></Button>
            <Button label="Reset" reset={true}></Button>
          </div>
        </Card>

        <Card label="Results">
          <RecipeList searchValue={searchValue}></RecipeList>
        </Card>
      </div> */}
    </>
  );
};

export default DetailsPage;
