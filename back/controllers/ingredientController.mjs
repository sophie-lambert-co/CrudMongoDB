// TODO :ingredientController.mjs

//* Importation du modèle Ingredient depuis le fichier Ingredients.mjs
import Ingredient from "../models/Ingredients.mjs";
//* Importation du module mongoose pour l'utilisation de Types
import mongoose from "mongoose";
//*méthode de déstructuration dans JavaScript qui permet d'extraire la classe ObjectId du module mongoose.Types et de l'assigner à la variable ObjectId.
// mongoose.Types est un objet qui contient plusieurs sous-objets et méthodes, dont ObjectId. ObjectId est utilisé pour représenter les identifiants uniques dans MongoDB.
// Dans ce contexte, les accolades sont utilisées pour extraire spécifiquement la classe ObjectId de mongoose.Types. Cela permet d'utiliser directement ObjectId plutôt que mongoose.Types.ObjectId dans le code.
const { ObjectId } = mongoose.Types;

/**
 * Crée un nouvel ingrédient.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function createIngredient(req, res) {
  try {
    //* Crée un nouvel Ingredient avec les données reçues dans la requête
    const newIngredient = new Ingredient(req.body);
    // Sauvegarde le nouvel Ingredient dans la base de données
    await newIngredient.save();
    //* Répond avec le nouvel Ingredient créé en tant que réponse à la requête
    res.status(201).json(newIngredient); // 201 Created
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}


/**
 * Récupère tous les ingrédients.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function getAllIngredients(req, res) {
  try {
    //* Récupère tous les Ingredients depuis la base de données
    const ingredients = await Ingredient.find();
    //* Répond avec la liste de tous les Ingredients
    res.json(ingredients);
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}


/**
 * Récupère un ingrédient par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function getIngredientById(req, res) {
  try {
    //* Récupère l'ID de l'Ingredient depuis les paramètres de la requête
    // Dans Express (le framework web utilisé avec Node.js), req.params contient les paramètres de la requête URL. Si l'URL contient quelque chose comme /ingredients/123, alors req.params.id serait égal à 123. Cela permet de récupérer les valeurs des paramètres dynamiques dans l'URL.
    const ingredientId = req.params.id;
    

    //* Vérifiez si l'ID est un ObjectId valide
    if (!ObjectId.isValid(ingredientId)) {
      //
      // isValid est une méthode de la classe ObjectId qui permet de vérifier si une chaîne donnée est un identifiant ObjectId valide. Cela aide à éviter les erreurs lorsqu'on travaille avec des identifiants dans MongoDB.    
      return res.status(400).json({ message: 'ID d\'ingredient non valide' });
    }
   
    //* Récupère l'Ingredient par son ID depuis la base de données
    const ingredient = await Ingredient.findById(ingredientId);

    //* Vérifie si l'Ingredient a été trouvé
    if (!ingredient) {
      return res.status(404).json({ message: 'Ingredient non trouvé' });
    }

    //* Répond avec les données de l'Ingredient
    res.json(ingredient);
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}


/**
 * Met à jour un ingrédient par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function updateIngredient(req, res) {
  try {
    //* Récupère l'ID de l'Ingredient depuis les paramètres de la requête
    const ingredientId = req.params.id;

    //* Vérifiez si l'ID est un ObjectId valide
    if (!ObjectId.isValid(ingredientId)) {
      return res.status(400).json({ message: "ID d'ingredient non valide" });
    }

    //* Met à jour l'Ingredient par son ID avec les données de la requête
    // findByIdAndUpdate est une méthode Mongoose qui recherche un document par son ID (ingredientId dans ce cas), met à jour ses données avec celles fournies dans req.body, puis renvoie le document mis à jour.
    // { new: true } :Cet objet en option spécifie que la méthode doit renvoyer le document mis à jour plutôt que le document d'origine. C'est utile pour obtenir la version la plus récente après la mise à jour.
    // await est utilisé pour attendre que l'opération de mise à jour soit terminée avant de passer à la ligne suivante. updatedIngredient contiendra le document Ingredient mis à jour après l'opération.
    // En résumé, cette ligne de code met à jour un Ingredient dans la base de données en utilisant son ID, les données fournies dans la requête (req.body), et renvoie la version la plus récente du document mis à jour.
    const updatedIngredient = await Ingredient.findByIdAndUpdate(ingredientId, req.body, {
      new: true,
    });

    //* Vérifie si l'Ingredient a été trouvé
    if (!updatedIngredient) {
      return res.status(404).json({ message: "Ingredient non trouvé" });
    }
//* Répond avec les données de l'Ingredient mis à jour
    res.json(updatedIngredient);
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}

/**
 * Supprime un ingrédient par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function deleteIngredient(req, res) {
  try {
    //* Supprime l'Ingredient par son ID depuis la base de données
    const comment = await Ingredient.findByIdAndDelete(req.params.id);
    //* Vérifie si l'Ingredient a été trouvé
    if (!Ingredient) {
      return res.status(404).json({ message: "Ingredient non trouvé" });
    }
    //* Répond avec les données de l'Ingredient supprimé
    res.json(Ingredient);
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}
