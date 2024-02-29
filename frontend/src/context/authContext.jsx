import { createContext } from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';

/**
 * Contexte d'authentification pour gérer l'état d'authentification de l'utilisateur.
 */
export const AuthContext = createContext([false, () => {}]);

/**
 * Composant AuthProvider pour fournir le contexte d'authentification à l'ensemble de l'application.
 * @param {Object} props - Les propriétés du composant.
 * @param {ReactNode} props.children - Les composants enfants enveloppés par AuthProvider.
 * @returns {JSX.Element} - Élément JSX représentant le fournisseur de contexte d'authentification.
 */
export const AuthProvider = ({ children }) => {
  // État local pour gérer l'authentification et l'utilisateur
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
