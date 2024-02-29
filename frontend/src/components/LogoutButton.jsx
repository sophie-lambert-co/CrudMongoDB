import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la navigation programmatique dans React Router
import { signoutFront } from '../services/AuthService'; // Importer la fonction de déconnexion depuis le service AuthService
import { AuthContext } from '../context/authContext'; // Importer AuthContext pour accéder au contexte d'authentification
import { useContext } from 'react'; // Importer useContext pour accéder au contexte dans les composants fonctionnels React
import { Button } from 'react-bootstrap'; // Importer Button depuis React Bootstrap

const LogoutButton = () => { // Définir un composant LogoutButton pour gérer le bouton de déconnexion
  const navigate = useNavigate(); // Initialiser la fonction navigate pour la navigation
  const { setIsAuthenticated, isAuthenticated } = useContext(AuthContext); // Récupérer l'état d'authentification à partir du contexte d'authentification

  const handleLogoutClick = async () => { // Définir une fonction pour gérer le clic sur le bouton de déconnexion
    try {
      await signoutFront(); // Appeler la fonction de déconnexion depuis le service AuthService
      setIsAuthenticated(false); // Mettre à jour l'état d'authentification pour indiquer que l'utilisateur n'est plus authentifié
  
      navigate('/'); // Rediriger l'utilisateur vers la page de connexion après la déconnexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error); // Afficher les erreurs dans la console
      
      // Afficher une notification à l'utilisateur pour l'informer de l'erreur
      alert('Une erreur s\'est produite lors de la déconnexion. Veuillez réessayer.');
    }
  };

  return isAuthenticated ? ( // Rendre le bouton de déconnexion seulement si l'utilisateur est authentifié
    <Button variant="danger" onClick={handleLogoutClick}>Déconnexion</Button> // Utiliser le composant Button de React Bootstrap pour afficher le bouton de déconnexion
  ) : null; // Retourner null si l'utilisateur n'est pas authentifié
};

export default LogoutButton; // Exporter le composant LogoutButton pour une utilisation dans d'autres fichiers
