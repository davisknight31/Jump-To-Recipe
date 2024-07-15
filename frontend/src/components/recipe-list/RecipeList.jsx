import React, { act, useEffect, useState } from "react";
import "./RecipeList.css";
import {
  getRecipes,
  getCachedRecipes,
  hasPreviouslySearched,
  setCachedActivePage,
  getCachedActivePage,
} from "../../services/api";
import Spinner from "../spinner/Spinner";
import DetailsComponent from "../details-component/DetailsComponent";
import json from "../../assets/testJson.json";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const RecipeList = ({ searchValue, resetClicked, setResetValue }) => {
  const [recipes, setRecipes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsForCurrentPage, setItemsForCurrentPage] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [emptyList, setEmptyList] = useState(true);
  const [emptySearch, setEmptySearch] = useState(false);
  const [showRecipeDetails, setShowRecipeDetails] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    async function fetchRecipes() {
      if (searchValue) {
        try {
          setEmptyList(false);
          setEmptySearch(false);
          resetData();
          setHasSearched(true);
          setIsFetching(true);
          const response = await getRecipes(searchValue);
          if (response.length <= 0) {
            setEmptySearch(true);
            setIsFetching(false);
          } else {
            setRecipes(response);
            console.log(response);
            const totalPages = Math.ceil(response.length / 10);
            setTotalPages(totalPages);
            goToPage(1);
            setEmptyList(false);
            setIsFetching(false);
          }
        } catch (error) {
          console.error("Error fetching in recipe list component:", error);
        }
      } else {
        if (hasPreviouslySearched() === true) {
          setEmptyList(false);
          setIsFetching(true);
          setRecipes(getCachedRecipes());
          console.log(recipes);
          const totalPages = Math.ceil(getCachedRecipes().length / 10);
          setTotalPages(totalPages);
          setActivePage(getCachedActivePage());
          goToPage(getCachedActivePage());
          setIsFetching(false);
        }
      }
    }
    fetchRecipes();
  }, [searchValue]);

  useEffect(() => {
    if (resetClicked) {
      resetData();
      setEmptyList(true);
      setResetValue(false);
    }
  }, [resetClicked, setResetValue]);

  useEffect(() => {
    const startIndex = (activePage - 1) * 16;
    const endIndex = startIndex + 16;
    if (recipes.length > 0) {
      const newItems = recipes.slice(startIndex, endIndex);
      setItemsForCurrentPage(newItems);
    }
  }, [recipes, activePage]);

  const goToPage = (page) => {
    setActivePage(page);
    setCachedActivePage(page);
    window.scrollTo(0, 0);
  };

  const resetData = () => {
    setRecipes([]);
    setItemsForCurrentPage([]);
    setTotalPages(0);
    setCachedActivePage(1);
  };

  return (
    <>
      {(emptyList && (
        <div className="no-results">Search for recipes above!</div>
      )) ||
        (!hasSearched && !hasPreviouslySearched() && (
          <div className="no-results">Search for recipes above!</div>
        ))}

      {emptySearch && (
        <div className="no-results">
          No results were found... perhaps you have a typo?
        </div>
      )}
      {isFetching && (
        <div className="home-spinner-container">
          <Spinner></Spinner>
        </div>
      )}
      {/* <ul className="recipe-list">
          {itemsForCurrentPage.map((recipe, index) => (
            <Link
              key={index}
              className="recipe-link"
              to={`/details/${
                recipe.recipe_title
              }?recipe_link=${encodeURIComponent(recipe.recipe_link)}&origin=${
                recipe.origin
              }`}
              // state={{
              //   recipe_title: recipe.recipe_title,
              //   recipe_link: recipe.recipe_link,
              //   star_rating: recipe.star_rating,
              // }}
            >
              <li className="recipe-list-item" key={index}>
                <span className="recipe-title">{recipe.recipe_title}</span>
                <br></br>
                <span className="recipe-rating">
                  {recipe.star_rating === 0 ? (
                    <span>No Ratings</span>
                  ) : (
                    <span>{recipe.star_rating} Stars</span>
                  )}
                </span>
                <br></br>
                <span className="recipe-origin">{recipe.origin}</span>
              </li>
            </Link>
          ))}
        </ul> */}

      {/* <div className="recipe-list"> */}

      {/* Undo to this point */}

      <div className="recipe-list">
        {itemsForCurrentPage.map((recipe, index) => (
          <motion.div
            onClick={() => setSelectedRecipe(index)}
            className="recipe-list-item"
            key={index}
            layoutId={`recipe-${index}`}
          >
            {selectedRecipe !== index && (
              <>
                <span className="recipe-title">{recipe.recipe_title}</span>
                <span className="recipe-rating">
                  {recipe.star_rating === 0 ? (
                    <span>No Ratings</span>
                  ) : (
                    <span>{recipe.star_rating} Stars</span>
                  )}
                </span>
                <span className="recipe-origin">{recipe.origin}</span>{" "}
              </>
            )}
          </motion.div>
        ))}
      </div>

      <div className="pagination">
        {totalPages > 1 && (
          <>
            <button
              className="page-button"
              onClick={() => goToPage(activePage - 1)}
              disabled={activePage === 1}
            >
              Previous
            </button>
            <button
              className="page-button"
              onClick={() => goToPage(activePage + 1)}
              disabled={activePage === totalPages}
            >
              Next
            </button>
          </>
        )}
      </div>

      <AnimatePresence>
        {selectedRecipe !== null && (
          <DetailsComponent
            layoutId={`recipe-${selectedRecipe}`}
            recipe={itemsForCurrentPage[selectedRecipe]}
            handleSwap={() => setSelectedRecipe(null)}
          />
        )}
      </AnimatePresence>

      {/* {showRecipeDetails && (
        <>
          <DetailsComponent handleSwap={swapRecipeDetails}></DetailsComponent>
        </>
      )} */}

      {/* {itemsForCurrentPage.map((recipe, index) => (
          <Link
            key={index}
            className="recipe-link"
            to={`/details/${
              recipe.recipe_title
            }?recipe_link=${encodeURIComponent(recipe.recipe_link)}&origin=${
              recipe.origin
            }`}
          >
            <div onClick={swap()} className="recipe-list-item" key={index}>
              <span className="recipe-title">{recipe.recipe_title}</span>
              <span className="recipe-rating">
                {recipe.star_rating === 0 ? (
                  <span>No Ratings</span>
                ) : (
                  <span>{recipe.star_rating} Stars</span>
                )}
              </span>
              <span className="recipe-origin">{recipe.origin}</span>
            </div>
          </Link>
        ))} */}
      {/* </div> */}
      {/* 
      <div className="pagination">
        {totalPages > 1 && (
          <>
            <button
              className="page-button"
              onClick={() => goToPage(activePage - 1)}
              disabled={activePage === 1}
            >
              Previous
            </button>

            <button
              className="page-button"
              onClick={() => goToPage(activePage + 1)}
              disabled={activePage === totalPages + 2}
            >
              Next
            </button>
          </>
        )}
      </div> */}
    </>
  );
};

export default RecipeList;
