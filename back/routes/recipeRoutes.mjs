// TODO: routes/recipeRoutes.js

//* Importation du module Router depuis Express pour la création des routes
import { Router } from 'express';

//* Création d'une instance du routeur Express
const router = Router();

//* Importation des fonctions de contrôleur depuis le fichier recipeController.mjs
import { createRecipe, getAllRecipes, updateRecipe, deleteRecipe, getRecipeById, getRecipeByTerm } from '../controllers/recipeController.mjs';

//* Définition des routes pour la gestion des recettes
//Définit plusieurs routes pour différentes actions liées aux recettes, en associant chaque route à une fonction de contrôleur spécifique. Par exemple, la route POST /recipes est associée à la fonction createUser pour la création d'un recette.


//* Route POST pour la création d'un recette
router.post('/recipes', createRecipe);

//* Route GET pour recuperer une recette par mot clef
router.get('/recipes/search', getRecipeByTerm);


//* Route GET pour récupérer tous les recettes
router.get('/recipes', getAllRecipes);


//* Route GET pour récupérer un recette par son identifiant (ID)
router.get('/recipes/:id', getRecipeById);


//* Route PUT pour mettre à jour les informations d'un recette
router.put('/recipes/:id', updateRecipe);

//* Route DELETE pour supprimer un recette par son identifiant (ID)
router.delete('/recipes/:id', deleteRecipe);




//* Exportation du routeur pour pouvoir l'utiliser dans d'autres fichiers
//Exporte le routeur afin qu'il puisse être utilisé dans d'autres fichiers, par exemple, dans le fichier index.mjs où il serait monté sur l'application Express.
export default router;

//
//Ce fichier recipeRoutes.js encapsule la logique de routage pour les opérations liées aux recettes. Il utilise le module Router d'Express pour définir des routes associées à des fonctions de contrôleur spécifiques, permettant ainsi une organisation modulaire et claire du code.
//router.post('/recipes', createRecipes) indique que vous définissez une route HTTP POST pour le chemin "/recipes", et lorsqu'une requête POST est effectuée à cette URL, la fonction createRecipes sera exécutée.
//Dans Express, les parenthèses après la méthode de route (comme post, get, etc.) dans la définition d'une route sont utilisées pour spécifier le chemin de l'URL à laquelle la route répondra. Cela est également connu sous le nom de "route path" ou "route pattern".

//La syntaxe générale pour spécifier un chemin est la suivante :
//router.METHOD(path, callback);
//METHOD est la méthode HTTP (par exemple, post, get, put, delete, etc.).
//path est le chemin de l'URL.
//callback est la fonction qui sera exécutée lorsque la route est atteinte.
//Pour la partie path :
//Vous pouvez spécifier un
//*chemin statique*,
// par exemple /recipes, ce qui signifie que la route répondra à toutes les requêtes HTTP avec le chemin exact "/recipes".
//router.post('/recipes', callback);
//*Paramètres dynamiques,
//Vous pouvez également inclure des paramètres dynamiques dans le chemin en les préfixant avec :. Ces paramètres seront disponibles dans la fonction de rappel sous la forme de propriétés de l'objet req.params.
//router.get('/recipes/:recipeId', callback);
//Dans cet exemple, :recipeId est un paramètre dynamique, et la route répondra à des chemins tels que "/recipes/123" où req.params.recipeId serait égal à "123".
//*Expressions régulières,
//Vous pouvez également utiliser des expressions régulières pour définir des motifs plus complexes pour le chemin.
//router.get(/^\/recipes\/(\d+)$/, callback);
//Dans cet exemple, le chemin doit correspondre à l'expression régulière /^\/recipes\/(\d+)$/, ce qui signifie "/recipes/" suivi d'un ou plusieurs chiffres.