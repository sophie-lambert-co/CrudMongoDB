// TODO: userUtils.mjs

//* Importation du module mongoose pour la gestion de la base de données MongoDB
import mongoose from "mongoose";
//* Extraction de la propriété 'connection' de l'objet mongoose pour faciliter l'utilisation
const { connection } = mongoose;

//* Importation du modèle Users défini dans le fichier Users.mjs.
// importe le modèle Users défini dans le fichier Users.mjs. Ce modèle représente la structure des documents d'utilisateurs dans la base de données.
import User from "../models/Users.mjs";

//* Définition des données des utilisateurs à ajouter à la base de données
//Définit un tableau d'objets représentant les données des utilisateurs à ajouter à la base de données.
const usersData = [
  { name: "John Doe", password: "password123", email: "john@example.com" },
  { name: "Alice Smith", password: "alice123", email: "alice@example.com" },
  { name: "Bob Johnson", password: "bob456", email: "bob@example.com" },
  { name: "Charlie Brown",password: "charlie789", email: "charlie@example.com"},
  { name: "Emma Davis", password: "emma101", email: "emma@example.com" },
  { name: "Frank White", password: "frank2022", email: "frank@example.com" },
  { name: "Grace Lee", password: "grace777", email: "grace@example.com" },
  { name: "Henry Wang", password: "henry888", email: "henry@example.com" },
  { name: "Ivy Rodriguez", password: "ivy999", email: "ivy@example.com" },
  { name: "Jack Turner", password: "jack1234", email: "jack@example.com" },
  // Ajoutez d'autres utilisateurs au besoin
];

//* Définition de la fonction asynchrone addUsers pour ajouter des utilisateurs à la base de données
const addUsers = async () => {
  try {
    // await Users.deleteMany();
    //* Supprimer tous les utilisateurs existants (facultatif)
   

    //* Insére les nouveaux utilisateurs dans la base de données
    //Utilise la méthode insertMany pour ajouter les utilisateurs définis dans usersData à la base de données. Affiche un message de confirmation si l'ajout est réussi.
    //En JavaScript, lorsqu'une fonction est préfixée par le mot-clé async, cela indique que la fonction retourne une promesse. Les fonctions asynchrones permettent d'écrire du code asynchrone de manière plus synchrone et lisible.
    //Le mot-clé await est utilisé à l'intérieur d'une fonction asynchrone pour attendre la résolution (ou le rejet) d'une promesse. Il indique au moteur JavaScript de mettre en pause l'exécution de la fonction asynchrone jusqu'à ce que la promesse soit résolue, puis de reprendre l'exécution.
    //La fonction addUsers est déclarée avec le mot-clé async, ce qui la rend asynchrone et lui permet d'utiliser await.
    //À l'intérieur de la fonction, await Users.insertMany(usersData); est utilisé pour attendre la résolution de la promesse retournée par la méthode insertMany de Mongoose. Cette méthode insère les données des utilisateurs dans la base de données. L'exécution de la fonction addUsers est mise en pause jusqu'à ce que l'opération d'insertion soit terminée.
    const createdUsers = await User.insertMany(usersData);
    //* Affiche un message dans la console si l'ajout d'utilisateurs est réussi
    console.log("Utilisateurs ajoutés avec succès :", createdUsers);
  } catch (error) {
    //* Affiche une erreur dans la console en cas d'échec de l'ajout d'utilisateurs
    console.error("Erreur lors de l'ajout des utilisateurs :", error);
  } finally {
    //* Ferme la connexion à la base de données après avoir ajouté les utilisateurs avec la methode close.
    connection.close();
  }
};

//* Connexion à MongoDB
//Utilise mongoose.connect pour établir une connexion à MongoDB. Une fois la connexion réussie, exécute la fonction addUsers pour ajouter des utilisateurs.
mongoose.connect("mongodb://localhost:27017/recettes")
  .then(() => {
    //* Affiche un message dans la console si la connexion à MongoDB est réussie
    console.log("Connecté à MongoDB");
    //* Exécutez la fonction pour ajouter des utilisateurs à la base de données
    addUsers();
  })
  .catch((error) => {
    //* Affiche une erreur dans la console en cas d'échec de la connexion à MongoDB
    console.error("Erreur de connexion à MongoDB :", error);

      //* Arrête l'application en cas d'erreur de connexion
    //Termine le processus Node.js avec un code d'erreur (1) en cas d'échec de la connexion à MongoDB.
    process.exit(1); 
  });

//* Exporte la fonction addUsers pour qu'elle puisse être utilisée dans d'autres fichiers
export default addUsers;
