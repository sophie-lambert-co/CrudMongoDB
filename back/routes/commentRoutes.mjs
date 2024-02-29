// TODO: routes/commentRoutes.js

//* Importation du module Router depuis Express pour la création des routes
import { Router } from 'express';

//* Création d'une instance du routeur Express
const router = Router();

//* Importation des fonctions de contrôleur depuis le fichier commentController.mjs
import { createComment, getAllComments, updateComment, deleteComment, getCommentById } from '../controllers/commentController.mjs';

//* Définition des routes pour la gestion des commentaires
//Définit plusieurs routes pour différentes actions liées aux commentaires, en associant chaque route à une fonction de contrôleur spécifique. Par exemple, la route POST /comments est associée à la fonction createComment pour la création d'un commentaire.

//* Route POST pour la création d'un commentaire
router.post('/comments', createComment);

//* Route GET pour récupérer tous les commentaires
router.get('/comments', getAllComments);

//* Route GET pour récupérer un commentaire par son identifiant (ID)
router.get('/comments/:id', getCommentById);

//* Route PUT pour mettre à jour les informations d'un commentaire
router.put('/comments/:id', updateComment);

//* Route DELETE pour supprimer un commentaire par son identifiant (ID)
router.delete('/comments/:id', deleteComment);

//* Exportation du routeur pour pouvoir l'utiliser dans d'autres fichiers
//Exporte le routeur afin qu'il puisse être utilisé dans d'autres fichiers, par exemple, dans le fichier index.mjs où il serait monté sur l'application Express.
export default router;
