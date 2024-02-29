import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signinFront } from '../services/AuthService';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

/**
 * Composant SigninForm pour la connexion de l'utilisateur.
 * @returns {JSX.Element} - Élément JSX représentant le formulaire de connexion.
 */
const SigninForm = () => {
  // État local pour gérer les données du formulaire et les erreurs
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  /**
   * Gérer le changement dans les champs du formulaire.
   * @param {Object} e - L'événement de changement.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Gérer la soumission du formulaire de connexion.
   * @param {Object} e - L'événement de soumission du formulaire.
   */
  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      // Appel à la fonction de connexion depuis le service AuthService
      const user = await signinFront(formData.email, formData.password);
      console.log(user);
      // Vérification du résultat de la connexion
      if (user) {
        setIsAuthenticated(true);
        setUser(user);
        navigate('/recettes/search'); // Redirection vers la page de recherche des recettes
      } else {
        setError('Adresse e-mail ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      setError('Une erreur s\'est produite lors de la connexion. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      {/* Formulaire de connexion */}
      <Form onSubmit={handleSignin}>
        {/* Champ d'adresse e-mail */}
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          autoComplete="current-email"
          placeholder="Adresse e-mail"
          required
        />
        {/* Champ de mot de passe */}
        <Form.Control
          type="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          autoComplete="current-password"
          placeholder="Mot de passe"
          required
        />
        {/* Affichage des erreurs */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* Bouton de connexion */}
        <Button variant="primary" type="submit">Connexion</Button>
      </Form>
    </div>
  );
};

export default SigninForm;
