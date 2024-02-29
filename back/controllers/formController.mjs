// TODO: controllers/formController.mjs

// Importation du modèle User depuis le fichier Users.mjs
import User from "../models/Users.mjs";


/**
 * Fonction pour gérer l'inscription d'un utilisateur.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 */
// Fonction pour gérer l'inscription d'un utilisateur
const signup = async (req, res) => {
  try {
    //
    // Extraction des données requises (name, password, email) à partir du corps de la requête
    //Cette syntaxe utilise la déstructuration d'objet en JavaScript pour extraire les propriétés name, password, et email du corps de la requête (req.body).
    const { name, password, email } = req.body;

    // Recherche de l'utilisateur dans la base de données par nom ou email (logique d'authentification)
    //{ $or: [{ name }, { email }] } : C'est une condition de recherche qui utilise l'opérateur logique OR ($or). Cela signifie que la requête doit trouver un document où le champ name est égal à la valeur de name OU le champ email est égal à la valeur de email.await : Comme cette opération peut être asynchrone (la recherche dans la base de données peut prendre un certain temps), await est utilisé pour attendre que la promesse retournée par findOne soit résolue.En résumé, cette ligne de code recherche un utilisateur dans la base de données MongoDB où soit le champ name soit le champ email correspond à la valeur fournie dans la requête HTTP. Si un utilisateur correspondant est trouvé, il est assigné à la variable existingUser.
    const existingUser = await User.findOne({ $or: [{ name }, { email }] });

    // Si un utilisateur avec le même nom ou email existe déjà, renvoie une réponse de conflit
    if (existingUser) {
      console.log(
        `L'utilisateur avec le nom ${name} ou l'e-mail ${email} existe déjà.`
      );
      return res.status(409).json({ message: "Utilisateur déjà existant" });
    }

    // Si aucun utilisateur n'est trouvé, procéder à la création d'un nouvel utilisateur
    const newUser = new User({ name, password, email });
    await newUser.save();

    console.log(`Nouvel utilisateur créé : ${name} (${email})`);
    // Répond avec un message de succès et les détails de l'utilisateur nouvellement créé
    res.json({ message: "Inscription réussie", user: newUser });
  } catch (error) {
    // En cas d'erreur pendant le processus d'inscription, renvoie une réponse d'erreur interne du serveur
    console.error("Erreur lors de l'inscription :", error.message);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Fonction pour gérer la connexion d'un utilisateur.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 */
// Fonction pour gérer la connexion d'un utilisateur
const signin = async (req, res) => {
  try {
    // Extraction des données requises (name, password, email) à partir du corps de la requête
    const { name, password, email } = req.body;

    // Recherche de l'utilisateur dans la base de données par nom ou email (logique d'authentification)
    const user = await User.findOne({ $or: [{ name }, { email }] });
    // Si aucun utilisateur n'est trouvé, renvoie une réponse indiquant que l'utilisateur n'existe pas
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Vérifiez le mot de passe, assurez-vous d'avoir une méthode appropriée dans votre modèle User pour comparer les mots de passe
    const isPasswordValid = user.comparePassword(password);
    // Si le mot de passe est incorrect, renvoie une réponse non autorisée
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe incorrect" });
    }
    // Répond avec un message de succès et les détails de l'utilisateur connecté
    res.json({ message: "Connexion réussie", user });
  } catch (error) {
    // En cas d'erreur pendant le processus de connexion, renvoie une réponse d'erreur interne du serveur
    res.status(500).json({ error: error.message });
  }
};

/**
 * Fonction pour gérer la déconnexion d'un utilisateur.
 * @param {Object} req - Requête HTTP.
 * @param {Object} res - Réponse HTTP.
 */

const signout = (req, res) => {
  try {
    // Vous pouvez ajouter des opérations nécessaires pour gérer la déconnexion, comme détruire la session, etc.
    // Par exemple, si vous utilisez express-session, vous pouvez détruire la session ainsi :
    req.session.destroy();

    // Envoyer une réponse indiquant que la déconnexion a réussi
    res.json({ success: true, message: 'Déconnexion réussie' });
  } catch (error) {
    // En cas d'erreur pendant le processus de déconnexion, renvoie une réponse d'erreur interne du serveur
    res.status(500).json({ error: error.message });
  }
};


// Export des fonctions signup signin
export { signup, signin, signout };
