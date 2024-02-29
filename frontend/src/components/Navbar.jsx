import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import LogoutButton from './LogoutButton';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <BootstrapNavbar bg="light" expand="lg">
      <Container>
        <Link to="/" className="navbar-brand">Bienvenue</Link>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/recettes/search">Les Recettes</Nav.Link>
            <Nav.Link as={Link} to="/recettes/create">Créer une recette</Nav.Link>
          </Nav>
          {isAuthenticated && <LogoutButton  />}
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Navbar;
