const API_URL = "http://localhost:3000";

/**
 * Fonction pour la connexion de l'utilisateur.
 * @param {string} email - L'adresse e-mail de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Object|boolean} - L'utilisateur connecté ou false en cas d'erreur.
 */
export async function signinFront(email, password) {
  try {
    const response = await fetch(`${API_URL}/recettes/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const user = data.user;

    return user;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error.message);
    return false;
  }
}

/**
 * Fonction pour la déconnexion de l'utilisateur.
 */
export async function signoutFront() {
  try {
    const response = await fetch(`${API_URL}/recettes/signout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error("Erreur de réseau lors de la déconnexion.");
    }

    const data = await response.json();

    console.log("Déconnexion réussie :", data);
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
}

/**
 * Fonction pour l'inscription de l'utilisateur.
 * @param {string} name - Le nom de l'utilisateur.
 * @param {string} email - L'adresse e-mail de l'utilisateur.
 * @param {string} password - Le mot de passe de l'utilisateur.
 * @returns {Object} - Les données de l'utilisateur inscrit.
 */
export async function signupFront(name, email, password) {
  try {
    const response = await fetch(`${API_URL}/recettes/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error.message);
  }
}
