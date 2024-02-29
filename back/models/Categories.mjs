// Importation du module Schema et model depuis Mongoose
import { Schema, model } from 'mongoose';

// Définition du schéma pour la catégorie
const categorySchema = new Schema({
  name: { type: String, required: true }, // Nom de la catégorie, requis
  recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  // Ajoutez d'autres champs nécessaires ici
});

// Création du modèle Category à partir du schéma
const Category = model('Category', categorySchema);

// Exportation du modèle
export default Category;

// Note : La ligne recipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }]
// vous permet de stocker des références aux recettes associées à chaque catégorie.
