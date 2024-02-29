import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import RecipeForm from '../components/RecipeForm';
import RecipeService from '../services/RecipeService';
import PropTypes from 'prop-types';

/**
 * Page d'ajout de recette.
 * @param {Object} props - Les propriétés du composant.
 * @param {Function} props.onAddRecipe - La fonction de gestion de l'ajout d'une recette.
 * @returns {JSX.Element} - Élément JSX représentant la page d'ajout de recette.
 */
const RecipeAddPage = ({ onAddRecipe }) => {
  // États locaux pour gérer les ingrédients et les catégories
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);

  // Effet pour charger les ingrédients et les catégories au chargement de la page
  useEffect(() => {
    const fetchIngredientsAndCategories = async () => {
      const fetchedIngredients = await RecipeService.getIngredients();
      const fetchedCategories = await RecipeService.getCategories();
      setIngredients(fetchedIngredients);
      setCategories(fetchedCategories);
    };

    fetchIngredientsAndCategories();
  }, []);

  /**
   * Gère l'ajout d'une recette.
   * @param {Object} newRecipe - La nouvelle recette à ajouter.
   */
  const handleAddRecipe = async (newRecipe) => {
    try {
      // Appel à la fonction de service pour ajouter une recette
      const data = await RecipeService.addRecipe(newRecipe);
      console.log('Nouvelle recette ajoutée :', data);
      // Appel de la fonction de gestion de l'ajout de recette fournie par les propriétés
      onAddRecipe(data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la recette :", error.message);
    }
  };

  return (
    <Container>
      <h1>Page Ajout de Recette</h1>
      {/* Formulaire d'ajout de recette */}
      <RecipeForm onSubmit={handleAddRecipe} ingredients={ingredients} categories={categories} />
    </Container>
  );
};

RecipeAddPage.propTypes = {
  onAddRecipe: PropTypes.func.isRequired,
};

export default RecipeAddPage;
