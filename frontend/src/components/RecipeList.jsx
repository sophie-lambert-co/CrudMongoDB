import PropTypes from 'prop-types';
import { ListGroup, Button } from 'react-bootstrap'; // Import de ListGroup et Button depuis Bootstrap

/**
 * Composant RecipeList pour afficher une liste de recettes.
 * @param {Object} props - Les propriétés du composant.
 * @param {Array} props.recipes - La liste des recettes à afficher.
 * @param {Function} props.onSelectRecipe - La fonction de gestion de la sélection d'une recette.
 * @returns {JSX.Element} - Élément JSX représentant la liste des recettes.
 */
const RecipeList = ({ recipes, onSelectRecipe }) => {
  /**
   * Gère la sélection d'une recette.
   * @param {Object} recipe - La recette sélectionnée.
   */
  const handleSelectRecipe = (recipe) => {
    onSelectRecipe(recipe);
  };

  return (
    <div>
      <h3>Liste des recettes</h3>
      <ListGroup>
        {recipes.map((recipe) => (
          <ListGroup.Item key={recipe._id}>
            <div>
              <p>{recipe.title}</p>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    <p>{ingredient.name} - {ingredient.quantity}</p>
                  </li>
                ))}
              </ul>
              <Button onClick={() => handleSelectRecipe(recipe)}>Voir les détails</Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      ingredients: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          quantity: PropTypes.string.isRequired,
        })
      ).isRequired,
    })
  ).isRequired,
  onSelectRecipe: PropTypes.func.isRequired,
};

export default RecipeList;
