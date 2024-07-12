import React, { useState } from "react";
import Input from "../../../components/input/Input";
import Button from "../../../components/button/Button";
import Card from "../../../components/card/Card";
import "./HomePage.css";
import RecipeList from "../../../components/recipe-list/RecipeList";

const HomePage = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [resetValue, setResetValue] = useState(false);

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const handleSearchClick = () => {
    console.log(inputValue);
    if (inputValue.trim) {
      setSearchValue(inputValue);
    }
  };

  const handleResetClick = () => {
    setInputValue("");
    setSearchValue("");
    setResetValue(true);
    // setResetValue(false);
  };

  const handleKeyPress = (key) => {
    if (key === "Enter") {
      handleSearchClick();
    }
  };

  return (
    <>
      <div className="home-container">
        <div className="search-container">
          <h1 className="website-title">
            <span className="jump">Jump</span>
            <span> To</span>
            <span> Recipe</span>
          </h1>
          <Input
            className="home-search"
            value={inputValue}
            onChange={handleInputChange}
            placeholderText="Enter an ingredient or recipe!"
            handleKeyPress={handleKeyPress}
          ></Input>
          <div className="button-group">
            <Button
              label="Jump"
              reset={false}
              onClick={handleSearchClick}
            ></Button>
            <Button
              label="Reset"
              reset={true}
              onClick={handleResetClick}
            ></Button>
          </div>
        </div>
        <div className="results-container">
          <RecipeList
            searchValue={searchValue}
            resetClicked={resetValue}
            setResetValue={setResetValue} // Pass the setter to RecipeList
          ></RecipeList>
        </div>
      </div>
      {/* <div className="cards">
        <Card label="Jump to Recipe">
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholderText="Enter an ingredient or recipe!"
            handleKeyPress={handleKeyPress}
          ></Input>
          <div className="button-group">
            <Button
              label="Search"
              reset={false}
              onClick={handleSearchClick}
            ></Button>
            <Button
              label="Reset"
              reset={true}
              onClick={handleResetClick}
            ></Button>
          </div>
        </Card>

        <Card label="Results">
          <RecipeList
            searchValue={searchValue}
            resetClicked={resetValue}
            setResetValue={setResetValue} // Pass the setter to RecipeList
          ></RecipeList>
        </Card>
      </div> */}

      {/* <div className="cards">
        <div className="card">
          <h1 className="header">Jump to Recipe</h1>
          <div className="input-and-button-group">
            <Input placeholderText="Enter a recipe!"></Input>
            <div className="button-group">
              <Button label="Search" reset={false}></Button>
              <Button label="Reset" reset={true}></Button>
            </div>
          </div>
        </div>
        <div className="card"></div>
      </div> */}
    </>
  );
};

export default HomePage;
