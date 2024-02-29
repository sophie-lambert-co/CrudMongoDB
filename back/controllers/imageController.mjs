// TODO: controllers/imageController.mjs

// Importation du modèle Image depuis le fichier Images.mjs
import Image from '../models/Images.mjs';

/**
 * Fonction pour créer une nouvelle image.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 */
export async function createImage(req, res) {
  try {
    const { title, filename } = req.body;
    //
    //Utilisation de la déstructuration pour extraire les propriétés title et filename du corps de la requête (req.body). Cela suppose que la requête a été envoyée avec un corps JSON contenant ces propriétés.
    const newImage = new Image({ title, filename });
    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Fonction pour récupérer toutes les images.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 */
export async function getAllImages(req, res) {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

/**
 * Fonction pour supprimer une image par son ID.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 */
export async function deleteImage(req, res) {
  try {
    const imageId = req.params.id;
    if (!imageId) {
      return res.status(400).json({ message: "ID de l'image non fourni" });
    }
    const deletedImage = await Image.findByIdAndRemove(imageId);
    if (!deletedImage) {
      return res.status(404).json({ message: "Image non trouvée" });
    }
    res.json(deletedImage);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
