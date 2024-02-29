// TODO: routes/userRoutes.js

//* Importation du module Router depuis Express pour la création des routes
import { Router } from 'express';

//* Création d'une instance du routeur Express
const router = Router();

//* Importation des fonctions de contrôleur depuis le fichier userController.mjs
import { createUser, getAllUsers, updateUser, deleteUser, getUserById } from '../controllers/userController.mjs';

//* Définition des routes pour la gestion des utilisateurs
//Définit plusieurs routes pour différentes actions liées aux utilisateurs, en associant chaque route à une fonction de contrôleur spécifique. Par exemple, la route POST /users est associée à la fonction createUser pour la création d'un utilisateur.




//* Route POST pour la création d'un utilisateur
router.post('/users', createUser);

//* Route GET pour récupérer tous les utilisateurs
router.get('/users', getAllUsers);

//* Route GET pour récupérer un utilisateur par son identifiant (ID)
router.get('/users/:id', getUserById);

//* Route PUT pour mettre à jour les informations d'un utilisateur
router.put('/users/:id', updateUser);

//* Route DELETE pour supprimer un utilisateur par son identifiant (ID)
router.delete('/users/:id', deleteUser);

//* Exportation du routeur pour pouvoir l'utiliser dans d'autres fichiers
//Exporte le routeur afin qu'il puisse être utilisé dans d'autres fichiers, par exemple, dans le fichier index.mjs où il serait monté sur l'application Express.
export default router;

//
//Ce fichier userRoutes.js encapsule la logique de routage pour les opérations liées aux utilisateurs. Il utilise le module Router d'Express pour définir des routes associées à des fonctions de contrôleur spécifiques, permettant ainsi une organisation modulaire et claire du code.
//router.post('/users', createUsers) indique que vous définissez une route HTTP POST pour le chemin "/users", et lorsqu'une requête POST est effectuée à cette URL, la fonction createUsers sera exécutée.
//Dans Express, les parenthèses après la méthode de route (comme post, get, etc.) dans la définition d'une route sont utilisées pour spécifier le chemin de l'URL à laquelle la route répondra. Cela est également connu sous le nom de "route path" ou "route pattern".

//La syntaxe générale pour spécifier un chemin est la suivante :
//router.METHOD(path, callback);
//METHOD est la méthode HTTP (par exemple, post, get, put, delete, etc.).
//path est le chemin de l'URL.
//callback est la fonction qui sera exécutée lorsque la route est atteinte.
//Pour la partie path :
//Vous pouvez spécifier un
//*chemin statique*,
// par exemple /users, ce qui signifie que la route répondra à toutes les requêtes HTTP avec le chemin exact "/users".
//router.post('/users', callback);
//*Paramètres dynamiques,
//Vous pouvez également inclure des paramètres dynamiques dans le chemin en les préfixant avec :. Ces paramètres seront disponibles dans la fonction de rappel sous la forme de propriétés de l'objet req.params.
//router.get('/users/:userId', callback);
//Dans cet exemple, :userId est un paramètre dynamique, et la route répondra à des chemins tels que "/users/123" où req.params.userId serait égal à "123".
//*Expressions régulières,
//Vous pouvez également utiliser des expressions régulières pour définir des motifs plus complexes pour le chemin.
//router.get(/^\/users\/(\d+)$/, callback);
//Dans cet exemple, le chemin doit correspondre à l'expression régulière /^\/users\/(\d+)$/, ce qui signifie "/users/" suivi d'un ou plusieurs chiffres.