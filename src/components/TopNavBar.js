import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

function TopNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <NavLink to="/" className="navbar-brand">Movie Recommender</NavLink>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <NavLink to="/recommendation" className="nav-link">Recommendations</NavLink>
            <NavLink to="/charts" className="nav-link">Charts</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
          </Nav>
          <Nav>
            <NavLink to="/login" className="nav-link">Sign In</NavLink>
            <NavLink to="/signup" className="nav-link">Sign Up</NavLink> 
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;
