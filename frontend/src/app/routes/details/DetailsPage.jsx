import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";

const DetailsPage = () => {
  const { recipe_title } = useParams();
  const location = useLocation();
  //   const { recipe_link, star_rating } = location.state || {};
  const queryParams = new URLSearchParams(location.search);
  const recipe_link = queryParams.get("recipe_link");
  //   const star_rating = queryParams.get("star_rating");

  return (
    <>
      <div>{recipe_title}</div>
      <div>{recipe_link}</div>
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
