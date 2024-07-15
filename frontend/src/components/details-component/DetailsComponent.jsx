import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./DetailsComponent.css";

const DetailsComponent = ({ layoutId, recipe, handleSwap }) => {
  return (
    <motion.div
      className="details-component-wrapper"
      layoutId={layoutId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      //   transition={{ duration: 0.5 }}
    >
      <div>
        <button onClick={handleSwap}>BACK</button>
        <h2>{recipe.recipe_title}</h2>
        <p>{recipe.origin}</p>
        <p>
          {recipe.star_rating === 0
            ? "No Ratings"
            : `${recipe.star_rating} Stars`}
        </p>
        {/* Add more details about the recipe as needed */}
      </div>
    </motion.div>
  );
};

export default DetailsComponent;
