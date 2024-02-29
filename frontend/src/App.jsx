
import { BrowserRouter as Router } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import du CSS de Bootstrap
import './App.css'; // Import du CSS personnalisé
import { useState } from 'react'; // Import du hook useState de React
import { AuthContext } from './context/authContext'; // Import du contexte d'authentification

const App = () => {
  // État local pour gérer l'authentification de l'utilisateur
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Création d'un objet d'état à passer au contexte d'authentification
  const state = { isAuthenticated, setIsAuthenticated };

  return (
    // Fournit l'état d'authentification à tous les composants descendants via le contexte d'authentification
    <AuthContext.Provider value={state}>
      {/* Configuration du router */}
      <Router>
        {/* Utilisation du composant principal de mise en page */}
        <MainLayout/>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
