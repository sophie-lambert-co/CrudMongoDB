// TODO: routes/ingredientRoutes.js

//* Importation du module Router depuis Express pour la création des routes
import { Router } from 'express';

//* Création d'une instance du routeur Express
const router = Router();

//* Importation des fonctions de contrôleur depuis le fichier ingredientController.mjs
import { createIngredient, getAllIngredients, updateIngredient, deleteIngredient, getIngredientById } from '../controllers/ingredientController.mjs';

//* Définition des routes pour la gestion des ingredients
//Définit plusieurs routes pour différentes actions liées aux ingredients, en associant chaque route à une fonction de contrôleur spécifique. Par exemple, la route POST /ingredients est associée à la fonction createIngredient pour la création d'un ingredient.

//* Route POST pour la création d'un ingredient
router.post('/ingredients', createIngredient);

//* Route GET pour récupérer tous les ingredients
router.get('/ingredients', getAllIngredients);

//* Route GET pour récupérer un ingredient par son identifiant (ID)
router.get('/ingredients/:id', getIngredientById);

//* Route PUT pour mettre à jour les informations d'un ingredient
router.put('/ingredients/:id', updateIngredient);

//* Route DELETE pour supprimer un ingredient par son identifiant (ID)
router.delete('/ingredients/:id', deleteIngredient);

//* Exportation du routeur pour pouvoir l'utiliser dans d'autres fichiers
//Exporte le routeur afin qu'il puisse être utilisé dans d'autres fichiers, par exemple, dans le fichier index.mjs où il serait monté sur l'application Express.
export default router;

//
//Ce fichier ingredientRoutes.js encapsule la logique de routage pour les opérations liées aux ingredients. Il utilise le module Router d'Express pour définir des routes associées à des fonctions de contrôleur spécifiques, permettant ainsi une organisation modulaire et claire du code.
//router.post('/ingredients', createIngredients) indique que vous définissez une route HTTP POST pour le chemin "/ingredients", et lorsqu'une requête POST est effectuée à cette URL, la fonction createIngredients sera exécutée.
//Dans Express, les parenthèses après la méthode de route (comme post, get, etc.) dans la définition d'une route sont utilisées pour spécifier le chemin de l'URL à laquelle la route répondra. Cela est également connu sous le nom de "route path" ou "route pattern".

//La syntaxe générale pour spécifier un chemin est la suivante :
//router.METHOD(path, callback);
//METHOD est la méthode HTTP (par exemple, post, get, put, delete, etc.).
//path est le chemin de l'URL.
//callback est la fonction qui sera exécutée lorsque la route est atteinte.
//Pour la partie path :
//Vous pouvez spécifier un
//*chemin statique*,
// par exemple /ingredients, ce qui signifie que la route répondra à toutes les requêtes HTTP avec le chemin exact "/ingredients".
//router.post('/ingredients', callback);
//*Paramètres dynamiques,
//Vous pouvez également inclure des paramètres dynamiques dans le chemin en les préfixant avec :. Ces paramètres seront disponibles dans la fonction de rappel sous la forme de propriétés de l'objet req.params.
//router.get('/ingredients/:ingredientId', callback);
//Dans cet exemple, :ingredientId est un paramètre dynamique, et la route répondra à des chemins tels que "/ingredients/123" où req.params.ingredientId serait égal à "123".
//*Expressions régulières,
//Vous pouvez également utiliser des expressions régulières pour définir des motifs plus complexes pour le chemin.
//router.get(/^\/ingredients\/(\d+)$/, callback);
//Dans cet exemple, le chemin doit correspondre à l'expression régulière /^\/ingredients\/(\d+)$/, ce qui signifie "/ingredients/" suivi d'un ou plusieurs chiffres.
