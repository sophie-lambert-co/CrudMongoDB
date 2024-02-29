// routes/imageRoutes.js

// routes/imageRoutes.js

// Importation du module Router depuis Express
import { Router } from 'express';

// Importation des fonctions de contrôleur depuis le fichier imageController.mjs
import { createImage, getAllImages, deleteImage } from '../controllers/imageController.mjs';

// Création du routeur Express
const router = Router();

// Définition des routes pour la gestion des images
router.post('/images', createImage);
router.get('/images', getAllImages);
router.delete('/images/:id', deleteImage); // Ajout de la route DELETE pour la suppression

// Exportation du routeur
export default router;
