// TODO: routes/typeRoutes.js

import { Router } from 'express';
const router = Router();

import { createType, getAllTypes, updateType, deleteType, getTypeById } from '../controllers/typeController.mjs';

//* Route POST pour la création d'un type
router.post('/types', createType);

//* Route GET pour récupérer tous les types
router.get('/types', getAllTypes);

//* Route GET pour récupérer un type par son identifiant (ID)
router.get('/types/:id', getTypeById);

//* Route PUT pour mettre à jour les informations d'un type
router.put('/types/:id', updateType);

//* Route DELETE pour supprimer un type par son identifiant (ID)
router.delete('/types/:id', deleteType);

export default router;
