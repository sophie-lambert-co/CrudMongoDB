// Importation du module Schema et model depuis Mongoose
import { Schema, model } from 'mongoose';

// Définition du schéma pour les commentaires
const commentSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User', required: true }, // Utilisateur, référence à un utilisateur, requis
  recipe: { type: Schema.ObjectId, ref: 'Recipe', required: true }, // Recette, référence à une recette, requis
  text: String, // Texte du commentaire
  rating: Number, // Note du commentaire
  createdAt: { type: Date, default: Date.now }, // Date de création, par défaut à la date actuelle
});

// Création du modèle Comment à partir du schéma
const Comment = model('Comment', commentSchema);

// Exportation du modèle
export default Comment;
