import { useEffect } from 'react'; // Importer useEffect pour gérer les effets de bord dans les composants fonctionnels React
import { useNavigate } from 'react-router-dom'; // Importer useNavigate pour la navigation programmatique dans React Router
import PropTypes from 'prop-types'; // Importer PropTypes pour la validation des types de props
import { useContext } from 'react'; // Importer useContext pour accéder au contexte dans les composants fonctionnels React
import { AuthContext } from  '../context/authContext' // Importer AuthContext pour accéder au contexte d'authentification

const Guard = ({ children, setShowAlert }) => { // Définir un composant Guard prenant des enfants et une fonction setShowAlert comme props
    const navigate = useNavigate(); // Initialiser la fonction navigate pour la navigation
    const { isAuthenticated } = useContext(AuthContext); // Récupérer l'état d'authentification à partir du contexte d'authentification

    useEffect(() => { // Utiliser useEffect pour effectuer une action après chaque rendu
        if (!isAuthenticated) { // Vérifier si l'utilisateur n'est pas authentifié
            setShowAlert(true); // Afficher une alerte pour informer l'utilisateur qu'il doit se connecter
            navigate('/'); // Rediriger l'utilisateur vers la page de connexion
        }
    }, [isAuthenticated, navigate, setShowAlert]); // Spécifier les dépendances pour useEffect

    return isAuthenticated ? children : null; // Rendre les enfants seulement si l'utilisateur est authentifié, sinon retourner null
};

Guard.propTypes = { // Définir les types des props attendues par le composant Guard
    children: PropTypes.node.isRequired, // Les enfants doivent être un nœud React (comme un composant ou du texte)
    setShowAlert: PropTypes.func.isRequired, // setShowAlert doit être une fonction
};

export default Guard; // Exporter le composant Guard pour une utilisation dans d'autres fichiers
