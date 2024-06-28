import React, { useEffect, useState } from "react";
import "./RecipeList.css";
import {
  getRecipes,
  getCachedRecipes,
  hasPreviouslySearched,
} from "../../services/api";
import Spinner from "../spinner/Spinner";
import json from "../../assets/testJson.json";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

const RecipeList = ({ searchValue, resetClicked, setResetValue }) => {
  const [recipes, setRecipes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsForCurrentPage, setItemsForCurrentPage] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [emptyList, setEmptyList] = useState(true);

  useEffect(() => {
    // if (searchValue && hasSearched) {

    async function fetchRecipes() {
      if (searchValue) {
        try {
          setEmptyList(false);
          resetData();
          setHasSearched(true);
          setIsFetching(true);
          const response = await getRecipes(searchValue);
          setRecipes(response);
          console.log(recipes);
          const totalPages = Math.ceil(response.length / 10);
          setTotalPages(totalPages);
          goToPage(1);
          setEmptyList(false);
          setIsFetching(false);
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
          goToPage(1);
          setIsFetching(false);
        }
      }
    }
    fetchRecipes();
  }, [searchValue]);

  // else {
  //   if (hasPreviouslySearched() === true) {
  //     setIsFetching(true);
  //     setRecipes(getCachedRecipes());
  //     const totalPages = Math.ceil(response.length / 10);
  //     setTotalPages(totalPages);
  //     goToPage(1);
  //     setIsFetching(false);
  //   }
  // }

  // }, [searchValue, hasSearched]);

  // useEffect(() => {
  //   if (searchValue) {
  //     setHasSearched(true);
  //   }
  // }, [searchValue]);

  useEffect(() => {
    if (resetClicked) {
      resetData();
      setEmptyList(true);
      setResetValue(false);
    }
  }, [resetClicked, setResetValue]);

  useEffect(() => {
    const startIndex = (activePage - 1) * 10;
    const endIndex = startIndex + 10;
    if (recipes.length > 0) {
      const newItems = recipes.slice(startIndex, endIndex);
      setItemsForCurrentPage(newItems);
    }
  }, [recipes, activePage]);

  const goToPage = (page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const resetData = () => {
    setRecipes([]);
    setItemsForCurrentPage([]);
    setTotalPages(0);
  };

  // console.log("recipes:", recipes);
  // console.log("totalPages:", totalPages);
  // console.log("pageNumbers:", pageNumbers);

  return (
    <>
      <div className="wrapper">
        {(emptyList && (
          <div className="no-results">Search for recipes above!</div>
        )) ||
          (!hasSearched && !hasPreviouslySearched() && (
            <div className="no-results">Search for recipes above!</div>
          ))}
        {isFetching && (
          <div className="spinner-container">
            <Spinner></Spinner>
          </div>
        )}
        <ul className="recipe-list">
          {itemsForCurrentPage.map((recipe, index) => (
            <li className="recipe-list-item" key={index}>
              <Link
                className="recipe-link"
                to={`/details/${
                  recipe.recipe_title
                }?recipe_link=${encodeURIComponent(
                  recipe.recipe_link
                )}&origin=${recipe.origin}`}
                // state={{
                //   recipe_title: recipe.recipe_title,
                //   recipe_link: recipe.recipe_link,
                //   star_rating: recipe.star_rating,
                // }}
              >
                <span className="recipe-title">{recipe.recipe_title}</span>
                <br></br>
                <span className="recipe-rating">
                  {recipe.star_rating} Stars
                </span>{" "}
                <br></br>
                <span className="recipe-origin">{recipe.origin}</span>
              </Link>
            </li>
          ))}
        </ul>
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

              {/* {pageNumbers.map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={activePage === page ? "active" : ""}
              >
                {page}
              </button>
            ))} */}
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
      </div>
    </>
  );
};

export default RecipeList;
