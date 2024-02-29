// TODO :recipeController.mjs

//* Importation du modèle Recipe depuis le fichier Recipe.mjs
import Recipe from "../models/Recipes.mjs";
//* Importation du module mongoose pour l'utilisation de Types
import mongoose from "mongoose";
//*méthode de déstructuration dans JavaScript qui permet d'extraire la classe ObjectId du module mongoose.Types et de l'assigner à la variable ObjectId.
// mongoose.Types est un objet qui contient plusieurs sous-objets et méthodes, dont ObjectId. ObjectId est utilisé pour représenter les identifiants uniques dans MongoDB.
// Dans ce contexte, les accolades sont utilisées pour extraire spécifiquement la classe ObjectId de mongoose.Types. Cela permet d'utiliser directement ObjectId plutôt que mongoose.Types.ObjectId dans le code.
const { ObjectId } = mongoose.Types;



//* Fonction asynchrone pour créer une nouvelle recette
/**
 * Crée une nouvelle recette.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function createRecipe(req, res) {
  try {
    //* Crée une nouvelle recette avec les données reçues dans la requête
    const newRecipe = new Recipe(req.body);
    //* Sauvegarde le nouvel recette dans la base de données
    await newRecipe.save();
    //* Répond avec la nouvelle recette créé en tant que réponse à la requête
    res.status(201).json(newRecipe); // 201 Created
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}


//* Fonction asynchrone pour récupérer tous les recettes
/**
 * Récupère tous les recettes.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function getRecipeByTerm(req, res) {
  try {
    // Récupère le terme de recherche depuis la requête
    const searchTerm = req.query.term;

    // Ajouter un journal pour voir la valeur de searchTerm
    console.log('Search Term:', searchTerm);
 
    // Utilise le modèle Recipe pour effectuer la recherche dans la base de données
    const searchResults = await Recipe.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { ingredients: { $elemMatch: { name: { $regex: searchTerm, $options: 'i' } } } },
      ],
    });

    // Ajouter un journal pour voir les résultats de la recherche
    console.log('Search Results:', searchResults);


    // Répond avec les résultats de la recherche en tant que réponse JSON
    res.json({ results: searchResults });
  } catch (error) {
    // En cas d'erreur, ajouter un journal pour voir l'erreur
    console.error('Erreur lors de la recherche de recettes:', error.message);

    // Répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: 'Erreur lors de la recherche de recettes' });
  }
}

console.log ( 'jussque là tout va bien ')

//* Fonction asynchrone pour récupérer tous les recettes
export async function getAllRecipes(req, res) {
  try {
    //* Récupère tous les recettes depuis la base de données
    const recipes = await Recipe.find();
    //* Répond avec la liste de toutes les recettes
    res.json(recipes);
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}


//* Fonction asynchrone pour récupérer une recette par son ID
/**
 * Récupère une recette par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function getRecipeById(req, res) {
  try {
    //* Récupère l'ID de la recette depuis les paramètres de la requête
    // Dans Express (le framework web utilisé avec Node.js), req.params contient les paramètres de la requête URL. Si l'URL contient quelque chose comme /users/123, alors req.params.id serait égal à 123. Cela permet de récupérer les valeurs des paramètres dynamiques dans l'URL.
    const recipeId = req.params.id;
    

    //* Vérifiez si l'ID est un ObjectId valide
    if (!ObjectId.isValid(recipeId)) {
      //
      // isValid est une méthode de la classe ObjectId qui permet de vérifier si une chaîne donnée est un identifiant ObjectId valide. Cela aide à éviter les erreurs lorsqu'on travaille avec des identifiants dans MongoDB.    
      return res.status(400).json({ message: 'ID de la  recette non valide' });
    }
   
    //* Récupère la recette par son ID depuis la base de données
    const recipe = await Recipe.findById(recipeId);

    //* Vérifie si la recette a été trouvé
    if (!recipe) {
      return res.status(404).json({ message:'recette non trouvé'});
    
    }
    
    //* Répond avec les données de la recette
    res.json(recipe);
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}


//* Fonction asynchrone pour mettre à jour une recette par son ID
/**
 * Met à jour une recette par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function updateRecipe(req, res) {
  try {
    //* Récupère l'ID de la recette depuis les paramètres de la requête
    const recipeId = req.params.id;

    //* Vérifiez si l'ID est un ObjectId valide
    if (!ObjectId.isValid(recipeId)) {
      return res.status(400).json({ message: "ID de la recette non valide" });
    }

    //* Met à jour la recette par son ID avec les données de la requête
    // findByIdAndUpdate est une méthode Mongoose qui recherche un document par son ID (userId dans ce cas), met à jour ses données avec celles fournies dans req.body, puis renvoie le document mis à jour.
    // { new: true } :Cet objet en option spécifie que la méthode doit renvoyer le document mis à jour plutôt que le document d'origine. C'est utile pour obtenir la version la plus récente après la mise à jour.
    // await est utilisé pour attendre que l'opération de mise à jour soit terminée avant de passer à la ligne suivante. updatedUser contiendra le document recette mis à jour après l'opération.
    // En résumé, cette ligne de code met à jour un recette dans la base de données en utilisant son ID, les données fournies dans la requête (req.body), et renvoie la version la plus récente du document mis à jour.
    const updatedRecipe = await Recipe.findByIdAndUpdate(recipeId, req.body, {
      new: true,
    });

    //* Vérifie si la recette a été trouvé
    if (!updatedRecipe) {
      return res.status(404).json({ message:'recette non trouvé' });
    }
//* Répond avec les données de la recette mis à jour
    res.json(updatedRecipe);
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}


//* Fonction asynchrone pour supprimer une recette par son ID
/**
 * Supprime une recette par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function deleteRecipe(req, res) {
  try {
    //* Supprime la recette par son ID depuis la base de données
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    //* Vérifie si la recette a été trouvé
    if (!recipe) {
      return res.status(404).json({ message:'recette non trouvé' });
    }
    //* Répond avec les données de la recette supprimé
    res.json(recipe);
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}
