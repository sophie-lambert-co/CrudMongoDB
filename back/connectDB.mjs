// TODO : connectDB.mjs

//* Importe la fonction connect de la bibliothèque Mongoose, qui est utilisée pour établir une connexion à la base de données MongoDB.
import { connect } from "mongoose";

//
//* Définit une fonction asynchrone nommée connectDB pour gérer la connexion à la base de données.
const connectDB = async () => {
  try {
    //* Connexion à la base de données MongoDB
    await connect("mongodb://localhost:27017/recettes");
    //
    //* Affiche un message de confirmation si la connexion est réussie
    console.log("Connecté à MongoDB");
  } catch (error) {
    //
    //* Affiche une erreur en cas d'échec de la connexion puis termine le processus Node.js avec un code d'erreur (1).
    console.error("Erreur de connexion à MongoDB :", error);
    //
    //* Termine le processus Node.js avec un code d'erreur
    process.exit(1);
  }
};


//* Exporte la fonction connectDB pour qu'elle puisse être utilisée dans d'autres fichiers
export default connectDB;

//
//*  export default est utilisé pour exporter une valeur par défaut à partir d'un module, et cela offre plus de flexibilité lors de l'importation de cette valeur dans d'autres modules. (on peut ensuite la nomée de la manière la plus parlante pour l'application)
//* Le fichier connectDB.mjs définit une fonction pour gérer la connexion à la base de données MongoDB.
