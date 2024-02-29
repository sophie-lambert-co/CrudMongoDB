// Importation du module mongoose
import mongoose from 'mongoose';

// Définition du schéma pour les images
const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
});

// Création du modèle Image à partir du schéma
const Image = mongoose.model('Image', imageSchema);

// Exportation du modèle
export default Image;
