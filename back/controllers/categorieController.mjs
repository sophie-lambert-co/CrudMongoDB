// TODO: controllers/categoryController.mjs

// Importation du modèle Category depuis le fichier Categories.mjs
import Category from "../models/Categories.mjs";

// Importation du module mongoose pour la gestion de la base de données MongoDB
import mongoose from "mongoose";

// Extraction de la fonction ObjectId du module mongoose.Types
const { ObjectId } = mongoose.Types;


/**
 * Crée une nouvelle catégorie.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function createCategory(req, res) {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.status(201).json(newCategory); // 201 Created
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Récupère toutes les catégories.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Récupère une catégorie par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function getCategoryById(req, res) {
  try {
    const categoryId = req.params.id;

    if (!ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'ID de la catégorie non valide' });
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Met à jour une catégorie par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function updateCategory(req, res) {
  try {
    const categoryId = req.params.id;

    if (!ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'ID de la catégorie non valide' });
    }

    const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, {
      new: true,
    });

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }

    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Supprime une catégorie par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function deleteCategory(req, res) {
  try {
    const comment = await Category.findByIdAndDelete(req.params.id);

    if (!Category) {
      return res.status(404).json({ message: 'Catégorie non trouvée' });
    }

    res.json(Category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
