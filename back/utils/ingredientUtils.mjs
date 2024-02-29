// TODO: ingredientUtils.mjs

//* Importation du module mongoose pour la gestion de la base de données MongoDB
import mongoose from "mongoose";
//* Extraction de la propriété 'connection' de l'objet mongoose pour faciliter l'utilisation
const { connection } = mongoose;

//* Importation du modèle Ingredients défini dans le fichier Ingredients.mjs.
// importe le modèleIngredients défini dans le fichier Ingredients.mjs. Ce modèle représente la structure des documents d'ingredients dans la base de données.
import Ingredient from "../models/Ingredients.mjs";

//* Définition des données des ingredients à ajouter à la base de données
//Définit un tableau d'objets représentant les données des ingredients à ajouter à la base de données.
const IngredientsData = [
    {
        name: "Spaghetti",
        type: "Céréales",
      },
      {
        name: "Viande hachée",
        type: "Viande",
      },
      {
        name: "Filet de saumon",
        type: "Poisson",
      },
      {
        name: "Poivron",
        type: "Légume",
      },
      {
        name: "Aubergine",
        type: "Légume",
      },
      {
        name: "Courgette",
        type: "Légume",
      },
      {
        name: "Laitue romaine",
        type: "Légume",
      },
      {
        name: "Poulet grillé",
        type: "Viande",
      },
      {
        name: "Lait de coco",
        type: "Lait",
      },
      {
        name: "Oignon",
        type: "Légume",
      },
      {
        name: "Ail",
        type: "Légume",
      },
      {
        name: "Gingembre",
        type: "Épice",
      },
      {
        name: "Curry en poudre",
        type: "Épice",
      },
      {
        name: "Sel",
        type: "Assaisonnement",
      },
      {
        name: "Poivre",
        type: "Assaisonnement",
      },
      // Ajoutez d'autres ingredients au besoin
    ];
    
 

//* Définition de la fonction asynchrone addIngredients pour ajouter des ingredients à la base de données
const addIngredients = async () => {
  try {
    // awaitIngredients.deleteMany();
    //* Supprimer tous les ingredients existants (facultatif)
   

    //* Insére les nouveaux ingredients dans la base de données
    //Utilise la méthode insertMany pour ajouter les ingredients définis dans ingredeintsData à la base de données. Affiche un message de confirmation si l'ajout est réussi.
    //En JavaScript, lorsqu'une fonction est préfixée par le mot-clé async, cela indique que la fonction retourne une promesse. Les fonctions asynchrones permettent d'écrire du code asynchrone de manière plus synchrone et lisible.
    //Le mot-clé await est utilisé à l'intérieur d'une fonction asynchrone pour attendre la résolution (ou le rejet) d'une promesse. Il indique au moteur JavaScript de mettre en pause l'exécution de la fonction asynchrone jusqu'à ce que la promesse soit résolue, puis de reprendre l'exécution.
    //La fonction addIngredients est déclarée avec le mot-clé async, ce qui la rend asynchrone et lui permet d'utiliser await.
    //À l'intérieur de la fonction, await Ingredients.insertMany(ingredientsData); est utilisé pour attendre la résolution de la promesse retournée par la méthode insertMany de Mongoose. Cette méthode insère les données des ingredients dans la base de données. L'exécution de la fonction addUsers est mise en pause jusqu'à ce que l'opération d'insertion soit terminée.
    const createdIngredients = await Ingredient.insertMany(IngredientsData);
    //* Affiche un message dans la console si l'ajout d'ingredients est réussi
    console.log("ingredient ajoutés avec succès :", createdIngredients);
  } catch (error) {
    //* Affiche une erreur dans la console en cas d'échec de l'ajout d'ingredients
    console.error("Erreur lors de l'ajout des ingredients :", error);
  } finally {
    //* Ferme la connexion à la base de données après avoir ajouté les ingredients avec la methode close.
    connection.close();
    console.log("Connexion à MongoDB fermée");
  }
};

//* Connexion à MongoDB
//Utilise mongoose.connect pour établir une connexion à MongoDB. Une fois la connexion réussie, exécute la fonction addIngredients pour ajouter des ingredients.
mongoose.connect("mongodb://localhost:27017/recettes")
  .then(() => {
    //* Affiche un message dans la console si la connexion à MongoDB est réussie
    console.log("Connecté à MongoDB");
    //* Exécutez la fonction pour ajouter des ingredients à la base de données
    addIngredients();
  })
  .catch((error) => {
    //* Affiche une erreur dans la console en cas d'échec de la connexion à MongoDB
    console.error("Erreur de connexion à MongoDB :", error);

      //* Arrête l'application en cas d'erreur de connexion
    //Termine le processus Node.js avec un code d'erreur (1) en cas d'échec de la connexion à MongoDB.
    process.exit(1); 
    
  });

//* Exporte la fonction addIngredients pour qu'elle puisse être utilisée dans d'autres fichiers
export default addIngredients;



//!   npx nodemon --exec "node" utils/ingredientUtils.mjs

