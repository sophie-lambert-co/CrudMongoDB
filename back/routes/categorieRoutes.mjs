// TODO: routes/categoryRoutes.js

import { Router } from 'express';
const router = Router();

import { createCategory, getAllCategories, updateCategory, deleteCategory, getCategoryById } from '../controllers/categorieController.mjs';

//* Route POST pour la création d'une catégorie
router.post('/categories', createCategory);

//* Route GET pour récupérer toutes les catégories
router.get('/categories', getAllCategories);

//* Route GET pour récupérer une catégorie par son identifiant (ID)
router.get('/categories/:id', getCategoryById);

//* Route PUT pour mettre à jour les informations d'une catégorie
router.put('/categories/:id', updateCategory);

//* Route DELETE pour supprimer une catégorie par son identifiant (ID)
router.delete('/categories/:id', deleteCategory);

export default router;
