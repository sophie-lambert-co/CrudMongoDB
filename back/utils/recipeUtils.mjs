// TODO: recipeUtils.mjs

//* Importation du module mongoose pour la gestion de la base de données MongoDB
import mongoose from "mongoose";
//* Extraction de la propriété 'connection' de l'objet mongoose pour faciliter l'utilisation
const { connection } = mongoose;

//* Importation du modèle Recipes défini dans le fichier Recipes.mjs.
// importe le modèleRecipes défini dans le fichier Recipes.mjs. Ce modèle représente la structure des documents d'recettes dans la base de données.
import Recipe from "../models/Recipes.mjs";

//* Définition des données des recettes à ajouter à la base de données
//Définit un tableau d'objets représentant les données des recettes à ajouter à la base de données.
const recipesData = [
    {
      title: "Spaghetti Bolognaise",
      description: "Plat de pâtes italien classique",
      ingredients: [
        { ingredient: new mongoose.Types.ObjectId(), name: "spaghetti", quantity: "300g" },
        { ingredient: new mongoose.Types.ObjectId(), name: "viande hachée", quantity: "200g" },
        // Ajoutez d'autres ingrédients au besoin
      ],
      steps: [
        "Faites bouillir les spaghetti dans de l'eau salée jusqu'à ce qu'ils soient al dente.",
        "Dans une poêle séparée, faites dorer la viande hachée.",
        "Ajoutez la sauce tomate et laissez mijoter pendant 15 minutes.",
        // Ajoutez d'autres étapes au besoin
      ],
      prepTime: 30,
      images: ["spaghetti_image1.jpg", "spaghetti_image2.jpg"],
      comments: [
        { user: new mongoose.Types.ObjectId(), text: "Délicieux !", rating: 5 },
        // Ajoutez d'autres commentaires au besoin
      ],
      category: "Italien",
    },
    {
      title: "Saumon Grillé",
      description: "Recette rapide et facile de saumon grillé",
      ingredients: [
        { ingredient: new mongoose.Types.ObjectId(), name: "filet de saumon", quantity: "400g" },
        { ingredient: new mongoose.Types.ObjectId(), name: "poivron", quantity: "1 poivron, coupé en tranches" },
        // Ajoutez d'autres ingrédients au besoin
      ],
      steps: [
        "Faites griller le saumon dans une poêle chaude jusqu'à ce qu'il soit bien cuit.",
        "Ajoutez le poivron coupé en tranches et faites cuire pendant 3 minutes supplémentaires.",
        // Ajoutez d'autres étapes au besoin
      ],
      prepTime: 20,
      images: ["grilled_salmon_image1.jpg", "grilled_salmon_image2.jpg"],
      comments: [
        { user: new mongoose.Types.ObjectId(), text: "Rapide et délicieux !", rating: 4 },
        // Ajoutez d'autres commentaires au besoin
      ],
      category: "Poisson",
    },
    {
      title: "Ratatouille Provençale",
      description: "Plat végétarien méditerranéen",
      ingredients: [
        { ingredient: new mongoose.Types.ObjectId(), name: "aubergine", quantity: "1 aubergine, coupée en dés" },
        { ingredient: new mongoose.Types.ObjectId(), name: "courgette", quantity: "1 courgette, coupée en dés" },
        // Ajoutez d'autres ingrédients au besoin
      ],
      steps: [
        "Faites sauter les légumes dans de l'huile d'olive jusqu'à ce qu'ils soient tendres.",
        "Ajoutez des herbes provençales et du sel au goût.",
        // Ajoutez d'autres étapes au besoin
      ],
      prepTime: 25,
      images: ["ratatouille_image1.jpg", "ratatouille_image2.jpg"],
      comments: [
        { user: new mongoose.Types.ObjectId(), text: "Un délice végétarien !", rating: 5 },
        // Ajoutez d'autres commentaires au besoin
      ],
      category: "Végétarien",
    },
    {
      title: "Salade César",
      description: "Salade classique avec une vinaigrette crémeuse",
      ingredients: [
        { ingredient: new mongoose.Types.ObjectId(), name: "Laitue romaine", quantity: "Laitue romaine, lavée et déchirée" },
        { ingredient: new mongoose.Types.ObjectId(), name: "Poulet grillé", quantity: "Poulet grillé, coupé en morceaux" },
        // Ajoutez d'autres ingrédients au besoin
      ],
      steps: [
        "Mélangez la laitue avec le poulet grillé.",
        "Ajoutez des croûtons et la vinaigrette César.",
        // Ajoutez d'autres étapes au besoin
      ],
      prepTime: 15,
      images: ["caesar_salad_image1.jpg", "caesar_salad_image2.jpg"],
      comments: [
        { user: new mongoose.Types.ObjectId(), text: "Une salade classique toujours délicieuse !", rating: 4 },
        // Ajoutez d'autres commentaires au besoin
      ],
      category: "Salades",
    },
    // Ajoutez d'autres recettes au besoin
  ];
  

//* Définition de la fonction asynchrone addRecipes pour ajouter des recettes à la base de données
const addRecipes = async () => {
  try {
    // awaitRecipes.deleteMany();
    //* Supprimer tous les recettes existants (facultatif)
   

    //* Insére les nouveaux recettes dans la base de données
    //Utilise la méthode insertMany pour ajouter les recettes définis dans recipesData à la base de données. Affiche un message de confirmation si l'ajout est réussi.
    //En JavaScript, lorsqu'une fonction est préfixée par le mot-clé async, cela indique que la fonction retourne une promesse. Les fonctions asynchrones permettent d'écrire du code asynchrone de manière plus synchrone et lisible.
    //Le mot-clé await est utilisé à l'intérieur d'une fonction asynchrone pour attendre la résolution (ou le rejet) d'une promesse. Il indique au moteur JavaScript de mettre en pause l'exécution de la fonction asynchrone jusqu'à ce que la promesse soit résolue, puis de reprendre l'exécution.
    //La fonction addRecipes est déclarée avec le mot-clé async, ce qui la rend asynchrone et lui permet d'utiliser await.
    //À l'intérieur de la fonction, await Recipes.insertMany(recipesData); est utilisé pour attendre la résolution de la promesse retournée par la méthode insertMany de Mongoose. Cette méthode insère les données des recettes dans la base de données. L'exécution de la fonction addUsers est mise en pause jusqu'à ce que l'opération d'insertion soit terminée.
    const createdRecipes = await Recipe.insertMany(recipesData);
    //* Affiche un message dans la console si l'ajout d'recettes est réussi
    console.log("recettes ajoutés avec succès :", createdRecipes);
  } catch (error) {
    //* Affiche une erreur dans la console en cas d'échec de l'ajout d'recettes
    console.error("Erreur lors de l'ajout des recettes :", error);
  } finally {
    //* Ferme la connexion à la base de données après avoir ajouté les recettes avec la methode close.
    connection.close();
  }
};

//* Connexion à MongoDB
//Utilise mongoose.connect pour établir une connexion à MongoDB. Une fois la connexion réussie, exécute la fonction addRecipes pour ajouter des recettes.
mongoose.connect("mongodb://localhost:27017/recettes")
  .then(() => {
    //* Affiche un message dans la console si la connexion à MongoDB est réussie
    console.log("Connecté à MongoDB");
    //* Exécutez la fonction pour ajouter des recettes à la base de données
    addRecipes();
  })
  .catch((error) => {
    //* Affiche une erreur dans la console en cas d'échec de la connexion à MongoDB
    console.error("Erreur de connexion à MongoDB :", error);

      //* Arrête l'application en cas d'erreur de connexion
    //Termine le processus Node.js avec un code d'erreur (1) en cas d'échec de la connexion à MongoDB.
    process.exit(1); 
  });

//* Exporte la fonction addRecipes pour qu'elle puisse être utilisée dans d'autres fichiers
export default addRecipes;


//!   npx nodemon --exec "node" utils/recipeUtils.mjs
