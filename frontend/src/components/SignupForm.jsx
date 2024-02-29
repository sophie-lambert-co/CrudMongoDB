import  { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap'; // Import de Form, Button et Alert depuis Bootstrap
import { signupFront } from '../services/AuthService';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState(''); // Ajout d'un état pour le message



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const user = await signupFront(formData.name, formData.email, formData.password);
      console.log(user);
      if (user) {
        setFormData({ name: '', email: '', password: '' }); // Réinitialisation du formulaire
        setMessage('Inscription réussie. Veuillez vous connecter.'); // Affichage du message
      } else {
        // Gérer l'échec de la création de compte
      }
    } catch (error) {
      console.error("Erreur lors de la création du compte:", error);
      // Gérer l'erreur (par exemple, afficher un message d'erreur à l'utilisateur)
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      {message && <Alert variant="success">{message}</Alert>} {/* Affichage du message s'il existe */}
      <Form onSubmit={handleSignup}>
        <Form.Group controlId="name">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            autoComplete="current-name"
            required
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            autoComplete="current-email"
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            autoComplete="current-password"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">Inscription</Button>
      </Form>
    </div>
  );
};

export default SignupForm;