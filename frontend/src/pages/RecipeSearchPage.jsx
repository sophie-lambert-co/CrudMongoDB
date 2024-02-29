import { useState } from 'react';
import { Container } from 'react-bootstrap';
import RecipeSearch from '../components/RecipeSearch';
import RecipeService from '../services/RecipeService';

/**
 * Page de recherche de recettes.
 * @returns {JSX.Element} - Élément JSX représentant la page de recherche de recettes.
 */
const RecipeSearchPage = () => {
  // États locaux pour gérer les résultats de recherche et les erreurs
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);

  /**
   * Gère la recherche de recettes.
   * @param {string} searchTerm - Le terme de recherche saisi par l'utilisateur.
   */
  const handleSearch = async (searchTerm) => {
    try {
      // Appel à la fonction de service pour rechercher des recettes
      const response = await RecipeService.searchRecipes(searchTerm);
      setSearchResults(response.results);
    } catch (error) {
      setError(`Erreur lors de la recherche de recettes : ${error.message}`);
    }
  };

  return (
    <Container>
      {/* Utilisation du composant RecipeSearch pour afficher les résultats de recherche */}
      <h1>Page de Recherche de Recettes</h1>
      <RecipeSearch onSearch={handleSearch} searchResults={searchResults} error={error} />
    </Container>
  );
};

export default RecipeSearchPage;
