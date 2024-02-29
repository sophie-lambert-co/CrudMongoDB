import { useState, useCallback } from 'react'; // Importer useState et useCallback depuis React
import { Routes, Route } from 'react-router-dom'; // Importer Routes et Route depuis React Router
import Navbar from './Navbar'; // Importer le composant Navbar
import HomePage from '../pages/HomePage'; // Importer la page HomePage
import RecipeSearchPage from '../pages/RecipeSearchPage'; // Importer la page RecipeSearchPage
import RecipeList from '../components/RecipeList'; // Importer le composant RecipeList
import { signoutFront } from '../services/AuthService'; // Importer signoutFront depuis le service AuthService
import RecipeAddPage from '../pages/RecipeAddPage'; // Importer la page RecipeAddPage
import { Container } from 'react-bootstrap'; // Importer Container depuis React Bootstrap
import Guard from './Guard'; // Importer le composant Guard
import { Alert } from 'react-bootstrap'; // Importer Alert depuis React Bootstrap
import { useContext } from 'react'; // Importer useContext depuis React
import { AuthContext } from '../context/authContext'; // Importer AuthContext

const MainLayout = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // Récupérer l'état d'authentification et la fonction setIsAuthenticated depuis le contexte d'authentification
  const [recipes, setRecipes] = useState([]); // Initialiser un état pour stocker les recettes
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Initialiser un état pour stocker la recette sélectionnée
  const [showAlert, setShowAlert] = useState(false); // Initialiser un état pour afficher l'alerte de connexion
  
  // Fonction pour gérer la déconnexion de l'utilisateur
  const handleSignout = useCallback(async () => {
    try {
      await signoutFront(); // Appeler la fonction de déconnexion depuis le service AuthService
      setIsAuthenticated(false); // Mettre à jour l'état d'authentification après la déconnexion
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error); // Afficher les erreurs dans la console en cas d'erreur de déconnexion
    }
  }, [setIsAuthenticated]); // Dépendance : setIsAuthenticated

  // Fonction pour sélectionner une recette
  const handleSelectRecipe = useCallback((recipe) => {
    setSelectedRecipe(recipe); // Mettre à jour l'état de la recette sélectionnée
  }, [setSelectedRecipe]); // Dépendance : setSelectedRecipe

  // Fonction pour ajouter une recette
  const handleAddRecipe = useCallback((newRecipe) => {
    setRecipes(prevRecipes => [...prevRecipes, newRecipe]); // Ajouter la nouvelle recette à la liste des recettes
  }, [setRecipes]); // Dépendance : setRecipes

  return (
    <div>
      {/* Afficher la barre de navigation */}
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleSignout} />

      {/* Afficher l'alerte de connexion */}
      {showAlert && 
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          Vous devez être connecté pour accéder à cette page.
        </Alert>
      }

      {/* Conteneur principal */}
      <Container>
        {/* Définir les routes */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Page d'accueil */}
          {/* Page de recherche de recettes */}
          <Route path="/recettes/search" element={<Guard setShowAlert={setShowAlert}><RecipeSearchPage recipes={recipes} onSelectRecipe={handleSelectRecipe} /></Guard>} />
          {/* Liste des recettes */}
          <Route path="/recettes/list" element={<Guard setShowAlert={setShowAlert}><RecipeList recipes={recipes} onSelectRecipe={handleSelectRecipe} /></Guard>} />
          {/* Page d'ajout de recette */}
          <Route path="/recettes/create" element={<Guard setShowAlert={setShowAlert}><RecipeAddPage onAddRecipe={handleAddRecipe} /></Guard>} />
        </Routes>
      </Container>
    </div>
  );
};

export default MainLayout; // Exporter le composant MainLayout
