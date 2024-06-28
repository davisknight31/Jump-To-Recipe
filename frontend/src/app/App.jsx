import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./routes/home/HomePage";
import DetailsPage from "./routes/details/DetailsPage";
import "./App.css";
import ThemeSwitcher from "../components/theme-switcher/ThemeSwitcher";

function App() {
  return (
    <>
      <ThemeSwitcher></ThemeSwitcher>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details/:recipe_title" element={<DetailsPage />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
