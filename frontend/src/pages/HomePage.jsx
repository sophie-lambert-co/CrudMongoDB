import { useContext, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SignupForm from '../components/SignupForm';
import SigninForm from '../components/SigninForm';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

/**
 * Page d'accueil affichée lorsque l'utilisateur n'est pas connecté.
 * Redirige automatiquement vers la page de recherche des recettes si l'utilisateur est connecté.
 * @returns {JSX.Element} - Élément JSX représentant la page d'accueil.
 */
const HomePage = () => {
  // Récupération de l'état d'authentification depuis le contexte d'authentification
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // Effet pour rediriger vers la page de recherche des recettes si l'utilisateur est connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/recettes/search');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>CUISINONS ENSEMBLE !</h1>
          <Row>
            <Col>
              <div>
                {/* Encart d'inscription */}
                <SignupForm />
              </div>
            </Col>
            <Col>
              {/* Encart de connexion */}
              <SigninForm />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
