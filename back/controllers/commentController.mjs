// TODO: controllers/commentController.mjs

// Importation du modèle Comment depuis le fichier Comments.mjs
import Comment from "../models/Comments.mjs";

// Importation du module mongoose pour la gestion de la base de données MongoDB
import mongoose from "mongoose";

// Extraction de la fonction ObjectId du module mongoose.Types
const { ObjectId } = mongoose.Types;

/**
 * Crée un nouveau commentaire.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function createComment(req, res) {
  try {
    const { user, recipe, text, rating } = req.body;
    const newComment = new Comment({ user, recipe, text, rating });
    await newComment.save();
    res.status(201).json(newComment); // 201 Created
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Récupère tous les commentaires.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function getAllComments(req, res) {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Récupère un commentaire par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function getCommentById(req, res) {
  try {
    const commentId = req.params.id;

    if (!ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: 'ID de commentaire non valide' });
    }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Commentaire non trouvé' });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Met à jour un commentaire par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function updateComment(req, res) {
  try {
    const commentId = req.params.id;

    if (!ObjectId.isValid(commentId)) {
      return res.status(400).json({ message: "ID de commentaire non valide" });
    }

    const updatedComment = await Comment.findByIdAndUpdate(commentId, req.body, {
      new: true,
    });

    if (!updatedComment) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Supprime un commentaire par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function deleteComment(req, res) {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Commentaire non trouvé" });
    }

    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
