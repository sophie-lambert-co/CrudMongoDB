// TODO :userController.mjs

//* Importation du modèle User depuis le fichier Users.mjs
import User from "../models/Users.mjs";
//* Importation du module mongoose pour l'utilisation de Types
import mongoose from "mongoose";
//*méthode de déstructuration dans JavaScript qui permet d'extraire la classe ObjectId du module mongoose.Types et de l'assigner à la variable ObjectId.
// mongoose.Types est un objet qui contient plusieurs sous-objets et méthodes, dont ObjectId. ObjectId est utilisé pour représenter les identifiants uniques dans MongoDB.
// Dans ce contexte, les accolades sont utilisées pour extraire spécifiquement la classe ObjectId de mongoose.Types. Cela permet d'utiliser directement ObjectId plutôt que mongoose.Types.ObjectId dans le code.
const { ObjectId } = mongoose.Types;



/**
 * Crée un nouvel utilisateur.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function createUser(req, res) {
  try {
    //* Crée un nouvel utilisateur avec les données reçues dans la requête
    const newUser = new User(req.body);
    // Sauvegarde le nouvel utilisateur dans la base de données
    await newUser.save();
    //* Répond avec le nouvel utilisateur créé en tant que réponse à la requête
    res.status(201).json(newUser); // 201 Created
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}



/**
 * Récupère tous les utilisateurs.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function getAllUsers(req, res) {
  try {
    //* Récupère tous les utilisateurs depuis la base de données
    const users = await User.find();
    //* Répond avec la liste de tous les utilisateurs
    res.json(users);
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}


/**
 * Récupère un utilisateur par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
//* Fonction asynchrone pour récupérer un utilisateur par son ID
export async function getUserById(req, res) {
  try {
    //* Récupère l'ID de l'utilisateur depuis les paramètres de la requête
    // Dans Express (le framework web utilisé avec Node.js), req.params contient les paramètres de la requête URL. Si l'URL contient quelque chose comme /users/123, alors req.params.id serait égal à 123. Cela permet de récupérer les valeurs des paramètres dynamiques dans l'URL.
    const userId = req.params.id;
    

    //* Vérifiez si l'ID est un ObjectId valide
    if (!ObjectId.isValid(userId)) {
      //
      // isValid est une méthode de la classe ObjectId qui permet de vérifier si une chaîne donnée est un identifiant ObjectId valide. Cela aide à éviter les erreurs lorsqu'on travaille avec des identifiants dans MongoDB.    
      return res.status(400).json({ message: 'ID d\'utilisateur non valide' });
    }
   
    //* Récupère l'utilisateur par son ID depuis la base de données
    const user = await User.findById(userId);

    //* Vérifie si l'utilisateur a été trouvé
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    //* Répond avec les données de l'utilisateur
    res.json(user);
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}


/**
 * Met à jour un utilisateur par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
//* Fonction asynchrone pour mettre à jour un utilisateur par son ID
export async function updateUser(req, res) {
  try {
    //* Récupère l'ID de l'utilisateur depuis les paramètres de la requête
    const userId = req.params.id;

    //* Vérifiez si l'ID est un ObjectId valide
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID d'utilisateur non valide" });
    }

    //* Met à jour l'utilisateur par son ID avec les données de la requête
    // findByIdAndUpdate est une méthode Mongoose qui recherche un document par son ID (userId dans ce cas), met à jour ses données avec celles fournies dans req.body, puis renvoie le document mis à jour.
    // { new: true } :Cet objet en option spécifie que la méthode doit renvoyer le document mis à jour plutôt que le document d'origine. C'est utile pour obtenir la version la plus récente après la mise à jour.
    // await est utilisé pour attendre que l'opération de mise à jour soit terminée avant de passer à la ligne suivante. updatedUser contiendra le document utilisateur mis à jour après l'opération.
    // En résumé, cette ligne de code met à jour un utilisateur dans la base de données en utilisant son ID, les données fournies dans la requête (req.body), et renvoie la version la plus récente du document mis à jour.
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    //* Vérifie si l'utilisateur a été trouvé
    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
//* Répond avec les données de l'utilisateur mis à jour
    res.json(updatedUser);
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}



/**
 * Supprime un utilisateur par son ID.
 * @param {Object} req - Requête HTTP
 * @param {Object} res - Réponse HTTP
 */
export async function deleteUser(req, res) {
  try {
    //* Supprime l'utilisateur par son ID depuis la base de données
    const user = await User.findByIdAndDelete(req.params.id);
    //* Vérifie si l'utilisateur a été trouvé
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    //* Répond avec les données de l'utilisateur supprimé
    res.json(user);
  } catch (error) {
    //* En cas d'erreur, répond avec un statut 500 et un message d'erreur
    res.status(500).json({ error: error.message });
  }
}
