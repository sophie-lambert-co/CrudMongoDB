const bcrypt = require('bcrypt');

// Fonction pour générer une clé secrète avec Bcrypt
const generateSecretKey = async () => {
  try {
    // Générer un sel aléatoire avec un coût de hachage de 10
    const salt = await bcrypt.genSalt(10);
    return salt;
  } catch (error) {
    console.error('Erreur lors de la génération de la clé secrète :', error);
    return null;
  }
};

module.exports = { generateSecretKey };
