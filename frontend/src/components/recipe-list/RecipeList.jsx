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
  const [updateCount, setUpdateCount] = useState(0);
  const [gridClassName, setGridClassName] = useState("recipe-list");
  const [showRecipeList, setShowRecipeList] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

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
    const handleResize = () => {
      setUpdateCount((prevCount) => prevCount + 1);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    console.log(updateCount);
    let rowsPerPage = 3;
    let columnsPerPage = 3;
    if (window.innerWidth > 1550) {
      columnsPerPage = 4;
    } else if (window.innerWidth > 800) {
      columnsPerPage = 3;
    } else if (window.innerWidth > 550) {
      columnsPerPage = 2;
    } else {
      columnsPerPage = 1;
    }

    if (window.innerHeight > 1200) {
      rowsPerPage = 4;
    } else if (window.innerHeight > 900) {
      rowsPerPage = 3;
    } else if (window.innerHeight > 680) {
      rowsPerPage = 2;
    } else {
      rowsPerPage = 1;
    }

    if (window.innerWidth <= 550) {
      columnsPerPage = 1;
      rowsPerPage = 5;
    }

    const numberOfItemsToIndex = rowsPerPage * columnsPerPage;
    // console.log(columnsPerPage, rowsPerPage, numberOfItemsToIndex);
    let newGridClassName = "recipe-list ";
    if (numberOfItemsToIndex === 16) {
      newGridClassName += "four-by-four";
    } else if (columnsPerPage === 4 && rowsPerPage === 3) {
      newGridClassName += "four-by-three";
    } else if (columnsPerPage === 4 && rowsPerPage === 2) {
      newGridClassName += "four-by-two";
    } else if (columnsPerPage === 4 && rowsPerPage === 1) {
      newGridClassName += "four-by-one";
    }
    //++
    else if (columnsPerPage === 3 && rowsPerPage === 4) {
      newGridClassName += "three-by-four";
    } else if (columnsPerPage === 3 && rowsPerPage === 3) {
      newGridClassName += "three-by-three";
    } else if (columnsPerPage === 3 && rowsPerPage === 2) {
      newGridClassName += "three-by-two";
    } else if (columnsPerPage === 3 && rowsPerPage === 1) {
      newGridClassName += "three-by-one";
    }
    //++
    else if (columnsPerPage === 2 && rowsPerPage === 4) {
      newGridClassName += "two-by-four";
    } else if (columnsPerPage === 2 && rowsPerPage === 3) {
      newGridClassName += "two-by-three";
    } else if (columnsPerPage === 2 && rowsPerPage === 2) {
      newGridClassName += "two-by-two";
    } else if (columnsPerPage === 2 && rowsPerPage === 1) {
      newGridClassName += "two-by-one";
    }
    //++
    else if (columnsPerPage === 1 && rowsPerPage === 4) {
      newGridClassName += "one-by-four";
    } else if (columnsPerPage === 1 && rowsPerPage === 3) {
      newGridClassName += "one-by-three";
    } else if (columnsPerPage === 1 && rowsPerPage === 2) {
      newGridClassName += "one-by-two";
    } else {
      newGridClassName += "one-by-one";
    }

    if (columnsPerPage === 1 && rowsPerPage === 5) {
      newGridClassName += "recipe-list mobile";
    }
    setGridClassName(newGridClassName);
    const startIndex = (activePage - 1) * numberOfItemsToIndex;
    const endIndex = startIndex + numberOfItemsToIndex;
    if (recipes.length > 0) {
      const newItems = recipes.slice(startIndex, endIndex);
      setItemsForCurrentPage(newItems);
    }
  }, [recipes, activePage, updateCount]);

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

  const truncateTitle = (title) => {
    if (title.length > 40) {
      return title.substring(0, 40) + "...";
    }
    return title;
  };

  // window.addEventListener("resize", incrementResizeCounter);

  return (
    <>
      {(emptyList && (
        <div className="no-results default-container">Search for recipes!</div>
      )) ||
        (!hasSearched && !hasPreviouslySearched() && (
          <div className="no-results default-container">
            Search for recipes!
          </div>
        ))}

      {emptySearch && (
        <div className="no-results default-container">
          No results were found... perhaps you have a typo?
        </div>
      )}
      {isFetching && (
        <div className="home-spinner-container default-container">
          <Spinner></Spinner>
        </div>
      )}

      <>
        <div className={gridClassName}>
          {itemsForCurrentPage.map((recipe, index) => (
            <motion.div
              onClick={() => setSelectedRecipe(index)}
              className="recipe-list-item"
              key={index}
              layoutId={`recipe-${index}`}
            >
              {selectedRecipe !== index && (
                <>
                  <span className="recipe-title">
                    {truncateTitle(recipe.recipe_title)}
                  </span>
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
      </>

      <AnimatePresence>
        {selectedRecipe !== null && (
          <DetailsComponent
            layoutId={`recipe-${selectedRecipe}`}
            recipe={itemsForCurrentPage[selectedRecipe]}
            handleSwap={() => setSelectedRecipe(null)}
            recipeTitle={recipes[selectedRecipe].recipe_title}
            recipeLink={recipes.recipe_link}
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
