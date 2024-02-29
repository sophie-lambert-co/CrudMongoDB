// TODO: controllers/typeController.mjs

import Type from "../models/Types.mjs";
import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;


/**
 * Crée un nouveau type.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function createType(req, res) {
  try {
    const newType = new Type(req.body);
    await newType.save();
    res.status(201).json(newType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


/**
 * Récupère tous les types.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function getAllTypes(req, res) {
  try {
    const types = await Type.find();
    res.json(types);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


/**
 * Récupère un type par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function getTypeById(req, res) {
  try {
    const typeId = req.params.id;

    if (!ObjectId.isValid(typeId)) {
      return res.status(400).json({ message: 'ID du type non valide' });
    }

    const type = await Type.findById(typeId);

    if (!type) {
      return res.status(404).json({ message: 'Type non trouvé' });
    }

    res.json(type);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


/**
 * Met à jour un type par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function updateType(req, res) {
  try {
    const typeId = req.params.id;

    if (!ObjectId.isValid(typeId)) {
      return res.status(400).json({ message: 'ID du type non valide' });
    }

    const updatedType = await Type.findByIdAndUpdate(typeId, req.body, {
      new: true,
    });

    if (!updatedType) {
      return res.status(404).json({ message: 'Type non trouvé' });
    }

    res.json(updatedType);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


/**
 * Supprime un type par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function deleteType(req, res) {
  try {
    const type = await Type.findByIdAndDelete(req.params.id);

    if (!type) {
      return res.status(404).json({ message: 'Type non trouvé' });
    }

    res.json(type);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
