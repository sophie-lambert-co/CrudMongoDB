//models/Ingredients.js

import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  type : String,
  // Ajoutez d'autres champs nécessaires ici
});

const Ingredient = model('Ingredients', ingredientSchema);

export default Ingredient;

