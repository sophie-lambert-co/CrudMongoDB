// Import de la bibliothèque axios pour effectuer des requêtes HTTP
import axios from "axios";

/**
 * Service RecipeService pour gérer les requêtes liées aux recettes.
 */
const RecipeService = {
  /**
   * Fonction pour récupérer toutes les recettes depuis l'API.
   * @returns {Array} - La liste des recettes.
   */
  fetchRecipes: async () => {
    try {
      const response = await axios.get("http://localhost:3000/recettes/recipes");
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes:", error.message);
      return [];
    }
  },

  /**
   * Fonction pour rechercher des recettes depuis l'API.
   * @param {string} searchTerm - Le terme de recherche.
   * @returns {Array} - La liste des recettes correspondant au terme de recherche.
   * @throws {Error} - Une erreur si la recherche échoue.
   */
  searchRecipes: async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/recettes/recipes/search?term=${searchTerm}`
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la recherche des recettes:", error.message);
      throw error;
    }
  },

  /**
   * Fonction pour récupérer une recette par son ID depuis l'API.
   * @param {string} id - L'ID de la recette à récupérer.
   * @returns {Object} - Les détails de la recette.
   * @throws {Error} - Une erreur si la récupération échoue.
   */
  getRecipeById: async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/recettes/recipes/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de la recette avec l'ID ${id}:`,
        error.message
      );
      throw error;
    }
  },

  /**
   * Fonction pour ajouter une recette à l'API.
   * @param {Object} newRecipe - Les détails de la nouvelle recette à ajouter.
   * @returns {Object} - Les détails de la recette ajoutée.
   * @throws {Error} - Une erreur si l'ajout échoue.
   */
  addRecipe: async (newRecipe) => {
    try {
      const response = await axios.post('http://localhost:3000/recettes/recipes', newRecipe, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Erreur lors de l'ajout de la recette:`, error.message);
      throw error;
    }
  },

  // Fonction pour récupérer tous les ingrédients depuis l'API
  getIngredients: async () => {
    const response = await axios.get("http://localhost:3000/recettes/ingredients");
    return response.data;
  },

  // Fonction pour récupérer toutes les catégories depuis l'API
  getCategories: async () => {
    const response = await axios.get("http://localhost:3000/recettes/categories");
    return response.data;
  },

  // Fonction pour ajouter un ingrédient à l'API
  addIngredient: async (newIngredient) => {
    const response = await axios.post('http://localhost:3000/recettes/ingredients', newIngredient);
    return response.data;
  },

  // Fonction pour ajouter une catégorie à l'API
  addCategorie: async (newCategory) => {
    const response = await axios.post('http://localhost:3000/recettes/categories', newCategory);
    return response.data;
  },

  // Fonction pour récupérer tous les types d'ingrédients depuis l'API
  getIngredientTypes: async () => {
    const response = await axios.get("http://localhost:3000/recettes/types");
    return response.data;
  },

  // Fonction pour ajouter un nouveau type d'ingrédient à l'API
  addIngredientType: async (newType) => {
    const response = await axios.post('http://localhost:3000/recettes/types', newType);
    return response.data;
  },
};

export default RecipeService;
