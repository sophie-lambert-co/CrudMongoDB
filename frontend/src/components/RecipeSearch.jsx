import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, ListGroup } from 'react-bootstrap'; // Import de Form, Button et ListGroup depuis Bootstrap

/**
 * Composant RecipeSearch pour la recherche de recettes.
 * @param {Object} props - Les propriétés du composant.
 * @param {Function} props.onSearch - La fonction de recherche de recettes.
 * @param {Array} props.searchResults - Les résultats de la recherche.
 * @param {string} props.error - L'erreur éventuelle lors de la recherche.
 * @returns {JSX.Element} - Élément JSX représentant le formulaire de recherche de recettes et les résultats.
 */
const RecipeSearch = ({ onSearch, searchResults, error }) => {
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * Gérer le changement dans le champ de recherche.
   * @param {Object} e - L'événement de changement.
   */
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Gérer la soumission du formulaire de recherche.
   * @param {Object} e - L'événement de soumission du formulaire.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div>
      <h3>Rechercher des recettes</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Entrez votre recherche"
        />
        <Button type="submit">Rechercher</Button>
      </Form>
      <ListGroup>
        {searchResults.map((result, index) => (
          <ListGroup.Item key={index}>
            <h3>{result.title}</h3>
            <p>Description: {result.description}</p>
            <h4>Ingrédients:</h4>
            <ul>
              {result.ingredients.map((ingredient, i) => (
                <li key={i}>
                  {ingredient.name}: {ingredient.quantity}
                </li>
              ))}
            </ul>
            <h4>Étapes:</h4>
            <ol>
              {result.steps.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            {result.comments && Object.keys(result.comments).length > 0 && (
              <div>
                <h4>Commentaires:</h4>
                <ul>
                  {Object.values(result.comments).map((comment, i) => (
                    <li key={i}>{comment}</li>
                  ))}
                </ul>
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>

      {error && <p>{error}</p>}
    </div>
  );
};

RecipeSearch.propTypes = {
  /**
   * La fonction de recherche de recettes.
   */
  onSearch: PropTypes.func.isRequired,
  /**
   * Les résultats de la recherche.
   */
  searchResults: PropTypes.array.isRequired,
  /**
   * L'erreur éventuelle lors de la recherche.
   */
  error: PropTypes.string,
};

export default RecipeSearch;
