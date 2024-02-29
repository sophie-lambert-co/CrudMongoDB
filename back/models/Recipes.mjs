// TODO : models/Recipes.js

import { Schema, model } from "mongoose";

// Définition du schéma de la recette
const recipeSchema = new Schema({
  // Titre de la recette
  title: {
    type: String,
  },
  // Description de la recette
  description: String,
  // Liste des ingrédients avec leur ID, nom et quantité
  ingredients: [
    {
      ingredient: {
        type: Schema.Types.ObjectId,
        ref: "Ingredient", // Référence au modèle Ingredient
      },
      name: String,
      quantity: String,
    },
  ],
  // Étapes de préparation de la recette
  steps: [String],
  // Temps de préparation de la recette en minutes
  prepTime: Number,
  // Liste des URL des images associées à la recette
  images: [String],
  // Commentaires sur la recette avec l'ID de l'utilisateur, le texte du commentaire, la note et la date de création
  comments: {
    user: { type: Schema.ObjectId, ref: "user" }, // Référence à l'utilisateur qui a commenté
    text: String, // Texte du commentaire
    rating: Number, // Note attribuée à la recette
    createdAt: { type: Date, default: Date.now }, // Date de création du commentaire
  },
  // Catégorie de la recette
  category: {
    type: String,
    required: true,
  },
  // Ajoutez d'autres champs nécessaires ici
});

// Création du modèle Recipe à partir du schéma défini
const Recipe = model("recipes", recipeSchema);

export default Recipe;
