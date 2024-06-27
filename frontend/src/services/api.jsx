import axios from "axios";

const BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let cachedRecipes = {};
let previouslySearched = false;

export const getRecipes = async (searchString) => {
  try {
    const response = await api.get("/api/scrape", {
      params: { searchString },
    });
    cachedRecipes = response.data;
    previouslySearched = true;
    return response.data;
  } catch (error) {
    throw new Error("Error fetching recipes");
  }
};

export const getCachedRecipes = () => {
  return cachedRecipes;
};

export const hasPreviouslySearched = () => {
  return previouslySearched;
};

export default api;
