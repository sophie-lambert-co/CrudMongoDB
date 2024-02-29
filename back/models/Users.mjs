// TODO: Users.js;

// Importation de la bibliothèque bcrypt pour le hachage sécurisé des mots de passe
import bcrypt from 'bcrypt';

//* Importation du module mongoose et du modèle Schema depuis mongoose
import mongoose, { Schema } from "mongoose";

//* Définition du schéma MongoDB pour une collection "users"
const userSchema = new Schema({
  //* Champ pour le nom de l'utilisateur
  name: String,
  
  //* Champ pour le mot de passe de l'utilisateur
  password: String,

  //* Champ pour l'adresse e-mail de l'utilisateur, doit être unique
  email: {
    type: String,
    unique: true,
  },
});

// Avant de sauvegarder un nouvel utilisateur, hachez le mot de passe
userSchema.pre('save', async function (next) {
    // 'this' fait référence à l'objet utilisateur actuel
  const user = this;

    // Vérifie si le mot de passe de l'utilisateur a été modifié
  if (!user.isModified('password')) {
    return next();
  }

  try {
       // Génère un sel (une chaîne aléatoire) pour le hachage du mot de passe
    const salt = await bcrypt.genSalt(10);
     // Hache le mot de passe avec le sel généré
    const hashedPassword = await bcrypt.hash(user.password, salt);
     // Remplace le mot de passe non haché par le mot de passe haché dans l'objet utilisateur
    user.password = hashedPassword;
    // Appelle la fonction next() pour indiquer que le middleware a terminé et que l'enregistrement peut se poursuivre
    next();
  } catch (error) {
    // En cas d'erreur lors du hachage, transmet l'erreur à la fonction next() pour la gestion des erreurs
    return next(error);
  }
});


//Methode pour comparer le mot de passe de l'utilisateur avec le mot de passe haché stocké dans la base de données
userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

//* Création du modèle Users à partir du schéma défini ('users' sera le nom dans la BDD)
const User = mongoose.model('users', userSchema);


//* Méthode deleteMany pour supprimer plusieurs documents de la collection "users"
// Ajoute une méthode statique asynchrone pour supprimer tous les documents de la collection "users"
// La méthode statique deleteMany du schéma userSchema est définie comme une fonction asynchrone (sans arguments).
// Elle retourne l'invocation de la méthode deleteMany sur la collection 'users' connectée via mongoose.
userSchema.statics.deleteMany = async function () {
  return mongoose.connection.collection('users').deleteMany({});
};

//* Méthode insertMany pour insérer plusieurs documents dans la collection "users"
// Ajoute une méthode statique asynchrone pour insérer plusieurs documents dans la collection "users"
// Retourne l'invocation de la méthode insertMany sur la collection 'users' connectée via mongoose
userSchema.statics.insertMany = async function (data) {
  return mongoose.connection.collection('users').insertMany(data);
};



//* Exportation par défaut du modèle Users pour pouvoir l'utiliser dans d'autres fichiers
export default User;

//
//*Ce fichier définit la structure du schéma MongoDB pour la collection "users", ajoute deux méthodes statiques pour la manipulation de la base de données, crée le modèle Users, et l'exporte pour une utilisation dans d'autres parties de l'application.
//* la "classe" est représentée par le modèle Mongoose. Dans cet exemple, le modèle est créé à l'aide de la fonction mongoose.model et s'appelle Users. Le modèle est une représentation de la structure des données pour une collection MongoDB spécifique.
//* le mot-clé static permet de déclarer des méthodes qui appartiennent à la classe plutôt qu'à une instance particulière, et c'est particulièrement utile lorsque vous travaillez avec des opérations liées à la base de données dans le contexte de Mongoose.