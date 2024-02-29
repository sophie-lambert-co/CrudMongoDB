// Importation du module Schema et model depuis Mongoose
import { Schema, model } from 'mongoose';

// Définition du schéma pour les types
const typeSchema = new Schema({
  name: { type: String, required: true }, // Nom du type, requis
  foods: [{ type: Schema.Types.ObjectId, ref: 'Food' }],
  // Ajoutez d'autres champs nécessaires ici
});

// Création du modèle Type à partir du schéma
const Type = model('Type', typeSchema);

// Exportation du modèle
export default Type;

// Note : La ligne foods: [{ type: Schema.Types.ObjectId, ref: 'Food' }]
// vous permet de stocker des références aux aliments associés à chaque type.
