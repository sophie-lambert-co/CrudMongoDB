import { useState } from "react";
import PropTypes from "prop-types";
import RecipeService from "../services/RecipeService";
import { Form, Button } from "react-bootstrap"; 
import 'bootstrap/dist/css/bootstrap.min.css';
// Importation des composants Form et Button de Bootstrap

/**
 * Composant RecipeForm pour la création d'une nouvelle recette.
 * @param {Object} props - Les propriétés du composant.
 * @param {Function} props.onSubmit - La fonction de soumission du formulaire.
 * @param {Array} props.ingredients - La liste des ingrédients disponibles.
 * @param {Array} props.categories - La liste des catégories de recettes disponibles.
 * @returns {JSX.Element} - Élément JSX représentant le formulaire de création de recette.
 */
const RecipeForm = ({ onSubmit, ingredients, categories }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    ingredients: [],
    steps: [],
    prepTime: 0,
    images: [],
    category: "",
  });

  const [newIngredientName, setNewIngredientName] = useState("");
  const [newIngredientQuantity, setNewIngredientQuantity] = useState("");
  const [addingNewIngredient, setAddingNewIngredient] = useState("");


  /**
   * Gérer le changement des champs du formulaire.
   * @param {Object} e - L'événement de changement.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "steps") {
      setFormData({ ...formData, [name]: value.split(", ") });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  /**
   * Gérer la sélection d'un ingrédient.
   * @param {number} index - L'index de l'ingrédient dans la liste.
   * @param {string} value - L'identifiant de l'ingrédient sélectionné.
   */
  const handleIngredientChange = (index, value) => {
    const selectedIngredient = ingredients.find((ing) => ing._id === value);
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = { id: value, name: selectedIngredient.name, quantity: newIngredients[index]?.quantity || "" };
    setFormData({ ...formData, ingredients: newIngredients });
  };

  /**
   * Ajouter un ingrédient.
   */
  const handleAddIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { id: "", quantity: "" }],
    });
  };

  /**
   * Supprimer un ingrédient.
   * @param {number} index - L'index de l'ingrédient dans la liste.
   */
  const handleRemoveIngredient = (index) => {
    const newIngredients = [...formData.ingredients];
    newIngredients.splice(index, 1);
    setFormData({ ...formData, ingredients: newIngredients });
  };

  /**
   * Soumettre le formulaire.
   * @param {Object} e - L'événement de soumission du formulaire.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: "",
      description: "",
      ingredients: [],
      steps: [],
      prepTime: 0,
      images: [],
      category: "",
    });
  };

  /**
   * Soumettre un nouvel ingrédient.
   * @param {Object} e - L'événement de soumission du formulaire.
   */
  const handleNewIngredientSubmit = async (e) => {
    e.preventDefault();
    const newIngredientId = await RecipeService.addIngredient({
      name: newIngredientName,
      quantity: newIngredientQuantity,
    });
    const newIngredient = { id: newIngredientId, name: newIngredientName, quantity: newIngredientQuantity };
    const updatedIngredients = [...formData.ingredients, newIngredient];
    setFormData({ ...formData, ingredients: updatedIngredients });
    setNewIngredientName("");
    setNewIngredientQuantity("");
  };

  return (
    <div>
      <h3>Ajouter une recette</h3>
      <Form onSubmit={handleSubmit}>
        {/* Champ de titre */}
        <Form.Group controlId="title">
          <Form.Label>Nom de la recette:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        {/* Champ de description */}
        <Form.Group controlId="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        {/* Champ d'étapes */}
        <Form.Group controlId="steps">
          <Form.Label>Étapes (séparées par des virgules):</Form.Label>
          <Form.Control
            type="text"
            name="steps"
            value={formData.steps.join(", ")}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        {/* Champ de temps de préparation */}
        <Form.Group controlId="prepTime">
          <Form.Label>Temps de préparation (en minutes):</Form.Label>
          <Form.Control
            type="number"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleInputChange}
            required
          />
        </Form.Group>
        {/* Champ d'images */}
        <Form.Group className="mb-3" controlId="recipeImages">
          <Form.Label>Images :</Form.Label>
          <Form.Control
            type="text"
            name="images"
            value={formData.images.join(", ")}
            onChange={handleInputChange}
            placeholder="Entrez les liens des images (séparés par des virgules)"
          />
        </Form.Group>
        {/* Champ de catégorie */}
        <Form.Group className="mb-3" controlId="recipeCategory">
          <Form.Label>Catégorie :</Form.Label>
          <Form.Select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        {/* Bouton de soumission du formulaire */}
        <Button variant="primary" type="submit">
          Valider cette recette
        </Button>
      </Form>
      {/* Affichage des ingrédients */}
      {formData.ingredients.map((ingredient, index) => (
        <div key={index} className="mb-3">
          {/* Sélection d'ingrédient */}
          <Form.Select
            value={ingredient.id}
            onChange={(e) => handleIngredientChange(index, e.target.value)}
          >
            <option value="">Sélectionnez un ingrédient</option>
            {ingredients.map((ing) => (
              <option key={ing._id} value={ing._id}>
                {ing.name}
              </option>
            ))}
          </Form.Select>
          {/* Champ de quantité */}
          <Form.Control
            type="text"
            placeholder="Quantité"
            value={ingredient.quantity}
            onChange={(e) => {
              const newIngredients = [...formData.ingredients];
              newIngredients[index].quantity = e.target.value;
              setFormData({ ...formData, ingredients: newIngredients });
            }}
          />
          {/* Bouton de suppression d'ingrédient */}
          {index > 0 && (
            <Button
              variant="secondary"
              type="button"
              onClick={() => handleRemoveIngredient(index)}
              className="mt-3"
            >
              Supprimer
            </Button>
          )}
        </div>
      ))}
      {/* Bouton d'ajout d'ingrédient */}
      <Button variant="primary" onClick={handleAddIngredient} className="mb-3">
        Ajouter un ingrédient
      </Button>
      {/* Bouton d'ajout d'un nouvel ingrédient */}
      {!addingNewIngredient && (
        <Button variant="primary" onClick={() => setAddingNewIngredient(true)} className="mb-3">
          Ajouter un nouvel ingrédient
        </Button>
      )}
      {/* Formulaire d'ajout d'un nouvel ingrédient */}
      {addingNewIngredient && (
        <Form onSubmit={handleNewIngredientSubmit}>
          <Form.Control
            type="text"
            placeholder="Nom de l'ingrédient"
            value={newIngredientName}
            onChange={(e) => setNewIngredientName(e.target.value)}
            className="mb-3"
          />
          <Form.Control
            type="text"
            placeholder="Quantité"
            value={newIngredientQuantity}
            onChange={(e) => setNewIngredientQuantity(e.target.value)}
            className="mb-3"
          />
          <Button variant="primary" type="submit" className="mb-3">
            Ajouter
          </Button>
          <Button variant="secondary" onClick={() => setAddingNewIngredient(false)} className="mb-3">
            Annuler
          </Button>
        </Form>
      )}
      {/* Aperçu de la recette */}
      <div>
        <h3>Aperçu de la recette en cours de création</h3>
        <p>Titre: {formData.title}</p>
        <p>Description: {formData.description}</p>
        <p>Ingrédients :</p>
        <ul>
          {formData.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name}: {ingredient.quantity}
            </li>
          ))}
        </ul>
        <p>Étapes: {formData.steps}</p>
        <p>Temps de préparation: {formData.prepTime} minutes</p>
        <p>Images: {formData.images}</p>
        <p>Catégorie: {formData.category}</p>
      </div>
    </div>
  );
};

RecipeForm.propTypes = {
  /**
   * La fonction de soumission du formulaire.
   */
  onSubmit: PropTypes.func.isRequired,
  /**
   * La liste des ingrédients disponibles.
   */
  ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * La liste des catégories de recettes disponibles.
   */
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeForm;
